import React from 'react';
import { ShieldCheck, Truck, Star, RotateCcw } from 'lucide-react';

export const StoreHealthCard = ({ healthScore = 85 }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <div className="commerce-card p-4 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emeraldGreen-50 text-emeraldGreen-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slateText-main">Store Health</h3>
              <p className="text-[10px] sm:text-[11px] text-slateText-muted font-medium">Quality & Service Score</p>
            </div>
          </div>

          <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-emeraldGreen-50 text-emeraldGreen-600 border border-emeraldGreen-500/20">
            Tier 1 Verified
          </span>
        </div>

        {/* Full Circular Progress Gauge */}
        <div className="my-3 sm:my-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            {/* SVG Ring Gauge */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#635BFF" />
                </linearGradient>
              </defs>
              {/* Background Track Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#F1F5F9"
                strokeWidth="8"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="url(#healthGradient)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-black text-slateText-main tracking-tight leading-none">
                {healthScore}%
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold text-emeraldGreen-600 tracking-wider mt-1 uppercase">
                EXCELLENT!
              </span>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-slateText-muted max-w-xs mt-2 sm:mt-3 leading-relaxed font-medium">
            Your store is performing better than <span className="text-slateText-main font-bold">85% of sellers</span> in fashion & lifestyle.
          </p>
        </div>
      </div>

      {/* Benchmark Metrics Breakdown */}
      <div className="space-y-2 sm:space-y-2.5 pt-3 sm:pt-4 border-t border-surface-border">
        <div className="flex items-center justify-between text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-slateText-muted font-medium">
            <Truck className="w-3.5 h-3.5 text-brand-500" />
            On-time Delivery
          </span>
          <span className="font-extrabold text-slateText-main">92%</span>
        </div>

        <div className="flex items-center justify-between text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-slateText-muted font-medium">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Positive Reviews
          </span>
          <span className="font-extrabold text-slateText-main">4.6 ★</span>
        </div>

        <div className="flex items-center justify-between text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-slateText-muted font-medium">
            <RotateCcw className="w-3.5 h-3.5 text-emeraldGreen-500" />
            Return Rate
          </span>
          <span className="font-extrabold text-emeraldGreen-600">2.4% (Low)</span>
        </div>
      </div>
    </div>
  );
};
