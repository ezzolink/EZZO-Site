import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import AppsSection from '@/components/home/AppsSection';
import PartnersSection from '@/components/home/PartnersSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import AchievementsSection from '@/components/home/AchievementsSection';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <TestimonialsSection />
            <AchievementsSection />
            <AboutSection />
            <AppsSection />
            <PartnersSection />
            <CTASection />
        </div>
    );
}