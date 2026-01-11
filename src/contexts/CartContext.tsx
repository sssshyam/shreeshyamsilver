import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Product } from '../types';

interface CartItem {
    id: number;
    product_id: number;
    product: Product;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    cartTotal: number;
    addToCart: (product: Product, quantity?: number) => Promise<boolean>;
    removeFromCart: (productId: number) => Promise<boolean>;
    updateQuantity: (productId: number, quantity: number) => Promise<boolean>;
    clearCart: () => Promise<boolean>;
    isLoading: boolean;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load cart when user changes
    useEffect(() => {
        if (user) {
            loadCart();
        } else {
            setCartItems([]);
        }
    }, [user]);

    const loadCart = async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('cart_items')
                .select(`
          id,
          product_id,
          quantity,
          product:products(*)
        `)
                .eq('user_id', user.id);

            if (error) throw error;

            // Filter out items where product is null (deleted products)
            const validItems = (data || []).filter(item => item.product);
            setCartItems(validItems as any);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = async (product: Product, quantity: number = 1): Promise<boolean> => {
        if (!user) return false;

        try {
            // Check if item already in cart
            const existingItem = cartItems.find(item => item.product_id === product.id);

            if (existingItem) {
                // Update quantity
                const newQuantity = existingItem.quantity + quantity;
                const { error } = await supabase
                    .from('cart_items')
                    .update({
                        quantity: newQuantity,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', existingItem.id);

                if (error) throw error;

                setCartItems(cartItems.map(item =>
                    item.id === existingItem.id
                        ? { ...item, quantity: newQuantity }
                        : item
                ));
            } else {
                // Add new item
                const { data, error } = await supabase
                    .from('cart_items')
                    .insert([{
                        user_id: user.id,
                        product_id: product.id,
                        quantity,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }])
                    .select(`
            id,
            product_id,
            quantity,
            product:products(*)
          `)
                    .single();

                if (error) throw error;

                setCartItems([...cartItems, data as any]);
            }

            return true;
        } catch (error) {
            console.error('Error adding to cart:', error);
            return false;
        }
    };

    const removeFromCart = async (productId: number): Promise<boolean> => {
        if (!user) return false;

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);

            if (error) throw error;

            setCartItems(cartItems.filter(item => item.product_id !== productId));
            return true;
        } catch (error) {
            console.error('Error removing from cart:', error);
            return false;
        }
    };

    const updateQuantity = async (productId: number, quantity: number): Promise<boolean> => {
        if (!user || quantity < 1) return false;

        try {
            const item = cartItems.find(item => item.product_id === productId);
            if (!item) return false;

            const { error } = await supabase
                .from('cart_items')
                .update({
                    quantity,
                    updated_at: new Date().toISOString()
                })
                .eq('id', item.id);

            if (error) throw error;

            setCartItems(cartItems.map(item =>
                item.product_id === productId
                    ? { ...item, quantity }
                    : item
            ));

            return true;
        } catch (error) {
            console.error('Error updating quantity:', error);
            return false;
        }
    };

    const clearCart = async (): Promise<boolean> => {
        if (!user) return false;

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user.id);

            if (error) throw error;

            setCartItems([]);
            return true;
        } catch (error) {
            console.error('Error clearing cart:', error);
            return false;
        }
    };

    const refreshCart = async () => {
        await loadCart();
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isLoading,
            refreshCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
