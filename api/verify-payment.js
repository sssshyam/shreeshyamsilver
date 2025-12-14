
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Missing required payment details' });
        }

        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret) {
            console.error('RAZORPAY_KEY_SECRET is not set');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Generate the expected signature using HMAC SHA256
        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        // Securely compare signatures
        if (generated_signature === razorpay_signature) {
            // Payment is verified

            // Update Supabase Order Status
            const supabaseUrl = process.env.VITE_SUPABASE_URL;
            const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

            if (supabaseUrl && supabaseKey) {
                const supabase = createClient(supabaseUrl, supabaseKey);

                const { error } = await supabase
                    .from('orders')
                    .update({
                        payment_status: 'paid',
                        status: 'processing', // Move from pending to processing
                        razorpay_payment_id: razorpay_payment_id,
                        updated_at: new Date().toISOString()
                    })
                    .eq('razorpay_order_id', razorpay_order_id);

                if (error) {
                    console.error('Error updating order status:', error);
                    // Note: We still return success to frontend because payment IS successful. 
                    // Backend sync issue should be handled by logs/webhooks.
                }
            }

            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            console.warn(`Signature Validation Failed. Calc: ${generated_signature}, United: ${razorpay_signature}`);
            res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Internal server error during verification' });
    }
}
