
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface Order {
    id: string;
    created_at: string;
    total_amount: number;
    status: string;
    payment_status: string;
    items: any[];
}

export default function MyOrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    items:order_items(
                        quantity,
                        product_price,
                        product:products(name, image_url)
                    )
                `)
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching orders:', error);
            } else {
                setOrders(data || []);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-silver-50 py-12">
                <div className="container-custom text-center">
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-silver-50 py-12">
                <div className="container-custom text-center">
                    <h2 className="text-xl mb-4">Please login to view your orders</h2>
                    <Link to="/account" className="btn-primary">Login</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-silver-50 py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="card p-8 text-center bg-white">
                        <p className="text-silver-600 mb-4">You haven't placed any orders yet.</p>
                        <Link to="/shop" className="btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="card bg-white p-6 shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between border-b pb-4 mb-4">
                                    <div>
                                        <p className="text-sm text-silver-600">Order Placed</p>
                                        <p className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0">
                                        <p className="text-sm text-silver-600">Total</p>
                                        <p className="font-semibold text-accent">₹{order.total_amount.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0">
                                        <p className="text-sm text-silver-600">Status</p>
                                        <div className="flex gap-2">
                                            <span className={`text-xs px-2 py-1 rounded-full ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {order.payment_status.toUpperCase()}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {(order.items as any)?.map((item: any, idx: number) => (
                                        <div key={idx} className="flex gap-4 items-center">
                                            <img
                                                src={item.product?.image_url || 'https://via.placeholder.com/64'}
                                                alt={item.product?.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium text-silver-900">{item.product?.name}</p>
                                                <p className="text-sm text-silver-600">Qty: {item.quantity} x ₹{item.product_price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
