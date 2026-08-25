import React from 'react';
import { STATUS_COLORS } from '../../utils/constants';

export const StatusBadge = ({ status, size = 'md', showDot = true, className = '' }) => {
  const config = STATUS_COLORS[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    dot: 'bg-gray-400',
  };

  const sizeClasses = {
    sm: 'px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-bold',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3.5 py-1.5 text-sm font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full border shrink-0 whitespace-nowrap leading-none ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      )}
      <span>{status}</span>
    </span>
  );
};
