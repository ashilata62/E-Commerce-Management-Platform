import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, Calendar, Tag, TrendingUp, ArrowUpRight, Zap } from 'lucide-react';
import { Button } from '../common/Button';

export const ActiveCampaignCard = () => {
  const navigate = useNavigate();

  return (
    <div className="commerce-card p-6 relative overflow-hidden bg-gradient-to-br from-white via-white to-coral-50/40 border-coral-200/80">
      {/* Decorative badge */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center font-bold">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-coral-600 tracking-wider">
              Active Campaign
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-coral-500 status-dot-pulse" />
              <span className="text-xs font-bold text-slateText-main">Live & Driving Sales</span>
            </div>
          </div>
        </div>

        <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-coral-500 text-white shadow-coral-glow">
          Up to 60% Off
        </span>
      </div>

      {/* Main Campaign title and description */}
      <div className="space-y-1 mb-5">
        <h3 className="text-xl sm:text-2xl font-black text-slateText-main tracking-tight">
          Mega Summer Sale 🎉
        </h3>
        <p className="text-xs sm:text-sm text-slateText-muted font-medium">
          Up to 60% Off on Fashion & Lifestyle catalog
        </p>
      </div>

      {/* Campaign Metric Grid */}
      <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-surface-muted/60 border border-surface-border mb-5">
        <div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slateText-muted uppercase">
            <Calendar className="w-3 h-3 text-slateText-muted" />
            <span>Run Time</span>
          </div>
          <p className="text-xs font-extrabold text-slateText-main mt-0.5">
            12 - 25 May
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slateText-muted uppercase">
            <Tag className="w-3 h-3 text-slateText-muted" />
            <span>Products</span>
          </div>
          <p className="text-xs font-extrabold text-slateText-main mt-0.5">
            842 Items
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slateText-muted uppercase">
            <TrendingUp className="w-3 h-3 text-emeraldGreen-500" />
            <span>Revenue</span>
          </div>
          <p className="text-xs font-extrabold text-emeraldGreen-600 mt-0.5">
            ₹1,24,890
          </p>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={() => navigate('/campaigns')}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-coral-50 hover:bg-coral-100 text-coral-600 font-bold text-xs sm:text-sm border border-coral-200 transition-colors"
      >
        <span>View Campaign Analytics</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
};
