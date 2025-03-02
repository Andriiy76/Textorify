// backend/src/common/remult.service.ts
import { Injectable, Scope, Inject, Optional,  } from '@nestjs/common';
import { createPostgresDataProvider } from "remult/postgres";
import { Remult,  SqlDatabase } from 'remult';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../common/entities/user.entity'; // Исправленный путь
import { Session } from '../common/entities/session.entity'; // Исправленный путь

@Injectable({ scope: Scope.REQUEST,  })
export class RemultService {
    remult: Remult;
    constructor( ) {
        this.remult = new Remult();
    }
    async getRemult() { // Добавлено async
        if (!this.remult.dataProvider) { // Проверяем
            this.remult.dataProvider = await createPostgresDataProvider({ // await
                connectionString: process.env.DATABASE_URL
            });
        }
        return this.remult;
    }
}