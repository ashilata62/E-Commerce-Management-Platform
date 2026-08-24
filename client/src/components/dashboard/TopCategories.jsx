import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const TopCategories = ({ categories = [] }) => {
  const navigate = useNavigate();

  const defaultCategories = [
    { name: 'Women', itemCount: 2842, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80' },
    { name: 'Men', itemCount: 1248, image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=300&q=80' },
    { name: 'Kids', itemCount: 842, image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80' },
    { name: 'Footwear', itemCount: 1284, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80' },
    { name: 'Beauty', itemCount: 1028, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Accessories', itemCount: 732, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80' },
  ];

  const list = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="commerce-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-slateText-main tracking-tight">
            Top Categories
          </h3>
          <p className="text-xs text-slateText-muted font-medium">High converting product verticals</p>
        </div>
        <button
          onClick={() => navigate('/categories')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 text-center">
        {list.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/products?category=${cat.name}`)}
            className="group cursor-pointer flex flex-col items-center"
          >
            {/* Circular Image Card */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-surface-border group-hover:border-brand-500 transition-all duration-300 shadow-soft-sm group-hover:shadow-purple-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-surface-muted">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Category Name & Items Count */}
            <h4 className="text-sm font-bold text-slateText-main mt-2.5 group-hover:text-brand-600 transition-colors">
              {cat.name}
            </h4>
            <p className="text-[11px] text-slateText-muted font-semibold">
              {formatNumber(cat.itemCount)} Items
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
