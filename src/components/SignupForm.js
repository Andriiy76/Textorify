// textorify-frontend/src/components/SignupForm.js
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; //Удаляем
import '../styles/components/SignupForm.scss';

const SignupForm = () => {
  const [email, setEmail] = useState(''); //  Убираем name
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); //  Добавляем confirmPassword
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); //  ДОБАВИТЬ
  // const { login } = useAuth(); //Удаляем
  //const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (password !== confirmPassword) { //  Добавляем проверку
        setError('Passwords do not match.');
        setIsSubmitting(false);
        return;
    }

    try {
      console.log("Sending signup data:", { email, password, confirmPassword }); // ДОБАВЛЕНО

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }), //  Добавляем confirmPassword
      });

      console.log("SignupForm response:", response);

        if (!response.ok) {
          const data = await response.json(); //  Добавляем
          throw new Error(data.message || 'Signup failed'); //  Добавляем
        }

      setIsSubmitting(false);
        setRegistrationSuccess(true); //  Устанавливаем флаг успеха
        // navigate('/login'); //  Перенаправляем на страницу входа
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}

        {registrationSuccess ? ( //  Показываем сообщение, если регистрация успешна
            <div className="success-message">
              Registration successful! Please check your email to verify your account.
            </div>
        ) : (
            <>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </>
        )}
    </form>
  );
};

export default SignupForm;