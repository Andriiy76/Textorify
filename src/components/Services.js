import React from 'react';
import { motion } from "framer-motion";

const Services = () => {
    return (
        <motion.div
            className='container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1>Services</h1>
            <h2>AI Text Generation</h2>
            <p>
                Harness the power of advanced AI to generate compelling, accurate, and engaging text content.
                Whether it's blog posts, articles, or marketing copy, our AI adapts to various styles and tones
                to meet your specific needs.
            </p>

            <h2>Image Generation</h2>
            <p>
                Create stunning visuals to accompany your text. Our AI can generate custom images that align
                with your content's theme, enhancing the overall impact of your message.
            </p>

            <h2>Audio Content Creation</h2>
            <p>
                Transform your text into high-quality audio files. Ideal for podcasts, audiobooks, or voiceovers,
                our AI provides natural-sounding voices that bring your words to life.
            </p>

            <h2>Content Plans</h2>
            <p>
                Benefit from AI-driven insights to develop strategic content plans. Our platform analyzes trends
                and suggests topics, ensuring your content remains relevant and engaging.
            </p>

            <h2>SEO Optimization</h2>
            <p>
                Elevate your content's visibility with our SEO optimization tools. We help you craft content that
                ranks higher on search engines, driving more traffic to your site.
            </p>

            <h2>Grammar and Style Enhancement</h2>
            <p>
                Refine your content with our integrated grammar and style checking tools. Ensure your message is
                clear, concise, and error-free.
            </p>

            <h2>Brand Voice Customization</h2>
            <p>
                Maintain a consistent brand voice across all your content. Our AI learns your brand's unique style
                and applies it to every piece of content generated.
            </p>

            <h2>Integrations with Popular Platforms</h2>
            <p>
                Seamlessly integrate with your existing workflow. Our platform connects with popular tools like
                Google Docs, WordPress, and social media platforms for easy content management and publishing.
            </p>

            <h2>Custom Solutions for Businesses</h2>
            <p>
                We offer tailored AI content solutions for businesses of all sizes. From startups to large
                enterprises, we provide scalable options to meet your unique content needs.
            </p>
        </motion.div>
    );
}

export default Services;