import { useState } from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

interface WishlistButtonProps {
    productId: number;
    className?: string;
    showText?: boolean;
}

export default function WishlistButton({ productId, className = '', showText = false }: WishlistButtonProps) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { user } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const isIn = isInWishlist(productId);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        setLoading(true);
        if (isIn) {
            await removeFromWishlist(productId);
        } else {
            await addToWishlist(productId);
        }
        setLoading(false);
    };

    return (
        <>
            <button
                onClick={handleClick}
                disabled={loading}
                className={`flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-50' : ''} ${className}`}
                aria-label={isIn ? "Remove from wishlist" : "Add to wishlist"}
            >
                <svg
                    className={`w-6 h-6 transition-colors ${isIn ? 'text-red-500 fill-current' : 'text-silver-400 hover:text-red-500'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                {showText && (
                    <span className={isIn ? 'text-red-500' : 'text-silver-600'}>
                        {isIn ? 'Wishlisted' : 'Add to Wishlist'}
                    </span>
                )}
            </button>
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
}
