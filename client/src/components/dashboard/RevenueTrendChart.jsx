import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Smartphone,
  Truck,
  ArrowUpRight,
  Calendar,
  Layers
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const RevenueTrendChart = () => {
  const [timeframe, setTimeframe] = useState('7d'); // '7d', '30d'

  const weeklyData = [
    { day: 'Mon', revenue: 32400, orders: 14, height: '48%' },
    { day: 'Tue', revenue: 38900, orders: 18, height: '58%' },
    { day: 'Wed', revenue: 45200, orders: 21, height: '68%' },
    { day: 'Thu', revenue: 41800, orders: 19, height: '62%' },
    { day: 'Fri', revenue: 52600, orders: 24, height: '78%' },
    { day: 'Sat', revenue: 68400, orders: 32, height: '100%', isPeak: true },
    { day: 'Sun', revenue: 58200, orders: 26, height: '86%' },
  ];

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-5 sm:space-y-6">
      {/* 1. Header & Timeframe Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emeraldGreen-500 animate-pulse" />
            <h3 className="text-sm sm:text-base font-black text-slateText-main">Weekly Sales & Revenue Trend</h3>
            <span className="px-2 py-0.5 rounded-full bg-emeraldGreen-100 text-emeraldGreen-800 text-[9px] sm:text-[10px] font-black uppercase">
              +24.8% This Week
            </span>
          </div>
          <p className="text-xs text-slateText-muted mt-0.5 font-medium">
            Daily order volume and gross revenue breakdown across all clothing channels
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl sm:rounded-2xl shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              timeframe === '7d'
                ? 'bg-white text-brand-600 shadow-soft-xs font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              timeframe === '30d'
                ? 'bg-white text-brand-600 shadow-soft-xs font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* 2. Visual Interactive Bar Graph */}
      <div className="pt-2 sm:pt-4 pb-1 sm:pb-2 overflow-x-auto">
        <div className="h-40 sm:h-44 min-w-[280px] flex items-end justify-between gap-1.5 sm:gap-4 px-1 sm:px-2">
          {weeklyData.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 sm:gap-2 group h-full justify-end">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center pointer-events-none mb-1">
                <span className="bg-slate-900 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg shadow-lg whitespace-nowrap">
                  {formatCurrency(item.revenue)} ({item.orders})
                </span>
              </div>

              {/* Bar Column */}
              <div className="w-full max-w-[48px] bg-slate-100 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-end h-32 sm:h-36 p-0.5 sm:p-1">
                <div
                  style={{ height: item.height }}
                  className={`w-full rounded-lg sm:rounded-xl transition-all duration-500 ${
                    item.isPeak
                      ? 'bg-gradient-to-t from-[#6C4DF6] to-[#8A6AF8] shadow-purple-glow'
                      : 'bg-gradient-to-t from-[#B8A4F9] to-[#D5C7FC] group-hover:from-[#8A6AF8] group-hover:to-[#B8A4F9]'
                  }`}
                />
              </div>

              {/* Day Label */}
              <span className={`text-[10px] sm:text-[11px] font-bold ${item.isPeak ? 'text-[#6C4DF6] font-black' : 'text-slate-500'}`}>
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Payment Method Breakdown Strip */}
      <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        <div className="text-[11px] sm:text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" />
          <span>Payment Split:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-200/60 text-[11px] sm:text-xs font-bold text-emerald-700">
            <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Instant UPI (68%) • ₹1.93L</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200/60 text-[11px] sm:text-xs font-bold text-blue-700">
            <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Cards (22%) • ₹62.6K</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200/60 text-[11px] sm:text-xs font-bold text-amber-700">
            <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>COD (10%) • ₹28.5K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrendChart;
