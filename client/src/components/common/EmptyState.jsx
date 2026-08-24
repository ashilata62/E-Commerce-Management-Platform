import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No items found',
  description = 'Try adjusting your search criteria or add new records to get started.',
  actionText,
  onAction,
  actionIcon,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-surface-border rounded-2xl ${className}`}>
      <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4 shadow-soft-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-lg font-bold text-slateText-main">{title}</h4>
      <p className="text-sm text-slateText-muted max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" icon={actionIcon} onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
