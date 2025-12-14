
export default function WhyChooseUsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative h-80 flex items-center bg-silver-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-accent/20" />
                </div>
                <div className="container-custom relative z-10 text-white text-center">
                    <h1 className="text-white mb-4">Why Choose Shree Shyam Silver?</h1>
                    <p className="text-xl text-silver-100 max-w-2xl mx-auto">
                        Your trusted partner for authentic silver in Nokha
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">

                        <div className="grid gap-12">
                            {/* 3 Years Legacy */}
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-full md:w-1/3">
                                    <div className="bg-accent/5 p-8 rounded-full aspect-square flex flex-col items-center justify-center text-center border-2 border-accent/20">
                                        <span className="text-5xl font-serif text-accent mb-2">3+</span>
                                        <span className="text-lg font-semibold text-silver-800">Years of Trust</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <h2 className="mb-4">Established & Trusted in Nokha</h2>
                                    <p className="text-lg text-silver-700 leading-relaxed">
                                        Shree Shyam Silver began its journey 3 years ago with a vision to bring pure and artistic silver to Nokha. In this short time, we have built lasting relationships with our customers through transparency, honest pricing, and exceptional service.
                                    </p>
                                </div>
                            </div>

                            <hr className="border-silver-200" />

                            {/* 1000+ Products */}
                            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                                <div className="w-full md:w-1/3">
                                    <div className="bg-silver-100 p-8 rounded-full aspect-square flex flex-col items-center justify-center text-center border-2 border-silver-300">
                                        <span className="text-5xl font-serif text-silver-800 mb-2">1000+</span>
                                        <span className="text-lg font-semibold text-silver-800">Handmade Products</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-2/3 text-right md:text-left">
                                    <h2 className="mb-4">Exquisite Handmade Collection</h2>
                                    <p className="text-lg text-silver-700 leading-relaxed">
                                        Discover our extensive collection of over 1000+ unique silver items. From intricate Pooja essentials to modern Home Decor, every piece is handcrafted by skilled artisans. We take pride in offering a diverse range that suits every occasion and style.
                                    </p>
                                </div>
                            </div>

                            <hr className="border-silver-200" />

                            {/* Purity */}
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-full md:w-1/3">
                                    <div className="bg-accent/5 p-8 rounded-full aspect-square flex flex-col items-center justify-center text-center border-2 border-accent/20">
                                        <span className="text-5xl font-serif text-accent mb-2">100%</span>
                                        <span className="text-lg font-semibold text-silver-800">Quality Assured</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <h2 className="mb-4">Unmatched Quality</h2>
                                    <p className="text-lg text-silver-700 leading-relaxed">
                                        We sell only authentic silver products. Our exquisite items are crafted with the highest standards of quality control. In a market where trust is everything, we stand by the quality of every gram of silver we provide, ensuring you get the premium value you deserve.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
