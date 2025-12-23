
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase URL or Key in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
    console.log('🔄 Creating Admin User...');

    // Credentials from AdminContext
    const email = 'shreeshyamsilvernokha@gmail.com';
    const password = 'shreeshyamsilver@#$1234';

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: 'admin',
                name: 'Admin'
            }
        }
    });

    if (error) {
        console.error('❌ Error creating user:', error.message);
    } else {
        console.log('✅ User created successfully!');
        if (data.session) {
            console.log('🎉 Auto-login successful! You are ready.');
        } else if (data.user) {
            console.log('📧 Confirmation email sent to ' + email);
            console.log('👉 Please check your email and confirm to activate the account.');
            console.log('   (If you have disabled Email Confirmations in Supabase, you are good to go!)');
        }
    }
}

createAdmin();
