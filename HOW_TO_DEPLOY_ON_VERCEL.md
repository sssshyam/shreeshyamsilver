# 🚀 How to Deploy to Vercel

Since you are using **GitHub**, deployment is **Automatic**.

## 🔄 Automatic Deployment (Recommended)
Every time you `git push` to your repository, Vercel detects the change and automatically builds a new version of your site.

1.  Make your changes in the code.
2.  Run the following commands in your terminal:
    ```bash
    git add .
    git commit -m "Description of your changes"
    git push
    ```
3.  Go to your **Vercel Dashboard**.
4.  You will see a "Building" status. When it turns **Green (Ready)**, your site is updated!

---

## 🛠️ Manual Deployment (If needed)
If you don't want to use Git or want to test a deploy manually:

1.  Install Vercel CLI:
    ```bash
    npm i -g vercel
    ```
2.  Run the deploy command:
    ```bash
    vercel
    ```
3.  Follow the prompts (hit Enter for defaults). This will give you a **Preview URL**.
4.  To deploy to **Production** (your real domain):
    ```bash
    vercel --prod
    ```

---

## 🌍 Connecting Your Domain (Hostinger to Vercel)
*If you haven't done this yet:*

1.  Go to **Vercel Dashboard** → **Settings** → **Domains**.
2.  Add your domain: `shreeshyamsilver.com`.
3.  Vercel will show you **Nameservers** (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
4.  Log in to **Hostinger** → **Domains** → **DNS / Nameservers**.
5.  Select **"Change Nameservers"**.
6.  Enter the Vercel Nameservers you saw in step 3.
7.  Click **Save**.
8.  Wait 15-30 minutes for propagation.

## ⚠️ Troubleshooting
- **"Build Failed"**: Check the "Logs" tab in Vercel. It usually tells you exactly what line caused the error (often a TypeScript or Lint error).
- **"404 Not Found"**: If you are using React Router, you need a `vercel.json` file to handle routing (we have already included this in your project).
