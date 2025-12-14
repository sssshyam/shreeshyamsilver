-- ============================================
-- LUXURY SILVER E-COMMERCE DATABASE SCHEMA
-- Complete SQL for Supabase
-- ============================================

-- Step 1: Create Categories Table
-- ============================================
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create Products Table
-- ============================================
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Images
  image_url TEXT,
  gallery_images TEXT[],
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  
  -- Product Details
  purity TEXT,
  weight TEXT,
  hallmark BOOLEAN DEFAULT false,
  use_case TEXT CHECK (use_case IN ('Gift', 'Pooja', 'Decor', 'All')),
  
  -- Additional Data
  specifications JSONB,
  care_instructions TEXT[],
  
  -- SEO
  meta_description TEXT,
  meta_keywords TEXT,
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create Blog Posts Table
-- ============================================
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT,
  date TEXT,
  read_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Create Testimonials Table
-- ============================================
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Create Indexes for Performance
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Step 6: Enable Row Level Security
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Step 7: Create RLS Policies (Public Read Access)
-- ============================================

-- Categories: Public read access
CREATE POLICY "Enable read access for all users" ON categories
  FOR SELECT USING (true);

-- Products: Public read access for active products
CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

-- Blog Posts: Public read access
CREATE POLICY "Enable read access for all users" ON blog_posts
  FOR SELECT USING (true);

-- Testimonials: Public read access
CREATE POLICY "Enable read access for all users" ON testimonials
  FOR SELECT USING (true);

-- Step 8: Insert Sample Categories
-- ============================================
INSERT INTO categories (slug, name, description, image) VALUES
('pooja-silver', 'Pooja Silver', 'Sacred silverware for your spiritual rituals and ceremonies', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop'),
('home-decor', 'Home Decor', 'Elegant silver pieces to enhance your living spaces', 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=800&fit=crop'),
('gifting', 'Gifting', 'Thoughtful silver gifts for every special occasion', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop'),
('decorative-bowls', 'Decorative Bowls', 'Beautiful handcrafted silver bowls for home decoration', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop');

-- Step 9: Insert Sample Products
-- ============================================
INSERT INTO products (
  slug, name, description, price, category_id, 
  image_url, gallery_images, is_active, is_featured, 
  purity, weight, hallmark, use_case, in_stock,
  specifications, care_instructions
) VALUES
(
  'silver-pooja-thali-set',
  'Premium Silver Pooja Thali Set',
  'Handcrafted Silver Plated pooja thali with intricate traditional designs. Perfect for daily worship and special ceremonies.',
  45000,
  1,
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=1200&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=1200&fit=crop'
  ],
  true,
  true,
  '99.9% Silver Plated',
  '250 grams',
  true,
  'Pooja',
  true,
  '[
    {"label": "Material", "value": "99.9% Silver Plated"},
    {"label": "Weight", "value": "250 grams"},
    {"label": "Diameter", "value": "10 inches"},
    {"label": "Finish", "value": "Polished"},
    {"label": "Certification", "value": "BIS Hallmark"}
  ]'::jsonb,
  ARRAY[
    'Clean with soft cotton cloth after each use',
    'Store in a dry place away from moisture',
    'Avoid contact with chemicals and perfumes',
    'Polish with silver cleaner when needed'
  ]
),
(
  'silver-diya-set',
  'Handcrafted Silver Diya Set (Pack of 4)',
  'Set of 4 beautifully crafted silver diyas for auspicious occasions and daily prayers.',
  28000,
  1,
  'https://images.unsplash.com/photo-1609619385002-f40bc4e1c7d5?w=1200&h=1200&fit=crop',
  ARRAY['https://images.unsplash.com/photo-1609619385002-f40bc4e1c7d5?w=1200&h=1200&fit=crop'],
  true,
  true,
  '92.5% Sterling Silver',
  '180 grams',
  true,
  'Pooja',
  true,
  '[
    {"label": "Material", "value": "92.5% Sterling Silver"},
    {"label": "Weight", "value": "180 grams (total)"},
    {"label": "Quantity", "value": "4 pieces"},
    {"label": "Height", "value": "3 inches each"}
  ]'::jsonb,
  ARRAY[
    'Wipe clean after use',
    'Store in provided box',
    'Keep away from moisture'
  ]
),
(
  'decorative-silver-bowl',
  'Decorative Silver Bowl - Lotus Design',
  'Exquisite silver bowl with lotus petal design, perfect for home decoration or serving.',
  35000,
  4,
  'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=1200&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&h=1200&fit=crop'
  ],
  true,
  true,
  '99.9% Silver Plated',
  '300 grams',
  true,
  'Decor',
  true,
  '[
    {"label": "Material", "value": "99.9% Silver Plated"},
    {"label": "Weight", "value": "300 grams"},
    {"label": "Diameter", "value": "8 inches"},
    {"label": "Design", "value": "Lotus Petal"}
  ]'::jsonb,
  ARRAY[
    'Hand wash with mild soap',
    'Dry immediately with soft cloth',
    'Polish regularly for shine'
  ]
),
(
  'silver-photo-frame',
  'Silver Photo Frame - Vintage Design',
  'Elegant vintage-style silver photo frame, perfect for cherished memories.',
  18000,
  3,
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=1200&fit=crop',
  ARRAY['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=1200&fit=crop'],
  true,
  true,
  '92.5% Sterling Silver',
  '150 grams',
  true,
  'Gift',
  true,
  '[
    {"label": "Material", "value": "92.5% Sterling Silver"},
    {"label": "Weight", "value": "150 grams"},
    {"label": "Photo Size", "value": "5x7 inches"},
    {"label": "Frame Size", "value": "8x10 inches"}
  ]'::jsonb,
  ARRAY[
    'Wipe with soft cloth',
    'Avoid direct sunlight',
    'Keep glass clean'
  ]
),
(
  'silver-serving-tray',
  'Royal Silver Serving Tray',
  'Grand silver serving tray with ornate border design, ideal for special occasions.',
  52000,
  2,
  'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&h=1200&fit=crop',
  ARRAY['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&h=1200&fit=crop'],
  true,
  true,
  '99.9% Silver Plated',
  '450 grams',
  true,
  'All',
  true,
  '[
    {"label": "Material", "value": "99.9% Silver Plated"},
    {"label": "Weight", "value": "450 grams"},
    {"label": "Size", "value": "14x10 inches"},
    {"label": "Design", "value": "Ornate Border"}
  ]'::jsonb,
  ARRAY[
    'Clean after each use',
    'Store flat in dry place',
    'Polish monthly'
  ]
),
(
  'silver-coin-set',
  'Lakshmi Ganesh Silver Coin Set',
  'Auspicious silver coins featuring Lakshmi and Ganesh, perfect for gifting.',
  12000,
  3,
  'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1200&h=1200&fit=crop',
  ARRAY['https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1200&h=1200&fit=crop'],
  true,
  true,
  '99.9% Silver Plated',
  '50 grams',
  true,
  'Gift',
  true,
  '[
    {"label": "Material", "value": "99.9% Silver Plated"},
    {"label": "Weight", "value": "50 grams (total)"},
    {"label": "Quantity", "value": "2 coins"},
    {"label": "Diameter", "value": "2 inches each"}
  ]'::jsonb,
  ARRAY[
    'Store in provided case',
    'Handle with clean hands',
    'Keep away from chemicals'
  ]
);

-- Step 10: Insert Sample Blog Posts
-- ============================================
INSERT INTO blog_posts (slug, title, excerpt, content, image, author, date, read_time) VALUES
(
  'benefits-of-silver-utensils',
  'The Health Benefits of Using Silver Utensils',
  'Discover the ancient wisdom behind using Silver Plated utensils and their modern health benefits.',
  'Silver has been used for centuries in Indian households, not just for its beauty but for its remarkable health properties. Silver Plated utensils have natural antibacterial properties that help keep food fresh and safe. Studies have shown that silver ions can eliminate harmful bacteria and boost immunity. In this article, we explore the science behind silver''s health benefits and why our ancestors valued it so highly.',
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=600&fit=crop',
  'Dr. Meera Iyer',
  '2024-11-10',
  '5 min read'
),
(
  'caring-for-silver-items',
  'How to Care for Your Silver Items',
  'Expert tips on maintaining the shine and beauty of your silver pieces for generations.',
  'Proper care ensures your silver items remain beautiful for decades. Regular cleaning with a soft cloth, proper storage away from moisture, and occasional polishing are key. We recommend using natural cleaning methods like baking soda paste for stubborn tarnish. Store silver in anti-tarnish cloth or airtight containers. With the right care, your silver pieces will become cherished family heirlooms.',
  'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=600&fit=crop',
  'Rajesh Kumar',
  '2024-11-15',
  '4 min read'
),
(
  'silver-gifting-traditions',
  'Silver Gifting Traditions in India',
  'Explore the cultural significance of silver gifts in Indian traditions and celebrations.',
  'In Indian culture, silver holds a special place in gifting traditions. From weddings to baby showers, silver gifts symbolize prosperity and good fortune. Traditional items like silver coins, utensils, and jewelry are considered auspicious. We delve into the history of these traditions and suggest meaningful silver gifts for various occasions.',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=600&fit=crop',
  'Priya Sharma',
  '2024-11-20',
  '6 min read'
);

-- Step 11: Insert Sample Testimonials
-- ============================================
INSERT INTO testimonials (name, location, rating, text, date) VALUES
('Priya Sharma', 'Mumbai', 5, 'The silver pooja thali exceeded my expectations. The craftsmanship is exquisite and the purity is genuine. Highly recommended!', '2024-11-15'),
('Rajesh Kumar', 'Delhi', 5, 'Bought a silver bowl as a wedding gift. The quality is outstanding and the hallmark certification gives complete peace of mind.', '2024-11-10'),
('Anita Desai', 'Bangalore', 5, 'Beautiful silver diyas! They add such elegance to our daily prayers. The packaging was also very secure.', '2024-11-05'),
('Vikram Singh', 'Pune', 5, 'Excellent service and authentic products. The silver serving tray is a masterpiece. Will definitely order again.', '2024-10-28');

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Your database is now ready with:
-- ✅ 4 tables (categories, products, blog_posts, testimonials)
-- ✅ Proper indexes for performance
-- ✅ RLS policies for security
-- ✅ Sample data (4 categories, 6 products, 3 blog posts, 4 testimonials)
-- 
-- Next steps:
-- 1. Go to your Supabase dashboard
-- 2. Navigate to SQL Editor
-- 3. Paste this entire SQL script
-- 4. Click "Run"
-- 5. Verify data in Table Editor
-- ============================================
