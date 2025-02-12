import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt; // Получаем JWT из cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Проверяем токен
    req.user = decoded; // Добавляем данные пользователя в объект запроса
    next(); // Передаем управление следующему middleware или обработчику маршрута
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;