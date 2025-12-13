# 🚀 New Supabase Setup Guide

## ✅ What I Did

1. **Updated Supabase credentials** in `src/lib/supabase.ts`
   - New URL: `https://gjgvwmlsqswtkxeplgbv.supabase.co`
   - New anon key configured

2. **Created complete SQL schema** in `supabase-schema.sql`
   - All tables with proper structure
   - Sample data included
   - RLS policies configured
   - Indexes for performance

## 📋 Your Next Steps

### Step 1: Run the SQL Script

1. **Open your new Supabase dashboard**: https://gjgvwmlsqswtkxeplgbv.supabase.co
2. **Go to**: SQL Editor (left sidebar)
3. **Click**: "New query"
4. **Open**: `supabase-schema.sql` file from your project
5. **Copy** the entire contents
6. **Paste** into the SQL Editor
7. **Click**: "Run" button (or press Ctrl+Enter)

### Step 2: Verify the Setup

After running the SQL:

1. **Go to**: Table Editor (left sidebar)
2. **You should see 4 tables**:
   - ✅ `categories` (4 rows)
   - ✅ `products` (6 rows)
   - ✅ `blog_posts` (3 rows)
   - ✅ `testimonials` (4 rows)

### Step 3: Test the Website

1. **Refresh**: http://localhost:3000/
2. **You should see**:
   - 4 categories on homepage
   - 6 featured products
   - 4 testimonials
   - All data loading from new Supabase

## 📊 What's Included

### Categories (4)
1. Pooja Silver
2. Home Decor
3. Gifting
4. Decorative Bowls

### Products (6)
1. Premium Silver Pooja Thali Set - ₹45,000
2. Handcrafted Silver Diya Set - ₹28,000
3. Decorative Silver Bowl - ₹35,000
4. Silver Photo Frame - ₹18,000
5. Royal Silver Serving Tray - ₹52,000
6. Lakshmi Ganesh Silver Coin Set - ₹12,000

All products have:
- ✅ Images
- ✅ Descriptions
- ✅ Specifications
- ✅ Care instructions
- ✅ BIS Hallmark certification
- ✅ Proper categorization

### Blog Posts (3)
1. Benefits of Silver Utensils
2. Caring for Silver Items
3. Silver Gifting Traditions

### Testimonials (4)
- All 5-star reviews
- Real-looking customer feedback

## 🔧 Database Structure

### Tables Created:
```
categories
├── id (primary key)
├── slug (unique)
├── name
├── description
├── image
└── timestamps

products
├── id (primary key)
├── slug (unique)
├── name
├── description
├── price
├── category_id (foreign key)
├── image_url
├── gallery_images (array)
├── is_active
├── is_featured
├── in_stock
├── purity
├── weight
├── hallmark
├── use_case
├── specifications (jsonb)
├── care_instructions (array)
├── meta_description
├── meta_keywords
├── view_count
└── timestamps

blog_posts
├── id (primary key)
├── slug (unique)
├── title
├── excerpt
├── content
├── image
├── author
├── date
├── read_time
└── timestamps

testimonials
├── id (primary key)
├── name
├── location
├── rating
├── text
├── date
└── timestamps
```

## 🔒 Security

- ✅ RLS (Row Level Security) enabled on all tables
- ✅ Public read access policies configured
- ✅ Proper indexes for performance
- ✅ Foreign key constraints

## 🎯 Testing Checklist

After running the SQL, test these pages:

- [ ] **Homepage** (http://localhost:3000/)
  - Categories grid shows 4 items
  - Featured products show 6 items
  - Testimonials show 4 reviews

- [ ] **Shop Page** (http://localhost:3000/shop)
  - All 6 products visible
  - Filters work
  - Sorting works

- [ ] **Category Page** (http://localhost:3000/shop/category/pooja-silver)
  - Shows products in that category
  - Category header displays

- [ ] **Product Detail** (http://localhost:3000/product/silver-pooja-thali-set)
  - Product details load
  - Images display
  - Specifications show
  - Related products appear

- [ ] **Blog** (http://localhost:3000/blog)
  - 3 blog posts show

## 🐛 Troubleshooting

### If no data shows:

1. **Check browser console** (F12)
   - Look for error messages
   - Check network requests

2. **Verify SQL ran successfully**
   - Go to Supabase Table Editor
   - Check if tables have data

3. **Check RLS policies**
   - Go to Authentication → Policies
   - Ensure "Enable read access" policies exist

### If images don't load:

- Images use Unsplash URLs
- They should work immediately
- If not, check internet connection

## 📝 Next Steps

Once everything works:

1. **Add your own products**
   - Go to Supabase Table Editor
   - Click on `products` table
   - Click "Insert row"

2. **Upload your own images**
   - Use Supabase Storage
   - Or use external CDN
   - Update `image_url` field

3. **Customize content**
   - Update categories
   - Add more products
   - Write blog posts

## 🎉 You're Done!

Your new Supabase database is ready with:
- ✅ Complete schema
- ✅ Sample data
- ✅ Security policies
- ✅ Frontend connected

Just run the SQL and refresh your website!
