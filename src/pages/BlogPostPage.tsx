import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { getBlogPostBySlug, getBlogPosts } from '../services/api';

export default function BlogPostPage() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [otherPosts, setOtherPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!slug) return;

            setLoading(true);
            try {
                const postData = await getBlogPostBySlug(slug);
                setPost(postData);

                if (postData) {
                    const allPosts = await getBlogPosts();
                    const related = allPosts.filter(p => p.id !== postData.id).slice(0, 3);
                    setOtherPosts(related);
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
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
                    <p className="text-silver-600">Loading post...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="mb-4">Blog Post Not Found</h2>
                <Link to="/blog" className="btn-primary">
                    View All Posts
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Image */}
            {/* Content */}
            <article className="container-custom py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-silver-600 mb-6">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.read_time}</span>
                        <span>•</span>
                        <span>By {post.author}</span>
                    </div>

                    {/* Title */}
                    <h1 className="mb-8">{post.title}</h1>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-silver-700 leading-relaxed mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Share */}
                    <div className="mt-12 pt-8 border-t border-silver-200">
                        <p className="text-sm text-silver-600 mb-4">Share this article:</p>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-silver-100 hover:bg-accent hover:text-white transition-colors flex items-center justify-center">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-silver-100 hover:bg-accent hover:text-white transition-colors flex items-center justify-center">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-silver-100 hover:bg-accent hover:text-white transition-colors flex items-center justify-center">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {otherPosts.length > 0 && (
                <section className="bg-silver-50 py-16">
                    <div className="container-custom">
                        <h3 className="text-2xl font-serif font-semibold mb-8">Related Articles</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {otherPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="card-hover overflow-hidden group"
                                >
                                    <div className="p-6">
                                        <p className="text-sm text-silver-600 mb-2">{relatedPost.read_time}</p>
                                        <h4 className="font-serif font-medium mb-2 group-hover:text-accent transition-colors">
                                            {relatedPost.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
