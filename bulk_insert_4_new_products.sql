-- ==========================================
-- BULK INSERT 4 NEW PRODUCTS
-- ==========================================
-- This script inserts 4 specific silver products into the 'products' table.
-- It cleans up any existing products with the same slugs to prevent duplicates.
-- It also ensures the necessary categories exist.
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
    'silver-plated-flower-vase-14.5-inch',
    'silver-plated-radha-krishna-with-cow-16-inch',
    'silver-plated-raja-rani-set-22-inch',
    'silver-plated-oxidised-nakshi-dry-fruit-box-8.5-inch'
);

-- 3. Insert Products
-- ==================

-- Product 1: Silver Plated Flower Vase – Handcrafted Floral Engraved Design (14.5 inch)
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
    is_featured, -- Added to Best Seller
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Silver Plated Flower Vase – Handcrafted Floral Engraved Design (14.5 inch)',
    'silver-plated-flower-vase-14.5-inch',
    'Bring home timeless beauty and artistic craftsmanship with this exquisite Silver Plated Flower Vase. Featuring intricate hand-engraved floral patterns, this vase adds a luxurious and regal touch to any living space — perfect as a centerpiece, décor accent, or an unforgettable gift.',
    24750, -- Price: ₹24,750
    NULL,
    (SELECT id FROM categories WHERE slug = 'home-decor' LIMIT 1),
    'https://via.placeholder.com/600', -- Placeholder Image
    true,
    true,
    true, -- Added to Best Seller section
    'Premium Silver Plated Metal',
    '1650 gm',
    false,
    'Decor',
    jsonb_build_object(
        'Height', '14.5 inches',
        'Weight', '1650 gm',
        'Material', 'Premium Silver Plated Metal',
        'Price Includes', 'GST Included'
    ),
    ARRAY[
        'Store in airtight containers or anti-tarnish bags to preserve shine.',
        'Wipe gently with a dry, soft cloth. Avoid moisture and harsh cleaners.'
    ],
    ARRAY[
        'Stunning floral nakshi work with detailed embossing.',
        'Heavy-weight and premium quality for a rich, antique look.',
        'Ideal for fresh flowers, artificial arrangements, or standalone décor.',
        'Perfect for living rooms, hallways, offices, or luxury gifting.'
    ],
    'This is a UCP (Uniform Consumer Price) product — The price is fixed, and price break-up is not available.'
);

-- Product 2: Silver Plated Radha Krishna with Cow – Premium Handcrafted Idol (16 x 12 x 8 inch)
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
    is_featured, -- Added to Best Seller
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Silver Plated Radha Krishna with Cow – Premium Handcrafted Idol (16 x 12 x 8 inch)',
    'silver-plated-radha-krishna-with-cow-16-inch',
    'Add divine grace and artistic grandeur to your home with this exquisitely handcrafted Silver Plated Radha Krishna Set with Cow (Kamdhenu). Designed with intricate nakshi detailing from head to base, this masterpiece captures the serene beauty of Krishna playing the flute and the symbolic presence of the sacred cow — representing prosperity, love, and spiritual harmony.',
    0, -- Price Missing in prompt. Setting to 0 placeholder. Needs Update.
    NULL,
    (SELECT id FROM categories WHERE slug = 'pooja-silver' LIMIT 1),
    'https://via.placeholder.com/600', -- Placeholder Image
    true,
    true,
    true, -- Added to Best Seller section
    'Premium Silver Plated Metal',
    '5 kg 750 gm',
    false,
    'Pooja',
    jsonb_build_object(
        'Height', '16 inches',
        'Length', '12 inches',
        'Width', '8 inches',
        'Weight', '5 kg 750 gm',
        'Material', 'Premium Silver Plated Metal with Detailed Handcrafted Work'
    ),
    ARRAY[
        'Store in airtight containers or anti-tarnish bags.',
        'Wipe gently with a soft, dry cloth to maintain shine and intricate detailing.',
        'Avoid moisture and harsh cleaning agents.'
    ],
    ARRAY[
        'Stunning craftsmanship with fine carvings on Krishna, Cow, and the pedestal.',
        'Heavy-weight premium idol, ideal for home temples, décor, or luxury gifting.',
        'Vibrant red velvet base enhances the statue’s elegance and richness.',
        'Symbolizes devotion, abundance, peace, and divine protection.',
        'Perfect for weddings, anniversaries, housewarmings & festive gifting.'
    ],
    'This is a UCP (Uniform Consumer Price) product — Price is fixed and price break-up is not available.'
);

-- Product 3: Silver Plated Raja Rani Set – Handcrafted Royal Figurines (22 inch)
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
    is_featured, -- Added to Best Seller
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Silver Plated Raja Rani Set – Handcrafted Royal Figurines (22 inch)',
    'silver-plated-raja-rani-set-22-inch',
    'Bring home the grandeur of Indian royalty with this magnificent Silver Plated Raja Rani Set. Standing tall at 22 inches, these intricately handcrafted figurines showcase rich traditional detailing, royal attire, and impeccable antique silver artistry — making them a statement piece for luxury décor lovers.',
    78750, -- Price: ₹78,750
    NULL,
    (SELECT id FROM categories WHERE slug = 'home-decor' LIMIT 1),
    'https://via.placeholder.com/600', -- Placeholder Image
    true,
    true,
    true, -- Added to Best Seller section
    'Premium Silver Plated Metal',
    '5 kg 250 gm',
    false,
    'Decor',
    jsonb_build_object(
        'Height', '22 inches',
        'Weight', '5 kg 250 gm',
        'Material', 'Premium Silver Plated Metal',
        'Price Includes', 'GST Included'
    ),
    ARRAY[
        'Store in airtight containers or anti-tarnish bags.',
        'Wipe gently with a soft, dry cloth to maintain shine and intricate detailing.',
        'Avoid water and harsh cleaning agents.'
    ],
    ARRAY[
        'Detailed nakshi work on attire, jewelry & royal accessories.',
        'Heavy-weight premium craftsmanship for an opulent look.',
        'Perfect showpiece for living rooms, entryways, offices & luxury décor setups.',
        'Ideal for gifting for weddings, anniversaries & special occasions.',
        'Antique silver finish enhances the regal heritage look.'
    ],
    'This is a UCP (Uniform Consumer Price) product — The price is fixed, and price break-up is not available.'
);

-- Product 4: Silver Plated Oxidised Nakshi Dry Fruit Box – Round Kachola Design (8.5 inch / 1350 gm)
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
    is_featured, -- Added to Best Seller
    purity,
    weight,
    hallmark,
    use_case,
    specifications,
    care_instructions,
    highlights,
    note
) VALUES (
    'Silver Plated Oxidised Nakshi Dry Fruit Box – Round Kachola Design (8.5 inch / 1350 gm)',
    'silver-plated-oxidised-nakshi-dry-fruit-box-8.5-inch',
    'Experience the perfect blend of tradition and luxury with this exquisitely handcrafted Silver Plated Oxidised Nakshi Dry Fruit Box. Designed in a graceful round kachola style, the box features intricate floral and leaf engravings with an oxidised antique finish that adds depth, richness, and timeless elegance.',
    20250, -- Price: ₹20,250
    NULL,
    (SELECT id FROM categories WHERE slug = 'tableware' LIMIT 1),
    'https://via.placeholder.com/600', -- Placeholder Image
    true,
    true,
    true, -- Added to Best Seller section
    'Premium Silver Plated, Oxidised Nakshi Work',
    '1350 gm',
    false,
    'Gift',
    jsonb_build_object(
        'Diameter', '8.5 inches',
        'Height/Radius', '4.75 inches',
        'Weight', '1350 gm',
        'Material', 'Premium Silver Plated, Oxidised Nakshi Work',
        'Price Includes', 'GST Included'
    ),
    ARRAY[
        'Store in airtight containers or anti-tarnish bags.',
        'Wipe gently with a soft dry cloth to maintain shine.',
        'Avoid water and harsh cleaning chemicals.'
    ],
    ARRAY[
        'Hand-engraved nakshi work showcasing traditional artistry.',
        '4 compartments for neat and elegant dry fruit presentation.',
        'Heavy-weight and premium finish, perfect for festive gifting & home décor.',
        'Comes with matching silver spoons for added sophistication.',
        'Ideal for Diwali, weddings, anniversaries, and luxury gifts.'
    ],
    'This is a UCP (Uniform Consumer Price) product — The price is fixed, and price break-up is not available.'
);
