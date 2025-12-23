
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
    await resend.emails.send({
      from: 'Shree Shyam Silver <orders@shreeshyamsilver.com>',
      reply_to: 'shreeshyamsilvernokha@gmail.com', // Replies go to your real Gmail
      to: order.customer_email,
      subject: `Order Confirmation - ${order.order_number}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #4a5568;">Order Confirmed!</h1>
          <p>Hi ${order.customer_name},</p>
          <p>Thank you for your order. We have received your payment and are processing your order.</p>
          
          <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> ${order.order_number}</p>
            <p><strong>Amount Paid:</strong> Rs. ${order.total_amount}</p>
            <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
          </div>

          <h3>Order Details:</h3>
          <ul>
            ${items.map(item => `<li>${item.product_name} x ${item.quantity} - Rs. ${item.subtotal}</li>`).join('')}
          </ul>

          <p>You can download your invoice here:</p>
          <a href="${invoiceUrl}" style="background-color: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Download Invoice</a>
          
          <p style="margin-top: 30px; font-size: 12px; color: #718096;">
            If you have any questions, please reply to this email.
          </p>
        </div>
      `
    });
    console.log(`✅ Customer email sent to ${order.customer_email}`);
  } catch (error) {
    console.error('❌ Failed to send customer email:', error);
  }

  // 2. Send Admin Email (Formatted HTML as requested)
  const adminEmail = process.env.ADMIN_EMAIL || 'shreeshyamsilvernokha@gmail.com'; // Fallback to user provided email

  try {
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
             <div style="text-align: center; margin-top: 30px;">
                <a href="${invoiceUrl}" style="background-color: #2d3748; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">View Invoice PDF</a>
             </div>

          </div>
        </div>
      `
    });
    console.log(`✅ Admin email sent to ${adminEmail}`);
  } catch (error) {
    console.error('❌ Failed to send admin email:', error);
  }
}
