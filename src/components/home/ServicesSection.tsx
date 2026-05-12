import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Globe, Server, Mail, Bot, Palette, Music, Video, Lightbulb, Smartphone, X, Sparkles, Brush, FileImage, Mic, Radio, Disc, Globe2, Film, Megaphone, Scissors, Target, TrendingUp, Share2, MessageSquare, Monitor, CreditCard, Building2 } from 'lucide-react';
import ServiceModal from '@/components/services/ServiceModal';
import TiltCard from '@/components/ui/TiltCard';

const services = [
    {
        id: "identidade",
        title: "Design & Identidade Visual",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
        items: [
            { label: "Criação de logomarca", serviceId: "design-logo" },
            { label: "Identidade visual da marca", serviceId: "design-branding" },
            { label: "Material gráfico personalizado", serviceId: "design-material" }
        ]
    },
    {
        id: "web",
        title: "Web & Tecnologia",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
        items: [
            { label: "Criação de sites profissionais", serviceId: "web-sites" },
            { label: "Hospedagem de sites", serviceId: "web-hosting" },
            { label: "E-mail personalizado", serviceId: "web-email" },
            { label: "Automação com IA (Chatbots)", serviceId: "web-chatbot" }
        ]
    },
    {
        id: "audio",
        title: "Áudio & Música",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
        items: [
            { label: "Gravação de áudio profissional", serviceId: "audio-recording" },
            { label: "Gravação de música", serviceId: "audio-music" },
            { label: "Masterização e mixagem", serviceId: "audio-mixmaster" },
            { label: "Distribuição de músicas", serviceId: "audio-distribution" }
        ]
    },
    {
        id: "audiovisual",
        title: "Produção Audiovisual",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
        items: [
            { label: "Gravação de vídeos", serviceId: "video-recording" },
            { label: "Produção audiovisual completa", serviceId: "video-production" },
            { label: "Criação de publicidades", serviceId: "video-advertising" },
            { label: "Edição profissional", serviceId: "video-editing" }
        ]
    },
    {
        id: "integradas",
        title: "Soluções Integradas",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
        items: [
            { label: "Consultoria digital", serviceId: "consulting-digital" },
            { label: "Estratégia de marca", serviceId: "consulting-brand" },
            { label: "Marketing digital", serviceId: "consulting-marketing" },
            { label: "Gestão de redes sociais", serviceId: "consulting-social" }
        ]
    },
    {
        id: "aplicativos",
        title: "Aplicativos & Sistemas",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        items: [
            { label: "Desenvolvimento de apps", serviceId: "app-development" },
            { label: "Sistemas web personalizados", serviceId: "app-websystems" },
            { label: "Integrações de pagamento", serviceId: "app-payments" },
            { label: "Soluções empresariais", serviceId: "app-enterprise" }
        ]
    }
];

// Subcategorias para cada serviço (menu flutuante)
const serviceSubcategories = {
    web: [
        { id: 'web-sites', label: 'Sites', icon: Globe, color: '#3b82f6' },
        { id: 'web-hosting', label: 'Hospedagem', icon: Server, color: '#8b5cf6' },
        { id: 'web-email', label: 'E-mail', icon: Mail, color: '#10b981' },
        { id: 'web-chatbot', label: 'ChatBots', icon: Bot, color: '#f59e0b' }
    ],
    identidade: [
        { id: 'design-logo', label: 'Logomarca', icon: Sparkles, color: '#ec4899' },
        { id: 'design-branding', label: 'Branding', icon: Brush, color: '#8b5cf6' },
        { id: 'design-material', label: 'Design', icon: FileImage, color: '#6366f1' }
    ],
    audio: [
        { id: 'audio-recording', label: 'Gravação', icon: Mic, color: '#ef4444' },
        { id: 'audio-music', label: 'Música', icon: Music, color: '#f59e0b' },
        { id: 'audio-mixmaster', label: 'Mixagem', icon: Radio, color: '#10b981' },
        { id: 'audio-distribution', label: 'Distribuição', icon: Disc, color: '#06b6d4' }
    ],
    audiovisual: [
        { id: 'video-recording', label: 'Gravação', icon: Video, color: '#3b82f6' },
        { id: 'video-production', label: 'Produção', icon: Film, color: '#a855f7' },
        { id: 'video-advertising', label: 'Publicidade', icon: Megaphone, color: '#ec4899' },
        { id: 'video-editing', label: 'Edição', icon: Scissors, color: '#f97316' }
    ],
    integradas: [
        { id: 'consulting-digital', label: 'Consultoria', icon: Lightbulb, color: '#eab308' },
        { id: 'consulting-brand', label: 'Branding', icon: Target, color: '#06b6d4' },
        { id: 'consulting-marketing', label: 'Marketing', icon: TrendingUp, color: '#10b981' },
        { id: 'consulting-social', label: 'Social', icon: Share2, color: '#a855f7' }
    ],
    aplicativos: [
        { id: 'app-development', label: 'Apps', icon: Smartphone, color: '#6366f1' },
        { id: 'app-websystems', label: 'Sistemas', icon: Monitor, color: '#06b6d4' },
        { id: 'app-payments', label: 'Pagamentos', icon: CreditCard, color: '#14b8a6' },
        { id: 'app-enterprise', label: 'Empresarial', icon: Building2, color: '#f97316' }
    ]
};

export default function ServicesSection() {
    const [selectedService, setSelectedService] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(null); // Qual categoria está com menu aberto

    return (
        <>
            <ServiceModal
                onClose={() => setSelectedService(null)}
                serviceId={selectedService} />

            {/* Overlay com Menu Flutuante */}
            <AnimatePresence>
                {expandedMenu && (
                    <>
                        {/* Backdrop com blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            onClick={() => setExpandedMenu(null)}
                            className="fixed inset-0 bg-[#0a0a0f]/95 backdrop-blur-md z-50"
                        />

                        {/* Botões Flutuantes Centralizados */}
                        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
                            <div className="relative pointer-events-auto">
                                {/* Botão Fechar */}
                                <motion.button
                                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0, opacity: 0, rotate: 180 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    onClick={() => setExpandedMenu(null)}
                                    className="absolute -top-20 left-1/2 -translate-x-1/2 bg-red-500/80 hover:bg-red-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 backdrop-blur-sm"
                                >
                                    <X className="w-6 h-6" />
                                </motion.button>

                                {/* Grid de Botões */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6">
                                    {serviceSubcategories[expandedMenu]?.map((subcat, idx) => {
                                        const IconComponent = subcat.icon;
                                        return (
                                            <motion.button
                                                key={idx}
                                                initial={{ scale: 0, opacity: 0, y: 20 }}
                                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                                exit={{ scale: 0, opacity: 0, y: 20 }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: [0.34, 1.56, 0.64, 1],
                                                    delay: idx * 0.08
                                                }}
                                                onClick={() => {
                                                    setExpandedMenu(null);
                                                    setSelectedService(subcat.id);
                                                }}
                                                className="group relative bg-[#0a0a0f] border-2 border-gray-800/50
                                                    p-8 rounded-2xl shadow-2xl 
                                                    hover:scale-110 transition-all duration-500
                                                    flex flex-col items-center justify-center gap-4
                                                    min-w-[160px] min-h-[160px] overflow-hidden"
                                                style={{
                                                    boxShadow: `0 0 0 0 ${subcat.color}40`
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.boxShadow = `0 0 40px 10px ${subcat.color}80, 0 0 80px 20px ${subcat.color}40`;
                                                    e.currentTarget.style.borderColor = subcat.color;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.boxShadow = `0 0 0 0 ${subcat.color}40`;
                                                    e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)';
                                                }}
                                            >
                                                {/* Efeito de luz animada por trás */}
                                                <div
                                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                    style={{
                                                        background: `radial-gradient(circle at center, ${subcat.color}20 0%, transparent 70%)`
                                                    }}
                                                />

                                                {/* Ícone */}
                                                <IconComponent
                                                    className="w-14 h-14 text-gray-400 group-hover:text-white transition-all duration-500 relative z-10"
                                                    strokeWidth={1.5}
                                                    style={{
                                                        filter: 'drop-shadow(0 0 0 transparent)',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.filter = `drop-shadow(0 0 20px ${subcat.color})`;
                                                        e.currentTarget.style.color = subcat.color;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)';
                                                    }}
                                                />

                                                {/* Label */}
                                                <span
                                                    className="text-gray-300 group-hover:text-white font-bold text-base text-center relative z-10 transition-all duration-500"
                                                    style={{
                                                        textShadow: '0 0 0 transparent'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.textShadow = `0 0 20px ${subcat.color}`;
                                                        e.currentTarget.style.color = subcat.color;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.textShadow = '0 0 0 transparent';
                                                    }}
                                                >
                                                    {subcat.label}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            <section className="bg-[#0a0a0f]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                            Nossos Serviços
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
                            Soluções criativas e tecnológicas para levar o seu negócio ao próximo nível
                        </motion.p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {services.map((service, index) =>
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}>

                                <TiltCard
                                    maxTilt={5}
                                    glareOpacity={0.2}
                                    className="h-full"
                                >
                                    <div
                                        onClick={() => {
                                            // Abrir menu flutuante para a categoria
                                            setExpandedMenu(service.id);
                                        }}
                                        className="group block bg-[#111827] rounded-2xl overflow-hidden hover:bg-[#1a2332] transition-all duration-300 cursor-pointer relative h-full">

                                        {/* Image */}
                                        <div className="relative h-32 sm:h-48 overflow-hidden">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                                decoding="async"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent" />

                                            {/* Badge */}
                                            {(service.id === 'identidade' || service.id === 'web') && (
                                                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                                    ⭐ Popular
                                                </div>
                                            )}
                                            {(service.id === 'integradas' || service.id === 'apps') && (
                                                <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                    ✨ Novo
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 sm:p-6">
                                            <h3 className="text-sm sm:text-xl font-bold text-white mb-2 sm:mb-4 group-hover:text-blue-400 transition-colors">
                                                {service.title}
                                            </h3>
                                            <ul className="space-y-1 sm:space-y-2">
                                                {service.items.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm cursor-pointer hover:text-blue-400 transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedService(item.serviceId);
                                                        }}
                                                    >
                                                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                                                        <span className="line-clamp-1">{item.label}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        )}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center">
                        <Link
                            to={createPageUrl('servicos')}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105">
                            Ver Todos os Serviços
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
