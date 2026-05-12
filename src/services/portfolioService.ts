import { supabase } from '@/lib/supabaseClient';

export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string;
    category: 'Web' | 'Design' | 'Audiovisual' | 'Marketing';
    link?: string;
    created_at: string;
}

export const portfolioService = {
    async getAllProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }

        return data as Project[];
    },

    async getProjectsByCategory(category: string) {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects by category:', error);
            throw error;
        }

        return data as Project[];
    }
};
