import React from 'react';
import { motion } from 'framer-motion';

const partners = [
    {
        name: "AfriCharm",
        logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1761921263/logo_2_nuhnwn.png"
    },
    {
        name: "Keimadura",
        logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1761921369/Logo_Keimadura_2_kwco73.png"
    },
    {
        name: "ITAQ",
        logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1765295544/Logo_ITAQ_x0mzv0.png"
    },
    {
        name: "TEKATECH",
        logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1765295544/TEKATECH_0_vsygjz.png"
    },
    {
        name: "EGEPT EMERGENCY",
        logo: "https://res.cloudinary.com/djhn3zwkw/image/upload/v1765295856/Design_sem_nome_2_-Photoroom_ix84cy.png"
    }];


export default function PartnersSection() {
    return (
        <section className="bg-[#0a0a0f] py-5 sm:py-20 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} className="text-white mb-8 text-sm font-semibold text-center opacity-100 sm:text-xl sm:mb-12">Parceiros e Clientes que Confiam na EZZO



                </motion.h3>

                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
                    {partners.map((partner, index) =>
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">

                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-8 sm:h-10 md:h-12 w-auto object-contain" />

                        </motion.div>
                    )}
                </div>
            </div>
        </section>);

}