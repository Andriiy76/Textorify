import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components/LoginForm.scss';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resendEmail, setResendEmail] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);
        setResendMessage(''); //  Очищаем сообщение

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                login();
                setIsSubmitting(false);
                navigate('/');
            } else {
                const data = await response.json();
                if (response.status === 403 && data.email) {
                    setError(data.message);
                    setResendEmail(data.email);
                  //  setIsSubmitting(false);  //  УБРАТЬ!
                } else {
                    throw new Error(data.message || 'Login failed');
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
            // setIsSubmitting(false); //  УБРАТЬ!
        } finally {  //  ДОБАВИТЬ
            setIsSubmitting(false);
        }
    };
  const handleResendEmail = async (event) => {
      event.preventDefault();
      setResendMessage('');
      setIsSubmitting(true);

      try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/resend-verification-email`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: resendEmail }), //  Отправляем email
          });

          const data = await response.json();
          setResendMessage(data.message); //  Показываем сообщение от backend
      } catch (error) {
          console.error("Resend email error:", error);
          setResendMessage('Failed to resend verification email.'); //  Показываем сообщение об ошибке
      } finally {
          setIsSubmitting(false);
      }
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
        {/*  Отображаем только одно сообщение об ошибке: */}
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      {resendEmail && (
        <div className="resend-email">
          {/* <p>{error}</p>  Убрали, так как сообщение уже выводится вверху */}
            {/* Меняем форму на ссылку */}
            <a
              href="#"  //  Добавляем фиктивный href
              className="resend-link"  //  Добавляем класс
              onClick={(event) => { //  Добавляем обработчик клика
                event.preventDefault(); //  Предотвращаем переход по ссылке
                handleResendEmail(event); //  Вызываем handleResendEmail
              }}
              disabled={isSubmitting}
            >
              Resend Verification Email
            </a>
          {resendMessage && <p>{resendMessage}</p>}
        </div>
      )}
    </form>
  );
};

export default LoginForm;