import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { useAuth } from '../context/AuthContext';
import { LandingPage } from '../pages/public/LandingPage';

// Pages
import { Dashboard } from '../pages/Dashboard';

// Products
import { Products } from '../pages/products/Products';
import { AddProduct } from '../pages/products/AddProduct';
import { EditProduct } from '../pages/products/EditProduct';
import { ProductDetails } from '../pages/products/ProductDetails';

// Categories & Brands
import { Categories } from '../pages/categories/Categories';
import { CategoryDetails } from '../pages/categories/CategoryDetails';
import { Collections } from '../pages/categories/Collections';
import { Brands } from '../pages/categories/Brands';
import { Reviews } from '../pages/categories/Reviews';

// Orders
import { Orders } from '../pages/orders/Orders';
import { OrderDetails } from '../pages/orders/OrderDetails';
import { Returns } from '../pages/orders/Returns';
import { Cancellations } from '../pages/orders/Cancellations';

// Customers
import { Customers } from '../pages/customers/Customers';
import { CustomerDetails } from '../pages/customers/CustomerDetails';
import { CustomerSegments } from '../pages/customers/CustomerSegments';

// Marketing
import { Campaigns } from '../pages/marketing/Campaigns';
import { Coupons } from '../pages/marketing/Coupons';
import { FlashSale } from '../pages/marketing/FlashSale';
import { Affiliates } from '../pages/marketing/Affiliates';

// Analytics
import { SalesAnalytics } from '../pages/analytics/SalesAnalytics';
import { ProductAnalytics } from '../pages/analytics/ProductAnalytics';
import { CustomerAnalytics } from '../pages/analytics/CustomerAnalytics';
import { Reports } from '../pages/analytics/Reports';
import { AIAssistant } from '../pages/analytics/AIAssistant';

// Settings
import { StoreSettings } from '../pages/settings/StoreSettings';
import { PaymentSettings } from '../pages/settings/PaymentSettings';
import { ShippingSettings } from '../pages/settings/ShippingSettings';
import { UsersRoles } from '../pages/settings/UsersRoles';

// Auth
import { Login } from '../pages/auth/Login';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Main Protected Application Layout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Products */}
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />

        {/* Categories & Brands */}
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:slug" element={<CategoryDetails />} />
        <Route path="collections" element={<Collections />} />
        <Route path="brands" element={<Brands />} />
        <Route path="reviews" element={<Reviews />} />

        {/* Orders */}
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="returns" element={<Returns />} />
        <Route path="cancellations" element={<Cancellations />} />

        {/* Customers */}
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomerDetails />} />
        <Route path="customer-segments" element={<CustomerSegments />} />

        {/* Marketing */}
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="flash-sale" element={<FlashSale />} />
        <Route path="affiliates" element={<Affiliates />} />

        {/* Analytics */}
        <Route path="analytics/sales" element={<SalesAnalytics />} />
        <Route path="analytics/products" element={<ProductAnalytics />} />
        <Route path="analytics/customers" element={<CustomerAnalytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="ai-assistant" element={<AIAssistant />} />

        {/* Settings */}
        <Route path="settings/store" element={<StoreSettings />} />
        <Route path="settings/payment" element={<PaymentSettings />} />
        <Route path="settings/shipping" element={<ShippingSettings />} />
        <Route path="settings/users-roles" element={<UsersRoles />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
