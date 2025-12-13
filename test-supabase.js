import { supabase } from './src/lib/supabase';

async function testSupabaseConnection() {
    console.log('🔍 Testing Supabase Connection...\n');

    try {
        // Test 1: Fetch Categories
        console.log('1️⃣ Testing Categories...');
        const { data: categories, error: catError } = await supabase
            .from('categories')
            .select('*');

        if (catError) {
            console.error('❌ Categories Error:', catError.message);
        } else {
            console.log(`✅ Categories: Found ${categories?.length || 0} categories`);
            if (categories && categories.length > 0) {
                console.log('   Sample:', categories[0].name);
            }
        }

        // Test 2: Fetch Products
        console.log('\n2️⃣ Testing Products...');
        const { data: products, error: prodError } = await supabase
            .from('products')
            .select('*, category:categories(*)');

        if (prodError) {
            console.error('❌ Products Error:', prodError.message);
        } else {
            console.log(`✅ Products: Found ${products?.length || 0} products`);
            if (products && products.length > 0) {
                console.log('   Sample:', products[0].name);
            }
        }

        // Test 3: Fetch Featured Products
        console.log('\n3️⃣ Testing Featured Products...');
        const { data: featured, error: featError } = await supabase
            .from('products')
            .select('*, category:categories(*)')
            .eq('featured', true);

        if (featError) {
            console.error('❌ Featured Products Error:', featError.message);
        } else {
            console.log(`✅ Featured Products: Found ${featured?.length || 0} featured products`);
        }

        // Test 4: Fetch Testimonials
        console.log('\n4️⃣ Testing Testimonials...');
        const { data: testimonials, error: testError } = await supabase
            .from('testimonials')
            .select('*');

        if (testError) {
            console.error('❌ Testimonials Error:', testError.message);
        } else {
            console.log(`✅ Testimonials: Found ${testimonials?.length || 0} testimonials`);
        }

        // Test 5: Fetch Blog Posts
        console.log('\n5️⃣ Testing Blog Posts...');
        const { data: blogs, error: blogError } = await supabase
            .from('blog_posts')
            .select('*');

        if (blogError) {
            console.error('❌ Blog Posts Error:', blogError.message);
        } else {
            console.log(`✅ Blog Posts: Found ${blogs?.length || 0} blog posts`);
        }

        console.log('\n✨ Connection test complete!\n');

    } catch (error) {
        console.error('💥 Fatal Error:', error);
    }
}

testSupabaseConnection();
