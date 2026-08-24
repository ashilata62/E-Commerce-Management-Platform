import { localStore } from './mockDataStore';

export const analyticsService = {
  getOverview: async () => {
    return {
      success: true,
      data: {
        overview: localStore.data.analytics.overview,
        salesChart: localStore.data.analytics.salesChart,
        categoryShare: [
          { name: 'Women', value: 42, color: '#6C4DF6' },
          { name: 'Men', value: 24, color: '#FF5C8A' },
          { name: 'Footwear', value: 16, color: '#FFB84D' },
          { name: 'Beauty', value: 11, color: '#19A974' },
          { name: 'Accessories', value: 7, color: '#381D9E' },
        ],
        aiInsights: localStore.data.analytics.aiInsights,
      }
    };
  },

  getProductAnalytics: async () => {
    const highMarginItems = localStore.data.products.map(p => ({
      ...p,
      marginPercent: Math.round(((p.price - (p.costPrice || p.price * 0.4)) / p.price) * 100),
    }));

    return {
      success: true,
      data: {
        highMarginItems,
        bestSellers: localStore.data.products.slice(0, 4),
      }
    };
  },

  getCustomerAnalytics: async () => {
    return {
      success: true,
      data: {
        retentionRate: '68.4%',
        repeatPurchaseRate: '41.2%',
        averageLTV: '₹8,420',
        churnRate: '3.1%',
      }
    };
  },

  getReports: async () => {
    return { success: true };
  },
};
