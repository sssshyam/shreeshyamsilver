-- Create wishlist table
CREATE TABLE IF NOT EXISTS public.wishlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- Policies (Matching existing insecure pattern due to custom auth implementation)
-- Ideally this should reference auth.uid() but the current auth system does not use Supabase Auth
CREATE POLICY "Public access to wishlist" 
ON public.wishlist FOR ALL 
USING (true)
WITH CHECK (true);
