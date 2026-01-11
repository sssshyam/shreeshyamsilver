
import dotenv from 'dotenv';
import Razorpay from 'razorpay';

dotenv.config();

console.log('\n🔍 --- Razorpay Key Verification ---');
const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

console.log(`Key ID Present: ${!!key_id}`);
if (key_id) console.log(`Key ID Preview: ${key_id.substring(0, 8)}...`);

console.log(`Key Secret Present: ${!!key_secret}`);
if (key_secret) console.log(`Key Secret Preview: ${key_secret.substring(0, 4)}...`);

if (!key_id || !key_secret) {
    console.error('❌ FAIL: Keys are missing from .env');
    process.exit(1);
}

const razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
});

async function verifyAuth() {
    try {
        console.log('\n📡 Testing connection to Razorpay...');
        // Try to fetch orders (limit 1) just to test auth
        await razorpay.orders.all({ limit: 1 });
        console.log('✅ SUCCESS: Authentication worked! Keys are valid.');
    } catch (error) {
        console.error('❌ FAIL: Authentication failed.');
        console.error(`Error Code: ${error.statusCode}`);
        if (error.error) {
            console.error(`Reason: ${error.error.description}`);
        } else {
            console.error(error);
        }
    }
}

verifyAuth();
