import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const { user, signInWithGoogle } = useAuth();

    useEffect(() => {
        // Check if user has already seen/closed the popup
        const hasSeenPopup = sessionStorage.getItem('auth_popup_closed');

        if (!user && !hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [user]);

    if (!isVisible || user) return null;

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('auth_popup_closed', 'true');
    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
        // Popup will naturally close as user state changes or page redirects
    };

    return (
        <div className="fixed top-4 right-4 z-[100] animate-fade-in-down">
            <div className="bg-[#1a1a1a] text-white rounded-lg shadow-2xl p-4 w-[320px] border border-gray-700 relative">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="flex gap-4">
                    {/* Google 'G' Logo Container */}
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z"
                                fill="#EA4335"
                            />
                        </svg>
                    </div>

                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-200">Sign in to Shree Shyam Silver</p>
                        <p className="text-xs text-gray-400 mt-1">Unlock seamless shopping</p>

                        <button
                            onClick={handleGoogleLogin}
                            className="mt-3 w-full bg-[#4285F4] hover:bg-[#3367D6] text-white text-sm font-medium py-1.5 px-3 rounded transition-colors flex items-center justify-center gap-2"
                        >
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
