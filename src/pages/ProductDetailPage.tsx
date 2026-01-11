import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProductBySlug, getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import AuthModal from '../components/auth/AuthModal';
import ImageModal from '../components/ui/ImageModal';
import WishlistButton from '../components/WishlistButton';

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showImageModal, setShowImageModal] = useState(false);

    // Auth & UI States
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (!slug) return;

            setLoading(true);
            try {
                const productData = await getProductBySlug(slug);
                setProduct(productData);

                if (productData) {
                    document.title = `${productData.name} | Shree Shyam Silver`;
                    // Fetch related products from same category
                    const allProducts = await getProducts();
                    const related = allProducts
                        .filter(p => p.category_id === productData.category_id && p.id !== productData.id)
                        .slice(0, 4);
                    setRelatedProducts(related);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [slug]);

    const handleAddToCart = async () => {
        if (!product) return;

        // Check if user is logged in
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        setAddingToCart(true);
        try {
            const success = await addToCart(product, quantity);
            if (success) {
                alert("Product added to cart successfully!");
            } else {
                alert("Failed to add to cart. Please try again.");
            }
        } catch (error) {
            console.error('Add to cart error:', error);
            alert("An error occurred.");
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-silver-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="mb-4">Product Not Found</h2>
                <Link to="/shop" className="btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const categoryName = product.category?.name || 'Product';
    const categorySlug = product.category?.slug || 'shop';

    // Build unique images array
    const rawImages = [];
    if (product.image_url) rawImages.push(product.image_url);
    if (product.gallery_images && product.gallery_images.length > 0) {
        rawImages.push(...product.gallery_images);
    }
    // Remove duplicates
    const productImages = Array.from(new Set(rawImages));

    // Fallback image if no images exist
    if (productImages.length === 0) {
        productImages.push('https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=1200&fit=crop');
    }

    return (
        <div className="min-h-screen bg-white">
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                defaultMode="login"
            />

            <ImageModal
                isOpen={showImageModal}
                onClose={() => setShowImageModal(false)}
                images={productImages}
                initialIndex={selectedImage}
            />

            {/* Breadcrumb */}
            <div className="border-b border-silver-200">
                <div className="container-custom py-4">
                    <div className="flex items-center gap-2 text-sm text-silver-600">
                        <Link to="/" className="hover:text-accent">Home</Link>
                        <span>/</span>
                        <Link to="/shop" className="hover:text-accent">Shop</Link>
                        <span>/</span>
                        <Link to={`/shop/category/${categorySlug}`} className="hover:text-accent">
                            {categoryName}
                        </Link>
                        <span>/</span>
                        <span className="text-accent">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="container-custom py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Images */}
                    <div>
                        {/* Main Image */}
                        <div
                            className="mb-4 border border-silver-200 rounded-sm overflow-hidden relative group bg-white h-[400px] md:h-[500px] flex items-center justify-center cursor-zoom-in"
                            onClick={() => setShowImageModal(true)}
                        >
                            <img
                                src={productImages[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                            />

                            {/* Wishlist Button Overlay */}
                            <div className="absolute top-4 right-4 z-20">
                                <WishlistButton productId={product.id} className="w-10 h-10 bg-white rounded-full shadow-lg hover:scale-110" />
                            </div>

                            {/* View Fullscreen Hint */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Click to enlarge
                            </div>

                            {/* Navigation Arrows (Only for preview, also available in modal) */}
                            {productImages.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-silver-800 rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-110 z-10 border border-silver-100 opacity-0 group-hover:opacity-100"
                                        aria-label="Previous Image"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-silver-800 rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-110 z-10 border border-silver-100 opacity-0 group-hover:opacity-100"
                                        aria-label="Next Image"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {productImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`border-2 rounded-sm overflow-hidden transition-all bg-white relative ${selectedImage === index ? 'border-accent' : 'border-silver-200 hover:border-silver-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full aspect-square object-contain"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div>
                        <h1 className="mb-4">{product.name}</h1>

                        {/* Price */}
                        <div className="mb-6">
                            <p className="text-4xl font-semibold text-accent mb-2">
                                ₹{product.price.toLocaleString('en-IN')}
                            </p>
                            <p className="text-silver-600">Inclusive of all taxes</p>
                        </div>

                        {/* Key Details - Only show if data exists */}
                        {(product.purity || product.weight || product.hallmark) && (
                            <div className="grid grid-cols-2 gap-4 mb-6 p-6 bg-silver-50 rounded-sm">
                                {product.purity && (
                                    <div>
                                        <p className="text-sm text-silver-600 mb-1">Purity</p>
                                        <p className="font-semibold text-accent">{product.purity}</p>
                                    </div>
                                )}
                                {product.weight && (
                                    <div>
                                        <p className="text-sm text-silver-600 mb-1">Weight</p>
                                        <p className="font-semibold text-accent">{product.weight}</p>
                                    </div>
                                )}
                                {product.hallmark && (
                                    <div className="col-span-2">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-semibold text-accent">Authenticity Certified</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Stock Status */}
                        {product.in_stock !== undefined && (
                            product.in_stock ? (
                                <div className="flex items-center gap-2 text-green-600 mb-6">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium">In Stock</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-red-600 mb-6">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium">Out of Stock</span>
                                </div>
                            )
                        )}

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Quantity</label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border border-silver-300 rounded-sm hover:border-accent transition-colors"
                                    disabled={product.in_stock === false}
                                >
                                    -
                                </button>
                                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border border-silver-300 rounded-sm hover:border-accent transition-colors"
                                    disabled={product.in_stock === false}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.in_stock === false || addingToCart}
                            className="btn-primary btn-lg w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {addingToCart ? 'Adding...' : 'Add to Cart'}
                        </button>

                        {/* Trust Reassurance */}
                        <div className="space-y-3 text-sm text-silver-600 mb-8">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                </svg>
                                <span>Free secure delivery on all orders</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Authenticity certificate included</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>7-day return policy</span>
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="border-t border-silver-200 pt-6 mb-6">
                                <h3 className="text-xl font-serif font-semibold mb-3">Description</h3>
                                <p className="text-silver-700 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Highlights */}
                        {product.highlights && product.highlights.length > 0 && (
                            <div className="border-t border-silver-200 pt-6 mb-6">
                                <h3 className="text-xl font-serif font-semibold mb-3">Highlights</h3>
                                <ul className="list-disc list-inside space-y-2 text-silver-700">
                                    {product.highlights.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Note */}
                        {product.note && (
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-sm mb-6">
                                <h4 className="font-semibold text-blue-900 mb-2">Note:</h4>
                                <p className="text-blue-800 text-sm whitespace-pre-line">{product.note}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Below the Fold Content */}
                <div className="mt-16 space-y-12">
                    {/* Dimensions & Sizing (New Section) */}
                    {(product.size || product.dimensions || product.length || product.width || product.height || product.diameter) && (
                        <div>
                            <h3 className="text-2xl font-serif font-semibold mb-6">Dimensions & Sizing</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {product.size && (
                                    <div className="flex justify-between p-4 bg-silver-50 rounded-sm">
                                        <span className="text-silver-600">Size</span>
                                        <span className="font-medium text-accent">{product.size}</span>
                                    </div>
                                )}
                                {product.dimensions && (
                                    <div className="flex justify-between p-4 bg-silver-50 rounded-sm">
                                        <span className="text-silver-600">Dimensions</span>
                                        <span className="font-medium text-accent">{product.dimensions}</span>
                                    </div>
                                )}
                                {product.length && (
                                    <div className="flex justify-between p-4 bg-silver-50 rounded-sm">
                                        <span className="text-silver-600">Length</span>
                                        <span className="font-medium text-accent">{product.length}</span>
                                    </div>
                                )}
                                {product.width && (
                                    <div className="flex justify-between p-4 bg-silver-50 rounded-sm">
                                        <span className="text-silver-600">Width</span>
                                        <span className="font-medium text-accent">{product.width}</span>
                                    </div>
                                )}
                                {product.height && (
                                    <div className="flex justify-between p-4 bg-silver-50 rounded-sm">
                                        <span className="text-silver-600">Height</span>
                                        <span className="font-medium text-accent">{product.height}</span>
                                    </div>
                                )}
                                {product.diameter && (
                                    <div className="flex justify-between p-4 bg-silver-50 rounded-sm">
                                        <span className="text-silver-600">Diameter</span>
                                        <span className="font-medium text-accent">{product.diameter}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Specifications */}
                    {product.specifications && product.specifications.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-serif font-semibold mb-6">Specifications</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {product.specifications.map((spec, index) => (
                                    <div key={index} className="flex justify-between p-4 bg-silver-50 rounded-sm">
                                        <span className="text-silver-600">{spec.label}</span>
                                        <span className="font-medium text-accent">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Silver Care */}
                    {product.care_instructions && product.care_instructions.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-serif font-semibold mb-6">Silver Care</h3>
                            <ul className="space-y-3">
                                {product.care_instructions.map((instruction, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-silver-700">{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Delivery & Returns */}
                    <div>
                        <h3 className="text-2xl font-serif font-semibold mb-6">Delivery & Returns</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-silver-50 rounded-sm">
                                <h4 className="font-semibold mb-3">Delivery Information</h4>
                                <ul className="space-y-2 text-silver-700">
                                    <li>• Free delivery on all orders</li>
                                    <li>• Secure packaging with insurance</li>
                                    <li>• Delivery within 5-7 business days</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-silver-50 rounded-sm">
                                <h4 className="font-semibold mb-3">Return Policy</h4>
                                <ul className="space-y-2 text-silver-700">
                                    <li>• 7-day return window</li>
                                    <li>• Product must be unused</li>
                                    <li>• Original packaging required</li>
                                    <li>• Full refund guaranteed</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-serif font-semibold mb-6">You May Also Like</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map(relatedProduct => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Mobile CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-silver-200 p-4 z-40">
                <button
                    onClick={handleAddToCart}
                    disabled={product.in_stock === false || addingToCart}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add to Cart - ₹{product.price.toLocaleString('en-IN')}
                </button>
            </div>
        </div>
    );
}
