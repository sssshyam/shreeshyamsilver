-- CRITICAL FIXES FOR ADMIN PANEL
-- 1. Ensure Columns Exist: Re-running this to be absolutely sure columns are there
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS highlights text[],
ADD COLUMN IF NOT EXISTS note text,
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS in_stock boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS hallmark boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS use_case text DEFAULT 'All';

-- 2. DISABLE ROW LEVEL SECURITY (RLS) FOR PRODUCTS
-- This is necessary because your Custom Admin System (AdminContext.tsx) does not 
-- authenticate with Supabase Auth (it uses a simple frontend check).
-- Therefore, Supabase sees all your requests as "Anonymous".
-- If RLS is ON, Anonymous users cannot INSERT or UPDATE.
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- 3. (Alternative) If you cannot disable RLS, create a policy to allow anon updates (less secure, but fixes the issue)
-- DROP POLICY IF EXISTS "Anon All Access" ON products;
-- CREATE POLICY "Anon All Access" ON products FOR ALL USING (true) WITH CHECK (true);

-- 4. Fix Storage Permissions (for Image Uploads)
-- Ensure 'product-images' bucket is public and writable
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public access to storage (disable RLS on storage.objects)
-- OR create a policy
CREATE POLICY "Public Access" ON storage.objects FOR ALL USING ( bucket_id = 'product-images' );
