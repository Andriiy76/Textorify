import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "../styles/components/FAQ.scss";
import { ThemeContext } from "../context/ThemeContext";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { isDarkTheme } = useContext(ThemeContext);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Textorify?",
      answer:
        "Textorify is an AI-powered content creation platform that helps you generate high-quality text and visual content quickly and easily. It leverages advanced artificial intelligence algorithms to assist you in writing articles, blog posts, social media updates, marketing materials, and much more.",
    },
    {
      question: "How does Textorify work?",
      answer:
        "Textorify uses state-of-the-art AI to generate content based on your input. Simply provide a topic, keywords, or a brief description, and Textorify will generate various text options for you to choose from. You can then refine and customize the generated content to fit your needs.",
    },
    {
      question: "What types of content can Textorify create?",
      answer:
        "Textorify can help you create a wide range of content, including:\n- Blog posts and articles\n- Social media captions and updates\n- Website copy\n- Marketing emails\n- Product descriptions\n- Advertising materials\n- And much more!",
    },
    {
      question: "Can Textorify also generate images?",
      answer:
        "Yes, Textorify offers advanced image generation capabilities. It can automatically create relevant visuals to complement your text, saving you time and effort.",
    },
    {
      question: "Does Textorify offer audio versions of the generated text?",
      answer:
        "Absolutely! Textorify can transform your generated text into high-quality audio files with natural-sounding voices. This feature is perfect for creating podcasts, audiobooks, or adding voiceovers to your videos.",
    },
    {
      question: "Can I create a content plan with Textorify?",
      answer:
        "Yes, Textorify provides intelligent content planning tools. It analyzes current trends and suggests relevant topics based on your chosen keywords, helping you create a data-driven content strategy.",
    },
    {
      question:
        "How does Textorify ensure the quality of the generated content?",
      answer:
        "Textorify utilizes advanced AI algorithms and integrates with tools like Grammarly to ensure the generated content is grammatically correct, engaging, and optimized for readability. You can further refine and customize the text using the built-in editing tools.",
    },
    {
      question: "What are the pricing plans for Textorify?",
      answer:
        "Textorify offers a range of pricing plans to suit different needs, from individuals and small teams to large businesses and agencies. You can find detailed information about our pricing plans on our Pricing page (link to the Pricing page).",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a free 7-day trial of Textorify, allowing you to explore all the features and experience the power of AI-powered content creation before committing to a subscription.",
    },
    {
      question: "How can I contact Textorify support?",
      answer:
        "You can reach our support team via email at support@textorify.com or through the contact form on our website. We're always happy to help!",
    },
  ];

  return (
    <section className={`faq ${isDarkTheme ? "dark" : ""}`}>
      <div className="container">
        <motion.div
          className="faq-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="faq-intro">
            <motion.h2
              className="faq-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="faq-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Have questions about Textorify? Find answers to the most common
              queries below.
            </motion.p>
          </div>
          <motion.div
            className="faq-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }} // Добавили задержку
          >
            {faqData.map((faq, index) => (
              <div className="faq-item" key={index}>
                <button
                  className={`faq-question ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => toggleQuestion(index)}
                >
                  {faq.question}
                  <motion.span
                    className="faq-plus"
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  className={`faq-answer ${
                    activeIndex === index ? "active" : ""
                  }`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    activeIndex === index
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {faq.answer.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
