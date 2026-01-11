
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjgvwmlsqswtkxeplgbv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqZ3Z3bWxzcXN3dGt4ZXBsZ2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2Mzc5MzQsImV4cCI6MjA4MTIxMzkzNH0.0eCVXUzwPWKShZUXh5ZTFkCflRvevRsQxrwi_veYD34';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const email = 'shreeshyamsilvernokha@gmail.com';
const password = 'shreeshyamsilver@#$1234';

async function testAuth() {
    console.log(`Testing auth for ${email}...`);

    // 1. Try to Sign In
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInError) {
        console.error('Sign In Failed:', signInError.message);

        // 2. If Sign In fails, check if we can Sign Up (to see if user exists)
        // If user exists, signUp usually returns data.user with identities, or "User already registered" error depending on config.
        console.log('Attempting check if user exists via SignUp...');
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });

        if (signUpError) {
            console.log('SignUp check result:', signUpError.message);
        } else if (signUpData.user) {
            // If we got a user back, check if it's a new user or existing
            if (signUpData.user.identities && signUpData.user.identities.length === 0) {
                console.log('User exists (SignUp returned user with no specific new identity or similar behavior).');
            } else {
                console.log('User Check: User did NOT exist and has now been created/invited.');
            }
        }
    } else {
        console.log('Sign In Successful!');
        console.log('User ID:', signInData.user.id);
        console.log('Email:', signInData.user.email);
    }
}

testAuth();
