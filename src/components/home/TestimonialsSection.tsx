import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsService, Testimonial } from '@/services/testimonialsService';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        const data = await testimonialsService.getApprovedTestimonials();
        setTestimonials(data);
        setIsLoading(false);
    };

    // Auto-play carousel
    useEffect(() => {
        if (!isPaused && testimonials.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000); // Muda a cada 5 segundos

            return () => clearInterval(interval);
        }
    }, [isPaused, testimonials.length]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (isLoading || testimonials.length === 0) return null;

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section
            className="py-20 bg-[#0a0a0f] relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6"
                    >
                        O Que Dizem Nossos Clientes
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        Experiências reais de quem confia no nosso trabalho
                    </motion.p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="bg-[#111827] p-8 sm:p-12 rounded-2xl border-2 border-gray-800/50 relative group hover:border-[#210269ff] hover:shadow-[0_0_30px_rgba(33,2,105,0.3)] transition-all duration-500"
                        >
                            <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-700 group-hover:text-[#210269ff]/40 transition-colors duration-500" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed italic">
                                "{currentTestimonial.content}"
                            </p>

                            <div className="flex items-center">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                                    {currentTestimonial.avatar_url ? (
                                        <img src={currentTestimonial.avatar_url} alt={currentTestimonial.client_name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        currentTestimonial.client_name.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">{currentTestimonial.client_name}</h4>
                                    <p className="text-sm text-gray-500">{currentTestimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'w-8 bg-gradient-to-r from-blue-400 to-cyan-400'
                                        : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                aria-label={`Ir para depoimento ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
