// textorify-frontend/src/components/VerifyEmail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams(); // Получаем токен из URL
  const [message, setMessage] = useState('Verifying...');
  const [isSuccess, setIsSuccess] = useState(false); // Добавляем состояние для успешной/неуспешной верификации
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/verify-email/${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message); // "Email verified successfully."
          setIsSuccess(true); // Устанавливаем в true
          //  Можно сделать редирект на страницу входа через некоторое время
          setTimeout(() => {
            navigate('/login');
          }, 5000); // Редирект через 5 секунд
        } else {
          setMessage(data.message || 'Email verification failed.');
          setIsSuccess(false); // Устанавливаем в false
        }
      } catch (error) {
        console.error('Verification error:', error);
        setMessage('An error occurred during verification.');
        setIsSuccess(false); // Устанавливаем в false
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="verify-email-container">
      <h2>Email Verification</h2>
      <p className={isSuccess ? "success-message" : "error-message"}>{message}</p> {/*  Добавляем класс в зависимости от статуса */}
      {isSuccess && <p>You will be redirected to the login page shortly...</p>} {/*  Дополнительное сообщение */}
      {!isSuccess && <p>Please try again later or contact support.</p>} {/*  Дополнительное сообщение */}

      <style jsx>{`
        .verify-email-container {
          padding: 20px;
          text-align: center;
        }

         .success-message {
          color: green;
        }

        .error-message {
          color: red;
        }
      `}</style>

    </div>
  );
};

export default VerifyEmail;