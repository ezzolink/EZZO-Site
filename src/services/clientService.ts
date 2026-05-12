import { supabase } from '@/lib/supabaseClient';

export interface ClientFile {
    name: string;
    url: string;
}

export interface ClientProject {
    id: string;
    client_email: string;
    project_name: string;
    status: 'Em Análise' | 'Em Desenvolvimento' | 'Aguardando Aprovação' | 'Concluído';
    progress: number;
    files: ClientFile[];
    updated_at: string;
}

export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    company_name: string;
    phone: string;
    avatar_url: string;
    role: 'client' | 'admin';
}

export interface ServiceRequest {
    id: string;
    client_email: string;
    client_name?: string;
    service_type: string;
    description: string;
    status: 'Pendente' | 'Aprovado' | 'Em Desenvolvimento' | 'Concluído' | 'Cancelado';
    price?: number;
    payment_status: 'Pendente' | 'Pago' | 'Parcial';
    admin_notes?: string;
    created_at: string;
    updated_at: string;
}

export const clientService = {
    // --- PROJECTS ---
    async getMyProjects() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !user.email) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('client_projects')
            .select('*')
            .eq('client_email', user.email)
            .order('updated_at', { ascending: false });

        if (error) {
            console.error('Error fetching client projects:', error);
            throw error;
        }
        return data as ClientProject[];
    },

    // --- PROFILES ---
    async getProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // Try getting profile
        let { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        // If not found (maybe trigger failed or old user), try to create one or return basic info
        if (error || !data) {
            return {
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || '',
                role: 'client'
            } as UserProfile;
        }

        return data as UserProfile;
    },

    async updateProfile(updates: Partial<UserProfile>) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id);

        if (error) throw error;
    },

    async uploadAvatar(file: File) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        return publicUrl;
    },

    // --- ORDERS (SERVICE REQUESTS) ---
    async createServiceRequest(request: { service_type: string, description: string }) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !user.email) throw new Error("User not authenticated");

        const payload = {
            client_email: user.email,
            client_name: user.user_metadata?.full_name || user.email.split('@')[0],
            ...request
        };

        const { data, error } = await supabase
            .from('service_requests')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async getMyRequests() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !user.email) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('service_requests')
            .select('*')
            .eq('client_email', user.email)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as ServiceRequest[];
    }
};
