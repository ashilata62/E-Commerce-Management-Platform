import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, XCircle, MessageSquareQuote, ThumbsUp, Filter } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { RatingStars } from '../../components/common/RatingStars';
import { marketingService } from '../../services/marketingService';
import { useToast } from '../../context/ToastContext';
import { formatDate } from '../../utils/formatters';

export const Reviews = () => {
  const toast = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState('All');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await marketingService.getReviews();
      if (res.success) {
        setReviews(res.data);
      }
    } catch (err) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await marketingService.updateReviewStatus(id, status);
      if (res.success) {
        toast.success(`Review ${status.toLowerCase()} successfully`);
        fetchReviews();
      }
    } catch (err) {
      toast.error('Failed to update review');
    }
  };

  const filtered = filterRating === 'All'
    ? reviews
    : reviews.filter(r => r.rating === Number(filterRating));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Reviews & Ratings"
        subtitle="Moderate buyer testimonials, verify feedback, and maintain social proof standards"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Reviews' }]}
        badge={`${reviews.length} Total Testimonials`}
      />

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', '5', '4', '3', '2', '1'].map((star) => (
          <button
            key={star}
            onClick={() => setFilterRating(star)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterRating === star
                ? 'bg-warm-500 text-white shadow-soft-sm'
                : 'bg-white border border-surface-border text-slateText-muted hover:text-slateText-main'
            }`}
          >
            {star === 'All' ? 'All Ratings' : `${star} ★ Stars`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((rev) => (
          <div key={rev._id} className="commerce-card p-5 sm:p-6 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <RatingStars rating={rev.rating} showScore={false} size="sm" />
                  <span className="text-sm font-bold text-slateText-main">{rev.title}</span>
                </div>
                <p className="text-xs text-brand-600 font-semibold mt-1">Product: {rev.productName}</p>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                rev.status === 'Approved' ? 'bg-emeraldGreen-50 text-emeraldGreen-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {rev.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slateText-muted leading-relaxed font-medium">
              "{rev.comment}"
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-surface-border text-xs">
              <div className="flex items-center gap-2 text-slateText-muted">
                <span className="font-bold text-slateText-main">{rev.customerName}</span>
                <span>• {formatDate(rev.date)}</span>
                {rev.verifiedPurchase && (
                  <span className="text-emeraldGreen-600 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {rev.status !== 'Approved' ? (
                  <Button size="xs" variant="success" onClick={() => handleUpdateStatus(rev._id, 'Approved')}>
                    Approve
                  </Button>
                ) : (
                  <Button size="xs" variant="ghost" className="text-roseDanger-500 hover:bg-roseDanger-50" onClick={() => handleUpdateStatus(rev._id, 'Rejected')}>
                    Hide Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
