import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  costPrice: { type: Number },
  stock: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 10 },
  rating: { type: Number, default: 4.5 },
  reviewsCount: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  status: { type: String, enum: ['Published', 'Draft', 'Archived'], default: 'Published' },
  badge: { type: String, default: '' },
  description: { type: String },
  images: [{ type: String }],
  variants: [{
    size: String,
    color: String,
    stock: Number,
    sku: String,
  }],
  weight: { type: String },
  dimensions: { type: String },
  tags: [{ type: String }],
  flashSale: { type: Boolean, default: false },
  soldPercent: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
