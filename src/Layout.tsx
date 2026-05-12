import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ServiceCart from '@/components/services/ServiceCart';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import EZZOChatbot from '@/components/chat/EZZOChatbot';
import MetaTags from '@/components/seo/MetaTags';
import { NotificationProvider } from '@/components/ui/NotificationSystem';
import { useLocation } from 'react-router-dom';
import ProjectSummaryModal from '@/components/services/ProjectSummaryModal';

export default function Layout({ children }) {
  const location = useLocation();

  const getCurrentPageName = (pathname) => {
    switch (pathname) {
      case '/':
      case '/home': return 'Home';
      case '/servicos': return 'Servicos';
      case '/aplicativos': return 'Aplicativos';
      case '/sobrenos': return 'SobreNos';
      case '/contacto': return 'Contacto';
      case '/portfolio': return 'Portfolio';
      case '/blog': return 'Blog';
      default: return 'Home';
    }
  };

  const currentPageName = getCurrentPageName(location.pathname);

  // SEO per page
  const getPageMeta = () => {
    switch (currentPageName) {
      case 'Servicos':
        return {
          title: "Serviços - EZZO Digital | Design, Tecnologia e Audiovisual em Angola",
          description: "Conheça todos os nossos serviços: criação de sites, identidade visual, aplicativos web, marketing digital, produção audiovisual, streaming de eventos e muito mais em Luanda, Angola.",
          keywords: "serviços digitais angola, criação sites luanda, design gráfico angola, aplicativos web, chatbot ia, streaming eventos angola, sistema som eventos"
        };
      case 'Aplicativos':
        return {
          title: "Aplicativos - EZZO Digital | AfriCharm, Keimadura, TEKATECH",
          description: "Conheça os aplicativos desenvolvidos pela EZZO Digital: AfriCharm (beleza e bem-estar), Keimadura (sistema POS) e TEKATECH Digital (câmbio digital) em Angola.",
          keywords: "aplicativos angola, africharm, keimadura pos, tekatech digital, desenvolvimento apps angola"
        };
      case 'SobreNos':
        return {
          title: "Sobre Nós - EZZO Digital | Agência Digital em Luanda, Angola",
          description: "Conheça a EZZO Digital, agência multifuncional angolana com 5+ anos de experiência em design, tecnologia, produção musical e audiovisual em Luanda.",
          keywords: "ezzo digital angola, agência digital luanda, empresa tecnologia angola, sobre ezzo"
        };
      case 'Contacto':
        return {
          title: "Contacto - EZZO Digital | Solicite um Orçamento",
          description: "Entre em contacto com a EZZO Digital. Solicite um orçamento para seu projeto de site, identidade visual, aplicativo ou produção audiovisual. WhatsApp: +244 921 063 706",
          keywords: "contacto ezzo digital, orçamento site angola, solicitar orçamento luanda, whatsapp ezzo"
        };
      case 'Portfolio':
        return {
          title: "Portfólio - EZZO Digital | Nossos Projetos",
          description: "Explore o portfólio da EZZO Digital. Veja nossos cases de sucesso em design, desenvolvimento web, aplicativos e produção audiovisual.",
          keywords: "portfólio ezzo, projetos web angola, design gráfico portfólio, cases sucesso ezzo"
        };
      case 'Blog':
        return {
          title: "Blog EZZO - Inovação e Tecnologia em Angola",
          description: "Notícias, artigos e dicas sobre tecnologia, web design, marketing digital e audiovisual. Fique por dentro das tendências com a EZZO Digital.",
          keywords: "blog tecnologia angola, dicas marketing, web design artigos, novidades ezzo"
        };
      default:
        return {
          title: "EZZO Digital - Agência Multifuncional em Angola | Design, Tecnologia e Audiovisual",
          description: "Transformamos ideias em realidade digital com design inovador, tecnologia de ponta, produção musical e audiovisual de excelência. Serviços de criação de sites, identidade visual, aplicativos, marketing digital e muito mais em Luanda, Angola.",
          keywords: "EZZO Digital, agência digital angola, design gráfico luanda, criação de sites angola, identidade visual, desenvolvimento web, aplicativos web, marketing digital angola, produção audiovisual, gravação música angola"
        };
    }
  };

  const pageMeta = getPageMeta();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <MetaTags {...pageMeta} />
      <style>{`
        :root {
          --background: #0a0a0f;
          --foreground: #ffffff;
          --card: #111827;
          --card-foreground: #ffffff;
          --primary: #2563eb;
          --primary-foreground: #ffffff;
          --secondary: #1f2937;
          --secondary-foreground: #ffffff;
          --muted: #374151;
          --muted-foreground: #9ca3af;
          --accent: #2563eb;
          --accent-foreground: #ffffff;
          --border: #1f2937;
          --input: #1f2937;
          --ring: #2563eb;
        }
        
        body {
          background-color: #0a0a0f;
          color: #ffffff;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #374151 #0a0a0f;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #0a0a0f;
        }
        
        *::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 4px;
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        `}</style>

      <Navbar currentPageName={currentPageName} />

      <main>
        {children}
      </main>

      <Footer />
      <ServiceCart />
      <ProjectSummaryModal />
      <WhatsAppButton fixed={true} />
      <EZZOChatbot />
    </div>
  );
}