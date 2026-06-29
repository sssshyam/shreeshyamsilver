-- ============================================
-- SECURITY HOTFIX: FIX RLS FOR INSERT OPERATIONS
-- ============================================
-- PostgreSQL requires the `WITH CHECK` clause for INSERT and UPDATE operations 
-- when using Row Level Security. Using `FOR ALL ... USING (true)` only covers 
-- SELECT, UPDATE, and DELETE. INSERT needs `WITH CHECK`.
-- 
-- Run this script in the Supabase SQL Editor to fix the "new row violates 
-- row-level security policy" error.
-- ============================================

-- 1. PRODUCTS TABLE
DROP POLICY IF EXISTS "Admin Write Products" ON products;
CREATE POLICY "Admin Insert Products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Products" ON products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Delete Products" ON products FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin Select Products" ON products FOR SELECT TO authenticated USING (true);

-- 2. CATEGORIES TABLE
DROP POLICY IF EXISTS "Admin Write Categories" ON categories;
CREATE POLICY "Admin Insert Categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Categories" ON categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Delete Categories" ON categories FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin Select Categories" ON categories FOR SELECT TO authenticated USING (true);

-- 3. BLOG POSTS TABLE
DROP POLICY IF EXISTS "Admin Write Blogs" ON blog_posts;
CREATE POLICY "Admin Insert Blogs" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Blogs" ON blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Delete Blogs" ON blog_posts FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin Select Blogs" ON blog_posts FOR SELECT TO authenticated USING (true);

-- 4. TESTIMONIALS TABLE
DROP POLICY IF EXISTS "Admin Write Testimonials" ON testimonials;
CREATE POLICY "Admin Insert Testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Testimonials" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Delete Testimonials" ON testimonials FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin Select Testimonials" ON testimonials FOR SELECT TO authenticated USING (true);

-- 5. ADMIN USERS TABLE
DROP POLICY IF EXISTS "Admin Access" ON admin_users;
CREATE POLICY "Admin Insert Admin Users" ON admin_users FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Admin Users" ON admin_users FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Delete Admin Users" ON admin_users FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin Select Admin Users" ON admin_users FOR SELECT TO authenticated USING (true);

-- Ensure all tables have RLS enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Note: The previous "Public Read" policies (e.g. for SELECT by unauthenticated users) 
-- remain intact as they were created separately as `FOR SELECT USING (true);`
