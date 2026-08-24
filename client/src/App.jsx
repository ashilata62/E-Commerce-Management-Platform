import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';
import { ProductQuickViewModal } from './components/storefront/ProductQuickViewModal';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <StoreProvider>
            <CartProvider>
              <AppRoutes />
              {/* Global Customer Shopping Overlays */}
              <CartDrawer />
              <CheckoutModal />
              <ProductQuickViewModal />
            </CartProvider>
          </StoreProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
