# Step-by-Step Vercel Deployment Guide

## 1. Environment Setup

I have created a `.env.example` file in your project root with your Supabase credentials. 

**Action Required:**
1.  Rename `.env.example` to `.env` in your local folder so your local development works.
    ```powershell
    mv .env.example .env
    ```
    *(Or manually rename it in your file explorer)*

## 2. Push to GitHub

Ensure all your latest changes (including the updated `supabase.ts` which now uses environment variables) are pushed to GitHub.

## 3. Deploying on Vercel

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2.  **Add New Project**:
    *   Click "Add New..." -> "Project".
    *   Import the repository `shreeshyamsilver`.
3.  **Configure Project**:
    *   **Framework Preset**: Vite (should be detected automatically).
    *   **Root Directory**: `./` (default).
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
4.  **Environment Variables** (CRITICAL STEP):
    *   Expand the **"Environment Variables"** section.
    *   Add the following variables (copy values from your `.env.example` file):
        *   **Key**: `VITE_SUPABASE_URL`
        *   **Value**: `https://gjgvwmlsqswtkxeplgbv.supabase.co`
        *   (Click Add)
        *   **Key**: `VITE_SUPABASE_ANON_KEY`
        *   **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqZ3Z3bWxzcXN3dGt4ZXBsZ2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2Mzc5MzQsImV4cCI6MjA4MTIxMzkzNH0.0eCVXUzwPWKShZUXh5ZTFkCflRvevRsQxrwi_veYD34`
        *   (Click Add)
5.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait for the build to complete. You should see confetti! 

## 4. Connect Your Custom Domain

1.  Go to your Project Dashboard on Vercel.
2.  Click on **"Settings"** -> **"Domains"**.
3.  Enter your domain name (e.g., `shreeshyamsilver.com`) and click **"Add"**.
4.  **DNS Configuration**:
    *   Vercel will provide you with DNS records (usually an **A Record** or **CNAME Record**).
    *   Log in to your domain provider (GoDaddy, Namecheap, etc.).
    *   Go to **DNS Management**.
    *   Add the records provided by Vercel.
        *   **Type**: A
        *   **Name**: @
        *   **Value**: 76.76.21.21 (Example, check Vercel for the exact IP)
        *   **Type**: CNAME
        *   **Name**: www
        *   **Value**: cname.vercel-dns.com
5.  Wait for verification (can take minutes to hours). Once verified, your site will be secure (SSL) and accessible via your domain.

## 5. Troubleshooting 404s

If you see 404 errors on refresh, we have already fixed this by adding `vercel.json`. Ensure this file is present in your repository.
