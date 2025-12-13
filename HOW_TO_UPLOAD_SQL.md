# 📝 How to Upload Categories and Product to Supabase

## 🎯 What This SQL Does

This SQL script will add:
- ✅ **6 Categories** to your database
- ✅ **1 Product** (4-Piece Kamakshi Deepak Set) with full details

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

1. Go to: https://gjgvwmlsqswtkxeplgbv.supabase.co
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**

### Step 2: Copy and Paste SQL

1. Open the file: `insert-categories-and-product.sql`
2. **Copy ALL the SQL** (Ctrl+A, Ctrl+C)
3. **Paste** into Supabase SQL Editor (Ctrl+V)

### Step 3: Run the SQL

1. Click the **"Run"** button (or press Ctrl+Enter)
2. Wait for execution (should take 1-2 seconds)
3. You should see: "Success. No rows returned"

### Step 4: Verify Data Was Inserted

Scroll down in the SQL editor and you'll see verification queries that show:
- List of all categories
- The Kamakshi Deepak Set product details
- Product count per category

## ✅ What Gets Created

### Categories (6):
1. **Pooja & Home Decor** - `pooja-home-decor`
2. **Silver Photo Frames** - `silver-photo-frames`
3. **Dry Fruit Box** - `dry-fruit-box`
4. **Silver Candle & Deepak Stands** - `silver-candle-deepak-stands`
5. **Decorative Bowls** - `decorative-bowls`
6. **Resin Decor Items** - `resin-decor-items`

### Product (1):
**4-Piece Kamakshi Deepak Set (Silver Plated)**
- Price: ₹12,750
- Category: Pooja & Home Decor
- Status: Active & Featured
- 4 Images included
- Complete specifications for all 4 deepaks
- Care instructions included

## 🔍 Check in Admin Panel

After running the SQL:

### View Categories:
1. Login to admin: http://localhost:3000/adminshreeshyamsilvernokha/login
2. Click **"Categories"** in sidebar
3. You should see **6 categories**

### View Product:
1. Click **"Products"** in sidebar
2. You should see **1 product** (Kamakshi Deepak Set)
3. Click on it to see all details

## 🌐 Check on Website

### Homepage:
- Go to: http://localhost:3000/
- You should see:
  - 6 categories in the categories section
  - Kamakshi Deepak Set in featured products (because `is_featured = true`)

### Category Page:
- Go to: http://localhost:3000/shop/category/pooja-home-decor
- You should see the Kamakshi Deepak Set

### Product Page:
- Go to: http://localhost:3000/product/4-piece-kamakshi-deepak-set-silver-plated
- You should see full product details with:
  - 4 images
  - All specifications
  - Care instructions
  - Price: ₹12,750

## 📊 Product Details Included

The SQL includes everything you provided:

**Specifications:**
- Material: Premium Silver Plated
- Set Includes: 4 Pieces
- Total Weight: 840 grams
- Deepak 1: 240 gm, 6 inches
- Deepak 2: 225 gm, 5.5 inches
- Deepak 3: 200 gm, 5.25 inches
- Deepak 4: 175 gm, 5.25 inches
- Design Style: Traditional South Indian Kamakshi
- Finish: Antique-style craftsmanship
- Price Type: UCP (Uniform Consumer Price)
- GST: Included in price

**Care Instructions:**
- Store in airtight containers or anti-tarnish bags
- Wipe gently with a dry, soft cloth
- Avoid exposure to moisture and chemicals
- Clean after each use
- Polish occasionally with silver cleaner

**Highlights:**
- Inspired by traditional South Indian Kamakshi deepam design
- Ideal for pooja rituals, home mandirs, gifting & festive décor
- Sturdy base with fine antique-style craftsmanship
- Perfect as a devotional collectible or centerpiece

## 🎉 Success Indicators

After running the SQL, you should see:

✅ **In Admin Panel:**
- Dashboard shows: 6 categories, 1 product
- Categories page shows all 6 categories
- Products page shows Kamakshi Deepak Set

✅ **On Website:**
- Homepage shows 6 categories
- Homepage shows Kamakshi Deepak Set in featured products
- Category page "Pooja & Home Decor" shows the product
- Product detail page shows all information

## 🐛 Troubleshooting

### If categories don't appear:
- Check Table Editor → categories table
- Verify 6 rows exist

### If product doesn't appear:
- Check Table Editor → products table
- Verify `is_active = true`
- Verify `category_id` is set

### If product not on homepage:
- Check `is_featured = true` in products table
- Refresh the page (Ctrl+F5)

## 📝 Next Steps

After verifying everything works:
1. You can add more products via Admin Panel
2. Upload real product images via Admin Panel
3. Edit product details as needed
4. Add more categories if required

---

**Run the SQL now and watch your categories and product appear!** 🚀
