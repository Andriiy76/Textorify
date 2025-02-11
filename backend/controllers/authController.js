// backend/controllers/authController.js
const connectToDatabase = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

exports.registerUser = async (req, res) => {
    // console.log('Received register request:', req.body);  //  Можно закомментировать
    // console.log('Request headers:', req.headers);          //  Можно закомментировать
    const { name, email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const result = await db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        //  *** ГЕНЕРИРУЕМ JWT ***
        const payload = {
            id: result.lastID, //  Используем  result.lastID
            name: name,
            email: email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        //  Отправляем токен и данные пользователя клиенту
        res.status(201).json({
            message: 'User registered successfully',
            token: token, //  Добавили  token
            user: {
                id: result.lastID,
                name,
                email,
            },
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    } finally {
        // await db.close(); // Пока не нужно
    }
};

exports.loginUser = async (req, res) => {
    // console.log('Received login request:', req.body);   // Можно закомментировать
    // console.log('Request headers:', req.headers);       // Можно закомментировать
    const { loginIdentifier, password } = req.body;

    try {
        const db = await connectToDatabase();

        //  Ищем пользователя ИЛИ по email, ИЛИ по name
        const user = await db.get(
            'SELECT * FROM users WHERE email = ? OR name = ?',
            [loginIdentifier, loginIdentifier]
        );

        // console.log('Found user:', user); //  Для отладки

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log('Password match:', passwordMatch); //  Для отладки

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        //  *** ГЕНЕРИРУЕМ JWT ***
        const payload = {
            id: user.id,
            name: user.name, //  Можно добавить и другие данные (но не пароль!)
            email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h', //  Токен будет действовать 1 час (можно изменить)
        });

        //  Отправляем токен и данные пользователя клиенту
        res.status(200).json({
            message: 'Login successful',
            token: token, //  Добавили  token
            user: {      //  Это  уже было
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    } finally {
        // await db.close(); //  Пока не нужно
    }
};