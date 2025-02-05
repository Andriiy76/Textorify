import React, { useContext } from "react";
import "../styles/components/HowItWorks.scss";
import step1Image from "../images/step1_placeholder.jpg";
import step2Image from "../images/step2_placeholder.jpg";
import step3Image from "../images/step3_placeholder.jpg";
import step4Image from "../images/step4_placeholder.jpg";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const HowItWorks = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const steps = [
    {
      image: step1Image,
      alt: "Step 1 Screenshot",
      title: "Step 1: Define Your Task",
      description:
        "Clearly articulate the type of text you need. Select the content type, topic, keywords, desired length, and other specifics. The more precise your request, the better the result Textorify will generate.",
    },
    {
      image: step2Image,
      alt: "Step 2 Screenshot",
      title: "Step 2: Generate with AI",
      description:
        'Hit "Generate", and Textorify will craft multiple text options tailored to your specifications. Our AI algorithms will consider all your requirements, delivering highly relevant results for you to choose from or further customize.',
    },
    {
      image: step3Image,
      alt: "Step 3 Screenshot",
      title: "Step 3: Refine and Customize",
      description:
        "Utilize the built-in tools to enhance the generated text. Check grammar and spelling, optimize for search engines, alter the style and tone, and add a touch of uniqueness.",
    },
    {
      image: step4Image,
      alt: "Step 4 Screenshot",
      title: "Step 4: Download or Publish",
      description:
        "Download the finalized text in your preferred format (DOCX, PDF, TXT, etc.) or publish it directly to your website, blog, or social media platforms through integration with popular platforms.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Задержка между появлением дочерних элементов
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const rightStepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      className={`howitworks howitworks-alternate ${isDarkTheme ? "dark" : ""}`}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="howitworks-container"
        >
          <div className="howitworks-intro">
            <h2 className="howitworks-title">How Textorify Works</h2>
            <p className="howitworks-description">
              Unlock the potential of AI-powered content creation with
              Textorify. Learn how our intuitive process empowers you to
              generate, refine, and share your content in just a few simple
              steps.
            </p>
          </div>
          <motion.div
            className="steps"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                className="step"
                key={index}
                variants={index % 2 === 0 ? stepVariants : rightStepVariants}
                transition={{ duration: 0.5 }}
              >
                <img src={step.image} alt={step.alt} className="step-image" />
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="cta">
            <a href="/signup" className="button">
              Try Textorify for Free
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
