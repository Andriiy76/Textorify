// backend/src/utils/sendEmail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const mailOptions = {
    from: '"Textorify" <no-reply@textorify.com>',
    to: email,
    subject: 'Textorify - Verify Your Email',
    html: `<p>Please click the following link to verify your email:</p>
           <p><a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to: ${email}`);
    console.log(`Verification link: ${verificationLink}`); //  Добавили вывод ссылки в консоль
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error('Failed to send verification email.');
  }
};

export { sendVerificationEmail };