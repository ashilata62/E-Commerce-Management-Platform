import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    id: String,
    name: String,
    email: String,
    phone: String,
    avatar: String,
  },
  items: [{
    productId: String,
    name: String,
    image: String,
    size: String,
    color: String,
    quantity: Number,
    unitPrice: Number,
    total: Number,
  }],
  subtotal: Number,
  discount: { type: Number, default: 0 },
  couponCode: String,
  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Pending (COD)', 'Pending', 'Failed', 'Refunded'], default: 'Pending' },
  paymentMethod: String,
  orderStatus: { type: String, enum: ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'], default: 'Confirmed' },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  trackingNumber: String,
  courierPartner: String,
  timeline: [{
    status: String,
    time: String,
    completed: Boolean,
  }],
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
