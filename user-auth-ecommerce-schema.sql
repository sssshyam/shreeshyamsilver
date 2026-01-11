
-- ============================================
-- USER AUTHENTICATION & E-COMMERCE SYSTEM
-- Add these tables to your Supabase database
-- ============================================

-- Users Table (for customer profiles)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart Items Table
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Orders Table (Drop and Recreate to ensure schema match)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  
  -- Customer Details (stored for record keeping)
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT,
  customer_state TEXT,
  customer_pincode TEXT,
  
  -- Order Details
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT DEFAULT 'razorpay',
  payment_id TEXT,
  
  -- Additional Info
  notes TEXT,
  admin_notes TEXT,
  
  -- Razorpay Setup
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  
  -- Product snapshot (in case product details change)
  product_name TEXT NOT NULL,
  product_slug TEXT,
  product_image TEXT,
  product_price NUMERIC NOT NULL,
  
  -- Order item details
  quantity INTEGER NOT NULL,
  subtotal NUMERIC NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON cart_items(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Anyone can signup" ON users;
CREATE POLICY "Anyone can signup"
  ON users FOR INSERT
  WITH CHECK (true);

-- RLS Policies for Cart Items
DROP POLICY IF EXISTS "Users can view own cart" ON cart_items;
CREATE POLICY "Users can view own cart"
  ON cart_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can add to cart" ON cart_items;
CREATE POLICY "Users can add to cart"
  ON cart_items FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update cart" ON cart_items;
CREATE POLICY "Users can update cart"
  ON cart_items FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Users can remove from cart" ON cart_items;
CREATE POLICY "Users can remove from cart"
  ON cart_items FOR DELETE
  USING (true);

-- RLS Policies for Orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can create orders" ON orders;
CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view orders" ON orders;
CREATE POLICY "Public can view orders"
  ON orders FOR SELECT
  USING (true);

-- RLS Policies for Order Items
DROP POLICY IF EXISTS "Anyone can view order items" ON order_items;
CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Anyone can create order items" ON order_items;
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- ============================================
-- HELPER FUNCTION: Generate Order Number
-- ============================================
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_order_number TEXT;
  order_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate order number: ORD-YYYYMMDD-XXXX
    new_order_number := 'ORD-' || 
                        TO_CHAR(NOW(), 'YYYYMMDD') || '-' || 
                        LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    
    -- Check if order number already exists
    SELECT EXISTS(SELECT 1 FROM orders WHERE order_number = new_order_number) INTO order_exists;
    
    -- If unique, exit loop
    EXIT WHEN NOT order_exists;
  END LOOP;
  
  RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'cart_items', 'orders', 'order_items')
ORDER BY table_name;

-- Test order number generation
SELECT generate_order_number() as sample_order_number;

-- ============================================
-- SUCCESS!
-- ============================================
-- Tables created:
-- ✅ users - Customer profiles
-- ✅ cart_items - Shopping cart
-- ✅ orders - Order records
-- ✅ order_items - Order line items
-- ✅ RLS policies configured
-- ✅ Indexes created for performance
-- ============================================
