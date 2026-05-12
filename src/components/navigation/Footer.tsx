import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const LOGO_DARK = "https://res.cloudinary.com/djhn3zwkw/image/upload/v1761908975/ezzo_hmy5rk.png";

const servicos = [
    { name: 'Design & Identidade Visual', page: 'Servicos' },
    { name: 'Web & Tecnologia', page: 'Servicos' },
    { name: 'Áudio & Música', page: 'Servicos' },
    { name: 'Produção Audiovisual', page: 'Servicos' },
    { name: 'Soluções Integradas', page: 'Servicos' }];


const linksUteis = [
    { name: 'Início', page: 'Home' },
    { name: 'Aplicativos', page: 'Aplicativos' },
    { name: 'Sobre Nós', page: 'SobreNos' },
    { name: 'Contacto', page: 'Contacto' }];


export default function Footer() {
    return (
        <footer className="relative bg-[#0a0a0f] border-t border-gray-800/50 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient-x" style={{ backgroundSize: '200% 200%' }} />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="relative mx-auto px-3 py-12 max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo e Descrição */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <img src={LOGO_DARK} alt="EZZO Digital" className="h-8 w-auto" />
                        <p className="text-gray-400 text-sm leading-relaxed">Agência multifuncional dedicada a transformar ideias em realidade digital através de design, tecnologia, música e audiovisual.


                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="https://www.facebook.com/ezzodigital" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/ezzo_digital/" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                            </a>
                            <a href="#" className="group text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
                            </a>
                            <a href="#" className="group text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Serviços */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-white font-semibold mb-6 relative inline-block">
                            Serviços
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </h3>
                        <ul className="space-y-3">
                            {servicos.map((item) =>
                                <li key={item.name}>
                                    <Link
                                        to={createPageUrl(item.page)}
                                        className="text-gray-400 hover:text-white text-sm transition-colors">

                                        {item.name}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </motion.div>

                    {/* Links Úteis */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-white font-semibold mb-6">Links Úteis</h3>
                        <ul className="space-y-3">
                            {linksUteis.map((item) =>
                                <li key={item.name}>
                                    <Link
                                        to={createPageUrl(item.page)}
                                        className="text-gray-400 hover:text-white text-sm transition-colors">

                                        {item.name}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </motion.div>

                    {/* Contacto */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-white font-semibold mb-6">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">Luanda, Angola</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <a href="mailto:info@ezzo.ao" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    info@ezzo.ao
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <a href="tel:+244921063706" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    +244 921 063 706
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="border-t border-gray-800/50 mt-12 pt-8 text-center"
                >
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} EZZO Digital. Todos os direitos reservados.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="text-gray-600 text-xs">Feito com</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-red-500"
                        >
                            ♥
                        </motion.span>
                    </div>
                </motion.div>
            </div>
        </footer>);

}