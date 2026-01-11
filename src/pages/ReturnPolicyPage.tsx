
export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container-custom py-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="mb-8 text-center">Return & Refund Policy</h1>

                    <div className="prose prose-silver max-w-none">
                        <p className="lead text-xl text-silver-600 mb-8">
                            At Shree Shyam Silver, we are committed to ensuring your satisfaction with our silver products.
                            Please read our return and refund policy carefully.
                        </p>

                        <h3>1. Eligibility for Returns</h3>
                        <p>
                            We accept returns under the following conditions:
                        </p>
                        <ul>
                            <li>The item is damaged or defective upon delivery.</li>
                            <li>The wrong item was shipped to you.</li>
                            <li>The item must be unused, in its original packaging, and with all tags/certificates intact.</li>
                        </ul>
                        <p>
                            <strong>Note:</strong> Custom-made or personalized silver items are not eligible for returns unless defective.
                        </p>

                        <h3>2. Return Process</h3>
                        <p>
                            To initiate a return, please contact us within <strong>24 hours</strong> of receiving your delivery.
                            You can reach us at <a href="mailto:shreeshyamsilvernokha@gmail.com" className="text-accent">shreeshyamsilvernokha@gmail.com</a> or WhatsApp us at +91 85040 47243 with your Order ID and photos of the product.
                        </p>

                        <h3>3. Refunds</h3>
                        <p>
                            Once we receive the returned item and inspect it, we will notify you of the approval or rejection of your refund.
                            If approved, your refund will be processed to your original method of payment within 5-7 business days.
                        </p>

                        <h3>4. Exchange Policy</h3>
                        <p>
                            We only replace items if they are defective or damaged. If you need to exchange it for the same item, contact us immediately.
                        </p>

                        <h3>5. Shipping Costs for Returns</h3>
                        <p>
                            If the return is due to our error (wrong/damaged item), we will cover the return shipping costs.
                            For other approved returns, shipping costs are non-refundable and return shipping is at the customer's expense.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
