
import { Resend } from 'resend';

/**
 * Sends Order Confirmation Emails to Customer and Admin
 * @param {Object} order - The order object
 * @param {Array} items - The order items
 * @param {string} invoiceUrl - Public URL of the invoice PDF
 */
export async function sendOrderEmails(order, items, invoiceUrl) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 1. Send Customer Email
  try {
    const invoiceSection = invoiceUrl
      ? `<div style="text-align: center; margin: 30px 0;">
           <a href="${invoiceUrl}" style="background-color: #D4AF37; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; font-family: sans-serif;">Download Official Invoice</a>
           <p style="margin-top: 10px; font-size: 13px; color: #718096;">Payment ID: ${order.razorpay_payment_id || 'N/A'}</p>
         </div>`
      : `<p style="text-align: center; color: #718096;">Invoice generation in progress.</p>`;

    await resend.emails.send({
      from: 'Shree Shyam Silver <orders@shreeshyamsilver.com>',
      reply_to: 'shreeshyamsilvernokha@gmail.com',
      to: order.customer_email,
      subject: `Payment Receipt: Order #${order.order_number}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Receipt</title>
        </head>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <div style="background-color: #1a202c; color: #ffffff; padding: 30px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px;">PAYMENT RECEIPT</h1>
              <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Shree Shyam Silver</p>
            </div>
            
            <!-- Success Banner -->
            <div style="background-color: #48bb78; color: white; text-align: center; padding: 10px; font-size: 14px; font-weight: bold;">
              PAYMENT SUCCESSFUL
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="margin-top: 0;">Hi ${order.customer_name},</p>
              <p>Thank you for your payment. Your order has been confirmed successfully.</p>
              
              <!-- Order Info Grid -->
              <div style="display: flex; justify-content: space-between; margin: 30px 0; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px;">
                <div style="text-align: left;">
                  <span style="display: block; font-size: 11px; text-transform: uppercase; color: #a0aec0; letter-spacing: 1px;">Order Number</span>
                  <span style="font-weight: bold; color: #2d3748; font-size: 16px;">#${order.order_number}</span>
                </div>
                <div style="text-align: right;">
                  <span style="display: block; font-size: 11px; text-transform: uppercase; color: #a0aec0; letter-spacing: 1px;">Date</span>
                  <span style="font-weight: bold; color: #2d3748; font-size: 16px;">${new Date(order.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <!-- Line Items -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <th style="text-align: left; padding: 10px 0; color: #718096; font-size: 12px; text-transform: uppercase;">Item Description</th>
                    <th style="text-align: right; padding: 10px 0; color: #718096; font-size: 12px; text-transform: uppercase;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(item => `
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 15px 0;">
                      <div style="font-weight: 500; color: #2d3748;">${item.product_name}</div>
                      <div style="font-size: 12px; color: #718096;">Qty: ${item.quantity}</div>
                    </td>
                    <td style="text-align: right; padding: 15px 0; font-weight: 500;">
                      ₹${item.subtotal}
                    </td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Totals -->
              <div style="border-top: 2px solid #2d3748; padding-top: 15px; margin-top: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span style="color: #718096;">Subtotal</span>
                  <span>₹${order.total_amount}</span>
                </div>
                <!-- Add tax/shipping logic here if needed, assuming total is final for now -->
                <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #2d3748; margin-top: 10px;">
                  <span>Total Paid</span>
                  <span>₹${order.total_amount}</span>
                </div>
              </div>

              <!-- Actions -->
              ${invoiceSection}

              <div style="text-align: center; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <p style="font-size: 12px; color: #a0aec0; margin-bottom: 5px;">
                  Questions? Contact us at <a href="mailto:shreeshyamsilvernokha@gmail.com" style="color: #D4AF37; text-decoration: none;">shreeshyamsilvernokha@gmail.com</a>
                </p>
                <p style="font-size: 12px; color: #a0aec0; margin: 0;">
                  This is a computer generated receipt.
                </p>
              </div>

            </div>
          </div>
        </body>
        </html>
      `
    });
    console.log(`✅ Customer Payment Receipt sent to ${order.customer_email}`);
  } catch (error) {
    console.error('❌ Failed to send customer email:', error);
  }

  // 2. Send Admin Email (Formatted HTML as requested)
  const adminEmail = process.env.ADMIN_EMAIL || 'shreeshyamsilvernokha@gmail.com'; // Fallback to user provided email

  try {
    const adminInvoiceSection = invoiceUrl
      ? `<div style="text-align: center; margin-top: 30px;">
            <a href="${invoiceUrl}" style="background-color: #2d3748; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">View Invoice PDF</a>
         </div>`
      : `<p style="text-align: center; margin-top: 30px; color: #718096;">Invoice generation pending or failed.</p>`;

    await resend.emails.send({
      from: 'Shree Shyam Silver Alerts <orders@shreeshyamsilver.com>',
      reply_to: 'shreeshyamsilvernokha@gmail.com',
      to: adminEmail,
      subject: `New Order: #${order.order_number} - Rs. ${order.total_amount}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background-color: #2d3748; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">New Order Received</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">#${order.order_number}</p>
          </div>

          <!-- Content -->
          <div style="padding: 20px;">
            
            <!-- Key Details -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #edf2f7; padding-bottom: 10px;">
              <div>
                <span style="display: block; font-size: 12px; color: #718096;">AMOUNT</span>
                <span style="font-size: 18px; font-weight: bold; color: #2d3748;">Rs. ${order.total_amount}</span>
              </div>
               <div>
                <span style="display: block; font-size: 12px; color: #718096;">DATE</span>
                <span style="font-size: 14px; color: #2d3748;">${new Date(order.created_at).toLocaleString()}</span>
              </div>
            </div>

            <!-- Customer Info -->
            <h3 style="font-size: 14px; text-transform: uppercase; color: #718096; border-bottom: 1px solid #edf2f7; padding-bottom: 5px;">Customer Details</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${order.customer_name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${order.customer_email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${order.customer_phone}</p>
            
            <!-- Shipping Info -->
            <h3 style="font-size: 14px; text-transform: uppercase; color: #718096; border-bottom: 1px solid #edf2f7; padding-bottom: 5px; margin-top: 20px;">Shipping Address</h3>
            <p style="line-height: 1.5; color: #4a5568;">
              ${order.customer_address}<br>
              ${order.customer_city}, ${order.customer_state}<br>
              ${order.customer_pincode}
            </p>

            <!-- Order Items -->
            <h3 style="font-size: 14px; text-transform: uppercase; color: #718096; border-bottom: 1px solid #edf2f7; padding-bottom: 5px; margin-top: 20px;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr style="background-color: #f7fafc; text-align: left;">
                <th style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #4a5568;">Item</th>
                <th style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #4a5568;">Qty</th>
                <th style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #4a5568; text-align: right;">Price</th>
              </tr>
              ${items.map(item => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #edf2f7; color: #2d3748;">${item.product_name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #edf2f7; color: #2d3748;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #edf2f7; color: #2d3748; text-align: right;">Rs. ${item.product_price}</td>
              </tr>
              `).join('')}
              <tr style="font-weight: bold;">
                <td colspan="2" style="padding: 10px; text-align: right; color: #2d3748;">Total</td>
                <td style="padding: 10px; text-align: right; color: #2d3748;">Rs. ${order.total_amount}</td>
              </tr>
            </table>

            <!-- Invoice Link -->
             ${adminInvoiceSection}

          </div>
        </div>
      `
    });
    console.log(`✅ Admin email sent to ${adminEmail}`);
  } catch (error) {
    console.error('❌ Failed to send admin email:', error);
  }
}
