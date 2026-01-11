
-- Update Orders Table to support Razorpay
ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT;

-- ensure order_number can be non-generated if we want to use razorpay id, 
-- or we will just insert it from the backend.
