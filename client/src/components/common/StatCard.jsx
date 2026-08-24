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
}) => {
  const colorMap = {
    purple: {
      bg: 'bg-brand-50',
      iconText: 'text-brand-500',
      border: 'hover:border-brand-200',
      glow: 'hover:shadow-purple-glow',
    },
    coral: {
      bg: 'bg-coral-50',
      iconText: 'text-coral-500',
      border: 'hover:border-coral-200',
      glow: 'hover:shadow-coral-glow',
    },
    warm: {
      bg: 'bg-warm-50',
      iconText: 'text-warm-600',
      border: 'hover:border-warm-200',
      glow: 'hover:shadow-soft-md',
    },
    green: {
      bg: 'bg-emeraldGreen-50',
      iconText: 'text-emeraldGreen-500',
      border: 'hover:border-emeraldGreen-500/20',
      glow: 'hover:shadow-soft-md',
    },
    blue: {
      bg: 'bg-blue-50',
      iconText: 'text-blue-500',
      border: 'hover:border-blue-200',
      glow: 'hover:shadow-soft-md',
    }
  };

  const scheme = colorMap[colorScheme] || colorMap.purple;

  return (
    <div
      className={`commerce-card p-5 sm:p-6 relative overflow-hidden group ${scheme.border} ${scheme.glow} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-slateText-muted tracking-tight">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slateText-main mt-1 tracking-tight">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${scheme.bg} ${scheme.iconText} shrink-0 transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-surface-border/60">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-md ${
                isPositive
                  ? 'text-emeraldGreen-500 bg-emeraldGreen-50'
                  : 'text-roseDanger-500 bg-roseDanger-50'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-slateText-muted font-medium truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
