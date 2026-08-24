import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productId: { type: String, required: true },
  customerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  comment: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  verifiedPurchase: { type: Boolean, default: true },
  status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Approved' },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
