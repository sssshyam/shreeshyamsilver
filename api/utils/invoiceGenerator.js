
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

/**
 * Generates a PDF Invoice
 * @param {Object} order - The order object
 * @param {Array} items - Array of order items
 * @returns {Promise<Uint8Array>} - The generated PDF as a Uint8Array
 */
export async function generateInvoicePDF(order, items) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const fontSize = 10;
    let y = height - 50;

    // --- HEADER ---
    page.drawText('INVOICE', { x: 50, y, size: 20, font: boldFont });

    page.drawText('Shree Shyam Silver', { x: 400, y, size: 14, font: boldFont, color: rgb(0.2, 0.2, 0.2) });
    y -= 20;
    page.drawText('Nokha, Rajasthan', { x: 400, y, size: 10, font });
    y -= 15;
    page.drawText('Email: info@shreeshyamsilver.com', { x: 400, y, size: 10, font });

    y = height - 100;

    // --- ORDER DETAILS ---
    page.drawText(`Order ID: ${order.order_number}`, { x: 50, y, size: 12, font: boldFont });
    y -= 20;
    page.drawText(`Date: ${new Date(order.created_at).toLocaleDateString()}`, { x: 50, y, size: 10, font });
    y -= 20;
    page.drawText(`Payment Method: ${order.payment_method?.toUpperCase() || 'ONLINE'}`, { x: 50, y, size: 10, font });

    // --- BILL TO ---
    y -= 40;
    page.drawText('Bill To:', { x: 50, y, size: 12, font: boldFont });
    y -= 20;
    page.drawText(order.customer_name || 'Guest', { x: 50, y, size: 10, font });
    y -= 15;
    page.drawText(order.customer_email || '', { x: 50, y, size: 10, font });
    y -= 15;
    if (order.customer_phone) {
        page.drawText(order.customer_phone, { x: 50, y, size: 10, font });
        y -= 15;
    }
    const address = `${order.customer_address || ''}, ${order.customer_city || ''} ${order.customer_pincode || ''}`;
    page.drawText(address, { x: 50, y, size: 10, font, maxWidth: 300 });

    // --- TABLE HEADER ---
    y -= 50;
    const startY = y;

    // Draw Table Header Background
    page.drawRectangle({
        x: 40,
        y: y - 5,
        width: width - 80,
        height: 20,
        color: rgb(0.9, 0.9, 0.9),
    });

    page.drawText('Item', { x: 50, y, size: 10, font: boldFont });
    page.drawText('Qty', { x: 300, y, size: 10, font: boldFont });
    page.drawText('Price', { x: 350, y, size: 10, font: boldFont });
    page.drawText('Total', { x: 450, y, size: 10, font: boldFont });

    y -= 25;

    // --- ITEMS ---
    let totalAmount = 0;
    for (const item of items) {
        const productName = item.product_name;
        const qty = item.quantity;
        const price = Number(item.product_price);
        const total = qty * price;
        totalAmount += total;

        page.drawText(productName.substring(0, 40) + (productName.length > 40 ? '...' : ''), { x: 50, y, size: 10, font });
        page.drawText(qty.toString(), { x: 300, y, size: 10, font });
        page.drawText(`Rs. ${price.toFixed(2)}`, { x: 350, y, size: 10, font });
        page.drawText(`Rs. ${total.toFixed(2)}`, { x: 450, y, size: 10, font });

        y -= 20;
    }

    // --- TOTAL ---
    y -= 20;
    page.drawLine({
        start: { x: 40, y: y + 10 },
        end: { x: width - 40, y: y + 10 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText('Total Amount:', { x: 350, y, size: 12, font: boldFont });
    page.drawText(`Rs. ${totalAmount.toFixed(2)}`, { x: 450, y, size: 12, font: boldFont });

    // --- FOOTER ---
    page.drawText('Thank you for shopping with Shree Shyam Silver!', {
        x: width / 2 - 100,
        y: 50,
        size: 10,
        font,
        color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
