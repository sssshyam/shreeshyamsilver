import { supabase } from '../lib/supabase';
import { Product, Category, BlogPost, Testimonial } from '../types';

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data || [];
}

// Fetch all products with category information
export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('is_active', true)
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data || [];
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }

    return data || [];
}

// Fetch products by category slug
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
    // First, get the category to find its ID
    const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

    if (categoryError || !category) {
        console.error('Error fetching category:', categoryError);
        return [];
    }

    // Then fetch products with that category_id
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('category_id', category.id)
        .eq('is_active', true)
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }

    return data || [];
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
}

// Fetch category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching category:', error);
        return null;
    }

    return data;
}

// Fetch all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }

    return data || [];
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }

    return data;
}

// Fetch all testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }

    return data || [];
}
