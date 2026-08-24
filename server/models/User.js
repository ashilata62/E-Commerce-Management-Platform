import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: 'password123' },
  role: { type: String, enum: ['Admin', 'Manager', 'Staff'], default: 'Staff' },
  avatar: { type: String },
  phone: { type: String },
  status: { type: String, enum: ['Active', 'Suspended', 'Pending'], default: 'Active' },
  permissions: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
