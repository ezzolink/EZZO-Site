import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <motion.button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <span className="text-sm font-medium">Scroll</span>
            <motion.div
                animate={{
                    y: [0, 8, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <ChevronDown className="w-6 h-6" />
            </motion.div>

            {/* Mouse icon */}
            <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1 group-hover:border-white/60 transition-colors">
                <motion.div
                    className="w-1 h-2 bg-white/50 rounded-full mx-auto"
                    animate={{
                        y: [0, 12, 0],
                        opacity: [1, 0, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>
        </motion.button>
    );
}
