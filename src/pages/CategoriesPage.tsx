import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Category } from '../types';
import { getCategories } from '../services/api';
import { categorySEOContent } from '../data/categoryContent';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true);
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-silver-600">Loading categories...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-silver-50 border-b border-silver-200 py-16">
                <div className="container-custom text-center">
                    <h1 className="text-silver-900 mb-4">Shop By Category</h1>
                    <p className="text-xl text-silver-600 max-w-2xl mx-auto">
                        Explore our wide range of handcrafted silver collections
                    </p>
                    <div className="w-24 h-1 bg-accent mx-auto mt-8" />
                </div>
            </div>

            {/* Categories Grid */}
            <div className="container-custom py-16">
                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/shop/category/${category.slug}`}
                                className="card-hover group block bg-white border border-silver-200 overflow-hidden"
                            >
                                {/* Category Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={category.image_url || category.image || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop'}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
                                            {category.name}
                                        </h3>
                                        {category.description && (
                                            <p className="text-white/80 text-sm line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                {category.description}
                                            </p>
                                        )}
                                        <div className="w-12 h-0.5 bg-accent mx-auto group-hover:w-20 transition-all duration-300" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                ) : (
                    <div className="text-center py-16">
                        <p className="text-silver-600">No categories found.</p>
                    </div>
                )}
            </div>

            {/* SEO Content Section */}
            <div className="bg-silver-50 py-16 border-t border-silver-200">
                <div className="container-custom max-w-4xl">
                    <h2 className="mb-8 text-center">{categorySEOContent['main-categories'].title}</h2>
                    <div
                        className="prose prose-silver max-w-none"
                        dangerouslySetInnerHTML={{ __html: categorySEOContent['main-categories'].content }}
                    />
                </div>
            </div>
        </div >
    );
}
