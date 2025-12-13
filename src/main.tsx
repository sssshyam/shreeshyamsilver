import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { AdminProvider } from './contexts/AdminContext'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
                <AdminProvider>
                    <App />
                </AdminProvider>
            </CartProvider>
        </AuthProvider>
    </StrictMode>,
)
