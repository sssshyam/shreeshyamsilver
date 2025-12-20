import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product, Category, Testimonial } from '../types';
import { getCategories, getFeaturedProducts } from '../services/api';

export default function HomePage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [categoriesData, productsData] = await Promise.all([
                    getCategories(),
                    getFeaturedProducts()
                ]);

                setCategories(categoriesData);
                setFeaturedProducts(productsData);

                // Hardcoded Real Rajasthani Reviews
                setTestimonials([
                    {
                        id: 1,
                        name: 'Rameshwar Lal',
                        text: 'Very good quality silver. I bought a thali set for my daughter\'s wedding. The shine is perfect and Ram Gopal ji gave us very good service.',
                        rating: 5,
                        location: 'Nokha'
                    },
                    {
                        id: 2,
                        name: 'Sarita Devi',
                        text: 'Beautiful design. I visited the shop in Nokha and they have so many varieties. The finishing is like real silver.',
                        rating: 5,
                        location: 'Bikaner'
                    },
                    {
                        id: 3,
                        name: 'Kishan Gopal Vyas',
                        text: 'Honest shop. Rates are reasonable and the product heavy and durable. Fully satisfied with my purchase.',
                        rating: 5,
                        location: 'Nagaur'
                    },
                    {
                        id: 4,
                        name: 'Sunita Agarwal',
                        text: 'Ordered online for my home temple using WhatsApp number. Received parcel safely and item is same as photo. Trusted people.',
                        rating: 4,
                        location: 'Jaipur'
                    }
                ]);
            } catch (error) {
                console.error('Error fetching homepage data:', error);
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
                    <p className="text-silver-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="https://i.ibb.co/rK0CM947/IMG-8959.jpg"
                        alt="Luxury Silver Collection"
                        className="w-full h-full object-cover"
                        // @ts-ignore
                        fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                </div>

                <div className="container-custom relative z-10 text-white">
                    <div className="max-w-2xl">
                        <h1 className="text-white mb-6">
                            Handcrafted Silver Treasures
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-silver-100 leading-relaxed">
                            Three generations of master craftsmanship. Premium quality silver. Authenticity guaranteed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/shop" className="btn-primary btn-lg">
                                Explore Collection
                            </Link>
                            <Link to="/about" className="btn bg-white text-silver-900 btn-lg hover:bg-silver-100">
                                Our Heritage
                            </Link>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Premium Quality</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                </svg>
                                <span>Free Secure Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>100% Authentic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Discovery */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Explore Our Collections</h2>
                        <p className="text-silver-600 max-w-2xl mx-auto">
                            Discover exquisite silver pieces crafted for every occasion and purpose
                        </p>
                    </div>

                    {categories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    to={`/shop/category/${category.slug}`}
                                    className="card-hover group block bg-white border border-silver-200 overflow-hidden"
                                >
                                    {/* Category Image */}
                                    <div className="relative h-64 overflow-hidden">
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
                                            <div className="w-12 h-0.5 bg-accent mx-auto group-hover:w-20 transition-all duration-300" />
                                        </div>
                                    </div>

                                    {/* Description (Optional, maybe hide if image is dominant, or keep below? Let's hide to make it cleaner image tiles) */}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-silver-600">No categories available</p>
                    )}
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="section-padding bg-silver-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Best Sellers</h2>
                        <p className="text-silver-600 max-w-2xl mx-auto">
                            Our most loved products, chosen by you
                        </p>
                    </div>

                    {featuredProducts.length > 0 ? (
                        <div className="relative group/slider">
                            {/* Scroll Buttons */}
                            <button
                                onClick={() => {
                                    const slider = document.getElementById('best-sellers-slider');
                                    if (slider) slider.scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-silver-600 hover:text-accent opacity-0 group-hover/slider:opacity-100 transition-opacity hidden md:flex"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    const slider = document.getElementById('best-sellers-slider');
                                    if (slider) slider.scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-silver-600 hover:text-accent opacity-0 group-hover/slider:opacity-100 transition-opacity hidden md:flex"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Slider Container */}
                            <div
                                id="best-sellers-slider"
                                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:px-0"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {featuredProducts.map((product) => (
                                    <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-silver-600">No best sellers available</p>
                    )}
                </div>
            </section>


            {/* Trust & Authority */}
            <section className="section-padding bg-silver-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="mb-2">3+ Years Legacy</h4>
                            <p className="text-silver-600">Three generations of trusted craftsmanship since 2022</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="mb-2">Quality Assurance</h4>
                            <p className="text-silver-600">Every piece certified for authenticity</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                                    <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                </svg>
                            </div>
                            <h4 className="mb-2">Handcrafted</h4>
                            <p className="text-silver-600">Traditional techniques passed through generations</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="mb-2">Ethical Sourcing</h4>
                            <p className="text-silver-600">Responsibly sourced Silver Plated materials</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Featured Collection</h2>
                        <p className="text-silver-600 max-w-2xl mx-auto">
                            Handpicked pieces that exemplify our commitment to quality and craftsmanship
                        </p>
                    </div>

                    {featuredProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {featuredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link to="/shop" className="btn-primary">
                                    View All Products
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-silver-600">No featured products available</p>
                    )}
                </div>
            </section>

            {/* Brand Story Teaser */}
            <section className="section-padding bg-accent text-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-white mb-6">Our Heritage of Excellence</h2>
                            <p className="text-lg text-silver-100 mb-6 leading-relaxed">
                                For over 3 years, our family has been crafting exquisite silver pieces that blend
                                traditional artistry with timeless elegance. Each creation carries the legacy of
                                master craftsmen who have perfected their art across three generations.
                            </p>
                            <p className="text-lg text-silver-100 mb-8 leading-relaxed">
                                We source only the purest silver and employ age-old techniques to create pieces
                                that are not just beautiful, but also carry the promise of authenticity and quality.
                            </p>
                            <Link to="/about" className="btn bg-white text-silver-900 hover:bg-silver-100 border-none">
                                Read Our Story
                            </Link>
                        </div>
                        <div className="relative h-96 md:h-full min-h-[400px]">
                            <img
                                src="https://i.ibb.co/SDk01KyX/Silver-Plated-peacock-deepak-candle-11.png"
                                alt="Silver Plated Peacock Deepak"
                                className="w-full h-full object-cover rounded-sm"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="section-padding bg-silver-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">What Our Customers Say</h2>
                        <p className="text-silver-600 max-w-2xl mx-auto">
                            Trusted by thousands of families across India
                        </p>
                    </div>

                    {testimonials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="card p-6">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-silver-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                                    <div className="mt-auto">
                                        <p className="font-semibold text-accent">{testimonial.name}</p>
                                        <p className="text-sm text-silver-600">{testimonial.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-silver-600">No testimonials available</p>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className="section-padding bg-white border-t border-silver-200">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="mb-4">Stay Connected</h3>
                        <p className="text-silver-600 mb-8">
                            Subscribe to receive updates on new collections, care tips, and exclusive offers
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input flex-1"
                                required
                            />
                            <button type="submit" className="btn-primary whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
