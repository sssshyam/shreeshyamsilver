-- ==========================================
-- CONSOLIDATED & CATEGORIZED PRODUCT INSERT
-- ==========================================
-- This script:
-- 1. Defines the EXACT 6 categories requested.
-- 2. Removes any other categories.
-- 3. Inserts all products (both original and additional) into these precise categories.
-- ==========================================

-- 1. Define Categories & Cleanup Others
-- ==========================================

-- Update existing or Insert new categories
INSERT INTO categories (name, slug, description, image)
VALUES 
    ('Pooja & Home Decor', 'pooja-and-home-decor', 'Sacred silver items for your prayer room and home accents.', 'https://via.placeholder.com/300'),
    ('Silver Photo Frames', 'silver-photo-frames', 'Elegant frames to cherish your memories.', 'https://via.placeholder.com/300'),
    ('Dry Fruit Box', 'dry-fruit-box', 'Premium boxes for serving dry fruits and sweets.', 'https://via.placeholder.com/300'),
    ('Silver Candle & Deepak Stands', 'silver-candle-and-deepak-stands', 'Illuminate your space with divine light.', 'https://via.placeholder.com/300'),
    ('Decorative Bowls', 'decorative-bowls', 'Exquisite bowls for serving and display.', 'https://via.placeholder.com/300'),
    ('Resin Decor Items', 'resin-decor-items', 'Modern resin art with silver plated finishes.', 'https://via.placeholder.com/300')
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Remove old unwanted categories (Caution: this might fail if products are linked, 
-- but we are re-linking products below, so cleaner is better)
-- Ideally, we update products first, then delete unused categories.
-- For now, let's proceed with inserting products to correct categories.


-- 2. Insert/Update Products with Correct Categories
-- ==========================================

-- Product 1: Silver Plated Lord Ganesha Photo Frame
-- Category: Silver Photo Frames
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Silver Plated Lord Ganesha Photo Frame (11x8 inch)',
    'silver-plated-lord-ganesha-photo-frame-11x8',
    'Bring divine grace and timeless artistry to your home with this beautifully handcrafted Silver Plated Ganesha Frame. Adorned with intricate floral engravings and elegant antique detailing.',
    6750,
    (SELECT id FROM categories WHERE slug = 'silver-photo-frames' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Silver Plated Metal', '450 grams', false, 'Pooja',
    jsonb_build_object('Outer Frame Size', '11 x 8 inches', 'Photo Size', '5 x 7 inches', 'Material', 'Premium Silver Plated Metal', 'Weight', '450 grams', 'Price Includes', 'GST Included', 'Shipping', 'All over India'),
    ARRAY['Keep your silver frame in airtight containers or anti-tarnish bags'],
    ARRAY['Ideal for home décor, temples, and auspicious gifting.', 'Handcrafted with precision and antique silver finish.', 'Tarnish-resistant and long-lasting shine.'],
    'This is a UCP (Uniform Consumer Price) product, and the price is fixed.'
)
ON CONFLICT (slug) DO UPDATE SET 
    category_id = (SELECT id FROM categories WHERE slug = 'silver-photo-frames' LIMIT 1),
    price = EXCLUDED.price,
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;


-- Product 2: Silver Plated Decorative Elephant Showpiece
-- Category: Resin Decor Items (Assuming it's a decor piece) or Pooja & Home Decor. 
-- User prompt says "Resin Decor Items" exists, but this is "Silver Plated Metal". 
-- Let's put in "Pooja & Home Decor" as it fits "Home Decor" best if not Resin.
-- WAIT, User asked to categorization carefully. It's a "Showpiece". Fits "Pooja & Home Decor".
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Silver Plated Decorative Elephant Showpiece (7.5 x 4.5 x 8 inch)',
    'silver-plated-decorative-elephant-showpiece',
    'Bring home a symbol of strength, wisdom, and prosperity with this Silver Plated Elephant Showpiece.',
    4600,
    (SELECT id FROM categories WHERE slug = 'pooja-and-home-decor' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Silver Plated Metal', NULL, false, 'Decor',
    jsonb_build_object('Size', '7.5 x 4.5 x 8 inches', 'Box Size', '8 x 8 inches', 'Price Includes', 'GST Included'),
    ARRAY['Store in airtight containers'],
    ARRAY['Handcrafted with detailed silver embossing', 'Ideal for home décor'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'pooja-and-home-decor' LIMIT 1);


-- Product 3: Silver Plated Peacock Deepak / Candle Stand
-- Category: Silver Candle & Deepak Stands
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Silver Plated Peacock Deepak / Candle Stand',
    'silver-plated-peacock-deepak-candle-stand',
    'Illuminate your space with divine radiance and artistic grace with this Silver Plated Peacock Deepak/Candle Stand.',
    4600,
    (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1),
    'https://i.ibb.co/SDk01KyX/Silver-Plated-peacock-deepak-candle-11.png', true, true, true, 'Premium Silver Plated Metal', NULL, false, 'Pooja',
    jsonb_build_object('Size', '7.5 x 4.5 x 8 inches', 'Price Includes', 'GST Included'),
    ARRAY['Store in airtight containers'],
    ARRAY['Intricately designed peacock detailing', 'Can be used as a diya or candle stand'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1);


-- Product 4: Resin Leaf Cut Bowl / Silver Plated Dry Fruit & Fruit Bowl
-- Category: Decorative Bowls (or Dry Fruit Box? It says Bowl). Fits "Decorative Bowls" best.
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Resin Leaf Cut Bowl / Silver Plated Dry Fruit & Fruit Bowl',
    'resin-leaf-cut-bowl-silver-plated',
    'Add a touch of elegance to your serveware collection with this beautifully handcrafted Resin Leaf Cut Bowl.',
    2750,
    (SELECT id FROM categories WHERE slug = 'decorative-bowls' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Resin with Silver Plated Finish', NULL, false, 'Gift',
    jsonb_build_object('Size', '7.5 x 7 x 5.6 inches', 'Material', 'Premium Resin with Silver Plated Finish'),
    ARRAY['Keep in airtight containers'],
    ARRAY['Elegant leaf-cut design', 'Ideal for festive serving'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'decorative-bowls' LIMIT 1);


-- Product 5: Resin Nakshi Jali Golly Bowl
-- Category: Decorative Bowls
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Resin Nakshi Jali Golly Bowl (5.5 x 5.5 x 4.75 inch)',
    'resin-nakshi-jali-golly-bowl',
    'Bring home timeless craftsmanship with this beautifully designed Resin Nakshi Jali Golly Bowl.',
    3700,
    (SELECT id FROM categories WHERE slug = 'decorative-bowls' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Resin with Silver Plated Finish', NULL, false, 'Gift',
    jsonb_build_object('Size', '5.5 x 5.5 x 4.75 inches', 'Material', 'Premium Resin'),
    ARRAY['Store in airtight containers'],
    ARRAY['Handcrafted nakshi and jali work'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'decorative-bowls' LIMIT 1);


-- Product 6: Resin Rose Bowl / Silver Plated Decorative Bowl
-- Category: Decorative Bowls (It is a "Resin Rose Bowl" but fits Decorative Bowls or Resin Decor Items. "Decorative Bowl" is more specific to its function)
-- User asked "Resin Decor Items" is also an option. Since it's a "Bowl", let's stick to Decorative Bowls, or maybe Resin Decor Items?
-- It's a "Decorative Bowl", let's put it in Decorative Bowls to keep all bowls together.
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Resin Rose Bowl / Silver Plated Decorative Bowl',
    'resin-rose-bowl-silver-plated',
    'Exude elegance and sophistication with this stunning Resin Rose Bowl, crafted with intricate floral detailing and a luxurious silver-plated finish.',
    3850,
    (SELECT id FROM categories WHERE slug = 'decorative-bowls' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Resin with Silver Plated Finish', NULL, false, 'Decor',
    jsonb_build_object('Size', '8.5 x 8.5 x 8 inches', 'Price Includes', 'GST Included'),
    ARRAY['Keep in airtight containers'],
    ARRAY['Handcrafted rose pattern', 'Ideal for serving dry fruits'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'decorative-bowls' LIMIT 1);


-- Product 7: 3-Piece Resin Deepak Candle Stand Set
-- Category: Silver Candle & Deepak Stands
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    '3-Piece Resin Deepak Candle Stand Set (Silver Plated)',
    '3-piece-resin-deepak-candle-stand-set',
    'Add a touch of serenity and sophistication to your home décor with this exquisite 3-Piece Resin Deepal Candle Stand Set.',
    6600,
    (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Resin Base with Silver Plated Holder', NULL, false, 'Pooja',
    jsonb_build_object('Set Contents', 'Set of 3 Candle Stands', 'Dimensions', '2 pieces: 9 inches, 1 piece: 12.5 inches'),
    ARRAY['Clean gently with dry cloth'],
    ARRAY['Elegant lotus-inspired silver detailing', 'Ideal for home décor, gifting'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1);


-- Product 8: Silver Plated Combo Gift Set – 2 Dry Fruit Jars + 1 Designer Photo Frame
-- Category: Dry Fruit Box (Contains Jars) OR Silver Photo Frames? 
-- It's a "Combo Gift Set". User didn't ask for "Gift Sets".
-- Categories available: Pooja & Home Decor, Silver Photo Frames, Dry Fruit Box, Silver Candle & Deepak Stands, Decorative Bowls, Resin Decor Items.
-- Best fit: "Pooja & Home Decor" OR "Dry Fruit Box" (since it has jars). Let's go with "Dry Fruit Box" as it is the closest container category.
-- OR "Pooja & Home Decor" as a generic gift. Let's use "Dry Fruit Box" as it holds dry fruits.
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Silver Plated Combo Gift Set – 2 Dry Fruit Jars + 1 Designer Photo Frame',
    'silver-plated-combo-gift-set-jars-photo-frame',
    'A perfect blend of elegance and utility, this Silver Plated Combo Gift Set is designed to make every occasion special.',
    4500,
    (SELECT id FROM categories WHERE slug = 'dry-fruit-box' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Silver Plated', NULL, false, 'Gift',
    jsonb_build_object('Product Includes', '2 Dry Fruit Jars, 1 Designer Photo Frame', 'Price Includes', 'GST Included'),
    ARRAY['Store in airtight containers'],
    ARRAY['Premium silver plated finish', 'Perfect for gifting'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'dry-fruit-box' LIMIT 1);


-- Product 9: Resin Rose Deepak / Silver Plated Decorative Diya
-- Category: Silver Candle & Deepak Stands
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Resin Rose Deepak / Silver Plated Decorative Diya',
    'resin-rose-deepak-silver-plated-diya',
    'Add a divine glow to your festive décor with this beautifully crafted Resin Rose Deepak.',
    950,
    (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Resin Base with Silver Plated Top', NULL, false, 'Pooja',
    jsonb_build_object('Quantity', '1 Piece', 'Size', '5.5 x 5.5 inches'),
    ARRAY['Wipe gently with dry cloth'],
    ARRAY['Handcrafted rose design', 'Ideal for festive lighting'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1);


-- Product 10: Resin Candle Stand / Silver Plated Decorative Stand
-- Category: Silver Candle & Deepak Stands
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Resin Candle Stand / Silver Plated Decorative Stand',
    'resin-candle-stand-silver-plated',
    'Illuminate your home with timeless charm and sophistication with this beautifully handcrafted Resin Candle Stand.',
    4900,
    (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Resin Base with Silver Plated Holder', NULL, false, 'Decor',
    jsonb_build_object('Size', '10.5 x 4.5 inches', 'Price Includes', 'GST Included'),
    ARRAY['Keep in airtight containers'],
    ARRAY['Modern yet traditional design', 'Ideal for tealight or small pillar candles'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1);


-- Product 11: 4-Piece Kamakshi Deepak Set
-- Category: Silver Candle & Deepak Stands
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    '4-Piece Kamakshi Deepak Set (Silver Plated)',
    '4-piece-kamakshi-deepak-set',
    'Elevate your pooja décor with this exquisitely handcrafted 4-Piece Kamakshi Deepak Set.',
    12750,
    (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Silver Plated', 'Total approx 840 gm', false, 'Pooja',
    jsonb_build_object('Set Contents', 'Set of 4 Deepaks', 'Material', 'Premium Silver Plated', 'Price Includes', 'GST Included'),
    ARRAY['Store in airtight containers'],
    ARRAY['Inspired by traditional South Indian Kamakshi deepam design', 'Ideal for pooja rituals'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'silver-candle-and-deepak-stands' LIMIT 1);


-- Product 12: Silver Plated Fruit Bowl with 3-Deer Stand
-- Category: Decorative Bowls
INSERT INTO products (
    name, slug, description, price, category_id, image_url, in_stock, is_active, is_featured, purity, weight, hallmark, use_case, specifications, care_instructions, highlights, note
) VALUES (
    'Silver Plated Fruit Bowl with 3-Deer Stand (8 x 8 inch)',
    'silver-plated-fruit-bowl-3-deer-stand',
    'Add a touch of luxury and grandeur to your home décor with this stunning Silver Plated Fruit Bowl featuring a 3-Deer Stand.',
    6500,
    (SELECT id FROM categories WHERE slug = 'decorative-bowls' LIMIT 1),
    'https://via.placeholder.com/600', true, true, true, 'Premium Silver Plated', NULL, false, 'Decor',
    jsonb_build_object('Size', '8 x 8 inches', 'Material', 'Premium Silver Plated Bowl with Designer Deer Stand'),
    ARRAY['Store in airtight containers'],
    ARRAY['Unique triple-deer base', 'Perfect for serving fruits'],
    'This is a UCP product.'
)
ON CONFLICT (slug) DO UPDATE SET category_id = (SELECT id FROM categories WHERE slug = 'decorative-bowls' LIMIT 1);

-- 3. Cleanup Unused Categories
-- ==========================================
-- Delete categories that are NOT in the allowed list of 6
DELETE FROM categories 
WHERE slug NOT IN (
    'pooja-and-home-decor',
    'silver-photo-frames',
    'dry-fruit-box',
    'silver-candle-and-deepak-stands',
    'decorative-bowls',
    'resin-decor-items'
);
