// backend/src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Get, Req, UseGuards, Inject, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { Public } from '../common/decorators/public.decorator'; //  Исправлено!
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../common/entities/user.entity';
import { Remult } from 'remult';
import { Session } from '../common/entities/session.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RemultService } from '../common/remult.service'; //  Исправлено!
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'; // Исправлено
import * as ms from 'ms';
import { ResendVerificationEmailDto } from './dto/resend-verification-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly remultService: RemultService,
    ) { }

    @Post('signup')
    @Public()
    async signup(@Body() signupDto: SignupDto, @Res({ passthrough: true }) response: Response) {
        try {
            const remult = await this.remultService.getRemult();
            const { user, accessToken, refreshToken } = await this.authService.signup(signupDto, remult);

            const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
            const expiresInMilliseconds = ms(jwtExpiresIn);

            if (isNaN(expiresInMilliseconds)) {
                throw new UnauthorizedException(`Invalid JWT_EXPIRES_IN value: ${jwtExpiresIn}`);
            }

            const expiryDate = new Date(Date.now() + expiresInMilliseconds);

            response.cookie('jwt', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                domain: process.env.COOKIE_DOMAIN,
                expires: expiryDate,
            });

            return { refreshToken, user: remult.repo(User).toJson(user) };
        } catch (error) {
            console.error("Signup failed", error);
            throw error; //  Re-throw the error to be handled by the global exception filter
        }
    }

    @Post('login')
    @Public()
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        try {
            const remult = await this.remultService.getRemult();
            const { user, accessToken, refreshToken } = await this.authService.login(loginDto, remult);
            const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
            const expiresInMilliseconds = ms(jwtExpiresIn);

            if (isNaN(expiresInMilliseconds)) {
                throw new UnauthorizedException(`Invalid JWT_EXPIRES_IN value: ${jwtExpiresIn}`);
            }

            const expiryDate = new Date(Date.now() + expiresInMilliseconds);
            response.cookie('jwt', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                domain: process.env.COOKIE_DOMAIN,
                expires: expiryDate,
            });

            return { refreshToken, user: remult.repo(User).toJson(user) };
        } catch (error) {
      console.error("Login failed", error);
      throw error; //  Re-throw the error
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response, @Req() req: Request) {
      try {
        response.clearCookie('jwt', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          domain: process.env.COOKIE_DOMAIN,
        });
        const remult = await this.remultService.getRemult();
        if (req['user']?.sessionId) { // Добавили проверку
          const sessionRepo = remult.repo(Session);
          const session = await sessionRepo.findId(req['user'].sessionId);  //  Используем req.user!
          if (session) {
            session.isActive = false;
            await sessionRepo.save(session);
          }
        }
        return { message: 'Logged out successfully' };
      }  catch (error) {
            console.error("Logout failed", error);
            throw error; //  Re-throw the error
      }
    }

    @Post('refresh') // refresh больше не защищен
    async refresh(@Body() refreshTokenDto: RefreshTokenDto, @Res({ passthrough: true }) response: Response, @Req() req: Request) {
        try {
            const remult = await this.remultService.getRemult(); //  Получаем remult
            const { accessToken, refreshToken: newRefreshToken } = await this.authService.refresh(refreshTokenDto.refreshToken, remult); //  Передаем refresh token

            const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
            const expiresInMilliseconds = ms(jwtExpiresIn);

            if (isNaN(expiresInMilliseconds)) {
                throw new UnauthorizedException(`Invalid JWT_EXPIRES_IN value: ${jwtExpiresIn}`);
            }
            const expiryDate = new Date(Date.now() + expiresInMilliseconds);

            response.cookie('jwt', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                domain: process.env.COOKIE_DOMAIN,
                expires: expiryDate,
            });

            return { refreshToken: newRefreshToken };
      } catch (error: any) {
            console.error("Refresh token failed", error); //  Добавлено логирование
            throw error;
        }
    }

    @Get('verify-email/:token')
    @Public()
    async verifyEmail(@Param('token') token: string, @Res() res: Response) {
        try {
            const message = await this.authService.verifyEmail(token);
            return res.status(HttpStatus.OK).json({ message });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error("Email verification failed", error);
            throw new HttpException('Email verification failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('resend-verification-email')
    @Public()
    async resendVerificationEmail(@Body() resendDto: ResendVerificationEmailDto): Promise<{ message: string }> {
        try {
            await this.authService.resendVerificationEmail(resendDto.email);
            return { message: 'Verification email sent successfully.' };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
              }
              console.error("Resend verification email failed", error);
              throw new HttpException('Failed to resend verification email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('forgot-password')
    @Public()
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
      try {
        await this.authService.forgotPassword(forgotPasswordDto.email);
        return { message: 'Password reset instructions sent to your email' };
      } catch (error) {
        if (error instanceof HttpException) {
            throw error;
          }
          console.error("Forgot password", error);
          throw new HttpException('Failed to request password reset.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }


    @Post('reset-password/:token')
    @Public()
    async resetPassword(
      @Param('token') token: string,
      @Body() resetPasswordDto: ResetPasswordDto,
      @Res({ passthrough: true }) response: Response
    ): Promise<{ message: string }> {
        try{
          await this.authService.resetPassword(token, resetPasswordDto);
          return { message: 'Password has been reset successfully.' };
        } catch (error) {
           if (error instanceof HttpException) {
              throw error;
            }
            console.error("Reset password failed", error);
            throw new HttpException('Failed to reset password', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}