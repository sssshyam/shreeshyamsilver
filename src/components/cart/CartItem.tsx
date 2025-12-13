import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface CartItemProps {
    productId: number;
    product: Product;
    quantity: number;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export default function CartItem({
    productId,
    product,
    quantity,
    onUpdateQuantity,
    onRemove
}: CartItemProps) {
    const subtotal = product.price * quantity;

    return (
        <div className="flex gap-6 py-6 border-b border-silver-200">
            {/* Product Image */}
            <Link to={`/product/${product.slug}`} className="flex-shrink-0">
                <img
                    src={product.image_url || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg"
                />
            </Link>

            {/* Product Details */}
            <div className="flex-1">
                <Link
                    to={`/product/${product.slug}`}
                    className="text-lg font-semibold text-silver-900 hover:text-accent"
                >
                    {product.name}
                </Link>

                {product.purity && (
                    <p className="text-sm text-silver-600 mt-1">
                        {product.purity}
                    </p>
                )}

                {product.weight && (
                    <p className="text-sm text-silver-600">
                        Weight: {product.weight}
                    </p>
                )}

                <p className="text-lg font-semibold text-accent mt-2">
                    ₹{product.price.toLocaleString('en-IN')}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-silver-300 rounded">
                        <button
                            onClick={() => onUpdateQuantity(productId, quantity - 1)}
                            disabled={quantity <= 1}
                            className="px-4 py-2 hover:bg-silver-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            -
                        </button>
                        <span className="px-6 py-2 border-x border-silver-300 min-w-[4rem] text-center font-medium">
                            {quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(productId, quantity + 1)}
                            className="px-4 py-2 hover:bg-silver-100 transition-colors"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={() => onRemove(productId)}
                        className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                    </button>
                </div>
            </div>

            {/* Subtotal */}
            <div className="text-right">
                <p className="text-sm text-silver-600 mb-1">Subtotal</p>
                <p className="text-xl font-bold text-accent">
                    ₹{subtotal.toLocaleString('en-IN')}
                </p>
            </div>
        </div>
    );
}
