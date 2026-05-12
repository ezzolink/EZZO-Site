import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, Zap, ArrowRight, Sparkles } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';

const WHATSAPP_URL = "https://wa.me/244921063706?text=Olá! Gostaria de saber mais sobre a EZZO Digital.";

const values = [
    {
        icon: Heart,
        title: "Paixão",
        description: "Amamos o que fazemos e isso reflete-se em cada projeto que entregamos."
    },
    {
        icon: Award,
        title: "Excelência",
        description: "Buscamos sempre superar expectativas e entregar resultados de alta qualidade."
    },
    {
        icon: Users,
        title: "Colaboração",
        description: "Trabalhamos lado a lado com nossos clientes para alcançar objetivos comuns."
    },
    {
        icon: Zap,
        title: "Inovação",
        description: "Estamos sempre atualizados com as últimas tendências e tecnologias."
    }];


const stats = [
    { number: "5+", label: "Anos de Experiência" },
    { number: "200+", label: "Projetos Realizados" },
    { number: "150+", label: "Clientes Satisfeitos" },
    { number: "15+", label: "Profissionais" }];


export default function SobreNos() {

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative bg-gradient-to-br py-20 from-[#0a0a0f] to-[#111827] overflow-hidden">
                {/* Static background glow */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_50%)]" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px,
                transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">

                            <motion.span whileHover={{ scale: 1.05 }}
                                className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 rounded-full text-blue-300 text-sm font-medium backdrop-blur-md shadow-lg cursor-pointer">
                                <Sparkles className="inline w-4 h-4 mr-2" />
                                Quem Somos
                            </motion.span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                                Sobre a{' '}
                                <AnimatedText gradient={true} delay={0.3}>
                                    EZZO Digital
                                </AnimatedText>
                            </h1>
                            <p className="text-gray-400 text-base leading-relaxed">Somos uma agência multifuncional angolana
                                dedicada a transformar ideias em realidade digital através de design, tecnologia, música e
                                audiovisual.


                            </p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="relative">

                            <div className="relative rounded-3xl overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                                    alt="Equipa EZZO" className="w-full h-auto rounded-3xl" loading="lazy" decoding="async" />

                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-[#111827] py-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) =>
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">

                                <div className="text-4xl sm:text-5xl font-bold text-blue-500 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="bg-[#0a0a0f] py-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="space-y-8">

                        <h2 className="text-3xl sm:text-4xl font-bold text-center">
                            Nossa <span className="text-blue-500">História</span>
                        </h2>

                        <div className="space-y-6 text-gray-400 leading-relaxed">
                            <p>
                                A EZZO Digital nasceu da visão de criar uma agência diferente em Angola —
                                uma que pudesse oferecer soluções completas e integradas para empresas e
                                empreendedores que buscam se destacar no mercado digital.
                            </p>
                            <p>
                                Fundada por uma equipe de profissionais apaixonados por tecnologia, design
                                e produção audiovisual, a EZZO rapidamente se tornou referência em qualidade
                                e inovação no mercado angolano.
                            </p>
                            <p>
                                Hoje, somos uma equipe multidisciplinar composta por designers, desenvolvedores,
                                produtores musicais, videomakers e especialistas em marketing digital, todos
                                unidos por uma missão comum: transformar ideias em realidade digital.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-12 sm:py-20 bg-[#0d0d12]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-[#111827] rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-800">

                            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Missão</h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                Transformar ideias em soluções digitais inovadoras, ajudando empresas
                                e empreendedores angolanos a alcançar seus objetivos através de design,
                                tecnologia e produção audiovisual de excelência.
                            </p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#111827] rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-800">

                            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Visão</h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                Ser a agência digital de referência em Angola, reconhecida pela qualidade,
                                inovação e impacto positivo que geramos nos negócios de nossos clientes e
                                na comunidade digital angolana.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-[#0a0a0f] py-8 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">

                        Nossos <span className="text-blue-500">Valores</span>
                    </motion.h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {values.map((value, index) =>
                            <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                                className="bg-[#111827] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-gray-800 hover:border-blue-500/30 transition-all duration-300">

                                <div
                                    className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-600/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                    <value.icon className="w-5 h-5 sm:w-7 sm:h-7 text-blue-500" />
                                </div>
                                <h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">{value.title}</h3>
                                <p className="text-gray-400 text-xs sm:text-sm">{value.description}</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br py-4 from-blue-600 to-blue-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="space-y-6">

                        <h2 className="text-white text-xl font-bold sm:text-4xl">Vamos trabalhar juntos?

                        </h2>
                        <p className="text-blue-100 text-base">Entre em contacto connosco e descubra como podemos ajudar a
                            transformar sua ideia em realidade.


                        </p>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="bg-white text-blue-600 px-2 py-2 text-lg font-semibold rounded-xl inline-flex items-center gap-3 transition-all duration-300 hover:shadow-2xl">Fale
                            Conosco no WhatsApp




                        </a>
                    </motion.div>
                </div>
            </section>
        </div>);

}