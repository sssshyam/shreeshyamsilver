
# How to Enable Razorpay Payments on Vercel

To make these payments work, you **must** set your Razorpay keys in your Vercel project settings.

1.  Go to your **Razorpay Dashboard** -> **Settings** -> **API Keys**.
2.  Generate a Key ID and Key Secret.
3.  Go to your **Vercel Dashboard** -> select this project -> **Settings** -> **Environment Variables**.
4.  Add the following variables:

| Key | Value |
| :--- | :--- |
| `RAZORPAY_KEY_ID` | Your Key ID (e.g., rzp_test_...) |
| `RAZORPAY_KEY_SECRET` | Your Key Secret |
| `VITE_RAZORPAY_KEY_ID` | Same as `RAZORPAY_KEY_ID` (Used by the frontend) |

**Note:** You must redeploy your project for these environment variables to take effect.
