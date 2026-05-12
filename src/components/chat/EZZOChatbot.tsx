import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Calendar, FileText, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { chatWithIA } from '@/api/aiService';
import { sendEmail } from '@/utils/emailService';

const WHATSAPP_URL = "https://wa.me/244921063706";

const quickActions = [
    { label: "Ver Serviços", action: "servicos", icon: FileText },
    { label: "Perguntas Frequentes", action: "faq", icon: HelpCircle },
    { label: "Solicitar Orçamento", action: "orcamento", icon: Sparkles },
    { label: "Agendar Chamada", action: "agendar", icon: Calendar },
];

const faqs = [
    {
        question: "Quanto tempo leva para criar um site?",
        answer: "O tempo varia conforme a complexidade: sites simples levam 2-3 semanas, sites corporativos 4-6 semanas, e plataformas complexas 8-12 semanas. Inclui design, desenvolvimento e testes."
    },
    {
        question: "Vocês oferecem manutenção após entrega?",
        answer: "Sim! Oferecemos planos de manutenção mensal que incluem atualizações, backups, monitoramento de segurança e suporte técnico contínuo."
    },
    {
        question: "Qual é o custo médio dos serviços?",
        answer: "Sites profissionais a partir de 150.000 AOA, identidade visual completa desde 80.000 AOA, gravação de música desde 50.000 AOA. Valores variam conforme escopo. Solicite orçamento personalizado!"
    },
    {
        question: "Vocês trabalham com empresas fora de Luanda?",
        answer: "Sim! Atendemos clientes em todo Angola e também internacionalmente. Trabalhamos remotamente e podemos visitar presencialmente quando necessário."
    },
    {
        question: "Como funciona o processo de criação de identidade visual?",
        answer: "1) Briefing e pesquisa de mercado, 2) Criação de conceitos e apresentação, 3) Refinamento baseado no feedback, 4) Entrega do manual da marca completo com todos os arquivos."
    },
    {
        question: "Vocês criam aplicativos mobile?",
        answer: "Sim! Desenvolvemos aplicativos web (PWA) que funcionam em qualquer dispositivo, e também apps nativos para iOS e Android conforme necessidade do projeto."
    }
];

export default function EZZOChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Olá! 👋 Sou o assistente virtual da EZZO Digital. Como posso ajudá-lo hoje?',
            type: 'text'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        description: ''
    });
    const [showScheduler, setShowScheduler] = useState(false);
    const [scheduleData, setScheduleData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: ''
    });
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleQuickAction = (action) => {
        if (action === 'servicos') {
            navigate(createPageUrl('Servicos'));
            setIsOpen(false);
        } else if (action === 'orcamento') {
            setShowForm(true);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Ótimo! Vamos criar seu orçamento. Por favor, preencha as informações abaixo:',
                type: 'text'
            }]);
        } else if (action === 'agendar') {
            setShowScheduler(true);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Vamos agendar uma chamada rápida! Por favor, escolha data e horário:',
                type: 'text'
            }]);
        } else if (action === 'faq') {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Aqui estão algumas perguntas frequentes. Clique em uma para ver a resposta:',
                type: 'faq'
            }]);
        } else if (action === 'whatsapp') {
            window.open(WHATSAPP_URL, '_blank');
        }
    };

    const handleFaqClick = (faq) => {
        setMessages(prev => [...prev,
        { role: 'user', content: faq.question, type: 'text' },
        { role: 'assistant', content: faq.answer, type: 'text' }
        ]);
    };

    const handleFormSubmit = async () => {
        if (!formData.name || !formData.email || !formData.service) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '❌ Por favor, preencha pelo menos nome, email e serviço desejado.',
                type: 'text'
            }]);
            return;
        }

        setIsLoading(true);
        try {
            const emailBody = `
🎯 NOVO ORÇAMENTO VIA CHATBOT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DADOS DO CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone || 'Não informado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 INFORMAÇÕES DO PROJETO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Serviço: ${formData.service}
Orçamento: ${formData.budget || 'A definir'}

Descrição:
${formData.description || 'Não informada'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Data: ${new Date().toLocaleString('pt-AO')}
Origem: Chatbot Inteligente
      `.trim();

            await sendEmail({
                to_name: 'Equipe EZZO',
                from_name: formData.name,
                email: formData.email,
                subject: `🤖 Orçamento Chatbot: ${formData.service} - ${formData.name}`,
                message: emailBody
            });

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '✅ Orçamento enviado com sucesso! Nossa equipe entrará em contacto em breve. Enquanto isso, gostaria de agendar uma chamada rápida?',
                type: 'text'
            }]);

            setShowForm(false);
            setFormData({ name: '', email: '', phone: '', service: '', budget: '', description: '' });
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '❌ Erro ao enviar orçamento. Tente pelo WhatsApp ou entre em contacto direto.',
                type: 'text'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScheduleSubmit = async () => {
        if (!scheduleData.name || !scheduleData.email || !scheduleData.date || !scheduleData.time) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '❌ Por favor, preencha todos os campos para agendar.',
                type: 'text'
            }]);
            return;
        }

        setIsLoading(true);
        try {
            const emailBody = `
📞 NOVO AGENDAMENTO DE CHAMADA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 DADOS DO CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome: ${scheduleData.name}
Email: ${scheduleData.email}
Telefone: ${scheduleData.phone || 'Não informado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 HORÁRIO SOLICITADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data: ${scheduleData.date}
Horário: ${scheduleData.time}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Solicitado em: ${new Date().toLocaleString('pt-AO')}
Origem: Chatbot Inteligente
      `.trim();

            await sendEmail({
                to_name: 'Equipe EZZO',
                from_name: scheduleData.name,
                email: scheduleData.email,
                subject: `📅 Agendamento Chatbot: ${scheduleData.name}`,
                message: emailBody
            });

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '✅ Chamada agendada! Confirmaremos o horário por email em breve. Há algo mais em que posso ajudar?',
                type: 'text'
            }]);

            setShowScheduler(false);
            setScheduleData({ name: '', email: '', phone: '', date: '', time: '' });
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '❌ Erro ao agendar. Entre em contacto direto pelo WhatsApp.',
                type: 'text'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const context = `
Você é o assistente virtual da EZZO Digital, uma agência multifuncional angolana.

INFORMAÇÕES DA EZZO:
- Nome: EZZO Digital
- Localização: Luanda, Angola
- Email: contato@ezzo.ao
- Telefone/WhatsApp: +244 921 063 706
- Instagram: @ezzo_digital

SERVIÇOS OFERECIDOS:
1. IDENTIDADE & MARCA: Criação de Logo, Identidade Visual, Material Gráfico.
2. WEB & TECNOLOGIA: Sites Profissionais, Emails Corporativos, Apps Web, Chatbots IA.
3. AUDIOVISUAL: Gravação de Áudio/Música, Videoclipes, Spots Publicitários.
4. MARKETING: Gestão de Redes Sociais, Tráfego Pago, Consultoria.

SUA FUNÇÃO:
- Seja amigável, profissional e prestativo.
- Responda em português de Angola.
- Tente vender os serviços da EZZO.
- Se não souber, sugira o WhatsApp.
`;

            const aiResponse = await chatWithIA(`${context}\n\nCliente: ${userMessage}\n\nResponda (max 3 parágrafos):`);

            // Detectar se deve sugerir conteúdo relevante
            let suggestions = [];
            const lowerMessage = userMessage.toLowerCase();

            if (lowerMessage.includes('site') || lowerMessage.includes('web')) {
                suggestions.push({ label: 'Ver Serviços Web', page: 'Servicos' });
            }
            if (lowerMessage.includes('design') || lowerMessage.includes('logo') || lowerMessage.includes('marca')) {
                suggestions.push({ label: 'Ver Identidade Visual', page: 'Servicos' });
            }
            if (lowerMessage.includes('aplicativo') || lowerMessage.includes('app')) {
                suggestions.push({ label: 'Ver Nossos Apps', page: 'Aplicativos' });
            }
            if (lowerMessage.includes('música') || lowerMessage.includes('áudio') || lowerMessage.includes('video')) {
                suggestions.push({ label: 'Ver Produção Audiovisual', page: 'Servicos' });
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: aiResponse,
                type: 'text',
                suggestions: suggestions.length > 0 ? suggestions : null
            }]);
        } catch (error: any) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `❌ Erro de Debug: ${error.message || error.toString()}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 overflow-hidden p-1"
                    >
                        <img
                            src="https://res.cloudinary.com/djhn3zwkw/image/upload/v1765715698/1-Photoroom_ucz9sl.png"
                            alt="EZZO Chat"
                            className="w-full h-full object-cover"
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-50 w-auto sm:w-96 h-[500px] sm:h-[600px] bg-[#111827] rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
                                    <img
                                        src="https://res.cloudinary.com/djhn3zwkw/image/upload/v1765715698/1-Photoroom_ucz9sl.png"
                                        alt="EZZO"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">EZZO Digital</h3>
                                    <p className="text-blue-100 text-xs">Assistente Virtual</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0f]">
                            {messages.map((message, index) => (
                                <div key={index}>
                                    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-[#111827] text-gray-200 border border-gray-800'
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </div>

                                    {/* FAQ Options */}
                                    {message.type === 'faq' && (
                                        <div className="mt-3 space-y-2">
                                            {faqs.map((faq, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleFaqClick(faq)}
                                                    className="w-full text-left bg-[#111827] hover:bg-gray-800 text-gray-300 px-4 py-3 rounded-xl border border-gray-700 transition-colors text-sm"
                                                >
                                                    <HelpCircle className="w-4 h-4 inline mr-2 text-blue-500" />
                                                    {faq.question}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Content Suggestions */}
                                    {message.suggestions && message.suggestions.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {message.suggestions.map((suggestion, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        navigate(createPageUrl(suggestion.page));
                                                        setIsOpen(false);
                                                    }}
                                                    className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/30 transition-colors"
                                                >
                                                    {suggestion.label} →
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#111827] rounded-2xl px-4 py-3 border border-gray-800">
                                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quote Form */}
                        {showForm && (
                            <div className="px-4 py-3 bg-[#0a0a0f] border-t border-gray-800 space-y-3">
                                <Input
                                    placeholder="Seu nome *"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <Input
                                    type="email"
                                    placeholder="Seu email *"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <Input
                                    placeholder="Telefone (opcional)"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                                    <SelectTrigger className="bg-[#111827] border-gray-700 text-white text-sm">
                                        <SelectValue placeholder="Serviço desejado *" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#111827] border-gray-700">
                                        <SelectItem value="site">Criação de Site</SelectItem>
                                        <SelectItem value="identidade">Identidade Visual</SelectItem>
                                        <SelectItem value="app">Aplicativo Web</SelectItem>
                                        <SelectItem value="marketing">Marketing Digital</SelectItem>
                                        <SelectItem value="audiovisual">Produção Audiovisual</SelectItem>
                                        <SelectItem value="outro">Outro</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="Orçamento estimado (opcional)"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <Input
                                    placeholder="Descrição breve do projeto"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setShowForm(false)}
                                        variant="outline"
                                        className="flex-1 text-sm"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={handleFormSubmit}
                                        disabled={isLoading}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm"
                                    >
                                        Enviar Orçamento
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Scheduler Form */}
                        {showScheduler && (
                            <div className="px-4 py-3 bg-[#0a0a0f] border-t border-gray-800 space-y-3">
                                <Input
                                    placeholder="Seu nome *"
                                    value={scheduleData.name}
                                    onChange={(e) => setScheduleData({ ...scheduleData, name: e.target.value })}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <Input
                                    type="email"
                                    placeholder="Seu email *"
                                    value={scheduleData.email}
                                    onChange={(e) => setScheduleData({ ...scheduleData, email: e.target.value })}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <Input
                                    placeholder="Telefone (opcional)"
                                    value={scheduleData.phone}
                                    onChange={(e) => setScheduleData({ ...scheduleData, phone: e.target.value })}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <Input
                                    type="date"
                                    value={scheduleData.date}
                                    onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="bg-[#111827] border-gray-700 text-white text-sm"
                                />
                                <Select value={scheduleData.time} onValueChange={(value) => setScheduleData({ ...scheduleData, time: value })}>
                                    <SelectTrigger className="bg-[#111827] border-gray-700 text-white text-sm">
                                        <SelectValue placeholder="Horário preferido *" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#111827] border-gray-700">
                                        <SelectItem value="09:00">09:00</SelectItem>
                                        <SelectItem value="10:00">10:00</SelectItem>
                                        <SelectItem value="11:00">11:00</SelectItem>
                                        <SelectItem value="14:00">14:00</SelectItem>
                                        <SelectItem value="15:00">15:00</SelectItem>
                                        <SelectItem value="16:00">16:00</SelectItem>
                                        <SelectItem value="17:00">17:00</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setShowScheduler(false)}
                                        variant="outline"
                                        className="flex-1 text-sm"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={handleScheduleSubmit}
                                        disabled={isLoading}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm"
                                    >
                                        Agendar Chamada
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        {messages.length <= 2 && !showForm && !showScheduler && (
                            <div className="px-4 py-2 bg-[#0a0a0f] border-t border-gray-800">
                                <p className="text-xs text-gray-400 mb-2">Ações rápidas:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickActions.map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <button
                                                key={action.action}
                                                onClick={() => handleQuickAction(action.action)}
                                                className="flex items-center gap-2 text-xs bg-[#111827] hover:bg-gray-800 text-gray-300 px-3 py-2 rounded-lg border border-gray-700 transition-colors"
                                            >
                                                <Icon className="w-3 h-3" />
                                                {action.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        {!showForm && !showScheduler && (
                            <div className="p-4 bg-[#111827] border-t border-gray-800">
                                <div className="flex gap-2">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Digite sua mensagem..."
                                        disabled={isLoading}
                                        className="flex-1 bg-[#0a0a0f] border-gray-700 text-white placeholder:text-gray-500 text-sm"
                                    />
                                    <Button
                                        onClick={handleSend}
                                        disabled={isLoading || !input.trim()}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}