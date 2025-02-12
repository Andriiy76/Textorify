import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/db.js'; // Добавляем .js

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const COOKIE_MAX_AGE = 1000 * 60 * 60; // 1 час в миллисекундах

// Функция, которая создает контроллер и принимает объект базы данных
const createAuthController = (db) => { // Принимаем db как параметр

    const authController = {
        registerUser: async (req, res) => {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            try {
                // const database = await db; // Уже не нужно!
                const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]); // Используем db, полученный извне
                if (existingUser) {
                    return res.status(409).json({ message: 'User with this email already exists' });
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const insert = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
                const result = await insert.run(name, email, hashedPassword);
                await insert.finalize();

                const userId = result.lastInsertRowid;

                const token = jwt.sign({ userId, name, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

                console.log("Setting cookie in registerUser.  NODE_ENV:", process.env.NODE_ENV); // ДОБАВЛЕНО
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', //поменяй на true если не заработает
                    sameSite: 'strict',
                    maxAge: COOKIE_MAX_AGE,
                });

                res.status(201).json({ message: 'User registered successfully' });

            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        },

        loginUser: async (req, res) => {
            const { loginIdentifier, password } = req.body;

            if (!loginIdentifier || !password) {
                return res.status(400).json({ message: 'Both login identifier and password are required' });
            }

            try {
                // const database = await db; // Уже не нужно!
                console.log("Database object:", db); // Проверяем, что db - это объект базы данных
                const user = await db.get('SELECT * FROM users WHERE email = ? OR name = ?', [loginIdentifier, loginIdentifier]);

                if (!user) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                const token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

                console.log("Setting cookie in loginUser. NODE_ENV:", process.env.NODE_ENV); // ДОБАВЛЕНО
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: true, // ВРЕМЕННО ставим true
                    sameSite: 'strict',
                    maxAge: COOKIE_MAX_AGE,
                });

                res.status(200).json({ message: 'Logged in successfully' });

            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        },
         logout: (req, res) => {
            try {
                res.clearCookie('jwt', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                });
                res.status(200).json({ message: 'Logged out successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        },
    };

    return authController;
};
export default createAuthController;