import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';

export default function AdminBlogPostFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '',
        is_published: true,
        author: 'Admin'
    });

    useEffect(() => {
        if (isEdit) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        setLoading(true);
        const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
        if (data) {
            setFormData({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || '',
                content: data.content || '',
                image: data.image || '',
                is_published: data.is_published,
                author: data.author || 'Admin'
            });
        }
        setLoading(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await supabase.from('blog_posts').update(formData).eq('id', id);
                alert('Post updated');
            } else {
                await supabase.from('blog_posts').insert([formData]);
                alert('Post created');
            }
            navigate('/adminshreeshyamsilvernokha/blogs');
        } catch (error) {
            console.error(error);
            alert('Error saving post');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-silver-900 mb-8">
                    {isEdit ? 'Edit Blog Post' : 'New Blog Post'}
                </h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-silver-700 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-silver-700 mb-2">Excerpt</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={3}
                            className="input w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-silver-700 mb-2">Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={15}
                            className="input w-full font-mono text-sm"
                            placeholder="Supports basic HTML or text..."
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.is_published}
                                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                                className="w-4 h-4 text-accent"
                            />
                            <span className="text-sm font-medium">Published</span>
                        </label>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/adminshreeshyamsilvernokha/blogs')}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
