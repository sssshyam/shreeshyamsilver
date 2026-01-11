# 📝 How to Upload 4 New Products to Supabase

## 🎯 What This SQL Does

This SQL script will add:
- ✅ **4 New Products** to your database (Vase, Radha Krishna, Raja Rani, Dry Fruit Box)
- ✅ **Ensures Categories Exist** (Home Decor, Pooja Silver, Tableware)
- ✅ **Adds to Best Sellers** (All 4 products are marked as featured)

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard.
2. Click **"SQL Editor"** in the left sidebar.
3. Click **"New query"**.

### Step 2: Copy and Paste SQL

1. Open the file: `bulk_insert_4_new_products.sql`
2. **Copy ALL the SQL** (Ctrl+A, Ctrl+C)
3. **Paste** into Supabase SQL Editor (Ctrl+V)

### Step 3: Check the Price for Item 2

⚠️ **IMPORTANT:** The product **"Silver Plated Radha Krishna with Cow"** did not have a price in your request.
- In the SQL script, I set its price to `0`.
- **Before running**, look for line ~98: `price, -- Price Missing in prompt. Setting to 0 placeholder.`
- Change `0` to the actual price (e.g., `450000`) if you know it, OR update it later in the Admin Panel.

### Step 4: Run the SQL

1. Click the **"Run"** button (or press Ctrl+Enter).
2. Wait for execution (should take 1-2 seconds).
3. You should see: "Success. No rows returned".

## ✅ What Gets Created

### Products (4):
1. **Silver Plated Flower Vase** (Home Decor) - ₹24,750
2. **Silver Plated Radha Krishna with Cow** (Pooja Silver) - Price needed update (currently 0)
3. **Silver Plated Raja Rani Set** (Home Decor) - ₹78,750
4. **Silver Plated Oxidised Nakshi Dry Fruit Box** (Tableware) - ₹20,250

## 🌐 Check on Website

### Homepage:
- Go to: http://localhost:3000/
- You should see these products in the **"Best Sellers"** / **"Featured Collection"** section.

### Shop Page:
- Go to the respective category pages (Home Decor, Pooja Silver) to see them listed.

