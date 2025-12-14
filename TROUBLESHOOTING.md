# 🔍 Supabase Connection Verification

## Quick Check - Open Your Browser

**Visit: http://localhost:3000/**

### What You Should See:

✅ **Homepage loads** with your categories  
✅ **Featured products** appear in grid  
✅ **Testimonials** show at bottom  
✅ **No loading spinner** stuck on screen  

### If You See Issues:

❌ **Stuck on loading spinner** → Check console for errors  
❌ **"No categories available"** → Check Supabase data  
❌ **"No products available"** → Check table names  
❌ **Blank page** → Check browser console  

---

## Browser Console Check

1. **Open browser** at http://localhost:3000/
2. **Press F12** to open Developer Tools
3. **Click "Console" tab**
4. **Look for errors** (red text)

### Common Errors & Fixes:

#### Error: "relation 'categories' does not exist"
**Fix:** Table name mismatch. Check your Supabase table names.

#### Error: "permission denied for table"
**Fix:** Enable RLS policies:
```sql
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON categories FOR SELECT USING (true);
```

#### Error: "Invalid API key"
**Fix:** Check credentials in `src/lib/supabase.ts`

#### Error: "Failed to fetch"
**Fix:** Check Supabase URL is correct

---

## Verify Your Supabase Setup

### 1. Check Table Names (CRITICAL!)

Go to Supabase → Table Editor

**Required tables:**
- ✅ `categories` (lowercase, plural)
- ✅ `products` (lowercase, plural)
- ✅ `blog_posts` (lowercase, with underscore)
- ✅ `testimonials` (lowercase, plural)

**NOT:**
- ❌ `Categories` (capital C)
- ❌ `category` (singular)
- ❌ `blogposts` (no underscore)

### 2. Check Column Names

#### categories table:
- `id` (integer)
- `slug` (text)
- `name` (text)
- `description` (text)
- `image` (text)

#### products table:
- `id` (integer)
- `slug` (text)
- `name` (text)
- `description` (text)
- `price` (numeric)
- `images` (text array - IMPORTANT!)
- `category_id` (integer)
- `purity` (text)
- `weight` (text)
- `hallmark` (boolean)
- `in_stock` (boolean)
- `featured` (boolean)
- `specifications` (jsonb)
- `care_instructions` (text array)
- `use_case` (text)

### 3. Check Data Format

#### Product images must be an array:
```json
["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
```
**NOT:** `"https://example.com/image.jpg"` (single string)

#### Specifications must be JSONB:
```json
[
  {"label": "Material", "value": "99.9% Silver Plated"},
  {"label": "Weight", "value": "250 grams"}
]
```

#### Care instructions must be text array:
```json
["Clean with soft cloth", "Store in dry place"]
```

### 4. Enable RLS Policies

Run this SQL in Supabase SQL Editor:

```sql
-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Enable read access for all users" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON testimonials
  FOR SELECT USING (true);
```

---

## Test Each Page

### Homepage (/)
Should show:
- Categories grid (4 items)
- Featured products
- Testimonials
- Trust indicators

### Shop (/shop)
Should show:
- All products in grid
- Filters on left (desktop)
- Sorting dropdown

### Product Detail (/product/your-product-slug)
Should show:
- Product images
- Price, purity, weight
- Add to cart button
- Specifications
- Related products

### Category (/shop/category/your-category-slug)
Should show:
- Category header with image
- Products in that category

---

## Debug Steps

### Step 1: Check Supabase Dashboard
1. Go to Supabase dashboard
2. Click "Table Editor"
3. Verify you have data in:
   - categories (at least 1 row)
   - products (at least 1 row)

### Step 2: Check Browser Network Tab
1. Open browser at http://localhost:3000/
2. Press F12 → Network tab
3. Refresh page
4. Look for requests to Supabase
5. Click on them to see response

**If response is empty:** Check RLS policies  
**If response has error:** Check table/column names  
**If no requests:** Check Supabase credentials  

### Step 3: Check Console Logs
The app logs errors to console:
- "Error fetching categories:" → Categories issue
- "Error fetching products:" → Products issue
- "Error fetching testimonials:" → Testimonials issue

### Step 4: Verify Credentials
Check `src/lib/supabase.ts`:
```typescript
const supabaseUrl = 'https://qzjvmzmnxwiedhpadpad.supabase.co';
const supabaseAnonKey = 'eyJhbGc...'; // Your key
```

---

## Common Issues & Solutions

### Issue: "No categories available"
**Causes:**
1. No data in categories table
2. RLS blocking access
3. Table name wrong

**Fix:**
1. Add data to Supabase
2. Enable RLS policy
3. Check table is named `categories` (lowercase)

### Issue: Products show but no images
**Causes:**
1. Images field is not an array
2. Image URLs are broken
3. CORS issue

**Fix:**
1. Make sure images is `text[]` type
2. Use public image URLs
3. Check image URLs work in browser

### Issue: Featured products not showing
**Causes:**
1. No products have `featured = true`
2. Column name is wrong

**Fix:**
1. Set some products to featured in Supabase
2. Check column is named `featured` (lowercase)

### Issue: Category filter not working
**Causes:**
1. Products missing `category_id`
2. Foreign key not set up

**Fix:**
1. Add category_id to all products
2. Set up foreign key relationship

---

## Quick Fixes

### Fix 1: Reset RLS Policies
```sql
-- Drop all policies
DROP POLICY IF EXISTS "Public read" ON categories;
DROP POLICY IF EXISTS "Public read" ON products;
DROP POLICY IF EXISTS "Public read" ON blog_posts;
DROP POLICY IF EXISTS "Public read" ON testimonials;

-- Recreate
CREATE POLICY "Public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON products FOR SELECT USING (true);
CREATE POLICY "Public read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (true);
```

### Fix 2: Check Foreign Key
```sql
-- Add foreign key if missing
ALTER TABLE products
ADD CONSTRAINT products_category_id_fkey
FOREIGN KEY (category_id)
REFERENCES categories(id);
```

### Fix 3: Fix Image Format
If images are stored as single string, convert to array:
```sql
UPDATE products
SET images = ARRAY[images::text]
WHERE images IS NOT NULL;
```

---

## Success Checklist

✅ Tables exist in Supabase  
✅ Tables have correct names (lowercase)  
✅ Columns have correct names (snake_case)  
✅ Data exists in tables  
✅ RLS policies enabled  
✅ Images are arrays  
✅ Specifications are JSONB  
✅ Foreign keys set up  
✅ Browser shows data  
✅ No console errors  

---

## Still Having Issues?

1. **Check browser console** for specific error messages
2. **Check Supabase logs** in dashboard
3. **Verify table structure** matches schema in SUPABASE_GUIDE.md
4. **Test Supabase directly** using their SQL editor
5. **Check network requests** in browser DevTools

---

**Once everything is working, you should see your real products, categories, and testimonials on the website!** 🎉
