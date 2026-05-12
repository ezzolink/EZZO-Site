import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Home, Briefcase, Smartphone, Users, Mail, Monitor, Rss, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_DARK = "https://res.cloudinary.com/djhn3zwkw/image/upload/v1761908975/ezzo_hmy5rk.png";

const navLinks = [
    { name: 'Início', page: 'Home', icon: Home },
    { name: 'Serviços', page: 'Servicos', icon: Briefcase },
    { name: 'Portfólio', page: 'Portfolio', icon: Monitor },
    { name: 'Blog', page: 'Blog', icon: Rss }, // Nova página
    { name: 'Apps', page: 'Aplicativos', icon: Smartphone },
    { name: 'Sobre Nós', page: 'SobreNos', icon: Users },
    { name: 'Contacto', page: 'Contacto', icon: Mail }];


export default function Navbar({ currentPageName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0f]/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-gray-800/50' : 'bg-transparent'}`
        }>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link to={createPageUrl('Home')} className="flex-shrink-0">
                        <img src={LOGO_DARK} alt="EZZO Digital" className="h-6 sm:h-8 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navLinks.map((link) =>
                            <Link
                                key={link.page}
                                to={createPageUrl(link.page)}
                                className={`group relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 overflow-hidden ${currentPageName === link.page ?
                                    'text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20' :
                                    'text-gray-300 hover:text-white'}`
                                }>
                                {currentPageName !== link.page && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        )}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to={createPageUrl('cliente')}
                            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                        >
                            Área do Cliente
                        </Link>
                        <Link
                            to={createPageUrl('Contacto')}
                            className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap shadow-lg shadow-blue-500/50 hover:shadow-purple-500/50 hover:scale-105 overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 hidden sm:inline">Solicitar Orçamento</span>
                            <span className="relative z-10 sm:hidden">Orçamento</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-gray-300 hover:text-white">

                        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Modal */}
            <AnimatePresence>
                {isOpen &&
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />


                        {/* Menu Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="fixed top-20 left-4 right-4 bg-[#111827] rounded-2xl border border-gray-800 shadow-2xl z-50 lg:hidden overflow-hidden">

                            <div className="px-3 py-3">
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {navLinks.map((link) => {
                                        const Icon = link.icon;
                                        const isActive = currentPageName === link.page;
                                        return (
                                            <Link
                                                key={link.page}
                                                to={createPageUrl(link.page)}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${isActive ?
                                                    'bg-blue-600 text-white shadow-lg' :
                                                    'bg-gray-800/50 text-gray-300 hover:bg-gray-800'}`
                                                }>

                                                <Icon className="w-6 h-6" />
                                                <span className="text-xs font-medium text-center">{link.name}</span>
                                            </Link>);

                                    })}

                                    {/* Link Área do Cliente (Mobile) */}
                                    <Link
                                        to={createPageUrl('cliente')}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${currentPageName === 'cliente' ?
                                            'bg-blue-600 text-white shadow-lg' :
                                            'bg-gray-800/50 text-gray-300 hover:bg-gray-800'}`
                                        }>
                                        <User className="w-6 h-6" />
                                        <span className="text-xs font-medium text-center">Área do Cliente</span>
                                    </Link>
                                </div>
                                <Link
                                    to={createPageUrl('Contacto')}
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-xl text-center font-medium transition-all">

                                    Solicitar Orçamento
                                </Link>
                            </div>
                        </motion.div>
                    </>
                }
            </AnimatePresence>
        </nav>);

}