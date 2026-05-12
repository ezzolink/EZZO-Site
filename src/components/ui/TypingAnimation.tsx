import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    gradient?: boolean;
}

export default function TypingAnimation({
    text,
    delay = 0,
    speed = 50,
    className = '',
    gradient = false
}: TypingAnimationProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, currentIndex === 0 ? delay : speed);

            return () => clearTimeout(timeout);
        } else {
            setIsComplete(true);
        }
    }, [currentIndex, text, delay, speed]);

    const baseClass = gradient
        ? 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'
        : '';

    return (
        <span className={`${baseClass} ${className}`}>
            {displayedText}
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="ml-1"
                >
                    |
                </motion.span>
            )}
        </span>
    );
}
