import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Smartphone, Globe, CreditCard, Sparkles } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';

const WHATSAPP_URL = "https://wa.me/244921063706?text=Olá! Gostaria de saber mais sobre os aplicativos EZZO.";

const apps = [
  {
    name: "AfriCharm",
    tagline: "Beleza & Bem-estar",
    description: "Aplicativo completo de beleza e bem-estar. Conectamos profissionais de beleza com clientes que buscam serviços de qualidade. Agendamento fácil, perfis verificados e avaliações reais.",
    features: [
      "Agendamento online 24/7",
      "Profissionais verificados",
      "Sistema de avaliações",
      "Pagamento integrado"
    ],
    logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1761921263/logo_2_nuhnwn.png",
    link: "https://www.africharm.com",
    color: "from-pink-500 to-rose-600",
    icon: Smartphone,
    status: "Disponível"
  },
  {
    name: "Keimadura",
    tagline: "Sistema POS",
    description: "Sistema de ponto de venda completo para empresas, restaurantes, supermercados e comércio em geral. Gestão de stock, vendas, relatórios e muito mais numa única plataforma.",
    features: [
      "Gestão de inventário",
      "Relatórios detalhados",
      "Multi-utilizadores",
      "Suporte 24h"
    ],
    logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1761921369/Logo_Keimadura_2_kwco73.png",
    link: "https://www.keimadura.com",
    color: "from-blue-500 to-indigo-600",
    icon: Globe,
    status: "Disponível"
  },
  {
    name: "TEKATECH Digital",
    tagline: "Câmbio Digital",
    description: "Plataforma angolana para troca rápida e segura de moedas estrangeiras. Taxas competitivas, transações seguras e processo 100% digital para facilitar suas operações de câmbio.",
    features: [
      "Troca de moedas online",
      "Taxas competitivas",
      "Transações seguras",
      "Processo 100% digital"
    ],
    logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1765295544/TEKATECH_0_vsygjz.png",
    link: "https://tekatech.digital",
    color: "from-green-500 to-emerald-600",
    icon: CreditCard,
    status: "Disponível"
  }
];

export default function Aplicativos() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Background Image with parallax */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070"
            alt="Aplicativos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/95 via-[#0a0a0f]/90 to-purple-900/80" />
        </motion.div>

        {/* Floating particles - Optimized */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                willChange: "transform"
              }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-full text-purple-300 text-sm font-medium mb-6 backdrop-blur-md shadow-lg cursor-pointer"
          >
            <Sparkles className="inline w-4 h-4 mr-2" />
            Nossas Soluções
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
          >
            Aplicativos{' '}
            <AnimatedText gradient={true} delay={0.4}>
              EZZO
            </AnimatedText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4"
          >
            Desenvolvemos aplicativos inovadores que transformam a experiência digital
            e facilitam a vida dos angolanos.
          </motion.p>
        </div>
      </section>

      {/* Apps */}
      <section className="py-12 sm:py-20 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 sm:space-y-16">
            {apps.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className={`inline-block px-3 py-1 bg-gradient-to-r ${app.color} rounded-full text-white text-xs font-medium`}>
                      {app.status}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {app.name}
                    </h2>
                    <p className="text-blue-400 text-sm sm:text-base font-medium">{app.tagline}</p>
                  </div>

                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {app.description}
                  </p>

                  <ul className="space-y-2 sm:space-y-3">
                    {app.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-300">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${app.color} flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-4 pt-4">
                    {app.link !== '#' ? (
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${app.color} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg`}
                      >
                        Visitar Site
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 bg-gray-700 text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                      >
                        Em Breve
                      </button>
                    )}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-white/20"
                    >
                      Saber Mais
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Visual */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`relative bg-gradient-to-br ${app.color} rounded-2xl sm:rounded-3xl p-8 sm:p-12 aspect-square max-w-sm sm:max-w-md mx-auto flex items-center justify-center`}>
                    <img
                      src={app.logo}
                      alt={app.name}
                      className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom App CTA */}
      <section className="py-12 sm:py-20 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111827] rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-gray-800"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Precisa de um aplicativo personalizado?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8">
              Desenvolvemos soluções sob medida para o seu negócio.
              Conte-nos sua ideia e transformamos em realidade.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}