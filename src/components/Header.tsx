import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import AuthModal from './auth/AuthModal';
import CartModal from './cart/CartModal';
import { getCategories } from '../services/api';
import { Category } from '../types';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const { user, logout } = useAuth();
    const { cartCount } = useCart();

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    return (
        <header className="bg-silver-200 border-b border-silver-300 sticky top-0 z-50">
            {/* Top Bar Static */}
            <div className="bg-silver-900 py-1">
                <div className="container-custom flex justify-center items-center">
                    <p className="text-white text-xs md:text-sm font-medium tracking-wide">
                        Welcome to Shree Shyam Silver
                    </p>
                </div>
            </div>

            <div className="container-custom">
                {/* Main Header */}
                <div className="py-4 md:py-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://i.ibb.co/yc86HQqc/shree-shyam-silver-logo-1.png"
                                alt="Shree Shyam Silver"
                                className="h-20 md:h-24 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <Link to="/" className="text-silver-700 hover:text-accent transition-colors font-medium">
                                Home
                            </Link>

                            {/* Shop By Price Dropdown */}
                            <div className="relative group">
                                <button className="text-silver-700 hover:text-accent transition-colors font-medium flex items-center gap-1">
                                    Shop By Price
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 w-56">
                                    <div className="bg-white shadow-xl rounded-lg border border-silver-100 overflow-hidden text-left">
                                        {[500, 1000, 2000, 5000, 10000, 20000].map((price) => (
                                            <Link
                                                key={price}
                                                to={`/shop?maxPrice=${price}`}
                                                className="block px-4 py-3 text-sm text-silver-700 hover:bg-silver-50 hover:text-accent border-b border-silver-50"
                                            >
                                                Items Under ₹{price}
                                            </Link>
                                        ))}
                                        <Link
                                            to="/shop?minPrice=20000"
                                            className="block px-4 py-3 text-sm text-silver-700 hover:bg-silver-50 hover:text-accent border-b border-silver-50"
                                        >
                                            Items Above ₹20,000
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Shop Dropdown */}
                            <div className="relative group">
                                <Link to="/shop" className="text-silver-700 hover:text-accent transition-colors font-medium flex items-center gap-1">
                                    Shop
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Link>
                                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 w-56">
                                    <div className="bg-white shadow-xl rounded-lg border border-silver-100 overflow-hidden">
                                        <Link to="/shop" className="block px-4 py-3 text-sm text-silver-700 hover:bg-silver-50 hover:text-accent border-b border-silver-50">
                                            All Products
                                        </Link>
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                to={`/shop/category/${category.slug}`}
                                                className="block px-4 py-3 text-sm text-silver-700 hover:bg-silver-50 hover:text-accent border-b border-silver-50 last:border-none"
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link to="/category" className="text-silver-700 hover:text-accent transition-colors font-medium">
                                Categories
                            </Link>
                            <Link to="/about" className="text-silver-700 hover:text-accent transition-colors font-medium">
                                About
                            </Link>
                            <Link to="/nokha" className="text-silver-700 hover:text-accent transition-colors font-medium">
                                Nokha Showroom
                            </Link>
                            <Link to="/contact" className="text-silver-700 hover:text-accent transition-colors font-medium">
                                Contact
                            </Link>
                            <Link to="/blog" className="text-silver-700 hover:text-accent transition-colors font-medium">
                                Blog
                            </Link>
                        </nav>

                        {/* Cart, User Menu & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            {/* Cart Icon */}
                            <button
                                onClick={() => setShowCartModal(true)}
                                className="relative group"
                            >
                                <svg className="w-6 h-6 text-silver-700 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* User Menu */}
                            {user ? (
                                <div className="relative hidden md:block">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 text-silver-700 hover:text-accent transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="text-sm font-medium">{user.name || 'Account'}</span>
                                    </button>

                                    {showUserMenu && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setShowUserMenu(false)}
                                            />
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-silver-200 py-2 z-20">
                                                <Link
                                                    to="/account"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="block px-4 py-2 text-sm text-silver-700 hover:bg-silver-50"
                                                >
                                                    My Account
                                                </Link>
                                                <Link
                                                    to="/wishlist"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="block px-4 py-2 text-sm text-silver-700 hover:bg-silver-50"
                                                >
                                                    My Wishlist
                                                </Link>
                                                <Link
                                                    to="/orders"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="block px-4 py-2 text-sm text-silver-700 hover:bg-silver-50"
                                                >
                                                    My Orders
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setShowUserMenu(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-silver-50"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="hidden md:block text-sm font-medium text-silver-700 hover:text-accent transition-colors"
                                >
                                    Sign In
                                </button>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden text-silver-700"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-silver-200 py-4">
                        <nav className="flex flex-col gap-4">
                            <Link
                                to="/"
                                className="text-silver-700 hover:text-accent transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/shop"
                                className="text-silver-700 hover:text-accent transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Shop
                            </Link>
                            <Link
                                to="/about"
                                className="text-silver-700 hover:text-accent transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/nokha"
                                className="text-silver-700 hover:text-accent transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Nokha Showroom
                            </Link>
                            <Link
                                to="/contact"
                                className="text-silver-700 hover:text-accent transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <Link
                                to="/blog"
                                className="text-silver-700 hover:text-accent transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                to="/account"
                                className="text-silver-700 hover:text-accent transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Account
                            </Link>
                        </nav>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            <CartModal isOpen={showCartModal} onClose={() => setShowCartModal(false)} />
        </header >
    );
}
