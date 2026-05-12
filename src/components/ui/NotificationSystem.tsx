import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationContextType {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
    showNotification: (params: { type: string; title: string; message: string; duration?: number }) => number;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
}

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = ({ type = 'info', title, message, duration = 5000 }: { type?: string; title: string; message: string; duration?: number }) => {
        const id = Date.now();
        const notification: Notification = { id, type, title, message };

        setNotifications(prev => [...prev, notification]);

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }

        return id;
    };

    const removeNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const success = (message: string, title = 'Sucesso') => {
        return showNotification({ type: 'success', title, message });
    };

    const error = (message: string, title = 'Erro') => {
        return showNotification({ type: 'error', title, message });
    };

    const warning = (message: string, title = 'Atenção') => {
        return showNotification({ type: 'warning', title, message });
    };

    const info = (message: string, title = 'Informação') => {
        return showNotification({ type: 'info', title, message });
    };

    return (
        <NotificationContext.Provider value={{ success, error, warning, info, showNotification }}>
            {children}
            <NotificationContainer notifications={notifications} onRemove={removeNotification} />
        </NotificationContext.Provider>
    );
};

const NotificationContainer = ({ notifications, onRemove }: { notifications: Notification[]; onRemove: (id: number) => void }) => {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3 max-w-md w-full pointer-events-none px-4">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onRemove={onRemove}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const NotificationItem = ({ notification, onRemove }: { notification: Notification; onRemove: (id: number) => void }) => {
    const { id, type, title, message } = notification;

    const configs = {
        success: {
            icon: CheckCircle,
            bgColor: 'bg-green-600',
            borderColor: 'border-green-500',
            iconColor: 'text-green-400'
        },
        error: {
            icon: XCircle,
            bgColor: 'bg-red-600',
            borderColor: 'border-red-500',
            iconColor: 'text-red-400'
        },
        warning: {
            icon: AlertCircle,
            bgColor: 'bg-yellow-600',
            borderColor: 'border-yellow-500',
            iconColor: 'text-yellow-400'
        },
        info: {
            icon: Info,
            bgColor: 'bg-blue-600',
            borderColor: 'border-blue-500',
            iconColor: 'text-blue-400'
        }
    };

    const config = configs[type] || configs.info;
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto"
        >
            <div className={`${config.bgColor}/95 backdrop-blur-sm border ${config.borderColor} rounded-xl shadow-2xl overflow-hidden`}>
                <div className="p-4 flex items-start gap-3">
                    <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                        <p className="text-white/90 text-sm">{message}</p>
                    </div>
                    <button
                        onClick={() => onRemove(id)}
                        className="text-white/70 hover:text-white transition-colors flex-shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};