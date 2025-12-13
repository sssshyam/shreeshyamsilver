-- ============================================
-- SUPABASE DATA VERIFICATION SCRIPT
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. CHECK ALL CATEGORIES
-- This shows all your categories and their slugs
SELECT 
  id,
  slug,
  name,
  description
FROM categories
ORDER BY id;

-- Expected output: At least 1 row
-- If empty: You need to add categories!


-- 2. CHECK ALL PRODUCTS
-- This shows all products and which category they belong to
SELECT 
  p.id,
  p.slug,
  p.name,
  p.category_id,
  c.name as category_name,
  c.slug as category_slug,
  p.featured,
  p.in_stock
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.id;

-- Expected output: At least 1 row with category_id filled
-- If category_id is NULL: Products aren't linked to categories!


-- 3. CHECK SPECIFIC CATEGORY
-- Replace 'decorative-bowls' with your category slug
SELECT 
  id,
  slug,
  name
FROM categories
WHERE slug = 'decorative-bowls';

-- Expected output: 1 row
-- If empty: This category doesn't exist!


-- 4. CHECK PRODUCTS IN SPECIFIC CATEGORY
-- This finds products in the 'decorative-bowls' category
SELECT 
  p.id,
  p.name,
  p.price,
  p.category_id
FROM products p
WHERE p.category_id = (
  SELECT id FROM categories WHERE slug = 'decorative-bowls'
);

-- Expected output: At least 1 row
-- If empty: No products in this category!


-- 5. CHECK RLS POLICIES
-- This shows if public read access is enabled
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename IN ('categories', 'products', 'blog_posts', 'testimonials');

-- Expected output: Policies with cmd = 'SELECT' and roles = '{public}'
-- If empty: RLS policies not set up!


-- 6. COUNT EVERYTHING
-- Quick overview of your data
SELECT 
  'categories' as table_name,
  COUNT(*) as row_count
FROM categories
UNION ALL
SELECT 
  'products',
  COUNT(*)
FROM products
UNION ALL
SELECT 
  'blog_posts',
  COUNT(*)
FROM blog_posts
UNION ALL
SELECT 
  'testimonials',
  COUNT(*)
FROM testimonials;

-- Expected output: All counts > 0 (except blog_posts is optional)


-- ============================================
-- QUICK FIXES
-- ============================================

-- FIX 1: Enable RLS Policies (if not enabled)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- FIX 2: Create Public Read Policies
CREATE POLICY "Enable read access for all users" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON testimonials
  FOR SELECT USING (true);


-- FIX 3: Create Sample Category (if needed)
INSERT INTO categories (slug, name, description, image)
VALUES (
  'decorative-bowls',
  'Decorative Bowls',
  'Beautiful handcrafted silver bowls for home decoration',
  'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=800&fit=crop'
);


-- FIX 4: Link Products to Category
-- First, get the category ID
SELECT id FROM categories WHERE slug = 'decorative-bowls';

-- Then update products (replace 1 with the ID from above)
-- UPDATE products 
-- SET category_id = 1 
-- WHERE id IN (1, 2, 3); -- Replace with your product IDs


-- ============================================
-- VERIFICATION CHECKLIST
-- ============================================

-- ✅ Categories table has data
-- ✅ Products table has data
-- ✅ Products have category_id set
-- ✅ Category 'decorative-bowls' exists
-- ✅ Products linked to 'decorative-bowls' category
-- ✅ RLS policies enabled
-- ✅ Public read policies created
-- ✅ Images field is text[] (array)
-- ✅ Specifications field is jsonb
-- ✅ Care_instructions field is text[] (array)
