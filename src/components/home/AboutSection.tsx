import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section className="bg-[#0d0d12] py-8 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative">

                        <div className="relative rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
                                alt="Equipa EZZO Digital"
                                className="w-full h-auto rounded-2xl" />

                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
                        </div>

                        {/* Floating Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -right-6 bg-[#111827] rounded-xl p-6 shadow-2xl border border-gray-800">

                            <div className="text-3xl font-bold text-blue-500">5+</div>
                            <div className="text-gray-400 text-sm">Anos de experiência</div>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6">

                        <h2 className="text-xl font-bold sm:text-4xl lg:text-5xl">Quem Somos

                        </h2>

                        <p className="text-gray-400 text-sm leading-relaxed">A EZZO é mais do que uma agência – somos parceiros de transformação digital. Com uma equipe multidisciplinar de profissionais apaixonados, combinamos criatividade, tecnologia e estratégia para entregar resultados excepcionais.



                        </p>

                        <p className="text-gray-400 text-sm leading-relaxed">Desde a criação de identidades visuais marcantes até o desenvolvimento de soluções tecnológicas avançadas, passando pela produção musical e audiovisual de alta qualidade, estamos comprometidos em elevar sua marca ao próximo nível.



                        </p>

                        <p className="text-gray-400 text-sm leading-relaxed">Nossa equipe é formada por designers, desenvolvedores, produtores musicais, videomakers e especialistas em marketing digital, todos unidos por uma paixão comum: transformar ideias em realidade e criar impacto positivo no mercado angolano.



                        </p>

                        <Link
                            to={createPageUrl('SobreNos')}
                            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium transition-colors">

                            Conhecer mais sobre nós
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>);

}