-- ============================================
-- SUPABASE STORAGE BUCKETS SETUP
-- Complete image storage solution for admin uploads
-- ============================================

-- Step 1: Create Storage Buckets
-- ============================================

-- Create bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- Create bucket for category images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'category-images',
  'category-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

-- Create bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

-- Step 2: Storage Policies for Product Images
-- ============================================

-- Policy 1: Allow public to view product images
DROP POLICY IF EXISTS "Public Access to Product Images" ON storage.objects;
CREATE POLICY "Public Access to Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Policy 2: Allow authenticated users to upload product images
DROP POLICY IF EXISTS "Authenticated Upload Product Images" ON storage.objects;
CREATE POLICY "Authenticated Upload Product Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Policy 3: Allow authenticated users to update product images
DROP POLICY IF EXISTS "Authenticated Update Product Images" ON storage.objects;
CREATE POLICY "Authenticated Update Product Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

-- Policy 4: Allow authenticated users to delete product images
DROP POLICY IF EXISTS "Authenticated Delete Product Images" ON storage.objects;
CREATE POLICY "Authenticated Delete Product Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- Step 3: Storage Policies for Category Images
-- ============================================

-- Policy 1: Allow public to view category images
DROP POLICY IF EXISTS "Public Access to Category Images" ON storage.objects;
CREATE POLICY "Public Access to Category Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'category-images');

-- Policy 2: Allow authenticated users to upload category images
DROP POLICY IF EXISTS "Authenticated Upload Category Images" ON storage.objects;
CREATE POLICY "Authenticated Upload Category Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'category-images');

-- Policy 3: Allow authenticated users to update category images
DROP POLICY IF EXISTS "Authenticated Update Category Images" ON storage.objects;
CREATE POLICY "Authenticated Update Category Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'category-images');

-- Policy 4: Allow authenticated users to delete category images
DROP POLICY IF EXISTS "Authenticated Delete Category Images" ON storage.objects;
CREATE POLICY "Authenticated Delete Category Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'category-images');

-- Step 4: Storage Policies for Blog Images
-- ============================================

-- Policy 1: Allow public to view blog images
DROP POLICY IF EXISTS "Public Access to Blog Images" ON storage.objects;
CREATE POLICY "Public Access to Blog Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Policy 2: Allow authenticated users to upload blog images
DROP POLICY IF EXISTS "Authenticated Upload Blog Images" ON storage.objects;
CREATE POLICY "Authenticated Upload Blog Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Policy 3: Allow authenticated users to update blog images
DROP POLICY IF EXISTS "Authenticated Update Blog Images" ON storage.objects;
CREATE POLICY "Authenticated Update Blog Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Policy 4: Allow authenticated users to delete blog images
DROP POLICY IF EXISTS "Authenticated Delete Blog Images" ON storage.objects;
CREATE POLICY "Authenticated Delete Blog Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

-- Step 5: Additional Policies for Anonymous Upload (Optional)
-- ============================================
-- If you want to allow uploads without authentication (not recommended for production)

-- Uncomment these if needed:
/*
DROP POLICY IF EXISTS "Anyone Can Upload Product Images" ON storage.objects;
CREATE POLICY "Anyone Can Upload Product Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Anyone Can Delete Product Images" ON storage.objects;
CREATE POLICY "Anyone Can Delete Product Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
*/

-- Step 6: Helper Function to Get Public URL
-- ============================================

CREATE OR REPLACE FUNCTION get_public_url(bucket_name TEXT, file_path TEXT)
RETURNS TEXT AS $$
DECLARE
  base_url TEXT;
BEGIN
  -- Get Supabase project URL from environment
  base_url := current_setting('app.settings.supabase_url', true);
  
  IF base_url IS NULL THEN
    base_url := 'https://gjgvwmlsqswtkxeplgbv.supabase.co';
  END IF;
  
  RETURN base_url || '/storage/v1/object/public/' || bucket_name || '/' || file_path;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Trigger to Auto-Update Product Updated_At
-- ============================================

CREATE OR REPLACE FUNCTION update_product_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_product_timestamp_trigger ON products;
CREATE TRIGGER update_product_timestamp_trigger
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_product_timestamp();

-- Step 8: Trigger to Auto-Update Category Updated_At
-- ============================================

CREATE OR REPLACE FUNCTION update_category_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_category_timestamp_trigger ON categories;
CREATE TRIGGER update_category_timestamp_trigger
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_category_timestamp();

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if buckets were created
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id IN ('product-images', 'category-images', 'blog-images')
ORDER BY id;

-- Check storage policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
ORDER BY policyname;

-- Test public URL generation
SELECT get_public_url('product-images', 'test-image.jpg') as sample_url;

-- ============================================
-- USAGE EXAMPLES
-- ============================================

-- Example 1: Get public URL for a product image
-- SELECT get_public_url('product-images', 'deepak-set-001.jpg');

-- Example 2: List all files in product-images bucket
-- SELECT * FROM storage.objects WHERE bucket_id = 'product-images';

-- Example 3: Delete a specific image
-- DELETE FROM storage.objects 
-- WHERE bucket_id = 'product-images' 
-- AND name = 'old-image.jpg';

-- ============================================
-- IMPORTANT NOTES
-- ============================================

/*
BUCKET CONFIGURATION:
- product-images: 10MB limit, supports JPEG, PNG, WebP, GIF
- category-images: 5MB limit, supports JPEG, PNG, WebP
- blog-images: 5MB limit, supports JPEG, PNG, WebP

PUBLIC ACCESS:
- All buckets are PUBLIC (anyone can view)
- Only authenticated users can upload/delete
- Perfect for e-commerce product images

FILE NAMING CONVENTION:
- Use descriptive names: product-name-001.jpg
- Avoid spaces, use hyphens
- Include product ID for uniqueness
- Example: kamakshi-deepak-set-12345-001.jpg

ADMIN PANEL INTEGRATION:
- Upload images via AdminProductFormPage
- Images automatically get public URLs
- URLs stored in products.image_url and products.gallery_images
- Frontend displays images automatically

FRONTEND DISPLAY:
- Images are publicly accessible
- No authentication needed to view
- Fast CDN delivery
- Automatic optimization by Supabase
*/

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Storage buckets created successfully!';
  RAISE NOTICE '✅ All policies configured!';
  RAISE NOTICE '✅ Triggers set up!';
  RAISE NOTICE '';
  RAISE NOTICE '📦 Buckets created:';
  RAISE NOTICE '   - product-images (10MB limit)';
  RAISE NOTICE '   - category-images (5MB limit)';
  RAISE NOTICE '   - blog-images (5MB limit)';
  RAISE NOTICE '';
  RAISE NOTICE '🔒 Security:';
  RAISE NOTICE '   - Public read access (anyone can view)';
  RAISE NOTICE '   - Authenticated write access (only logged-in users can upload)';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Ready to upload images from admin panel!';
  RAISE NOTICE '   Images will automatically appear on frontend!';
END $$;
