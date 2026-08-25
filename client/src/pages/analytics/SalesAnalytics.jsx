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
  Cell
} from 'recharts';
import {
  TrendingUp,
  IndianRupee,
  ShoppingCart,
  Percent,
  Calendar,
  Download,
  Smartphone,
  CreditCard,
  Building,
  Truck,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Share2,
  CheckCircle2,
  Clock,
  PieChart as PieIcon,
  Layers
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const SalesAnalytics = () => {
  const toast = useToast();
  const [timeframe, setTimeframe] = useState('7d'); // '7d' | '30d' | '90d' | 'ytd'

  const chartData7D = [
    { day: 'Mon', revenue: 32400, orders: 15, profit: 11600, cogs: 20800 },
    { day: 'Tue', revenue: 38900, orders: 18, profit: 14000, cogs: 24900 },
    { day: 'Wed', revenue: 45200, orders: 21, profit: 16270, cogs: 28930 },
    { day: 'Thu', revenue: 41800, orders: 19, profit: 15050, cogs: 26750 },
    { day: 'Fri', revenue: 52600, orders: 24, profit: 18930, cogs: 33670 },
    { day: 'Sat', revenue: 68400, orders: 32, profit: 24620, cogs: 43780, isPeak: true },
    { day: 'Sun', revenue: 58200, orders: 26, profit: 20950, cogs: 37250 },
  ];

  const chartData30D = [
    { day: 'Week 1', revenue: 210000, orders: 98, profit: 75600, cogs: 134400 },
    { day: 'Week 2', revenue: 264000, orders: 118, profit: 95040, cogs: 168960 },
    { day: 'Week 3', revenue: 312000, orders: 142, profit: 112320, cogs: 199680 },
    { day: 'Week 4', revenue: 284920, orders: 128, profit: 102570, cogs: 182350, isPeak: true },
  ];

  const activeChartData = timeframe === '30d' ? chartData30D : chartData7D;

  const paymentModes = [
    {
      name: 'Instant UPI (GPay / PhonePe / QR)',
      share: '68%',
      amount: 193745,
      orders: 87,
      icon: Smartphone,
      color: 'bg-emerald-500',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'Credit & Debit Cards (Visa / MC)',
      share: '22%',
      amount: 62682,
      orders: 28,
      icon: CreditCard,
      color: 'bg-blue-500',
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'Net Banking & EMI',
      share: '6%',
      amount: 17095,
      orders: 8,
      icon: Building,
      color: 'bg-purple-500',
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      name: 'Cash on Delivery (COD)',
      share: '4%',
      amount: 11396,
      orders: 5,
      icon: Truck,
      color: 'bg-amber-500',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  const categoryBreakdown = [
    { name: "Women's Ethnic", share: 40.5, revenue: 115400, count: 46, color: 'bg-[#6C4DF6]' },
    { name: "Men's Casuals", share: 24.0, revenue: 68380, count: 38, color: 'bg-[#3B82F6]' },
    { name: "Women's Western", share: 18.5, revenue: 52700, count: 24, color: 'bg-[#EC4899]' },
    { name: "Men's Formals", share: 11.0, revenue: 31340, count: 12, color: 'bg-[#10B981]' },
    { name: "Kids & Winter Sets", share: 6.0, revenue: 17100, count: 8, color: 'bg-[#F59E0B]' },
  ];

  const salesChannels = [
    { name: 'Direct Storefront', percent: 48, revenue: 136761, growth: '+22%' },
    { name: 'Instagram & Social Ads', percent: 32, revenue: 91174, growth: '+34%' },
    { name: 'Google Search & SEO', percent: 15, revenue: 42738, growth: '+12%' },
    { name: 'WhatsApp VIP Broadcast', percent: 5, revenue: 14246, growth: '+55%' },
  ];

  const handleExport = (format) => {
    toast.success(`Exporting Official Sales & Revenue Ledger (${format.toUpperCase()})...`);
  };

  // Custom sleek tooltip for Area chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl border border-slate-800 backdrop-blur-md space-y-1.5 min-w-[170px]">
          <p className="text-xs font-black text-slate-300 border-b border-slate-700/60 pb-1 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-emerald-400 font-bold">
              {payload[0]?.payload?.orders} Orders
            </span>
          </p>
          <div className="flex items-center justify-between gap-3 text-xs pt-0.5">
            <span className="text-purple-300 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Gross:
            </span>
            <span className="font-mono font-bold text-white">
              {formatCurrency(payload[0]?.value)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Net Profit:
            </span>
            <span className="font-mono font-bold text-emerald-400">
              {formatCurrency(payload[1]?.value)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in pb-10">
      {/* 1. Header & Controls */}
      <PageHeader
        title="Sales & Revenue Intelligence"
        subtitle="Real-time gross merchandise value, profit margins, conversion funnels, and sales trajectory"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Analytics' }, { label: 'Sales' }]}
      >
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Timeframe selector */}
          <div className="flex items-center p-1 bg-white border border-[#E7E0F7] rounded-2xl shadow-soft-xs">
            {['7d', '30d', '90d'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  timeframe === t
                    ? 'bg-[#6C4DF6] text-white shadow-purple-glow'
                    : 'text-[#68647A] hover:text-[#202124] hover:bg-slate-50'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Export Report Button */}
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-[#E7E0F7] text-xs font-black shadow-soft-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-brand-500" />
            <span>Export Statement</span>
          </button>
        </div>
      </PageHeader>

      {/* 2. Top 4 Core Financial KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Gross Revenue"
          value={formatCurrency(284920)}
          change="+24.8%"
          isPositive={true}
          subtitle="Daily avg: ₹40,702"
          icon={IndianRupee}
          colorScheme="purple"
        />
        <StatCard
          title="Net Profit (36.0% Margin)"
          value={formatCurrency(102570)}
          change="+28.4%"
          isPositive={true}
          subtitle="After COGS & shipping"
          icon={TrendingUp}
          colorScheme="green"
        />
        <StatCard
          title="Total Paid Orders"
          value={formatNumber(128)}
          change="+18.2%"
          isPositive={true}
          subtitle="Avg 18.2 orders / day"
          icon={ShoppingCart}
          colorScheme="coral"
        />
        <StatCard
          title="Average Order Value (AOV)"
          value={formatCurrency(2225)}
          change="+6.4%"
          isPositive={true}
          subtitle="2.1 items per cart"
          icon={Percent}
          colorScheme="blue"
        />
      </div>

      {/* 3. Main Revenue vs Profit Interactive Area Chart */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base sm:text-lg font-black text-slateText-main">
                Gross Revenue vs Net Profit Curve (₹)
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                Peak: ₹68.4K on Sat
              </span>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Daily gross transaction volume mapped against net margins after product cost & delivery
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-black">
            <span className="flex items-center gap-1.5 text-[#6C4DF6]">
              <span className="w-3 h-3 rounded-full bg-[#6C4DF6]" /> Gross Revenue
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> Net Profit
            </span>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C4DF6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6C4DF6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1EBFB" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: '#68647A', fontWeight: 600 }}
                axisLine={{ stroke: '#E7E0F7' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#68647A', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `₹${val / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Gross Revenue"
                stroke="#6C4DF6"
                strokeWidth={3}
                fill="url(#revGrad)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                name="Net Profit"
                stroke="#10B981"
                strokeWidth={3}
                fill="url(#profGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Financial Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-500">Gross Sales</span>
            <p className="text-sm font-black text-slate-900 mt-0.5">₹2,84,920</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[10px] font-bold uppercase text-emerald-700">Net Profit</span>
            <p className="text-sm font-black text-emerald-700 mt-0.5">₹1,02,570</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-500">Product Costs (COGS)</span>
            <p className="text-sm font-black text-slate-900 mt-0.5">₹1,82,350</p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
            <span className="text-[10px] font-bold uppercase text-purple-700">Profit Margin</span>
            <p className="text-sm font-black text-purple-700 mt-0.5">36.0% Margin</p>
          </div>
        </div>
      </div>

      {/* 4. Grid Row 2: Payment Gateways & Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (6 cols): Payment Gateway Split */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-base font-black text-slateText-main">Payment Mode Distribution</h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                99.4% Success Rate
              </span>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Transactions processed via UPI, Cards, Net Banking & COD
            </p>
          </div>

          <div className="space-y-3.5">
            {paymentModes.map((mode, idx) => {
              const Icon = mode.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-2 hover:border-brand-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-soft-xs text-slate-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slateText-main">{mode.name}</h4>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          {mode.orders} orders processed
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 block">
                        {formatCurrency(mode.amount)}
                      </span>
                      <span className="text-[10px] font-black text-brand-600">
                        {mode.share} Share
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: mode.share }}
                      className={`h-full rounded-full ${mode.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (6 cols): Revenue by Clothing Category */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#6C4DF6]" />
                <h3 className="text-base font-black text-slateText-main">Revenue by Fashion Category</h3>
              </div>
              <span className="text-xs font-bold text-slate-500">6 Departments</span>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Sales contribution per clothing segment across men's, women's & kids wear
            </p>
          </div>

          <div className="space-y-3.5">
            {categoryBreakdown.map((cat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-2 hover:border-brand-200 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                    <span className="font-black text-slate-800">{cat.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold">• {cat.count} items sold</span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-black text-slate-900">{formatCurrency(cat.revenue)}</span>
                    <span className="text-[10px] font-bold text-slate-500 ml-1.5">({cat.share}%)</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.share}%` }}
                    className={`h-full rounded-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Grid Row 3: Daily Order Volume & Sales Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (7 cols): Order Volume Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-brand-500" />
                <h3 className="text-base font-black text-slateText-main">Daily Order Volume (Units)</h3>
              </div>
              <p className="text-xs text-slateText-muted mt-0.5 font-medium">
                Day-by-day checkout volume with weekend peak surge
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#6C4DF6] border border-purple-200 text-[10px] font-black">
              ⚡ Peak: 7 PM - 10 PM IST
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData7D} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EBFB" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: '#68647A', fontWeight: 600 }}
                  axisLine={{ stroke: '#E7E0F7' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#68647A', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#F4F0FD' }}
                  formatter={(value) => [`${value} Orders`, 'Daily Volume']}
                  contentStyle={{
                    backgroundColor: '#1E1B4B',
                    borderRadius: '16px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                />
                <Bar dataKey="orders" radius={[8, 8, 0, 0]}>
                  {chartData7D.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isPeak ? '#6C4DF6' : '#B8A4F9'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right (5 cols): Acquisition Channels */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <h3 className="text-base font-black text-slateText-main">Sales by Marketing Channel</h3>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Traffic source and revenue attribution
            </p>
          </div>

          <div className="space-y-3">
            {salesChannels.map((ch, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-black text-slate-800 block">{ch.name}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">{ch.growth} vs last month</span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-black text-slate-900 block">
                    {formatCurrency(ch.revenue)}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{ch.percent}% traffic</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-[#F4F0FD] border border-[#E7E0F7] flex items-center justify-between text-[11px]">
            <span className="font-bold text-[#6C4DF6] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Return on Ad Spend (RoAS)
            </span>
            <span className="font-black text-slate-900">4.8x Active RoAS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
