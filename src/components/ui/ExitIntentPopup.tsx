import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Gift } from 'lucide-react';

interface ExitIntentPopupProps {
    onClose?: () => void;
    title?: string;
    message?: string;
    ctaText?: string;
    onCTA?: () => void;
}

export default function ExitIntentPopup({
    onClose,
    title = "Espera! Não vá ainda...",
    message = "Ganhe uma consulta GRATIS para o seu projeto!",
    ctaText = "Quero Minha Consulta Gratis",
    onCTA
}: ExitIntentPopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            // Detecta quando o mouse sai pela parte superior da página
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasShown]);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    const handleCTA = () => {
        if (onCTA) {
            onCTA();
        } else {
            // Default: abrir WhatsApp
            window.open("https://wa.me/244921063706?text=Olá! Quero aproveitar a consulta grátis!", '_blank');
        }
        handleClose();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-lg"
                    >
                        <div className="relative bg-gradient-to-br from-[#111827] to-[#1a2332] rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-500/30">
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse" />

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Content */}
                            <div className="relative p-8 sm:p-10 text-center">
                                {/* Icon */}
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                    className="inline-block mb-6"
                                >
                                    <Gift className="w-16 h-16 text-yellow-400" />
                                </motion.div>

                                {/* Title */}
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    {title}
                                </h3>

                                {/* Message */}
                                <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
                                    {message}
                                </p>

                                {/* Benefits */}
                                <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                            <span>Análise completa do seu projeto</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                            <span>Orçamento personalizado sem compromisso</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0" />
                                            <span>Dicas profissionais para seu negócio</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCTA}
                                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 pulse-glow"
                                >
                                    {ctaText}
                                </button>

                                <p className="text-xs text-gray-500 mt-4">
                                    100% sem custo, sem obrigacao. Apenas valor!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
