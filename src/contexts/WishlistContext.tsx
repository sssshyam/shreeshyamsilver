import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface WishlistContextType {
    wishlist: number[];
    addToWishlist: (productId: number) => Promise<boolean>;
    removeFromWishlist: (productId: number) => Promise<boolean>;
    isInWishlist: (productId: number) => boolean;
    loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch wishlist when user logs in
    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    }, [user]);

    const fetchWishlist = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('wishlist')
                .select('product_id')
                .eq('user_id', user.id);

            if (error) throw error;
            if (data) {
                setWishlist(data.map(item => item.product_id));
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (productId: number) => {
        if (!user) return false;
        try {
            const { error } = await supabase
                .from('wishlist')
                .insert({ user_id: user.id, product_id: productId });

            if (error) throw error;
            setWishlist(prev => [...prev, productId]);
            return true;
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            return false;
        }
    };

    const removeFromWishlist = async (productId: number) => {
        if (!user) return false;
        try {
            const { error } = await supabase
                .from('wishlist')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);

            if (error) throw error;
            setWishlist(prev => prev.filter(id => id !== productId));
            return true;
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return false;
        }
    };

    const isInWishlist = (productId: number) => {
        return wishlist.includes(productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            loading
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
