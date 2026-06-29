import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AdminUser {
    id: number;
    email: string;
    name: string;
    role: string;
}

interface AdminContextType {
    admin: AdminUser | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [admin, setAdmin] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const storedAdmin = localStorage.getItem('admin');
            
            // Validate with Supabase to ensure the client actually has the authenticated token
            const { data: { session } } = await supabase.auth.getSession();
            
            if (storedAdmin && session) {
                setAdmin(JSON.parse(storedAdmin));
            } else if (storedAdmin && !session) {
                // If local storage says logged in but Supabase has no session, clear it out
                localStorage.removeItem('admin');
                setAdmin(null);
            }
            setIsLoading(false);
        };
        
        checkAuth();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                console.error('Supabase Login Error:', error.message);
                return false;
            }

            if (data.user) {
                const adminUser: AdminUser = {
                    id: 1, // Legacy ID
                    email: data.user.email || email,
                    name: 'Admin',
                    role: 'admin'
                };

                setAdmin(adminUser);
                localStorage.setItem('admin', JSON.stringify(adminUser));

                // Optional: Update legacy admin_users table if it exists and RLS allows
                try {
                    await supabase
                        .from('admin_users')
                        .update({ last_login: new Date().toISOString() })
                        .eq('email', email);
                } catch (e) {
                    // Ignore error if table doesn't exist or RLS blocks
                }

                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setAdmin(null);
        localStorage.removeItem('admin');
    };

    return (
        <AdminContext.Provider value={{ admin, login, logout, isLoading }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
