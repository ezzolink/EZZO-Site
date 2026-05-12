import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogService, BlogPost } from '@/services/blogService';
import { Loader2, Calendar, User, ArrowRight, Rss } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await blogService.getAllPublishedPosts();
            setPosts(data);
        } catch (error) {
            console.error("Failed to load blog posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center justify-center p-2 bg-blue-600/10 rounded-full mb-4"
                >
                    <Rss className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-blue-400 text-sm font-medium">EZZO News</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6"
                >
                    Blog de Inovação
                </motion.h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Insights sobre tecnologia, design, marketing e o futuro digital em Angola e no mundo.
                </p>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 bg-[#111827] rounded-3xl border border-gray-800">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Rss className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Em Breve</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Nossos redatores estão preparando conteúdos incríveis para você. Volte em breve!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-[#111827] rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full"
                            >
                                {/* Image */}
                                <div className="aspect-[16/9] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-60 z-10" />
                                    {post.image_url ? (
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                            <Rss className="w-12 h-12 text-gray-700" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow relative z-20">
                                    <div className="flex items-center text-xs text-gray-400 mb-4 space-x-4">
                                        <div className="flex items-center">
                                            <Calendar className="w-3 h-3 mr-1 text-blue-500" />
                                            {new Date(post.created_at).toLocaleDateString('pt-AO')}
                                        </div>
                                        <div className="flex items-center">
                                            <User className="w-3 h-3 mr-1 text-purple-500" />
                                            {post.author_name}
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors mt-auto"
                                    >
                                        Ler Artigo Completo <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
