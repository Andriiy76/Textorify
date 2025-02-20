// backend/src/app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import corsConfig from './config/corsConfig.js';
import authRoutes from './routes/authRoutes.js';
import connectToDatabase from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(corsConfig); //  CORS - здесь!
app.use(express.json());
app.use(cookieParser());

//  Подключаемся к базе данных и передаем объект db в маршруты:
connectToDatabase()
  .then(db => {
    app.use('/api/auth', (req, res, next) => {  //  Middleware для передачи db
        req.db = db;  //  Добавляем db в объект запроса
        next();
    }, authRoutes);

    app.get('/', (req, res) => { //  Тестовый маршрут
        res.send('Textorify Backend API. Use /api/auth for authentication.');
    });

    app.use(errorHandler); // Добавляем в самом конце
  })
  .catch(err => { //  Если не удалось подключиться к БД - выходим
    console.error('Failed to connect to the database:', err);
    process.exit(1); //  Завершаем процесс Node.js с кодом ошибки
  });

export default app;