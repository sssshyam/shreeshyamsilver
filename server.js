import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createOrderHandler from './api/create-order.js';
import verifyPaymentHandler from './api/verify-payment.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.post('/api/create-order', async (req, res) => {
    try {
        await createOrderHandler(req, res);
    } catch (error) {
        console.error('Error in create-order handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/verify-payment', async (req, res) => {
    try {
        await verifyPaymentHandler(req, res);
    } catch (error) {
        console.error('Error in verify-payment handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 5000;

import webhookHandler from './api/webhook.js';
app.post('/api/webhook', async (req, res) => {
    try {
        await webhookHandler(req, res);
    } catch (error) {
        console.error('Error in webhook handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`
    🚀 Backend server running on http://localhost:${PORT}
    Make sure to update vite.config.ts to proxy /api requests to this port.
    `);
});
