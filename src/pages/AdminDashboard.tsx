import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { adminService } from '@/services/adminService';
import { portfolioService } from '@/services/portfolioService';
import { blogService } from '@/services/blogService';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Edit, Trash2, CheckCircle, XCircle, LogOut, LayoutDashboard, FileText, Image as ImageIcon, MessageSquare, ShoppingCart, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import AdminModal from '@/components/admin/AdminModal';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'orders' | 'portfolio' | 'blog' | 'testimonials'>('overview');

    // Data State
    const [stats, setStats] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [profiles, setProfiles] = useState<any[]>([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    // Confirm Dialog State
    const [confirmDialog, setConfirmDialog] = useState<{ message: string; onConfirm: () => void } | null>(null);

    // Order Edit State
    const [editingOrder, setEditingOrder] = useState<string | null>(null);
    const [orderPrice, setOrderPrice] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    useEffect(() => {
        checkAdmin();
        loadAllData();
    }, []);

    const checkAdmin = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || user.email !== 'ezzo.link@gmail.com') {
            navigate('/cliente');
        }
    };

    const loadAllData = async () => {
        setLoading(true);
        try {
            const [p, b, t, o, prof, s] = await Promise.all([
                portfolioService.getAllProjects(),
                blogService.getAllPublishedPosts(),
                adminService.getAllTestimonials(),
                adminService.getAllServiceRequests(),
                adminService.getAllProfiles(),
                adminService.getDashboardStats()
            ]);
            setProjects(p);
            setPosts(b);
            setTestimonials(t);
            setOrders(o || []);
            setProfiles(prof || []);
            setStats(s);
        } catch (e) {
            console.error("Error loading admin data", e);
        } finally {
            setLoading(false);
        }
    };

    // --- HANDLERS ---
    const handleOpenModal = (item: any = null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSave = async (data: any) => {
        if (activeTab === 'portfolio') {
            if (editingItem) {
                await adminService.updateProject(editingItem.id, data);
            } else {
                await adminService.createProject(data);
            }
        } else if (activeTab === 'blog') {
            if (editingItem) {
                await adminService.updatePost(editingItem.id, data);
            } else {
                if (!data.slug) data.slug = data.title.toLowerCase().replace(/ /g, '-');
                await adminService.createPost(data);
            }
        } else if (activeTab === 'testimonials') {
            if (editingItem) {
                await adminService.updateTestimonial(editingItem.id, data);
            } else {
                await adminService.createTestimonial(data);
            }
        }
        await loadAllData();
    };

    const handleDeleteProject = async (id: string) => {
        setConfirmDialog({
            message: 'Tem certeza que deseja excluir este projeto?',
            onConfirm: async () => {
                await adminService.deleteProject(id);
                loadAllData();
                setConfirmDialog(null);
            }
        });
    };

    const handleApproveTestimonial = async (id: string) => {
        await adminService.approveTestimonial(id);
        loadAllData();
    };

    const handleDeleteTestimonial = async (id: string) => {
        setConfirmDialog({
            message: 'Tem certeza que deseja excluir este depoimento?',
            onConfirm: async () => {
                await adminService.deleteTestimonial(id);
                loadAllData();
                setConfirmDialog(null);
            }
        });
    };

    // --- ORDER HANDLERS ---
    const handleUpdateOrder = async (id: string, updates: any) => {
        await adminService.updateServiceRequest(id, updates);
        setEditingOrder(null);
        loadAllData();
    };

    const handleEditOrder = (order: any) => {
        setEditingOrder(order.id);
        setOrderPrice(order.price || '');
        setOrderNotes(order.admin_notes || '');
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (loading) return <div className="min-h-screen pt-24 flex justify-center bg-[#0a0a0f]"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>;

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Painel Admin EZZO
                        </h1>
                        <p className="text-gray-400">Gerencie clientes, vendas e conteúdo.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <LogOut className="w-4 h-4 mr-2" /> Sair
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-800 pb-1 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Visão Geral', icon: TrendingUp },
                        { id: 'clients', label: 'Clientes', icon: Users },
                        { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
                        { id: 'portfolio', label: 'Portfólio', icon: ImageIcon },
                        { id: 'blog', label: 'Blog', icon: FileText },
                        { id: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
                    ].map(tab => (
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

                {/* Content */}
                <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6 min-h-[400px]">

                    {/* --- VISÃO GERAL --- */}
                    {activeTab === 'overview' && stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-[#0a0a0f] p-6 rounded-xl border border-gray-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-400">Faturamento Total (Pago)</h3>
                                    <DollarSign className="w-6 h-6 text-green-500" />
                                </div>
                                <p className="text-3xl font-bold text-white">
                                    Kz {stats.totalRevenue.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="bg-[#0a0a0f] p-6 rounded-xl border border-gray-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-400">Total de Clientes</h3>
                                    <Users className="w-6 h-6 text-blue-500" />
                                </div>
                                <p className="text-3xl font-bold text-white">{stats.totalClients}</p>
                            </div>
                            <div className="bg-[#0a0a0f] p-6 rounded-xl border border-gray-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-400">Total de Pedidos</h3>
                                    <ShoppingCart className="w-6 h-6 text-purple-500" />
                                </div>
                                <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
                            </div>
                        </div>
                    )}

                    {/* --- CLIENTES --- */}
                    {activeTab === 'clients' && (
                        <div className="overflow-x-auto">
                            <h2 className="text-xl font-bold mb-6">Base de Clientes ({profiles.length})</h2>
                            <table className="w-full text-left">
                                <thead className="text-gray-400 border-b border-gray-800">
                                    <tr>
                                        <th className="pb-3 pl-2">Nome / Empresa</th>
                                        <th className="pb-3">Email</th>
                                        <th className="pb-3">Telefone</th>
                                        <th className="pb-3">Cadastro</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {profiles.map(profile => (
                                        <tr key={profile.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                                            <td className="py-4 pl-2 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                                    {profile.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : <Users className="w-4 h-4 m-2 text-gray-400" />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{profile.full_name || 'Sem nome'}</div>
                                                    <div className="text-xs text-gray-500">{profile.company_name}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-300">{profile.email}</td>
                                            <td className="py-4 text-gray-300">{profile.phone || '-'}</td>
                                            <td className="py-4 text-gray-500">{new Date(profile.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* --- PEDIDOS --- */}
                    {activeTab === 'orders' && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-6">Pedidos de Serviço ({orders.length})</h2>
                            {orders.map(order => (
                                <div key={order.id} className="bg-[#0a0a0f] p-4 rounded-xl border border-gray-800 flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-white text-lg">{order.service_type}</h3>
                                                <p className="text-sm text-blue-400">{order.client_email} <span className="text-gray-500">({order.client_name})</span></p>
                                            </div>
                                            <div className="flex gap-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateOrder(order.id, { status: e.target.value })}
                                                    className="bg-[#1f2937] border border-gray-700 text-xs text-white rounded px-2 py-1"
                                                >
                                                    <option>Pendente</option>
                                                    <option>Aprovado</option>
                                                    <option>Em Desenvolvimento</option>
                                                    <option>Concluído</option>
                                                    <option>Cancelado</option>
                                                </select>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm bg-[#111827] p-3 rounded-lg border border-gray-800 mb-3">
                                            "{order.description}"
                                        </p>
                                        <p className="text-xs text-gray-600">ID: {order.id} | Data: {new Date(order.created_at).toLocaleString()}</p>
                                    </div>

                                    <div className="lg:w-1/3 border-l border-gray-800 pl-4 flex flex-col justify-center">
                                        {editingOrder === order.id ? (
                                            <div className="space-y-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Preço (Kz)"
                                                    value={orderPrice}
                                                    onChange={e => setOrderPrice(e.target.value)}
                                                    className="bg-[#1f2937] border-gray-700 h-8 text-sm"
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="Notas (ex: IBAN)"
                                                    value={orderNotes}
                                                    onChange={e => setOrderNotes(e.target.value)}
                                                    className="bg-[#1f2937] border-gray-700 h-8 text-sm"
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <Button size="sm" variant="ghost" onClick={() => setEditingOrder(null)} className="h-7 text-xs">Cancelar</Button>
                                                    <Button size="sm" onClick={() => handleUpdateOrder(order.id, { price: orderPrice, admin_notes: orderNotes })} className="bg-green-600 h-7 text-xs">Salvar</Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-white mb-1">
                                                    {order.price ? `Kz ${Number(order.price).toLocaleString()}` : <span className="text-gray-600 text-lg">Sem Preço</span>}
                                                </div>
                                                <div className="flex justify-end gap-2 mb-2">
                                                    <span className={`px-2 py-1 text-xs font-bold rounded ${order.payment_status === 'Pago' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                        {order.payment_status?.toUpperCase() || 'NOVO'}
                                                    </span>
                                                    <button onClick={() => handleEditOrder(order)} className="text-blue-400 hover:text-white text-xs underline">
                                                        Editar Valor
                                                    </button>
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    {order.payment_status !== 'Pago' && (
                                                        <Button size="sm" onClick={() => handleUpdateOrder(order.id, { payment_status: 'Pago' })} className="bg-green-600 hover:bg-green-700 h-7 text-xs">
                                                            Marcar Pago
                                                        </Button>
                                                    )}
                                                    <Button size="sm" onClick={() => setConfirmDialog({ message: 'Apagar este pedido?', onConfirm: () => { adminService.deleteServiceRequest(order.id).then(loadAllData); setConfirmDialog(null); } })} className="bg-red-600 hover:bg-red-700 h-7 text-xs">
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* --- PORTFOLIO (OLD) --- */}
                    {activeTab === 'portfolio' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Projetos ({projects.length})</h2>
                                <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
                                    <Plus className="w-4 h-4 mr-2" /> Novo Projeto
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map(project => (
                                    <div key={project.id} className="bg-[#0a0a0f] rounded-xl overflow-hidden border border-gray-800 relative group">
                                        <img src={project.image_url} alt={project.title} className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                        <div className="p-4">
                                            <h3 className="font-bold truncate">{project.title}</h3>
                                            <p className="text-xs text-blue-400">{project.category}</p>
                                        </div>
                                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleOpenModal(project)} className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"><Edit className="w-4 h-4" /></button>
                                            <button onClick={() => handleDeleteProject(project.id)} className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'blog' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Artigos ({posts.length})</h2>
                                <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700">
                                    <Plus className="w-4 h-4 mr-2" /> Novo Artigo
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {posts.map(post => (
                                    <div key={post.id} className="flex items-center justify-between bg-[#0a0a0f] p-4 rounded-xl border border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-gray-800 overflow-hidden">
                                                <img src={post.image_url} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{post.title}</h3>
                                                <p className="text-xs text-gray-500">Slug: {post.slug} | Views: {post.views_count || 0}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {post.published ? 'Publicado' : 'Rascunho'}
                                            </span>
                                            <button onClick={() => handleOpenModal(post)} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded"><Edit className="w-4 h-4" /></button>
                                            <button onClick={() => adminService.deletePost(post.id).then(loadAllData)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'testimonials' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Depoimentos ({testimonials.length})</h2>
                                <Button onClick={() => handleOpenModal()} className="bg-green-600 hover:bg-green-700">
                                    <Plus className="w-4 h-4 mr-2" /> Novo Depoimento
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {testimonials.map(t => (
                                    <div key={t.id} className="bg-[#0a0a0f] p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row justify-between gap-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                                                {t.avatar_url ? <img src={t.avatar_url} className="w-full h-full object-cover" /> : <Users className="w-6 h-6 m-3 text-gray-400" />}
                                            </div>
                                            <div>
                                                <p className="italic text-gray-300">"{t.content}"</p>
                                                <p className="text-sm font-bold mt-2 text-blue-400">{t.client_name} <span className="text-gray-500 font-normal">- {t.role}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {!t.approved && (
                                                <Button onClick={() => handleApproveTestimonial(t.id)} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                                    <CheckCircle className="w-4 h-4 mr-1" /> Aprovar
                                                </Button>
                                            )}
                                            {t.approved && <span className="text-green-500 text-xs font-bold px-3">Aprovado</span>}

                                            <Button onClick={() => handleOpenModal(t)} size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
                                                <Edit className="w-4 h-4" />
                                            </Button>

                                            <Button onClick={() => handleDeleteTestimonial(t.id)} size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CONFIRM DIALOG */}
            {confirmDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#1f2937] rounded-2xl border border-gray-700 p-8 max-w-sm w-full mx-4 shadow-2xl">
                        <h3 className="text-lg font-bold text-white mb-4">Confirmar</h3>
                        <p className="text-gray-300 mb-8">{confirmDialog.message}</p>
                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setConfirmDialog(null)} className="text-gray-400">Cancelar</Button>
                            <Button onClick={confirmDialog.onConfirm} className="bg-red-600 hover:bg-red-700 text-white">Confirmar</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* ADMIN MODAL */}
            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={activeTab === 'portfolio' ? 'project' : activeTab === 'blog' ? 'post' : 'testimonial'}
                initialData={editingItem}
                onSave={handleSave}
            />
        </div>
    );
}
