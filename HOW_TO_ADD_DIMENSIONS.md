# How to Add Dimensions Columns to Your Database

To enable the new Dimensions & Sizing features in your Admin Panel, you need to update your database schema.

1.  Go to your **Supabase Dashboard**.
2.  Open the **SQL Editor**.
3.  Click **New Query**.
4.  Copy and paste the following SQL code:

```sql
-- Add dimensions columns to the products table
ALTER TABLE products
ADD COLUMN size TEXT,
ADD COLUMN length TEXT,
ADD COLUMN width TEXT,
ADD COLUMN height TEXT,
ADD COLUMN dimensions TEXT,
ADD COLUMN diameter TEXT;
```

5.  Click **Run**.
6.  Once successful, your database is ready!
