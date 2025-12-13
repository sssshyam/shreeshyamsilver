-- ============================================
-- INSERT CATEGORIES AND PRODUCT
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Insert Categories
-- ============================================
INSERT INTO categories (slug, name, description, image) VALUES
('pooja-home-decor', 'Pooja & Home Decor', 'Sacred silverware and decorative items for your spiritual rituals and home beautification', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop'),
('silver-photo-frames', 'Silver Photo Frames', 'Elegant silver photo frames to preserve your cherished memories', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop'),
('dry-fruit-box', 'Dry Fruit Box', 'Premium silver dry fruit boxes perfect for gifting and storage', 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=800&fit=crop'),
('silver-candle-deepak-stands', 'Silver Candle & Deepak Stands', 'Beautiful candle and deepak stands for pooja and decoration', 'https://images.unsplash.com/photo-1609619385002-f40bc4e1c7d5?w=800&h=800&fit=crop'),
('decorative-bowls', 'Decorative Bowls', 'Handcrafted silver bowls for home decoration and serving', 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=800&fit=crop'),
('resin-decor-items', 'Resin Decor Items', 'Modern resin decorative items with silver accents', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop')
ON CONFLICT (slug) DO NOTHING;

-- Step 2: Insert Product - 4-Piece Kamakshi Deepak Set
-- ============================================
INSERT INTO products (
  slug,
  name,
  description,
  price,
  category_id,
  image_url,
  gallery_images,
  is_active,
  is_featured,
  in_stock,
  purity,
  weight,
  hallmark,
  use_case,
  specifications,
  care_instructions,
  meta_description,
  meta_keywords,
  created_at,
  updated_at
) VALUES (
  '4-piece-kamakshi-deepak-set-silver-plated',
  '4-Piece Kamakshi Deepak Set (Silver Plated)',
  'Elevate your pooja décor with this exquisitely handcrafted 4-Piece Kamakshi Deepak Set, designed with traditional temple-style detailing and divine craftsmanship. Each deepak features intricate carvings and a radiant silver-plated finish — perfect for daily rituals, festive décor, or auspicious gifting.

Highlights:
• Inspired by traditional South Indian Kamakshi deepam design
• Ideal for pooja rituals, home mandirs, gifting & festive décor
• Sturdy base with fine antique-style craftsmanship
• Perfect as a devotional collectible or centerpiece

Note: This is a UCP (Uniform Consumer Price) product, and the price is fixed. It does not vary based on grammage or rate. Price break-up is not available.',
  12750,
  (SELECT id FROM categories WHERE slug = 'pooja-home-decor' LIMIT 1),
  'https://images.unsplash.com/photo-1609619385002-f40bc4e1c7d5?w=1200&h=1200&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1609619385002-f40bc4e1c7d5?w=1200&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1200&h=1200&fit=crop'
  ],
  true,
  true,
  true,
  'Premium Silver Plated',
  'Total Set: 840 gm (4 pieces)',
  false,
  'Pooja',
  '[
    {"label": "Material", "value": "Premium Silver Plated"},
    {"label": "Set Includes", "value": "4 Pieces"},
    {"label": "Total Weight", "value": "840 grams"},
    {"label": "Deepak 1 - Weight", "value": "240 gm"},
    {"label": "Deepak 1 - Height", "value": "6 inches"},
    {"label": "Deepak 2 - Weight", "value": "225 gm"},
    {"label": "Deepak 2 - Height", "value": "5.5 inches"},
    {"label": "Deepak 3 - Weight", "value": "200 gm"},
    {"label": "Deepak 3 - Height", "value": "5.25 inches"},
    {"label": "Deepak 4 - Weight", "value": "175 gm"},
    {"label": "Deepak 4 - Height", "value": "5.25 inches"},
    {"label": "Design Style", "value": "Traditional South Indian Kamakshi"},
    {"label": "Finish", "value": "Antique-style craftsmanship"},
    {"label": "Base", "value": "Sturdy base"},
    {"label": "Price Type", "value": "UCP (Uniform Consumer Price)"},
    {"label": "GST", "value": "Included in price"}
  ]'::jsonb,
  ARRAY[
    'Store in airtight containers or anti-tarnish bags to minimize tarnish',
    'Wipe gently with a dry, soft cloth to maintain shine and detailing',
    'Avoid exposure to moisture and chemicals',
    'Clean after each use for longevity',
    'Polish occasionally with silver cleaner for best results'
  ],
  'Exquisitely handcrafted 4-Piece Kamakshi Deepak Set with traditional South Indian temple-style design. Premium silver-plated finish perfect for pooja rituals, home mandirs, and festive décor. GST included.',
  'kamakshi deepak, silver deepak set, pooja deepak, temple deepak, silver plated deepak, south indian deepak, diya set, pooja items, silver pooja items, deepam set, kamakshi deepam',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category_id = EXCLUDED.category_id,
  image_url = EXCLUDED.image_url,
  gallery_images = EXCLUDED.gallery_images,
  is_active = EXCLUDED.is_active,
  is_featured = EXCLUDED.is_featured,
  in_stock = EXCLUDED.in_stock,
  purity = EXCLUDED.purity,
  weight = EXCLUDED.weight,
  hallmark = EXCLUDED.hallmark,
  use_case = EXCLUDED.use_case,
  specifications = EXCLUDED.specifications,
  care_instructions = EXCLUDED.care_instructions,
  meta_description = EXCLUDED.meta_description,
  meta_keywords = EXCLUDED.meta_keywords,
  updated_at = NOW();

-- ============================================
-- VERIFICATION QUERIES
-- Run these to verify the data was inserted
-- ============================================

-- Check categories
SELECT id, name, slug FROM categories ORDER BY id;

-- Check the product
SELECT 
  id, 
  name, 
  slug, 
  price, 
  category_id,
  is_active,
  is_featured,
  array_length(gallery_images, 1) as image_count
FROM products 
WHERE slug = '4-piece-kamakshi-deepak-set-silver-plated';

-- Count products per category
SELECT 
  c.name as category_name,
  COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name
ORDER BY c.name;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
-- If you see the data in the verification queries above,
-- the insert was successful!
-- 
-- You should now see:
-- - 6 categories in your admin panel
-- - 1 product (Kamakshi Deepak Set) in products list
-- - Product appears on homepage (if is_featured = true)
-- - Product appears in "Pooja & Home Decor" category page
-- ============================================
