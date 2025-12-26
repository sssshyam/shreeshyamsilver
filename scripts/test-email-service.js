
import dotenv from 'dotenv';
import { sendOrderEmails } from '../api/utils/emailService.js';

dotenv.config();

const mockOrder = {
    id: 99999,
    order_number: 'TEST-ORDER-001',
    customer_name: 'Test Customer',
    customer_email: 'shreeshyamsilvernokha@gmail.com', // Sending to admin email for safety/test
    customer_phone: '1234567890',
    customer_address: '123 Test Lane',
    customer_city: 'Test City',
    customer_state: 'Test State',
    customer_pincode: '000000',
    total_amount: 1500,
    created_at: new Date().toISOString()
};

const mockItems = [
    { product_name: 'Test Silver Widget', quantity: 2, subtotal: 1000, product_price: 500 },
    { product_name: 'Test Gold Widget', quantity: 1, subtotal: 500, product_price: 500 }
];

console.log('🧪 Starting Email Test...');
if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is missing in .env');
    process.exit(1);
}

try {
    // Test with NO Invoice URL
    console.log('Test 1: Sending email WITHOUT invoice URL...');
    await sendOrderEmails(mockOrder, mockItems, null);

    // Test with Invoice URL
    console.log('Test 2: Sending email WITH invoice URL...');
    await sendOrderEmails(mockOrder, mockItems, 'https://example.com/invoice.pdf');

    console.log('✅ Test script completed. Check your inbox (shreeshyamsilvernokha@gmail.com).');
} catch (error) {
    console.error('❌ Test failed:', error);
}
