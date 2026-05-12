import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import MagneticButton from '@/components/ui/MagneticButton';
import TypingAnimation from '@/components/ui/TypingAnimation';

export default function HeroSection() {
    const WHATSAPP_URL = "https://wa.me/244921063706?text=Olá! Gostaria de solicitar um orçamento.";

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with parallax */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')`
                }}
                initial={{ scale: 1.1 }} // Static scale
                animate={{ scale: 1.05 }} // Subtle breathe effect
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-[#0a0a0f]/70 to-[#0a0a0f]" />
            </motion.div>

            {/* Floating particles - Optimized */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 4 + 2, // Smaller particles
                            height: Math.random() * 4 + 2,
                            background: `linear-gradient(${Math.random() * 360}deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))`, // Lower opacity
                            willChange: "transform" // GPU Hint
                        }}
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                            opacity: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * -100], // Reduced movement range
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10, // Slower, less CPU intensive
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 sm:space-y-8">

                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 rounded-full text-blue-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-blue-500/20 cursor-pointer"
                        style={{
                            animation: 'pulse-glow 2s ease-in-out infinite'
                        }}>
                        <Sparkles className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        Agência Multifuncional em Angola
                    </motion.span>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-4">

                        Transformamos Ideias em
                        <br />
                        <TypingAnimation
                            text="Realidade Digital"
                            delay={800}
                            speed={100}
                            gradient={true}
                            className="inline-block"
                        />
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }} className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">Design inovador, tecnologia de ponta, Automações, produção musical e audiovisual de excelência




                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 px-4">

                        <MagneticButton
                            strength={0.2}
                            className="pulse-glow group w-full sm:w-auto inline-flex items-center justify-center gap-2 relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 shadow-2xl shadow-blue-500/50 overflow-hidden"
                            onClick={() => window.open(WHATSAPP_URL, '_blank')}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10">Solicitar Orçamento</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                        </MagneticButton>

                        <MagneticButton
                            strength={0.2}
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 relative bg-white/10 hover:bg-white/5 backdrop-blur-md text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 border border-white/20 hover:border-transparent overflow-hidden"
                            onClick={() => window.location.href = createPageUrl('Servicos')}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10">Nossos Serviços</span>
                        </MagneticButton>
                    </motion.div>
                </motion.div>

            </div>
        </section>);

}