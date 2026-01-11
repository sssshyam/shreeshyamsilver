import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { BlogPost } from '../../types';

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (error) console.error('Error fetching posts:', error);
        else setPosts(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (error) {
            alert('Error deleting post');
        } else {
            setPosts(posts.filter(p => p.id !== id));
            alert('Post deleted');
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-silver-900">Blog Posts</h1>
                    <Link to="/adminshreeshyamsilvernokha/blogs/new" className="btn-primary">
                        + New Post
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded shadow">
                        <p className="text-silver-600 mb-4">No blog posts found.</p>
                        <Link to="/adminshreeshyamsilvernokha/blogs/new" className="btn-primary">Create First Post</Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-silver-200">
                            <thead className="bg-silver-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-silver-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-silver-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-silver-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-silver-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-silver-200">
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-silver-900">{post.title}</div>
                                            <div className="text-sm text-silver-500">{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-silver-500">
                                            {post.created_at ? new Date(post.created_at).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {post.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/adminshreeshyamsilvernokha/blogs/edit/${post.id}`} className="text-accent hover:text-accent-dark mr-4">Edit</Link>
                                            <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
