import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Search products, orders, customers...',
  className = '',
  onClear,
  size = 'md',
  autoFocus = false,
}) => {
  const sizeClasses = {
    sm: 'py-1.5 pl-8 pr-7 text-xs',
    md: 'py-2.5 pl-10 pr-9 text-sm',
    lg: 'py-3.5 pl-12 pr-10 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search
        className={`absolute text-slateText-muted pointer-events-none ${iconSizes[size]}`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full bg-surface-muted/70 hover:bg-surface-muted focus:bg-white text-slateText-main placeholder:text-slateText-muted border border-surface-border focus:border-brand-500 rounded-xl outline-none transition-all duration-200 shadow-soft-sm focus:shadow-soft-md ${sizeClasses[size]}`}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          className="absolute right-3 p-0.5 rounded-full hover:bg-gray-200 text-slateText-muted hover:text-slateText-main transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
