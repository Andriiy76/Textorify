import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './styles/index.scss'; //  Импортируем SCSS!

const root = createRoot(document.getElementById('root'));
root.render(
  <AuthProvider> {/*  Оборачиваем App в AuthProvider */}
    <App />
  </AuthProvider>
);