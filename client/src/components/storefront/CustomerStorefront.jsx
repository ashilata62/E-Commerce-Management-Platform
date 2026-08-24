import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Eye,
  Sparkles,
  Flame,
  ArrowUpDown,
  Check,
  RotateCcw,
  Truck,
  ShieldCheck,
  Tag,
  Clock
} from 'lucide-react';
import { initialMockData } from '../../services/mockDataStore';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const CustomerStorefront = () => {
  const { addToCart, setQuickViewProduct, setIsCheckoutOpen } = useCart();
  const toast = useToast();

  const [products, setProducts] = useState(initialMockData.products || []);
  const [categories, setCategories] = useState(initialMockData.categories || []);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');
  const [wishlist, setWishlist] = useState([1, 4]);

  // Flash Sale Timer Countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (id, name) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      toast.info(`Removed ${name} from Wishlist`);
    } else {
      setWishlist(prev => [...prev, id]);
      toast.success(`Saved ${name} to Wishlist ❤️`);
    }
  };

  // Filter & Sort Products
  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice =
      priceRange === 'all' ? true :
      priceRange === 'under1000' ? product.price < 1000 :
      priceRange === '1000-3000' ? (product.price >= 1000 && product.price <= 3000) :
      product.price > 3000;

    return matchCategory && matchSearch && matchPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating?.average || 0) - (a.rating?.average || 0);
    return 0; // Default popular
  });

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* 1. Hero Shopping Promotional Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6C4DF6] via-[#855FF8] to-[#FF5C8A] text-white p-6 sm:p-10 shadow-soft-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-60 h-60 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wide border border-white/30">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Kiaan Mega Festive Festival — Up to 70% OFF</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Elevate Your Style With Premium Fashion & Lifestyle
          </h1>

          <p className="text-sm sm:text-base text-white/90 font-medium">
            Explore authentic collections with Free Express Shipping, 7-day hassle-free returns & 100% genuine guarantee.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedCategory('All');
                toast.success('Browsing entire catalog!');
              }}
              className="px-6 py-3 rounded-2xl bg-white text-slateText-main font-black text-sm shadow-soft-lg hover:bg-slate-50 transition-all hover:scale-105"
            >
              Shop All Deals
            </button>
            <button
              onClick={() => setSelectedCategory('Women')}
              className="px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-md text-white font-bold text-sm hover:bg-white/30 border border-white/30 transition-all"
            >
              Explore Women's Wardrobe
            </button>
          </div>
        </div>
      </div>

      {/* 2. Category Circular Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slateText-main flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" /> Shop By Category
          </h3>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`text-xs font-bold ${selectedCategory === 'All' ? 'text-brand-600' : 'text-slate-500'} hover:underline`}
          >
            View All Categories
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`flex flex-col items-center gap-2 shrink-0 p-3 rounded-2xl transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#E4DAFA] border-2 border-brand-500 shadow-soft-sm'
                : 'bg-white border border-[#E7E0F7] hover:bg-slate-50'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-brand-500 text-white flex items-center justify-center font-black text-sm shadow-soft-sm">
              ALL
            </div>
            <span className="text-xs font-black text-slateText-main">All Store</span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex flex-col items-center gap-2 shrink-0 p-3 rounded-2xl transition-all ${
                  isSelected
                    ? 'bg-[#E4DAFA] border-2 border-brand-500 shadow-soft-sm'
                    : 'bg-white border border-[#E7E0F7] hover:bg-slate-50'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-soft-sm"
                />
                <span className="text-xs font-black text-slateText-main">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Live Flash Sale Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-yellow-200 fill-yellow-200" />
          </div>
          <div>
            <h4 className="text-sm font-black flex items-center gap-2">
              ⚡ LIVE FLASH SALE — Extra 20% OFF
              <span className="px-2 py-0.5 rounded bg-white text-orange-600 text-[10px] font-black uppercase">
                CODE: FESTIVE20
              </span>
            </h4>
            <p className="text-xs text-white/90">Grab the hottest deals before stocks run out!</p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-1.5 bg-black/25 px-4 py-2 rounded-xl backdrop-blur-sm">
          <Clock className="w-4 h-4 text-yellow-300" />
          <span className="text-xs font-bold text-white/90">Ends in:</span>
          <span className="px-2 py-1 rounded bg-black/40 text-xs font-black text-yellow-300 font-mono">
            0{timeLeft.hours}h
          </span>
          <span className="font-bold">:</span>
          <span className="px-2 py-1 rounded bg-black/40 text-xs font-black text-yellow-300 font-mono">
            {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}m
          </span>
          <span className="font-bold">:</span>
          <span className="px-2 py-1 rounded bg-black/40 text-xs font-black text-yellow-300 font-mono">
            {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}s
          </span>
        </div>
      </div>

      {/* 4. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E7E0F7] shadow-soft-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search clothes, shoes, watches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
          {/* Price Range Filter */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-brand-500"
          >
            <option value="all">All Prices</option>
            <option value="under1000">Under ₹1,000</option>
            <option value="1000-3000">₹1,000 - ₹3,000</option>
            <option value="above3000">Above ₹3,000</option>
          </select>

          {/* Sort By Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-brand-500"
          >
            <option value="popular">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <span className="text-xs font-bold text-slate-500">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* 5. Product Catalog Grid (Flipkart/Amazon/Myntra Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const prodId = product._id || product.id;
          const isWish = wishlist.includes(prodId);
          const prodImg = product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80';
          const discount = product.compareAtPrice
            ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
            : 35;

          return (
            <div
              key={prodId}
              className="bg-white rounded-3xl border border-[#E7E0F7] overflow-hidden shadow-soft-sm hover:shadow-soft-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Image & Badges */}
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img
                  src={prodImg}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Discount Badge */}
                {discount > 0 && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-coral-500 text-white shadow-soft-sm">
                    {discount}% OFF
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(prodId, product.name)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-coral-500 shadow-soft-sm transition-all hover:scale-110"
                >
                  <Heart className={`w-4 h-4 ${isWish ? 'fill-coral-500 text-coral-500' : ''}`} />
                </button>

                {/* Quick View Hover Button */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md text-slateText-main text-xs font-black shadow-soft-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-brand-600"
                >
                  <Eye className="w-3.5 h-3.5 text-brand-500" />
                  <span>Quick View</span>
                </button>
              </div>

              {/* Product Info & Pricing */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-600">
                      {product.brand || product.category}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-black">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating?.average || 4.8}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="text-sm font-black text-slateText-main line-clamp-1 mt-1 cursor-pointer hover:text-brand-600 transition-colors"
                  >
                    {product.name}
                  </h3>

                  {/* Size chips */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-slate-400 font-bold">Sizes:</span>
                    {(product.sizes || ['S', 'M', 'L', 'XL']).slice(0, 4).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slateText-main">
                      ₹{product.price}
                    </span>
                    {(product.compareAtPrice || product.originalPrice) && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.compareAtPrice || product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* 2 Big Action Buttons: Add to Bag & Buy Now */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product, 'M', 'Default', 1)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#E4DAFA] hover:bg-[#D8CCF8] text-[#6C4DF6] font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-soft-sm hover:scale-[1.02]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => {
                        addToCart(product, 'M', 'Default', 1);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#6C4DF6] to-[#8A6AF8] hover:from-[#5836E6] hover:to-[#7854F7] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-purple-glow hover:scale-[1.02]"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Commerce Trust Guarantees Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        <div className="p-4 rounded-2xl bg-white border border-[#E7E0F7] shadow-soft-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-black text-slateText-main">Free Express Shipping</h5>
            <p className="text-[10px] text-slateText-muted">On all orders above ₹999 across India</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7E0F7] shadow-soft-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-black text-slateText-main">7-Day Hassle-Free Returns</h5>
            <p className="text-[10px] text-slateText-muted">Instant doorstep pickup & refund</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7E0F7] shadow-soft-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emeraldGreen-50 text-emeraldGreen-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-black text-slateText-main">100% Genuine Guarantee</h5>
            <p className="text-[10px] text-slateText-muted">Direct verified brand sources</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7E0F7] shadow-soft-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-black text-slateText-main">Instant UPI & COD Ready</h5>
            <p className="text-[10px] text-slateText-muted">GPay, PhonePe, Cards & Cash on Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStorefront;
