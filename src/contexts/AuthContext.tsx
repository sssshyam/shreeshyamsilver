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
    avatar_url?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    updateProfile: (data: Partial<User>) => Promise<boolean>;
    isLoading: boolean;
    isProfileComplete: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        // 1. Initial Load: Check local storage first for immediate UI feedback
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // 2. Supabase Auth Listener (Handles Google Redirects & Session Persistence)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth State Change:', event);

            if (event === 'SIGNED_IN' && session?.user) {
                // Sync Supabase Auth User with our Custom Users Table
                // We do NOT await this to prevent blocking the UI
                syncUser(session.user).catch(err => console.error('Sync user failed:', err));
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('cart');
            }

            if (mounted) setIsLoading(false);
        });

        // Cleanup
        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const syncUser = async (authUser: any) => {
        try {
            const email = authUser.email;
            if (!email) return;

            // Check if user exists in our 'users' table
            const { data: existingUser } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            let appUser: User;

            if (existingUser) {
                // User exists, update local state
                // Use avatar from Google if local is missing, or update it?
                // For now, prioritize Google Avatar if available
                const avatar = authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture;

                appUser = {
                    id: existingUser.id,
                    email: existingUser.email,
                    name: existingUser.name,
                    phone: existingUser.phone,
                    address: existingUser.address,
                    city: existingUser.city,
                    state: existingUser.state,
                    pincode: existingUser.pincode,
                    avatar_url: avatar
                };
            } else {
                // New User via Google: Create record
                const name = authUser.user_metadata?.full_name || authUser.user_metadata?.name || email.split('@')[0];
                const avatar = authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture;

                const { data: newUser, error } = await supabase
                    .from('users')
                    .insert([{
                        email,
                        name,
                        password_hash: 'google_oauth_placeholder', // Placeholder
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }])
                    .select()
                    .single();

                if (error) throw error;

                appUser = {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    phone: newUser.phone,
                    address: newUser.address,
                    city: newUser.city,
                    state: newUser.state,
                    pincode: newUser.pincode,
                    avatar_url: avatar
                };
            }

            setUser(appUser);
            localStorage.setItem('user', JSON.stringify(appUser));

        } catch (error) {
            console.error('Error syncing user:', error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });

            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Google Sign In Error:', error);
            return { success: false, error: error.message };
        }
    };

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
            signInWithGoogle,
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
