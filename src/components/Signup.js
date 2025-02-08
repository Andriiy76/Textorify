import React from 'react';
import SignupForm from './SignupForm'; //  Импортируем  SignupForm

const Signup = () => {
    return (
      <div className='container'>
        <SignupForm />  {/*  Используем  SignupForm  */}
      </div>
    );
};

export default Signup;