import { localStore } from './mockDataStore';

export const marketingService = {
  getCampaigns: async () => {
    return { success: true, count: localStore.data.campaigns.length, data: localStore.data.campaigns };
  },

  createCampaign: async (cmpData) => {
    const newCampaign = {
      _id: 'cmp_' + Date.now(),
      revenue: 0,
      orders: 0,
      roas: 0,
      conversion: '0%',
      status: 'Active',
      ...cmpData,
    };
    localStore.data.campaigns.unshift(newCampaign);
    return { success: true, data: newCampaign };
  },

  getCoupons: async () => {
    return { success: true, count: localStore.data.coupons.length, data: localStore.data.coupons };
  },

  createCoupon: async (couponData) => {
    const newCoupon = {
      _id: 'cpn_' + Date.now(),
      usedCount: 0,
      status: 'Active',
      ...couponData,
    };
    localStore.data.coupons.unshift(newCoupon);
    return { success: true, data: newCoupon };
  },

  deleteCoupon: async (id) => {
    const idx = localStore.data.coupons.findIndex(c => c._id === id || c.code === id);
    if (idx !== -1) localStore.data.coupons.splice(idx, 1);
    return { success: true };
  },

  getAffiliates: async () => {
    return { success: true, count: localStore.data.affiliates.length, data: localStore.data.affiliates };
  },

  createAffiliate: async (affData) => {
    const newAff = {
      _id: 'aff_' + Date.now(),
      clicks: 0,
      orders: 0,
      revenueGenerated: 0,
      payoutBalance: 0,
      ...affData,
    };
    localStore.data.affiliates.unshift(newAff);
    return { success: true, data: newAff };
  },

  getReviews: async () => {
    return { success: true, count: localStore.data.reviews.length, data: localStore.data.reviews };
  },

  updateReviewStatus: async (id, status) => {
    const rev = localStore.data.reviews.find(r => r._id === id);
    if (rev) rev.status = status;
    return { success: true, data: rev };
  },
};
