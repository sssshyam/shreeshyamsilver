import { createClient } from '@supabase/supabase-js';

// Fallback to hardcoded values for local development if .env is missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gjgvwmlsqswtkxeplgbv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqZ3Z3bWxzcXN3dGt4ZXBsZ2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2Mzc5MzQsImV4cCI6MjA4MTIxMzkzNH0.0eCVXUzwPWKShZUXh5ZTFkCflRvevRsQxrwi_veYD34';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. App may not function correctly.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
