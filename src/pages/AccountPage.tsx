
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function AccountPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // If you want to force login, you might redirect here or show the login form
    // For now, mirroring existing logic but adding actual functionality

    const handleSignOut = async () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-white">
                <div className="container-custom py-12">
                    <h1 className="mb-8">My Account</h1>
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8 text-center">
                            <svg className="w-16 h-16 mx-auto text-silver-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h2 className="mb-4">Account Access</h2>
                            <p className="text-silver-600 mb-8">
                                Sign in to view your orders, manage addresses, and track deliveries.
                            </p>
                            {/* In a real app, these would open a modal or navigate to a dedicated auth page */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="btn-primary" onClick={() => {/* Toggle Auth Modal usually */ }}>
                                    Please use the Sign In / Register button in the header
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container-custom py-12">
                <h1 className="mb-8">My Account</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar / Navigation */}
                    <div className="col-span-1">
                        <div className="card p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-silver-100 rounded-full flex items-center justify-center text-silver-600 font-bold text-xl">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <p className="font-semibold">{user.name || 'User'}</p>
                                    <p className="text-sm text-silver-500 truncate w-32">{user.email}</p>
                                </div>
                            </div>
                            <nav className="space-y-2">
                                <button onClick={() => navigate('/orders')} className="w-full text-left px-4 py-2 hover:bg-silver-50 rounded flex items-center gap-3">
                                    <svg className="w-5 h-5 text-silver-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    My Orders
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-silver-50 rounded flex items-center gap-3 text-red-600" onClick={handleSignOut}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area - Profile Details */}
                    <div className="col-span-2 space-y-6">
                        <div className="card p-8">
                            <h2 className="text-xl font-serif font-semibold mb-6">Profile Information</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-silver-600 mb-1">Full Name</label>
                                    <p className="font-medium">{user.name || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-silver-600 mb-1">Email Address</label>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-silver-600 mb-1">Phone Number</label>
                                    <p className="font-medium">{user.phone || '-'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card p-8">
                            <h2 className="text-xl font-serif font-semibold mb-6">Default Shipping Address</h2>
                            <div className="text-silver-800">
                                {user.address ? (
                                    <>
                                        <p>{user.address}</p>
                                        <p>{user.city}, {user.state} {user.pincode}</p>
                                    </>
                                ) : (
                                    <p className="text-silver-500 italic">No address saved.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
