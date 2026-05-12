import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ServiceCart() {
    const { services, openCart, isCartOpen } = useCart();
    const [bounced, setBounced] = React.useState(false);

    // Bounce effect when item added
    useEffect(() => {
        if (services.length > 0) {
            setBounced(true);
            const timer = setTimeout(() => setBounced(false), 300);
            return () => clearTimeout(timer);
        }
    }, [services.length]);

    if (services.length === 0) return null;

    return (
        <AnimatePresence>
            {!isCartOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: bounced ? 1.2 : 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={openCart}
                    className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl shadow-blue-900/40 hover:scale-110 transition-transform group"
                >
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0f]">
                            {services.length}
                        </span>
                    </div>
                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-sm font-medium px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Ver Projeto
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}