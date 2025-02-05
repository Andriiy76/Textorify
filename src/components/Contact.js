import React from 'react';
import { motion } from "framer-motion";

function Contact() {
    return (
        <motion.div
            className='container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1>Contact Us</h1>
            <p>Have questions or feedback? We'd love to hear from you!</p>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message"></textarea>
                </div>
                <button type="submit" className="button">Send</button>
            </form>

            <p>You can also reach us by email at <a href="mailto:support@textorify.com">support@textorify.com</a>.</p>
        </motion.div>
    );
}

export default Contact;