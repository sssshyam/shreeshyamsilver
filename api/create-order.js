
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // PHASE 2 FIX: Secure Backend Pricing Calculation
        // We now ignore any 'amount' sent from frontend and calculate it here.
        const { currency = 'INR', receipt, notes, items, user_id, shipping_address } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        // Initialize Supabase
        const supabaseUrl = process.env.VITE_SUPABASE_URL;
        // Use Service Role Key if available to bypass RLS policies for order creation/price checks
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return res.status(500).json({ error: 'Server configuration error (Supabase)' });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // 1. Fetch Real Prices from Database
        // We map both product_id (from refined frontend) or product.id (legacy)
        const productIds = items.map(item => item.product_id || item.product?.id).filter(Boolean);

        const { data: dbProducts, error: productsError } = await supabase
            .from('products')
            .select('id, price, name')
            .in('id', productIds);

        if (productsError || !dbProducts) {
            console.error('Error fetching products from DB:', productsError);
            return res.status(500).json({ error: 'Failed to validate product prices' });
        }

        // 2. Calculate Total Amount Server-Side
        let calculatedTotalAmount = 0;
        const verifiedItems = [];

        for (const item of items) {
            const pId = item.product_id || item.product?.id;
            const dbProduct = dbProducts.find(p => p.id === pId);

            if (!dbProduct) {
                return res.status(400).json({ error: `Product ID ${pId} not found` });
            }

            const qty = item.quantity || 1;
            const unitPrice = Number(dbProduct.price);

            if (isNaN(unitPrice)) {
                return res.status(500).json({ error: `Invalid price for product ${dbProduct.name}` });
            }

            const lineTotal = unitPrice * qty;
            calculatedTotalAmount += lineTotal;

            verifiedItems.push({
                product_id: dbProduct.id,
                product_name: dbProduct.name,
                product_price: unitPrice,
                quantity: qty,
                subtotal: lineTotal
            });
        }

        if (calculatedTotalAmount <= 0) {
            return res.status(400).json({ error: 'Invalid total amount' });
        }

        // Initialize Razorpay
        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            return res.status(500).json({ error: 'Razorpay keys missing on server' });
        }

        const razorpay = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
        });

        // 3. Create Razorpay Order
        const options = {
            amount: Math.round(calculatedTotalAmount * 100), // Convert to paise
            currency: currency,
            receipt: receipt,
            notes: notes,
        };

        const order = await razorpay.orders.create(options);

        // 4. Create Order in Supabase
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert([
                {
                    order_number: orderNumber,
                    user_id: user_id || null,
                    total_amount: calculatedTotalAmount, // Verified amount
                    status: 'pending',
                    payment_status: 'pending',
                    payment_method: 'razorpay',
                    razorpay_order_id: order.id,

                    customer_name: shipping_address ? `${shipping_address.first_name || ''} ${shipping_address.last_name || ''}`.trim() : 'Guest',
                    customer_email: shipping_address?.email || '',
                    customer_phone: shipping_address?.phone || '',
                    customer_address: shipping_address?.address || '',
                    customer_city: shipping_address?.city || '',
                    customer_state: shipping_address?.state || '',
                    customer_pincode: shipping_address?.pincode || '',
                    notes: notes?.order_notes || '',

                    created_at: new Date().toISOString(),
                },
            ])
            .select()
            .single();

        if (orderError) {
            console.error('Error creating Supabase order:', orderError);
            // Don't fail the request if DB insert fails, but log it. 
            // The Razorpay order is valid, so we let the user pay. 
            // We will fix the sync in the webhook.
        } else if (orderData && verifiedItems.length > 0) {
            // 5. Insert Order Items
            const orderItemsToInsert = verifiedItems.map(item => ({
                order_id: orderData.id,
                product_id: item.product_id,
                product_name: item.product_name,
                product_price: item.product_price,
                quantity: item.quantity,
                subtotal: item.subtotal,
                created_at: new Date().toISOString()
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItemsToInsert);

            if (itemsError) {
                console.error('Error creating order items:', itemsError);
            }
        }

        // Return order details to frontend
        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            key_id: key_id
        });

    } catch (error) {
        console.error('Error in create-order handler:', error);

        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object') {
            try {
                errorMessage = JSON.stringify(error);
            } catch (e) {
                errorMessage = 'Circular error object';
            }
        } else {
            errorMessage = String(error);
        }

        res.status(500).json({ error: `Server Error: ${errorMessage}` });
    }
}
