import { localStore } from './mockDataStore';

const getStored = (key, defaultData) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('LocalStorage read error for ' + key, e);
  }
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

const saveStored = (key, data, localRefName) => {
  if (localRefName && localStore.data[localRefName]) {
    localStore.data[localRefName] = data;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error for ' + key, e);
  }
};

export const marketingService = {
  getCampaigns: async () => {
    const campaigns = getStored('kiaan_campaigns', localStore.data.campaigns);
    localStore.data.campaigns = campaigns;
    return { success: true, count: campaigns.length, data: campaigns };
  },

  createCampaign: async (cmpData) => {
    const campaigns = getStored('kiaan_campaigns', localStore.data.campaigns);
    const newCampaign = {
      _id: 'cmp_' + Date.now(),
      revenue: 0,
      orders: 0,
      roas: 0,
      conversion: '0%',
      status: 'Active',
      ...cmpData,
    };
    const updated = [newCampaign, ...campaigns];
    saveStored('kiaan_campaigns', updated, 'campaigns');
    return { success: true, data: newCampaign };
  },

  getCoupons: async () => {
    const coupons = getStored('kiaan_coupons', localStore.data.coupons);
    localStore.data.coupons = coupons;
    return { success: true, count: coupons.length, data: coupons };
  },

  createCoupon: async (couponData) => {
    const coupons = getStored('kiaan_coupons', localStore.data.coupons);
    const newCoupon = {
      _id: 'cpn_' + Date.now(),
      usedCount: 0,
      status: 'Active',
      ...couponData,
    };
    const updated = [newCoupon, ...coupons];
    saveStored('kiaan_coupons', updated, 'coupons');
    return { success: true, data: newCoupon };
  },

  deleteCoupon: async (id) => {
    const coupons = getStored('kiaan_coupons', localStore.data.coupons);
    const updated = coupons.filter(c => c._id !== id && c.code !== id);
    saveStored('kiaan_coupons', updated, 'coupons');
    return { success: true };
  },

  getAffiliates: async () => {
    const affiliates = getStored('kiaan_affiliates', localStore.data.affiliates);
    localStore.data.affiliates = affiliates;
    return { success: true, count: affiliates.length, data: affiliates };
  },

  createAffiliate: async (affData) => {
    const affiliates = getStored('kiaan_affiliates', localStore.data.affiliates);
    const newAff = {
      _id: 'aff_' + Date.now(),
      clicks: 0,
      orders: 0,
      revenueGenerated: 0,
      payoutBalance: 0,
      ...affData,
    };
    const updated = [newAff, ...affiliates];
    saveStored('kiaan_affiliates', updated, 'affiliates');
    return { success: true, data: newAff };
  },

  getReviews: async () => {
    const reviews = getStored('kiaan_reviews', localStore.data.reviews);
    localStore.data.reviews = reviews;
    return { success: true, count: reviews.length, data: reviews };
  },

  updateReviewStatus: async (id, status) => {
    const reviews = getStored('kiaan_reviews', localStore.data.reviews);
    const rev = reviews.find(r => r._id === id);
    if (rev) {
      rev.status = status;
      saveStored('kiaan_reviews', reviews, 'reviews');
    }
    return { success: true, data: rev };
  },
};
