import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signup, signInWithGoogle: loginWithGoogle } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'signup') {
                if (!name.trim()) {
                    setError('Please enter your name');
                    setLoading(false);
                    return;
                }
                const result = await signup(email, password, name);
                if (result.success) {
                    onClose();
                } else {
                    setError(result.error || 'Signup failed');
                }
            } else {
                const result = await login(email, password);
                if (result.success) {
                    onClose();
                } else {
                    setError(result.error || 'Login failed');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setError('');
    };

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4 animate-fade-in-up">
            <div className="bg-white rounded-lg max-w-md w-full p-8 relative shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-silver-400 hover:text-silver-600"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-serif font-bold text-silver-900">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-silver-600 mt-2">
                        {mode === 'login'
                            ? 'Sign in to your account to continue'
                            : 'Sign up to start shopping'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Google Sign In */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => {
                            loginWithGoogle();
                            // We don't close modal immediately, as redirect will happen
                        }}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-silver-300 rounded-lg p-3 text-silver-700 hover:bg-silver-50 hover:shadow-sm transition-all font-medium"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                        Sign in with Google
                    </button>

                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-silver-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-silver-500">Or continue with email</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-silver-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input w-full"
                                placeholder="John Doe"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-silver-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input w-full"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-silver-700 mb-2">
                            Password *
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input w-full"
                            placeholder="••••••••"
                            minLength={6}
                        />
                        {mode === 'signup' && (
                            <p className="text-xs text-silver-500 mt-1">
                                Minimum 6 characters
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                            </span>
                        ) : (
                            mode === 'login' ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </form>

                {/* Switch Mode */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-silver-600">
                        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            onClick={switchMode}
                            className="text-accent hover:text-accent-dark font-medium"
                        >
                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}
