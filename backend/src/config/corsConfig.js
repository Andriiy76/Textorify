// backend/src/config/corsConfig.js
import cors from 'cors';

const allowedOrigins = [process.env.FRONTEND_URL || 'https://app.textorify.com'];

const corsConfig = cors({
    origin: (origin, callback) => {
        //  Разрешаем запросы без origin (например, с мобильных приложений, curl и т.д.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); //  Разрешаем запрос
        } else {
            callback(new Error('Not allowed by CORS')); //  Запрещаем запрос
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //  Явно указываем разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], //  Явно указываем разрешенные заголовки
});

export default corsConfig;