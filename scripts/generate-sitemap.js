
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_URL = 'https://www.shreeshyamsilver.com';

async function generateSitemap() {
    console.log('Generating sitemap...');

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/shop',
        '/about',
        '/contact',
        '/blog',
        // Add other static routes here
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static routes
    staticRoutes.forEach(route => {
        xml += `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
    });

    // 2. Dynamic Routes - Categories
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('slug, updated_at');

    if (catError) {
        console.error('Error fetching categories:', catError);
    } else if (categories) {
        categories.forEach(cat => {
            if (cat.slug) {
                xml += `  <url>
    <loc>${BASE_URL}/category/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
            }
        });
    }

    // 3. Dynamic Routes - Products
    const { data: products, error: prodError } = await supabase
        .from('products')
        .select('slug, updated_at');

    if (prodError) {
        console.error('Error fetching products:', prodError);
    } else if (products) {
        products.forEach(prod => {
            if (prod.slug) {
                xml += `  <url>
    <loc>${BASE_URL}/product/${prod.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
            }
        });
    }

    // 4. Dynamic Routes - Blog Posts (if any)
    const { data: posts, error: postError } = await supabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('is_published', true); // Assuming you have a published flag

    if (postError) {
        // Log but don't fail, maybe table doesn't exist yet
        console.log('Note: Could not fetch blog_posts or table empty/missing.');
    } else if (posts) {
        posts.forEach(post => {
            if (post.slug) {
                xml += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
            }
        });
    }

    xml += `</urlset>`;

    // Write to public/sitemap.xml
    const publicDir = path.resolve(__dirname, '../public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    fs.writeFileSync(sitemapPath, xml);
    console.log(`Sitemap generated at ${sitemapPath}`);
}

generateSitemap();
