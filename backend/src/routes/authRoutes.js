// backend/src/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser, verifyEmailController, resendVerificationEmail } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verify-email/:token', verifyEmailController);
router.post('/resend-verification-email', resendVerificationEmail); //  ДОБАВЛЯЕМ

export default router;