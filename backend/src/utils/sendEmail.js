// backend/src/utils/sendEmail.js
import nodemailer from 'nodemailer';

//  Создаем транспорт (подключение к SMTP-серверу):
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", //  Используем Mailtrap
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER, //  Берем из .env
    pass: process.env.MAILTRAP_PASS  //  Берем из .env
  }
});

/**
 * Отправляет email для подтверждения регистрации.
 * @param {string} email  Email получателя.
 * @param {string} token  Токен подтверждения.
 */
const sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: '"Textorify" <no-reply@textorify.com>', //  Отправитель (замените на свой)
    to: email, //  Получатель
    subject: 'Textorify - Verify Your Email', //  Тема письма
    text: `Please click the following link to verify your email: ${process.env.FRONTEND_URL}/verify-email/${token}`, //  Текст письма (обычный текст)
    html: //  HTML-версия письма (лучше)
      `<p>Please click the following link to verify your email:</p>
       <p><a href="${process.env.FRONTEND_URL}/verify-email/${token}">${process.env.FRONTEND_URL}/verify-email/${token}</a></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    //  Для Mailtrap:
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); //  Это ОЧЕНЬ удобно!
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; //  Перебрасываем ошибку
  }
};

export default sendVerificationEmail;