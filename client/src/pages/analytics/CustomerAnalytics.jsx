import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, UserCheck, Crown, HeartHandshake, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { analyticsService } from '../../services/analyticsService';
import { useToast } from '../../context/ToastContext';

export const CustomerAnalytics = () => {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await analyticsService.getCustomerAnalytics();
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        toast.error('Failed to load customer analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const cohortData = [
    { cohort: 'Month 1', retention: 100 },
    { cohort: 'Month 2', retention: 68 },
    { cohort: 'Month 3', retention: 54 },
    { cohort: 'Month 4', retention: 48 },
    { cohort: 'Month 5', retention: 42 },
    { cohort: 'Month 6', retention: 39 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Cohorts & Retention"
        subtitle="Track repeat purchase behavior, customer retention decay curves, and lifetime cohort value"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Analytics' }, { label: 'Customers' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Repeat Buyer Rate"
          value={data?.repeatPurchaseRate || "41.2%"}
          change="+5.1%"
          isPositive={true}
          icon={HeartHandshake}
          colorScheme="purple"
        />
        <StatCard
          title="90-Day Retention"
          value={data?.retentionRate || "68.4%"}
          change="+8.2%"
          isPositive={true}
          icon={UserCheck}
          colorScheme="green"
        />
        <StatCard
          title="Average Customer LTV"
          value={data?.averageLTV || "₹8,420"}
          change="+14.3%"
          isPositive={true}
          icon={Crown}
          colorScheme="warm"
        />
        <StatCard
          title="Monthly Churn Rate"
          value={data?.churnRate || "3.1%"}
          change="-0.8%"
          isPositive={true}
          icon={Users}
          colorScheme="coral"
        />
      </div>

      <div className="commerce-card p-6 sm:p-8">
        <h3 className="text-base font-bold text-slateText-main mb-1">
          Customer Retention Decay Curve (%)
        </h3>
        <p className="text-xs text-slateText-muted mb-6 font-medium">Percentage of active shoppers returning for repeat orders over 6 months</p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5" />
              <XAxis dataKey="cohort" tick={{ fontSize: 12 }} stroke="#737780" />
              <YAxis tick={{ fontSize: 12 }} stroke="#737780" unit="%" />
              <Tooltip formatter={(val) => [`${val}% Retained`, 'Cohort Retention']} />
              <Bar dataKey="retention" fill="#6C4DF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
