import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Trash2, Send, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProjectSummaryModal() {
    const { services, removeService, isCartOpen, closeCart } = useCart();
    const [briefing, setBriefing] = useState('');
    const [name, setName] = useState('');

    if (!isCartOpen) return null;

    const handleSendToWhatsApp = () => {
        const phone = "244921063706";
        let message = `Olá! Me chamo *${name || 'Cliente'}*.\n\nGostaria de um orçamento para o seguinte projeto:\n\n*Serviços Selecionados:*\n`;

        services.forEach(s => {
            message += `✅ ${s}\n`;
        });

        if (briefing) {
            message += `\n*Detalhes do Projeto:*\n${briefing}`;
        }

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        closeCart();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCart}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#0a0a0f] border border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-6 border-b border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600/20 p-2 rounded-lg">
                                <Sparkles className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Resumo do Projeto</h2>
                                <p className="text-gray-400 text-sm">Validar e solicitar orçamento</p>
                            </div>
                        </div>
                        <button
                            onClick={closeCart}
                            className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
                        {/* Selected Services */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                Serviços Selecionados ({services.length})
                            </h3>

                            {services.length === 0 ? (
                                <div className="text-center py-8 border border-dashed border-gray-800 rounded-xl bg-gray-900/50">
                                    <p className="text-gray-500">Nenhum serviço selecionado ainda.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {services.map((service) => (
                                        <motion.div
                                            key={service}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="flex items-center justify-between bg-[#111827] p-4 rounded-xl border border-gray-800 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                                <span className="text-white font-medium">{service}</span>
                                            </div>
                                            <button
                                                onClick={() => removeService(service)}
                                                className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-2"
                                                title="Remover"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Briefing Form */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                Detalhes do Pedido
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Seu Nome / Empresa</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex: João da Silva - Empresa X"
                                        className="w-full bg-[#111827] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Mensagem Adicional (Opcional)</label>
                                    <textarea
                                        value={briefing}
                                        onChange={(e) => setBriefing(e.target.value)}
                                        placeholder="Descreva brevemente sua ideia ou necessidades específicas..."
                                        rows={3}
                                        className="w-full bg-[#111827] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-[#0a0a0f] border-t border-gray-800">
                        <button
                            onClick={handleSendToWhatsApp}
                            disabled={services.length === 0}
                            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${services.length === 0
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg shadow-green-900/20 hover:scale-[1.02]'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                            Solicitar Orçamento no WhatsApp
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-3">
                            Você será redirecionado para o WhatsApp para finalizar o atendimento.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
