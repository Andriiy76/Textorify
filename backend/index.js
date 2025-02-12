import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from './db/db.js'; // Импортируем функцию подключения
import createAuthRoutes from './routes/authRoutes.js'; // Импортируем функцию, создающую маршруты

const app = express();

const corsOptions = {
    origin: 'https://orange-engine-jj7g57j94xqw3j6gr-3000.app.github.dev',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Подключаемся к базе данных ОДИН РАЗ
connectToDatabase()
  .then(db => {
    // Создаем маршруты, передавая им объект базы данных
    const authRoutes = createAuthRoutes(db);
    app.use('/api/auth', authRoutes);

    app.get('/', (req, res) => {
      res.send('Textorify Backend API. Use /api/auth for authentication.');
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start the server:', err);
  });