import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white border-t border-surface-border ${className}`}>
      <div className="text-xs sm:text-sm text-slateText-muted font-medium">
        Showing <span className="font-bold text-slateText-main">{start}</span> to{' '}
        <span className="font-bold text-slateText-main">{end}</span> of{' '}
        <span className="font-bold text-slateText-main">{totalItems}</span> results
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded-lg border border-surface-border bg-surface-muted hover:bg-gray-200 text-slateText-main disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1))
          .map((page, idx, arr) => {
            const prevPage = arr[idx - 1];
            const hasGap = prevPage && page - prevPage > 1;

            return (
              <React.Fragment key={page}>
                {hasGap && <span className="px-1 text-slateText-muted">...</span>}
                <button
                  type="button"
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === page
                      ? 'bg-brand-500 text-white shadow-soft-sm'
                      : 'bg-surface-muted hover:bg-gray-200 text-slateText-main border border-surface-border'
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            );
          })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded-lg border border-surface-border bg-surface-muted hover:bg-gray-200 text-slateText-main disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
