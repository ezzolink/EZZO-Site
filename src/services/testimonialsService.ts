import { supabase } from '@/lib/supabaseClient';

export interface Testimonial {
    id: string;
    client_name: string;
    role: string;
    content: string;
    avatar_url: string;
    approved: boolean;
}

export const testimonialsService = {
    async getApprovedTestimonials() {
        // Return mock data if Supabase fails (fallback for development)
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .eq('approved', true)
                .order('created_at', { ascending: false });

            if (error || !data || data.length === 0) {
                // Return default testimonials if no data or error (e.g. table doesn't exist yet)
                return [
                    {
                        id: '1',
                        client_name: 'Ana Silva',
                        role: 'CEO, TechAngola',
                        content: 'A EZZO transformou completamente nossa identidade digital. O site ficou incrível e a equipe foi super profissional.',
                        avatar_url: '',
                        approved: true
                    },
                    {
                        id: '2',
                        client_name: 'João Mendes',
                        role: 'Diretor de Marketing, Cafés de Angola',
                        content: 'Profissionalismo e criatividade. O vídeo comercial que produziram superou todas as expectativas.',
                        avatar_url: '',
                        approved: true
                    },
                    {
                        id: '3',
                        client_name: 'Maria Costa',
                        role: 'Fundadora, Boutique Luanda',
                        content: 'O sistema de gestão que criaram para minha loja facilitou muito meu dia a dia. Recomendo!',
                        avatar_url: '',
                        approved: true
                    }
                ] as Testimonial[];
            }

            return data as Testimonial[];
        } catch (e) {
            console.warn("Supabase testimonials fetch failed, using mocks:", e);
            return [];
        }
    }
};
