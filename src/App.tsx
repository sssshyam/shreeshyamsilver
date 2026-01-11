
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MetaPixel from './components/MetaPixel';
import WhatsAppButton from './components/WhatsAppButton';

// Public Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import MyOrdersPage from './pages/MyOrdersPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NokhaPage from './pages/NokhaPage';
import ContactPage from './pages/ContactPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminCategoryFormPage from './pages/admin/AdminCategoryFormPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminBlogPostFormPage from './pages/admin/AdminBlogPostFormPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';

import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <MetaPixel />
            <SEO />
            <AdminProvider>
                <Routes>
                    {/* Admin Routes - No Header/Footer */}
                    <Route path="/admin" element={<AdminLoginPage />} />
                    <Route path="/admin-login" element={<AdminLoginPage />} />
                    <Route path="/adminshreeshyamsilvernokha/login" element={<AdminLoginPage />} />
                    <Route path="/adminshreeshyamsilvernokha/dashboard" element={<AdminDashboard />} />
                    <Route path="/adminshreeshyamsilvernokha/products" element={<AdminProductsPage />} />
                    <Route path="/adminshreeshyamsilvernokha/products/new" element={<AdminProductFormPage />} />
                    <Route path="/adminshreeshyamsilvernokha/products/edit/:id" element={<AdminProductFormPage />} />
                    <Route path="/adminshreeshyamsilvernokha/categories" element={<AdminCategoriesPage />} />
                    <Route path="/adminshreeshyamsilvernokha/categories/new" element={<AdminCategoryFormPage />} />
                    <Route path="/adminshreeshyamsilvernokha/categories/edit/:id" element={<AdminCategoryFormPage />} />
                    <Route path="/adminshreeshyamsilvernokha/blogs" element={<AdminBlogPage />} />
                    <Route path="/adminshreeshyamsilvernokha/blogs/new" element={<AdminBlogPostFormPage />} />
                    <Route path="/adminshreeshyamsilvernokha/blogs/edit/:id" element={<AdminBlogPostFormPage />} />
                    <Route path="/adminshreeshyamsilvernokha/orders" element={<AdminOrdersPage />} />

                    {/* Public Routes - With Header/Footer */}
                    <Route path="/*" element={
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-1">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/shop" element={<ShopPage />} />
                                    <Route path="/category" element={<CategoriesPage />} />
                                    <Route path="/shop/category/:slug" element={<CategoryPage />} />
                                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/nokha" element={<NokhaPage />} />
                                    <Route path="/contact" element={<ContactPage />} />
                                    <Route path="/blog" element={<BlogPage />} />
                                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/checkout" element={<CheckoutPage />} />
                                    <Route path="/account" element={<ProfilePage />} />
                                    <Route path="/wishlist" element={<WishlistPage />} />
                                    <Route path="/orders" element={<MyOrdersPage />} />
                                    <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
                                    <Route path="/return-policy" element={<ReturnPolicyPage />} />
                                    <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                                    <Route path="/terms" element={<TermsPage />} />
                                </Routes>
                            </main>
                            <Footer />
                            <WhatsAppButton />
                        </div>
                    } />
                </Routes>
            </AdminProvider>
        </Router>
    );
}

export default App;
