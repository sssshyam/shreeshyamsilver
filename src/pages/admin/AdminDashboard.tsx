import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
    const { admin, logout, isLoading } = useAdmin();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        blogs: 0,
        orders: 0
    });

    useEffect(() => {
        if (!isLoading && !admin) {
            navigate('/adminshreeshyamsilvernokha/login');
        } else if (admin) {
            fetchStats();
        }
    }, [admin, isLoading, navigate]);

    const fetchStats = async () => {
        try {
            const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
            const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
            const { count: blogCount } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true });
            // Assuming orders table exists, otherwise it will be 0
            const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

            setStats({
                products: productCount || 0,
                categories: categoryCount || 0,
                blogs: blogCount || 0,
                orders: orderCount || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-silver-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!admin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-silver-50">
            {/* Admin Header */}
            <header className="bg-white border-b border-silver-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-serif font-bold text-accent">
                                Shree Shyam Silver
                            </h1>
                            <span className="text-sm text-silver-600">Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-silver-600">
                                Welcome, {admin.name}
                            </span>
                            <button
                                onClick={logout}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-3xl font-serif font-bold text-silver-900">Dashboard</h2>
                    <p className="text-silver-600 mt-2">Manage your e-commerce store</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-silver-600 mb-1">Total Products</p>
                                <p className="text-3xl font-bold text-accent">{stats.products}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-silver-600 mb-1">Categories</p>
                                <p className="text-3xl font-bold text-accent">{stats.categories}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-silver-600 mb-1">Blog Posts</p>
                                <p className="text-3xl font-bold text-accent">{stats.blogs}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-silver-600 mb-1">Orders</p>
                                <p className="text-3xl font-bold text-accent">{stats.orders}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/adminshreeshyamsilvernokha/products/new"
                            className="flex items-center gap-3 p-4 border-2 border-silver-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                        >
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold">Add Product</p>
                                <p className="text-sm text-silver-600">Create new product</p>
                            </div>
                        </Link>

                        <Link
                            to="/adminshreeshyamsilvernokha/categories"
                            className="flex items-center gap-3 p-4 border-2 border-silver-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                        >
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold">Manage Categories</p>
                                <p className="text-sm text-silver-600">View all categories</p>
                            </div>
                        </Link>

                        <Link
                            to="/adminshreeshyamsilvernokha/orders"
                            className="flex items-center gap-3 p-4 border-2 border-silver-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                        >
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold">View Orders</p>
                                <p className="text-sm text-silver-600">Manage customer orders</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Management Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Content Management</h3>
                        <div className="space-y-3">
                            <Link
                                to="/adminshreeshyamsilvernokha/products"
                                className="flex items-center justify-between p-3 hover:bg-silver-50 rounded transition-colors"
                            >
                                <span className="font-medium">Products</span>
                                <svg className="w-5 h-5 text-silver-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/adminshreeshyamsilvernokha/categories"
                                className="flex items-center justify-between p-3 hover:bg-silver-50 rounded transition-colors"
                            >
                                <span className="font-medium">Categories</span>
                                <svg className="w-5 h-5 text-silver-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/adminshreeshyamsilvernokha/blogs"
                                className="flex items-center justify-between p-3 hover:bg-silver-50 rounded transition-colors"
                            >
                                <span className="font-medium">Blog Posts</span>
                                <svg className="w-5 h-5 text-silver-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Store Management</h3>
                        <div className="space-y-3">
                            <Link
                                to="/adminshreeshyamsilvernokha/orders"
                                className="flex items-center justify-between p-3 hover:bg-silver-50 rounded transition-colors"
                            >
                                <span className="font-medium">Orders</span>
                                <svg className="w-5 h-5 text-silver-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/"
                                target="_blank"
                                className="flex items-center justify-between p-3 hover:bg-silver-50 rounded transition-colors"
                            >
                                <span className="font-medium">View Website</span>
                                <svg className="w-5 h-5 text-silver-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Notice */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Admin Panel Setup</h4>
                            <p className="text-blue-800 text-sm mb-3">
                                The full admin panel with product management, image uploads, and CRUD operations is being built.
                                For now, you can use the Supabase Dashboard to manage your data.
                            </p>
                            <a
                                href="https://gjgvwmlsqswtkxeplgbv.supabase.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800"
                            >
                                Open Supabase Dashboard
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
