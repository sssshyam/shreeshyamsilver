import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';

export default function AdminCategoryFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        if (isEdit) {
            fetchCategory();
        }
    }, [id]);

    const fetchCategory = async () => {
        setLoading(true);
        const { data } = await supabase.from('categories').select('*').eq('id', id).single();
        if (data) {
            setFormData({
                name: data.name,
                slug: data.slug,
                description: data.description || '',
                image: data.image || ''
            });
        }
        setLoading(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await supabase.from('categories').update(formData).eq('id', id);
                alert('Category updated!');
            } else {
                await supabase.from('categories').insert([formData]);
                alert('Category created!');
            }
            navigate('/adminshreeshyamsilvernokha/categories');
        } catch (error) {
            console.error(error);
            alert('Error saving category');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-silver-900 mb-8">
                    {isEdit ? 'Edit Category' : 'Add New Category'}
                </h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-silver-700 mb-2">Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                    slug: generateSlug(e.target.value)
                                });
                            }}
                            className="input w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-silver-700 mb-2">Slug</label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="input w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-silver-700 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="input w-full"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/adminshreeshyamsilvernokha/categories')}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Saving...' : (isEdit ? 'Update Category' : 'Create Category')}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
