# Shree Shyam Silver - E-Commerce Website

Premium silver products e-commerce platform based in Nokha, Rajasthan.

## 🎯 Features

### Customer Features
- ✅ Browse silver products (Pooja items, Home Decor, Gifts)
- ✅ User authentication (Signup/Login)
- ✅ Shopping cart with database sync
- ✅ Product search and filtering
- ✅ Category-wise browsing
- ✅ Responsive design (mobile-friendly)
- ✅ Rajasthan-inspired theme

### Admin Panel
- ✅ Complete product management (CRUD)
- ✅ Multiple image upload (up to 10 per product)
- ✅ Category management
- ✅ Dynamic specifications and care instructions
- ✅ SEO fields (meta description, keywords)
- ✅ Product status management (active, featured, in stock)
- ✅ Order management (coming soon)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Rajasthan-inspired theme)
- **Backend**: Supabase (PostgreSQL + Storage)
- **Authentication**: Custom auth with Supabase
- **State Management**: React Context API
- **Routing**: React Router DOM v6

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/sssshyam/shreeshyamsilver.git
cd shreeshyamsilver
```

2. Install dependencies
```bash
npm install
```

3. Set up Supabase
- Create a Supabase project
- Run SQL scripts in order:
  1. `supabase-schema.sql` - Main database schema
  2. `supabase-admin-schema.sql` - Admin tables
  3. `user-auth-ecommerce-schema.sql` - User auth & cart
  4. `supabase-storage-setup.sql` - Image storage buckets

4. Update Supabase credentials
- Edit `src/lib/supabase.ts` with your Supabase URL and Anon Key

5. Run development server
```bash
npm run dev
```

6. Open browser
```
http://localhost:3000
```

## 📦 Project Structure

```
shreeshyamsilver/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── admin/      # Admin-specific components
│   │   ├── auth/       # Authentication components
│   │   └── cart/       # Shopping cart components
│   ├── contexts/       # React Context providers
│   │   ├── AdminContext.tsx
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin panel pages
│   │   └── ...         # Public pages
│   ├── lib/            # Utilities and configs
│   ├── types/          # TypeScript types
│   └── App.tsx         # Main app component
├── supabase-*.sql      # Database schemas
└── package.json
```

## 🔐 Admin Access

**URL**: `http://localhost:3000/adminshreeshyamsilvernokha/login`

**Default Credentials**:
- Email: `shreeshyamsilvernokha@gmail.com`
- Password: `shreeshyamsilver@#$1234`

## 📸 Image Upload

Images are stored in Supabase Storage with automatic public URLs.

**Buckets**:
- `product-images` (10MB limit)
- `category-images` (5MB limit)
- `blog-images` (5MB limit)

## 🎨 Theme

Rajasthan-inspired design with:
- Traditional amber and gold colors
- Desert-themed backgrounds
- Cultural patterns and motifs
- Premium silver aesthetic

## 📝 Documentation

- `ADMIN_READY.md` - Admin panel guide
- `STORAGE_SETUP_GUIDE.md` - Image upload setup
- `RAJASTHAN_THEME_UPDATE.md` - Theme documentation
- `ECOMMERCE_IMPLEMENTATION.md` - E-commerce system docs

## 🚧 Roadmap

- [x] Product catalog
- [x] User authentication
- [x] Shopping cart
- [x] Admin panel
- [x] Image upload
- [ ] Checkout & payment (Razorpay)
- [ ] Order management
- [ ] Email notifications
- [ ] Blog system
- [ ] Reviews & ratings

## 📞 Contact

**Shree Shyam Silver**
- Location: Nokha, Rajasthan
- Phone: +91 85040 47243
- Email: shreeshyamsilvernokha@gmail.com

## 📄 License

Private - All rights reserved

## 🙏 Acknowledgments

Built with modern web technologies for traditional silver craftsmanship.

---

**Made with ❤️ in Nokha, Rajasthan**
