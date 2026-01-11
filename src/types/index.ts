// Supabase Database Types - Updated to match YOUR actual database
export interface Product {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    category_id?: number;
    category?: Category;

    // Your actual columns
    image_url?: string;
    gallery_images?: string[];
    is_active: boolean;
    is_featured: boolean;
    meta_description?: string;
    meta_keywords?: string;
    view_count?: number;
    created_at?: string;
    updated_at?: string;

    // Additional fields that might exist
    purity?: string;
    weight?: string;
    hallmark?: boolean;
    in_stock?: boolean;
    specifications?: {
        label: string;
        value: string;
    }[];
    care_instructions?: string[];
    use_case?: 'Gift' | 'Pooja' | 'Decor' | 'All';
    highlights?: string[];
    note?: string;

    // Dimensions & Sizing
    size?: string;
    length?: string;
    width?: string;
    height?: string;
    dimensions?: string;
    diameter?: string;
}

export interface Category {
    id: number;
    slug: string;
    name: string;
    description?: string;
    image?: string;
    image_url?: string;
    created_at?: string;
    updated_at?: string;
}

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    image?: string;
    author?: string;
    date?: string;
    is_published?: boolean;
    read_time?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Testimonial {
    id: number;
    name: string;
    location?: string;
    rating: number;
    text: string;
    date?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
