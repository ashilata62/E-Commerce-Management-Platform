import { store } from '../services/dataStore.js';

// --- CAMPAIGNS ---
export const getCampaigns = async (req, res) => {
  res.json({ success: true, count: store.campaigns.length, data: store.campaigns });
};

export const createCampaign = async (req, res) => {
  const newCampaign = {
    _id: 'cmp_' + Date.now(),
    name: req.body.name || 'Festive Boom Sale',
    description: req.body.description || 'Special limited time promotional blitz',
    banner: req.body.banner || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    runTime: req.body.runTime || 'Next 7 Days',
    startDate: req.body.startDate || new Date().toISOString().split('T')[0],
    endDate: req.body.endDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    productsCount: Number(req.body.productsCount) || 120,
    revenue: 0,
    orders: 0,
    roas: 0,
    conversion: '0%',
    status: 'Active',
    badge: 'New Campaign',
  };
  store.campaigns.unshift(newCampaign);
  res.status(201).json({ success: true, message: 'Campaign launched', data: newCampaign });
};

// --- COUPONS ---
export const getCoupons = async (req, res) => {
  res.json({ success: true, count: store.coupons.length, data: store.coupons });
};

export const createCoupon = async (req, res) => {
  const newCoupon = {
    _id: 'cpn_' + Date.now(),
    code: (req.body.code || 'SALE' + Math.floor(10 + Math.random() * 90)).toUpperCase(),
    discountType: req.body.discountType || 'percentage',
    discountValue: Number(req.body.discountValue) || 20,
    minOrderAmount: Number(req.body.minOrderAmount) || 999,
    maxDiscount: Number(req.body.maxDiscount) || 500,
    usageLimit: Number(req.body.usageLimit) || 500,
    usedCount: 0,
    expiryDate: req.body.expiryDate || '2026-12-31',
    status: 'Active',
    description: req.body.description || `Special discount offer`,
  };
  store.coupons.unshift(newCoupon);
  res.status(201).json({ success: true, message: 'Coupon code created', data: newCoupon });
};

export const deleteCoupon = async (req, res) => {
  const index = store.coupons.findIndex(c => c._id === req.params.id || c.code === req.params.id);
  if (index !== -1) {
    store.coupons.splice(index, 1);
  }
  res.json({ success: true, message: 'Coupon deleted' });
};

// --- AFFILIATES ---
export const getAffiliates = async (req, res) => {
  res.json({ success: true, count: store.affiliates.length, data: store.affiliates });
};

export const createAffiliate = async (req, res) => {
  const newAffiliate = {
    _id: 'aff_' + Date.now(),
    name: req.body.name || 'New Influencer Partner',
    partnerCode: (req.body.partnerCode || 'AFF' + Math.floor(100 + Math.random() * 900)).toUpperCase(),
    category: req.body.category || 'Creator',
    clicks: 0,
    orders: 0,
    revenueGenerated: 0,
    commissionRate: Number(req.body.commissionRate) || 10,
    payoutBalance: 0,
    status: 'Active',
  };
  store.affiliates.unshift(newAffiliate);
  res.status(201).json({ success: true, message: 'Affiliate partner registered', data: newAffiliate });
};

// --- REVIEWS ---
export const getReviews = async (req, res) => {
  res.json({ success: true, count: store.reviews.length, data: store.reviews });
};

export const updateReviewStatus = async (req, res) => {
  const review = store.reviews.find(r => r._id === req.params.id);
  if (review) {
    review.status = req.body.status || 'Approved';
  }
  res.json({ success: true, message: 'Review status updated', data: review });
};
