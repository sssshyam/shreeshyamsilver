
export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container-custom py-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="mb-8 text-center">Shipping & Delivery Policy</h1>

                    <div className="prose prose-silver max-w-none">
                        <h3>1. Shipping Coverage</h3>
                        <p>
                            We ship our silver products across India. We use trusted courier partners to ensure your order reaches you safely.
                        </p>

                        <h3>2. Delivery Timelines</h3>
                        <p>
                            <strong>Standard Delivery:</strong> 5-7 business days.<br />
                            <strong>Remote Areas:</strong> 7-10 business days.<br />
                            Processing time: Orders are usually processed and dispatched within 1-2 business days.
                        </p>

                        <h3>3. Shipping Charges</h3>
                        <p>
                            Shipping charges may vary based on the weight of the package and the delivery location.
                            Free shipping may be available for orders above a certain value, as indicated on the website.
                        </p>

                        <h3>4. Tracking</h3>
                        <p>
                            Once your order is shipped, you will receive a tracking number via email/SMS to track your package.
                        </p>

                        <h3>5. Packaging</h3>
                        <p>
                            We take extra care in packaging silver items to prevent any damage during transit. All items are packed in secure, tamper-proof packaging.
                        </p>

                        <h3>6. Insurance</h3>
                        <p>
                            All high-value shipments are insured during transit until they are delivered to your doorstep.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
