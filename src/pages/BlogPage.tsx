import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { getBlogPosts } from '../services/api';

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const posts = await getBlogPosts();
                setBlogPosts(posts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-silver-600">Loading blog posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-silver-50 border-b border-silver-200">
                <div className="container-custom py-12">
                    <h1 className="mb-4">Our Blog</h1>
                    <p className="text-silver-600 text-lg max-w-2xl">
                        Insights on silver care, traditions, and the art of handcrafted silverware
                    </p>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="container-custom py-12">
                {blogPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className="card-hover overflow-hidden group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-silver-600 mb-3">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.read_time}</span>
                                    </div>
                                    <h3 className="text-xl font-serif font-medium mb-3 group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-silver-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-accent font-medium">
                                        <span>Read More</span>
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-silver-600">No blog posts available</p>
                    </div>
                )}
            </div>
        </div>
    );
}
