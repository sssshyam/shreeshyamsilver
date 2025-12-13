import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
    id: number;
    email: string;
    name: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    pincode: string | null;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<boolean>;
    isLoading: boolean;
    isProfileComplete: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const signup = async (email: string, password: string, name: string) => {
        try {
            // Check if user already exists
            const { data: existingUser } = await supabase
                .from('users')
                .select('id')
                .eq('email', email)
                .single();

            if (existingUser) {
                return { success: false, error: 'Email already registered' };
            }

            // Simple password hash (in production, use bcrypt)
            const passwordHash = btoa(password); // Base64 encoding (NOT SECURE for production)

            // Insert new user
            const { data, error } = await supabase
                .from('users')
                .insert([{
                    email,
                    password_hash: passwordHash,
                    name,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) throw error;

            const newUser: User = {
                id: data.id,
                email: data.email,
                name: data.name,
                phone: data.phone,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode
            };

            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));

            return { success: true };
        } catch (error: any) {
            console.error('Signup error:', error);
            return { success: false, error: error.message || 'Signup failed' };
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const passwordHash = btoa(password);

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('password_hash', passwordHash)
                .eq('is_active', true)
                .single();

            if (error || !data) {
                return { success: false, error: 'Invalid email or password' };
            }

            const loggedInUser: User = {
                id: data.id,
                email: data.email,
                name: data.name,
                phone: data.phone,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode
            };

            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));

            return { success: true };
        } catch (error: any) {
            console.error('Login error:', error);
            return { success: false, error: 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('cart'); // Clear cart on logout
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return false;

        try {
            const { error } = await supabase
                .from('users')
                .update({
                    ...data,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;

            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return true;
        } catch (error) {
            console.error('Update profile error:', error);
            return false;
        }
    };

    const isProfileComplete = () => {
        if (!user) return false;
        return !!(user.name && user.phone && user.address && user.city && user.state && user.pincode);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            updateProfile,
            isLoading,
            isProfileComplete
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
