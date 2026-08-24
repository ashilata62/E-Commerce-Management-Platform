import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  itemCount: { type: Number, default: 0 },
  image: { type: String },
  description: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
