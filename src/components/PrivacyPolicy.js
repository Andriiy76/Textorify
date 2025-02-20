import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Privacy Policy</h1>

      <p>
        This Privacy Policy describes how Textorify ("we," "us," or "our")
        collects, uses, and shares your personal information when you use our
        website and services (the "Service").
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect the following types of information:
      </p>
      <ul>
        <li>
          <b>Personal Information:</b> When you sign up for an account, we may collect your name, email address, and payment information.
        </li>
        <li>
          <b>Usage Data:</b> We collect information about how you use the Service, such as the types of content you generate, the features you use, and the time and date of your usage.
        </li>
        <li>
          <b>Device Information:</b> We may collect information about the device you use to access the Service, such as your IP address, browser type, and operating system.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We use your information for the following purposes:
      </p>
      <ul>
        <li>To provide and improve the Service.</li>
        <li>To personalize your experience.</li>
        <li>To communicate with you about the Service.</li>
        <li>To process payments.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>Information Sharing</h2>
      <p>
        We do not share your personal information with third parties except as described in this Privacy Policy or with your consent.
      </p>
      <ul>
        <li>
          <b>Service Providers:</b> We may share your information with third-party service providers who help us operate the Service, such as payment processors and hosting providers.
        </li>
        <li>
          <b>Legal Compliance:</b> We may disclose your information if required by law or legal process.
        </li>
        <li>
          <b>Business Transfers:</b> We may share your information in connection with a merger, acquisition, or sale of all or a portion of our assets.
        </li>
      </ul>

      <h2>Your Choices</h2>
      <p>
        You can access and update your personal information by logging into your account. You can also unsubscribe from our marketing emails by clicking the "unsubscribe" link at the bottom of the email.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
      </p>

      <h2>Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Service.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@textorify.com">support@textorify.com</a>.
      </p>
    </motion.div>
  );
};

export default PrivacyPolicy;