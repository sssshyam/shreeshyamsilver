-- ============================================
-- AUTOMATED ORDER SYSTEM - MIGRATION
-- ============================================

-- 1. Update Orders Table
-- Add columns for Invoice and Email matching
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS invoice_url TEXT,
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS invoice_generated BOOLEAN DEFAULT FALSE;

-- 2. Create Storage Bucket for Invoices
-- We use a secure bucket, but for simplicity of access via email link, we might make it public 
-- OR use signed URLs. For this implementation, we will use a PUBLIC bucket for easy access 
-- from the email link, as signed URLs expire.
-- NOTE: In a strict enterprise app, this should be private + signed URLs.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'invoices',
  'invoices',
  true,
  2097152, -- 2MB limit
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['application/pdf'];

-- 3. Storage Policies for Invoices

-- Policy 1: Public Read Access (for email links)
DROP POLICY IF EXISTS "Public Access to Invoices" ON storage.objects;
CREATE POLICY "Public Access to Invoices"
ON storage.objects FOR SELECT
USING (bucket_id = 'invoices');

-- Policy 2: Backend/Admin Upload Access
-- We'll allow authenticated users (which includes our Service Role if used correctly, 
-- or any logged in user for this specific simplified implementation) to upload.
-- Ideally, we should restrict this to service_role only, but Supabase Client triggers often use public/authenticated roles.
DROP POLICY IF EXISTS "Authenticated Upload Invoices" ON storage.objects;
CREATE POLICY "Authenticated Upload Invoices"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'invoices');

-- Policy 3: Authenticated Update/Delete
DROP POLICY IF EXISTS "Authenticated Manage Invoices" ON storage.objects;
CREATE POLICY "Authenticated Manage Invoices"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'invoices');
