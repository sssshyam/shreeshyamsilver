export default function NokhaPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-96 flex items-center bg-[url('https://img.freepik.com/free-photo/silver-metal-texture-background_53876-88695.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/40" />
                <div className="container-custom relative z-10 text-white text-center">
                    <h1 className="text-white mb-4 drop-shadow-lg">Our Home in Nokha, Rajasthan</h1>
                    <p className="text-xl text-silver-100 max-w-2xl mx-auto drop-shadow-md">
                        Serving the community with authentic handcrafted silver since 2022
                    </p>
                </div>
            </div>

            {/* About Nokha Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <img
                                    src="https://i.ibb.co/hJ0Z10n1/Whats-App-Image-2025-12-13-at-7-17-43-PM.jpg"
                                    alt="Nokha Showroom"
                                    className="rounded-lg shadow-xl w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>
                            <div>
                                <h2 className="mb-6">Visit Our Showroom in Nokha</h2>
                                <p className="text-lg text-silver-700 leading-relaxed mb-6">
                                    We are proud to be located in Nokha, the heart of traditional craftsmanship. Our showroom
                                    established in this historic town is not just a shop, but a destination where you can
                                    experience the brilliance of authentic silver firsthand.
                                </p>
                                <p className="text-lg text-silver-700 leading-relaxed">
                                    Whether you are from Nokha or visiting, we invite you to our shop to see our premium
                                    collection of pooja items and home decor. With 3 years of established presence and
                                    deep local roots, we are your trusted silver partner in Nokha.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact & Location Section */}
            <section className="section-padding bg-silver-50">
                <div className="container-custom">
                    <h2 className="text-center mb-12">Visit Our Showroom</h2>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <div className="card p-8">
                                <h3 className="text-2xl font-serif font-semibold mb-6">Contact Information</h3>

                                {/* Address */}
                                <div className="mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Address</h4>
                                            <p className="text-silver-700 leading-relaxed">
                                                Tehsil Road, Near Ambedkar Circle<br />
                                                Nokha, Rajasthan - 334803
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Phone</h4>
                                            <a href="tel:+918504047243" className="text-accent hover:underline text-lg">
                                                +91 85040 47243
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Email</h4>
                                            <a href="mailto:shreeshyamsilvernokha@gmail.com" className="text-accent hover:underline">
                                                shreeshyamsilvernokha@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <div className="mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">WhatsApp</h4>
                                            <a
                                                href="https://wa.me/918504047243"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-sm hover:bg-green-700 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                </svg>
                                                Chat on WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Hours */}
                                <div className="pt-6 border-t border-silver-200">
                                    <h4 className="font-semibold mb-3">Business Hours</h4>
                                    <div className="space-y-2 text-silver-700">
                                        <div className="flex justify-between">
                                            <span>Monday - Saturday</span>
                                            <span className="font-medium">10:00 AM - 8:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sunday</span>
                                            <span className="font-medium">11:00 AM - 6:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div>
                            <div className="card p-4">
                                <h3 className="text-2xl font-serif font-semibold mb-6">Find Us on Map</h3>
                                <div className="rounded-sm overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18549.393250947494!2d73.46214150932106!3d27.54574616965854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396aa9e874b81b99%3A0xa1ab46079c719445!2sTahasil%20nokha!5e0!3m2!1sen!2sin!4v1765649310043!5m2!1sen!2sin"
                                        width="100%"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Shree Shyam Silver Nokha Location"
                                    />
                                </div>
                                <div className="mt-4">
                                    <a
                                        href="https://maps.google.com/?q=HF4G+2WR,+Nokha,+Rajasthan+334803"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary w-full text-center"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Visit Us Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-center mb-12">Why Visit Our Nokha Showroom?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-3">Authentic Products</h3>
                            <p className="text-silver-600">
                                Each piece is quality checked and comes with authenticity certificate
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-3">Expert Guidance</h3>
                            <p className="text-silver-600">
                                Our experienced staff helps you choose the perfect piece for your needs
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-3">Custom Orders</h3>
                            <p className="text-silver-600">
                                We create bespoke silver pieces tailored to your specific requirements
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
