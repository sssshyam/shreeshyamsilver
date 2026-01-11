
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrderHistory from '../components/OrderHistory';

export default function ProfilePage() {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                pincode: user.pincode || ''
            });
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const handlePincodeLookup = async (pincode: string) => {
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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Pincode Lookup
        if (name === 'pincode' && value.length === 6) {
            handlePincodeLookup(value);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        const success = await updateProfile(formData);

        if (success) {
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } else {
            setMessage('Failed to update profile. Please try again.');
        }
        setIsSaving(false);
    };

    if (!user) return null;

    return (
        <div className="container-custom py-12 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Profile</h1>

                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-silver-100 rounded-full flex items-center justify-center text-2xl font-serif text-silver-600">
                                {user.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{user.name || 'User'}</h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 text-sm font-medium text-silver-600 border border-silver-300 rounded hover:bg-silver-50"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {message && (
                        <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSave}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-silver-500 focus:border-silver-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-silver-500 focus:border-silver-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode (Auto-fills City/State)</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-silver-500 focus:border-silver-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-silver-500 focus:border-silver-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-silver-500 focus:border-silver-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea
                                    name="address"
                                    rows={3}
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-silver-500 focus:border-silver-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        // Reset form to user data
                                        setFormData({
                                            name: user.name || '',
                                            phone: user.phone || '',
                                            address: user.address || '',
                                            city: user.city || '',
                                            state: user.state || '',
                                            pincode: user.pincode || ''
                                        });
                                    }}
                                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-silver-900 text-white rounded-md hover:bg-silver-800 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </form>


                    <div className="mt-12 border-t pt-8">
                        <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">My Orders</h2>
                        <OrderHistory userId={user.id} />
                    </div>

                    <div className="mt-10 pt-6 border-t">
                        <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                        <button
                            onClick={() => {
                                const confirm = window.confirm('Are you sure you want to logout?');
                                if (confirm) {
                                    logout();
                                    navigate('/');
                                }
                            }}
                            className="px-4 py-2 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
