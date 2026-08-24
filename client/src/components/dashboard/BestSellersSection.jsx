import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const BestSellersSection = ({ products = [] }) => {
  const navigate = useNavigate();

  // Sort by sales count
  const bestSellers = [...products]
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 4);

  return (
    <div className="commerce-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-warm-50 text-warm-600 flex items-center justify-center font-bold">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slateText-main tracking-tight">
              Best Selling Products
            </h3>
            <p className="text-xs text-slateText-muted font-medium">Top performing velocity leaders</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/products')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
        >
          <span>Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bestSellers.map((item, idx) => (
          <div
            key={item._id}
            onClick={() => navigate(`/products/${item._id}`)}
            className="group cursor-pointer bg-surface-muted/40 hover:bg-white rounded-2xl border border-surface-border p-3.5 hover:border-brand-300 hover:shadow-soft-md transition-all duration-200"
          >
            {/* Image with Rank Pill */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-muted mb-3">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-slateText-main text-white font-extrabold text-xs flex items-center justify-center shadow-soft-sm">
                #{idx + 1}
              </span>
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-slateText-main font-extrabold text-[10px] shadow-soft-sm">
                {item.category}
              </span>
            </div>

            {/* Title & Brand */}
            <p className="text-[10px] font-bold text-slateText-muted uppercase">{item.brand}</p>
            <h4 className="text-xs sm:text-sm font-bold text-slateText-main truncate group-hover:text-brand-600 transition-colors mt-0.5">
              {item.name}
            </h4>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-border/60">
              <span className="text-sm font-black text-slateText-main">
                {formatCurrency(item.price)}
              </span>

              <div className="flex items-center gap-1 text-xs font-bold text-warm-600 bg-warm-50 px-2 py-0.5 rounded-md">
                <Star className="w-3 h-3 fill-warm-500 text-warm-500" />
                <span>{item.rating || '4.5'}</span>
              </div>
            </div>

            {/* Units Sold Counter */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-slateText-muted mt-2">
              <span className="flex items-center gap-1 text-brand-600 font-bold">
                <TrendingUp className="w-3 h-3" />
                {formatNumber(item.salesCount)} Sold
              </span>
              <span>In stock: {item.stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
