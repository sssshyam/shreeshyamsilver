-- ==========================================
-- BULK INSERT ADDITIONAL PRODUCTS SCRIPT
-- ==========================================
-- This script inserts 7 additional silver products into the 'products' table.
-- It cleans up any existing products with the same slugs to prevent duplicates.
-- ==========================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'sale_price') THEN
        ALTER TABLE products ADD COLUMN sale_price numeric;
    END IF;
END $$;

-- 1. Ensure Categories Exist
-- ==========================
INSERT INTO categories (name, slug, description, image)
VALUES 
    ('Pooja Silver', 'pooja-silver', 'Handcrafted silver items for your prayer room.', 'https://via.placeholder.com/300'),
    ('Home Decor', 'home-decor', 'Elegant silver accents for your home.', 'https://via.placeholder.com/300'),
    ('Tableware', 'tableware', 'Exquisite silver-plated serveware and dining essentials.', 'https://via.placeholder.com/300'),
    ('Gift Sets', 'gift-sets', 'Premium silver plated gift sets for all occasions.', 'https://via.placeholder.com/300')
ON CONFLICT (slug) DO NOTHING;

-- 2. Clean up existing products with conflicting slugs
-- ====================================================
DELETE FROM products WHERE slug IN (
    'resin-rose-bowl-silver-plated',
    '3-piece-resin-deepak-candle-stand-set',
    'silver-plated-combo-gift-set-jars-photo-frame',
    'resin-rose-deepak-silver-plated-diya',
    'resin-candle-stand-silver-plated',
    '4-piece-kamakshi-deepak-set',
    'silver-plated-fruit-bowl-3-deer-stand'
);

-- 3. Insert Products
-- ==================

-- Product 1: Resin Rose Bowl / Silver Plated Decorative Bowl (8.5 x 8.5 x 8 inch)
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
    'Resin Rose Bowl / Silver Plated Decorative Bowl',
    'resin-rose-bowl-silver-plated',
    'Exude elegance and sophistication with this stunning Resin Rose Bowl, crafted with intricate floral detailing and a luxurious silver-plated finish. The rose-inspired design symbolizes beauty and grace, making it a perfect centerpiece for your living space or a thoughtful festive gift.',
    3850, -- Price
    NULL,
    (SELECT id FROM categories WHERE slug = 'tableware' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Resin with Silver Plated Finish',
    NULL,
    false,
    'Decor',
    jsonb_build_object(
        'Size', '8.5 x 8.5 x 8 inches',
        'Material', 'Premium Resin with Silver Plated Finish',
        'Price Includes', 'GST Included'
    ),
    ARRAY['Keep in airtight containers or anti-tarnish bags to minimize exposure to air and moisture.', 'Wipe gently with a dry, soft cloth to preserve its shine and finish.'],
    ARRAY['Handcrafted rose pattern for a timeless and elegant look.', 'Ideal for serving dry fruits or as a decorative accent piece.', 'Tarnish-resistant finish for long-lasting brilliance.'],
    'This is a UCP (Uniform Consumer Price) product, and the price is fixed. It does not vary based on grammage or rate, and price break-up is not available.'
);

-- Product 2: 3-Piece Resin Deepak Candle Stand Set (Silver Plated)
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
    '3-Piece Resin Deepak Candle Stand Set (Silver Plated)',
    '3-piece-resin-deepak-candle-stand-set',
    'Add a touch of serenity and sophistication to your home décor with this exquisite 3-Piece Resin Deepal Candle Stand Set. Designed in elegant lotus-inspired shapes with a glossy resin base and silver-plated finish, this set radiates warmth and grace — perfect for festive lighting, pooja décor, or as a stylish centerpiece.',
    6600,
    NULL,
    (SELECT id FROM categories WHERE slug = 'pooja-silver' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Resin Base with Silver Plated Holder',
    NULL,
    false,
    'Pooja',
    jsonb_build_object(
        'Set Contents', 'Set of 3 Candle Stands',
        'Dimensions', '2 pieces: Height 9 inches each, 1 piece: Height 12.5 inches',
        'Material', 'Premium Resin Base with Silver Plated Holder',
        'Price Includes', 'GST Included'
    ),
    ARRAY['Clean gently with a dry, soft cloth.', 'Avoid direct contact with water or chemicals to maintain the resin and silver shine.'],
    ARRAY['Elegant lotus-inspired silver detailing with a marble-finish resin base.', 'Ideal for home décor, gifting, or festive lighting setups.', 'Handcrafted to perfection for a luxurious, contemporary look.', 'Versatile use — suitable for tealight candles or decorative displays.'],
    'This is a UCP (Uniform Consumer Price) product, and the price is fixed. It does not vary based on grammage or rate. Price break-up is not available.'
);

-- Product 3: Silver Plated Combo Gift Set – 2 Dry Fruit Jars + 1 Designer Photo Frame
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
    'Silver Plated Combo Gift Set – 2 Dry Fruit Jars + 1 Designer Photo Frame',
    'silver-plated-combo-gift-set-jars-photo-frame',
    'A perfect blend of elegance and utility, this Silver Plated Combo Gift Set is designed to make every occasion special. Thoughtfully curated with two intricately crafted dry fruit jars and a beautifully detailed designer photo frame, this set makes an ideal choice for weddings, anniversaries, corporate gifting, or festive celebrations.',
    4500,
    NULL,
    (SELECT id FROM categories WHERE slug = 'gift-sets' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Silver Plated',
    NULL,
    false,
    'Gift',
    jsonb_build_object(
        'Product Includes', '2 Dry Fruit Jars, 1 Designer Silver Plated Photo Frame',
        'Photo Frame Size', 'Outer: 7 x 9 inches, Photo: 4 x 6 inches',
        'Photo Frame Design', 'Intricate floral & elephant pattern with elegant lattice detailing',
        'Jar Size', '3.75 x 3.5 inches',
        'Jar Design', 'Beautiful nakshi cutwork with silver finish',
        'Price Includes', 'GST Included'
    ),
    ARRAY['Store in airtight containers or anti-tarnish bags.', 'Wipe gently with a soft dry cloth to maintain shine'],
    ARRAY['Premium silver plated finish with detailed craftsmanship', 'Perfect for gifting during Diwali, weddings, housewarming & corporate events', 'Elegant packaging with satin lining for a luxurious presentation', 'Functional jars suitable for dry fruits, chocolates, or storage'],
    'This is a UCP (Uniform Consumer Price) product. The price is fixed, and price break-up is not available.'
);

-- Product 4: Resin Rose Deepak / Silver Plated Decorative Diya (5.5 x 5.5 inch)
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
    'Resin Rose Deepak / Silver Plated Decorative Diya',
    'resin-rose-deepak-silver-plated-diya',
    'Add a divine glow to your festive décor with this beautifully crafted Resin Rose Deepak. Designed with a charming rose-shaped base and a silver-plated diya top, this piece brings together elegance and devotion — perfect for pooja setups, gifting, or home decoration.',
    950,
    NULL,
    (SELECT id FROM categories WHERE slug = 'pooja-silver' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Resin Base with Silver Plated Top',
    NULL,
    false,
    'Pooja',
    jsonb_build_object(
        'Quantity', '1 Piece',
        'Size', '5.5 x 5.5 inches',
        'Material', 'Premium Resin Base with Silver Plated Top',
        'Price Includes', 'GST Included'
    ),
    ARRAY['Wipe gently with a dry, soft cloth after use.', 'Keep in airtight containers or anti-tarnish bags to maintain its shine and finish.'],
    ARRAY['Handcrafted rose design symbolizing beauty and positivity.', 'Ideal for festive lighting, home décor, or spiritual gifting.', 'Elegant silver finish with long-lasting durability.'],
    'This is a UCP (Uniform Consumer Price) product, and the price is fixed. It will not vary based on grammage or rate. Price break-up is not available.'
);

-- Product 5: Resin Candle Stand / Silver Plated Decorative Stand (10.5 x 4.5 inch)
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
    'Resin Candle Stand / Silver Plated Decorative Stand',
    'resin-candle-stand-silver-plated',
    'Illuminate your home with timeless charm and sophistication with this beautifully handcrafted Resin Candle Stand. Featuring a sleek design with a glossy resin base and a silver-plated top, this elegant piece adds a warm, luxurious touch to any setting — perfect for festive décor, pooja spaces, or contemporary interiors.',
    4900,
    NULL,
    (SELECT id FROM categories WHERE slug = 'home-decor' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Resin Base with Silver Plated Holder',
    NULL,
    false,
    'Decor',
    jsonb_build_object(
        'Size', '10.5 x 4.5 inches',
        'Material', 'Premium Resin Base with Silver Plated Holder',
        'Price Includes', 'GST Included'
    ),
    ARRAY['Keep in airtight containers or anti-tarnish bags when not in use.', 'Wipe gently with a dry, soft cloth to maintain the resin’s shine and the silver’s luster.'],
    ARRAY['Modern yet traditional design with a radiant silver finish.', 'Ideal for tealight or small pillar candles.', 'Perfect décor addition for living spaces, festive setups, or gifting.', 'Durable, finely polished, and handcrafted for a premium look.'],
    'This is a UCP (Uniform Consumer Price) product, and the price is fixed. It will not vary based on grammage or rate. Price break-up is not available.'
);

-- Product 6: 4-Piece Kamakshi Deepak Set (Silver Plated)
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
    '4-Piece Kamakshi Deepak Set (Silver Plated)',
    '4-piece-kamakshi-deepak-set',
    'Elevate your pooja décor with this exquisitely handcrafted 4-Piece Kamakshi Deepak Set, designed with traditional temple-style detailing and divine craftsmanship. Each deepak features intricate carvings and a radiant silver-plated finish — perfect for daily rituals, festive décor, or auspicious gifting.',
    12750,
    NULL,
    (SELECT id FROM categories WHERE slug = 'pooja-silver' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Silver Plated',
    'Total approx 840 gm',
    false,
    'Pooja',
    jsonb_build_object(
        'Set Contents', 'Set of 4 Deepaks',
        'Deepak 1', 'Height: 6 inches, Weight: 240 gm',
        'Deepak 2', 'Height: 5.5 inches, Weight: 225 gm',
        'Deepak 3', 'Height: 5.25 inches, Weight: 200 gm',
        'Deepak 4', 'Height: 5.25 inches, Weight: 175 gm',
        'Material', 'Premium Silver Plated',
        'Price Includes', 'GST Included'
    ),
    ARRAY['Store in airtight containers or anti-tarnish bags to minimize tarnish.', 'Wipe gently with a dry, soft cloth to maintain shine and detailing.'],
    ARRAY['Inspired by traditional South Indian Kamakshi deepam design.', 'Ideal for pooja rituals, home mandirs, gifting & festive décor.', 'Sturdy base with fine antique-style craftsmanship.', 'Perfect as a devotional collectible or centerpiece.'],
    'This is a UCP (Uniform Consumer Price) product, and the price is fixed. It does not vary based on grammage or rate. Price break-up is not available.'
);

-- Product 7: Silver Plated Fruit Bowl with 3-Deer Stand (8 x 8 inch)
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
    'Silver Plated Fruit Bowl with 3-Deer Stand (8 x 8 inch)',
    'silver-plated-fruit-bowl-3-deer-stand',
    'Add a touch of luxury and grandeur to your home décor with this stunning Silver Plated Fruit Bowl featuring a 3-Deer Stand. Crafted with exquisite detailing, the bowl sits elegantly atop three beautifully sculpted deer figures, symbolizing grace, strength, and harmony. Perfect as a centerpiece for dining tables, living rooms, or festive décor.',
    6500,
    NULL,
    (SELECT id FROM categories WHERE slug = 'tableware' LIMIT 1),
    'https://via.placeholder.com/600',
    true,
    true,
    true,
    'Premium Silver Plated',
    NULL,
    false,
    'Decor',
    jsonb_build_object(
        'Size', '8 x 8 inches',
        'Material', 'Premium Silver Plated Bowl with Designer Deer Stand',
        'Price Includes', 'GST Included'
    ),
    ARRAY['Store in airtight containers or anti-tarnish bags.', 'Wipe gently using a soft, dry cloth to maintain shine and finish.'],
    ARRAY['Unique triple-deer base adds a majestic and artistic touch.', 'Perfect for serving fruits, dry fruits, chocolates, or as a décor bowl.', 'Handcrafted hammered finish bowl for a rich and elegant look.', 'Ideal for gifting during weddings, festivals, and special occasions.'],
    'This is a UCP (Uniform Consumer Price) product. The price is fixed, and price break-up is not available.'
);
