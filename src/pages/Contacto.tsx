import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { useNotification } from '@/components/ui/NotificationSystem';
import { sendEmail } from '@/utils/emailService';
import { useCart } from '@/context/CartContext';

const WHATSAPP_URL = "https://wa.me/244921063706?text=Olá! Gostaria de solicitar um orçamento.";

const services = [
  // Design & Identidade Visual
  "Criação de Logo Marca",
  "Identidade Visual Completa",
  "Manual da Marca Completo",
  "Material Gráfico Personalizado",

  // Web & Tecnologia
  "Criação de Sites Profissionais",
  "Email Personalizado",
  "Hospedagem de Sites",
  "Aplicativos Web",
  "Automação com IA (Chatbots)",

  // Áudio & Música
  "Gravação de Áudio Profissional",
  "Gravação de Música",
  "Masterização e Mixagem",
  "Distribuição de Músicas",

  // Produção Audiovisual
  "Gravação de Vídeos",
  "Produção Audiovisual Completa",
  "Criação de Publicidades",
  "Edição Profissional",
  "Streaming para Eventos",
  "Sistema de Som para Eventos",

  // Soluções Integradas
  "Consultoria Digital",
  "Estratégia de Marca",
  "Marketing Digital",
  "Gestão de Redes Sociais",

  // Aplicativos & Sistemas
  "Desenvolvimento de Apps",
  "Sistemas Web Personalizados",
  "Integrações de Pagamento",
  "Soluções Empresariais",

  "Outro"
];

const budgetRanges = [
  "Até 50.000 AOA",
  "50.000 - 150.000 AOA",
  "150.000 - 300.000 AOA",
  "300.000 - 500.000 AOA",
  "Acima de 500.000 AOA",
  "A definir"
];

const sources = [
  "Google",
  "Instagram",
  "Facebook",
  "Indicação de amigo",
  "LinkedIn",
  "Outro"
];

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { services: selectedServices, addService, removeService, clearCart } = useCart();
  const notification = useNotification();

  // URL params logic can now just add to cart if not present, but let's keep it simple.
  // Actually, if URL has params, we should ADD them to the cart context.
  const urlParams = new URLSearchParams(window.location.search);
  const servicesParam = urlParams.get('services');

  useEffect(() => {
    if (servicesParam) {
      const servicesList = servicesParam.split(',').map(s => s.trim());
      servicesList.forEach(s => {
        // Add to global cart if not there
        addService(s);
      });
      // Clear URL to avoid re-adding on refresh? Standard pattern is OK.
    }
  }, [servicesParam]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    deadline: '',
    description: '',
    source: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addServiceToList = (serviceName) => {
    addService(serviceName);
  };

  const removeServiceFromList = (serviceName) => {
    removeService(serviceName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obrigatórios
    if (!formData.name || !formData.email || selectedServices.length === 0 || !formData.description) {
      notification.warning('Por favor, preencha todos os campos obrigatórios.', '⚠️ Campos Incompletos');
      return;
    }

    setIsSubmitting(true);
    notification.info('Processando solicitação...', '⏳ Aguarde');

    let supabaseSuccess = false;
    let emailSuccess = false;
    let errors = [];

    // 1. Tentar salvar no Supabase (Opcional se falhar, mas ideal)
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            budget: formData.budget,
            deadline: formData.deadline,
            description: formData.description,
            source: formData.source,
            services: selectedServices
          }
        ]);

      if (error) throw error;
      supabaseSuccess = true;
      console.log("Supabase: Sucesso");
    } catch (error) {
      console.error('Supabase Error:', error);
      errors.push("Banco de dados indisponível");
    }

    // 2. Tentar enviar Email (Prioridade)
    try {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        services: selectedServices.join(', '),
        budget: formData.budget,
        deadline: formData.deadline,
        message: formData.description,
        source: formData.source,
        date: new Date().toLocaleString()
      });
      emailSuccess = true;
      console.log("EmailJS: Sucesso");
    } catch (error) {
      console.error('EmailJS Error:', error);
      errors.push("Falha no envio de email");
    }

    setIsSubmitting(false);

    // Análise do Resultado
    if (supabaseSuccess || emailSuccess) {
      // Pelo menos um funcionou!
      notification.success(
        'Solicitação recebida com sucesso! Nossa equipe entrará em contacto.',
        '🎉 Sucesso!'
      );

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        budget: '',
        deadline: '',
        description: '',
        source: ''
      });
      clearCart();

      if (!supabaseSuccess) {
        console.warn("Aviso: Dados enviados por email, mas não salvos no banco.");
      }
    } else {
      // Ambos falharam
      notification.error(
        'Não foi possível enviar sua solicitação por nenhum método. Tente o WhatsApp.',
        '❌ Falha Total'
      );
      console.error("Erros:", errors);
    }
  };





  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
            alt="Contacto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/95 via-[#0a0a0f]/90 to-green-900/80" />

          {/* Animated Dots Pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6"
          >
            Fale Connosco
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Solicite um <span className="text-blue-500">Orçamento</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Preencha o formulário abaixo com os detalhes do seu projeto
            e nossa equipe entrará em contacto em breve.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Detalhes do Projeto</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Nome Completo / Empresa *</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome ou da sua empresa"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="bg-[#0a0a0f] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="bg-[#0a0a0f] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="+244 9xx xxx xxx"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="bg-[#0a0a0f] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Serviços de Interesse * (pode adicionar múltiplos)</Label>
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => addServiceToList(value)}>
                          <SelectTrigger className="bg-[#0a0a0f] border-gray-700 text-white">
                            <SelectValue placeholder="Selecione serviços" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#111827] border-gray-700">
                            {services.map((service) => (
                              <SelectItem key={service} value={service} className="text-white hover:bg-gray-700">
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Selected Services */}
                      {selectedServices.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {selectedServices.map((service) => (
                            <motion.div
                              key={service}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg text-sm"
                            >
                              <span>{service}</span>
                              <button
                                type="button"
                                onClick={() => removeServiceFromList(service)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Orçamento Estimado</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleChange('budget', value)}
                      >
                        <SelectTrigger className="bg-[#0a0a0f] border-gray-700 text-white">
                          <SelectValue placeholder="Selecione uma faixa de valor" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111827] border-gray-700">
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range} className="text-white hover:bg-gray-700">
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline" className="text-gray-300">Prazo Desejado</Label>
                      <Input
                        id="deadline"
                        placeholder="Ex: 3 semanas, final do mês..."
                        value={formData.deadline}
                        onChange={(e) => handleChange('deadline', e.target.value)}
                        className="bg-[#0a0a0f] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">Descrição do Projeto *</Label>
                    <Textarea
                      id="description"
                      placeholder="Conte-nos em detalhes sobre o que você precisa..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      required
                      rows={5}
                      className="bg-[#0a0a0f] border-gray-700 text-white placeholder:text-gray-500 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Como nos encontrou?</Label>
                    <Select
                      value={formData.source}
                      onValueChange={(value) => handleChange('source', value)}
                    >
                      <SelectTrigger className="bg-[#0a0a0f] border-gray-700 text-white">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111827] border-gray-700">
                        {sources.map((source) => (
                          <SelectItem key={source} value={source} className="text-white hover:bg-gray-700">
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send className="w-5 h-5 mr-2" />
                        </motion.div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Orçamento
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Informações de Contacto</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a href="mailto:contato@ezzo.ao" className="text-white hover:text-blue-400 transition-colors">
                        contato@ezzo.ao
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Telefone</p>
                      <a href="tel:+244921063706" className="text-white hover:text-green-400 transition-colors">
                        +244 921 063 706
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Localização</p>
                      <p className="text-white">Luanda, Angola</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white w-full py-4 rounded-xl font-medium transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Fale Conosco no WhatsApp
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">Siga-nos</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/ezzo_digital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                  </a>
                  <a
                    href="https://www.facebook.com/ezzodigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}