import React from 'react';
import {
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

export const TopSellingOutfitsCard = ({ products = [] }) => {
  const navigate = useNavigate();

  // Top clothing items
  const topOutfits = [
    {
      id: 1,
      name: 'Embroidered Anarkali Kurta Set',
      category: "Women's Ethnic",
      unitsSold: 184,
      revenue: 459816,
      stock: 34,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Urban Oversized Heavyweight 240 GSM Tee',
      category: "Men's Casuals",
      unitsSold: 246,
      revenue: 196554,
      stock: 48,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Italian Fit Linen Blend Blazer',
      category: "Men's Formals",
      unitsSold: 88,
      revenue: 351912,
      stock: 19,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Ribbed Knit Crop Top & Wide Leg Trouser Co-ord',
      category: "Women's Western",
      unitsSold: 122,
      revenue: 195078,
      stock: 14,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
    },
  ];

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-3.5 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3 className="text-sm sm:text-base font-black text-slateText-main">Top Outfits</h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] sm:text-[10px] font-black uppercase">
              Bestsellers
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slateText-muted mt-0.5 font-medium">
            Highest grossing fashion items by units & total volume
          </p>
        </div>

        <button
          onClick={() => navigate('/products')}
          className="text-[11px] sm:text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* List of top items */}
      <div className="space-y-2.5 sm:space-y-3">
        {topOutfits.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => navigate('/products')}
            className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-brand-200 bg-slate-50/50 hover:bg-brand-50/30 transition-all flex items-center justify-between gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-slate-200 text-slate-700 text-[10px] sm:text-xs font-black flex items-center justify-center shrink-0">
                #{idx + 1}
              </span>

              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover shrink-0 shadow-soft-xs"
              />

              <div className="min-w-0 flex-1">
                <h4 className="text-[11px] sm:text-xs font-black text-slateText-main truncate group-hover:text-brand-600 transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 truncate">{item.category}</span>
                  <span className="text-[9px] text-slate-300">•</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 shrink-0">{item.stock} in stock</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 block">
                {formatCurrency(item.revenue)}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500">
                {item.unitsSold} sold
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingOutfitsCard;
