
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        Razorpay: new (options: any) => any;
    }
}

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        user_email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        pincode: user?.pincode || '',
        notes: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePincodeLookup = async (pincode: string) => {
        if (pincode.length === 6) {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                const data = await response.json();
                if (data[0].Status === 'Success') {
                    const { District, State } = data[0].PostOffice[0];
                    setFormData(prev => ({
                        ...prev,
                        city: District,
                        state: State
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch address from pincode");
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'pincode' && value.length === 6) {
            handlePincodeLookup(value);
        }
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Your cart is empty');
            return;
        }

        setIsProcessing(true);

        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setIsProcessing(false);
            return;
        }

        try {
            // 1. Create Order on Server
            // NOTE: We do NOT send the amount, the server calculates it for security.
            const orderResponse = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        product_id: item.product_id,
                        quantity: item.quantity
                    })),
                    currency: 'INR',
                    receipt: `rcpt_${Date.now().toString().slice(-6)}`,
                    notes: {
                        customer_name: `${formData.firstName} ${formData.lastName}`,
                        shipping_city: formData.city,
                        order_notes: formData.notes
                    },
                    user_id: user?.id,
                    shipping_address: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.user_email,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        pincode: formData.pincode
                    }
                })
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            // 2. Initialize Razorpay Checkout
            // We use the amount returned from the server (orderData.amount)
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use Environment Variable
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Shree Shyam Silver",
                description: "Silver Jewelry Purchase",
                image: "https://via.placeholder.com/150",
                order_id: orderData.id,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment
                        const verifyResponse = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.success) {
                            await clearCart();
                            navigate('/orders');
                        } else {
                            alert('Payment Verification Failed: ' + verifyData.message);
                        }
                    } catch (error) {
                        console.error('Verification Error:', error);
                        alert('Payment verification failed due to network error.');
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.user_email,
                    contact: formData.phone
                },
                notes: {
                    address: `${formData.address}, ${formData.city}`
                },
                theme: {
                    color: "#D4AF37"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                alert(`Payment Failed: ${response.error.description}`);
            });
            rzp.open();

        } catch (error: any) {
            console.error('Payment Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-silver-50 py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-serif font-bold text-center mb-8">Checkout</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Delivery Information Form */}
                    <div className="card bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-silver-700 mb-1">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-silver-700 mb-1">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                    value={formData.user_email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-1">Address *</label>
                                <textarea
                                    name="address"
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-silver-700 mb-1">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-silver-700 mb-1">State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-silver-700 mb-1">Pincode *</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        required
                                        pattern="[0-9]{6}"
                                        className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-1">Order Notes (Optional)</label>
                                <textarea
                                    name="notes"
                                    rows={2}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Special instructions for delivery..."
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="card bg-white p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden">
                                                <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span>{item.product.name} (x{item.quantity})</span>
                                        </div>
                                        <span className="font-medium">₹{item.product.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-silver-600">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-silver-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing || cartItems.length === 0}
                                className="w-full mt-6 btn-primary py-3 flex justify-center items-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    `Pay Now (₹${cartTotal})`
                                )}
                            </button>

                            <div className="mt-4 text-xs text-center text-silver-500 flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Secure Payment by Razorpay
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
