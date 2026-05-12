import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, FileText, ShoppingBag, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency, CURRENCY_SYMBOLS, CURRENCY_FLAGS } from '@/hooks/useCurrency';

// Dados do catálogo Web & Tecnologia
const webCatalog = [
    {
        id: 1,
        title: "Site Institucional",
        subtitle: "Apresentação Profissional",
        target: "Empresas, escolas, igrejas, ONGs, profissionais",
        priceMin: 150, // EUR
        priceMax: 400, // EUR
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Simples",
        timeframe: "2-3 semanas",
        includes: [
            "3 a 6 páginas (Início, Sobre, Serviços, Contactos)",
            "Design profissional",
            "Responsivo (telemóvel e PC)",
            "Botão WhatsApp",
            "Formulário de contacto"
        ],
        requirements: [
            "Logotipo (PNG, JPG ou SVG)",
            "Texto institucional",
            "Fotos da empresa",
            "Contactos e redes sociais",
            "Nome da empresa",
            "Breve descrição da empresa",
            "Missão, visão e valores (opcional)",
            "Cores da marca (se houver)"
        ]
    },
    {
        id: 2,
        title: "Loja Online",
        subtitle: "E-commerce Completo",
        target: "Vendas de produtos físicos ou digitais",
        priceMin: 450,
        priceMax: 1200,
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Avançado",
        timeframe: "4-6 semanas",
        includes: [
            "Catálogo de produtos",
            "Carrinho de compras",
            "Pagamentos (referência, cartão, PayPal)",
            "Área do cliente",
            "Gestão de encomendas"
        ],
        requirements: [
            "Lista de produtos com preços",
            "Fotos dos produtos (boa qualidade)",
            "Dados bancários / meios de pagamento",
            "Termos e condições",
            "Política de devolução",
            "Tabela de preços (Excel ou PDF)",
            "Nome da loja",
            "Descrição da loja"
        ]
    },
    {
        id: 3,
        title: "Site Portfólio",
        subtitle: "Presença Profissional",
        target: "Fotógrafos, designers, advogados, professores, freelancers",
        priceMin: 120,
        priceMax: 300,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        badge: "Melhor Preço",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "1-2 semanas",
        includes: [
            "Portfólio de trabalhos",
            "Página pessoal",
            "Contactos",
            "Design moderno"
        ],
        requirements: [
            "Biografia profissional",
            "Trabalhos anteriores (imagens, links)",
            "Foto profissional",
            "Redes sociais ou LinkedIn",
            "Nome completo",
            "Profissão / especialidade",
            "Lista de serviços",
            "Certificados ou diplomas (opcional)"
        ]
    },
    {
        id: 4,
        title: "Blog / Conteúdo",
        subtitle: "Plataforma de Publicação",
        target: "Notícias, artigos, ensino, opinião",
        priceMin: 180,
        priceMax: 400,
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Médio",
        timeframe: "3-4 semanas",
        includes: [
            "Sistema de publicações",
            "Categorias",
            "Comentários",
            "Painel administrativo"
        ],
        requirements: [
            "Tema principal do blog",
            "Artigos iniciais",
            "Imagens para artigos",
            "Política de privacidade",
            "Nome do blog",
            "Categorias de conteúdo",
            "Frequência de publicação",
            "Foto do autor"
        ]
    },
    {
        id: 5,
        title: "Site com Reservas",
        subtitle: "Sistema de Agendamento",
        target: "Hotéis, salões, clínicas, restaurantes",
        priceMin: 600,
        priceMax: 1800,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "5-8 semanas",
        includes: [
            "Sistema de reservas",
            "Calendário",
            "Confirmação por email/WhatsApp",
            "Gestão de clientes"
        ],
        requirements: [
            "Lista de serviços",
            "Horários de funcionamento",
            "Tabela de preços",
            "Regras de reserva/cancelamento",
            "Nome do negócio",
            "Tipo de serviço",
            "Fotos do espaço/serviço",
            "Mensagens automáticas (confirmação)"
        ]
    },
    {
        id: 6,
        title: "Plataforma Web",
        subtitle: "Sistema Personalizado",
        target: "Startups, fintech, apps web, sistemas internos",
        priceMin: 1200,
        priceMax: 5000,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Muito Avançado",
        timeframe: "8-16 semanas",
        includes: [
            "Login e registo",
            "Painel administrativo",
            "Base de dados",
            "Funcionalidades personalizadas"
        ],
        requirements: [
            "Descrição detalhada da ideia",
            "Fluxo do sistema",
            "Regras de negócio",
            "Wireframes (se houver)",
            "Público-alvo",
            "Problema que o sistema resolve",
            "Tipos de utilizadores",
            "Documentação funcional"
        ]
    }
];

// Catálogo Hospedagem de Sites
const webHostingCatalog = [
    {
        id: 1,
        title: "Hospedagem Básica",
        subtitle: "Sites Simples",
        target: "Blogs, sites pessoais, pequenos projetos",
        priceMin: 50,
        priceMax: 150,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
        badge: "Melhor Preço",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "Anual",
        includes: [
            "10 GB de armazenamento SSD",
            "Certificado SSL grátis",
            "1 domínio incluído",
            "Email profissional (5 contas)",
            "Suporte técnico 24/7",
            "Backup semanal automático"
        ],
        requirements: [
            "Domínio (ou escolher um novo)",
            "Dados de contacto",
            "Informações de pagamento"
        ]
    },
    {
        id: 2,
        title: "Hospedagem Profissional",
        subtitle: "Sites Empresariais",
        target: "Empresas, e-commerces médios, portfólios",
        priceMin: 150,
        priceMax: 300,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "Anual",
        includes: [
            "50 GB de armazenamento SSD",
            "Certificado SSL grátis",
            "Domínios ilimitados",
            "Email profissional (ilimitado)",
            "CDN grátis",
            "Backup diário automático",
            "Suporte prioritário 24/7"
        ],
        requirements: [
            "Domínios a hospedar",
            "Dados da empresa",
            "Informações de contacto"
        ]
    },
    {
        id: 3,
        title: "Hospedagem Premium",
        subtitle: "Alta Performance",
        target: "E-commerces grandes, plataformas, alto tráfego",
        priceMin: 300,
        priceMax: 800,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "Anual",
        includes: [
            "200 GB de armazenamento SSD NVMe",
            "Certificado SSL Wildcard",
            "Recursos dedicados (CPU/RAM)",
            "Email profissional (ilimitado)",
            "CDN global premium",
            "Backup horário automático",
            "Firewall avançado (WAF)",
            "Suporte VIP 24/7"
        ],
        requirements: [
            "Lista de domínios",
            "Especificações técnicas desejadas",
            "Volume de tráfego estimado"
        ]
    }
];

// Catálogo E-mail Personalizado
const webEmailCatalog = [
    {
        id: 1,
        title: "Email Básico",
        subtitle: "Profissional",
        target: "Freelancers, pequenos negócios",
        priceMin: 30,
        priceMax: 80,
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop",
        badge: "Melhor Preço",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "Anual (5 contas)",
        includes: [
            "5 contas de email (@seudominio.com)",
            "10 GB por caixa de email",
            "Webmail profissional",
            "Proteção anti-spam",
            "Suporte por email"
        ],
        requirements: [
            "Domínio ativo",
            "Lista de emails desejados",
            "Dados de contacto"
        ]
    },
    {
        id: 2,
        title: "Email Empresarial",
        subtitle: "Google Workspace",
        target: "Empresas, equipas",
        priceMin: 80,
        priceMax: 200,
        image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "Anual (10 contas)",
        includes: [
            "10 contas Google Workspace",
            "30 GB por utilizador (Google Drive)",
            "Gmail profissional",
            "Google Meet, Calendar, Docs",
            "Segurança avançada",
            "Suporte Google 24/7"
        ],
        requirements: [
            "Domínio verificado",
            "Lista de utilizadores",
            "Informações da empresa"
        ]
    },
    {
        id: 3,
        title: "Email Corporativo",
        subtitle: "Microsoft 365",
        target: "Grandes empresas, corporações",
        priceMin: 150,
        priceMax: 400,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "Anual (25 contas)",
        includes: [
            "25 contas Microsoft 365",
            "1 TB OneDrive por utilizador",
            "Outlook, Teams, SharePoint",
            "Office completo (Word, Excel, PPT)",
            "Segurança empresarial avançada",
            "Suporte Microsoft Premium"
        ],
        requirements: [
            "Domínio corporativo",
            "Estrutura organizacional",
            "Lista completa de utilizadores"
        ]
    }
];

// Catálogo Automação com IA (Chatbots)
const webChatbotCatalog = [
    {
        id: 1,
        title: "Chatbot Simples",
        subtitle: "Atendimento Básico",
        target: "Pequenos negócios, sites informativos",
        priceMin: 100,
        priceMax: 300,
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop",
        badge: "Melhor Preço",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "1-2 semanas",
        includes: [
            "Chatbot com respostas pré-definidas",
            "Integração com site/WhatsApp",
            "Até 10 fluxos de conversa",
            "Painel de estatísticas",
            "Suporte por 3 meses"
        ],
        requirements: [
            "Perguntas frequentes (FAQ)",
            "Fluxos de atendimento desejados",
            "Plataformas de integração",
            "Tom de comunicação da marca"
        ]
    },
    {
        id: 2,
        title: "Chatbot Inteligente",
        subtitle: "IA Avançada",
        target: "E-commerces, atendimento ao cliente",
        priceMin: 400,
        priceMax: 1200,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "3-5 semanas",
        includes: [
            "IA com processamento de linguagem natural (NLP)",
            "Aprendizado contínuo",
            "Integração multi-plataforma",
            "Transferência para atendimento humano",
            "Analytics avançado",
            "Personalização por cliente",
            "Suporte e manutenção por 6 meses"
        ],
        requirements: [
            "Base de conhecimento",
            "Histórico de atendimentos (se houver)",
            "Integrações com CRM/sistemas",
            "Objetivos de automação",
            "Dados dos produtos/serviços"
        ]
    },
    {
        id: 3,
        title: "Assistente Virtual Completo",
        subtitle: "IA Conversacional",
        target: "Grandes empresas, plataformas complexas",
        priceMin: 1500,
        priceMax: 5000,
        image: "https://images.unsplash.com/photo-1676573409792-3dc2e6c0940c?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Muito Avançado",
        timeframe: "6-12 semanas",
        includes: [
            "IA GPT-4 personalizada",
            "Voz e texto (multimodal)",
            "Integração com todos os sistemas",
            "Automação de processos complexos",
            "Dashboard executivo",
            "Treinamento da equipe",
            "Suporte dedicado por 1 ano"
        ],
        requirements: [
            "Mapeamento completo de processos",
            "Dados estruturados da empresa",
            "Acessos aos sistemas",
            "Casos de uso detalhados",
            "Equipe técnica de contato"
        ]
    }
];

// Renomear para deixar claro que são sites
const webSitesCatalog = webCatalog;

// ==================== DESIGN & IDENTIDADE VISUAL ====================

// Catálogo Criação de Logomarca
const designLogoCatalog = [
    {
        id: 1,
        title: "Logomarca Básica",
        subtitle: "Design Simples e Profissional",
        target: "Pequenas empresas, startups, freelancers",
        priceMin: 150,
        priceMax: 300,
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
        badge: "Melhor Custo",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "3-5 dias úteis",
        includes: [
            "3 propostas de design",
            "2 rodadas de revisões",
            "Logo em formatos: PNG, JPG, SVG",
            "Versões colorida e preto/branco",
            "Guia básico de uso"
        ],
        requirements: [
            "Nome da marca",
            "Briefing do negócio",
            "Cores preferidas (se houver)",
            "Referências visuais",
            "Slogan (opcional)"
        ]
    },
    {
        id: 2,
        title: "Logomarca Profissional",
        subtitle: "Design Premium com Variações",
        target: "Empresas estabelecidas, marcas em crescimento",
        priceMin: 400,
        priceMax: 700,
        image: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "7-10 dias úteis",
        includes: [
            "5 propostas de design",
            "Revisões ilimitadas",
            "Logo em todos os formatos (PNG, JPG, SVG, PDF, EPS)",
            "Versões: colorida, monocromática, negativa",
            "Favicon para site",
            "Manual completo de identidade",
            "Mockups de aplicação"
        ],
        requirements: [
            "Briefing detalhado da marca",
            "Valores e missão da empresa",
            "Público-alvo definido",
            "Análise de concorrência",
            "Paleta de cores desejada"
        ]
    },
    {
        id: 3,
        title: "Logomarca Premium",
        subtitle: "Design Exclusivo de Alta Qualidade",
        target: "Grandes empresas, marcas de luxo, rebranding",
        priceMin: 700,
        priceMax: 1500,
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Muito Avançado",
        timeframe: "14-21 dias úteis",
        includes: [
            "Pesquisa de mercado aprofundada",
            "8+ propostas exclusivas",
            "Revisões ilimitadas",
            "Todos os formatos profissionais",
            "Variações para diferentes usos",
            "Animação do logo (motion design)",
            "Manual de marca completo (brand book)",
            "Registro de marca (consultoria)",
            "Suporte pós-entrega (3 meses)"
        ],
        requirements: [
            "Business plan detalhado",
            "Análise competitiva completa",
            "Pesquisa de público-alvo",
            "Estratégia de posicionamento",
            "Orçamento para registro de marca"
        ]
    }
];

// Catálogo Identidade Visual da Marca
const designBrandingCatalog = [
    {
        id: 1,
        title: "Identidade Visual Básica",
        subtitle: "Essenciais para Começar",
        target: "Startups, pequenos negócios",
        priceMin: 500,
        priceMax: 1000,
        image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&auto=format&fit=crop",
        badge: "Starter Pack",
        badgeColor: "green",
        complexity: "Médio",
        timeframe: "10-14 dias úteis",
        includes: [
            "Logomarca completa",
            "Paleta de cores (5-7 cores)",
            "Tipografia da marca (2-3 fontes)",
            "Cartão de visita",
            "Papel timbrado",
            "Assinatura de email",
            "Capa para redes sociais"
        ],
        requirements: [
            "Briefing da marca",
            "Informações de contacto",
            "Dados para cartões",
            "Fotos da equipe (se aplicável)",
            "Redes sociais existentes"
        ]
    },
    {
        id: 2,
        title: "Identidade Visual Completa",
        subtitle: "Pacote Profissional",
        target: "Empresas em crescimento, profissionais liberais",
        priceMin: 1200,
        priceMax: 2500,
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "3-4 semanas",
        includes: [
            "Logomarca premium",
            "Sistema completo de cores",
            "Família tipográfica",
            "Padrões visuais e texturas",
            "Cartões de visita (3 variações)",
            "Papelaria completa (papel timbrado, envelope, pasta)",
            "Templates para redes sociais (20+)",
            "Assinaturas de email",
            "Apresentação institucional (PPT)",
            "Manual de identidade visual (PDF)"
        ],
        requirements: [
            "Estratégia de marca definida",
            "Valores e missão da empresa",
            "Análise de público-alvo",
            "Conteúdo para apresentações",
            "Dados para papelaria"
        ]
    },
    {
        id: 3,
        title: "Brand Identity Premium",
        subtitle: "Identidade Corporativa de Luxo",
        target: "Grandes empresas, marcas premium, corporações",
        priceMin: 3000,
        priceMax: 8000,
        image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "6-8 semanas",
        includes: [
            "Logomarca exclusiva com variações",
            "Sistema completo de identidade",
            "Elementos gráficos customizados",
            "Iconografia personalizada",
            "Papelaria corporativa completa",
            "Templates para todos os canais",
            "Sinalização e uniformes",
            "Embalagens e packaging",
            "Brand book completo (80+ páginas)",
            "Guideline de aplicações",
            "Assets digitais (bibliotecas Figma/Sketch)",
            "Consultoria de implementação"
        ],
        requirements: [
            "Estratégia de marca completa",
            "Análise de mercado",
            "Arquitetura de marca",
            "Necessidades de aplicação",
            "Equipe de implementação interna"
        ]
    }
];

// Catálogo Material Gráfico Personalizado
const designMaterialCatalog = [
    {
        id: 1,
        title: "Flyers e Panfletos",
        subtitle: "Material Promocional",
        target: "Eventos, promoções, divulgação",
        priceMin: 100,
        priceMax: 300,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
        badge: "Rápido",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "2-3 dias úteis",
        includes: [
            "Design criativo e impactante",
            "2 propostas de layout",
            "1 rodada de revisões",
            "Arquivos prontos para impressão",
            "Orientação de gráficas"
        ],
        requirements: [
            "Texto e informações do flyer",
            "Imagens de alta qualidade",
            "Tamanho desejado (A5, A4, etc.)",
            "Quantidade de impressão estimada",
            "Identidade visual (se houver)"
        ]
    },
    {
        id: 2,
        title: "Catálogos e Brochuras",
        subtitle: "Material Institucional",
        target: "Empresas, produtos, serviços",
        priceMin: 800,
        priceMax: 2500,
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "7-10 dias úteis",
        includes: [
            "Design de catálogo profissional",
            "Diagramação de até 16 páginas",
            "Tratamento de imagens",
            "Revisões ilimitadas",
            "Versão digital (PDF interativo)",
            "Versão impressa (alta resolução)"
        ],
        requirements: [
            "Conteúdo completo (textos)",
            "Fotos dos produtos/serviços",
            "Estrutura do catálogo",
            "Especificações de impressão",
            "Identidade visual da marca"
        ]
    },
    {
        id: 3,
        title: "Banners e Outdoor",
        subtitle: "Publicidade Grande Formato",
        target: "Eventos, lojas, campanhas",
        priceMin: 150,
        priceMax: 500,
        image: "https://images.unsplash.com/photo-1613227571921-134ebbc83f55?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Médio",
        timeframe: "3-5 dias úteis",
        includes: [
            "Design para grande formato",
            "Otimização para distância de visualização",
            "3 propostas de layout",
            "Arquivos em alta resolução (300 DPI)",
            "Aprovação de cores (CMYK)",
            "Suporte técnico para impressão"
        ],
        requirements: [
            "Dimensões do banner/outdoor",
            "Mensagem principal",
            "Imagens de alta resolução",
            "Local de instalação",
            "Prazo de veiculação"
        ]
    },
    {
        id: 4,
        title: "Posts para Redes Sociais",
        subtitle: "Conteúdo Visual Digital",
        target: "Marcas, influencers, empresas",
        priceMin: 200,
        priceMax: 200,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
        badge: "Trending",
        badgeColor: "purple",
        complexity: "Simples",
        timeframe: "Pack mensal",
        includes: [
            "20 posts personalizados/mês",
            "Designs para Instagram, Facebook, LinkedIn",
            "Stories animados",
            "Carrosséis informativos",
            "Templates editáveis",
            "Calendário de publicações"
        ],
        requirements: [
            "Briefing da marca",
            "Temas mensais",
            "Imagens/fotos de produtos",
            "Textos ou diretrizes de copy",
            "Datas especiais/promoções"
        ]
    }
];

// Catálogo Design & Identidade Visual (genérico - mantido para compatibilidade)
const designCatalog = [
    {
        id: 1,
        title: "Logotipo Profissional",
        subtitle: "Identidade Visual Única",
        target: "Empresas, startups, freelancers, ONGs",
        priceMin: 80,
        priceMax: 250,
        image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Simples",
        timeframe: "3-7 dias",
        includes: [
            "Design de logotipo original",
            "3-5 propostas criativas",
            "Revisões ilimitadas",
            "Arquivos vetoriais (AI, SVG, PDF)",
            "Versões em cores e preto/branco"
        ],
        requirements: [
            "Nome da marca",
            "Descrição do negócio",
            "Valores e personalidade da marca",
            "Referências visuais (se houver)",
            "Cores preferidas"
        ]
    },
    {
        id: 2,
        title: "Identidade Visual Completa",
        subtitle: "Branding Profissional",
        target: "Empresas que querem identidade completa",
        priceMin: 300,
        priceMax: 800,
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "2-4 semanas",
        includes: [
            "Logotipo + variações",
            "Paleta de cores completa",
            "Tipografia da marca",
            "Cartão de visita",
            "Papel timbrado",
            "Manual de identidade visual"
        ],
        requirements: [
            "Briefing completo da marca",
            "Público-alvo definido",
            "Valores e missão",
            "Referências de design",
            "Aplicações desejadas"
        ]
    },
    {
        id: 3,
        title: "Redesign de Marca",
        subtitle: "Modernização Visual",
        target: "Empresas em rebranding ou modernização",
        priceMin: 200,
        priceMax: 600,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Médio",
        timeframe: "1-3 semanas",
        includes: [
            "Análise da identidade atual",
            "Nova proposta visual",
            "Modernização do logotipo",
            "Paleta de cores atualizada",
            "Guia de transição"
        ],
        requirements: [
            "Logotipo atual",
            "Materiais existentes",
            "Objetivos do redesign",
            "O que manter/mudar",
            "Exemplos de inspiração"
        ]
    }
];

// ==================== ÁUDIO & MÚSICA ====================

// Catálogo Gravação de Áudio Profissional  
const audioRecordingCatalog = [
    {
        id: 1,
        title: "Gravação de Podcast",
        subtitle: "Qualidade Profissional",
        target: "Podcasters, entrevistas, conteúdo digital",
        priceMin: 115,
        priceMax: 270,
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop",
        badge: "Rápido",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "1-2 horas",
        includes: [
            "Gravação em estúdio profissional",
            "Engenheiro de som incluído",
            "Edição básica (opcionais à parte)",
            "Até 2 apresentadores/convidados",
            "Formato final em MP3/WAV"
        ],
        requirements: [
            "Roteiro ou tópicos do episódio",
            "Número de participantes",
            "Duração estimada",
            "Intro/outro (se houver)"
        ]
    },
    {
        id: 2,
        title: "Gravação de Vozes",
        subtitle: "Locuções e Narrações",
        target: "Publicidades, vídeos, audiobooks",
        priceMin: 80,
        priceMax: 200,
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "2-4 horas",
        includes: [
            "Sessão de gravação (até 4h)",
            "Cabine acústica profissional",
            "Mixagem e masterização básica",
            "3 revisões incluídas",
            "Entrega em múltiplos formatos"
        ],
        requirements: [
            "Texto/script completo",
            "Tom e estilo desejado",
            "Duração final estimada",
            "Formato de entrega preferido"
        ]
    },
    {
        id: 3,
        title: "Gravação em Estúdio",
        subtitle: "Por Hora",
        target: "Artistas, bandas, produtores",
        priceMin: 25,
        priceMax: 50,
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Simples",
        timeframe: "Por hora",
        includes: [
            "Uso do estúdio equipado",
            "Engenheiro de som (opcional +10€/h)",
            "Gravação multi-pista",
            "Monitoramento profissional",
            "Arquivos brutos entregues"
        ],
        requirements: [
            "Instrumentos (ou aluguer à parte)",
            "Número de músicos",
            "Tempo estimado",
            "Necessidade de engenheiro"
        ]
    }
];

// Catálogo Gravação de Música
const musicRecordingCatalog = [
    {
        id: 1,
        title: "Single Completo",
        subtitle: "Gravação + Mixagem + Masterização",
        target: "Artistas solo, bandas pequenas",
        priceMin: 200,
        priceMax: 500,
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "1-2 semanas",
        includes: [
            "Gravação profissional (até 8h)",
            "Mixagem completa (até 32 canais)",
            "Masterização final",
            "3 revisões por etapa",
            "Arquivos master em WAV/MP3"
        ],
        requirements: [
            "Arranjo musical finalizado",
            "Letra e melodia definidas",
            "Número de instrumentos/vozes",
            "Referências sonoras"
        ]
    },
    {
        id: 2,
        title: "EP (3-5 Músicas)",
        subtitle: "Projeto Musical Completo",
        target: "Artistas emergentes, bandas",
        priceMin: 800,
        priceMax: 1800,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
        badge: "Projeto Completo",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "3-4 semanas",
        includes: [
            "Gravação de 3-5 músicas",
            "Mixagem profissional de todas as faixas",
            "Masterização do EP completo",
            "Produução musical incluída",
            "Revisões ilimitadas",
            "Consultoria artística"
        ],
        requirements: [
            "Composições finalizadas",
            "Pré-produção das músicas",
            "Orçamento definido",
            "Timeline do projeto"
        ]
    },
    {
        id: 3,
        title: "Álbum Completo",
        subtitle: "Produção Premium",
        target: "Artistas profissionais, bandas estabelecidas",
        priceMin: 2500,
        priceMax: 8000,
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop",
        badge: "Premium",
        badgeColor: "gold",
        complexity: "Muito Avançado",
        timeframe: "2-3 meses",
        includes: [
            "Gravação de 10-15 músicas",
            "Pré-produção e arranjos",
            "Mixagem e masterização premium",
            "Produção musical completa",
            "Músicos de sessão (se necessário)",
            "Consultoria artística contínua",
            "Suporte pós-lançamento"
        ],
        requirements: [
            "Repertório completo",
            "Cronograma definido",
            "Orçamento aprovado",
            "Equipe de apoio (se aplicável)"
        ]
    }
];

// Catálogo Masterização e Mixagem
const audioMixMasterCatalog = [
    {
        id: 1,
        title: "Mixagem Profissional",
        subtitle: "Até 32 Canais",
        target: "Músicas, podcasts, produções",
        priceMin: 120,
        priceMax: 260,
        image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&auto=format&fit=crop",
        badge: "Mais Usado",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "3-5 dias",
        includes: [
            "Balanceamento de níveis",
            "Equalização e compressão",
            "Efeitos e automação",
            "3 revisões incluídas",
            "Entrega em stems (opcional)"
        ],
        requirements: [
            "Arquivos multi-pista em WAV",
            "BPM e tom da música",
            "Referências de mix",
            "Observações específicas"
        ]
    },
    {
        id: 2,
        title: "Masterização Por Faixa",
        subtitle: "Acabamento Final",
        target: "Músicas prontas para lançamento",
        priceMin: 35,
        priceMax: 60,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
        badge: "Essencial",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "24-48h",
        includes: [
            "Equalização final",
            "Compressão e loudness",
            "Stereo imaging",
            "2 revisões",
            "Versões para streaming e CD"
        ],
        requirements: [
            "Mix finalizado em WAV (24bit)",
            "Headroom de 3-6dB",
            "Referências de loudness",
            "Plataforma de lançamento"
        ]
    },
    {
        id: 3,
        title: "Mix + Master (Pacote)",
        subtitle: "Solução Completa",
        target: "Artistas que querem serviço tudo-em-um",
        priceMin: 180,
        priceMax: 350,
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop",
        badge: "Melhor Valor",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "5-7 dias",
        includes: [
            "Mixagem completa (até 48 canais)",
            "Masterização profissional",
            "Revisões ilimitadas",
            "Consultoria sonora",
            "Múltiplos formatos de entrega",
            "Stems finais (mixadas)"
        ],
        requirements: [
            "Tracks separadas em WAV",
            "Informações técnicas",
            "Visão artística do projeto",
            "Deadline de lançamento"
        ]
    }
];

// Catálogo Distribuição de Músicas
const musicDistributionCatalog = [
    {
        id: 1,
        title: "Distribuição Digital Anual",
        subtitle: "Lançamentos Ilimitados",
        target: "Artistas independentes ativos",
        priceMin: 20,
        priceMax: 25,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Simples",
        timeframe: "Anual",
        includes: [
            "Upload ilimitado de músicas",
            "Spotify, Apple Music, Deezer, TikTok, etc.",
            "100% dos royalties para você",
            "Análises e estatísticas",
            "Código ISRC incluído",
            "Pré-save e smartlinks"
        ],
        requirements: [
            "Músicas masterizadas",
            "Capa do single/álbum (3000x3000px)",
            "Metadados (artista, título, créditos)",
            "Conta bancária para royalties"
        ]
    },
    {
        id: 2,
        title: "Distribuição Por Lançamento",
        subtitle: "Opção Flexível",
        target: "Artistas com lançamentos esporádicos",
        priceMin: 10,
        priceMax: 50,
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Simples",
        timeframe: "Por lançamento",
        includes: [
            "Single: 10-15€",
            "EP (3-5 músicas): 25-35€",
            "Álbum (10+ músicas): 35-50€",
            "Todas as principais plataformas",
            "Royalties: 85-100% para você",
            "Suporte técnico"
        ],
        requirements: [
            "Áudio master em WAV",
            "Arte da capa em alta resolução",
            "Informações completas",
            "Letra das músicas (recomendado)"
        ]
    },
    {
        id: 3,
        title: "Distribuição + Promoção",
        subtitle: "Pacote Premium",
        target: "Artistas que querem impulsionar lançamentos",
        priceMin: 150,
        priceMax: 500,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Médio",
        timeframe: "Por campanha",
        includes: [
            "Distribuição em todas as plataformas",
            "Pitching para playlists do Spotify",
            "Campanha de marketing digital",
            "Posts para redes sociais",
            "Assessoria de imprensa musical",
            "Relatórios de performance",
            "100% dos royalties"
        ],
        requirements: [
            "Música de qualidade profissional",
            "Material promocional (fotos, bio)",
            "Orçamento de marketing",
            "Estratégia de lançamento"
        ]
    }
];

// Catálogo Áudio & Música (genérico - mantido para compatibilidade)
const audioCatalog = [
    {
        id: 1,
        title: "Gravação de Música",
        subtitle: "Estúdio Profissional",
        target: "Músicos, bandas, cantores",
        priceMin: 100,
        priceMax: 400,
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "1-2 dias por música",
        includes: [
            "Gravação em estúdio profissional",
            "Técnico de som especializado",
            "Mixagem básica",
            "Masterização",
            "Arquivo final em MP3 e WAV"
        ],
        requirements: [
            "Música composta (letra e melodia)",
            "Instrumentos (se houver)",
            "Referências sonoras",
            "Número de faixas/instrumentos",
            "Duração estimada"
        ]
    },
    {
        id: 2,
        title: "Produção de Podcast",
        subtitle: "Áudio para Conteúdo",
        target: "Criadores de conteúdo, empresas",
        priceMin: 80,
        priceMax: 250,
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Simples",
        timeframe: "1-3 dias",
        includes: [
            "Gravação de áudio",
            "Edição e cortes",
            "Equalização e compressão",
            "Música de fundo (se desejado)",
            "Arquivo pronto para publicar"
        ],
        requirements: [
            "Roteiro ou pauta",
            "Duração aproximada",
            "Número de participantes",
            "Músicas/efeitos desejados",
            "Formato de entrega"
        ]
    },
    {
        id: 3,
        title: "Locução Profissional",
        subtitle: "Voz para Projetos",
        target: "Vídeos, anúncios, audiobooks",
        priceMin: 50,
        priceMax: 200,
        image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&auto=format&fit=crop",
        badge: "Melhor Preço",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "1-2 dias",
        includes: [
            "Gravação de locução",
            "Tratamento de áudio",
            "Até 3 revisões",
            "Arquivo em alta qualidade",
            "Entrega rápida"
        ],
        requirements: [
            "Texto/roteiro completo",
            "Tom desejado (sério, descontraído)",
            "Duração estimada",
            "Referências de voz (se houver)",
            "Formato de entrega"
        ]
    }
];

// Catálogo Produção Audiovisual
const audiovisualCatalog = [
    {
        id: 1,
        title: "Vídeo Institucional",
        subtitle: "Apresentação Profissional",
        target: "Empresas, escolas, instituições",
        priceMin: 400,
        priceMax: 1200,
        image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "1-2 semanas",
        includes: [
            "Roteiro e planejamento",
            "Gravação profissional",
            "Edição e pós-produção",
            "Trilha sonora",
            "Legendas (se necessário)"
        ],
        requirements: [
            "Objetivos do vídeo",
            "Mensagem principal",
            "Local de gravação",
            "Duração desejada (1-5 min)",
            "Material adicional (fotos, logos)"
        ]
    },
    {
        id: 2,
        title: "Vídeo para Redes Sociais",
        subtitle: "Conteúdo Viral",
        target: "Influencers, marcas, empresas",
        priceMin: 150,
        priceMax: 500,
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Médio",
        timeframe: "3-7 dias",
        includes: [
            "Conceito criativo",
            "Gravação e edição",
            "Legendas e textos",
            "Música de fundo",
            "Formato otimizado (Instagram, TikTok, etc.)"
        ],
        requirements: [
            "Objetivo do vídeo",
            "Plataforma (Instagram, TikTok, YouTube)",
            "Duração (15s-60s)",
            "Material existente (se houver)",
            "Estilo desejado"
        ]
    },
    {
        id: 3,
        title: "Animação 2D/Motion Graphics",
        subtitle: "Vídeos Animados",
        target: "Explicativos, anúncios, apresentações",
        priceMin: 300,
        priceMax: 1000,
        image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Muito Avançado",
        timeframe: "2-4 semanas",
        includes: [
            "Roteiro e storyboard",
            "Ilustrações personalizadas",
            "Animação profissional",
            "Locução e trilha",
            "Revisões incluídas"
        ],
        requirements: [
            "Mensagem/história a contar",
            "Duração (30s-3min)",
            "Estilo visual preferido",
            "Cores da marca",
            "Referências de animação"
        ]
    }
];

// ==================== PRODUÇÃO AUDIOVISUAL ====================

// Catálogo Gravação de Vídeos 
const videoRecordingCatalog = [
    {
        id: 1,
        title: "Vídeo para Redes Sociais",
        subtitle: "Conteúdo Rápido e Dinâmico",
        target: "Marcas, influencers, pequenos negócios",
        priceMin: 150,
        priceMax: 400,
        image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Simples",
        timeframe: "3-5 dias",
        includes: [
            "Filmagem profissional (meia diária)",
            "1-3 minutos de vídeo final",
            "Edição básica",
            "Legendas e música",
            "Formato otimizado para Instagram/TikTok/Facebook"
        ],
        requirements: [
            "Briefing do conteúdo",
            "Local de gravação",
            "Roteiro ou tópicos",
            "Data preferida"
        ]
    },
    {
        id: 2,
        title: "Vídeo Corporativo",
        subtitle: "Para Websites e Apresentações",
        target: "Empresas, instituições, profissionais",
        priceMin: 300,
        priceMax: 1500,
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
        badge: "Profissional",
        badgeColor: "purple",
        complexity: "Médio",
        timeframe: "1-2 semanas",
        includes: [
            "Filmagem profissional (1 diária completa)",
            "3-10 minutos de vídeo final",
            "Entrevistas e B-rolls",
            "Edição profissional",
            "Correção de cor",
            "Vinheta personalizada"
        ],
        requirements: [
            "Objetivo do vídeo",
            "Mensagem principal",
            "Pessoas a entrevistar",
            "Locais de filmagem",
            "Identidade visual da empresa"
        ]
    },
    {
        id: 3,
        title: "Cobertura de Eventos",
        subtitle: "Gravação e Highlight",
        target: "Eventos corporativos, conferências, festas",
        priceMin: 400,
        priceMax: 1200,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Médio",
        timeframe: "7-10 dias (pós-evento)",
        includes: [
            "Cobertura completa do evento",
            "2 câmaras profissionais",
            "Áudio de qualidade",
            "Vídeo highlight (3-5 min)",
            "Metragem completa em bruto (opcional)"
        ],
        requirements: [
            "Data e hora do evento",
            "Tipo de evento",
            "Duração estimada",
            "Momentos-chave a capturar",
            "Acesso ao local"
        ]
    }
];

// Catálogo Produção Audiovisual Completa
const fullProductionCatalog = [
    {
        id: 1,
        title: "Videoclipe Musical",
        subtitle: "Produção Artística Completa",
        target: "Músicos, bandas, artistas",
        priceMin: 800,
        priceMax: 3500,
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop",
        badge: "Criativo",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "2-4 semanas",
        includes: [
            "Conceito e roteiro criativo",
            "Filmagem com equipamento profissional",
            "Iluminação e cenografia",
            "Edição criativa com efeitos",
            "Correção de cor profissional",
            "Entrega em 4K"
        ],
        requirements: [
            "Música finalizada",
            "Visão artística",
            "Locais propostos",
            "Orçamento",
            "Timeline de lançamento"
        ]
    },
    {
        id: 2,
        title: "Documentário",
        subtitle: "Narrativa Audiovisual",
        target: "Marcas, ONGs, histórias pessoais",
        priceMin: 2000,
        priceMax: 8000,
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop",
        badge: "Narrativo",
        badgeColor: "green",
        complexity: "Muito Avançado",
        timeframe: "1-3 meses",
        includes: [
            "Pesquisa e pré-produção",
            "Múltiplas diárias de filmagem",
            "Entrevistas aprofundadas",
            "Drone e B-roll cinematic",
            "Edição complexa",
            "Sound design e música",
            "20-40 minutos de duração"
        ],
        requirements: [
            "Tema e objetivo",
            "Personagens/entrevistados",
            "Localizações",
            "Cronograma flexível",
            "Material de arquivo (se houver)"
        ]
    },
    {
        id: 3,
        title: "Série de VídeosCorporativos",
        subtitle: "Conteúdo de Longo Prazo",
        target: "Empresas, educação, marketing",
        priceMin: 1500,
        priceMax: 5000,
        image: "https://images.unsplash.com/photo-1522095084534-3399c1b26cb5?w=800&auto=format&fit=crop",
        badge: "Melhor Valor",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "1-2 meses",
        includes: [
            "5-10 episódios",
            "Template visual consistente",
            "Filmagem e edição profissional",
            "Lower thirds e grafismos",
            "Entrega escalonada",
            "Consultoria de conteúdo"
        ],
        requirements: [
            "Temas de cada episódio",
            "Apresentadores/hosts",
            "Calendário de produção",
            "Orçamento total",
            "Estratégia de distribuição"
        ]
    }
];

// Catálogo Criação de Publicidades
const advertisingCatalog = [
    {
        id: 1,
        title: "Spot Publicitário 30s",
        subtitle: "Comercial para TV/Digital",
        target: "Pequenas e médias empresas",
        priceMin: 800,
        priceMax: 2500,
        image: "https://images.unsplash.com/photo-1551847812-6952c980ec29?w=800&auto=format&fit=crop",
        badge: "TV/Digital",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "2-3 semanas",
        includes: [
            "Conceito criativo",
            "Roteiro profissional",
            "Filmagem com câmara cinema",
            "Atores/modelos (casting incluído)",
            "Edição e pós-produção",
            "Locução profissional",
            "Música licenciada"
        ],
        requirements: [
            "Produto/serviço a promover",
            "Público-alvo",
            "Mensagem principal",
            "Orçamento de mídia (se TV)",
            "Prazo de veiculação"
        ]
    },
    {
        id: 2,
        title: "Campanha Publicitária Digital",
        subtitle: "Múltiplos Formatos",
        target: "E-commerces, marcas online",
        priceMin: 1200,
        priceMax: 4000,
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "3-4 semanas",
        includes: [
            "3-5 vídeos em diferentes formatos",
            "Versões para stories, feed e YouTube",
            "Motion graphics e animações",
            "Otimização por plataforma",
            "A/B testing de conceitos",
            "Entrega em múltiplas versões"
        ],
        requirements: [
            "Estratégia de marketing",
            "Produto/catálogo",
            "Plataformas de veiculação",
            "Budget de produção",
            "KPIs esperados"
        ]
    },
    {
        id: 3,
        title: "Anúncio Premium",
        subtitle: "Alta Produção",
        target: "Grandes marcas, lançamentos",
        priceMin: 5000,
        priceMax: 20000,
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop",
        badge: "Premium",
        badgeColor: "gold",
        complexity: "Muito Avançado",
        timeframe: "1-2 meses",
        includes: [
            "Agência criativa envolvida",
            "Produção cinema com equipe completa",
            "Locações premium",
            "Atores profissionais",
            "Pós-produção avançada (VFX)",
            "Direção de arte completa",
            "Versões para TV e digital"
        ],
        requirements: [
            "Brief detalhado da marca",
            "Orçamento substancial",
            "Timeline de aprovações",
            "Equipe de marketing dedicada",
            "Plano de mídia definido"
        ]
    }
];

// Catálogo Edição Profissional de Vídeo
const videoEditingCatalog = [
    {
        id: 1,
        title: "Edição Básica",
        subtitle: "Cortes e Transições",
        target: "Vídeos simples, vlogs, eventos",
        priceMin: 100,
        priceMax: 350,
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
        badge: "Econômico",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "3-5 dias",
        includes: [
            "Até 10 minutos de vídeo final",
            "Cortes e transições simples",
            "Ajuste de cor básico",
            "Música de fundo",
            "2 revisões incluídas"
        ],
        requirements: [
            "Material bruto em boa qualidade",
            "Indicações de cortes (se houver)",
            "Música preferida (ou escolha nossa)",
            "Formato de entrega"
        ]
    },
    {
        id: 2,
        title: "Edição Profissional",
        subtitle: "Narrativa e Efeitos",
        target: "Vídeos corporativos, promocionais",
        priceMin: 350,
        priceMax: 1000,
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "5-10 dias",
        includes: [
            "Até 30 minutos de vídeo final",
            "Narrativa estruturada",
            "Correção de cor avançada",
            "Motion graphics e lower thirds",
            "Sound design",
            "Revisões ilimitadas"
        ],
        requirements: [
            "Todo o material bruto",
            "Roteiro ou estrutura narrativa",
            "Identidade visual",
            "Referências de estilo",
            "Deadline"
        ]
    },
    {
        id: 3,
        title: "Edição Criativa Premium",
        subtitle: "VFX e Pós-Produção Complexa",
        target: "Videoclipes, comerciais, projetos artísticos",
        priceMin: 1000,
        priceMax: 3500,
        image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop",
        badge: "Criativo",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "2-4 semanas",
        includes: [
            "Edição criativa sem limites de duração",
            "Efeitos visuais (VFX)",
            "Composição e chroma key",
            "Animações 2D/3D",
            "Color grading cinematográfico",
            "Masterização de áudio",
            "Entrega em múltiplos formatos"
        ],
        requirements: [
            "Material bruto organizado",
            "Visão criativa clara",
            "Referências visuais",
            "Assets gráficos (se aplicável)",
            "Orçamento flexível"
        ]
    }
];

// ==================== SOLUÇÕES INTEGRADAS ====================

// Catálogo Consultoria Digital
const digitalConsultingCatalog = [
    {
        id: 1,
        title: "Consultoria Básica",
        subtitle: "Análise e Primeiros Passos",
        target: "Pequenas empresas iniciando digitalização",
        priceMin: 500,
        priceMax: 1200,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
        badge: "Acessível",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "1-2 semanas",
        includes: [
            "Auditoria digital inicial",
            "Análise de concorrência",
            "Identificação de oportunidades",
            "Plano de ação básico",
            "2 reuniões de consultoria",
            "Relatório executivo"
        ],
        requirements: [
            "Informações sobre o negócio",
            "Objetivos digitais",
            "Orçamento disponível",
            "Acesso a dados atuais (se existirem)"
        ]
    },
    {
        id: 2,
        title: "Consultoria Profissional",
        subtitle: "Estratégia Mensal",
        target: "Empresas em crescimento digital",
        priceMin: 800,
        priceMax: 2000,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "Mensal (recorrente)",
        includes: [
            "Reuniões semanais de estratégia",
            "Análise contínua de performance",
            "Otimização de processos",
            "Consultoria em ferramentas digitais",
            "Relatórios mensais detalhados",
            "Suporte via email/chat"
        ],
        requirements: [
            "Compromisso mensal",
            "Acesso a métricas e dados",
            "Equipe disponível para implementação",
            "Budget para ferramentas"
        ]
    },
    {
        id: 3,
        title: "Consultoria Enterprise",
        subtitle: "Transformação Digital Completa",
        target: "Grandes empresas e corporações",
        priceMin: 3000,
        priceMax: 10000,
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
        badge: "Premium",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "3-12 meses",
        includes: [
            "Equipe dedicada de consultores",
            "Estratégia digital completa",
            "Implementação supervisionada",
            "Treinamento de equipes",
            "Integração de sistemas",
            "Dashboard executivo em tempo real",
            "Suporte prioritário 24/7"
        ],
        requirements: [
            "Stakeholders envolvidos",
            "Orçamento substancial",
            "Compromisso de longo prazo",
            "Equipe interna disponível"
        ]
    }
];

// Catálogo Estratégia de Marca
const brandStrategyCatalog = [
    {
        id: 1,
        title: "Posicionamento de Marca",
        subtitle: "Defina Sua Posição no Mercado",
        target: "Novas marcas ou reposicionamento",
        priceMin: 800,
        priceMax: 2000,
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
        badge: "Essencial",
        badgeColor: "green",
        complexity: "Médio",
        timeframe: "3-4 semanas",
        includes: [
            "Análise de mercado e concorrência",
            "Definição de público-alvo",
            "Proposta de valor única",
            "Tom de voz e personalidade",
            "Posicionamento estratégico",
            "Documento de estratégia de marca"
        ],
        requirements: [
            "Visão e missão da empresa",
            "Objetivos de negócio",
            "Informações sobre concorrentes",
            "Understanding do público"
        ]
    },
    {
        id: 2,
        title: "Arquitetura de Marca",
        subtitle: "Estrutura Completa de Marcas",
        target: "Empresas com múltiplas marcas/produtos",
        priceMin: 2000,
        priceMax: 5000,
        image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&auto=format&fit=crop",
        badge: "Estratégico",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "6-8 semanas",
        includes: [
            "Auditoria de portfolio de marcas",
            "Estrutura de arquitetura de marca",
            "Hierarquia e relacionamentos",
            "Estratégia de naming",
            "Guidelines de sub-marcas",
            "Plano dereorganização"
        ],
        requirements: [
            "Portfolio atual de marcas",
            "Objetivos corporativos",
            "Stakeholders envolvidos",
            "Budget para implementação"
        ]
    },
    {
        id: 3,
        title: "Rebranding Completo",
        subtitle: "Reinvenção da Marca",
        target: "Marcas em transformação",
        priceMin: 5000,
        priceMax: 15000,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop",
        badge: "Transformação",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "3-6 meses",
        includes: [
            "Pesquisa e análise profunda",
            "Nova estratégia de marca",
            "Redesign completo de identidade",
            "Plano de comunicação de mudança",
            "Gestão de stakeholders",
            "Implementação supervisionada",
            "Campanha de lançamento"
        ],
        requirements: [
            "Razão para rebranding",
            "Budget significativo",
            "Compromisso da liderança",
            "Plano de comunicação interna"
        ]
    }
];

// Catálogo Marketing Digital
const digitalMarketingCatalog = [
    {
        id: 1,
        title: "SEO & Conteúdo",
        subtitle: "Posicionamento Orgânico",
        target: "Empresas que querem visibilidade online",
        priceMin: 400,
        priceMax: 1200,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        badge: "Orgânico",
        badgeColor: "green",
        complexity: "Médio",
        timeframe: "Mensal (3-6 meses)",
        includes: [
            "Auditoria SE",
            "Pesquisa de palavras-chave",
            "Otimização on-page",
            "Criação de conteúdo (4-8 artigos/mês)",
            "Link building básico",
            "Relatórios mensais de posicionamento"
        ],
        requirements: [
            "Acesso ao website",
            "Nicho de mercado definido",
            "Compromisso mensal mínimo",
            "Aprovação de conteúdos"
        ]
    },
    {
        id: 2,
        title: "Campanhas Pagas (Ads)",
        subtitle: "Google Ads & Meta Ads",
        target: "Empresas que querem resultados rápidos",
        priceMin: 600,
        priceMax: 2500,
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "Mensal + budget mídia",
        includes: [
            "Estratégia de campanhas",
            "Criação de anúncios",
            "Gestão de orçamento",
            "Testes A/B contínuos",
            "Otimização diária",
            "Relatórios semanais de ROI",
            "Landing pages (se necessário)"
        ],
        requirements: [
            "Budget de mídia (+300€/mês)",
            "Produto/serviço definido",
            "Website otimizado",
            "Pixels instalados"
        ]
    },
    {
        id: 3,
        title: "Marketing Completo360",
        subtitle: "Estratégia Omnichannel",
        target: "Empresas que querem presença digital total",
        priceMin: 1500,
        priceMax: 5000,
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
        badge: "Completo",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "Mensal (6-12 meses)",
        includes: [
            "SEO e conteúdo",
            "Campanhas pagas multi-plataforma",
            "Email marketing",
            "Gestão de redes sociais",
            "Marketing de influência",
            "Automações de marketing",
            "CRM e lead nurturing",
            "Analytics e BI"
        ],
        requirements: [
            "Budget robusto (marketing + mídia)",
            "Equipe interna de apoio",
            "Compromisso de longo prazo",
            "Infraestrutura digital"
        ]
    }
];

// Catálogo Gestão de Redes Sociais
const socialMediaCatalog = [
    {
        id: 1,
        title: "Gestão Básica",
        subtitle: "2 Redes Sociais",
        target: "Pequenos negócios em início",
        priceMin: 200,
        priceMax: 400,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
        badge: "Starter",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "Mensal",
        includes: [
            "2 redes sociais (Instagram + Facebook)",
            "8-12 posts por mês",
            "3-5 stories por semana",
            "Planejamento de conteúdo",
            "Design gráfico básico",
            "Relatório mensal"
        ],
        requirements: [
            "Acesso às contas sociais",
            "Fotos/material da empresa",
            "Aprovações semanais",
            "Briefing da marca"
        ]
    },
    {
        id: 2,
        title: "Gestão Profissional",
        subtitle: "3 Redes + Ads",
        target: "Empresas em crescimento",
        priceMin: 400,
        priceMax: 800,
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "Mensal",
        includes: [
            "3 redes (Instagram, Facebook, LinkedIn)",
            "15-20 posts/mês + stories diários",
            "Gestão de comunidade (respostas)",
            "Anúncios moderados incluídos",
            "Vídeos curtos (2-4/mês)",
            "Analytics detalhados"
        ],
        requirements: [
            "Material fotográfico/vídeo",
            "Budget pequeno de Ads",
            "Aprovação rápida de conteúdos",
            "Feedback ativo"
        ]
    },
    {
        id: 3,
        title: "Gestão Premium",
        subtitle: "Omnichannel + Influencers",
        target: "Marcas estabelecidas",
        priceMin: 800,
        priceMax: 2000,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
        badge: "Premium",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "Mensal",
        includes: [
            "Todas as redes relevantes",
            "Conteúdo ilimitado",
            "Produção de vídeos profissionais",
            "Gestão ativa 24/7",
            "Parcerias com influencers",
            "Campanhas pagas robustas",
            "Community manager dedicado",
            "Relatórios semanais + BI"
        ],
        requirements: [
            "Budget de produção + mídia",
            "Acesso total às contas",
            "Equipe interna disponível",
            "Objetivos claros de crescimento"
        ]
    }
];

// ==================== APLICATIVOS & SISTEMAS ====================

// Catálogo Desenvolvimento de Apps
const appDevelopmentCatalog = [
    {
        id: 1,
        title: "App Simples (MVP)",
        subtitle: "Funcionalidades Básicas",
        target: "Startups, validação de ideia",
        priceMin: 5000,
        priceMax: 15000,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
        badge: "MVP",
        badgeColor: "green",
        complexity: "Médio",
        timeframe: "2-3 meses",
        includes: [
            "App para 1 plataforma (iOS ou Android)",
            "Design UI/UX básico",
            "5-8 telas principais",
            "Login e perfil de usuário",
            "1-2 funcionalidades core",
            "Backend básico",
            "Testes e publicação na Store"
        ],
        requirements: [
            "Idea e wireframes básicos",
            "Plataforma escolhida",
            "Conteúdo e textos",
            "Conta de desenvolvedor (App/Play Store)"
        ]
    },
    {
        id: 2,
        title: "App Profissional",
        subtitle: "Multiplataforma",
        target: "Empresas, e-commerces mobile",
        priceMin: 15000,
        priceMax: 50000,
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "4-6 meses",
        includes: [
            "App para iOS + Android (React Native/Flutter)",
            "Design UI/UX custom profissional",
            "15-25 telas",
            "Funcionalidades complexas",
            "Integrações (pagamentos, mapas, etc.)",
            "Backend robusto + API",
            "Push notifications",
            "Analytics integrado"
        ],
        requirements: [
            "Especificações detalhadas",
            "Design aprovado",
            "Contas de desenvolvedor",
            "Budget para infraestrutura"
        ]
    },
    {
        id: 3,
        title: "App Enterprise",
        subtitle: "Solução Corporativa",
        target: "Grandes empresas, plataformas",
        priceMin: 50000,
        priceMax: 200000,
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
        badge: "Enterprise",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "6-12 meses",
        includes: [
            "Apps nativos iOS + Android",
            "Design de alta qualidade",
            "Funcionalidades ilimitadas",
            "Integrações empresariais (ERP, CRM)",
            "Segurança avançada",
            "Escalabilidade cloud",
            "Equipe dedicada",
            "Manutenção 12 meses incluída"
        ],
        requirements: [
            "Documentação técnica completa",
            "Equipe interna de TI",
            "Orçamento robusto",
            "Timeline aprovado"
        ]
    }
];

// Catálogo Sistemas Web Personalizados
const webSystemsCatalog = [
    {
        id: 1,
        title: "Dashboard/Painel Admin",
        subtitle: "Gestão e Visualização de Dados",
        target: "Empresas que precisam de gestão interna",
        priceMin: 3000,
        priceMax: 10000,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        badge: "Produtividade",
        badgeColor: "green",
        complexity: "Médio",
        timeframe: "6-10 semanas",
        includes: [
            "Interface administrativa completa",
            "Visualização de dados (gráficos, tabelas)",
            "CRUD de entidades",
            "Sistema de permissões",
            "Filtros e buscas avançadas",
            "Exportação de relatórios",
            "Responsivo para desktop/tablet"
        ],
        requirements: [
            "Especificação dos dados",
            "Wireframes/referências",
            "Acesso a base de dados (se existir)",
            "Permissões e roles definidas"
        ]
    },
    {
        id: 2,
        title: "Sistema SaaS",
        subtitle: "Plataforma Multi-tenant",
        target: "Empresas criando produto digital",
        priceMin: 20000,
        priceMax: 80000,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
        badge: "SaaS",
        badgeColor: "blue",
        complexity: "Muito Avançado",
        timeframe: "4-8 meses",
        includes: [
            "Arquitetura multi-tenant",
            "Sistema de assinaturas",
            "Billing e pagamentos recorrentes",
            "Onboarding de clientes",
            "API REST completa",
            "Admin + Painel de cliente",
            "Infraestrutura cloud escalável",
            " Analytics e métricas"
        ],
        requirements: [
            "Business model definido",
            "Feature set completo",
            "Estratégia de pricing",
            "Budget para infraestrutura"
        ]
    },
    {
        id: 3,
        title: "ERP/CRM Customizado",
        subtitle: "Sistema Empresarial sob Medida",
        target: "Empresas com processos específicos",
        priceMin: 30000,
        priceMax: 150000,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
        badge: "Enterprise",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "6-18 meses",
        includes: [
            "Análise de processos de negócio",
            "Módulos customizados por área",
            "Integrações com sistemas legados",
            "Workflows automatizados",
            "Relatórios e BI",
            "Treinamento de equipes",
            "Migração de dados",
            "Suporte pós-implementação"
        ],
        requirements: [
            "Mapeamento de processos",
            "Stakeholders de todas as áreas",
            "Dados legados para migração",
            "Orçamento e timeline alinhados"
        ]
    }
];

// Catálogo Integrações de Pagamento
const paymentIntegrationCatalog = [
    {
        id: 1,
        title: "Integração Básica",
        subtitle: "Stripe ou PayPal",
        target: "E-commerces pequenos, SaaS iniciantes",
        priceMin: 1000,
        priceMax: 3000,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
        badge: "Rápido",
        badgeColor: "green",
        complexity: "Simples",
        timeframe: "1-2 semanas",
        includes: [
            "Integração com 1 gateway (Stripe ou PayPal)",
            "Checkout básico",
            "Confirmação de pagamentos",
            "Webhooks de notificação",
            "Ambiente de testes"
        ],
        requirements: [
            "Conta no gateway escolhido",
            "Website/app existente",
            "Especificações de produtos",
            "Certificado SSL"
        ]
    },
    {
        id: 2,
        title: "Integração Profissional",
        subtitle: "Múltiplos Gateways",
        target: "E-commerces médios, marketplaces",
        priceMin: 3000,
        priceMax: 8000,
        image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "3-5 semanas",
        includes: [
            "2-3 gateways (Stripe, PayPal, MBWay, etc.)",
            "Múltiplas moedas",
            "Assinaturas recorrentes",
            "Split de pagamentos",
            "Gestão de reembolsos",
            "Dashboard de transações",
            "Compliance PCI DSS"
        ],
        requirements: [
            "Contas nos gateways",
            "Modelo de negócio definido",
            "Requisitos de segurança",
            "Equipe técnica para manutenção"
        ]
    },
    {
        id: 3,
        title: "Solução Enterprise",
        subtitle: "Payment Orchestration",
        target: "Grandes e-commerces, fintechs",
        priceMin: 10000,
        priceMax: 30000,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop",
        badge: "Enterprise",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "2-3 meses",
        includes: [
            "Orquestração de múltiplos gateways",
            "Roteamento inteligente",
            "Retry logic e failover",
            "Fraud detection",
            "Reconciliação automática",
            "Analytics avançados",
            "Auditoria completa",
            "Suporte 24/7"
        ],
        requirements: [
            "Volume alto de transações",
            "Infraestrutura robusta",
            "Equipe de segurança",
            "Budget significativo"
        ]
    }
];

// Catálogo Soluções Empresariais
const enterpriseSolutionsCatalog = [
    {
        id: 1,
        title: "Automação de Processos (RPA)",
        subtitle: "Robotic Process Automation",
        target: "Empresas com processos repetitivos",
        priceMin: 5000,
        priceMax: 20000,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
        badge: "Automação",
        badgeColor: "blue",
        complexity: "Avançado",
        timeframe: "6-12 semanas",
        includes: [
            "Análise de processos candidatos",
            "Desenvolvimento de bots",
            "Integração com sistemas existentes",
            "Orchestrator para gestão",
            "Monitoramento e logs",
            "Treinamento de equipe"
        ],
        requirements: [
            "Mapeamento de processos",
            "Acesso aos sistemas",
            "Licenças de RPA (se necessário)",
            "Equipe interna para manutenção"
        ]
    },
    {
        id: 2,
        title: "Business Intelligence (BI)",
        subtitle: "Dashboards e Análise de Dados",
        target: "Empresas data-driven",
        priceMin: 8000,
        priceMax: 30000,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
        badge: "Analytics",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "2-4 meses",
        includes: [
            "Data warehouse setup",
            "ETL pipelines",
            "Dashboards interativos (Power BI/Tableau)",
            "KPIs customizados",
            "Relatórios automatizados",
            "Treinamento em self-service BI"
        ],
        requirements: [
            "Fontes de dados definidas",
            "KPIs e métricas identificados",
            "Infraestrutura de dados",
            "Stakeholders engajados"
        ]
    },
    {
        id: 3,
        title: "Migração Cloud",
        subtitle: "AWS, Azure ou Google Cloud",
        target: "Empresas modernizando infraestrutura",
        priceMin: 15000,
        priceMax: 80000,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
        badge: "Cloud",
        badgeColor: "green",
        complexity: "Muito Avançado",
        timeframe: "3-9 meses",
        includes: [
            "Assessment de infraestrutura atual",
            "Estratégia de migração",
            "Migração de aplicações",
            "Setup de ambientes cloud",
            "Segurança e compliance",
            "Otimização de custos",
            "Disaster recovery",
            "Treinamento equipe DevOps"
        ],
        requirements: [
            "Inventário de sistemas",
            "Objetivos de migração",
            "Orçamento cloud definido",
            "Equipe técnica disponível"
        ]
    }
];

// Catálogo Soluções Integradas (genérico - mantido para compatibilidade)
const integradasCatalog = [
    {
        id: 1,
        title: "Consultoria Digital",
        subtitle: "Estratégia e Planejamento",
        target: "Empresas em transformação digital",
        priceMin: 200,
        priceMax: 800,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Médio",
        timeframe: "2-4 semanas",
        includes: [
            "Análise de presença digital atual",
            "Estratégia personalizada",
            "Plano de ação detalhado",
            "Recomendações técnicas",
            "Acompanhamento inicial"
        ],
        requirements: [
            "Informações sobre o negócio",
            "Objetivos e metas",
            "Público-alvo",
            "Concorrentes principais",
            "Orçamento disponível"
        ]
    },
    {
        id: 2,
        title: "Gestão de Redes Sociais",
        subtitle: "Marketing Digital",
        target: "Empresas, influencers, marcas",
        priceMin: 300,
        priceMax: 1000,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Avançado",
        timeframe: "Serviço mensal",
        includes: [
            "Criação de conteúdo",
            "Calendário editorial",
            "Gestão de posts e stories",
            "Interação com seguidores",
            "Relatórios mensais de performance"
        ],
        requirements: [
            "Acesso às redes sociais",
            "Briefing da marca",
            "Objetivos de comunicação",
            "Material visual (fotos, vídeos)",
            "Aprovação de conteúdos"
        ]
    },
    {
        id: 3,
        title: "Estratégia de Marca",
        subtitle: "Branding Completo",
        target: "Startups, empresas em crescimento",
        priceMin: 500,
        priceMax: 2000,
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Muito Avançado",
        timeframe: "4-8 semanas",
        includes: [
            "Posicionamento de marca",
            "Proposta de valor",
            "Persona e público-alvo",
            "Tom de voz e comunicação",
            "Guia estratégico completo"
        ],
        requirements: [
            "História da empresa",
            "Visão e missão",
            "Diferenciais competitivos",
            "Objetivos de longo prazo",
            "Mercado-alvo"
        ]
    }
];

// Catálogo Aplicativos & Sistemas
const aplicativosCatalog = [
    {
        id: 1,
        title: "Aplicativo Mobile",
        subtitle: "iOS e Android",
        target: "Empresas, startups, empreendedores",
        priceMin: 2000,
        priceMax: 8000,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
        badge: "Mais Popular",
        badgeColor: "blue",
        complexity: "Muito Avançado",
        timeframe: "8-16 semanas",
        includes: [
            "Design de interface (UI/UX)",
            "Desenvolvimento nativo ou híbrido",
            "Integração com APIs",
            "Testes e otimização",
            "Publicação nas lojas (App Store/Google Play)"
        ],
        requirements: [
            "Briefing detalhado do app",
            "Funcionalidades desejadas",
            "Wireframes ou protótipos",
            "Identidade visual",
            "Integrações necessárias"
        ]
    },
    {
        id: 2,
        title: "Sistema Web Personalizado",
        subtitle: "Soluções Empresariais",
        target: "Empresas com necessidades específicas",
        priceMin: 1500,
        priceMax: 10000,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        badge: "Recomendado",
        badgeColor: "purple",
        complexity: "Muito Avançado",
        timeframe: "6-20 semanas",
        includes: [
            "Análise de requisitos",
            "Arquitetura do sistema",
            "Desenvolvimento full-stack",
            "Painel administrativo",
            "Documentação técnica"
        ],
        requirements: [
            "Descrição do sistema",
            "Fluxos de trabalho",
            "Regras de negócio",
            "Integrações necessárias",
            "Número de usuários estimado"
        ]
    },
    {
        id: 3,
        title: "Integração de Pagamentos",
        subtitle: "Gateway de Pagamento",
        target: "E-commerces, plataformas online",
        priceMin: 500,
        priceMax: 2000,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
        badge: null,
        complexity: "Avançado",
        timeframe: "2-4 semanas",
        includes: [
            "Integração com gateways (Stripe, PayPal, etc.)",
            "Processamento seguro",
            "Gestão de transações",
            "Relatórios de pagamento",
            "Webhooks e notificações"
        ],
        requirements: [
            "Plataforma existente",
            "Gateway preferido",
            "Moedas aceitas",
            "Certificações de segurança",
            "Volume de transações estimado"
        ]
    }
];

const catalogData = {
    'web-all': [
        ...webSitesCatalog.map(item => ({ ...item, category: "Criação de Sites" })),
        ...webHostingCatalog.map(item => ({ ...item, category: "Hospedagem" })),
        ...webEmailCatalog.map(item => ({ ...item, category: "E-mail" })),
        ...webChatbotCatalog.map(item => ({ ...item, category: "Chatbots IA" }))
    ],
    'web-sites': webSitesCatalog,
    'web-hosting': webHostingCatalog,
    'web-email': webEmailCatalog,
    'web-chatbot': webChatbotCatalog,
    'design-logo': designLogoCatalog,
    'design-branding': designBrandingCatalog,
    'design-material': designMaterialCatalog,
    'audio-recording': audioRecordingCatalog,
    'audio-music': musicRecordingCatalog,
    'audio-mixmaster': audioMixMasterCatalog,
    'audio-distribution': musicDistributionCatalog,
    'video-recording': videoRecordingCatalog,
    'video-production': fullProductionCatalog,
    'video-advertising': advertisingCatalog,
    'video-editing': videoEditingCatalog,
    'consulting-digital': digitalConsultingCatalog,
    'consulting-brand': brandStrategyCatalog,
    'consulting-marketing': digitalMarketingCatalog,
    'consulting-social': socialMediaCatalog,
    'app-development': appDevelopmentCatalog,
    'app-websystems': webSystemsCatalog,
    'app-payments': paymentIntegrationCatalog,
    'app-enterprise': enterpriseSolutionsCatalog,
    identidade: designCatalog,
    audio: audioCatalog,
    audiovisual: audiovisualCatalog,
    integradas: integradasCatalog,
    aplicativos: aplicativosCatalog,
    // Outros catálogos podem ser adicionados aqui
};

// Títulos e descrições de cada categoria
const categoryInfo = {
    'web-all': {
        title: "Web & Tecnologia",
        description: "Todas as soluções digitais em um só lugar"
    },
    'web-sites': {
        title: "Criação de Sites Profissionais",
        description: "Sites institucionais, e-commerce, portfólio e muito mais"
    },
    'web-hosting': {
        title: "Hospedagem de Sites",
        description: "Planos de hospedagem seguros e de alta performance"
    },
    'web-email': {
        title: "E-mail Personalizado",
        description: "Email profissional com seu domínio"
    },
    'web-chatbot': {
        title: "Automação com IA (Chatbots)",
        description: "Chatbots inteligentes para atendimento automatizado"
    },
    'design-logo': {
        title: "Criação de Logomarca",
        description: "Logomarcas profissionais do básico ao premium"
    },
    'design-branding': {
        title: "Identidade Visual da Marca",
        description: "Branding completo e identidade corporativa"
    },
    'design-material': {
        title: "Material Gráfico Personalizado",
        description: "Flyers, catálogos, banners e posts para redes sociais"
    },
    'audio-recording': {
        title: "Gravação de Áudio Profissional",
        description: "Podcasts, vozes e gravação em estúdio"
    },
    'audio-music': {
        title: "Gravação de Música",
        description: "Singles, EPs e álbuns completos"
    },
    'audio-mixmaster': {
        title: "Masterização e Mixagem",
        description: "Finalização profissional de áudio"
    },
    'audio-distribution': {
        title: "Distribuição de Músicas",
        description: "Spotify, Apple Music e outras plataformas"
    },
    'video-recording': {
        title: "Gravação de Vídeos",
        description: "Vídeos para redes sociais, corporativos e eventos"
    },
    'video-production': {
        title: "Produção Audiovisual Completa",
        description: "Videoclipes, documentários e séries"
    },
    'video-advertising': {
        title: "Criação de Publicidades",
        description: "Spots, campanhas digitais e anúncios premium"
    },
    'video-editing': {
        title: "Edição Profissional de Vídeo",
        description: "Edição básica, profissional e criativa premium"
    },
    'consulting-digital': {
        title: "Consultoria Digital",
        description: "Análise, estratégia e transformação digital"
    },
    'consulting-brand': {
        title: "Estratégia de Marca",
        description: "Posicionamento, arquitetura e rebranding"
    },
    'consulting-marketing': {
        title: "Marketing Digital",
        description: "SEO, campanhas pagas e marketing 360"
    },
    'consulting-social': {
        title: "Gestão de Redes Sociais",
        description: "Conteúdo, comunidade e crescimento orgânico"
    },
    'app-development': {
        title: "Desenvolvimento de Apps",
        description: "Apps mobile para iOS e Android"
    },
    'app-websystems': {
        title: "Sistemas Web Personalizados",
        description: "Dashboards, SaaS e ERP/CRM"
    },
    'app-payments': {
        title: "Integrações de Pagamento",
        description: "Stripe, PayPal e orquestração de pagamentos"
    },
    'app-enterprise': {
        title: "Soluções Empresariais",
        description: "RPA, BI e migração cloud"
    },
    identidade: {
        title: "Design & Identidade Visual",
        description: "Criação de logomarca, identidade visual e material gráfico personalizado"
    },
    audio: {
        title: "Áudio & Música",
        description: "Gravação profissional, masterização e distribuição de músicas"
    },
    audiovisual: {
        title: "Produção Audiovisual",
        description: "Gravação de vídeos, publicidades e edição profissional"
    },
    integradas: {
        title: "Soluções Integradas",
        description: "Consultoria digital, estratégia de marca e marketing digital"
    },
    aplicativos: {
        title: "Aplicativos & Sistemas",
        description: "Desenvolvimento de apps, sistemas web e integrações"
    }
};

export default function ServiceModal({ serviceId, onClose }) {
    const { addService } = useCart();
    const { currency, changeCurrency, convertPriceRange, availableCurrencies, currencySymbol, isLoading } = useCurrency();
    const [expandedItem, setExpandedItem] = React.useState(null);
    const [showCurrencyMenu, setShowCurrencyMenu] = React.useState(false);

    // Fechar dropdown ao clicar fora
    React.useEffect(() => {
        const handleClickOutside = () => {
            if (showCurrencyMenu) setShowCurrencyMenu(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showCurrencyMenu]);

    if (!serviceId) return null;

    const catalog = catalogData[serviceId] || [];

    if (catalog.length === 0) return null;

    const handleAddService = (item) => {
        addService(item.title);
        onClose();
    };

    const getBadgeColors = (color) => {
        const colors = {
            blue: "bg-blue-600/20 text-blue-400 border-blue-500/30",
            green: "bg-green-600/20 text-green-400 border-green-500/30",
            purple: "bg-purple-600/20 text-purple-400 border-purple-500/30",
        };
        return colors[color] || colors.blue;
    };

    const getComplexityColor = (complexity) => {
        const colors = {
            "Simples": "text-green-400",
            "Médio": "text-yellow-400",
            "Avançado": "text-orange-400",
            "Muito Avançado": "text-red-400"
        };
        return colors[complexity] || "text-gray-400";
    };

    return (
        <AnimatePresence>
            {serviceId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0a0a0f] border border-gray-800 rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 p-6 border-b border-gray-800 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white">{categoryInfo[serviceId]?.title || "Nossos Serviços"}</h2>
                                <p className="text-gray-400 mt-1">{categoryInfo[serviceId]?.description || "Escolha a solução ideal"}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Currency Selector */}
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowCurrencyMenu(!showCurrencyMenu);
                                        }}
                                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 px-3 py-2 rounded-lg transition-colors text-sm"
                                        title="Selecionar moeda"
                                    >
                                        <img
                                            src={CURRENCY_FLAGS[currency]}
                                            alt={currency}
                                            className="w-5 h-5 rounded-sm object-cover"
                                        />
                                        <span className="text-white font-medium">{currencySymbol}</span>
                                        <svg className={`w-3 h-3 text-gray-400 transition-transform ${showCurrencyMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown */}
                                    {showCurrencyMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full right-0 mt-2 bg-[#1a1a2e] border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 min-w-[140px]"
                                        >
                                            {availableCurrencies.map((curr) => (
                                                <button
                                                    key={curr}
                                                    onClick={() => {
                                                        changeCurrency(curr);
                                                        setShowCurrencyMenu(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3 ${currency === curr
                                                        ? 'bg-blue-600/20 text-blue-400'
                                                        : 'text-gray-300 hover:bg-white/5'
                                                        }`}
                                                >
                                                    <img
                                                        src={CURRENCY_FLAGS[curr]}
                                                        alt={curr}
                                                        className="w-6 h-6 rounded-sm object-cover shadow-sm"
                                                    />
                                                    <div className="flex-1 flex items-center justify-between">
                                                        <span className="font-medium">{CURRENCY_SYMBOLS[curr]}</span>
                                                        <span className="text-xs text-gray-500">{curr}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Catalog Grid */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] scroll-smooth">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {catalog.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[#111827] rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all group flex flex-col relative"
                                    >
                                        {/* Badge */}
                                        {item.badge && (
                                            <div className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${getBadgeColors(item.badgeColor)}`}>
                                                {item.badge}
                                            </div>
                                        )}

                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-transparent" />
                                            <div className="absolute bottom-3 left-3 right-3">
                                                {item.category && (
                                                    <span className="inline-block px-2 py-1 mb-2 text-xs bg-blue-600/30 text-blue-300 rounded-md border border-blue-500/30">
                                                        {item.category}
                                                    </span>
                                                )}
                                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                                <p className="text-xs text-blue-400 font-medium">{item.subtitle}</p>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex-1 flex flex-col">
                                            {/* Complexity & Timeframe */}
                                            <div className="flex items-center justify-between mb-3 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500">Complexidade:</span>
                                                    <span className={`font-bold ${getComplexityColor(item.complexity)}`}>
                                                        {item.complexity}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500">⏱</span>
                                                    <span className="text-gray-300 font-medium">{item.timeframe}</span>
                                                </div>
                                            </div>

                                            {/* Target */}
                                            <p className="text-sm text-gray-400 mb-4 italic border-l-2 border-blue-500/30 pl-3">
                                                {item.target}
                                            </p>

                                            {/* Price */}
                                            <div className="mb-4 p-3 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-800/30">
                                                <p className="text-xs text-gray-500 mb-1">Investimento:</p>
                                                <p className="text-lg font-bold text-white">
                                                    {convertPriceRange(item.priceMin, item.priceMax)}
                                                </p>
                                            </div>

                                            {/* Includes */}
                                            <div className="mb-4">
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Inclui:</h4>
                                                <ul className="space-y-1.5">
                                                    {item.includes.slice(0, expandedItem === item.id ? item.includes.length : 3).map((inc, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                            <span className={expandedItem === item.id ? "" : "line-clamp-2"}>{inc}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {item.includes.length > 3 && expandedItem !== item.id && (
                                                    <button
                                                        onClick={() => setExpandedItem(item.id)}
                                                        className="text-xs text-blue-400 hover:text-blue-300 mt-2 flex items-center gap-1 transition-colors"
                                                    >
                                                        <span>Ver todos ({item.includes.length})</span>
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Requirements */}
                                            <div className={`mb-4 p-3 bg-gray-900/50 rounded-xl border border-gray-800/50 transition-all ${expandedItem === item.id ? 'max-h-96' : 'max-h-24'} overflow-hidden`}>
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <FileText className="w-3 h-3" />
                                                    Você precisa enviar:
                                                </h4>
                                                {expandedItem === item.id ? (
                                                    <ul className="space-y-1">
                                                        {item.requirements.map((req, i) => (
                                                            <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                                                <span className="text-blue-500 mt-0.5">•</span>
                                                                <span>{req}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-xs text-gray-400 leading-relaxed">
                                                        {item.requirements.slice(0, 2).join(' • ')}
                                                        {item.requirements.length > 2 && '...'}
                                                    </p>
                                                )}
                                            </div>

                                            {expandedItem === item.id && (
                                                <button
                                                    onClick={() => setExpandedItem(null)}
                                                    className="text-xs text-gray-400 hover:text-white mb-3 flex items-center gap-1 transition-colors"
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                    <span>Recolher</span>
                                                </button>
                                            )}

                                            {/* Action Button */}
                                            <button
                                                onClick={() => handleAddService(item)}
                                                className="mt-auto w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-900/50 flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                Adicionar ao Projeto
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Extra Costs Info - Apenas para Serviços Web */}
                            {serviceId && serviceId.startsWith('web') && (
                                <div className="mt-8 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-800">
                                    <h3 className="text-lg font-bold text-white mb-4">💰 Custos Extras (muito comuns)</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-400">Domínio</p>
                                            <p className="text-white font-semibold">10€ - 20€/ano</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Hospedagem</p>
                                            <p className="text-white font-semibold">50€ - 150€/ano</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Manutenção</p>
                                            <p className="text-white font-semibold">20€ - 100€/mês</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Conteúdo</p>
                                            <p className="text-white font-semibold">Pode ser extra</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}