import React, { createContext, useState, useEffect } from "react";

// Создаем контекст
export const ThemeContext = createContext();

// Создаем провайдер контекста
export const ThemeProvider = ({ children }) => {
  // Определяем состояние темы, по умолчанию - светлая
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Проверяем наличие сохраненной темы в localStorage при загрузке
  useEffect(() => {
    const savedTheme = localStorage.getItem("isDarkTheme");
    if (savedTheme !== null) {
      setIsDarkTheme(JSON.parse(savedTheme));
    }
  }, []);

  // Переключатель темы
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("isDarkTheme", JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
