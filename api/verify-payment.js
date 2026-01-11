
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { generateInvoicePDF } from './utils/invoiceGenerator.js';
import { sendOrderEmails } from './utils/emailService.js';

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
            // Use Service Role Key if available to bypass RLS policies for updates
            const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

            if (supabaseUrl && supabaseKey) {
                const supabase = createClient(supabaseUrl, supabaseKey);

                // 1. Update Order Status
                const { data: order, error } = await supabase
                    .from('orders')
                    .update({
                        payment_status: 'paid',
                        status: 'processing', // Move from pending to processing
                        razorpay_payment_id: razorpay_payment_id,
                        updated_at: new Date().toISOString()
                    })
                    .eq('razorpay_order_id', razorpay_order_id)
                    .select('*, order_items(*)')
                    .single();

                if (error || !order) {
                    console.error('Error updating order status:', error);
                    // Note: We still return success to frontend because payment IS successful. 
                    // Backend sync issue should be handled by logs/webhooks.
                } else {
                    // 2. IMMEDIATE ACTION: Generate Invoice & Send Email
                    // This creates redundancy so user gets email even if webhook fails/delays

                    try {
                        console.log('Processing post-payment actions immediately...');

                        // A. Generate Invoice if needed
                        let invoiceUrl = order.invoice_url;
                        if (!invoiceUrl) {
                            try {
                                const pdfBytes = await generateInvoicePDF(order, order.order_items);
                                const fileName = `invoice-${order.order_number}.pdf`;

                                const { error: uploadError } = await supabase
                                    .storage
                                    .from('invoices')
                                    .upload(fileName, pdfBytes, {
                                        contentType: 'application/pdf',
                                        upsert: true
                                    });

                                if (!uploadError) {
                                    const { data: { publicUrl } } = supabase
                                        .storage
                                        .from('invoices')
                                        .getPublicUrl(fileName);

                                    invoiceUrl = publicUrl;

                                    // Update order with invoice URL
                                    await supabase
                                        .from('orders')
                                        .update({ invoice_url: invoiceUrl, invoice_generated: true })
                                        .eq('id', order.id);
                                }
                            } catch (invError) {
                                console.error('Invoice generation warning:', invError);
                            }
                        }

                        // B. Send Email if not sent
                        if (!order.email_sent) {
                            await sendOrderEmails(order, order.order_items, invoiceUrl);

                            await supabase
                                .from('orders')
                                .update({ email_sent: true })
                                .eq('id', order.id);

                            console.log('✅ Backup email sent successfully');
                        }

                    } catch (postProcessError) {
                        // Don't fail the request if email fails, just log it
                        console.error('Post-payment processing error:', postProcessError);
                    }
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
