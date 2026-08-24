import { localStore } from './mockDataStore';

export const customerService = {
  getCustomers: async (params = {}) => {
    let results = [...localStore.data.customers];
    const { segment, search } = params;

    if (segment && segment !== 'All') {
      results = results.filter(c => c.segment.toLowerCase() === segment.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      count: results.length,
      data: results,
    };
  },

  getCustomerById: async (id) => {
    const customer = localStore.data.customers.find(c => c._id === id || c.email === id);
    if (!customer) return { success: false, message: 'Not found' };
    const orders = localStore.data.orders.filter(o => o.customer?.email === customer.email);
    return {
      success: true,
      data: {
        ...customer,
        orders,
      }
    };
  },

  createCustomer: async (cstData) => {
    const newCustomer = {
      _id: 'cst_' + Date.now(),
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      lastPurchase: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      ...cstData,
    };
    localStore.data.customers.unshift(newCustomer);
    return { success: true, data: newCustomer };
  },
};
