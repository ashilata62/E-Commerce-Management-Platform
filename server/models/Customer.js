import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  avatar: String,
  segment: { type: String, enum: ['VIP', 'New', 'Returning', 'At Risk', 'Inactive'], default: 'New' },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  averageOrderValue: { type: Number, default: 0 },
  lastPurchase: Date,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  city: String,
  favoriteCategories: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema);
