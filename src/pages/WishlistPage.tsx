import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
    const { wishlist, loading: wishlistLoading } = useWishlist();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlistProducts() {
            if (wishlistLoading) return;

            if (wishlist.length === 0) {
                setProducts([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*, category:categories(*)')
                    .in('id', wishlist)
                    .eq('is_active', true);

                if (error) throw error;
                setProducts(data || []);
            } catch (error) {
                console.error('Error fetching wishlist products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchWishlistProducts();
    }, [wishlist, wishlistLoading]);

    if (wishlistLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-silver-600">Loading wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-silver-50 border-b border-silver-200">
                <div className="container-custom py-12">
                    <h1 className="mb-4">My Wishlist</h1>
                    <p className="text-silver-600">
                        {products.length} {products.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto bg-silver-100 rounded-full flex items-center justify-center mb-4 text-silver-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl mb-2">Your wishlist is empty</h3>
                        <p className="text-silver-600 mb-6">Save items you love to find them easily later</p>
                        <Link to="/shop" className="btn-primary">
                            Explore Collection
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
