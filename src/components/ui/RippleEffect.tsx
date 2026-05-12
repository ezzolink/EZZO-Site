import React, { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface RippleEffectProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    rippleColor?: string;
}

export default function RippleEffect({
    children,
    className = '',
    onClick,
    rippleColor = 'rgba(255, 255, 255, 0.6)'
}: RippleEffectProps) {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples(prev => [...prev, { x, y, id }]);

        // Remove ripple após animação
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== id));
        }, 600);

        onClick?.();
    };

    return (
        <button
            ref={buttonRef}
            className={`relative overflow-hidden ${className}`}
            onClick={handleClick}
        >
            {children}
            {ripples.map(ripple => (
                <motion.span
                    key={ripple.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        backgroundColor: rippleColor,
                    }}
                    initial={{
                        width: 0,
                        height: 0,
                        opacity: 1,
                        x: '-50%',
                        y: '-50%',
                    }}
                    animate={{
                        width: 500,
                        height: 500,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </button>
    );
}
