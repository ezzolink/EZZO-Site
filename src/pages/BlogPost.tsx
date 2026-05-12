import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogService, BlogPost, Comment } from '@/services/blogService';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Calendar, User, ArrowLeft, Share2, Heart, MessageCircle, Send, Reply, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MetaTags from '@/components/seo/MetaTags';

export default function BlogPostDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    // Auth State
    const [session, setSession] = useState<any>(null);

    // Interactions
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    // Comment Form
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
    const [commentLoading, setCommentLoading] = useState(false);

    useEffect(() => {
        // Load Session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        if (slug) loadPost(slug);
    }, [slug]);

    const loadPost = async (slug: string) => {
        try {
            const data = await blogService.getPostBySlug(slug);
            setPost(data);
            setLikes(data.likes_count || 0);

            // Increment Views (Fire and forget, don't await blocking UI)
            blogService.incrementViews(data.id).catch(err => console.error("Error incrementing views:", err));

            // Load Comments
            const commentsData = await blogService.getComments(data.id);
            setComments(commentsData);
        } catch (error) {
            console.error("Failed to load post:", error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async () => {
        if (hasLiked || !post) return;
        setLikes(prev => prev + 1);
        setHasLiked(true);
        await blogService.likePost(post.id);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let finalName = userName.trim();
        if (session) {
            finalName = session.user.user_metadata?.company || session.user.email?.split('@')[0] || "Usuário EZZO";
        } else if (!finalName) {
            finalName = "Anônimo";
        }

        if (!post || !newComment.trim()) return;

        setCommentLoading(true);
        try {
            await blogService.addComment(post.id, finalName, newComment, replyingTo?.id);
            setNewComment('');
            setReplyingTo(null);
            // Reload comments
            const updatedComments = await blogService.getComments(post.id);
            setComments(updatedComments);
        } catch (error) {
            console.error("Failed to comment:", error);
        } finally {
            setCommentLoading(false);
        }
    };

    // Helper to organize comments into threads (simple 1-level nesting for display)
    const rootComments = comments.filter(c => !c.parent_id);
    const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center bg-[#0a0a0f]">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen pt-24 flex flex-col justify-center items-center bg-[#0a0a0f] text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-4">Artigo não encontrado</h2>
                <p className="text-gray-400 mb-8">O artigo que você procura não existe ou foi removido.</p>
                <Link to="/blog">
                    <Button variant="outline">Voltar para o Blog</Button>
                </Link>
            </div>
        );
    }

    // ... (inside component)

    return (
        <article className="min-h-screen bg-[#0a0a0f] pt-24 pb-20">
            {/* Dynamic SEO Tags */}
            <MetaTags
                title={`${post.title} | Blog EZZO`}
                description={post.excerpt || post.content.substring(0, 160)}
                ogImage={post.image_url}
                url={window.location.href}
                keywords={`blog ezzo, ${post.title.toLowerCase().split(' ').join(', ')}, marketing angola, tecnologia luanda`}
            />

            {/* Hero Image */}
            <div className="w-full h-[40vh] sm:h-[50vh] relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] z-10" />
                <img
                    src={post.image_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-32">
                <Link to="/blog" className="inline-flex items-center text-blue-400 hover:text-white mb-8 transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111827] rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-2xl"
                >
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                        <span className="flex items-center bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                            <Calendar className="w-3 h-3 mr-2" />
                            {new Date(post.created_at).toLocaleDateString('pt-AO', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">
                            <User className="w-3 h-3 mr-2" />
                            {post.author_name}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="prose prose-invert prose-base sm:prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white break-words">
                        <div className="leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </div>

                    {/* Interactions Bar */}
                    <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-center">
                        <div className="flex gap-4">
                            <Button
                                onClick={handleLike}
                                variant="outline"
                                className={`border-gray-700 ${hasLiked ? 'text-red-500 bg-red-500/10 border-red-500/30' : 'text-gray-400 hover:text-red-400'}`}
                            >
                                <Heart className={`w-5 h-5 mr-2 ${hasLiked ? 'fill-current' : ''}`} /> {likes} Curtidas
                            </Button>
                            <Button variant="ghost" className="text-gray-400">
                                <MessageCircle className="w-5 h-5 mr-2" /> {comments.length} Comentários
                            </Button>
                            <div className="flex items-center text-gray-500 text-sm ml-2">
                                <Eye className="w-4 h-4 mr-2" /> {post.views_count || 0} Visualizações
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Link copiado!");
                            }}
                            className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
                        >
                            <Share2 className="w-4 h-4 mr-2" /> Compartilhar
                        </Button>
                    </div>
                </motion.div>

                {/* Comments Section */}
                <div className="mt-12 bg-[#111827] rounded-3xl p-6 sm:p-10 border border-gray-800">
                    <h3 className="text-2xl font-bold text-white mb-8">Discussão</h3>

                    {/* Form */}
                    <form onSubmit={handleCommentSubmit} className="mb-10 bg-[#0a0a0f] p-6 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-white font-bold flex items-center">
                                <MessageCircle className="w-4 h-4 mr-2 text-blue-500" /> Deixe seu comentário
                            </h4>
                            {session ? (
                                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                                    Logado como {session.user.email}
                                </span>
                            ) : (
                                <span className="text-xs text-gray-500">Comentando como Visitante</span>
                            )}
                        </div>

                        {replyingTo && (
                            <div className="flex justify-between items-center mb-4 text-sm text-blue-400 bg-blue-900/20 border border-blue-500/20 p-3 rounded-lg">
                                <span className="flex items-center"><Reply className="w-3 h-3 mr-2" /> Respondendo a <strong>{replyingTo.user_name}</strong></span>
                                <button type="button" onClick={() => setReplyingTo(null)} className="hover:text-white p-1 hover:bg-white/10 rounded"><XCircle className="w-4 h-4" /></button>
                            </div>
                        )}

                        <div className="grid gap-4">
                            {!session && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Seu Nome (Opcional - aparecerá como Anônimo)"
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                        className="bg-[#111827] border-gray-700 text-white focus:border-blue-500"
                                    />
                                    <Input
                                        placeholder="Seu Email (Não será publicado)"
                                        type="email"
                                        value={userEmail}
                                        onChange={e => setUserEmail(e.target.value)}
                                        className="bg-[#111827] border-gray-700 text-white focus:border-blue-500"
                                    />
                                </div>
                            )}

                            <Textarea
                                placeholder="Escreva sua opinião..."
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                className="bg-[#111827] border-gray-700 min-h-[120px] text-white focus:border-blue-500"
                                required
                            />

                            <div className="flex justify-end">
                                <Button type="submit" disabled={commentLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                                    {commentLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Send className="w-4 h-4 mr-2" /> Publicar Comentário</>}
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* List */}
                    <div className="space-y-8">
                        {rootComments.map(comment => (
                            <div key={comment.id} className="animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-gray-300 border border-gray-700">
                                        {comment.user_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-[#0a0a0f] p-4 rounded-xl border border-gray-800">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold text-white">{comment.user_name}</span>
                                                <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm">{comment.content}</p>
                                        </div>
                                        <button
                                            onClick={() => setReplyingTo(comment)}
                                            className="text-xs text-blue-400 mt-2 flex items-center hover:text-white transition-colors"
                                        >
                                            <Reply className="w-3 h-3 mr-1" /> Responder
                                        </button>

                                        {/* Replies */}
                                        {getReplies(comment.id).map(reply => (
                                            <div key={reply.id} className="flex gap-4 mt-4 ml-8 border-l-2 border-gray-800 pl-4">
                                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 border border-gray-700">
                                                    {reply.user_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="bg-[#0a0a0f] p-3 rounded-xl border border-gray-800 flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="font-bold text-white text-sm">{reply.user_name}</span>
                                                        <span className="text-xs text-gray-500">{new Date(reply.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <p className="text-gray-300 text-sm">{reply.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {comments.length === 0 && <p className="text-center text-gray-500 italic py-8">Seja o primeiro a comentar!</p>}
                    </div>
                </div>
            </div>
        </article>
    );
}
