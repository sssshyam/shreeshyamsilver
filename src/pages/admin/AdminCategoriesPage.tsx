import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Category } from '../../types';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            setCategories(data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this category? This will affect all products in this category.')) return;

        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setCategories(categories.filter(c => c.id !== id));
            alert('Category deleted successfully!');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-silver-900">Categories</h1>
                        <p className="text-silver-600 mt-2">Manage product categories</p>
                    </div>
                    <Link
                        to="/adminshreeshyamsilvernokha/categories/new"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category
                    </Link>
                </div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                        <p className="text-silver-600">Loading categories...</p>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-silver-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">No categories found</h3>
                        <p className="text-silver-600 mb-6">Create your first category to organize products</p>
                        <Link to="/adminshreeshyamsilvernokha/categories/new" className="btn-primary">
                            Add Category
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                                {category.image && (
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-silver-900 mb-2">{category.name}</h3>
                                    <p className="text-sm text-silver-600 mb-1">Slug: {category.slug}</p>
                                    {category.description && (
                                        <p className="text-sm text-silver-700 mb-4 line-clamp-2">{category.description}</p>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-silver-200">
                                        <Link
                                            to={`/adminshreeshyamsilvernokha/categories/edit/${category.id}`}
                                            className="text-accent hover:text-accent-dark font-medium text-sm inline-flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="text-red-600 hover:text-red-700 font-medium text-sm inline-flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats */}
                {!loading && categories.length > 0 && (
                    <div className="mt-6 text-sm text-silver-600">
                        Total categories: {categories.length}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
