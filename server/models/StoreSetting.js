import mongoose from 'mongoose';

const storeSettingSchema = new mongoose.Schema({
  storeName: { type: String, default: "Komal's Luxe Emporium" },
  storeTagline: { type: String, default: "India's Premier Fashion & Lifestyle Destination" },
  logo: String,
  banner: String,
  storeStatus: { type: String, enum: ['Online', 'Offline', 'Maintenance'], default: 'Online' },
  supportEmail: String,
  supportPhone: String,
  address: String,
  currency: { type: String, default: 'INR (₹)' },
  currencySymbol: { type: String, default: '₹' },
  gstin: String,
  timezone: { type: String, default: 'Asia/Kolkata (IST)' },
  socials: {
    instagram: String,
    facebook: String,
    twitter: String,
    youtube: String,
  },
  paymentGateways: {
    razorpay: { enabled: Boolean, keyId: String, testMode: Boolean },
    stripe: { enabled: Boolean, keyId: String, testMode: Boolean },
    upi: { enabled: Boolean, vpa: String },
    cod: { enabled: Boolean, minOrder: Number, maxOrder: Number, extraFee: Number },
  },
  shippingRules: {
    freeShippingThreshold: Number,
    standardRate: Number,
    expressRate: Number,
    estimatedDays: String,
    couriers: [String],
  }
}, { timestamps: true });

export default mongoose.models.StoreSetting || mongoose.model('StoreSetting', storeSettingSchema);
