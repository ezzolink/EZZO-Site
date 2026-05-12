import { supabase } from '@/lib/supabaseClient';
import { Project } from './portfolioService';
import { BlogPost } from './blogService';
import { Testimonial } from './testimonialsService';
import { ServiceRequest } from './clientService';

export const adminService = {
    // --- PROJECTS (PORTFOLIO) ---
    async createProject(project: Omit<Project, 'id' | 'created_at'>) {
        const { data, error } = await supabase.from('projects').insert(project).select();
        if (error) throw error;
        return data[0];
    },

    async updateProject(id: string, updates: Partial<Project>) {
        const { error } = await supabase.from('projects').update(updates).eq('id', id);
        if (error) throw error;
    },

    async deleteProject(id: string) {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
    },

    // --- POSTS (BLOG) ---
    async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'slug'> & { slug: string }) {
        const { data, error } = await supabase.from('posts').insert(post).select();
        if (error) throw error;
        return data[0];
    },

    async updatePost(id: string, updates: Partial<BlogPost>) {
        const { error } = await supabase.from('posts').update(updates).eq('id', id);
        if (error) throw error;
    },

    async deletePost(id: string) {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw error;
    },

    // --- TESTIMONIALS ---
    async approveTestimonial(id: string) {
        const { error } = await supabase.from('testimonials').update({ approved: true }).eq('id', id);
        if (error) throw error;
    },

    async getAllTestimonials() {
        const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as Testimonial[];
    },

    async deleteTestimonial(id: string) {
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) throw error;
    },

    async createTestimonial(testimonial: Omit<Testimonial, 'id'>) {
        const { data, error } = await supabase.from('testimonials').insert(testimonial).select();
        if (error) throw error;
        return data[0];
    },

    async updateTestimonial(id: string, updates: Partial<Testimonial>) {
        const { error } = await supabase.from('testimonials').update(updates).eq('id', id);
        if (error) throw error;
    },

    // --- ORDERS (SERVICE REQUESTS) ---
    async getAllServiceRequests() {
        const { data, error } = await supabase
            .from('service_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as ServiceRequest[];
    },

    async updateServiceRequest(id: string, updates: Partial<ServiceRequest>) {
        const { error } = await supabase
            .from('service_requests')
            .update(updates)
            .eq('id', id);

        if (error) throw error;
    },

    async deleteServiceRequest(id: string) {
        const { error } = await supabase.from('service_requests').delete().eq('id', id);
        if (error) throw error;
    },

    // --- PROFILES (CLIENTS) ---
    async getAllProfiles() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as import('./clientService').UserProfile[];
    },

    // --- ANALYTICS (BASIC) ---
    async getDashboardStats() {
        // Parallel fetching
        const [projects, posts, testimonials, orders, profiles] = await Promise.all([
            supabase.from('projects').select('id', { count: 'exact' }),
            supabase.from('posts').select('id', { count: 'exact' }),
            supabase.from('testimonials').select('id', { count: 'exact' }),
            supabase.from('service_requests').select('*, price'),
            supabase.from('profiles').select('id', { count: 'exact' })
        ]);

        const totalRevenue = orders.data?.reduce((acc: number, curr: any) => {
            if (curr.payment_status === 'Pago' && curr.price) {
                return acc + Number(curr.price);
            }
            return acc;
        }, 0) || 0;

        return {
            totalProjects: projects.count || 0,
            totalPosts: posts.count || 0,
            totalTestimonials: testimonials.count || 0,
            totalOrders: orders.count || 0,
            totalClients: profiles.count || 0,
            totalRevenue
        };
    }
};
