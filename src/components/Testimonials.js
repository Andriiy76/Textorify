import React, { useContext } from "react";
import "../styles/components/Testimonials.scss";
import user1 from "../images/user1.webp";
import user2 from "../images/user2.webp";
import user3 from "../images/user3.webp";
import user4 from "../images/user4.jpeg";
import user5 from "../images/user5.jpeg";
import user6 from "../images/user6.jpeg";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const Testimonials = () => {
  const { isDarkTheme } = useContext(ThemeContext);
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
    <section className={`testimonials ${isDarkTheme ? "dark" : ""}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="testimonials-content"
        >
          <div className="testimonials-intro">
            <h2 className="testimonials-title">What Our Users Say</h2>
            <p className="testimonials-description">
              Don't just take our word for it. See what users are saying about
              their experience with Textorify.
            </p>
          </div>
          <motion.div
            className="testimonials-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="testimonial-card" variants={itemVariants}>
              <img
                src={user1}
                alt="User Avatar"
                className="testimonial-avatar"
              />
              <p className="testimonial-text">
                "Textorify has revolutionized my content creation process! The
                AI-powered text generation is incredibly fast and accurate, and
                the ability to automatically generate images saves me so much
                time. I highly recommend it to anyone who needs to produce
                high-quality content quickly."
              </p>
              <p className="testimonial-author">- Sarah Johnson</p>
              <p className="testimonial-role">Marketing Manager at InnovateX</p>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <img
                src={user2}
                alt="User Avatar"
                className="testimonial-avatar"
              />
              <p className="testimonial-text">
                "As a blogger, I'm always looking for ways to improve my writing
                and streamline my workflow. Textorify has been a game-changer!
                The AI-generated content is surprisingly good, and the built-in
                editing tools help me polish my work to perfection."
              </p>
              <p className="testimonial-author">- Mark Davis</p>
              <p className="testimonial-role">
                Freelance Writer at The Write Stuff
              </p>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <img
                src={user3}
                alt="User Avatar"
                className="testimonial-avatar"
              />
              <p className="testimonial-text">
                "I was skeptical about using AI for content creation, but
                Textorify has completely changed my mind. It's like having a
                personal writing assistant available 24/7. The content plans are
                especially helpful - they've given me so many great ideas!"
              </p>
              <p className="testimonial-author">- Emily Chen</p>
              <p className="testimonial-role">
                Social Media Manager at Buzzworthy
              </p>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <img
                src={user4}
                alt="User Avatar"
                className="testimonial-avatar"
              />
              <p className="testimonial-text">
                "Our team has been using Textorify for a few weeks now, and
                we're already seeing a huge improvement in our content output.
                The ability to define our brand voice and ensure consistency
                across all our materials is invaluable."
              </p>
              <p className="testimonial-author">- John Smith</p>
              <p className="testimonial-role">CEO of Tech Solutions Inc.</p>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <img
                src={user5}
                alt="User Avatar"
                className="testimonial-avatar"
              />
              <p className="testimonial-text">
                "The audio generation feature is amazing! I've been able to
                create audio versions of my blog posts in minutes, which has
                helped me reach a whole new audience. Textorify is a must-have
                tool for any serious content creator."
              </p>
              <p className="testimonial-author">- Maria Garcia</p>
              <p className="testimonial-role">
                Content Creator at Digital Nomad
              </p>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <img
                src={user6}
                alt="User Avatar"
                className="testimonial-avatar"
              />
              <p className="testimonial-text">
                "I love how easy Textorify is to use. Even without any prior
                experience with AI, I was able to start generating high-quality
                content right away. The interface is intuitive and
                user-friendly, and the results are impressive."
              </p>
              <p className="testimonial-author">- David Lee</p>
              <p className="testimonial-role">
                Small Business Owner at Local Delights
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
