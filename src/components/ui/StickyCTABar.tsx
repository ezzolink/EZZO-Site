import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface StickyCTABarProps {
    onCTAClick?: () => void;
    ctaText?: string;
    message?: string;
    showAfterScroll?: number; // pixels de scroll antes de aparecer
}

export default function StickyCTABar({
    onCTAClick,
    ctaText = "Solicitar Orçamento Grátis",
    message = "Pronto para transformar suas ideias em realidade?",
    showAfterScroll = 500
}: StickyCTABarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > showAfterScroll && !isDismissed) {
                setIsVisible(true);
            } else if (window.scrollY <= showAfterScroll) {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showAfterScroll, isDismissed]);

    const handleCTA = () => {
        if (onCTAClick) {
            onCTAClick();
        } else {
            // Default: abrir WhatsApp
            window.open("https://wa.me/244921063706?text=Olá! Gostaria de solicitar um orçamento.", '_blank');
        }
    };

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && !isDismissed && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
                >
                    <div className="max-w-7xl mx-auto px-4 pb-4 sm:pb-6">
                        <div className="relative pointer-events-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl shadow-purple-500/50 overflow-hidden">
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 animate-pulse" />

                            {/* Content */}
                            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6">
                                {/* Message */}
                                <div className="flex items-center gap-3 text-white">
                                    <Sparkles className="w-6 h-6 animate-pulse hidden sm:block" />
                                    <div>
                                        <p className="font-bold text-sm sm:text-base">{message}</p>
                                        <p className="text-xs sm:text-sm text-white/80 hidden sm:block">
                                            Primeira consulta grátis! Sem compromisso.
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="flex items-center gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCTA}
                                        className="bg-white text-purple-600 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
                                    >
                                        {ctaText}
                                    </motion.button>

                                    {/* Close button */}
                                    <button
                                        onClick={handleDismiss}
                                        className="text-white/70 hover:text-white transition-colors p-2"
                                        aria-label="Fechar"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
