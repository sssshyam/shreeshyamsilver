# 🔍 Quick Fix Guide - Category Page Blank

## The Problem
You're seeing a blank page at `/shop/category/decorative-bowls`

## Most Likely Causes

### 1. Category doesn't exist with that slug
**Check:** Go to Supabase → `categories` table
- Look for a row with `slug = 'decorative-bowls'`
- If it doesn't exist, that's your problem!

**Fix:** Either:
- Create a category with slug `decorative-bowls`
- Or use the correct slug from your existing categories

### 2. No products linked to that category
**Check:** Go to Supabase → `products` table
- Find the category ID for "decorative-bowls"
- Check if any products have that `category_id`

**Fix:** Update products to have the correct `category_id`

### 3. RLS Policy blocking access
**Check:** Supabase → Authentication → Policies
- Make sure `categories` table has public read policy
- Make sure `products` table has public read policy

**Fix:** Run this SQL:
```sql
CREATE POLICY "Public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON products FOR SELECT USING (true);
```

## How to Debug

### Step 1: Open Browser Console
1. Go to http://localhost:3000/shop/category/decorative-bowls
2. Press **F12** to open DevTools
3. Click **Console** tab
4. Look for these messages:

**You should see:**
```
🔍 Fetching category: decorative-bowls
📦 Category data: {id: 1, slug: 'decorative-bowls', name: '...'}
📦 Products data: [{...}, {...}]
```

**If you see:**
```
📦 Category data: null
```
→ Category doesn't exist in database!

**If you see:**
```
📦 Products data: []
```
→ No products linked to this category!

### Step 2: Check Your Categories
Run this in Supabase SQL Editor:
```sql
SELECT id, slug, name FROM categories;
```

This shows all your categories and their slugs.

### Step 3: Check Products for That Category
```sql
-- First find the category ID
SELECT id FROM categories WHERE slug = 'decorative-bowls';

-- Then check products (replace X with the ID from above)
SELECT id, name, category_id FROM products WHERE category_id = X;
```

## Quick Fixes

### Fix 1: Create the Category
```sql
INSERT INTO categories (slug, name, description, image)
VALUES (
  'decorative-bowls',
  'Decorative Bowls',
  'Beautiful silver bowls for decoration',
  'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=800&fit=crop'
);
```

### Fix 2: Link Products to Category
```sql
-- Get the category ID
SELECT id FROM categories WHERE slug = 'decorative-bowls';

-- Update products (replace X with category ID)
UPDATE products 
SET category_id = X 
WHERE id IN (1, 2, 3); -- Replace with your product IDs
```

### Fix 3: Check What Categories Exist
Go to http://localhost:3000/shop and see what categories appear.
Then use those slugs in your URL.

## Testing

After making changes:

1. **Refresh the page**: http://localhost:3000/shop/category/decorative-bowls
2. **Check console**: Should see category and products data
3. **Verify**: Category header and products should appear

## Common Mistakes

❌ **Wrong slug format**
- URL: `/shop/category/Decorative Bowls` (with spaces/capitals)
- Should be: `/shop/category/decorative-bowls` (lowercase, hyphens)

❌ **Category exists but wrong slug**
- Database has: `slug = 'bowls'`
- URL uses: `/shop/category/decorative-bowls`
- They must match exactly!

❌ **Products not linked**
- Products exist but `category_id` is NULL or wrong
- Update products to have correct `category_id`

## What the Code Does Now

1. **Fetches category** by slug from database
2. **Logs to console** what it found
3. **Shows error message** if category not found
4. **Fetches products** that have matching `category_id`
5. **Displays products** or "no products" message

## Next Steps

1. **Open browser console** (F12)
2. **Visit the category page**
3. **Read the console logs** - they tell you exactly what's wrong
4. **Fix the issue** in Supabase
5. **Refresh the page**

---

**The page should now show helpful error messages and console logs to help you debug!** 🎯
