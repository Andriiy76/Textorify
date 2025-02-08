import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Header.scss";
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          TEXTORIFY
        </Link>
        <div className="nav-right">
          <button
            className="hamburger-menu"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <nav className={isMenuOpen ? "nav-open" : ""}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/services" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                Blog
              </Link>
            </li>
            {/*  Условный рендеринг  */}
            {!currentUser ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="login-button-wrapper">
                    <button className="login-button">Login</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="signup-button-wrapper">
                    <button className="signup-button">Signup</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="username">
                    {currentUser.name}
                    </span> {/*  Показываем имя пользователя  */}
                </li>
                <li className="nav-item">
                  <button className="logout-button" onClick={logout}> {/* Добавляем кнопку Logout */}
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;