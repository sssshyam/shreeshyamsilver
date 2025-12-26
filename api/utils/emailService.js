
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
              <div style="background-color: #1a202c; color: #ffffff; padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 2px;">INVOICE RECEIVED</h1>
                <p style="margin: 10px 0 0; font-size: 16px;">Shree Shyam Silver</p>
                <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Nokha, Rajasthan | info@shreeshyamsilver.com</p>
              </div>

              <!-- Content -->
              <div style="padding: 40px 30px;">
                
                <!-- Info Columns: Bill To & Order Details -->
                <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
                  
                  <!-- Bill To -->
                  <div style="width: 48%;">
                    <h3 style="font-size: 12px; text-transform: uppercase; color: #a0aec0; letter-spacing: 1px; margin-bottom: 15px;">Bill To</h3>
                    <p style="margin: 0; font-weight: bold; color: #2d3748; font-size: 16px;">${order.customer_name || 'Guest'}</p>
                    <p style="margin: 5px 0 0; color: #4a5568;">${order.customer_email}</p>
                    <p style="margin: 5px 0 0; color: #4a5568;">${order.customer_phone || ''}</p>
                    <p style="margin: 10px 0 0; color: #4a5568; line-height: 1.4;">
                      ${order.customer_address || ''}<br>
                      ${order.customer_city || ''}, ${order.customer_state || ''} ${order.customer_pincode || ''}
                    </p>
                  </div>

                  <!-- Order Details -->
                  <div style="width: 48%; text-align: right;">
                    <h3 style="font-size: 12px; text-transform: uppercase; color: #a0aec0; letter-spacing: 1px; margin-bottom: 15px;">Order Details</h3>
                    
                    <div style="margin-bottom: 10px;">
                      <span style="color: #718096; font-size: 14px;">Order ID:</span>
                      <span style="display: block; font-weight: bold; color: #2d3748; font-size: 16px;">${order.order_number}</span>
                    </div>

                    <div style="margin-bottom: 10px;">
                      <span style="color: #718096; font-size: 14px;">Date:</span>
                      <span style="display: block; font-weight: bold; color: #2d3748; font-size: 16px;">${new Date(order.created_at).toLocaleDateString()}</span>
                    </div>

                    <div>
                      <span style="color: #718096; font-size: 14px;">Payment Method:</span>
                      <span style="display: block; font-weight: bold; color: #2d3748; font-size: 16px;">ONLINE (Razorpay)</span>
                    </div>
                  </div>
                </div>

                <!-- Line Items Table -->
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                  <thead>
                    <tr style="background-color: #f7fafc; border-bottom: 1px solid #e2e8f0;">
                      <th style="text-align: left; padding: 12px 10px; color: #4a5568; font-size: 11px; text-transform: uppercase; font-weight: bold;">Item</th>
                      <th style="text-align: center; padding: 12px 10px; color: #4a5568; font-size: 11px; text-transform: uppercase; font-weight: bold;">Qty</th>
                      <th style="text-align: right; padding: 12px 10px; color: #4a5568; font-size: 11px; text-transform: uppercase; font-weight: bold;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.map(item => `
                    <tr style="border-bottom: 1px solid #edf2f7;">
                      <td style="padding: 15px 10px; color: #2d3748; font-weight: 500;">
                        ${item.product_name}
                      </td>
                      <td style="text-align: center; padding: 15px 10px; color: #4a5568;">
                        ${item.quantity}
                      </td>
                      <td style="text-align: right; padding: 15px 10px; color: #2d3748; font-weight: bold;">
                        ₹${item.subtotal}
                      </td>
                    </tr>
                    `).join('')}
                  </tbody>
                </table>

                <!-- Totals Section -->
                <div style="border-top: 2px solid #e2e8f0; padding-top: 20px;">
                  <div style="display: flex; justify-content: flex-end;">
                    <div style="width: 200px;">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: #718096;">Total Amount:</span>
                        <span style="font-weight: bold; color: #2d3748; font-size: 18px;">₹${order.total_amount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                ${invoiceSection}

                <!-- Footer -->
                <div style="text-align: center; margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 30px;">
                  <p style="font-size: 14px; color: #2d3748; font-weight: medium; margin-bottom: 5px;">
                    Thank you for shopping with Shree Shyam Silver!
                  </p>
                  <p style="font-size: 12px; color: #a0aec0; margin: 0;">
                    Questions? Contact <a href="mailto:info@shreeshyamsilvernokha.com" style="color: #4a5568; text-decoration: none;">info@shreeshyamsilver.com</a>
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
