
# Proper Testing Guide: Razorpay on Vercel

To test your Razorpay integration properly, you need to simulate the Vercel Serverless Function environment because Vite's `npm run dev` **does not** automatically serve files in the `/api` directory.

### Prerequisite

You must have the Vercel CLI installed.
```bash
npm i -g vercel
```

### Steps to Run Locally

1.  **Create a `.env` file** in the root directory if you haven't already.
    ```env
    VITE_SUPABASE_URL=...
    VITE_SUPABASE_ANON_KEY=...
    VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
    RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
    RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
    ```

2.  **Start the Development Server with Vercel**
    Instead of `npm run dev`, verify that you are logged into Vercel and run:
    ```bash
    vercel dev
    ```
    This command spins up a local tailored environment that:
    *   Serves your Vite frontend.
    *   **Serves your `/api` functions correctly**, mimicking Production.
    *   Injects environment variables from your Vercel project (or your local `.env`).

3.  **Test Payment**
    *   Go to `localhost:3000` (or whatever port Vercel assigns).
    *   Add items to cart.
    *   Proceed to checkout.
    *   The `/api/create-order` and `/api/verify-payment` endpoints will now work correctly!

### Note on Production
When you deploy to Vercel, everything will work automatically as long as you have added the Environment Variables in the Vercel Dashboard.
