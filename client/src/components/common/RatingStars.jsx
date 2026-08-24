import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 0, reviewsCount, showScore = true, size = 'sm' }) => {
  const starSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center text-warm-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSizes[size]} ${
              star <= Math.round(rating)
                ? 'fill-warm-500 text-warm-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showScore && (
        <span className="text-xs font-bold text-slateText-main">
          {Number(rating).toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-slateText-muted font-medium">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
