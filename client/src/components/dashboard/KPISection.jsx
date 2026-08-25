import React from 'react';
import { IndianRupee, ShoppingCart, Users, PackageCheck, Percent } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const KPISection = ({ data }) => {
  const overview = data?.overview || {
    totalRevenue: 284920,
    revenueGrowth: '+24.8%',
    totalOrders: 128,
    ordersGrowth: '+18.2%',
    totalCustomers: 892,
    customersGrowth: '+21.6%',
    productsSold: 1248,
    productsSoldGrowth: '+17.3%',
    conversionRate: 3.24,
    conversionGrowth: '+8.6%',
  };

  const kpiList = [
    {
      title: 'Total Revenue',
      value: formatCurrency(overview.totalRevenue),
      change: overview.revenueGrowth,
      isPositive: true,
      subtitle: 'vs previous period',
      icon: IndianRupee,
      colorScheme: 'purple',
    },
    {
      title: 'Total Orders',
      value: formatNumber(overview.totalOrders),
      change: overview.ordersGrowth,
      isPositive: true,
      subtitle: '12 new processing',
      icon: ShoppingCart,
      colorScheme: 'coral',
    },
    {
      title: 'Total Customers',
      value: formatNumber(overview.totalCustomers),
      change: overview.customersGrowth,
      isPositive: true,
      subtitle: '84 VIP shoppers',
      icon: Users,
      colorScheme: 'warm',
    },
    {
      title: 'Products Sold',
      value: formatNumber(overview.productsSold),
      change: overview.productsSoldGrowth,
      isPositive: true,
      subtitle: 'Across 6 categories',
      icon: PackageCheck,
      colorScheme: 'green',
    },
    {
      title: 'Conversion Rate',
      value: `${overview.conversionRate}%`,
      change: overview.conversionGrowth,
      isPositive: true,
      subtitle: 'Industry avg 2.4%',
      icon: Percent,
      colorScheme: 'blue',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-4">
      {kpiList.map((kpi, idx) => (
        <StatCard
          key={idx}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          isPositive={kpi.isPositive}
          subtitle={kpi.subtitle}
          icon={kpi.icon}
          colorScheme={kpi.colorScheme}
        />
      ))}
    </div>
  );
};
