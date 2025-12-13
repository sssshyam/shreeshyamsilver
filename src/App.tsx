import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Public Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NokhaPage from './pages/NokhaPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';

function App() {
    return (
        <Router>
            <AdminProvider>
                <Routes>
                    {/* Admin Routes - No Header/Footer */}
                    <Route path="/adminshreeshyamsilvernokha/login" element={<AdminLoginPage />} />
                    <Route path="/adminshreeshyamsilvernokha/dashboard" element={<AdminDashboard />} />
                    <Route path="/adminshreeshyamsilvernokha/products" element={<AdminProductsPage />} />
                    <Route path="/adminshreeshyamsilvernokha/products/new" element={<AdminProductFormPage />} />
                    <Route path="/adminshreeshyamsilvernokha/products/edit/:id" element={<AdminProductFormPage />} />
                    <Route path="/adminshreeshyamsilvernokha/categories" element={<AdminCategoriesPage />} />

                    {/* Public Routes - With Header/Footer */}
                    <Route path="/*" element={
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-1">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/shop" element={<ShopPage />} />
                                    <Route path="/shop/category/:slug" element={<CategoryPage />} />
                                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/nokha" element={<NokhaPage />} />
                                    <Route path="/blog" element={<BlogPage />} />
                                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/checkout" element={<CheckoutPage />} />
                                    <Route path="/account" element={<AccountPage />} />
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
