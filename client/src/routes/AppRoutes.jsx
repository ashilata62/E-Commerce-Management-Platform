import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { useAuth } from '../context/AuthContext';
import { LandingPage } from '../pages/public/LandingPage';

// Pages
import { Dashboard } from '../pages/Dashboard';
import { CustomerDashboard } from '../components/dashboard/CustomerDashboard';

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

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/landing-page" element={<LandingPage />} />
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
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customer" element={<CustomerDashboard />} />

        {/* Products */}
        <Route path="products" element={<Products />} />
        <Route
          path="products/add"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <AddProduct />
            </RoleRoute>
          }
        />
        <Route
          path="products/edit/:id"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <EditProduct />
            </RoleRoute>
          }
        />
        <Route path="products/:id" element={<ProductDetails />} />

        {/* Categories & Brands */}
        <Route
          path="categories"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <Categories />
            </RoleRoute>
          }
        />
        <Route
          path="categories/:slug"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <CategoryDetails />
            </RoleRoute>
          }
        />
        <Route
          path="collections"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <Collections />
            </RoleRoute>
          }
        />
        <Route
          path="brands"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <Brands />
            </RoleRoute>
          }
        />
        <Route
          path="reviews"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <Reviews />
            </RoleRoute>
          }
        />

        {/* Orders */}
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="returns" element={<Returns />} />
        <Route path="cancellations" element={<Cancellations />} />

        {/* Customers */}
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomerDetails />} />
        <Route
          path="customer-segments"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <CustomerSegments />
            </RoleRoute>
          }
        />

        {/* Marketing (Admin & Manager Only) */}
        <Route
          path="campaigns"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <Campaigns />
            </RoleRoute>
          }
        />
        <Route
          path="coupons"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <Coupons />
            </RoleRoute>
          }
        />
        <Route
          path="flash-sale"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <FlashSale />
            </RoleRoute>
          }
        />
        <Route
          path="affiliates"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <Affiliates />
            </RoleRoute>
          }
        />

        {/* Analytics (Admin & Manager Only) */}
        <Route
          path="analytics/sales"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <SalesAnalytics />
            </RoleRoute>
          }
        />
        <Route
          path="analytics/products"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <ProductAnalytics />
            </RoleRoute>
          }
        />
        <Route
          path="analytics/customers"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <CustomerAnalytics />
            </RoleRoute>
          }
        />
        <Route
          path="reports"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <Reports />
            </RoleRoute>
          }
        />

        {/* Settings (Admin Only) */}
        <Route
          path="settings/store"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <StoreSettings />
            </RoleRoute>
          }
        />
        <Route
          path="settings/payment"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <PaymentSettings />
            </RoleRoute>
          }
        />
        <Route
          path="settings/shipping"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <ShippingSettings />
            </RoleRoute>
          }
        />
        <Route
          path="settings/users-roles"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <UsersRoles />
            </RoleRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

