import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { BarChart2, TrendingUp, AlertTriangle, ArrowUpRight, DollarSign, Layers } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { analyticsService } from '../../services/analyticsService';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const ProductAnalytics = () => {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await analyticsService.getProductAnalytics();
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        toast.error('Failed to load product analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const categoryShare = [
    { name: 'Women', value: 42, color: '#6C4DF6' },
    { name: 'Men', value: 24, color: '#FF5C8A' },
    { name: 'Footwear', value: 16, color: '#FFB84D' },
    { name: 'Beauty', value: 11, color: '#19A974' },
    { name: 'Accessories', value: 7, color: '#381D9E' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product & Catalog Analytics"
        subtitle="Analyze unit sales velocity, gross margins per SKU, deadstock risk, and category contribution"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Analytics' }, { label: 'Products' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Contribution Pie */}
        <div className="lg:col-span-5 commerce-card p-6">
          <h3 className="text-base font-bold text-slateText-main mb-1">
            Category Sales Share (%)
          </h3>
          <p className="text-xs text-slateText-muted mb-4 font-medium">GMV share distributed across catalog verticals</p>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShare}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}% Share`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-semibold">
            {categoryShare.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-slateText-muted">{cat.name}:</span>
                <span className="font-bold text-slateText-main">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* High Margin Products Leaderboard */}
        <div className="lg:col-span-7 commerce-card p-6">
          <h3 className="text-base font-bold text-slateText-main mb-1">
            High Margin Leaderboard
          </h3>
          <p className="text-xs text-slateText-muted mb-4 font-medium">Highest gross profitability items contributing to net income</p>

          <div className="space-y-3">
            {data?.highMarginItems?.map((item) => (
              <div key={item._id} className="p-3 bg-surface-muted/40 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={item.images?.[0]} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-slateText-main truncate max-w-[200px]">{item.name}</h4>
                    <p className="text-[10px] text-slateText-muted">{item.category} • Cost: {formatCurrency(item.costPrice || 500)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emeraldGreen-600 bg-emeraldGreen-50 px-2 py-0.5 rounded-md">
                    {item.marginPercent || 68}% Margin
                  </span>
                  <p className="text-[11px] font-bold text-slateText-main mt-0.5">{formatCurrency(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
