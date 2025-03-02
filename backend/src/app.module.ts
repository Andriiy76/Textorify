// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LoggerModule } from './logger/logger.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { PaymentsModule } from './payments/payments.module';
import { TasksModule } from './tasks/tasks.module';
import { BullModule } from '@nestjs/bull';
import { User } from './common/entities/user.entity';
import { Session } from './common/entities/session.entity';
import { RemultService } from './common/remult.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
            entities: [User, Session]
        }),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379
            }
        }),
        AuthModule,
        LoggerModule,
        IntegrationsModule,
        PaymentsModule,
        TasksModule
    ],
    controllers: [],
    providers: [
        RemultService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule { }