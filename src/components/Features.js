import React, { useContext } from "react";
import "../styles/components/Features.scss";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const Features = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const featuresData = [
    {
      icon: "fas fa-images",
      title: "Visualize Your Content",
      description:
        "Textorify not only creates text but also automatically selects relevant images. Save time and create comprehensive content in one window!",
    },
    {
      icon: "fas fa-volume-up",
      title: "Voice Your Texts",
      description:
        "Transform any text into an audio file with realistic voices. Create podcasts, audiobooks, and voiceovers for videos effortlessly.",
    },
    {
      icon: "far fa-calendar-alt",
      title: "Smart Content Planning",
      description:
        "Textorify analyzes trends and suggests relevant topics for your content. Plan your publications based on real data, not guesswork.",
    },
    {
      icon: "fas fa-check-circle",
      title: "Texts That Work",
      description:
        "Built-in tools for grammar checking, SEO optimization, and style improvement will help make your texts even more effective.",
    },
    {
      icon: "fas fa-signature",
      title: "Your Brand's Signature Style",
      description:
        "Textorify helps define and maintain your brand's tone of voice, ensuring all your texts are consistent in style.",
    },
    {
      icon: "fas fa-microphone",
      title: "Text from Audio/Video",
      description:
        "Upload an audio or video file, and Textorify will transform it into text. Create subtitles, transcribe interviews, and extract information from multimedia content.",
    },
    {
      icon: "fas fa-plug",
      title: "Seamless Integrations",
      description:
        "Connect Textorify with your favorite tools and platforms. Enjoy smooth integration with popular services like Google Docs, WordPress, Slack, and more.",
    },
    {
      icon: "fas fa-hand-pointer",
      title: "Easy to Use",
      description:
        "Textorify boasts an intuitive interface designed for effortless content creation. No steep learning curve – just start typing and let the AI do the rest.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Задержка между появлением дочерних элементов
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className={`features ${isDarkTheme ? "dark" : ""}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="features-content"
        >
          <div className="features-intro">
            <h2 className="features-title">Discover the Power of Textorify</h2>
            <p className="features-description">
              Explore the key features that make Textorify your go-to AI content
              creation platform. From generating visuals to crafting the perfect
              brand voice, see how Textorify transforms your content strategy.
            </p>
          </div>
          <motion.div
            className="features-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuresData.map((feature, index) => (
              <motion.div
                className="feature"
                key={index}
                variants={itemVariants}
              >
                <i
                  className={`${feature.icon} feature-icon ${
                    isDarkTheme ? "dark" : ""
                  }`}
                ></i>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
