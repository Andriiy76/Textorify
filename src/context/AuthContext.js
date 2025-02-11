import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

    //  Измененная функция  login
    const login = (user, token) => {
        setCurrentUser({ ...user, token }); //  Сохраняем и  user, и  token
        localStorage.setItem('currentUser', JSON.stringify({ user, token })); //  Сохраняем  user  и  token
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    useEffect(() => {
        const savedData = localStorage.getItem('currentUser');
        if (savedData) {
            const { user, token } = JSON.parse(savedData);
            setCurrentUser({ ...user, token }); //  Восстанавливаем  user  и  token
        }
        setLoading(false);
    }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};