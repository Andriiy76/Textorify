import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Header.scss";
import ThemeToggler from "./ThemeToggler";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isDarkTheme ? "dark" : "light"}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          TEXTORIFY
        </Link>
        <ThemeToggler />
        <button className="hamburger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
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
            <li className="nav-item">
              <Link to="/login" className="nav-link login-button">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
