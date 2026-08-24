import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    xs: 'px-2.5 py-1.5 text-xs gap-1.5',
    sm: 'px-3.5 py-2 text-xs sm:text-sm gap-2',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
    icon: 'p-2.5 text-sm',
  };

  const variantStyles = {
    primary: 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-soft-sm hover:shadow-purple-glow focus:ring-brand-400',
    coral: 'bg-coral-500 hover:bg-coral-600 active:bg-coral-700 text-white shadow-soft-sm hover:shadow-coral-glow focus:ring-coral-400',
    warm: 'bg-warm-500 hover:bg-warm-600 active:bg-warm-700 text-slateText-main shadow-soft-sm focus:ring-warm-400',
    secondary: 'bg-surface-muted hover:bg-gray-200 text-slateText-main border border-surface-border focus:ring-gray-300',
    outline: 'bg-white hover:bg-brand-50 text-brand-600 border border-brand-300 hover:border-brand-500 focus:ring-brand-300',
    ghost: 'bg-transparent hover:bg-surface-muted text-slateText-muted hover:text-slateText-main focus:ring-gray-200',
    danger: 'bg-roseDanger-500 hover:bg-red-600 text-white shadow-soft-sm focus:ring-red-400',
    success: 'bg-emeraldGreen-500 hover:bg-emerald-600 text-white shadow-soft-sm focus:ring-emerald-400',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};
