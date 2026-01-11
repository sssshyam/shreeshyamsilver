-- Add dimensions columns to the products table
ALTER TABLE products
ADD COLUMN size TEXT,
ADD COLUMN length TEXT,
ADD COLUMN width TEXT,
ADD COLUMN height TEXT,
ADD COLUMN dimensions TEXT,
ADD COLUMN diameter TEXT;

-- Comment on columns for clarity
COMMENT ON COLUMN products.size IS 'General size description (e.g., "Large", "14 inch")';
COMMENT ON COLUMN products.length IS 'Length of the product';
COMMENT ON COLUMN products.width IS 'Width of the product';
COMMENT ON COLUMN products.height IS 'Height of the product';
COMMENT ON COLUMN products.dimensions IS 'Combined dimensions string (e.g. "10x10x5")';
COMMENT ON COLUMN products.diameter IS 'Diameter for round objects';
