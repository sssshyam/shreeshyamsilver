import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartItem from '../components/cart/CartItem';
import { useState } from 'react';
import AuthModal from '../components/auth/AuthModal';

export default function CartPage() {
    const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleCheckout = () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        navigate('/checkout');
    };

    const handleClearCart = async () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            await clearCart();
        }
    };

    if (!user) {
        return (
            <>
                <div className="container-custom py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <svg className="w-24 h-24 mx-auto text-silver-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h1 className="text-3xl font-serif font-bold text-silver-900 mb-4">
                            Please Login to View Cart
                        </h1>
                        <p className="text-silver-600 mb-8">
                            Sign in to see your saved items and checkout
                        </p>
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="btn-primary"
                        >
                            Sign In / Sign Up
                        </button>
                    </div>
                </div>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container-custom py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <svg className="w-24 h-24 mx-auto text-silver-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h1 className="text-3xl font-serif font-bold text-silver-900 mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="text-silver-600 mb-8">
                        Looks like you haven't added any items to your cart yet
                    </p>
                    <Link to="/shop" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-silver-900">Shopping Cart</h1>
                    <p className="text-silver-600 mt-2">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
                </div>
                <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 font-medium"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                productId={item.product_id}
                                product={item.product}
                                quantity={item.quantity}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromCart}
                            />
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                        <h2 className="text-xl font-serif font-bold text-silver-900 mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-silver-700">
                                <span>Subtotal ({cartCount} items)</span>
                                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-silver-700">
                                <span>Shipping</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between text-silver-700">
                                <span>GST (Included)</span>
                                <span>Included</span>
                            </div>
                            <div className="border-t border-silver-200 pt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-accent">₹{cartTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="btn-primary w-full mb-4"
                        >
                            Proceed to Checkout
                        </button>

                        <Link
                            to="/shop"
                            className="btn-secondary w-full block text-center"
                        >
                            Continue Shopping
                        </Link>

                        {/* Trust Badges */}
                        <div className="mt-6 pt-6 border-t border-silver-200 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-silver-600">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>100% Authentic Products</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-silver-600">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-silver-600">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Free Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
