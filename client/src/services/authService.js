import { localStore } from './mockDataStore';

export const authService = {
  login: async ({ email, password }) => {
    const user = localStore.data.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || localStore.data.user;
    return {
      success: true,
      token: 'demo_jwt_token_' + Date.now(),
      user,
    };
  },

  register: async (customerData) => {
    const newCustomer = {
      _id: 'usr_' + Date.now(),
      name: customerData.name || 'New Shopper',
      email: customerData.email,
      role: 'Customer',
      avatar: customerData.gender === 'Female'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      phone: customerData.phone || '+91 98765 00000',
      status: 'Active',
      walletBalance: 250, // ₹250 welcome bonus
      rewardPoints: 500, // 500 welcome points
      activeOrders: 0,
      wishlistCount: 0,
      permissions: ['customer_portal'],
      shippingAddress: {
        street: customerData.address || 'Flat 402, Royal Residency',
        city: customerData.city || 'Mumbai',
        state: customerData.state || 'Maharashtra',
        zip: customerData.zip || '400001',
        country: 'India',
      },
    };

    if (!localStore.data.users) localStore.data.users = [];
    localStore.data.users.unshift(newCustomer);

    return {
      success: true,
      token: 'demo_token_customer_' + Date.now(),
      user: newCustomer,
      message: 'Account created successfully! ₹250 Welcome bonus added to your wallet.',
    };
  },

  getCurrentUser: async () => {
    return { success: true, user: localStore.data.user };
  },

  forgotPassword: async () => {
    return { success: true, message: 'Password recovery sent' };
  },

  resetPassword: async () => {
    return { success: true, message: 'Password updated' };
  },
};
