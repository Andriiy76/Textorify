//backend/src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.jwt;
                },
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: configService.get('JWT_SECRET'),
            ignoreExpiration: false,
            algorithms: ['HS256'],
        });
    }

    async validate(payload: any) {
        return {
            id: payload.id,
            email: payload.email,
            planId: payload.planId,
            sessionId: payload.session_id,
        };
    }
}