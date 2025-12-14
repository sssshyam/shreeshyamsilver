-- ==========================================
-- UPDATE BEST SELLERS LIST (4 New Products Only)
-- ==========================================
-- This script will:
-- 1. Reset 'is_featured' to FALSE for ALL products.
-- 2. Enable 'is_featured' ONLY for the 4 newly added products.
-- ==========================================

-- 1. Remove "Featured" Status from ALL products
UPDATE products 
SET is_featured = false;

-- 2. Set "Featured" Status for the 4 New Products
UPDATE products 
SET is_featured = true 
WHERE slug IN (
    'silver-plated-flower-vase-14.5-inch',
    'silver-plated-radha-krishna-with-cow-16-inch',
    'silver-plated-raja-rani-set-22-inch',
    'silver-plated-oxidised-nakshi-dry-fruit-box-8.5-inch'
);

-- 3. Verify the changes (Optional view for user)
-- This will return the list of currently featured products to confirm only 4 exist.
SELECT name, is_featured FROM products WHERE is_featured = true;
