import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, AlertTriangle, ArrowRight, Zap, Lightbulb } from 'lucide-react';

export const AIAssistantCard = ({ insights = [] }) => {
  const navigate = useNavigate();

  const defaultInsights = [
    {
      icon: TrendingUp,
      title: 'Sales are up by 24.8% this week.',
      detail: 'Mega Summer Sale campaign is outperforming standard benchmarks.',
      badge: 'Revenue Spike',
      color: 'bg-emeraldGreen-500/20 text-emerald-200',
    },
    {
      icon: AlertTriangle,
      title: '18 products are running low on stock.',
      detail: 'Reorder suggested for top 5 fast-moving SKUs before weekend peak.',
      badge: 'Action Required',
      color: 'bg-warm-500/20 text-warm-200',
    },
    {
      icon: Lightbulb,
      title: '"Women\'s Kurta" is trending nationwide.',
      detail: 'Demand surged +32% across metropolitan delivery hubs.',
      badge: 'Trend Alert',
      color: 'bg-white/20 text-white',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl ai-card-gradient text-white p-4 sm:p-7 shadow-soft-lg">
      {/* Decorative ambient flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-coral-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header with Title & Badge */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-soft-sm shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-warm-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-extrabold tracking-tight flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span>AI Assistant</span>
                <span className="text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  REAL-TIME ML
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs text-white/80 font-medium">Predictive growth & inventory intelligence</p>
            </div>
          </div>

          <span className="text-lg sm:text-xl shrink-0">🎉</span>
        </div>

        {/* Insights List */}
        <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
          {defaultInsights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 transition-all flex items-start gap-2.5 sm:gap-3.5"
              >
                <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl shrink-0 ${item.color}`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                      {item.title}
                    </h4>
                    <span className="text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-white/20 text-white shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/80 mt-0.5 font-medium leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/ai-assistant')}
          className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-extrabold text-xs sm:text-sm shadow-soft-md transition-all active:scale-95 group"
        >
          <span>View All Business Insights</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
