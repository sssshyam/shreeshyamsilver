# Supabase Integration Guide

## Database Schema

Your Supabase database should have the following tables:

### 1. categories
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. products
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  images TEXT[] NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  purity TEXT NOT NULL,
  weight TEXT NOT NULL,
  hallmark BOOLEAN DEFAULT true,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  specifications JSONB,
  care_instructions TEXT[],
  use_case TEXT CHECK (use_case IN ('Gift', 'Pooja', 'Decor', 'All')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. blog_posts
```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. testimonials
```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Data Format Examples

### Category Example
```json
{
  "slug": "pooja-silver",
  "name": "Pooja Silver",
  "description": "Sacred silverware for your spiritual rituals",
  "image": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop"
}
```

### Product Example
```json
{
  "slug": "silver-pooja-thali-set",
  "name": "Premium Silver Pooja Thali Set",
  "description": "Handcrafted Silver Plated pooja thali with intricate traditional designs.",
  "price": 45000,
  "images": [
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=1200&fit=crop"
  ],
  "category_id": 1,
  "purity": "99.9% Silver Plated",
  "weight": "250 grams",
  "hallmark": true,
  "in_stock": true,
  "featured": true,
  "use_case": "Pooja",
  "specifications": [
    {"label": "Material", "value": "99.9% Silver Plated"},
    {"label": "Weight", "value": "250 grams"},
    {"label": "Diameter", "value": "10 inches"}
  ],
  "care_instructions": [
    "Clean with soft cotton cloth after each use",
    "Store in a dry place away from moisture"
  ]
}
```

### Blog Post Example
```json
{
  "slug": "benefits-of-silver-utensils",
  "title": "The Health Benefits of Using Silver Utensils",
  "excerpt": "Discover the ancient wisdom behind using Silver Plated utensils...",
  "content": "Silver has been used for centuries in Indian households...",
  "image": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=600&fit=crop",
  "author": "Dr. Meera Iyer",
  "date": "2024-11-10",
  "read_time": "5 min read"
}
```

### Testimonial Example
```json
{
  "name": "Priya Sharma",
  "location": "Mumbai",
  "rating": 5,
  "text": "The silver pooja thali exceeded my expectations...",
  "date": "2024-11-15"
}
```

## API Functions

All API functions are in `src/services/api.ts`:

- `getCategories()` - Fetch all categories
- `getProducts()` - Fetch all products with category info
- `getFeaturedProducts()` - Fetch only featured products
- `getProductsByCategory(slug)` - Fetch products by category slug
- `getProductBySlug(slug)` - Fetch single product
- `getCategoryBySlug(slug)` - Fetch single category
- `getBlogPosts()` - Fetch all blog posts
- `getBlogPostBySlug(slug)` - Fetch single blog post
- `getTestimonials()` - Fetch all testimonials

## Environment Variables (Optional)

For better security, you can move credentials to environment variables:

Create `.env` file:
```env
VITE_SUPABASE_URL=https://qzjvmzmnxwiedhpadpad.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Update `src/lib/supabase.ts`:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## Row Level Security (RLS)

For public read access, enable RLS and add policies:

```sql
-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
```

## Uploading Images

### Option 1: Supabase Storage
1. Create a storage bucket in Supabase
2. Upload images
3. Get public URLs
4. Use URLs in your data

### Option 2: External CDN
- Use Cloudinary, AWS S3, or similar
- Store URLs in database

## Testing the Integration

1. Add some test data to your Supabase tables
2. Visit http://localhost:3000/
3. Check browser console for any errors
4. Verify data is loading correctly

## Troubleshooting

### No data showing?
- Check Supabase credentials
- Verify RLS policies allow public read
- Check browser console for errors
- Verify table names match exactly

### Images not loading?
- Ensure image URLs are publicly accessible
- Check CORS settings if using external CDN
- Verify URLs are valid

### Slow loading?
- Add indexes to frequently queried columns
- Enable caching
- Optimize images

## Next Steps

1. **Add more data** to your Supabase tables
2. **Optimize queries** with indexes
3. **Add caching** for better performance
4. **Implement search** functionality
5. **Add admin panel** for content management
