import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNotification } from '@/components/ui/NotificationSystem';

// Helper to get or create a session ID
const getSessionId = () => {
    let sessionId = localStorage.getItem('ezzo_session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('ezzo_session_id', sessionId);
    }
    return sessionId;
};

interface CartContextType {
    services: string[];
    addService: (serviceTitle: string) => Promise<void>;
    removeService: (serviceTitle: string) => Promise<void>;
    clearCart: () => Promise<void>;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }) {
    const [services, setServices] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const notification = useNotification();
    const sessionId = getSessionId();

    // Fetch initial cart
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const { data, error } = await supabase
                .from('cart_items')
                .select('service_title')
                .eq('session_id', sessionId);

            if (error) throw error;

            if (data) {
                setServices(data.map(item => item.service_title));
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addService = async (serviceTitle: string) => {
        // Optimistic update
        if (services.includes(serviceTitle)) {
            notification.info("Este serviço já está na sua lista.", "Já adicionado");
            return;
        }

        const oldServices = [...services];
        setServices([...services, serviceTitle]);
        notification.success(`"${serviceTitle}" adicionado!`, "Serviço Adicionado");

        try {
            const { error } = await supabase
                .from('cart_items')
                .insert([{ session_id: sessionId, service_title: serviceTitle }]);

            if (error) {
                // Determine if error is duplicate key (constraint violation)
                if (error.code === '23505') {
                    // Ignore duplicate errors, already handled by UI check technically
                } else {
                    throw error;
                }
            }
        } catch (error) {
            console.error('Error adding service:', error);
            setServices(oldServices); // Rollback
            notification.error("Não foi possível salvar o serviço.", "Erro");
        }
    };

    const removeService = async (serviceTitle: string) => {
        const oldServices = [...services];
        setServices(services.filter(s => s !== serviceTitle));

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('session_id', sessionId)
                .eq('service_title', serviceTitle);

            if (error) throw error;
        } catch (error) {
            console.error('Error removing service:', error);
            setServices(oldServices); // Rollback
            notification.error("Não foi possível remover o serviço.", "Erro");
        }
    };

    const clearCart = async () => {
        setServices([]);

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('session_id', sessionId);

            if (error) throw error;
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const [isCartOpen, setIsCartOpen] = useState(false);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider value={{ services, addService, removeService, clearCart, isLoading, isCartOpen, openCart, closeCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
