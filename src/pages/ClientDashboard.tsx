import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { clientService, ClientProject, UserProfile, ServiceRequest } from '@/services/clientService';
import { Loader2, Lock, Download, LogOut, FileText, CheckCircle, Clock, AlertCircle, ShoppingCart, User as UserIcon, Plus, CreditCard, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '@/utils/emailService';
import { useNotification } from '@/components/ui/NotificationSystem';

// Full Service List synced with Contact/Services page
const SERVICES_LIST = [
    // Design & Identidade Visual
    "Criação de Logo Marca", "Identidade Visual Completa", "Manual da Marca Completo", "Material Gráfico Personalizado",
    // Web & Tecnologia
    "Criação de Sites Profissionais", "Email Personalizado", "Hospedagem de Sites", "Aplicativos Web", "Automação com IA (Chatbots)",
    // Áudio & Música
    "Gravação de Áudio Profissional", "Gravação de Música", "Masterização e Mixagem", "Distribuição de Músicas",
    // Produção Audiovisual
    "Gravação de Vídeos", "Produção Audiovisual Completa", "Criação de Publicidades", "Edição Profissional", "Streaming para Eventos", "Sistema de Som para Eventos",
    // Soluções Integradas
    "Consultoria Digital", "Estratégia de Marca", "Marketing Digital", "Gestão de Redes Sociais",
    // Aplicativos & Sistemas
    "Desenvolvimento de Apps", "Sistemas Web Personalizados", "Integrações de Pagamento", "Soluções Empresariais",
    "Outros"
];

export default function ClientDashboard() {
    const navigate = useNavigate();
    const notification = useNotification();
    const [session, setSession] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'projects' | 'orders' | 'profile'>('projects');

    // Data States
    const [projects, setProjects] = useState<ClientProject[]>([]);
    const [orders, setOrders] = useState<ServiceRequest[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    // Loading States
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false); // For saves/creates

    // Auth State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // New Order Form State
    const [showNewOrder, setShowNewOrder] = useState(false);
    const [newOrderType, setNewOrderType] = useState(SERVICES_LIST[0]);
    const [newOrderDesc, setNewOrderDesc] = useState('');

    useEffect(() => {
        // Check active session & Redirect Admin
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            handleAdminRedirect(session);
            if (session) {
                loadAllData(session);
            } else {
                setLoading(false);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            handleAdminRedirect(session);
            if (session) loadAllData(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleAdminRedirect = (session: any) => {
        if (session && session.user.email === 'ezzo.link@gmail.com') {
            navigate('/admin');
        }
    };

    const loadAllData = async (currentSession: any) => {
        setLoading(true);
        try {
            // Load independently so one failure doesn't block the UI
            const pProjects = clientService.getMyProjects().catch(e => { console.error("Projects load error:", e); return []; });
            const pOrders = clientService.getMyRequests().catch(e => { console.error("Orders load error:", e); return []; });
            const pProfile = clientService.getProfile().catch(e => {
                console.error("Profile load error:", e);
                // Fallback to session data if profile fails (likely DB missing)
                return {
                    id: currentSession?.user?.id,
                    email: currentSession?.user?.email,
                    full_name: currentSession?.user?.user_metadata?.full_name || '',
                    role: 'client'
                } as UserProfile;
            });

            const [projectsData, ordersData, profileData] = await Promise.all([pProjects, pOrders, pProfile]);

            setProjects(projectsData);
            setOrders(ordersData);
            setProfile(profileData);
        } catch (error) {
            console.error("Critical error loading dashboard:", error);
            notification.error("Erro ao carregar dados do painel.", "Erro de Conexão");
        } finally {
            setLoading(false);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        setMessage(null);

        try {
            if (authMode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { company: company || null } }
                });
                if (error) throw error;
                setMessage({ type: 'success', text: 'Verifique seu email para confirmar o cadastro!' });
                notification.success('Verifique seu email para confirmar o cadastro!', 'Cadastro Realizado');
            } else if (authMode === 'reset') {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/cliente/nova-senha',
                });
                if (error) throw error;
                setMessage({ type: 'success', text: 'Email de recuperação enviado!' });
                notification.success('Email de recuperação enviado!', 'Verifique seu Email');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                notification.success('Login realizado com sucesso!', 'Bem-vindo');
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erro na autenticação' });
            notification.error(error.message || 'Erro na autenticação', 'Falha no Login');
        } finally {
            setActionLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setProjects([]);
        setOrders([]);
        setProfile(null);
        notification.info('Você saiu da sua conta.', 'Logout');
    };

    const handleCreateOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        notification.info('Processando seu pedido...', 'Aguarde');

        let successMessage = "Pedido enviado com sucesso!";
        let warnings = [];

        try {
            // 1. Create in Supabase (Database Record)
            try {
                await clientService.createServiceRequest({
                    service_type: newOrderType,
                    description: newOrderDesc
                });
                // Reload orders to show new one
                const ordersData = await clientService.getMyRequests();
                setOrders(ordersData);
            } catch (dbError) {
                console.error("Supabase Error:", dbError);
                warnings.push("Não foi possível salvar no histórico.");
            }

            // 2. Send Notification Email (Using EmailJS)
            try {
                await sendEmail({
                    name: profile?.full_name || session?.user?.email || "Cliente sem Nome",
                    email: session?.user?.email || "",
                    phone: profile?.phone || "Não informado",
                    services: newOrderType,
                    budget: "A definir (Solicitação via Painel)",
                    deadline: "A definir",
                    message: newOrderDesc,
                    source: "Painel do Cliente",
                    date: new Date().toLocaleString()
                });
            } catch (emailError) {
                console.error("EmailJS Error:", emailError);
                warnings.push("Não foi possível enviar a notificação por email para o admin.");
            }

            if (warnings.length > 0) {
                notification.warning(`${successMessage} Porém: ${warnings.join(", ")}`, 'Atencao');
            } else {
                notification.success(successMessage, 'Pedido Realizado');
            }

            setShowNewOrder(false);
            setNewOrderDesc('');

        } catch (error) {
            console.error("Unexpected error:", error);
            notification.error("Ocorreu um erro inesperado ao processar seu pedido.", "Erro");
        } finally {
            setActionLoading(false);
        };
    }

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        setActionLoading(true);
        try {
            await clientService.updateProfile({
                full_name: profile.full_name,
                company_name: profile.company_name,
                phone: profile.phone
            });
            notification.success('Seu perfil foi atualizado com sucesso!', 'Perfil Salvo');
        } catch (error) {
            console.error(error);
            notification.error('Erro ao atualizar perfil. Tente novamente mais tarde.', 'Erro');
        } finally {
            setActionLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setActionLoading(true);
        notification.info('Enviando imagem...', 'Upload');
        try {
            const url = await clientService.uploadAvatar(file);
            await clientService.updateProfile({ avatar_url: url });
            setProfile(prev => prev ? { ...prev, avatar_url: url } : null);
            notification.success('Foto de perfil atualizada!', 'Sucesso');
        } catch (error) {
            console.error(error);
            notification.error('Erro ao enviar foto.', 'Erro de Upload');
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Concluído': case 'Pago': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'Em Desenvolvimento': case 'Aprovado': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'Aguardando Aprovação': case 'Pendente': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'Cancelado': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    if (!session) {
        // --- AUTH SCREEN (Login/Signup) ---
        return (
            <div className="min-h-screen pt-24 px-4 flex items-center justify-center bg-[#0a0a0f]">
                <div className="w-full max-w-md bg-[#111827] p-8 rounded-2xl border border-gray-800 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            {authMode === 'login' ? 'Área do Cliente' : authMode === 'signup' ? 'Novo Cadastro' : 'Recuperar Senha'}
                        </h2>
                        <p className="text-gray-400 text-sm mt-2">
                            {authMode === 'reset' ? 'Digite seu email para receber o link.' : 'Acesse seus projetos e faturas'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Seu Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#0a0a0f] border-gray-700 text-white"
                            required
                        />

                        {authMode !== 'reset' && (
                            <Input
                                type="password"
                                placeholder="Sua Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#0a0a0f] border-gray-700 text-white"
                                required
                            />
                        )}

                        {authMode === 'signup' && (
                            <Input
                                type="text"
                                placeholder="Nome da Empresa (Opcional)"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="bg-[#0a0a0f] border-gray-700 text-white"
                            />
                        )}

                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                {message.text}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={actionLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                authMode === 'login' ? 'Entrar' :
                                    authMode === 'signup' ? 'Cadastrar' : 'Enviar Link'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 flex flex-col space-y-2 text-center text-sm">
                        {authMode === 'login' && (
                            <>
                                <button onClick={() => setAuthMode('signup')} className="text-gray-400 hover:text-white underline">
                                    Não tem conta? Cadastre-se
                                </button>
                                <button onClick={() => setAuthMode('reset')} className="text-gray-500 hover:text-gray-400 text-xs">
                                    Esqueceu a senha?
                                </button>
                            </>
                        )}

                        {(authMode === 'signup' || authMode === 'reset') && (
                            <button onClick={() => setAuthMode('login')} className="text-gray-400 hover:text-white underline">
                                Voltar para Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                    <div className="flex items-center gap-4">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
                                <UserIcon className="w-8 h-8 text-gray-400" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-white">{profile?.full_name || session?.user?.email || 'Bem-vindo'}</h1>
                            <p className="text-gray-400 text-sm">{profile?.email || session?.user?.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="border-gray-700 hover:bg-red-500/10 hover:text-red-400">
                        <LogOut className="w-4 h-4 mr-2" /> Sair
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto">
                    {[
                        { id: 'projects', label: 'Meus Projetos', icon: FileText },
                        { id: 'orders', label: 'Meus Pedidos', icon: ShoppingCart },
                        { id: 'profile', label: 'Meu Perfil', icon: UserIcon },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4 mr-2" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">

                        {/* --- TAB: PROJECTS --- */}
                        {activeTab === 'projects' && (
                            projects.length === 0 ? (
                                <div className="text-center py-16 bg-[#111827] rounded-2xl border border-gray-800">
                                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-white">Nenhum projeto ativo</h3>
                                    <p className="text-gray-400 mt-2">Seus projetos em desenvolvimento aparecerão aqui.</p>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {projects.map((project) => (
                                        <div key={project.id} className="bg-[#111827] rounded-2xl border border-gray-800 p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{project.project_name}</h3>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        Atualizado em: {new Date(project.updated_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="mb-6">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-400">Progresso</span>
                                                    <span className="text-white font-bold">{project.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: `${project.progress}%` }} />
                                                </div>
                                            </div>
                                            {/* Files List */}
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {project.files?.map((file, idx) => (
                                                    <a key={idx} href={file.url} target="_blank" rel="noreferrer" className="flex items-center p-3 rounded-lg bg-[#0a0a0f] border border-gray-800 hover:border-blue-500/50 transition-colors group">
                                                        <FileText className="w-4 h-4 text-gray-500 group-hover:text-blue-400 mr-2" />
                                                        <span className="text-sm text-gray-300 truncate">{file.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {/* --- TAB: ORDERS --- */}
                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-white">Histórico de Pedidos</h2>
                                    <Button onClick={() => setShowNewOrder(!showNewOrder)} className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="w-4 h-4 mr-2" /> Novo Pedido
                                    </Button>
                                </div>

                                {/* New Order Form */}
                                <AnimatePresence>
                                    {showNewOrder && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <form onSubmit={handleCreateOrder} className="bg-[#111827] p-6 rounded-2xl border border-blue-500/30 mb-8">
                                                <h3 className="text-lg font-bold text-white mb-4">Solicitar Novo Serviço</h3>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm text-gray-400 mb-2">Tipo de Serviço</label>
                                                        <select
                                                            value={newOrderType}
                                                            onChange={(e) => setNewOrderType(e.target.value)}
                                                            className="w-full bg-[#0a0a0f] border border-gray-700 rounded-md p-2 text-white"
                                                        >
                                                            {SERVICES_LIST.map(service => (
                                                                <option key={service} value={service}>{service}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm text-gray-400 mb-2">Descrição do Projeto</label>
                                                    <Textarea
                                                        value={newOrderDesc}
                                                        onChange={(e) => setNewOrderDesc(e.target.value)}
                                                        placeholder="Descreva o que você precisa: objetivos, funcionalidades, referências..."
                                                        className="bg-[#0a0a0f] border-gray-700 text-white min-h-[100px]"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex justify-end gap-3">
                                                    <Button type="button" variant="ghost" onClick={() => setShowNewOrder(false)}>Cancelar</Button>
                                                    <Button type="submit" disabled={actionLoading} className="bg-blue-600">
                                                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enviar Solicitação'}
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-center text-gray-500 mt-4">
                                                    Ao enviar, você receberá uma confirmação no painel e nossa equipe será notificada por email.
                                                </p>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Orders List */}
                                <div className="space-y-4">
                                    {orders.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">Você ainda não fez nenhum pedido.</p>
                                    ) : (
                                        orders.map((order) => (
                                            <div key={order.id} className="bg-[#111827] rounded-xl border border-gray-800 p-5 flex flex-col md:flex-row justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-bold text-white">{order.service_type}</h3>
                                                        <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(order.status)}`}>{order.status}</span>
                                                    </div>
                                                    <p className="text-gray-400 text-sm mb-3">{order.description}</p>
                                                    <p className="text-xs text-gray-500">Solicitado em: {new Date(order.created_at).toLocaleDateString()}</p>
                                                </div>

                                                {/* Payment & Price Section */}
                                                <div className="flex flex-col items-end min-w-[150px] border-l border-gray-800 pl-4">
                                                    <p className="text-xs text-gray-400 mb-1">Valor do Orçamento</p>
                                                    {order.price ? (
                                                        <p className="text-xl font-bold text-white mb-2">
                                                            Kz {Number(order.price).toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm text-gray-500 italic mb-2">Sob Análise</p>
                                                    )}

                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="w-3 h-3 text-gray-400" />
                                                        <span className={`text-xs font-bold ${order.payment_status === 'Pago' ? 'text-green-400' : 'text-yellow-400'}`}>
                                                            {order.payment_status?.toUpperCase() || 'PENDENTE'}
                                                        </span>
                                                    </div>

                                                    {order.admin_notes && (
                                                        <div className="mt-3 bg-blue-900/20 p-2 rounded text-xs text-blue-300 max-w-[200px]">
                                                            <span className="font-bold block mb-1">Nota:</span>
                                                            {order.admin_notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* --- TAB: PROFILE --- */}
                        {activeTab === 'profile' && profile && (
                            <div className="max-w-2xl mx-auto bg-[#111827] rounded-2xl border border-gray-800 p-8">
                                <h3 className="text-xl font-bold text-white mb-6">Editar Perfil</h3>

                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative group">
                                        <img
                                            src={profile.avatar_url || "https://ui-avatars.com/api/?name=" + (profile.full_name || 'User')}
                                            alt="Avatar"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-800"
                                        />
                                        <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Upload className="w-6 h-6 text-white" />
                                            <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                                        </label>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-white">Foto de Perfil</h4>
                                        <p className="text-sm text-gray-400">Clique na foto para alterar. (Requer módulo de Storage habilitado)</p>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Nome Completo</label>
                                            <Input
                                                value={profile.full_name || ''}
                                                onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                                                className="bg-[#0a0a0f] border-gray-700 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Empresa</label>
                                            <Input
                                                value={profile.company_name || ''}
                                                onChange={e => setProfile({ ...profile, company_name: e.target.value })}
                                                className="bg-[#0a0a0f] border-gray-700 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                                        <Input value={profile.email} disabled className="bg-[#0a0a0f] opacity-50 cursor-not-allowed border-gray-700 text-gray-400" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Telefone / WhatsApp</label>
                                        <Input
                                            value={profile.phone || ''}
                                            onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                            className="bg-[#0a0a0f] border-gray-700 text-white"
                                            placeholder="+244 9..."
                                        />
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button type="submit" disabled={actionLoading} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                                            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Salvar Alterações
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'profile' && !profile && (
                            <div className="text-center py-16 bg-[#111827] rounded-2xl border border-gray-800">
                                <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-white">Perfil não disponível</h3>
                                <p className="text-gray-400 mt-2">Houve um erro ao carregar seu perfil. Tente recarregar a página ou fazer login novamente.</p>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}
