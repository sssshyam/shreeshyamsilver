-- Add new columns for enhanced product details
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS highlights text[],
ADD COLUMN IF NOT EXISTS note text;

-- Update existing column comments if needed
COMMENT ON COLUMN products.care_instructions IS 'Silver Care instructions';
