import React, { useState, useEffect } from 'react';
import { AdminQuickAlerts } from '../components/dashboard/AdminQuickAlerts';
import { KPISection } from '../components/dashboard/KPISection';
import { RevenueTrendChart } from '../components/dashboard/RevenueTrendChart';
import { FulfillmentPipelineCard } from '../components/dashboard/FulfillmentPipelineCard';
import { RecentOrdersTable } from '../components/dashboard/RecentOrdersTable';
import { TopSellingOutfitsCard } from '../components/dashboard/TopSellingOutfitsCard';
import { StoreHealthCard } from '../components/dashboard/StoreHealthCard';
import { AIAssistantCard } from '../components/dashboard/AIAssistantCard';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { analyticsService } from '../services/analyticsService';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { CustomerStorefront } from '../components/storefront/CustomerStorefront';

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

  // If the logged-in user is a Customer, show the complete Shopping Storefront
  if (user?.role === 'Customer') {
    return <CustomerStorefront />;
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-44 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <SkeletonLoader type="stat" count={5} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 h-80 bg-slate-200 rounded-3xl animate-pulse" />
          <div className="lg:col-span-5 h-80 bg-slate-200 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in pb-8">
      {/* 1. Executive Priorities & Greeting Banner */}
      <AdminQuickAlerts />

      {/* 2. Key Business Metrics (KPI Cards) */}
      <KPISection data={analytics} />

      {/* 3. Revenue Trend & Logistics Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <RevenueTrendChart />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <FulfillmentPipelineCard />
        </div>
      </div>

      {/* 4. Live Incoming Orders & Top Outfits Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <RecentOrdersTable orders={orders} />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <TopSellingOutfitsCard products={products} />
        </div>
      </div>

      {/* 5. Store Health & AI Business Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <StoreHealthCard healthScore={analytics?.overview?.storeHealthScore || 94} />
        </div>
        <div className="lg:col-span-8 flex flex-col">
          <AIAssistantCard insights={analytics?.aiInsights} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
