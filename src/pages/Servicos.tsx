import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useNotification } from '@/components/ui/NotificationSystem';
import ServiceCart from '@/components/services/ServiceCart';

const WHATSAPP_URL = "https://wa.me/244921063706?text=Olá! Gostaria de solicitar um orçamento.";

const categories = [
  {
    id: "identidade",
    title: "Design & Identidade Visual",
    description: "Criamos identidades visuais marcantes que comunicam a essência da sua marca.",
    icon: "🎨",
    color: "from-pink-500 to-purple-600",
    services: [
      {
        name: "Criação de Logo Marca",
        description: "Desenvolvimento completo de logotipos únicos, profissionais e alinhados com a identidade da sua marca. Inclui versões para diferentes aplicações e formatos.",
        image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=2071"
      },
      {
        name: "Identidade Visual Completa",
        description: "Paleta de cores, tipografia e aplicações em diversos materiais. Tudo o que precisa para uma presença visual consistente.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064"
      },
      {
        name: "Manual da Marca Completo",
        description: "Documento técnico completo com todas as diretrizes da marca: significado, tipografia, uso do logo, cores, aplicações corretas e incorretas. Tudo para manter a consistência da sua marca.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070"
      },
      {
        name: "Material Gráfico Personalizado",
        description: "Design de cartões de visita, papel timbrado, flyers, banners e todo o material necessário para sua comunicação visual.",
        image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2070"
      }
    ]
  },
  {
    id: "web",
    title: "Web & Tecnologia",
    description: "Soluções digitais completas para levar seu negócio ao próximo nível.",
    icon: "💻",
    color: "from-blue-500 to-cyan-600",
    services: [
      {
        name: "Criação de Sites Profissionais",
        description: "Sites responsivos, modernos, rápidos e otimizados para SEO. Desenvolvemos desde landing pages até plataformas complexas.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069"
      },
      {
        name: "Email Personalizado",
        description: "Configuração de emails empresariais profissionais (ex.: nome@suaempresa.com) com gestão completa e suporte técnico.",
        image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2070"
      },
      {
        name: "Hospedagem de Sites",
        description: "Serviços de hospedagem com alta disponibilidade, backups automáticos, certificado SSL e suporte técnico especializado.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034"
      },
      {
        name: "Aplicativos Web",
        description: "Desenvolvimento de aplicações personalizadas para negócios, e-commerce, sistemas de gestão e muito mais.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070"
      },
      {
        name: "Automação com IA (Chatbots)",
        description: "Chatbots inteligentes, assistentes virtuais e sistemas automatizados com IA para otimizar processos e melhorar o atendimento ao cliente 24/7.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2106"
      }
    ]
  },
  {
    id: "audio",
    title: "Áudio & Música",
    description: "Produção profissional de áudio e música com equipamento de ponta.",
    icon: "🎵",
    color: "from-purple-500 to-pink-600",
    services: [
      {
        name: "Gravação de Áudio Profissional",
        description: "Estúdio equipado com tecnologia de ponta para gravação de vozes, locuções, podcasts e jingles publicitários.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070"
      },
      {
        name: "Gravação de Música",
        description: "Produção musical completa, desde a gravação até a masterização final. Trabalhamos com artistas de todos os géneros.",
        image: "https://images.unsplash.com/photo-1519508234439-4f23643125c1?q=80&w=2070"
      },
      {
        name: "Masterização e Mixagem",
        description: "Mixagem profissional e masterização final para garantir que sua música tenha qualidade de estúdio e esteja pronta para distribuição.",
        image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070"
      },
      {
        name: "Distribuição de Músicas",
        description: "Colocamos sua música em todas as plataformas digitais: Spotify, Apple Music, Deezer, YouTube Music e muito mais.",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070"
      }
    ]
  },
  {
    id: "audiovisual",
    title: "Produção Audiovisual",
    description: "Criação de conteúdo visual profissional para sua marca.",
    icon: "🎬",
    color: "from-orange-500 to-red-600",
    services: [
      {
        name: "Gravação de Vídeos",
        description: "Produção de vídeos institucionais, comerciais, documentários e conteúdo para redes sociais com qualidade cinematográfica.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071"
      },
      {
        name: "Produção Audiovisual Completa",
        description: "Serviço completo de pré-produção, filmagem, edição e finalização de projetos audiovisuais de qualquer porte.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070"
      },
      {
        name: "Criação de Publicidades",
        description: "Criação de spots publicitários para rádio e TV, jingles memoráveis e conteúdo promocional de alto impacto.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059"
      },
      {
        name: "Edição Profissional",
        description: "Edição de vídeo com correção de cor, efeitos especiais, motion graphics e finalização profissional.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070"
      },
      {
        name: "Streaming para Eventos",
        description: "Transmissão ao vivo profissional de eventos, conferências e shows com múltiplas câmeras e qualidade HD/4K.",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012"
      },
      {
        name: "Sistema de Som para Eventos",
        description: "Equipamento de som profissional para eventos de qualquer porte: casamentos, conferências, shows e festas corporativas.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070"
      }
    ]
  },
  {
    id: "integradas",
    title: "Soluções Integradas",
    description: "Consultoria e estratégia digital para potencializar seus resultados.",
    icon: "🚀",
    color: "from-green-500 to-emerald-600",
    services: [
      {
        name: "Consultoria Digital",
        description: "Análise completa da sua presença digital e recomendações estratégicas para melhorar seus resultados online.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
      },
      {
        name: "Estratégia de Marca",
        description: "Desenvolvimento de posicionamento de marca, análise de mercado e criação de estratégias de diferenciação.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074"
      },
      {
        name: "Marketing Digital",
        description: "Gestão de campanhas publicitárias, SEO, Google Ads, Facebook Ads e estratégias de crescimento digital.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
      },
      {
        name: "Gestão de Redes Sociais",
        description: "Criação de conteúdo, gestão de comunidade e estratégias de engajamento para todas as plataformas sociais.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074"
      }
    ]
  },
  {
    id: "apps",
    title: "Aplicativos & Sistemas",
    description: "Desenvolvimento de aplicativos e sistemas personalizados para seu negócio.",
    icon: "📱",
    color: "from-indigo-500 to-purple-600",
    services: [
      {
        name: "Desenvolvimento de Apps",
        description: "Criação de aplicativos mobile nativos e híbridos para iOS e Android com design moderno e funcionalidades personalizadas.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2074"
      },
      {
        name: "Sistemas Web Personalizados",
        description: "Desenvolvimento de sistemas web sob medida: ERPs, CRMs, plataformas de gestão e soluções empresariais completas.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
      },
      {
        name: "Integrações de Pagamento",
        description: "Integração com gateways de pagamento, processamento de transações e sistemas de checkout seguros para e-commerce.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070"
      },
      {
        name: "Soluções Empresariais",
        description: "Sistemas completos para automação de processos, gestão de equipes, controle de inventário e dashboards analíticos.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
      }
    ]
  }
];

export default function Servicos() {
  const [selectedServices, setSelectedServices] = useState([]);
  const notification = useNotification();

  const addService = (serviceName) => {
    if (!selectedServices.includes(serviceName)) {
      setSelectedServices([...selectedServices, serviceName]);
      notification.success(
        `"${serviceName}" adicionado! Continue escolhendo ou solicite seu orçamento.`,
        '✅ Serviço Selecionado'
      );
    } else {
      notification.info(
        'Este serviço já está no seu carrinho.',
        'ℹ️ Já Selecionado'
      );
    }
  };

  const removeService = (serviceName) => {
    setSelectedServices(selectedServices.filter(s => s !== serviceName));
    notification.info(`"${serviceName}" removido.`, 'Serviço Removido');
  };

  const clearServices = () => {
    setSelectedServices([]);
    notification.info('Carrinho limpo.', 'Carrinho Vazio');
  };

  return (
    <div className="pt-20">
      <ServiceCart 
        services={selectedServices}
        onRemove={removeService}
        onClear={clearServices}
      />
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Background with Parallax */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070"
            alt="Serviços"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/95 via-[#0a0a0f]/90 to-blue-900/80" />
        </motion.div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                opacity: 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 rounded-full text-blue-300 text-sm font-medium mb-6 backdrop-blur-md shadow-lg"
          >
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            O que fazemos
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Nossos{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x" style={{ backgroundSize: '200% auto' }}>
              Serviços
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Soluções completas em design, tecnologia, áudio e vídeo para transformar 
            sua visão em realidade digital.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      {categories.map((category, categoryIndex) => (
        <section 
          key={category.id}
          id={category.id}
          className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-[#0a0a0f]' : 'bg-[#0d0d12]'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.span 
                  className="text-5xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.8 }}
                >
                  {category.icon}
                </motion.span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  {category.title}
                </h2>
              </div>
              <p className="text-gray-400 text-lg max-w-2xl">
                {category.description}
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {category.services.map((service, serviceIndex) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: serviceIndex * 0.1 }}
                  className="group relative bg-[#111827] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    border: '2px solid transparent',
                    backgroundImage: `linear-gradient(#111827, #111827), linear-gradient(45deg, ${category.color.split(' ')[0].replace('from-', '')}, ${category.color.split(' ')[1].replace('to-', '')})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                >
                  {/* Animated border */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(45deg, ${category.color.split(' ')[0].replace('from-', '')}, ${category.color.split(' ')[1].replace('to-', '')}, ${category.color.split(' ')[0].replace('from-', '')})`,
                      backgroundSize: '200% 200%',
                      animation: 'gradient-rotate 3s linear infinite',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      padding: '2px',
                    }}
                  />
                  {/* Service Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <motion.img 
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-30 group-hover:opacity-20 transition-opacity duration-300`} />
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                      {service.description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addService(service.name)}
                        className={`flex-1 inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          selectedServices.includes(service.name)
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600/10 text-blue-500 hover:bg-blue-600/20'
                        }`}
                      >
                        <Plus className="w-4 h-4 flex-shrink-0" />
                        <span className="hidden sm:inline">{selectedServices.includes(service.name) ? 'Selecionado' : 'Adicionar'}</span>
                      </button>
                      <Link
                        to={createPageUrl('Contacto') + `?services=${encodeURIComponent(service.name)}`}
                        className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
                      >
                        Solicitar
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Não encontrou o que procura?
            </h2>
            <p className="text-xl text-blue-100">
              Entre em contacto connosco e conte-nos sobre o seu projeto. 
              Teremos prazer em ajudá-lo.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-2xl"
            >
              Fale Conosco no WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}