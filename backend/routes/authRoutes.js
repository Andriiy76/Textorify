import express from 'express';
const router = express.Router();
import createAuthController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Импортируем middleware

const createAuthRoutes = (db) => {
  const authController = createAuthController(db);

  router.post('/register', authController.registerUser);
  router.post('/login', authController.loginUser);
  router.post('/logout', authController.logout);

  // Пример защищенного маршрута
  router.get('/me', authMiddleware, (req, res) => {
    // req.user содержит данные пользователя из JWT
    res.json({ user: req.user });
  });

  return router;
};

export default createAuthRoutes;