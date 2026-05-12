import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'project' | 'post' | 'testimonial';
    initialData?: any;
    onSave: (data: any) => Promise<void>;
}

export default function AdminModal({ isOpen, onClose, type, initialData, onSave }: AdminModalProps) {
    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {});
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Failed to save", error);
            alert("Erro ao salvar. Verifique o console.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#111827] w-full max-w-2xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Editar' : 'Novo'} {type === 'project' ? 'Projeto' : type === 'post' ? 'Artigo' : 'Depoimento'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* --- PROJECT FIELDS --- */}
                    {type === 'project' && (
                        <>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Título</label>
                                <Input required value={formData.title || ''} onChange={e => handleChange('title', e.target.value)} className="bg-[#0a0a0f] border-gray-700" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Categoria</label>
                                    <Input required value={formData.category || ''} onChange={e => handleChange('category', e.target.value)} className="bg-[#0a0a0f] border-gray-700" placeholder="Ex: Web, Mobile" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Imagem URL</label>
                                    <Input required value={formData.image_url || ''} onChange={e => handleChange('image_url', e.target.value)} className="bg-[#0a0a0f] border-gray-700" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Descrição</label>
                                <Textarea required value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} className="bg-[#0a0a0f] border-gray-700 min-h-[100px]" />
                            </div>
                        </>
                    )}

                    {/* --- POST FIELDS --- */}
                    {type === 'post' && (
                        <>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Título</label>
                                <Input required value={formData.title || ''} onChange={e => handleChange('title', e.target.value)} className="bg-[#0a0a0f] border-gray-700" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Slug (URL amigável)</label>
                                    <Input required value={formData.slug || ''} onChange={e => handleChange('slug', e.target.value)} className="bg-[#0a0a0f] border-gray-700" placeholder="meu-artigo-novo" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Autor</label>
                                    <Input required value={formData.author_name || 'Equipe EZZO'} onChange={e => handleChange('author_name', e.target.value)} className="bg-[#0a0a0f] border-gray-700" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Imagem URL</label>
                                <Input required value={formData.image_url || ''} onChange={e => handleChange('image_url', e.target.value)} className="bg-[#0a0a0f] border-gray-700" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Conteúdo</label>
                                <Textarea required value={formData.content || ''} onChange={e => handleChange('content', e.target.value)} className="bg-[#0a0a0f] border-gray-700 min-h-[200px]" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published || false}
                                    onChange={e => handleChange('published', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0f]"
                                />
                                <label htmlFor="published" className="text-sm text-gray-300">Publicar imediatamente</label>
                            </div>
                        </>
                    )}

                    {/* --- TESTIMONIAL FIELDS --- */}
                    {type === 'testimonial' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Nome do Cliente</label>
                                    <Input required value={formData.client_name || ''} onChange={e => handleChange('client_name', e.target.value)} className="bg-[#0a0a0f] border-gray-700" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Cargo / Empresa</label>
                                    <Input required value={formData.role || ''} onChange={e => handleChange('role', e.target.value)} className="bg-[#0a0a0f] border-gray-700" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Foto URL (Avatar)</label>
                                <Input value={formData.avatar_url || ''} onChange={e => handleChange('avatar_url', e.target.value)} className="bg-[#0a0a0f] border-gray-700" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Depoimento</label>
                                <Textarea required value={formData.content || ''} onChange={e => handleChange('content', e.target.value)} className="bg-[#0a0a0f] border-gray-700 min-h-[100px]" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="approved"
                                    checked={formData.approved || false}
                                    onChange={e => handleChange('approved', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0f]"
                                />
                                <label htmlFor="approved" className="text-sm text-gray-300">Aprovado (Visível no site)</label>
                            </div>
                        </>
                    )}

                    <div className="border-t border-gray-800 -mx-6 -mb-6 mt-6 p-6 flex justify-end gap-4 bg-[#111827]">
                        <Button variant="ghost" type="button" onClick={onClose} className="text-gray-400">Cancelar</Button>
                        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                            {loading ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
