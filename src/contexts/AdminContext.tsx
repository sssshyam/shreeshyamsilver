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
        // Check if admin is logged in (using localStorage)
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // For demo purposes, we'll use a simple check
            // In production, you should hash passwords with bcrypt
            if (email === 'shreeshyamsilvernokha@gmail.com' && password === 'shreeshyamsilver@#$1234') {
                const adminUser: AdminUser = {
                    id: 1,
                    email: email,
                    name: 'Admin',
                    role: 'admin'
                };

                setAdmin(adminUser);
                localStorage.setItem('admin', JSON.stringify(adminUser));

                // Update last login in database
                await supabase
                    .from('admin_users')
                    .update({ last_login: new Date().toISOString() })
                    .eq('email', email);

                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
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
