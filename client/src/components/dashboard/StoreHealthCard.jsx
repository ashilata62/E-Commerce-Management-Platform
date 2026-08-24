import React from 'react';
import { ShieldCheck, Truck, Star, RotateCcw, CheckCircle2 } from 'lucide-react';

export const StoreHealthCard = ({ healthScore = 85 }) => {
  return (
    <div className="commerce-card p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emeraldGreen-50 text-emeraldGreen-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slateText-main">Store Health</h3>
              <p className="text-[11px] text-slateText-muted font-medium">Quality & Service Score</p>
            </div>
          </div>

          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emeraldGreen-50 text-emeraldGreen-600 border border-emeraldGreen-500/20">
            Tier 1 Verified
          </span>
        </div>

        {/* Semi-circular gauge visual */}
        <div className="my-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-36 h-20 flex items-end justify-center overflow-hidden">
            {/* SVG Arc Gauge */}
            <svg className="w-36 h-36 transform -rotate-90 origin-center" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#EAEAEF"
                strokeWidth="10"
                strokeDasharray="125.6"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="url(#healthGradient)"
                strokeWidth="10"
                strokeDasharray="125.6"
                strokeDashoffset="18"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#19A974" />
                  <stop offset="100%" stopColor="#6C4DF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-3xl font-black text-slateText-main tracking-tight leading-none">
                {healthScore}%
              </span>
              <span className="text-[11px] font-extrabold text-emeraldGreen-500 uppercase tracking-wider mt-1">
                Excellent!
              </span>
            </div>
          </div>

          <p className="text-xs text-slateText-muted max-w-xs mt-3 leading-relaxed font-medium">
            Your store is performing better than <span className="text-slateText-main font-bold">85% of sellers</span> in fashion & lifestyle.
          </p>
        </div>
      </div>

      {/* Benchmark Metrics Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-surface-border">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-slateText-muted font-medium">
            <Truck className="w-3.5 h-3.5 text-brand-500" />
            On-time Delivery
          </span>
          <span className="font-extrabold text-slateText-main">92%</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-slateText-muted font-medium">
            <Star className="w-3.5 h-3.5 text-warm-500 fill-warm-500" />
            Positive Reviews
          </span>
          <span className="font-extrabold text-slateText-main">4.6 ★</span>
        </div>

        <div className="flex items-center justify-between text-xs">
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
