import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { AdminProvider } from './contexts/AdminContext'

import { WishlistProvider } from './contexts/WishlistContext'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <WishlistProvider>
                <CartProvider>
                    <AdminProvider>
                        <App />
                    </AdminProvider>
                </CartProvider>
            </WishlistProvider>
        </AuthProvider>
    </StrictMode>,
)
