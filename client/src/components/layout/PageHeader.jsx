import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [], // [{ label: 'Store', path: '/products' }, { label: 'Products' }]
  children, // Action buttons / CTA
  badge,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div>
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-[11px] sm:text-xs text-slateText-muted font-medium mb-1">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-slateText-muted/60" />}
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="hover:text-brand-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slateText-main font-semibold">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slateText-main tracking-tight leading-tight">
            {title}
          </h1>
          {badge && (
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6C4DF6] border border-purple-200 shadow-soft-xs shrink-0 whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs sm:text-sm text-slateText-muted font-medium mt-0.5 sm:mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};
