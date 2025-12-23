
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    created_at: string;
    status: string;
    invoice_url: string;
    order_items: any[];
}

export default function OrderHistory({ userId }: { userId: string | number }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*, order_items(*)')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching orders:', error);
                } else {
                    setOrders(data || []);
                }
            } catch (err) {
                console.error('Failed to fetch orders', err);
            } finally {
                setLoading(false);
            }
        }

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    if (loading) return <div className="text-center py-4">Loading orders...</div>;

    if (orders.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No orders found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div key={order.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Order Placed</p>
                            <p className="text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Total</p>
                            <p className="text-sm font-medium">Rs. {order.total_amount}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Order #</p>
                            <p className="text-sm font-medium">{order.order_number}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            {order.invoice_url ? (
                                <a
                                    href={order.invoice_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-silver-600 hover:text-silver-800 font-medium underline"
                                >
                                    Download Invoice
                                </a>
                            ) : (
                                <span className="text-sm text-gray-400 italic">Invoice Pending</span>
                            )}
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flow-root">
                            <ul className="-my-4 divide-y divide-gray-200">
                                {order.order_items.map((item) => (
                                    <li key={item.id} className="flex py-4">
                                        <div className="flex-1 ml-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium text-gray-900">{item.product_name}</h3>
                                                <p className="text-sm font-medium text-gray-900">Rs. {item.product_price}</p>
                                            </div>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
