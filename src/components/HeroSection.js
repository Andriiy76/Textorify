import React from "react";
import "../styles/components/HeroSection.scss";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'; //  Добавлено

const HeroSection = () => {
  console.log("HeroSection component rendering"); // Добавлено: отладка

  return (
    <section className="hero">
      <div className="container hero-container">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hero-content"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Effortless Content Creation with Textorify
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Your AI-powered partner for text generation, copywriting, and more.
          </motion.p>
          <div className="hero-buttons">
            <Link to="/services" className="button"> {/*  Изменено на Link */}
              Explore Services
            </Link>
            <Link to="/signup" className="button"> {/*  Изменено на Link */}
              Get Started for Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;