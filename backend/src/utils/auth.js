// backend/src/utils/auth.js

/**
 * Устанавливает JWT в httpOnly cookie.
 * @param {import('express').Response} res Объект ответа Express.
 * @param {string} token JWT токен.
 */
const setAuthCookie = (res, token) => {
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: Number(process.env.COOKIE_MAX_AGE),
      path: '/', //  ВАЖНО: Устанавливаем cookie на все пути
    });
  };
  
  export { setAuthCookie };