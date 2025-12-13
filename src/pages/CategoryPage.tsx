import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';
import { getCategoryBySlug, getProductsByCategory } from '../services/api';

export default function CategoryPage() {
    const { slug } = useParams();
    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!slug) return;

            setLoading(true);
            setError(null);
            console.log('🔍 Fetching category:', slug);

            try {
                const [categoryData, productsData] = await Promise.all([
                    getCategoryBySlug(slug),
                    getProductsByCategory(slug)
                ]);

                console.log('📦 Category data:', categoryData);
                console.log('📦 Products data:', productsData);

                if (!categoryData) {
                    setError(`Category "${slug}" not found in database`);
                }

                setCategory(categoryData);
                setProducts(productsData);
            } catch (error) {
                console.error('❌ Error fetching category data:', error);
                setError('Failed to load category data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-silver-600">Loading category...</p>
                </div>
            </div>
        );
    }

    if (error || !category) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="mb-4">Category Not Found</h2>
                <p className="text-silver-600 mb-6">
                    {error || `The category "${slug}" does not exist.`}
                </p>
                <p className="text-sm text-silver-500 mb-6">
                    Available categories can be found on the shop page.
                </p>
                <Link to="/shop" className="btn-primary">
                    View All Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Category Header */}
            <div className="relative h-80 flex items-center">
                <div className="absolute inset-0">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="container-custom relative z-10 text-white">
                    <h1 className="text-white mb-4">{category.name}</h1>
                    <p className="text-xl text-silver-100">{category.description}</p>
                </div>
            </div>

            {/* Products */}
            <div className="container-custom py-12">
                <div className="mb-8">
                    <p className="text-silver-600">
                        {products.length} {products.length === 1 ? 'product' : 'products'}
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <svg className="w-16 h-16 mx-auto text-silver-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-xl mb-2">No products in this category yet</h3>
                        <p className="text-silver-600 mb-6">
                            Products will appear here once they are added to the "{category.name}" category.
                        </p>
                        <Link to="/shop" className="btn-primary">
                            View All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
