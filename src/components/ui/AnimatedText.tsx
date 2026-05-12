import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText({ children, className = "", gradient = true, delay = 0 }) {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    if (gradient) {
        return (
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay }}
                className={`bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x ${className}`}
                style={{
                    backgroundSize: '200% auto',
                }}
            >
                {children}
            </motion.span>
        );
    }

    return (
        <span className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + index * 0.1 }}
                    className="inline-block mr-2"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}