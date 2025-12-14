import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();
    const { user } = useAuth();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-silver-200">
                    <h2 className="text-2xl font-serif font-bold text-silver-900">
                        Shopping Cart ({cartCount})
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-silver-400 hover:text-silver-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {!user ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-silver-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-silver-600 mb-4">Please login to view your cart</p>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-silver-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-silver-600 mb-4">Your cart is empty</p>
                            <button
                                onClick={onClose}
                                className="btn-secondary"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 pb-4 border-b border-silver-200">
                                    {/* Product Image */}
                                    <Link
                                        to={`/product/${item.product.slug}`}
                                        onClick={onClose}
                                        className="flex-shrink-0"
                                    >
                                        <img
                                            src={item.product.image_url || 'https://via.placeholder.com/100'}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    </Link>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            to={`/product/${item.product.slug}`}
                                            onClick={onClose}
                                            className="font-medium text-silver-900 hover:text-accent line-clamp-2"
                                        >
                                            {item.product.name}
                                        </Link>
                                        <p className="text-sm text-silver-600 mt-1">
                                            ₹{item.product.price.toLocaleString('en-IN')}
                                        </p>

                                        {/* Quantity and Remove */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="w-7 h-7 flex items-center justify-center border border-silver-300 rounded hover:bg-silver-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center border border-silver-300 rounded hover:bg-silver-100"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.product_id)}
                                                className="ml-auto text-red-600 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {user && cartItems.length > 0 && (
                    <div className="border-t border-silver-200 p-6 space-y-4">
                        {/* Total */}
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total:</span>
                            <span className="text-accent">₹{cartTotal.toLocaleString('en-IN')}</span>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            <Link
                                to="/checkout"
                                onClick={onClose}
                                className="btn-primary w-full block text-center"
                            >
                                Proceed to Checkout
                            </Link>
                            <Link
                                to="/cart"
                                onClick={onClose}
                                className="btn-secondary w-full block text-center"
                            >
                                View Full Cart
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
