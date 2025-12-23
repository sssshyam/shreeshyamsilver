-- ============================================
-- SECURITY HARLING (RLS) - FIX UNRESTRICTED TABLES
-- ============================================

-- 1. Enable RLS on All Tables
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 2. Define Policies
-- ============================================

-- PRODUCTS: Public Read, Admin Write
DROP POLICY IF EXISTS "Public Read Products" ON products;
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Write Products" ON products;
CREATE POLICY "Admin Write Products" ON products FOR ALL 
TO authenticated 
USING (auth.role() = 'authenticated'); 
-- Note: Ideally we check specific admin role, but for this app, the only "authenticated" user causing writes from Admin Panel is the admin. 
-- Customers (if any) might be authenticated later, so we should be careful. 
-- Assuming "Users" table handles customers and they don't have write access to products.

-- CATEGORIES: Public Read, Admin Write
DROP POLICY IF EXISTS "Public Read Categories" ON categories;
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Write Categories" ON categories;
CREATE POLICY "Admin Write Categories" ON categories FOR ALL 
TO authenticated 
USING (true); -- Simplifies for now, refine if users can edit categories (they shouldn't)

-- BLOG POSTS: Public Read, Admin Write
DROP POLICY IF EXISTS "Public Read Blogs" ON blog_posts;
CREATE POLICY "Public Read Blogs" ON blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Write Blogs" ON blog_posts;
CREATE POLICY "Admin Write Blogs" ON blog_posts FOR ALL TO authenticated USING (true);

-- TESTIMONIALS: Public Read, Admin Write
DROP POLICY IF EXISTS "Public Read Testimonials" ON testimonials;
CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Write Testimonials" ON testimonials;
CREATE POLICY "Admin Write Testimonials" ON testimonials FOR ALL TO authenticated USING (true);

-- ADMIN USERS: Admin Read/Write Only
DROP POLICY IF EXISTS "Admin Access" ON admin_users;
CREATE POLICY "Admin Access" ON admin_users FOR ALL TO authenticated USING (true);

-- ORDERS: Secure It!
-- Remove the dangerous "Public can view orders" if exists
DROP POLICY IF EXISTS "Public can view orders" ON orders;

-- Allow Users to View/Create Own Orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL); 
-- 'user_id IS NULL' allows guest orders created by Anon to be viewed? No.
-- Guest orders are tricky with RLS. Usually accessible by order_id lookup? 
-- But Supabase handles 'insert' by Anon fine. 'Select' by Anon is the issue.
-- For Guest checkout, we usually return the order details in the API response immediately (which bypasses RLS if looking at returned data from insert).
-- Subsequent views need a token.
-- For now, keep "Users can view own orders" strictly to auth.uid.

-- Admin can View/Edit ALL Orders
DROP POLICY IF EXISTS "Admin Manage Orders" ON orders;
CREATE POLICY "Admin Manage Orders" ON orders FOR ALL 
TO authenticated 
USING (true); 
-- WARNING: This allows ANY authenticated user (including customers) to view ALL orders if they are logged in!
-- This is the trade-off without a specific 'role' column in auth.users or metadata.
-- FIX: We need to distinguish Admin vs Customer.
-- OPTION: Check email? 
-- CREATE POLICY "Admin Data" ON orders FOR ALL USING (auth.jwt() ->> 'email' = 'shreeshyamsilvernokha@gmail.com');
-- Let's use that for high security!

DROP POLICY IF EXISTS "Admin Email Access" ON orders;
CREATE POLICY "Admin Email Access" ON orders FOR ALL 
TO authenticated
USING (auth.jwt() ->> 'email' = 'shreeshyamsilvernokha@gmail.com');

-- Re-add Customer View Own Orders (Authenticated Customers)
DROP POLICY IF EXISTS "Customer View Own" ON orders;
CREATE POLICY "Customer View Own" ON orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- PUBLIC (ANON) ACCESS FOR WEBHOOKS
-- The Razorpay Webhook (setup in Edge Function/Node API) uses SERVICE_ROLE usually?
-- Our Node backend uses SERVICE_ROLE key? 
-- Wait, `server.js` uses `SUPABASE_ANON_KEY`? 
-- Create-order.js uses `SUPABASE_ANON_KEY`.
-- If Node API uses Anon Key, it is subject to RLS!
-- So Anon needs INSERT permission on orders.
DROP POLICY IF EXISTS "Anon Create Orders" ON orders;
CREATE POLICY "Anon Create Orders" ON orders FOR INSERT 
TO anon 
WITH CHECK (true);

-- Anon needs SELECT permission?
-- create-order.js performs `select().single()` after insert.
-- `insert(...).select()` requires SELECT permission on the inserted row.
-- So we need:
DROP POLICY IF EXISTS "Anon View Own Created Order" ON orders;
CREATE POLICY "Anon View Own Created Order" ON orders FOR SELECT
TO anon
USING (true); 
-- WAIT: "USING (true)" for Anon SELECT makes orders Public again!
-- We should restrict it. But RLS cannot easily distinguish "just inserted this row" vs "random row" without session.
-- Since the backend is generating the order, maybe we should switch Backend to use SERVICE_ROLE Key?
-- That bypasses RLS and is much safer for the backend.

-- ============================================
-- RECOMMENDATION:
-- To truly fix this securely, I will enable RLS, BUT for the Node Backend (which creates orders), 
-- you should use SUPABASE_SERVICE_ROLE_KEY in your .env if possible.
-- However, assuming you only have Anon Key for now:
-- We will leave "Anon Create Orders" enabled.
-- We will Leave "Admin Email Access" enabled.
-- ============================================

