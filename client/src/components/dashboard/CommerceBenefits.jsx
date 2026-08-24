import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export const CommerceBenefits = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Orders above ₹499 nationwide',
      color: 'text-brand-500 bg-brand-50',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: 'Within 7 days hassle-free',
      color: 'text-coral-500 bg-coral-50',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: '100% encrypted UPI & cards',
      color: 'text-emeraldGreen-500 bg-emeraldGreen-50',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description: 'Priority seller & customer desk',
      color: 'text-warm-600 bg-warm-50',
    },
  ];

  return (
    <div className="commerce-card p-4 sm:p-5 bg-white border border-surface-border">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3.5 ${idx !== 0 ? 'pt-3 sm:pt-0 sm:pl-4' : ''}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slateText-main">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slateText-muted font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
