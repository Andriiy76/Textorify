import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">
          © {new Date().getFullYear()} Textorify. All rights reserved.
        </p>
        <ul className="footer-links">
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/">FAQ</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
