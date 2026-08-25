import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export const FilterBar = ({
  filters = {},
  options = {}, // e.g. { category: ['All', 'Women', ...], brand: [...] }
  onChange,
  onReset,
  activeFiltersCount = 0,
  className = '',
}) => {
  return (
    <div className={`p-3 sm:p-3.5 bg-white border border-surface-border rounded-2xl shadow-soft-sm space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:gap-3 ${className}`}>
      <div className="flex items-center justify-between sm:justify-start gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slateText-muted uppercase tracking-wider pl-1">
          <Filter className="w-3.5 h-3.5 text-brand-500" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="xs"
            icon={RotateCcw}
            onClick={onReset}
            className="sm:hidden text-xs text-roseDanger-500 hover:text-roseDanger-600 hover:bg-roseDanger-50"
          >
            Reset
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 flex-1">
        {Object.entries(options).map(([key, list]) => (
          <div key={key} className="relative w-full sm:w-auto">
            <select
              value={filters[key] || 'All'}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full appearance-none bg-surface-muted hover:bg-gray-200/80 border border-surface-border text-slateText-main text-[11px] sm:text-xs font-bold rounded-xl pl-2.5 sm:pl-3 pr-7 py-2 outline-none focus:border-brand-500 cursor-pointer transition-colors truncate"
            >
              {list.map((opt) => (
                <option key={opt} value={opt}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {opt}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slateText-muted text-[10px]">
              ▼
            </div>
          </div>
        ))}
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="xs"
          icon={RotateCcw}
          onClick={onReset}
          className="hidden sm:inline-flex text-xs text-roseDanger-500 hover:text-roseDanger-600 hover:bg-roseDanger-50"
        >
          Reset All
        </Button>
      )}
    </div>
  );
};
