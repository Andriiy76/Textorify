// backend/src/config/jwtConfig.js
import jwt from 'jsonwebtoken';

const generateToken = (payload) => { //  Принимает payload (полезную нагрузку)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null; //  Или выбрасывайте ошибку, в зависимости от вашей логики
  }
};

export { generateToken, verifyToken };