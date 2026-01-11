-- ============================================
-- ADMIN TABLES FOR AUTHENTICATION & MANAGEMENT
-- Add these to your existing schema
-- ============================================

-- Admin Users Table
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Insert admin user (password will be hashed in the app)
-- Email: shreeshyamsilvernokha@gmail.com
-- Password: shreeshyamsilver@#$1234
-- Note: This is a placeholder - the actual password hash will be created by the app
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('shreeshyamsilvernokha@gmail.com', '$2a$10$placeholder', 'Admin', 'admin');

-- RLS Policies for Admin Tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Admin users: Only accessible by authenticated admins
CREATE POLICY "Admin users management" ON admin_users
  FOR ALL USING (auth.role() = 'authenticated');

-- Orders: Accessible by authenticated admins
CREATE POLICY "Admin orders management" ON orders
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin order items management" ON order_items
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKET FOR PRODUCT IMAGES
-- Run this in Supabase Dashboard > Storage
-- ============================================

-- Create storage bucket for product images
-- Go to Storage > Create bucket
-- Name: product-images
-- Public: Yes

-- Then create policy:
-- CREATE POLICY "Public Access"
-- ON storage.objects FOR SELECT
-- USING ( bucket_id = 'product-images' );

-- CREATE POLICY "Admin Upload"
-- ON storage.objects FOR INSERT
-- WITH CHECK ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

-- CREATE POLICY "Admin Delete"
-- ON storage.objects FOR DELETE
-- USING ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );
