import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Ticket,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const CartDrawer = () => {
  const {
    cartItems,
    cartCount,
    subtotal,
    totalMrp,
    productDiscount,
    discountAmount,
    deliveryFee,
    finalTotal,
    appliedCoupon,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    applyCouponCode,
    removeCoupon,
  } = useCart();

  const toast = useToast();
  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountLeftForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCouponCode(couponInput);
    if (success) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-left">
        {/* 1. Header */}
        <div className="p-4 sm:p-5 border-b border-[#E7E0F7] bg-[#F4F0FD] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-brand-600 flex items-center justify-center shadow-soft-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slateText-main">Shopping Bag</h3>
              <p className="text-xs text-slateText-muted">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center shadow-soft-sm transition-transform hover:scale-105"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Free Delivery Progress Banner */}
        <div className="bg-amber-50/80 px-4 py-3 border-b border-amber-200 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              {amountLeftForFreeDelivery === 0 ? (
                <span className="text-emeraldGreen-700">🎉 Congratulations! You unlocked FREE Delivery</span>
              ) : (
                <span>Add ₹{amountLeftForFreeDelivery} more for <strong className="text-amber-800">FREE Delivery</strong></span>
              )}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-amber-200/70 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progressPercent >= 100 ? 'bg-emeraldGreen-500' : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 3. Items Scroll List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#F4F0FD] text-[#6C4DF6] flex items-center justify-center mx-auto shadow-soft-sm">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-black text-slateText-main">Your Bag is Empty</h4>
                <p className="text-xs text-slateText-muted mt-1">Explore our latest fashion & trending collections</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-purple-glow hover:bg-brand-600 transition-colors"
              >
                Shop Now
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="p-3.5 rounded-2xl bg-white border border-[#E7E0F7] shadow-soft-sm flex gap-3.5 items-center relative group"
              >
                {/* Product Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-black text-slateText-main truncate">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-slate-400 hover:text-roseDanger-500 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Size: {item.size}
                    </span>
                    {item.color && (
                      <span className="text-[10px] text-slate-500">
                        {item.color}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-slateText-main">₹{item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-[11px] text-slate-400 line-through">₹{item.originalPrice}</span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="p-1 hover:bg-white text-slate-600 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-black text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="p-1 hover:bg-white text-slate-600 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 4. Footer Summary & Checkout (Only if items exist) */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E7E0F7] bg-[#F4F0FD]/60 space-y-4 shrink-0">
            {/* Coupon Box */}
            {appliedCoupon ? (
              <div className="p-2.5 rounded-xl bg-emeraldGreen-50 border border-emeraldGreen-200 flex items-center justify-between text-xs">
                <span className="font-bold text-emeraldGreen-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Code <strong>{appliedCoupon.code}</strong> Applied (-₹{discountAmount})
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-roseDanger-500 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. WELCOME10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-[#E7E0F7] text-xs font-bold uppercase outline-none focus:border-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-colors shadow-soft-sm"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Price Details */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total MRP</span>
                <span>₹{totalMrp}</span>
              </div>
              {productDiscount > 0 && (
                <div className="flex justify-between text-emeraldGreen-600 font-semibold">
                  <span>Discount on MRP</span>
                  <span>-₹{productDiscount}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-emeraldGreen-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong className="text-emeraldGreen-600 uppercase">FREE</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E7E0F7] flex justify-between text-sm font-black text-slateText-main">
                <span>Total Amount</span>
                <span className="text-base text-brand-600">₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#6C4DF6] to-[#8A6AF8] hover:from-[#5836E6] hover:to-[#7854F7] text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-purple-glow hover:scale-[1.01]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
