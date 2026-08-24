import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, IndianRupee, ShoppingCart, Percent, Calendar, Download } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/common/StatCard';
import { analyticsService } from '../../services/analyticsService';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const SalesAnalytics = () => {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('7d'); // '7d' | '30d' | '90d'

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await analyticsService.getOverview();
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        toast.error('Failed to load sales analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const chartData = data?.salesChart || [
    { day: 'Mon', revenue: 32400, orders: 18, profit: 12900 },
    { day: 'Tue', revenue: 38200, orders: 22, profit: 15200 },
    { day: 'Wed', revenue: 45600, orders: 26, profit: 18300 },
    { day: 'Thu', revenue: 41200, orders: 20, profit: 16100 },
    { day: 'Fri', revenue: 52800, orders: 28, profit: 21400 },
    { day: 'Sat', revenue: 64900, orders: 34, profit: 26500 },
    { day: 'Sun', revenue: 71200, orders: 38, profit: 29800 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales & Revenue Analytics"
        subtitle="Real-time gross merchandise value, profit margins, conversion funnels, and sales trajectory"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Analytics' }, { label: 'Sales' }]}
      >
        <div className="flex items-center gap-2">
          {['7d', '30d', '90d'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === t
                  ? 'bg-brand-500 text-white shadow-soft-sm'
                  : 'bg-white border text-slateText-muted hover:text-slateText-main'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Period Revenue"
          value={formatCurrency(data?.overview?.totalRevenue || 284920)}
          change="+24.8%"
          isPositive={true}
          icon={IndianRupee}
          colorScheme="purple"
        />
        <StatCard
          title="Total Paid Orders"
          value={formatNumber(data?.overview?.totalOrders || 128)}
          change="+18.2%"
          isPositive={true}
          icon={ShoppingCart}
          colorScheme="coral"
        />
        <StatCard
          title="Average Order Value"
          value={formatCurrency(2225)}
          change="+6.4%"
          isPositive={true}
          icon={TrendingUp}
          colorScheme="green"
        />
        <StatCard
          title="Checkout Conversion Rate"
          value={`${data?.overview?.conversionRate || 3.24}%`}
          change="+8.6%"
          isPositive={true}
          icon={Percent}
          colorScheme="blue"
        />
      </div>

      {/* Main Revenue vs Profit Area Chart */}
      <div className="commerce-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slateText-main">
              Revenue & Profit Trends (₹)
            </h3>
            <p className="text-xs text-slateText-muted font-medium">Daily gross transaction values compared to net margins</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-brand-600">
              <span className="w-3 h-3 rounded-full bg-brand-500" /> Gross Revenue
            </span>
            <span className="flex items-center gap-1.5 text-emeraldGreen-600">
              <span className="w-3 h-3 rounded-full bg-emeraldGreen-500" /> Net Profit
            </span>
          </div>
        </div>

        <div className="h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C4DF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6C4DF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#19A974" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#19A974" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#737780" />
              <YAxis tick={{ fontSize: 12 }} stroke="#737780" />
              <Tooltip formatter={(value) => [formatCurrency(value), '']} />
              <Area type="monotone" dataKey="revenue" stroke="#6C4DF6" strokeWidth={3} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="profit" stroke="#19A974" strokeWidth={3} fill="url(#profGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders per Day Bar Chart */}
      <div className="commerce-card p-6">
        <h3 className="text-base font-bold text-slateText-main mb-4">
          Order Volume Breakdown (Daily Units)
        </h3>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#737780" />
              <YAxis tick={{ fontSize: 12 }} stroke="#737780" />
              <Tooltip formatter={(value) => [`${value} Orders`, 'Volume']} />
              <Bar dataKey="orders" fill="#FF5C8A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
