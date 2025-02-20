import React from 'react';
import { motion } from "framer-motion";

function Blog() {
    return (
        <motion.div
            className='container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1>Blog</h1>
            <article>
                <h2>The Rise of AI in Content Creation</h2>
                <p>Published on: March 1, 2023</p>
                <p>Discover how AI is transforming the landscape of content creation...</p>
                
            </article>

            <article>
                <h2>Tips for Effective Content Planning</h2>
                <p>Published on: February 15, 2023</p>
                <p>Learn the best strategies for planning your content to engage your audience...</p>
                
            </article>

            <article>
                <h2>Maximizing SEO with AI Tools</h2>
                <p>Published on: January 28, 2023</p>
                <p>Explore how AI tools can boost your SEO efforts and improve your website's ranking...</p>
                
            </article>

            <article>
                <h2>Creating a Unique Brand Voice with AI</h2>
                <p>Published on: January 5, 2023</p>
                <p>
                    A strong brand voice is essential for standing out in the crowded digital world. Learn how to use AI to define, maintain, and evolve your brand's unique voice...
                </p>
                
            </article>
        </motion.div>
    );
}

export default Blog;