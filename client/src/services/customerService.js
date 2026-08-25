import { localStore } from './mockDataStore';

const getStoredCustomers = () => {
  try {
    const saved = localStorage.getItem('kiaan_customers');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('LocalStorage read error for kiaan_customers', e);
  }
  localStorage.setItem('kiaan_customers', JSON.stringify(localStore.data.customers));
  return localStore.data.customers;
};

const saveStoredCustomers = (customers) => {
  localStore.data.customers = customers;
  try {
    localStorage.setItem('kiaan_customers', JSON.stringify(customers));
  } catch (e) {
    console.error('LocalStorage write error for kiaan_customers', e);
  }
};

export const customerService = {
  getCustomers: async (params = {}) => {
    const allCustomers = getStoredCustomers();
    let results = [...allCustomers];
    const { segment, search } = params;

    if (segment && segment !== 'All') {
      results = results.filter(c => c.segment?.toLowerCase() === segment.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      count: results.length,
      data: results,
    };
  },

  getCustomerById: async (id) => {
    const customers = getStoredCustomers();
    const customer = customers.find(c => c._id === id || c.email === id);
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

  registerCustomerLogin: (user) => {
    if (!user || (user.role && user.role !== 'Customer')) return;
    const customers = getStoredCustomers();
    const exists = customers.some(c => c.email?.toLowerCase() === user.email?.toLowerCase());
    if (!exists) {
      const newCustomer = {
        _id: user._id || 'cst_' + Date.now(),
        name: user.name || 'Registered Customer',
        email: user.email,
        phone: user.phone || '+91 98234 56789',
        city: 'Bengaluru',
        segment: 'New',
        totalOrders: 1,
        totalSpent: 2499,
        averageOrderValue: 2499,
        lastPurchase: new Date().toISOString(),
        avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      };
      const updated = [newCustomer, ...customers];
      saveStoredCustomers(updated);
    }
  },

  createCustomer: async (cstData) => {
    const customers = getStoredCustomers();
    const newCustomer = {
      _id: 'cst_' + Date.now(),
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      lastPurchase: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      ...cstData,
    };
    const updated = [newCustomer, ...customers];
    saveStoredCustomers(updated);
    return { success: true, data: newCustomer };
  },
};
