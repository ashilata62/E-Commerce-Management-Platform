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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-slateText-muted font-medium mb-1.5">
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

        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slateText-main tracking-tight">
            {title}
          </h1>
          {badge && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-200">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs sm:text-sm text-slateText-muted font-medium mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
};
