# Deployment Guide

## Pre-Deployment Checklist

### 1. Content Updates
- [ ] Replace mock product data with real products
- [ ] Update contact information (phone, email, address)
- [ ] Add real testimonials
- [ ] Write actual blog posts
- [ ] Update brand story in About page
- [ ] Add real product images

### 2. Configuration
- [ ] Update site title and meta descriptions in `index.html`
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure environment variables
- [ ] Update social media links in Footer

### 3. SEO Optimization
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Implement structured data (JSON-LD) for products
- [ ] Optimize all images (WebP format)
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags

### 4. Performance
- [ ] Run Lighthouse audit
- [ ] Optimize bundle size
- [ ] Enable compression
- [ ] Set up CDN for images
- [ ] Configure caching headers

### 5. Security
- [ ] Set up SSL certificate
- [ ] Configure CSP headers
- [ ] Enable HTTPS redirect
- [ ] Set up rate limiting
- [ ] Configure CORS properly

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros**: Zero config, automatic deployments, edge network, free SSL

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Configuration**: Create `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Option 2: Netlify

**Pros**: Easy setup, form handling, serverless functions

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

**Configuration**: Create `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: AWS S3 + CloudFront

**Pros**: Scalable, cost-effective, full control

1. Build the project:
```bash
npm run build
```

2. Create S3 bucket
3. Enable static website hosting
4. Upload `dist` folder contents
5. Create CloudFront distribution
6. Configure custom domain
7. Set up SSL certificate (AWS Certificate Manager)

### Option 4: Traditional Hosting (cPanel, etc.)

1. Build the project:
```bash
npm run build
```

2. Upload `dist` folder contents to `public_html`
3. Configure `.htaccess` for SPA routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Post-Deployment

### 1. Testing
- [ ] Test all routes
- [ ] Test on mobile devices
- [ ] Test checkout flow
- [ ] Test form submissions
- [ ] Test on different browsers
- [ ] Verify SSL certificate
- [ ] Check page load speed

### 2. Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Monitor Core Web Vitals
- [ ] Track conversion rates
- [ ] Monitor server costs

### 3. SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify site ownership
- [ ] Request indexing
- [ ] Monitor search performance

## Environment Variables

Create `.env` file for sensitive data:

```env
VITE_API_URL=https://api.yoursite.com
VITE_PAYMENT_KEY=your_payment_gateway_key
VITE_ANALYTICS_ID=your_analytics_id
```

**Important**: Never commit `.env` to version control!

## Custom Domain Setup

### Vercel
1. Go to project settings
2. Add custom domain
3. Configure DNS records as shown
4. Wait for SSL certificate provisioning

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update nameservers or add DNS records
4. SSL certificate auto-provisioned

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Backend Integration

To make this a fully functional e-commerce site, integrate:

### 1. Product Management
- Connect to headless CMS (Strapi, Contentful, Sanity)
- Or build custom API with Node.js/Express
- Database: PostgreSQL, MongoDB, or MySQL

### 2. Payment Processing
- Razorpay (India)
- Stripe (International)
- PayPal

### 3. Order Management
- Build admin dashboard
- Email notifications (SendGrid, AWS SES)
- Order tracking system

### 4. User Authentication
- Firebase Auth
- Auth0
- Custom JWT implementation

### 5. Inventory Management
- Real-time stock updates
- Low stock alerts
- Automated reordering

## Performance Optimization

### Image Optimization
```bash
# Install sharp for image optimization
npm install sharp

# Create optimization script
# Convert images to WebP
# Generate responsive sizes
```

### Code Splitting
Already handled by Vite, but verify:
- Route-based splitting
- Component lazy loading
- Dynamic imports for heavy components

### Caching Strategy
```
HTML: no-cache
CSS/JS: cache with hash (1 year)
Images: cache (1 year)
Fonts: cache (1 year)
```

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review analytics weekly
- [ ] Update content regularly
- [ ] Monitor performance
- [ ] Backup database
- [ ] Review security logs
- [ ] Update product inventory

### Security Updates
- Run `npm audit` regularly
- Update dependencies with security patches
- Monitor for CVEs
- Review access logs

## Support

For deployment issues:
- Check build logs
- Verify environment variables
- Test locally with production build
- Check browser console for errors
- Review network requests

## Rollback Plan

If deployment fails:
1. Revert to previous version
2. Check error logs
3. Fix issues locally
4. Test thoroughly
5. Redeploy

---

**Remember**: Always test in staging environment before production deployment!
