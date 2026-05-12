import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Generate stable particle data once
function useParticles(count: number) {
    return useMemo(() =>
        Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5,
            moveY: Math.random() * -100,
        })),
    [count]);
}

export default function NotFound() {
    const particles = useParticles(20);

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 blur-[100px] rounded-full" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 select-none">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Oops! Página não encontrada
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Parece que você se perdeu no espaço digital. A página que você está procurando não existe ou foi movida.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        <Link to="/">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[200px] h-12 text-lg">
                                <Home className="w-5 h-5 mr-2" />
                                Voltar ao Início
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[200px] h-12 text-lg"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Página Anterior
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Floating Particles */}
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    initial={{
                        x: p.x,
                        y: p.y,
                    }}
                    animate={{
                        y: [p.y, p.y + p.moveY],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
}
