import { store } from '../services/dataStore.js';

// @desc Get all customers with search, segment filter
// @route GET /api/customers
export const getCustomers = async (req, res) => {
  try {
    let results = [...store.customers];
    const { segment, search, status } = req.query;

    if (segment && segment !== 'All') {
      results = results.filter(c => c.segment.toLowerCase() === segment.toLowerCase());
    }

    if (status && status !== 'All') {
      results = results.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.city && c.city.toLowerCase().includes(q))
      );
    }

    const segmentsSummary = {
      all: store.customers.length,
      vip: store.customers.filter(c => c.segment === 'VIP').length,
      new: store.customers.filter(c => c.segment === 'New').length,
      returning: store.customers.filter(c => c.segment === 'Returning').length,
      atRisk: store.customers.filter(c => c.segment === 'At Risk').length,
      inactive: store.customers.filter(c => c.segment === 'Inactive').length,
    };

    res.json({
      success: true,
      count: results.length,
      segmentsSummary,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single customer by ID
// @route GET /api/customers/:id
export const getCustomerById = async (req, res) => {
  const customer = store.customers.find(c => c._id === req.params.id || c.email === req.params.id);
  if (!customer) {
    return res.status(404).json({ success: false, message: 'Customer not found' });
  }

  // Fetch customer orders
  const orders = store.orders.filter(o => o.customer?.email === customer.email || o.customer?.id === customer._id);

  res.json({
    success: true,
    data: {
      ...customer,
      orders,
    }
  });
};

// @desc Create or invite customer
// @route POST /api/customers
export const createCustomer = async (req, res) => {
  const customerData = req.body;
  const newCustomer = {
    _id: 'cst_' + Date.now(),
    name: customerData.name || 'New Shopper',
    email: customerData.email,
    phone: customerData.phone || '+91 90000 00000',
    avatar: customerData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    segment: customerData.segment || 'New',
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
    lastPurchase: new Date().toISOString(),
    status: 'Active',
    city: customerData.city || 'Mumbai',
    favoriteCategories: customerData.favoriteCategories || ['Fashion'],
  };

  store.customers.unshift(newCustomer);
  res.status(201).json({ success: true, message: 'Customer registered', data: newCustomer });
};
