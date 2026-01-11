import { Link } from 'react-router-dom';
import { Product } from '../types';
import AddToCartButton from './cart/AddToCartButton';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Get category name from the nested category object or fallback
    const categoryName = product.category?.name || 'Product';

    // Get the main image - use image_url first, then gallery_images[0], then fallback
    const mainImage = product.image_url ||
        (product.gallery_images && product.gallery_images.length > 0 ? product.gallery_images[0] : null) ||
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop';

    return (
        <div className="card-hover overflow-hidden group">
            <Link to={`/product/${product.slug}`}>
                <div className="relative overflow-hidden">
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

                    {/* Wishlist Button */}
                    <div className="absolute top-4 right-4 z-10 transition-transform duration-300 hover:scale-110">
                        <WishlistButton productId={product.id} className="w-8 h-8 bg-white rounded-full shadow-md" />
                    </div>

                    {/* Featured Badge */}
                    {product.is_featured && (
                        <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-xs font-medium rounded-full">
                            Featured
                        </div>
                    )}

                    {/* Hallmark Badge (if exists) */}
                    {product.hallmark && (
                        <div className="absolute bottom-4 left-4 badge-hallmark">
                            BIS Hallmark
                        </div>
                    )}

                    {/* Out of Stock Overlay */}
                    {product.in_stock === false && (
                        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                            <span className="text-silver-600 font-medium">Out of Stock</span>
                        </div>
                    )}
                </div>

                <div className="p-6">
                    <p className="text-sm text-silver-600 mb-2">{categoryName}</p>
                    <h3 className="text-lg font-serif font-medium text-silver-900 mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    {/* Show purity and weight if available */}
                    {(product.purity || product.weight) && (
                        <div className="flex items-baseline gap-2 mb-3">
                            {product.purity && <p className="text-sm text-silver-600">{product.purity}</p>}
                            {product.purity && product.weight && <span className="text-silver-400">•</span>}
                            {product.weight && <p className="text-sm text-silver-600">{product.weight}</p>}
                        </div>
                    )}

                    <p className="text-xl font-semibold text-accent mb-4">
                        ₹{product.price.toLocaleString('en-IN')}
                    </p>
                </div>
            </Link>

            {/* Add to Cart Button */}
            <div className="px-6 pb-6" onClick={(e) => e.stopPropagation()}>
                <AddToCartButton product={product} className="w-full" />
            </div>
        </div>
    );
}
