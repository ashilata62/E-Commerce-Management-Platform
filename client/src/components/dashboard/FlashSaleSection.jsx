import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Clock, Flame, ArrowRight, Eye, Edit3 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const FlashSaleSection = ({ products = [] }) => {
  const navigate = useNavigate();

  // Dynamic live countdown timer starting at 02:14:36
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 36,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 30, seconds: 0 }; // reset cycle
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigits = (num) => String(num).padStart(2, '0');

  // Filter flash sale items or fallback to top items
  const flashProducts = products.filter(p => p.flashSale).slice(0, 4);

  return (
    <div className="commerce-card p-6 border-coral-200/60 bg-gradient-to-b from-coral-50/20 via-white to-white">
      {/* Header with Title and Countdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-coral-500 text-white flex items-center justify-center font-black shadow-coral-glow">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slateText-main tracking-tight">
                Flash Sale
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-md bg-coral-100 text-coral-600">
                <Flame className="w-3 h-3 fill-coral-500" />
                HIGH DEMAND
              </span>
            </div>
            <p className="text-xs text-slateText-muted font-medium">Limited-time discounted items moving fast</p>
          </div>
        </div>

        {/* Live Countdown Timer Chips */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slateText-muted flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-coral-500" />
            Ends in:
          </span>
          <div className="flex items-center gap-1 font-mono font-extrabold text-sm text-white">
            <span className="bg-slateText-main px-2.5 py-1 rounded-lg shadow-soft-sm">
              {formatDigits(timeLeft.hours)}
            </span>
            <span className="text-slateText-main font-black">:</span>
            <span className="bg-slateText-main px-2.5 py-1 rounded-lg shadow-soft-sm">
              {formatDigits(timeLeft.minutes)}
            </span>
            <span className="text-slateText-main font-black">:</span>
            <span className="bg-coral-500 px-2.5 py-1 rounded-lg shadow-coral-glow animate-pulse">
              {formatDigits(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {flashProducts.map((product) => {
          const discountPercent = product.compareAtPrice
            ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
            : 40;
          const soldPercent = product.soldPercent || 78;

          return (
            <div
              key={product._id}
              className="group bg-white rounded-2xl border border-surface-border p-3.5 hover:border-coral-300 hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Product Image & Badges */}
                <div className="relative rounded-xl overflow-hidden aspect-square bg-surface-muted mb-3">
                  <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-coral-500 text-white font-extrabold text-[10px] shadow-soft-sm">
                    {discountPercent}% OFF
                  </div>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="w-8 h-8 rounded-full bg-white text-slateText-main flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 transition-colors shadow-soft-md"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/products/edit/${product._id}`)}
                      className="w-8 h-8 rounded-full bg-white text-slateText-main flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 transition-colors shadow-soft-md"
                      title="Edit Item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Name & Pricing */}
                <p className="text-[11px] font-bold text-coral-600 uppercase tracking-tight">{product.brand}</p>
                <h4 className="text-sm font-bold text-slateText-main truncate group-hover:text-brand-600 transition-colors">
                  {product.name}
                </h4>

                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-base font-black text-slateText-main">
                    {formatCurrency(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xs text-slateText-muted line-through font-medium">
                      {formatCurrency(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar & % Sold */}
              <div className="mt-4 pt-3 border-t border-surface-border/60">
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-coral-600">{soldPercent}% Sold</span>
                  <span className="text-slateText-muted">{product.stock} left</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-coral-500 to-warm-500 transition-all duration-500"
                    style={{ width: `${soldPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom link to manage all flash sale inventory */}
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/flash-sale')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-coral-600 hover:text-coral-700 hover:underline"
        >
          <span>Manage All Flash Sale Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
