import { useState } from 'react';

export default function CheckoutPage() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-silver-50">
            <div className="container-custom py-12">
                <h1 className="mb-8">Checkout</h1>

                {/* Progress Indicator */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-accent text-white' : 'bg-silver-200 text-silver-600'
                                }`}>
                                1
                            </div>
                            <span className="text-sm mt-2">Information</span>
                        </div>
                        <div className={`flex-1 h-1 ${step >= 2 ? 'bg-accent' : 'bg-silver-200'}`} />
                        <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-accent text-white' : 'bg-silver-200 text-silver-600'
                                }`}>
                                2
                            </div>
                            <span className="text-sm mt-2">Payment</span>
                        </div>
                        <div className={`flex-1 h-1 ${step >= 3 ? 'bg-accent' : 'bg-silver-200'}`} />
                        <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? 'bg-accent text-white' : 'bg-silver-200 text-silver-600'
                                }`}>
                                3
                            </div>
                            <span className="text-sm mt-2">Confirmation</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="card p-8">
                            <h2 className="text-2xl font-serif font-semibold mb-6">Delivery Information</h2>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">First Name *</label>
                                        <input type="text" className="input" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                                        <input type="text" className="input" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <input type="email" className="input" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                    <input type="tel" className="input" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Address *</label>
                                    <input type="text" className="input" placeholder="Street address" required />
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">City *</label>
                                        <input type="text" className="input" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">State *</label>
                                        <input type="text" className="input" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">PIN Code *</label>
                                        <input type="text" className="input" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Order Notes (Optional)</label>
                                    <textarea className="input" rows={4} placeholder="Special instructions for delivery"></textarea>
                                </div>

                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="guest" className="mt-1" />
                                    <label htmlFor="guest" className="text-sm text-silver-600">
                                        Save this information for faster checkout next time
                                    </label>
                                </div>

                                <button type="submit" className="btn-primary btn-lg w-full">
                                    Continue to Payment
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="card p-6 sticky top-24">
                            <h3 className="text-xl font-serif font-semibold mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <p className="text-silver-600 text-sm">No items in cart</p>
                            </div>

                            <div className="space-y-3 mb-6 pt-6 border-t border-silver-200">
                                <div className="flex justify-between">
                                    <span className="text-silver-600">Subtotal</span>
                                    <span className="font-medium">₹0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-silver-600">Delivery</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="border-t border-silver-200 pt-3 flex justify-between">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold text-xl text-accent">₹0</span>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="bg-silver-50 p-4 rounded-sm">
                                <div className="flex items-center gap-2 text-sm text-silver-700">
                                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secure SSL encrypted checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
