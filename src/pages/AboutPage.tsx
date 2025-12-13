import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative h-96 flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=2000&h=800&fit=crop"
                        alt="Our Heritage"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="container-custom relative z-10 text-white">
                    <h1 className="text-white mb-4">Our Heritage</h1>
                    <p className="text-xl text-silver-100 max-w-2xl">
                        Three generations of master craftsmen, one timeless tradition
                    </p>
                </div>
            </div>

            {/* Story */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="mb-8 text-center">A Legacy of Excellence Since 1950</h2>

                        <div className="space-y-6 text-lg text-silver-700 leading-relaxed">
                            <p>
                                Our journey began in 1950 when our grandfather, a master silversmith, opened a small workshop
                                in the heart of Mumbai. With nothing but his skills, dedication, and an unwavering commitment
                                to quality, he laid the foundation of what would become a trusted name in handcrafted silver.
                            </p>

                            <p>
                                For over 75 years, we have been creating exquisite silver pieces that blend traditional
                                artistry with timeless elegance. Each generation has added its own expertise while preserving
                                the core values that define us: purity, authenticity, and craftsmanship.
                            </p>

                            <p>
                                Today, we are proud to serve thousands of families across India, creating pieces that become
                                part of their most cherished moments—from daily prayers to grand celebrations, from intimate
                                family gatherings to milestone occasions.
                            </p>
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
                                We use only 99.9% pure silver and 92.5% sterling silver, certified by BIS hallmark
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
                                75+ years of serving families with integrity, transparency, and dedication
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
                                <h4 className="mb-2">Sourcing Pure Silver</h4>
                                <p className="text-silver-600">
                                    We source only the finest quality silver from certified suppliers, ensuring
                                    99.9% purity for all our creations.
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
                                    Every piece undergoes rigorous quality checks and receives BIS hallmark
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
                        Discover handcrafted silver pieces that carry 75 years of tradition and trust
                    </p>
                    <Link to="/shop" className="btn-secondary border-white text-white hover:bg-white hover:text-accent btn-lg">
                        Explore Collection
                    </Link>
                </div>
            </section>
        </div>
    );
}
