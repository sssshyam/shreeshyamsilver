import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjgvwmlsqswtkxeplgbv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqZ3Z3bWxzcXN3dGt4ZXBsZ2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2Mzc5MzQsImV4cCI6MjA4MTIxMzkzNH0.0eCVXUzwPWKShZUXh5ZTFkCflRvevRsQxrwi_veYD34';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
