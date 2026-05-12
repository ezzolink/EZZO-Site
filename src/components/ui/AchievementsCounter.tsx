import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface CounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number; // segundos
}

function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [hasAnimated, setHasAnimated] = useState(false);

    const motionValue = useSpring(0, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => {
        if (isInView && !hasAnimated) {
            motionValue.set(value);
            setHasAnimated(true);
        }
    }, [isInView, value, hasAnimated, motionValue]);

    const display = useTransform(motionValue, (latest) =>
        Math.floor(latest).toLocaleString()
    );

    return (
        <span ref={ref}>
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </span>
    );
}

interface AchievementData {
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
    icon?: React.ReactNode;
}

interface AchievementsCounterProps {
    achievements: AchievementData[];
    className?: string;
}

export default function AchievementsCounter({ achievements, className = '' }: AchievementsCounterProps) {
    return (
        <section className={`py-16 bg-[#0a0a0f] ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center group"
                        >
                            {achievement.icon && (
                                <div className="flex justify-center mb-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="text-blue-400 group-hover:text-purple-400 transition-colors"
                                    >
                                        {achievement.icon}
                                    </motion.div>
                                </div>
                            )}
                            <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                <AnimatedCounter
                                    value={achievement.value}
                                    prefix={achievement.prefix}
                                    suffix={achievement.suffix}
                                />
                            </div>
                            <p className="text-gray-400 text-sm sm:text-base font-medium">
                                {achievement.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export { AnimatedCounter };
