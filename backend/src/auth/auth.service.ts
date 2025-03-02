// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../common/entities/user.entity';
import { Session } from '../common/entities/session.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { sendVerificationEmail, sendResetPasswordEmail } from '../common/utils/sendEmail';
import { Remult, Repository } from 'remult';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { RemultService } from '../common/remult.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { validateEmail } from '../common/utils/validateEmail';
// import { isEmail } from 'class-validator'; //  Удаляем, так как используем validateEmail
const isDisposableEmail = require('is-disposable-email');

@Injectable()
export class AuthService {
  private userRepo: Repository<User>;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly remultService: RemultService,
    private dataSource: DataSource,
  ) {}
async onModuleInit() {
    const remult = await this.remultService.getRemult();
    this.userRepo = remult.repo(User);
  }
  async signup(signupDto: SignupDto, remult: Remult): Promise<{ user: User; accessToken: string; refreshToken: string; }> {
      const { email, password, confirmPassword } = signupDto;

       if (!email || !password || !confirmPassword) {
            throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
        }

      if (password !== confirmPassword) {
         throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
      }
      const userRepo =  this.dataSource.getRepository(User);
      const existingUser = await userRepo.findOne({ where: { email: email } });
      if (existingUser) {
        throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
      }
      if (!validateEmail(email)) {
        throw new HttpException('Invalid email domain', HttpStatus.BAD_REQUEST);
        }

        if (isDisposableEmail(email)) {
            throw new HttpException('Invalid email domain', HttpStatus.BAD_REQUEST);
        }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = userRepo.create({
        email,
        password: hashedPassword,
        emailVerificationToken: randomUUID(),
        emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      await userRepo.save(user);

      if (user.emailVerificationToken) {
        await sendVerificationEmail(user.email, user.emailVerificationToken);
      }

      return this.createSession(user, remult);
    }

  async login(loginDto: LoginDto, remult: Remult): Promise<{ user: User; accessToken: string; refreshToken: string; }> {
    const { email, password } = loginDto;
     if (!email || !password) {
          throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
      }
    const userRepo =  this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
        throw new HttpException(
            { message: 'Email not verified', email: user.email },
            HttpStatus.FORBIDDEN,
          );
    }

    return this.createSession(user, remult);
  }

  private async createSession(user: User, remult: Remult): Promise<{ user: User; accessToken: string; refreshToken: string; }> {
    const sessionRepo = remult.repo(Session);
    const session = sessionRepo.create({
      user,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      refreshToken: randomUUID(),
    });
    await sessionRepo.save(session);

    const payload = {
      id: user.id,
      email: user.email,
      planId: user.planId,
      session_id: session.id,
    };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken, refreshToken: session.refreshToken };
  }

  async refresh(refreshToken: string, remult: Remult) {
    const sessionRepo = remult.repo(Session);
    const session = await sessionRepo.findOne({ where: { refreshToken, isActive: true } });
    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    return await this.createSession(session.user, remult)
  }

      async verifyEmail(token: string): Promise<string> {
          const userRepo =  this.dataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { emailVerificationToken: token } });

        if (!user) {
          throw new HttpException('Invalid verification token', HttpStatus.BAD_REQUEST);
        }

        if (user.emailVerificationTokenExpiresAt < new Date()) {
          throw new HttpException({message:'Verification token expired', email: user.email }, HttpStatus.BAD_REQUEST);
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationTokenExpiresAt = null;
        await userRepo.save(user);

        return 'Email successfully verified!';
      }
      async resendVerificationEmail(email: string): Promise<void> {
        const userRepo = this.dataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (user.isEmailVerified) {
          throw new HttpException('Email already verified', HttpStatus.BAD_REQUEST);
        }
        if (!validateEmail(email)) {
            throw new HttpException('Invalid email domain', HttpStatus.BAD_REQUEST);
        }
        user.emailVerificationToken = randomUUID();
        user.emailVerificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await userRepo.save(user);
        await sendVerificationEmail(user.email, user.emailVerificationToken);
      }
      async forgotPassword(email: string): Promise<void> {
        const userRepo =  this.dataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

       if (!user) {
         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
       }

       user.resetPasswordToken = randomUUID();
       user.resetPasswordTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
       await userRepo.save(user);
       await sendResetPasswordEmail(user.email, user.resetPasswordToken);
     }
     async resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<void> {
        const { password, confirmPassword } = resetPasswordDto;
        if (password !== confirmPassword) {
          throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
        }
        const userRepo =  this.dataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { resetPasswordToken: token } });

        if (!user) {
          throw new HttpException('Invalid reset password token', HttpStatus.BAD_REQUEST);
        }

        if (user.resetPasswordTokenExpiresAt < new Date()) {
          throw new HttpException('Reset password token expired', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiresAt = null;
        await userRepo.save(user);
      }
}