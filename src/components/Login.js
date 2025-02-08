import React from 'react';
import LoginForm from './LoginForm'; //  Импортируем  LoginForm

const Login = () => {
    return (
        <div className='container'>
          <LoginForm /> {/*  Используем  LoginForm  */}
        </div>
    );
};

export default Login;