-- ==========================================
-- PRODUCTS TABLE ALTERATION (Fix for Missing Column)
-- ==========================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'sale_price') THEN
        ALTER TABLE products ADD COLUMN sale_price numeric;
    END IF;
END $$;

-- ==========================================
-- BULK INSERT PRODUCTS SCRIPT
-- ==========================================
-- This script inserts 5 specific silver products into the 'products' table.
-- It cleans up any existing products with the same slugs to prevent duplicates.
-- ==========================================

-- 1. Ensure Categories Exist
-- ==========================
INSERT INTO categories (name, slug, description, image)
VALUES 
    ('Pooja Silver', 'pooja-silver', 'Handcrafted silver items for your prayer room.', 'https://via.placeholder.com/300'),
    ('Home Decor', 'home-decor', 'Elegant silver accents for your home.', 'https://via.placeholder.com/300'),
    ('Tableware', 'tableware', 'Exquisite silver-plated serveware and dining essentials.', 'https://via.placeholder.com/300')
ON CONFLICT (slug) DO NOTHING;

-- 2. Clean up existing products with conflicting slugs
-- ====================================================
DELETE FROM products WHERE slug IN (
    'silver-plated-lord-ganesha-photo-frame-11x8',
    'silver-plated-decorative-elephant-showpiece',
    'silver-plated-peacock-deepak-candle-stand',
    'resin-leaf-cut-bowl-silver-plated',
    'resin-nakshi-jali-golly-bowl'
);

-- 3. Insert Products
-- ==================

-- Product 1: Silver Plated Lord Ganesha Photo Frame (11x8 inch)
INSERT INTO products (
    name,
    slug,
    description,
    price,
    sale_price,
    category_id,
    image_url,
    in_stock,
    is_active,
    is_featured,
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Silver Plated Lord Ganesha Photo Frame (11x8 inch)',
    'silver-plated-lord-ganesha-photo-frame-11x8',
    'Bring divine grace and timeless artistry to your home with this beautifully handcrafted Silver Plated Ganesha Frame. Adorned with intricate floral engravings and elegant antique detailing, this piece adds a touch of spirituality and sophistication to any space.',
    6750, -- Price
    NULL, -- Sale Price (if any)
    (SELECT id FROM categories WHERE slug = 'pooja-silver' LIMIT 1),
    'https://via.placeholder.com/600', -- Placeholder image (You didn't provide one, so using placeholder)
    true,
    true,
    true, -- Featured
    'Premium Silver Plated Metal', -- Purity/Material
    '450 grams', -- Weight
    false, -- Hallmark (Not explicitly mentioned as Hallmarked 925/999, just Silver Plated)
    'Pooja',
    jsonb_build_object(
        'Outer Frame Size', '11 x 8 inches',
        'Photo Size', '5 x 7 inches',
        'Material', 'Premium Silver Plated Metal',
        'Weight', '450 grams',
        'Price Includes', 'GST Included',
        'Shipping', 'All over India'
    ),
    ARRAY['Keep your silver frame in airtight containers or anti-tarnish bags to minimize exposure'],
    ARRAY['Ideal for home décor, temples, and auspicious gifting.', 'Handcrafted with precision and antique silver finish.', 'Tarnish-resistant and long-lasting shine.'],
    'This is a UCP (Uniform Consumer Price) product, and the price is fixed. It will not vary based on grammage or rate, and price break-up is not available.'
);

-- Product 2: Silver Plated Decorative Elephant Showpiece (7.5 x 4.5 x 8 inch)
INSERT INTO products (
    name,
    slug,
    description,
    price,
    sale_price,
    category_id,
    image_url,
    in_stock,
    is_active,
    is_featured,
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Silver Plated Decorative Elephant Showpiece (7.5 x 4.5 x 8 inch)',
    'silver-plated-decorative-elephant-showpiece',
    'Bring home a symbol of strength, wisdom, and prosperity with this Silver Plated Elephant Showpiece — a perfect fusion of tradition and fine craftsmanship. Its intricate detailing and graceful finish make it an elegant addition to your décor or a thoughtful gift for loved ones.',
    4600,
    NULL,
    (SELECT id FROM categories WHERE slug = 'home-decor' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Silver Plated Metal',
    NULL, -- Weight not specified
    false,
    'Decor',
    jsonb_build_object(
        'Size', '7.5 x 4.5 x 8 inches',
        'Box Size', '8 x 8 inches',
        'Material', 'Premium Silver Plated Metal',
        'Price Includes', 'GST Included',
        'Shipping', 'Free Shipping All Over India'
    ),
    ARRAY['Store in airtight containers or anti-tarnish bags to minimize exposure to air and moisture.', 'Clean gently with a dry soft cloth to maintain shine and texture.'],
    ARRAY['Handcrafted with detailed silver embossing for a regal look.', 'Ideal for home décor, office desks, and festive gifting.', 'A timeless piece symbolizing good fortune and success.'],
    'This is a UCP (Uniform Consumer Price) product — price is fixed and does not vary based on grammage or rate. Price break-up is not available.'
);

-- Product 3: Silver Plated Peacock Deepak / Candle Stand (7.5 x 4.5 x 8 inch)
INSERT INTO products (
    name,
    slug,
    description,
    price,
    sale_price,
    category_id,
    image_url,
    in_stock,
    is_active,
    is_featured,
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Silver Plated Peacock Deepak / Candle Stand',
    'silver-plated-peacock-deepak-candle-stand',
    'Illuminate your space with divine radiance and artistic grace with this Silver Plated Peacock Deepak/Candle Stand. Exquisitely handcrafted with a detailed peacock motif, this piece beautifully blends spirituality and elegance — making it perfect for your pooja room, festive décor, or gifting.',
    4600,
    NULL,
    (SELECT id FROM categories WHERE slug = 'pooja-silver' LIMIT 1),
    'https://i.ibb.co/SDk01KyX/Silver-Plated-peacock-deepak-candle-11.png', -- Using the image you provided earlier as it matches description
    true,
    true,
    true,
    'Premium Silver Plated Metal',
    NULL,
    false,
    'Pooja',
    jsonb_build_object(
        'Size', '7.5 x 4.5 x 8 inches',
        'Box Size', '8 x 8 inches',
        'Material', 'Premium Silver Plated Metal',
        'Price Includes', 'GST Included',
        'Shipping', 'Free Shipping All Over India'
    ),
    ARRAY['Store in airtight containers or anti-tarnish bags to protect from air and moisture.', 'Clean gently with a dry, soft cloth to preserve its shine and finish.'],
    ARRAY['Intricately designed peacock detailing for a regal and traditional touch.', 'Can be used as a diya or candle stand for festive occasions.', 'Perfect for home décor, gifting, and spiritual settings.'],
    'This is a UCP (Uniform Consumer Price) product, and the price is fixed. It will not vary based on grammage or rate, and price break-up is not available.'
);

-- Product 4: Resin Leaf Cut Bowl / Silver Plated Dry Fruit & Fruit Bowl
INSERT INTO products (
    name,
    slug,
    description,
    price,
    sale_price,
    category_id,
    image_url,
    in_stock,
    is_active,
    is_featured,
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Resin Leaf Cut Bowl / Silver Plated Dry Fruit & Fruit Bowl',
    'resin-leaf-cut-bowl-silver-plated',
    'Add a touch of elegance to your serveware collection with this beautifully handcrafted Resin Leaf Cut Bowl. Designed with exquisite silver plating and a unique leaf-cut pattern, it perfectly blends functionality with artistry — ideal for serving dry fruits, fruits, or simply as a decorative centerpiece.',
    2750,
    NULL,
    (SELECT id FROM categories WHERE slug = 'tableware' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Resin with Silver Plated Finish',
    NULL,
    false,
    'Gift',
    jsonb_build_object(
        'Size', '7.5 x 7 x 5.6 inches',
        'Box Size', '9.5 x 9.5 x 7 inches',
        'Material', 'Premium Resin with Silver Plated Finish',
        'Price Includes', 'GST Included',
        'Shipping', 'Free Shipping All Over India'
    ),
    ARRAY['Keep in airtight containers or anti-tarnish bags to prevent exposure to air and moisture.', 'Wipe gently with a dry, soft cloth to retain its shine and finish.'],
    ARRAY['Elegant leaf-cut design with detailed silver finish.', 'Ideal for festive serving, gifting, or table decoration.', 'Durable, tarnish-resistant, and easy to maintain.'],
    'This is a UCP (Uniform Consumer Price) product — price is fixed and does not vary based on grammage or rate. Price break-up is not available.'
);

-- Product 5: Resin Nakshi Jali Golly Bowl (5.5 x 5.5 x 4.75 inch)
INSERT INTO products (
    name,
    slug,
    description,
    price,
    sale_price,
    category_id,
    image_url,
    in_stock,
    is_active,
    is_featured,
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Resin Nakshi Jali Golly Bowl (5.5 x 5.5 x 4.75 inch)',
    'resin-nakshi-jali-golly-bowl',
    'Bring home timeless craftsmanship with this beautifully designed Resin Nakshi Jali Golly Bowl. Adorned with intricate nakshi (carved) detailing and a traditional jali pattern, this silver-plated bowl is a perfect blend of elegance and heritage — ideal for serving dry fruits or enhancing your décor.',
    3700,
    NULL,
    (SELECT id FROM categories WHERE slug = 'tableware' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Resin with Silver Plated Finish',
    NULL,
    false,
    'Gift',
    jsonb_build_object(
        'Size', '5.5 x 5.5 x 4.75 inches',
        'Material', 'Premium Resin with Silver Plated Finish',
        'Price Includes', 'GST Included',
        'Shipping', 'Shipping All Over India'
    ),
    ARRAY['Store in airtight containers or anti-tarnish bags to avoid exposure to air and moisture.', 'Clean gently with a dry, soft cloth to maintain its shine and beauty.'],
    ARRAY['Handcrafted nakshi and jali work for a luxurious traditional look.', 'Ideal for festive gifting, serving, or decorative use.', 'Durable, tarnish-resistant, and finely detailed finish.'],
    'This is a UCP (Uniform Consumer Price) product — price is fixed and does not vary based on grammage or rate. Price break-up is not available.'
);
