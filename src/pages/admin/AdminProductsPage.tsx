import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    // Force refresh when component gains focus or mounts
    useEffect(() => {
        const handleFocus = () => fetchProducts();
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          category:categories(*)
        `)
                .order('id', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setProducts(products.filter(p => p.id !== id));
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const toggleActive = async (id: number, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('products')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setProducts(products.map(p =>
                p.id === id ? { ...p, is_active: !currentStatus } : p
            ));
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };

    const toggleFeatured = async (id: number, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('products')
                .update({ is_featured: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setProducts(products.map(p =>
                p.id === id ? { ...p, is_featured: !currentStatus } : p
            ));
        } catch (error) {
            console.error('Error updating product featured status:', error);
            alert('Failed to update product featured status');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-silver-900">Products</h1>
                        <p className="text-silver-600 mt-2">Manage your product catalog</p>
                    </div>
                    <Link
                        to="/adminshreeshyamsilvernokha/products/new"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input max-w-md"
                    />
                </div>

                {/* Products Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                        <p className="text-silver-600">Loading products...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-silver-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">No products found</h3>
                        <p className="text-silver-600 mb-6">Get started by creating your first product</p>
                        <Link to="/adminshreeshyamsilvernokha/products/new" className="btn-primary">
                            Add Product
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-silver-50 border-b border-silver-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-silver-700 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-silver-700 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-silver-700 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-silver-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-silver-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-silver-200">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-silver-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {product.image_url && (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium text-silver-900">{product.name}</div>
                                                        <div className="text-sm text-silver-600">{product.slug}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-silver-900">
                                                    {product.category?.name || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-silver-900">
                                                    ₹{product.price.toLocaleString('en-IN')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => toggleActive(product.id, product.is_active)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${product.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {product.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                    <button
                                                        onClick={() => toggleFeatured(product.id, product.is_featured)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${product.is_featured
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                    >
                                                        {product.is_featured ? 'Featured' : 'Standard'}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        to={`/adminshreeshyamsilvernokha/products/edit/${product.id}`}
                                                        className="text-accent hover:text-accent-dark"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="mt-6 text-sm text-silver-600">
                    Showing {filteredProducts.length} of {products.length} products
                </div>
            </div>
        </AdminLayout>
    );
}
