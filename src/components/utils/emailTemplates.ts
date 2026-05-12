// Mensagens personalizadas por tipo de serviço
export const getClientConfirmationMessage = (services) => {
  const serviceArray = Array.isArray(services) ? services : [services];
  const firstService = serviceArray[0];
  
  // Detectar categoria do serviço
  const webServices = ['Criação de Sites Profissionais', 'Aplicativos Web', 'Email Personalizado', 'Hospedagem de Sites', 'Chatbots & IA para Empresas'];
  const designServices = ['Criação de Logo Marca', 'Identidade Visual Completa', 'Material Gráfico'];
  const audiovisualServices = ['Gravação de Áudio Profissional', 'Gravação de Música', 'Gravação de Vídeos', 'Streaming para Eventos', 'Sistema de Som para Eventos', 'Publicidades e Spots', 'Distribuição de Músicas'];
  const marketingServices = ['Marketing Digital', 'Gestão de Redes Sociais', 'Consultoria Digital', 'Estratégia de Marca'];
  
  let category = 'geral';
  if (webServices.includes(firstService)) category = 'web';
  else if (designServices.includes(firstService)) category = 'design';
  else if (audiovisualServices.includes(firstService)) category = 'audiovisual';
  else if (marketingServices.includes(firstService)) category = 'marketing';
  
  const messages = {
    web: {
      title: '💻 Seu Projeto Web está em Boas Mãos!',
      intro: 'Recebemos seu pedido para desenvolvimento de soluções web e estamos empolgados em trabalhar com você!',
      body: `Nossa equipe de especialistas em tecnologia já está analisando os detalhes do seu projeto de ${serviceArray.join(', ')}. 

Entendemos que sua presença digital é fundamental para o sucesso do seu negócio, e vamos criar uma solução que supere suas expectativas.`,
      next: 'Um dos nossos desenvolvedores entrará em contacto em até 24 horas com uma proposta detalhada e cronograma.'
    },
    design: {
      title: '🎨 Vamos Criar Sua Identidade Visual!',
      intro: 'Recebemos seu pedido de design e estamos prontos para dar vida à sua marca!',
      body: `Nossa equipe criativa está animada para desenvolver ${serviceArray.join(', ')} que vai destacar seu negócio.

Sabemos que o design é a primeira impressão que seus clientes terão, e garantimos que será memorável!`,
      next: 'Nosso diretor criativo entrará em contacto em até 24 horas para discutir suas ideias e preferências de estilo.'
    },
    audiovisual: {
      title: '🎬 Produção Audiovisual de Excelência!',
      intro: 'Recebemos seu pedido de produção audiovisual e estamos prontos para criar conteúdo incrível!',
      body: `Nossa equipe de produção está preparada para realizar ${serviceArray.join(', ')} com a qualidade profissional que você merece.

Com equipamento de ponta e anos de experiência, vamos capturar e produzir conteúdo que vai impressionar seu público.`,
      next: 'Nossa equipe de produção entrará em contacto em até 24 horas para agendar uma reunião e discutir os detalhes técnicos.'
    },
    marketing: {
      title: '📈 Vamos Impulsionar Seu Negócio!',
      intro: 'Recebemos seu pedido de marketing digital e estamos prontos para fazer sua marca crescer!',
      body: `Nossa equipe de marketing está empolgada para desenvolver estratégias de ${serviceArray.join(', ')} que vão gerar resultados reais.

Com dados, criatividade e experiência, vamos aumentar sua visibilidade e atrair mais clientes.`,
      next: 'Nosso estrategista digital entrará em contacto em até 24 horas com insights iniciais e próximos passos.'
    },
    geral: {
      title: '✨ Pedido Recebido com Sucesso!',
      intro: 'Recebemos seu pedido de orçamento e estamos ansiosos para trabalhar com você!',
      body: `Nossa equipe está analisando os detalhes do seu projeto de ${serviceArray.join(', ')}.

Na EZZO Digital, transformamos ideias em realidade com excelência e dedicação.`,
      next: 'Nossa equipe entrará em contacto em até 24 horas com uma proposta personalizada para você.'
    }
  };
  
  return messages[category];
};

export const generateClientEmailBody = (formData, message) => {
  const services = Array.isArray(formData.service) ? formData.service : [formData.service];
  
  return `
Olá ${formData.name.split(' ')[0]}! 👋

${message.title}

${message.intro}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message.body}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 RESUMO DO SEU PEDIDO:

   Serviço(s): ${services.join(', ')}
   Orçamento: ${formData.budget || 'A definir'}
   Prazo: ${formData.deadline || 'Flexível'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ PRÓXIMOS PASSOS:

${message.next}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 ENQUANTO ISSO:

• Prepare referências visuais ou exemplos do que você gosta
• Pense em detalhes específicos que deseja incluir
• Tenha em mente seu público-alvo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Se tiver qualquer dúvida urgente, não hesite em nos contactar:
📧 Email: info@ezzo.ao
📱 WhatsApp: +244 921 063 706

Obrigado por escolher a EZZO Digital! 🚀

Com os melhores cumprimentos,
Equipa EZZO Digital
Luanda, Angola

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 www.ezzo.ao
📸 Instagram: @ezzo_digital
📘 Facebook: /ezzodigital
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
};