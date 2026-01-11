import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { ReactNode, useEffect } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { admin, logout, isLoading } = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !admin) {
            navigate('/adminshreeshyamsilvernokha/login');
        }
    }, [admin, isLoading, navigate]);

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

    const navigation = [
        { name: 'Dashboard', href: '/adminshreeshyamsilvernokha/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Products', href: '/adminshreeshyamsilvernokha/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { name: 'Categories', href: '/adminshreeshyamsilvernokha/categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
        { name: 'Blog Posts', href: '/adminshreeshyamsilvernokha/blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { name: 'Orders', href: '/adminshreeshyamsilvernokha/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    ];

    return (
        <div className="min-h-screen bg-silver-50">
            {/* Top Header */}
            <header className="bg-white border-b border-silver-200 sticky top-0 z-50">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-serif font-bold text-accent">
                                Shree Shyam Silver
                            </h1>
                            <span className="text-sm text-silver-600 hidden sm:inline">Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-silver-600 hover:text-accent hidden sm:inline-flex items-center gap-1"
                            >
                                View Website
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                            <span className="text-sm text-silver-600 hidden sm:inline">
                                {admin.name}
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

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-silver-200 min-h-[calc(100vh-4rem)] hidden lg:block">
                    <nav className="p-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href ||
                                location.pathname.startsWith(item.href + '/');
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-accent text-white'
                                            : 'text-silver-700 hover:bg-silver-100'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-silver-200 z-50">
                <div className="grid grid-cols-5 gap-1 p-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex flex-col items-center gap-1 p-2 rounded-lg ${isActive ? 'text-accent' : 'text-silver-600'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                <span className="text-xs">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
