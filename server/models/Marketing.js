import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  banner: String,
  runTime: String,
  startDate: Date,
  endDate: Date,
  productsCount: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  roas: { type: Number, default: 0 },
  conversion: String,
  status: { type: String, enum: ['Active', 'Scheduled', 'Completed', 'Paused'], default: 'Active' },
  badge: String,
}, { timestamps: true });

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed', 'shipping'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  minOrderAmount: { type: Number, default: 0 },
  maxDiscount: { type: Number },
  usageLimit: { type: Number, default: 100 },
  usedCount: { type: Number, default: 0 },
  expiryDate: Date,
  status: { type: String, enum: ['Active', 'Expired', 'Disabled'], default: 'Active' },
  description: String,
}, { timestamps: true });

const affiliateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  partnerCode: { type: String, required: true, unique: true },
  category: String,
  clicks: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  revenueGenerated: { type: Number, default: 0 },
  commissionRate: { type: Number, default: 10 },
  payoutBalance: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive', 'Paused'], default: 'Active' },
}, { timestamps: true });

export const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
export const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
export const Affiliate = mongoose.models.Affiliate || mongoose.model('Affiliate', affiliateSchema);
