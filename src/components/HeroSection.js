import React from "react";
import "../styles/components/HeroSection.scss";
import heroImage from "../images/hero.jpeg";
import { motion } from "framer-motion";

const HeroSection = () => {
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
            <motion.a
              href="/services"
              className="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Explore Services
            </motion.a>
            <motion.a
              href="/signup"
              className="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Get Started for Free
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="hero-image"
        >
          <img src={heroImage} alt="Artificial intelligence generating text" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
