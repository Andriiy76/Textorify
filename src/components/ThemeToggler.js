import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeToggler = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggler"
      aria-label={isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <FontAwesomeIcon
        icon={isDarkTheme ? faSun : faMoon}
        className={isDarkTheme ? "visible" : ""}
      />
    </button>
  );
};

export default ThemeToggler;
