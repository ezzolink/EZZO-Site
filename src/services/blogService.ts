import { supabase } from '@/lib/supabaseClient';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    published: boolean;
    author_name: string;
    likes_count: number;
    views_count?: number;
    created_at: string;
}

export interface Comment {
    id: string;
    post_id: string;
    parent_id: string | null;
    user_name: string;
    content: string;
    created_at: string;
    replies?: Comment[]; // Para aninhar no frontend
}

export const blogService = {
    async getAllPublishedPosts() {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as BlogPost[];
    },

    async getPostBySlug(slug: string) {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data as BlogPost;
    },

    // --- CURTIDAS ---
    async likePost(postId: string) {
        // Gera/recupera um ID de sessão único para controlar duplicidade
        let sessionId = localStorage.getItem('ezzo_session_id');
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            localStorage.setItem('ezzo_session_id', sessionId);
        }
        await supabase.from('blog_likes').insert({ post_id: postId, session_id: sessionId });

        // Incrementa o contador via RPC (Seguro e Atômico)
        const { error } = await supabase.rpc('increment_post_likes', { post_id: postId });
        if (error) console.error("Error incrementing likes:", error);
    },

    async incrementViews(postId: string) {
        // Incrementa visualizações via RPC (Seguro e Atômico)
        const { error } = await supabase.rpc('increment_post_views', { post_id: postId });
        if (error) console.error("Error incrementing views:", error);
    },

    // --- COMENTÁRIOS ---
    async getComments(postId: string) {
        const { data, error } = await supabase
            .from('blog_comments')
            .select('*')
            .eq('post_id', postId)
            .order('created_at', { ascending: true }); // Mais antigos primeiro

        if (error) throw error;
        return data as Comment[];
    },

    async addComment(postId: string, userName: string, content: string, parentId: string | null = null) {
        const { data, error } = await supabase
            .from('blog_comments')
            .insert({
                post_id: postId,
                user_name: userName,
                content: content,
                parent_id: parentId
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
