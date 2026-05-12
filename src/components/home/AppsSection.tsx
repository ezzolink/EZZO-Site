import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

const apps = [
    {
        name: "AfriCharm",
        logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1761921263/logo_2_nuhnwn.png",
        link: "https://www.africharm.com"
    },
    {
        name: "Keimadura",
        logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1761921369/Logo_Keimadura_2_kwco73.png",
        link: "https://www.keimadura.com"
    },
    {
        name: "TEKATECH Digital",
        logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1765295544/TEKATECH_0_vsygjz.png",
        link: "https://tekatech.digital"
    }
];

export default function AppsSection() {
    return (
        <section className="bg-[#0a0a0f] py-12 sm:py-20">
            <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold sm:text-4xl lg:text-5xl mb-4"
                    >
                        Aplicativos <span className="text-blue-500">EZZO</span>
                    </motion.h2>
                </div>

                {/* Apps Logos */}
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
                    {apps.map((app, index) => (
                        <motion.a
                            key={app.name}
                            href={app.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 group"
                        >
                            <img
                                src={app.logo}
                                alt={app.name}
                                className="h-12 sm:h-16 md:h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to={createPageUrl('Aplicativos')}
                        className="inline-flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-blue-500/30"
                    >
                        Ver todos os aplicativos
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}