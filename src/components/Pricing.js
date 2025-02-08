import React from "react";
import { motion } from "framer-motion";
import "../styles/components/Pricing.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="pricing">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pricing-content"
        >
          <div className="pricing-intro">
            <h2 className="pricing-title">Pricing Plans</h2>
            <p className="pricing-description">
              Choose the plan that best suits your needs and start creating
              amazing content with Textorify today.
            </p>
          </div>
          <motion.div
            className="pricing-cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="pricing-card" variants={itemVariants}>
              <div className="pricing-card-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h3 className="pricing-card-title">Starter</h3>
              <div className="pricing-card-price">$10/month</div>
              <p className="pricing-card-description">
                Perfect for individuals and small teams getting started with AI
                content creation.
              </p>
              <ul className="pricing-card-features">
                <li>100 requests/month</li>
                <li>Basic image generation</li>
                <li>Up to 10 minutes of audio generation</li>
                <li>Basic image generation</li>
                <li>Up to 10 minutes of audio generation</li>
              </ul>
              <a href="/signup" className="button">
                Get Started
              </a>
            </motion.div>
            <motion.div
              className="pricing-card pricing-card-popular"
              variants={itemVariants}
            >
              <div className="pricing-card-ribbon">Most Popular</div>
              <div className="pricing-card-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
              <h3 className="pricing-card-title">Pro</h3>
              <div className="pricing-card-price">$30/month</div>
              <p className="pricing-card-description">
                Ideal for content creators and marketers who need more power and
                flexibility.
              </p>
              <ul className="pricing-card-features">
                <li>Unlimited requests</li>
                <li>Advanced image generation</li>
                <li>Up to 60 minutes of audio generation</li>
                <li>Advanced image generation</li>
                <li>Up to 60 minutes of audio generation</li>
              </ul>
              <a href="/signup" className="button">
                Get Started
              </a>
            </motion.div>
            <motion.div className="pricing-card" variants={itemVariants}>
              <div className="pricing-card-icon">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <h3 className="pricing-card-title">Business</h3>
              <div className="pricing-card-price">$100/month</div>
              <p className="pricing-card-description">
                Designed for businesses and agencies with high-volume content
                needs.
              </p>
              <ul className="pricing-card-features">
                <li>Unlimited requests</li>
                <li>Priority support</li>
                <li>Team collaboration features</li>
                <li>Priority support</li>
                <li>Team collaboration features</li>
              </ul>
              <a href="/signup" className="button">
                Get Started
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
