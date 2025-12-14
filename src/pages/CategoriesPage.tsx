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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/shop/category/${category.slug}`}
                                className="group block bg-white border border-silver-200 rounded-sm hover:shadow-lg transition-all duration-300 hover:border-accent"
                            >
                                <div className="p-8 text-center h-full flex flex-col justify-center items-center">
                                    <h3 className="text-xl font-serif text-silver-900 mb-2 group-hover:text-accent transition-colors">
                                        {category.name}
                                    </h3>
                                    {category.description && (
                                        <p className="text-silver-600 text-sm line-clamp-2 max-w-xs mx-auto">
                                            {category.description}
                                        </p>
                                    )}
                                    <span className="mt-4 text-xs font-medium uppercase tracking-wider text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Products
                                    </span>
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
