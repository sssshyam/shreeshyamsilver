import { useState } from 'react';
import { Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import AuthModal from '../auth/AuthModal';

interface AddToCartButtonProps {
    product: Product;
    quantity?: number;
    className?: string;
    showQuantitySelector?: boolean;
}

export default function AddToCartButton({
    product,
    quantity: initialQuantity = 1,
    className = '',
    showQuantitySelector = false
}: AddToCartButtonProps) {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [quantity, setQuantity] = useState(initialQuantity);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleAddToCart = async () => {
        // Check if user is logged in
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        // Check if product is in stock
        if (product.in_stock === false) {
            alert('This product is currently out of stock');
            return;
        }

        setLoading(true);
        const result = await addToCart(product, quantity);

        if (result) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } else {
            alert('Failed to add to cart. Please try again.');
        }

        setLoading(false);
    };

    return (
        <>
            <div className={`flex items-center gap-3 ${className}`}>
                {showQuantitySelector && (
                    <div className="flex items-center border border-silver-300 rounded">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-2 hover:bg-silver-100 transition-colors"
                            disabled={loading}
                        >
                            -
                        </button>
                        <span className="px-4 py-2 border-x border-silver-300 min-w-[3rem] text-center">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-2 hover:bg-silver-100 transition-colors"
                            disabled={loading}
                        >
                            +
                        </button>
                    </div>
                )}

                <button
                    onClick={handleAddToCart}
                    disabled={loading || product.in_stock === false}
                    className={`btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed ${success ? 'bg-green-600 hover:bg-green-700' : ''
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding...
                        </span>
                    ) : success ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Added to Cart!
                        </span>
                    ) : product.in_stock === false ? (
                        'Out of Stock'
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Add to Cart
                        </span>
                    )}
                </button>
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                defaultMode="signup"
            />
        </>
    );
}
