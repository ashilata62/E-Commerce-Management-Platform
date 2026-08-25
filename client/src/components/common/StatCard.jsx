import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  colorScheme = 'purple', // 'purple', 'coral', 'warm', 'green', 'blue'
  subtitle,
  className = '',
  size = 'default', // 'default' | 'sm'
}) => {
  const colorMap = {
    purple: {
      bg: 'bg-purple-50',
      iconText: 'text-purple-600',
      border: 'hover:border-purple-200',
      glow: 'hover:shadow-purple-glow',
    },
    coral: {
      bg: 'bg-coral-50',
      iconText: 'text-coral-500',
      border: 'hover:border-coral-200',
      glow: 'hover:shadow-coral-glow',
    },
    warm: {
      bg: 'bg-amber-50',
      iconText: 'text-amber-600',
      border: 'hover:border-amber-200',
      glow: 'hover:shadow-soft-md',
    },
    green: {
      bg: 'bg-emerald-50',
      iconText: 'text-emerald-600',
      border: 'hover:border-emerald-200',
      glow: 'hover:shadow-soft-md',
    },
    blue: {
      bg: 'bg-blue-50',
      iconText: 'text-blue-600',
      border: 'hover:border-blue-200',
      glow: 'hover:shadow-soft-md',
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.purple;

  return (
    <div
      className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#E7E0F7] shadow-soft-xs relative overflow-hidden group transition-all duration-200 ${scheme.border} ${scheme.glow} ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] sm:text-xs font-bold text-slateText-muted tracking-tight truncate">{title}</p>
          <h3 className="text-base sm:text-2xl font-black text-slateText-main mt-0.5 tracking-tight truncate">
            {value}
          </h3>
        </div>
        {Icon && (
          <div
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center ${scheme.bg} ${scheme.iconText} shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-soft-xs`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="flex items-center gap-1 mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100/80">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                isPositive
                  ? 'text-emeraldGreen-700 bg-emeraldGreen-50 border border-emeraldGreen-200/60'
                  : 'text-roseDanger-700 bg-roseDanger-50 border border-roseDanger-200/60'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              ) : (
                <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              )}
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
