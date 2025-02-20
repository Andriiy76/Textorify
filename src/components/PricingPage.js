import React from "react";
import { motion } from "framer-motion";
import PricingSection from "./Pricing";

const PricingPage = () => {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PricingSection />
    </motion.div>
  );
};

export default PricingPage;
