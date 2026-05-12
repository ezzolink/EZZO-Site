import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioService, Project } from '@/services/portfolioService';
import { Loader2, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Portfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<string>('Todos');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await portfolioService.getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to load portfolio:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const categories = ['Todos', 'Web', 'Design', 'Audiovisual', 'Marketing'];

    const filteredProjects = filter === 'Todos'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4"
                >
                    Nosso Portfólio
                </motion.h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Conheça os projetos que transformaram a presença digital dos nossos clientes.
                </p>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto mb-10 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-[#111827] text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20 bg-[#111827] rounded-2xl border border-gray-800">
                        <Filter className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Nenhum projeto encontrado</h3>
                        <p className="text-gray-400">Ainda não adicionamos projetos nesta categoria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-[#111827] rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                            >
                                {/* Image Overlay */}
                                <div className="aspect-video relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-60 z-10" />
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative z-20">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                        {project.description}
                                    </p>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            Ver Projeto <ExternalLink className="w-4 h-4 ml-1" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
