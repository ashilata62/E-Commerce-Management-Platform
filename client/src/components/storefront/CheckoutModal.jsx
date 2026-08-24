import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  MapPin,
  Sparkles,
  ArrowRight,
  Smartphone,
  Banknote,
  QrCode,
  Lock,
  Download,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    finalTotal,
    subtotal,
    deliveryFee,
    discountAmount,
    clearCart,
  } = useCart();

  const toast = useToast();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [address, setAddress] = useState({
    name: 'Rohan Deshmukh',
    phone: '+91 98234 56789',
    street: 'Flat 402, Sunshine Heights, Lokhandwala Complex',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
  });

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setPlacedOrderId(newOrderId);
    setStep(3);
    clearCart();
    toast.success(`🎉 Order #${newOrderId} Placed Successfully! SMS & WhatsApp receipt sent.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E7E0F7] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E7E0F7] bg-[#F4F0FD] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-brand-600 flex items-center justify-center shadow-soft-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slateText-main">
                {step === 3 ? 'Order Confirmed!' : 'Secure 256-Bit Checkout'}
              </h3>
              <p className="text-xs text-slateText-muted">
                {step === 1 && 'Step 1 of 2: Shipping & Delivery Details'}
                {step === 2 && 'Step 2 of 2: Select Payment Method'}
                {step === 3 && `Order ID: #${placedOrderId}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setStep(1);
            }}
            className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center shadow-soft-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: Delivery Address Form */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-sm font-black text-slateText-main flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-500" /> Enter Delivery Address
                </h4>
                <span className="text-xs text-emeraldGreen-600 font-bold">✓ Pincode Serviceable</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:bg-white focus:border-brand-500 outline-none"
                    placeholder="Receiver Name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Mobile Number</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:bg-white focus:border-brand-500 outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Street Address / House / Flat No.</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:bg-white focus:border-brand-500 outline-none"
                    placeholder="House / Flat / Landmark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:bg-white focus:border-brand-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">6-Digit Pincode</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:bg-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* Order Summary Snapshot */}
              <div className="p-4 rounded-2xl bg-[#F4F0FD]/50 border border-[#E7E0F7] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slateText-main">{cartItems.length} Products in Order</p>
                  <p className="text-slateText-muted">Total to pay: <strong className="text-brand-600 text-sm">₹{finalTotal}</strong></p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-purple-glow transition-colors flex items-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Method Selection */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-sm font-black text-slateText-main flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-500" /> Choose Payment Option
                </h4>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-brand-600 font-bold hover:underline"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Radio Options */}
              <div className="space-y-3">
                {/* 1. UPI Payment */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#6C4DF6] bg-[#F4F0FD]/60 shadow-soft-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emeraldGreen-50 text-emeraldGreen-600 flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slateText-main flex items-center gap-2">
                        Instant UPI (Google Pay, PhonePe, Paytm, QR)
                        <span className="px-2 py-0.5 rounded bg-emeraldGreen-100 text-emeraldGreen-800 text-[9px] font-black uppercase">
                          Fastest
                        </span>
                      </h5>
                      <p className="text-[11px] text-slateText-muted">Zero transaction charges & instant cashback</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#6C4DF6] bg-[#6C4DF6]' : 'border-slate-300'}`}>
                    {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </label>

                {/* 2. Credit / Debit Card */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#6C4DF6] bg-[#F4F0FD]/60 shadow-soft-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-600 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slateText-main">Credit / Debit Card (Visa, Mastercard, RuPay)</h5>
                      <p className="text-[11px] text-slateText-muted">Encrypted 256-bit secure gateway</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#6C4DF6] bg-[#6C4DF6]' : 'border-slate-300'}`}>
                    {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </label>

                {/* 3. Cash on Delivery (COD) */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#6C4DF6] bg-[#F4F0FD]/60 shadow-soft-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slateText-main">Cash on Delivery (Pay at Doorstep)</h5>
                      <p className="text-[11px] text-slateText-muted">Pay via Cash / UPI when courier arrives</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#6C4DF6] bg-[#6C4DF6]' : 'border-slate-300'}`}>
                    {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </label>
              </div>

              {/* Pay & Place Order Button */}
              <div className="p-4 rounded-2xl bg-[#F4F0FD]/50 border border-[#E7E0F7] flex items-center justify-between">
                <div>
                  <p className="text-xs text-slateText-muted">Total Payable</p>
                  <h4 className="text-lg font-black text-brand-600">₹{finalTotal}</h4>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emeraldGreen-600 to-emeraldGreen-500 hover:from-emeraldGreen-500 hover:to-emeraldGreen-400 text-white font-black text-sm shadow-soft-md transition-all flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Place Order (₹{finalTotal})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation Celebration */}
          {step === 3 && (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emeraldGreen-50 text-emeraldGreen-500 flex items-center justify-center mx-auto ring-8 ring-emeraldGreen-100 shadow-soft-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emeraldGreen-100 text-emeraldGreen-800 text-xs font-black uppercase">
                  Payment Successful
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slateText-main">
                  Thank You For Your Order! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-slateText-muted max-w-md mx-auto">
                  We've received your order <strong className="text-slateText-main">#{placedOrderId}</strong>. A confirmation message with live tracking has been sent to your WhatsApp & Email.
                </p>
              </div>

              {/* Delivery info box */}
              <div className="p-4 rounded-2xl bg-[#F4F0FD]/60 border border-[#E7E0F7] max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-600">Estimated Delivery:</span>
                  <span className="text-emeraldGreen-700">Tomorrow by 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-600">Courier Partner:</span>
                  <span className="text-slate-900">BlueDart Express</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-600">Delivery Address:</span>
                  <span className="text-slate-900 truncate max-w-[200px]">{address.street}, {address.city}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep(1);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-purple-glow transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>

                <button
                  onClick={() => toast.success('Tax Invoice PDF Generated!')}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-[#E7E0F7] text-slateText-main font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-brand-500" />
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
