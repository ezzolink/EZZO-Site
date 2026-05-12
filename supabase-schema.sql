-- =============================================================
-- EZZO Digital — Supabase Schema Completo
-- Project: EZZO Site (Vite + React SPA)
-- Generated: 2026-05-12
-- Execute tudo no SQL Editor do Supabase Dashboard
-- =============================================================

-- 1. DROP ALL EXISTING TABLES (reverse order of dependencies)
-- =============================================================
DROP TABLE IF EXISTS blog_likes CASCADE;
DROP TABLE IF EXISTS blog_comments CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS client_projects CASCADE;
DROP TABLE IF EXISTS service_requests CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. DROP EXISTING RPC FUNCTIONS
-- =============================================================
DROP FUNCTION IF EXISTS increment_post_likes;
DROP FUNCTION IF EXISTS increment_post_views;

-- =============================================================
-- 3. CREATE TABLES
-- =============================================================

-- 3.1 Profiles (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3.2 Projects (portfolio)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT NOT NULL CHECK (category IN ('Web', 'Design', 'Audiovisual', 'Marketing')),
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3.3 Posts (blog)
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    author TEXT DEFAULT 'EZZO Digital',
    cover_image TEXT,
    published BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 3.4 Blog Comments
CREATE TABLE blog_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- 3.5 Blog Likes
CREATE TABLE blog_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (post_id, session_id)
);

ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- 3.6 Testimonials
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- 3.7 Service Requests
CREATE TABLE service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    service_type TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Em Andamento', 'Concluído', 'Cancelado')),
    payment_status TEXT DEFAULT 'Pendente' CHECK (payment_status IN ('Pendente', 'Pago')),
    amount NUMERIC(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- 3.8 Contacts
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 3.9 Cart Items
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    service_id TEXT NOT NULL,
    service_name TEXT NOT NULL,
    service_price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_cart_items_session ON cart_items(session_id);

-- 3.10 Client Projects
CREATE TABLE client_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Em Desenvolvimento', 'Concluído', 'Cancelado')),
    files JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;

-- =============================================================
-- 4. RPC FUNCTIONS
-- =============================================================

-- 4.1 Increment post likes
CREATE OR REPLACE FUNCTION increment_post_likes(post_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_count INTEGER;
BEGIN
    UPDATE posts
    SET likes = likes + 1
    WHERE id = post_id
    RETURNING likes INTO new_count;

    RETURN new_count;
END;
$$;

-- 4.2 Increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_count INTEGER;
BEGIN
    UPDATE posts
    SET views = views + 1
    WHERE id = post_id
    RETURNING views INTO new_count;

    RETURN new_count;
END;
$$;

-- =============================================================
-- 5. ROW LEVEL SECURITY POLICIES
-- =============================================================

-- 5.1 Profiles
CREATE POLICY "Profiles are publicly viewable"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- 5.2 Projects (public read, admin write)
CREATE POLICY "Projects are publicly viewable"
    ON projects FOR SELECT
    USING (true);

CREATE POLICY "Admin can manage projects"
    ON projects FOR ALL
    USING (auth.email() = 'ezzo.link@gmail.com');

-- 5.3 Posts (public read published, admin write)
CREATE POLICY "Published posts are publicly viewable"
    ON posts FOR SELECT
    USING (published = true OR auth.email() = 'ezzo.link@gmail.com');

CREATE POLICY "Admin can manage posts"
    ON posts FOR ALL
    USING (auth.email() = 'ezzo.link@gmail.com');

-- 5.4 Blog Comments (public read, public insert)
CREATE POLICY "Comments are publicly viewable"
    ON blog_comments FOR SELECT
    USING (true);

CREATE POLICY "Anyone can insert comments"
    ON blog_comments FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin can delete comments"
    ON blog_comments FOR DELETE
    USING (auth.email() = 'ezzo.link@gmail.com');

-- 5.5 Blog Likes (public read, public insert)
CREATE POLICY "Likes are publicly viewable"
    ON blog_likes FOR SELECT
    USING (true);

CREATE POLICY "Anyone can insert likes"
    ON blog_likes FOR INSERT
    WITH CHECK (true);

-- 5.6 Testimonials (public read approved, admin write)
CREATE POLICY "Approved testimonials are publicly viewable"
    ON testimonials FOR SELECT
    USING (approved = true OR auth.email() = 'ezzo.link@gmail.com');

CREATE POLICY "Admin can manage testimonials"
    ON testimonials FOR ALL
    USING (auth.email() = 'ezzo.link@gmail.com');

-- 5.7 Service Requests (authenticated users insert/read own, admin read all)
CREATE POLICY "Users can insert service requests"
    ON service_requests FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view own requests"
    ON service_requests FOR SELECT
    USING (client_email = auth.email() OR auth.email() = 'ezzo.link@gmail.com');

CREATE POLICY "Admin can update service requests"
    ON service_requests FOR UPDATE
    USING (auth.email() = 'ezzo.link@gmail.com');

-- 5.8 Contacts (public insert, admin read)
CREATE POLICY "Anyone can submit contact"
    ON contacts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin can view contacts"
    ON contacts FOR SELECT
    USING (auth.email() = 'ezzo.link@gmail.com');

CREATE POLICY "Admin can update contacts"
    ON contacts FOR UPDATE
    USING (auth.email() = 'ezzo.link@gmail.com');

-- 5.9 Cart Items (public based on session_id)
CREATE POLICY "Cart items are viewable by session"
    ON cart_items FOR SELECT
    USING (true);

CREATE POLICY "Anyone can insert cart items"
    ON cart_items FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Anyone can delete their cart items"
    ON cart_items FOR DELETE
    USING (true);

-- 5.10 Client Projects (owner read, admin all)
CREATE POLICY "Clients can view own projects"
    ON client_projects FOR SELECT
    USING (auth.uid() = client_id OR auth.email() = 'ezzo.link@gmail.com');

CREATE POLICY "Admin can manage client projects"
    ON client_projects FOR ALL
    USING (auth.email() = 'ezzo.link@gmail.com');

CREATE POLICY "Clients can insert own projects"
    ON client_projects FOR INSERT
    WITH CHECK (auth.uid() = client_id);

-- =============================================================
-- 6. STORAGE BUCKETS
-- =============================================================

-- Create avatars bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: public read, authenticated upload/delete
CREATE POLICY "Avatars are publicly viewable"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can update own avatar"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own avatar"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- =============================================================
-- 7. AUTO-CREATE PROFILE ON SIGNUP
-- =============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- =============================================================
-- 8. SAMPLE DATA (opcional — descomentar se quiser)
-- =============================================================

-- INSERT INTO projects (title, description, category) VALUES
--     ('EZZO Digital', 'Website corporativo da EZZO Digital', 'Web'),
--     ('AfriCharm', 'Plataforma de e-commerce', 'Web');

-- INSERT INTO testimonials (client_name, content, approved) VALUES
--     ('Lex Elion', 'A EZZO Digital transformou a nossa presença online!', true);
