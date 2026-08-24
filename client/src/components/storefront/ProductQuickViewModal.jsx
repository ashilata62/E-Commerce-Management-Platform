import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const ProductQuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsCheckoutOpen } = useCart();
  const toast = useToast();

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Default');
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const images = product.images?.length > 0
    ? product.images
    : [product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'];

  const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = product.colors || ['Black', 'Navy Blue', 'Wine Red', 'Emerald'];

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 35;

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus({
        success: true,
        message: `✓ Fast Delivery by Tomorrow, 4 PM to ${pincode} via Express Courier`,
      });
      toast.success(`Delivery available to pincode ${pincode}!`);
    } else {
      setPincodeStatus({
        success: false,
        message: 'Please enter a valid 6-digit Indian pincode',
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E7E0F7] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-soft-md transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-surface-border">
          {/* Main Large Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-surface-border shadow-soft-sm">
            <img
              src={images[activeImgIdx] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-black bg-coral-500 text-white shadow-soft-sm">
                {discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => {
                setIsWishlisted(!isWishlisted);
                toast.success(isWishlisted ? 'Removed from Wishlist' : 'Saved to Wishlist ❤️');
              }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-coral-500 shadow-soft-sm transition-colors"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-coral-500 text-coral-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIdx(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImgIdx === i ? 'border-brand-500 ring-2 ring-brand-200' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200 text-center">
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <Truck className="w-4 h-4 text-brand-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">Free Shipping</p>
              <p className="text-[9px] text-slate-400">On ₹999+</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <RotateCcw className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">7 Days Return</p>
              <p className="text-[9px] text-slate-400">Instant Pickup</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emeraldGreen-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">100% Original</p>
              <p className="text-[9px] text-slate-400">Direct Brand</p>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details, Size Selector, & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Title */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">
                {product.brand || product.category || 'Kiaan Premium'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slateText-main mt-1 leading-snug">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emeraldGreen-50 text-emeraldGreen-600 border border-emeraldGreen-200 text-xs font-black">
                  <span>{product.rating?.average || 4.8}</span>
                  <Star className="w-3 h-3 fill-emeraldGreen-500" />
                </div>
                <span className="text-xs text-slateText-muted font-medium">
                  ({product.rating?.count || 148} verified buyer ratings)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-3 p-3.5 rounded-2xl bg-[#F4F0FD]/60 border border-[#E7E0F7]">
              <span className="text-2xl sm:text-3xl font-black text-slateText-main">
                ₹{product.price}
              </span>
              {(product.compareAtPrice || product.originalPrice) && (
                <span className="text-sm sm:text-base text-slateText-muted line-through">
                  ₹{product.compareAtPrice || product.originalPrice}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-black text-coral-500 bg-coral-50 px-2 py-0.5 rounded-md border border-coral-200">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slateText-main uppercase tracking-wider">
                  Select Size: <span className="text-brand-600 font-extrabold">{selectedSize}</span>
                </span>
                <button
                  onClick={() => toast.info('Standard Size Chart: S (38"), M (40"), L (42"), XL (44")')}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-12 h-11 rounded-xl text-xs font-black transition-all flex items-center justify-center ${
                      selectedSize === sz
                        ? 'bg-brand-500 text-white shadow-purple-glow ring-2 ring-brand-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slateText-main uppercase tracking-wider">
                Available Colors: <span className="text-slate-600 font-normal">{selectedColor}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedColor === c
                        ? 'bg-[#E4DAFA] text-[#6C4DF6] border-[#6C4DF6]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Pincode Checker */}
            <form onSubmit={handleCheckPincode} className="space-y-2 pt-2">
              <span className="text-xs font-black text-slateText-main uppercase tracking-wider">
                Delivery Availability:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-Digit Pincode (e.g. 400001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition-colors"
                >
                  Check
                </button>
              </div>
              {pincodeStatus && (
                <p className={`text-xs font-bold ${pincodeStatus.success ? 'text-emeraldGreen-600' : 'text-roseDanger-500'}`}>
                  {pincodeStatus.message}
                </p>
              )}
            </form>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="space-y-2.5 pt-4 border-t border-surface-border">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  addToCart(product, selectedSize, selectedColor, quantity);
                  setQuickViewProduct(null);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#E4DAFA] hover:bg-[#D8CCF8] text-[#6C4DF6] font-black text-sm flex items-center justify-center gap-2 transition-all shadow-soft-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#6C4DF6] to-[#8A6AF8] hover:from-[#5836E6] hover:to-[#7854F7] text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-purple-glow"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
