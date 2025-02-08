import React, { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст
const AuthContext = createContext();

// Хук, чтобы было удобнее использовать контекст в компонентах
export const useAuth = () => {
  return useContext(AuthContext);
};

// Провайдер контекста
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // null - пользователь не залогинен
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

  // Функция для входа (пока фиктивная)
  const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user)); // Сохраняем в localStorage
  };

  // Функция для выхода
  const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser'); // Удаляем из localStorage
  };

  // Проверяем наличие пользователя в localStorage при загрузке
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
        setLoading(false); // Устанавливаем loading в false после проверки
    }, []);

  // Значение, которое будет доступно всем компонентам, обернутым в AuthProvider
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