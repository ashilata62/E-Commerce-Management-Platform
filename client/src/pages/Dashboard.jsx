import React, { useState, useEffect } from 'react';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { ActiveCampaignCard } from '../components/dashboard/ActiveCampaignCard';
import { KPISection } from '../components/dashboard/KPISection';
import { FlashSaleSection } from '../components/dashboard/FlashSaleSection';
import { TopCategories } from '../components/dashboard/TopCategories';
import { StoreHealthCard } from '../components/dashboard/StoreHealthCard';
import { RecentOrdersTable } from '../components/dashboard/RecentOrdersTable';
import { BestSellersSection } from '../components/dashboard/BestSellersSection';
import { AIAssistantCard } from '../components/dashboard/AIAssistantCard';
import { CommerceBenefits } from '../components/dashboard/CommerceBenefits';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { analyticsService } from '../services/analyticsService';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { CustomerDashboard } from '../components/dashboard/CustomerDashboard';

export const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes, ordRes, anaRes] = await Promise.allSettled([
          productService.getProducts(),
          productService.getCategories(),
          orderService.getOrders(),
          analyticsService.getOverview(),
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value.success) {
          setProducts(prodRes.value.data);
        }
        if (catRes.status === 'fulfilled' && catRes.value.success) {
          setCategories(catRes.value.data);
        }
        if (ordRes.status === 'fulfilled' && ordRes.value.success) {
          setOrders(ordRes.value.data);
        }
        if (anaRes.status === 'fulfilled' && anaRes.value.success) {
          setAnalytics(anaRes.value.data);
        }
      } catch (error) {
        console.error('Dashboard load error:', error);
        toast.error('Could not load live analytics, displaying cached metrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // If the logged-in user is a Customer, show the Customer Experience Dashboard
  if (user?.role === 'Customer') {
    return <CustomerDashboard />;
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-64 rounded-3xl bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <SkeletonLoader type="stat" count={5} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Hero & Active Campaign Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <HeroBanner />
        </div>
        <div className="lg:col-span-4">
          <ActiveCampaignCard />
        </div>
      </div>

      {/* 2. Business KPIs Section */}
      <KPISection data={analytics} />

      {/* 3. Flash Sale Section with Live Countdown */}
      <FlashSaleSection products={products} />

      {/* 4. Top Categories Circular Browser */}
      <TopCategories categories={categories} />

      {/* 5. Store Health & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <StoreHealthCard healthScore={analytics?.overview?.storeHealthScore || 85} />
        </div>
        <div className="lg:col-span-8 flex flex-col">
          <RecentOrdersTable orders={orders} />
        </div>
      </div>

      {/* 6. Best Selling Products Leaders */}
      <BestSellersSection products={products} />

      {/* 7. AI Business Assistant Card */}
      <AIAssistantCard insights={analytics?.aiInsights} />

      {/* 8. Commerce Trust Benefits Footer */}
      <CommerceBenefits />
    </div>
  );
};
