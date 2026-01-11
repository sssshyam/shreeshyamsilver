-- Add image_url column if it doesn't exist
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update category images
UPDATE categories 
SET image_url = '/categories/pooja-and-home-decor.png' 
WHERE slug = 'pooja-and-home-decor';

UPDATE categories 
SET image_url = '/categories/silver-photo-frames.png' 
WHERE slug = 'silver-photo-frames';

UPDATE categories 
SET image_url = '/categories/dry-fruit-box.png' 
WHERE slug = 'dry-fruit-box';

UPDATE categories 
SET image_url = '/categories/silver-candle-and-deepak-stands.png' 
WHERE slug = 'silver-candle-and-deepak-stands';

UPDATE categories 
SET image_url = '/categories/decorative-bowls.png' 
WHERE slug = 'decorative-bowls';

UPDATE categories 
SET image_url = '/categories/resin-decor-items.png' 
WHERE slug = 'resin-decor-items';

-- Insert or Update new categories requested by user
INSERT INTO categories (name, slug, description, image_url)
VALUES 
('Pooja Silver', 'pooja-silver', 'Sacred silver items for your unparalleled devotion', '/categories/pooja-silver.png'),
('Home Decor', 'home-decor', 'Elegant silver artifacts to adorn your living space', '/categories/home-decor.png'),
('Tableware', 'tableware', 'Royal dining experience with silver dinner sets and cutlery', '/categories/tableware.png')
ON CONFLICT (slug) 
DO UPDATE SET image_url = EXCLUDED.image_url;
