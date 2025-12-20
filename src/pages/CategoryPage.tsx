import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';
import { getCategoryBySlug, getProductsByCategory } from '../services/api';
import { categorySEOContent } from '../data/categoryContent';

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

                if (categoryData) {
                    document.title = `${categoryData.name} | Shree Shyam Silver`;
                }

                setCategory(categoryData);
                setProducts(productsData || []);
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
            <div className="relative bg-silver-900 py-24 sm:py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={category.image_url || category.image || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1920&q=80'}
                        alt={category.name}
                        className="w-full h-full object-cover opacity-50"
                        // @ts-ignore
                        fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-silver-900/90 via-silver-900/40 to-silver-900/30" />
                </div>

                <div className="container-custom relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-serif mb-6">{category.name}</h1>
                    <p className="text-xl text-silver-100 max-w-2xl mx-auto leading-relaxed">{category.description}</p>
                    <div className="w-24 h-1 bg-accent mx-auto mt-8" />
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

            {/* SEO Content Section */}
            {slug && categorySEOContent[slug] && (
                <div className="bg-silver-50 py-16 border-t border-silver-200 mt-12">
                    <div className="container-custom max-w-4xl">
                        <h2 className="mb-8 text-center">{categorySEOContent[slug].title}</h2>
                        <div
                            className="prose prose-silver max-w-none"
                            dangerouslySetInnerHTML={{ __html: categorySEOContent[slug].content }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
