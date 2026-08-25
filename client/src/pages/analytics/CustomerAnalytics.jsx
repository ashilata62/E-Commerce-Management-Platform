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
  Cell,
  Line
} from 'recharts';
import {
  Users,
  UserCheck,
  Crown,
  HeartHandshake,
  TrendingUp,
  MapPin,
  Calendar,
  Download,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Repeat,
  ShoppingBag,
  Award,
  Zap,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const CustomerAnalytics = () => {
  const toast = useToast();
  const [selectedSegment, setSelectedSegment] = useState('all'); // 'all', 'vip', 'repeat', 'new'

  const retentionCohortData = [
    { month: 'Month 1', retention: 100, industryAvg: 100, orders: 128 },
    { month: 'Month 2', retention: 68.4, industryAvg: 48, orders: 87 },
    { month: 'Month 3', retention: 54.2, industryAvg: 36, orders: 69 },
    { month: 'Month 4', retention: 48.1, industryAvg: 30, orders: 61 },
    { month: 'Month 5', retention: 42.6, industryAvg: 26, orders: 54 },
    { month: 'Month 6', retention: 39.4, industryAvg: 22, orders: 50 },
  ];

  const segments = [
    {
      name: 'VIP Gold Spenders',
      share: '18.5%',
      count: 165,
      avgSpend: '₹14,280 LTV',
      desc: 'Top 20% buyers generating 52% of revenue',
      icon: Crown,
      color: 'bg-amber-500',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      name: 'Loyal Repeat Buyers',
      share: '34.2%',
      count: 305,
      avgSpend: '₹8,420 LTV',
      desc: '2 to 5 completed purchases',
      icon: Repeat,
      color: 'bg-[#6C4DF6]',
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      name: 'First-Time Shoppers',
      share: '38.1%',
      count: 340,
      avgSpend: '₹2,490 LTV',
      desc: 'Purchased within last 30 days',
      icon: ShoppingBag,
      color: 'bg-emerald-500',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'At-Risk / Inactive (60d+)',
      share: '9.2%',
      count: 82,
      avgSpend: '₹3,150 LTV',
      desc: 'Re-engagement coupon recommended',
      icon: Clock,
      color: 'bg-rose-500',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  const topCities = [
    { city: 'Mumbai (MMR)', share: 34.0, revenue: 96872, buyers: 298, growth: '+28%' },
    { city: 'Delhi NCR & Gurgaon', share: 26.0, revenue: 74079, buyers: 228, growth: '+22%' },
    { city: 'Bengaluru Urban', share: 20.0, revenue: 56984, buyers: 176, growth: '+31%' },
    { city: 'Hyderabad & Pune', share: 14.0, revenue: 39888, buyers: 122, growth: '+19%' },
    { city: 'Rest of India', share: 6.0, revenue: 17095, buyers: 68, growth: '+14%' },
  ];

  const repurchaseSpeed = [
    { period: 'Within 15 Days', percent: 24, label: 'Flash Sale Driven' },
    { period: '16 – 30 Days', percent: 38, label: 'New Drop Reorder' },
    { period: '31 – 60 Days', percent: 26, label: 'Seasonal Festive' },
    { period: '60+ Days', percent: 12, label: 'Replenishment' },
  ];

  const topCustomers = [
    {
      id: 1,
      name: 'Ananya Deshmukh',
      email: 'ananya.desh@gmail.com',
      city: 'Lokhandwala, Mumbai',
      ordersCount: 8,
      totalSpend: 24890,
      lastOrder: 'Yesterday',
      tier: 'Gold VIP',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 2,
      name: 'Vikramaditya Rao',
      email: 'vikram.rao@techcorp.in',
      city: 'Indiranagar, Bengaluru',
      ordersCount: 6,
      totalSpend: 19450,
      lastOrder: '2 days ago',
      tier: 'Gold VIP',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 3,
      name: 'Sneha Kapadia',
      email: 'sneha.k@outlook.com',
      city: 'Vasant Vihar, Delhi',
      ordersCount: 5,
      totalSpend: 16200,
      lastOrder: '4 days ago',
      tier: 'Silver Member',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 4,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      city: 'Bandra West, Mumbai',
      ordersCount: 5,
      totalSpend: 14750,
      lastOrder: '6 days ago',
      tier: 'Silver Member',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const handleExport = () => {
    toast.success('Exporting Customer Cohorts & Lifetime Value Ledger (CSV)...');
  };

  // Custom high-contrast tooltip for Cohort Curve
  const CustomCohortTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl border border-slate-800 backdrop-blur-md space-y-1.5 min-w-[170px]">
          <p className="text-xs font-black text-purple-300 border-b border-slate-700/60 pb-1 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-emerald-400 font-bold">
              {payload[0]?.payload?.orders} Active Shoppers
            </span>
          </p>
          <div className="flex items-center justify-between gap-3 text-xs pt-0.5">
            <span className="text-purple-300 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#6C4DF6]" /> Your Store:
            </span>
            <span className="font-mono font-bold text-white">
              {payload[0]?.value}% Retained
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400" /> Industry Avg:
            </span>
            <span className="font-mono font-bold text-slate-300">
              {payload[0]?.payload?.industryAvg}%
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in pb-10">
      {/* 1. Header & Actions */}
      <PageHeader
        title="Customer Cohorts & Retention Intelligence"
        subtitle="Track repeat purchase behavior, customer retention decay curves, and lifetime cohort value"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Analytics' }, { label: 'Customers' }]}
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-[#E7E0F7] text-xs font-black shadow-soft-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-brand-500" />
            <span>Export Cohort CSV</span>
          </button>
        </div>
      </PageHeader>

      {/* 2. Top 4 Core Customer KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Repeat Buyer Rate"
          value="41.2%"
          change="+5.1%"
          isPositive={true}
          subtitle="Industry benchmark: 28%"
          icon={HeartHandshake}
          colorScheme="purple"
        />
        <StatCard
          title="90-Day Retention"
          value="68.4%"
          change="+8.2%"
          isPositive={true}
          subtitle="High loyalty in apparel"
          icon={UserCheck}
          colorScheme="green"
        />
        <StatCard
          title="Average Customer LTV"
          value={formatCurrency(8420)}
          change="+14.3%"
          isPositive={true}
          subtitle="3.8 orders per active user"
          icon={Crown}
          colorScheme="warm"
        />
        <StatCard
          title="Monthly Churn Rate"
          value="3.1%"
          change="-0.8%"
          isPositive={true}
          subtitle="Lowest in fashion retail"
          icon={Users}
          colorScheme="coral"
        />
      </div>

      {/* 3. Row 1: Retention Curve & Segments Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (7 cols): Retention Curve Area Chart */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black text-slateText-main">
                  Customer Retention Decay Curve (%)
                </h3>
              </div>
              <p className="text-xs text-slateText-muted mt-0.5 font-medium">
                Percentage of active clothing shoppers returning for repeat orders over 6 months
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-black shrink-0">
              <span className="flex items-center gap-1.5 text-[#6C4DF6]">
                <span className="w-3 h-3 rounded-full bg-[#6C4DF6]" /> Your Store (39.4%)
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-3 rounded-full bg-slate-300" /> Benchmark (22%)
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retentionCohortData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cohortGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C4DF6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6C4DF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EBFB" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#68647A', fontWeight: 600 }}
                  axisLine={{ stroke: '#E7E0F7' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#68647A', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip content={<CustomCohortTooltip />} />
                <Area
                  type="monotone"
                  dataKey="retention"
                  stroke="#6C4DF6"
                  strokeWidth={3}
                  fill="url(#cohortGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-[#F4F0FD] border border-[#E7E0F7] flex items-center justify-between text-xs">
            <span className="font-bold text-[#6C4DF6] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Retention Health Insight
            </span>
            <span className="font-black text-slate-800">
              Your Month 6 retention (39.4%) is <strong className="text-emerald-600">+17.4% above Indian fashion average</strong>.
            </span>
          </div>
        </div>

        {/* Right (5 cols): Customer RFM Segments */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-black text-slateText-main">Customer RFM Segments</h3>
              </div>
              <span className="text-xs font-bold text-slate-500">892 Total Buyers</span>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Shopper categorization by purchase frequency & spend
            </p>
          </div>

          <div className="space-y-3">
            {segments.map((seg, idx) => {
              const Icon = seg.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1.5 hover:border-brand-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center shadow-soft-xs text-slate-700">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slateText-main">{seg.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{seg.desc}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 block">{seg.count} Users</span>
                      <span className="text-[10px] font-black text-brand-600">{seg.share}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Row 2: Metro Demographics & Repurchase Speed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (6 cols): Top Indian Cities */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <h3 className="text-base font-black text-slateText-main">Top Geographic Metro Clusters</h3>
              </div>
              <span className="text-xs font-bold text-slate-500">Pan India Delivery</span>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Geographical distribution of customer orders and repeat volume
            </p>
          </div>

          <div className="space-y-3">
            {topCities.map((city, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-800">{city.city}</span>
                  <div className="text-right">
                    <span className="font-mono font-black text-slate-900">{formatCurrency(city.revenue)}</span>
                    <span className="text-[10px] text-emerald-600 font-bold ml-1.5">({city.share}%)</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div style={{ width: `${city.share}%` }} className="h-full rounded-full bg-[#6C4DF6]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (6 cols): Repurchase Speed Frequency */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-emerald-500" />
                <h3 className="text-base font-black text-slateText-main">Repurchase Turnaround Timelines</h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Avg: 26 Days
              </span>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Average time elapsed between 1st purchase and 2nd repeat order
            </p>
          </div>

          <div className="space-y-3">
            {repurchaseSpeed.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-slate-800">{item.period}</span>
                    <span className="text-[10px] text-slate-400 font-medium block">{item.label}</span>
                  </div>
                  <span className="font-mono font-black text-brand-600 text-sm">{item.percent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div style={{ width: `${item.percent}%` }} className="h-full rounded-full bg-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Row 3: Top VIP High-Value Customers Table */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-black text-slateText-main">Top High-Value VIP Buyers Leaderboard</h3>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Most loyal repeat shoppers ranked by total lifetime spend (LTV)
            </p>
          </div>
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Gold Loyalty Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Customer Profile</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Orders Completed</th>
                <th className="pb-3">Total Lifetime Spend</th>
                <th className="pb-3">Last Order</th>
                <th className="pb-3 pr-2 text-right">Loyalty Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {topCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 shadow-soft-xs"
                      />
                      <div>
                        <span className="font-black text-slate-900 block leading-tight">{cust.name}</span>
                        <span className="text-[10px] text-slate-400">{cust.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 font-bold text-slate-600">{cust.city}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6C4DF6] font-black text-[11px]">
                      {cust.ordersCount} Orders
                    </span>
                  </td>
                  <td className="py-3.5 font-mono font-black text-slate-900 text-sm">
                    {formatCurrency(cust.totalSpend)}
                  </td>
                  <td className="py-3.5 font-bold text-slate-500">{cust.lastOrder}</td>
                  <td className="py-3.5 pr-2 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-black uppercase">
                      👑 {cust.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
