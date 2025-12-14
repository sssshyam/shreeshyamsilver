import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative h-96 flex items-center bg-[url('https://img.freepik.com/free-photo/silver-metal-texture-background_53876-88695.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/40" />
                <div className="container-custom relative z-10 text-white text-center">
                    <h1 className="text-white mb-4 drop-shadow-lg">About Us</h1>
                    <p className="text-xl text-silver-100 max-w-2xl mx-auto drop-shadow-md">
                        A timeless tradition of elegance and purity
                    </p>
                </div>
            </div>

            {/* Story */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <img
                                    src="https://i.ibb.co/Qvx3vBt5/Silver-Plated-peacock-deepak-candle-12.png"
                                    alt="Silver Plated Peacock Deepak"
                                    className="w-full h-auto rounded-lg shadow-xl hover:scale-[1.02] transition-transform duration-300 object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="mb-6">Crafting Timeless Silver Masterpieces</h2>
                                <div className="space-y-6 text-lg text-silver-700 leading-relaxed">
                                    <p>
                                        Shree Shyam Silver is a premium manufacturer of silver-plated home décor and pooja items, proudly based in Nokha and Bikaner, Rajasthan. Though established just 3 years ago, our brand is built on the strong foundation of 26 years of experience that our founder, Ram Gopal Chandak, holds in Nokha’s renowned silver-work industry.
                                    </p>

                                    <p>
                                        With deep expertise in traditional silver plating and a passion for quality craftsmanship, he has transformed ShreeShyamSilver into a trusted family-run brand that blends heritage with modern elegance.
                                    </p>

                                    <p>
                                        Every product is handcrafted by skilled artisans using time-honoured techniques, supported by strict quality checks to ensure long-lasting shine and durability. From pooja essentials to home décor accents, our pieces reflect our core values—authentic craftsmanship, consistent quality, and timeless beauty.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="w-full">
                <div className="grid md:grid-cols-2">
                    {/* Silver Bowls */}
                    <div className="relative bg-[#6B7C8E] overflow-hidden group min-h-[400px]">
                        <div className="absolute inset-0 flex justify-end">
                            <img
                                src="https://i.ibb.co/TDgxmzhw/IMG-8957.jpg"
                                alt="Pooja Décor"
                                className="h-full w-2/3 object-cover object-center opacity-100 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#6B7C8E] via-[#6B7C8E]/80 to-transparent" />
                        </div>
                        <div className="relative z-10 p-12 h-full flex flex-col justify-center max-w-lg">
                            <h2 className="text-3xl text-white mb-6 font-serif">Pooja Décor</h2>
                            <p className="text-silver-100 mb-8 text-lg leading-relaxed">
                                Discover a thoughtfully curated range of pooja décor essentials, beautifully crafted to add grace and purity to your sacred spaces. From intricately designed pooja thalis, diyas, jyots, and kalash to timeless silver and silver-plated articles — our collection is perfect for daily rituals, festivals, and special occasions.
                            </p>
                            <Link to="/shop/category/pooja-and-home-decor" className="inline-block border border-white text-white px-8 py-3 hover:bg-white hover:text-[#6B7C8E] transition-colors w-fit uppercase tracking-wider text-sm">
                                Explore More
                            </Link>
                        </div>
                    </div>

                    {/* Silver Jars */}
                    <div className="relative bg-[#0B1C38] overflow-hidden group min-h-[400px]">
                        <div className="absolute inset-0 flex justify-end">
                            <img
                                src="https://i.ibb.co/JwvY0X96/IMG-8961.jpg"
                                alt="Home Décor"
                                className="h-full w-2/3 object-cover object-center opacity-100 group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Reduced gradient opacity to show image better */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C38] via-[#0B1C38]/60 to-transparent" />
                        </div>
                        <div className="relative z-10 p-12 h-full flex flex-col justify-center max-w-lg">
                            <h2 className="text-3xl text-white mb-6 font-serif">Home Décor</h2>
                            <p className="text-silver-100 mb-8 text-lg leading-relaxed">
                                Elevate your home with our exquisite collection of silver and silver-plated décor pieces designed to blend tradition with modern elegance. Whether it’s for hosting guests, festive styling, or everyday luxury, our décor accents, serveware, and statement pieces bring charm and sophistication to every corner of your home.
                            </p>
                            <Link to="/shop/category/decorative-bowls" className="inline-block border border-white text-white px-8 py-3 hover:bg-white hover:text-[#0B1C38] transition-colors w-fit uppercase tracking-wider text-sm">
                                Explore More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-silver-50">
                <div className="container-custom">
                    <h2 className="mb-12 text-center">Our Values</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="mb-3">Purity</h3>
                            <p className="text-silver-600">
                                We use only premium quality silver, certified for authenticity
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                                    <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                </svg>
                            </div>
                            <h3 className="mb-3">Craftsmanship</h3>
                            <p className="text-silver-600">
                                Every piece is handcrafted by skilled artisans using traditional techniques
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="mb-3">Trust</h3>
                            <p className="text-silver-600">
                                3 years of serving families with integrity, transparency, and dedication
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section-padding">
                <div className="container-custom">
                    <h2 className="mb-12 text-center">Our Crafting Process</h2>

                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 flex-shrink-0 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-xl">
                                1
                            </div>
                            <div>
                                <h4 className="mb-2">Sourcing Silver Plated</h4>
                                <p className="text-silver-600">
                                    We source only the finest quality silver from certified suppliers, ensuring
                                    premium quality for all our creations.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 flex-shrink-0 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-xl">
                                2
                            </div>
                            <div>
                                <h4 className="mb-2">Design & Planning</h4>
                                <p className="text-silver-600">
                                    Our master craftsmen carefully plan each piece, combining traditional motifs
                                    with contemporary aesthetics.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 flex-shrink-0 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-xl">
                                3
                            </div>
                            <div>
                                <h4 className="mb-2">Handcrafting</h4>
                                <p className="text-silver-600">
                                    Using techniques passed down through generations, our artisans meticulously
                                    craft each piece by hand.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 flex-shrink-0 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-xl">
                                4
                            </div>
                            <div>
                                <h4 className="mb-2">Quality Assurance</h4>
                                <p className="text-silver-600">
                                    Every piece undergoes rigorous quality checks and receives authenticity
                                    certification before reaching you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-accent text-white">
                <div className="container-custom text-center">
                    <h2 className="text-white mb-6">Experience Our Legacy</h2>
                    <p className="text-xl text-silver-100 mb-8 max-w-2xl mx-auto">
                        Discover handcrafted silver pieces that carry 3 years of trust and purity
                    </p>
                    <Link to="/shop" className="btn bg-white text-silver-900 hover:bg-silver-100 border-none btn-lg">
                        Explore Collection
                    </Link>
                </div>
            </section>
        </div>
    );
}
