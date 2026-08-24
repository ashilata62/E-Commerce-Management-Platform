import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
  const renderItem = (index) => {
    switch (type) {
      case 'product':
        return (
          <div key={index} className="commerce-card p-4 rounded-2xl animate-pulse">
            <div className="w-full aspect-[4/5] bg-gray-200 rounded-xl mb-3" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        );

      case 'row':
        return (
          <div key={index} className="flex items-center gap-4 p-4 border-b border-surface-border animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-6 bg-gray-200 rounded-full w-24" />
          </div>
        );

      case 'stat':
        return (
          <div key={index} className="commerce-card p-6 rounded-2xl animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-8 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        );

      default:
        return (
          <div key={index} className={`h-24 bg-gray-200 rounded-2xl animate-pulse ${className}`} />
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => renderItem(i))}
    </>
  );
};
