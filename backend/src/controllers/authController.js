// backend/src/controllers/authController.js
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateToken } from '../config/jwtConfig.js';
import {
    findUserByEmail,
    createUser,
    setEmailVerificationToken,
    findUserByVerificationToken,
    verifyEmail,
    updateUser
} from '../models/userModel.js';
import { setAuthCookie } from '../utils/auth.js';
import sendVerificationEmail from '../utils/sendEmail.js';

const registerUser = async (req, res, next) => {
    // ... (предыдущий код registerUser) ...
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const db = req.db;
        const user = await findUserByEmail(db, email);
        if (user) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //  ПОЛУЧАЕМ ID БЕСПЛАТНОГО ПЛАНА:
        const freePlan = await db.get("SELECT id FROM plans WHERE name = 'free'");
        if (!freePlan) {
            return res.status(500).json({ message: 'Free plan not found.  Please contact support.' }); //  Или другая обработка
        }
        const planId = freePlan.id;

        const userId = await createUser(db, email, hashedPassword, planId); //  Передаем planId

        //  Генерируем токен и время истечения (1 час):
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = Date.now() + 3600 * 1000; // 1 hour

        await setEmailVerificationToken(db, userId, verificationToken, expiresAt);

        //  ОТПРАВЛЯЕМ EMAIL (ПОКА ЗАГЛУШКА):
        try {
            await sendVerificationEmail(email, verificationToken);
            res.status(201).json({ message: 'User registered successfully.  Please check your email to verify your account.' });
        }
        catch (error){
            console.error("Error in sendEmail:", error);
            await updateUser(db, userId, {email_verification_token: null, email_verification_token_expires_at: null})
            return res.status(500).json({ message: 'Failed to send verification email.'})
        }

    } catch (error) {
        console.error("Error in registerUser:", error);
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const db = req.db;
        const user = await findUserByEmail(db, email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!user.is_email_verified) {
            //  Возвращаем 403 и email пользователя (для повторной отправки)
            return res.status(403).json({ message: 'Please verify your email address.', email: user.email }); //  ДОБАВИЛИ email
        }

        const token = generateToken({ userId: user.id, email: user.email });

        setAuthCookie(res, token);
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        next(error);
    }
};

const logoutUser = (req, res) => { // Без изменений
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

const verifyEmailController = async (req, res, next) => { // Без изменений
// ... (предыдущий код verifyEmailController) ...
    const { token } = req.params;

    try {
        const db = req.db;
        const user = await findUserByVerificationToken(db, token);

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token.' });
        }
        await verifyEmail(db, user.id);

        res.status(200).json({ message: 'Email verified successfully. You can now login.' });
    } catch (error) {
        next(error);
    }
};

//  НОВАЯ ФУНКЦИЯ:
const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const db = req.db;
    const user = await findUserByEmail(db, email);

    if (!user) {
      //  В целях безопасности НЕ сообщаем, что пользователя с таким email нет
      return res.status(200).json({ message: 'If your email address is registered, you will receive a verification email.' });
    }

    if (user.is_email_verified) {
      return res.status(200).json({ message: 'Email already verified.' }); //  Или 400 Bad Request
    }

    //  Генерируем новый токен и время истечения:
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 3600 * 1000; // 1 hour

    await setEmailVerificationToken(db, user.id, verificationToken, expiresAt);

    //  ОТПРАВЛЯЕМ EMAIL:
    await sendVerificationEmail(email, verificationToken); //  ДОБАВЛЯЕМ!

    res.status(200).json({ message: 'Verification email resent.  Please check your inbox.' });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, logoutUser, verifyEmailController, resendVerificationEmail }; //  Добавляем resendVerificationEmail