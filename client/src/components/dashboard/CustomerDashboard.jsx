import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Package,
  Heart,
  CreditCard,
  Ticket,
  Clock,
  Truck,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  MapPin,
  Download,
  RotateCcw,
  Star,
  ShieldCheck,
  HelpCircle,
  Eye,
  ExternalLink,
  Flame,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { initialMockData } from '../../services/mockDataStore';

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [wishlistItems, setWishlistItems] = useState([1, 2, 4]);

  const toggleWishlist = (id, name) => {
    if (wishlistItems.includes(id)) {
      setWishlistItems(prev => prev.filter(item => item !== id));
      toast.info(`Removed ${name} from Wishlist`);
    } else {
      setWishlistItems(prev => [...prev, id]);
      toast.success(`Saved ${name} to your Wishlist ❤️`);
    }
  };

  const handleAddToCart = (productName) => {
    toast.success(`Added ${productName} to your Shopping Bag! 🛍️`);
  };

  const handleDownloadInvoice = () => {
    toast.success('Downloading Official Tax Invoice (PDF)...');
  };

  const activeShipment = {
    orderId: 'ORD-89240',
    itemCount: 2,
    total: 3899,
    items: [
      {
        name: 'Nike Air Zoom Pegasus 40',
        size: 'UK 9',
        qty: 1,
        price: 2899,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Puma Core Solid Polo T-Shirt',
        size: 'L',
        qty: 1,
        price: 1000,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      },
    ],
    status: 'In Transit',
    courier: 'BlueDart Express',
    trackingNumber: 'BLUEDART-IN-8934291',
    estDelivery: 'Tomorrow by 4:00 PM',
    steps: [
      { title: 'Ordered', date: '22 Aug, 10:30 AM', done: true },
      { title: 'Packed & Verified', date: '22 Aug, 4:15 PM', done: true },
      { title: 'In Transit (Mumbai Hub)', date: '23 Aug, 8:45 AM', done: true, current: true },
      { title: 'Out for Delivery', date: 'Pending', done: false },
      { title: 'Delivered', date: 'Est. 25 Aug', done: false },
    ],
  };

  const trendingProducts = (initialMockData.products || []).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 1. Customer Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6C4DF6] via-[#7F5DF7] to-[#A082F9] text-white p-6 sm:p-8 shadow-soft-xl">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-warm-300" />
              <span>Kiaan Premium Shopper Club</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Welcome back, {user?.name || 'Rohan'}! 👋
            </h1>
            <p className="text-sm text-white/90 leading-relaxed font-medium">
              Your order <span className="font-bold underline underline-offset-2">#{activeShipment.orderId}</span> is in transit and arriving <span className="font-bold text-amber-200">Tomorrow by 4:00 PM</span>.
            </p>
          </div>

          {/* Quick Wallet Card */}
          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center border border-amber-300/40">
              <CreditCard className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <p className="text-xs text-white/80 font-bold uppercase tracking-wider">Kiaan Wallet</p>
              <h4 className="text-xl font-black">₹450 <span className="text-xs font-normal text-white/80">Coins</span></h4>
              <p className="text-[10px] text-emerald-200 font-bold mt-0.5">✓ Instant 100% Usable</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Customer 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Active Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E0F7] shadow-soft-sm hover:shadow-soft-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slateText-muted uppercase tracking-wider">Active Orders</span>
            <div className="w-10 h-10 rounded-xl bg-[#F4F0FD] text-[#6C4DF6] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slateText-main mt-3">2</h3>
          <p className="text-xs text-emeraldGreen-500 font-bold mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 1 Arriving Tomorrow
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E0F7] shadow-soft-sm hover:shadow-soft-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slateText-muted uppercase tracking-wider">Wishlist</span>
            <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-coral-500" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slateText-main mt-3">{wishlistItems.length} Items</h3>
          <p className="text-xs text-brand-600 font-bold mt-1">2 on price drop deal</p>
        </div>

        {/* Reward Coins */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E0F7] shadow-soft-sm hover:shadow-soft-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slateText-muted uppercase tracking-wider">Rewards</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slateText-main mt-3">1,280 Pts</h3>
          <p className="text-xs text-amber-600 font-bold mt-1">Tier: Gold Member</p>
        </div>

        {/* Saved Coupons */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E0F7] shadow-soft-sm hover:shadow-soft-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slateText-muted uppercase tracking-wider">My Coupons</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-600 flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slateText-main mt-3">3 Active</h3>
          <p className="text-xs text-emeraldGreen-500 font-bold mt-1">Up to 40% OFF code</p>
        </div>
      </div>

      {/* 3. Live Order Tracking Card */}
      <div className="bg-white rounded-3xl border border-[#E7E0F7] p-6 shadow-soft-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emeraldGreen-50 text-emeraldGreen-600 border border-emeraldGreen-200">
                ● {activeShipment.status}
              </span>
              <h3 className="text-base font-extrabold text-slateText-main">Order #{activeShipment.orderId}</h3>
            </div>
            <p className="text-xs text-slateText-muted mt-1">
              Courier: <span className="font-bold text-slateText-main">{activeShipment.courier}</span> ({activeShipment.trackingNumber})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-border text-xs font-bold text-slateText-main hover:bg-surface-muted transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tax Invoice</span>
            </button>
            <Link
              to={`/orders/${activeShipment.orderId}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 transition-colors shadow-soft-sm"
            >
              <span>View Full Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Timeline Tracker */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2">
          {activeShipment.steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? 'bg-[#6C4DF6] text-white shadow-purple-glow'
                      : step.current
                      ? 'bg-amber-400 text-white ring-4 ring-amber-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className="text-xs font-bold text-slateText-main leading-tight">{step.title}</span>
              </div>
              <span className="text-[11px] text-slateText-muted pl-9">{step.date}</span>
            </div>
          ))}
        </div>

        {/* Items in this order */}
        <div className="bg-[#F4F0FD]/40 rounded-2xl p-4 border border-[#E7E0F7] flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3 overflow-hidden">
              {activeShipment.items.map((it, i) => (
                <img
                  key={i}
                  src={it.image}
                  alt={it.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-soft-sm"
                />
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-slateText-main">
                {activeShipment.items[0].name} + {activeShipment.items.length - 1} more item
              </p>
              <p className="text-xs text-slateText-muted">Total Paid: <span className="font-bold text-slateText-main">₹{activeShipment.total}</span> (Prepaid UPI)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.info('Return window is active for 7 days post delivery!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E7E0F7] text-xs font-bold text-slateText-main hover:bg-surface-muted"
            >
              <RotateCcw className="w-3.5 h-3.5 text-brand-500" />
              <span>Easy Return / Replace</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Trending & Recommended For You (Shopping Showcase) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slateText-main flex items-center gap-2">
              <Flame className="w-5 h-5 text-coral-500" /> Recommended For You
            </h2>
            <p className="text-xs text-slateText-muted">Handpicked fashion and lifestyle essentials based on your style</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>Browse All (8)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((p) => {
            const prodId = p._id || p.id;
            const isWish = wishlistItems.includes(prodId);
            const prodImg = p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80';
            const discount = p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : (p.discount || 30);

            return (
              <div
                key={prodId}
                className="bg-white rounded-2xl border border-[#E7E0F7] overflow-hidden shadow-soft-sm hover:shadow-soft-md transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={prodImg}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {discount > 0 && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-black bg-coral-500 text-white shadow-soft-sm">
                      {discount}% OFF
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(prodId, p.name)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-coral-500 shadow-soft-sm transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-coral-500 text-coral-500' : ''}`} />
                  </button>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">
                      {p.category}
                    </span>
                    <h4 className="text-sm font-bold text-slateText-main line-clamp-1 mt-0.5">
                      {p.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{p.rating?.average || 4.8}</span>
                      <span className="text-slateText-muted font-normal">({p.rating?.count || 142})</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-surface-border flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-slateText-main">₹{p.price}</span>
                      {(p.compareAtPrice || p.originalPrice) && (
                        <span className="text-xs text-slateText-muted line-through ml-1.5">
                          ₹{p.compareAtPrice || p.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(p.name)}
                      className="px-3 py-1.5 rounded-xl bg-[#E4DAFA] text-[#6C4DF6] hover:bg-[#6C4DF6] hover:text-white font-extrabold text-xs transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Saved Addresses & Customer Help Desk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Delivery Address */}
        <div className="bg-white rounded-3xl border border-[#E7E0F7] p-6 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slateText-main flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-500" /> Default Delivery Address
            </h3>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emeraldGreen-50 text-emeraldGreen-600 border border-emeraldGreen-200">
              Home
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F0FD]/50 border border-[#E7E0F7]">
            <p className="text-sm font-bold text-slateText-main">Rohan Deshmukh <span className="font-normal text-xs text-slateText-muted">(+91 98234 56789)</span></p>
            <p className="text-xs text-slateText-muted mt-1 leading-relaxed">
              Flat 402, Sunshine Heights, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra — 400053
            </p>
          </div>

          <button
            onClick={() => toast.info('Address book modal ready for managing multiple locations!')}
            className="w-full py-2.5 rounded-xl bg-white border border-[#E7E0F7] text-xs font-bold text-slateText-main hover:bg-surface-muted transition-colors"
          >
            Manage Saved Addresses (3)
          </button>
        </div>

        {/* 24/7 Customer Helpdesk */}
        <div className="bg-white rounded-3xl border border-[#E7E0F7] p-6 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slateText-main flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emeraldGreen-500" /> Customer Care & Support
            </h3>
            <span className="text-xs text-slateText-muted font-semibold">24/7 Priority</span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => toast.info('Connecting to live customer assistant via WhatsApp...')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F4F0FD]/50 hover:bg-[#F4F0FD] border border-[#E7E0F7] transition-colors"
            >
              <div className="flex items-center gap-3 text-left">
                <HelpCircle className="w-4 h-4 text-brand-500" />
                <div>
                  <p className="text-xs font-bold text-slateText-main">Instant Chat Support</p>
                  <p className="text-[10px] text-slateText-muted">Average response time &lt; 2 minutes</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slateText-muted" />
            </button>

            <button
              onClick={() => toast.info('Kiaan 7-Day Hassle-Free Returns & Money Back Guarantee Policy')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F4F0FD]/50 hover:bg-[#F4F0FD] border border-[#E7E0F7] transition-colors"
            >
              <div className="flex items-center gap-3 text-left">
                <RotateCcw className="w-4 h-4 text-amber-500" />
                <div>
                  <p className="text-xs font-bold text-slateText-main">Returns & Refund Policy</p>
                  <p className="text-[10px] text-slateText-muted">Instant refunds to UPI & original payment</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slateText-muted" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
