import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Crown, Users, AlertTriangle, ArrowRight, Zap, Target, Send } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const CustomerSegments = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [segments] = useState([
    {
      id: 'seg_vip',
      name: 'VIP High Spenders',
      icon: Crown,
      badge: 'Tier 1',
      color: 'bg-brand-50 text-brand-600 border-brand-200',
      count: 84,
      totalRevenue: '₹14,80,000',
      aov: '₹4,890',
      rule: 'Spent > ₹25,000 or > 6 completed orders',
      recommendation: 'Target with early-access Diwali festive lookbooks and free express shipping.',
    },
    {
      id: 'seg_new',
      name: 'New Shoppers',
      icon: Zap,
      badge: 'First 30 Days',
      color: 'bg-coral-50 text-coral-600 border-coral-200',
      count: 240,
      totalRevenue: '₹4,32,000',
      aov: '₹1,800',
      rule: 'First purchase made within last 30 days',
      recommendation: 'Trigger WELCOME10 coupon reminder sequence via WhatsApp/SMS.',
    },
    {
      id: 'seg_returning',
      name: 'Loyal Repeat Buyers',
      icon: Users,
      badge: 'High Velocity',
      color: 'bg-emeraldGreen-50 text-emeraldGreen-600 border-emeraldGreen-200',
      count: 412,
      totalRevenue: '₹8,90,000',
      aov: '₹2,650',
      rule: '2 to 5 orders placed with zero return requests',
      recommendation: 'Offer VIP upgrade bonus points on cross-category purchases.',
    },
    {
      id: 'seg_at_risk',
      name: 'At Risk / Churn Risk',
      icon: AlertTriangle,
      badge: 'Re-engagement',
      color: 'bg-warm-50 text-warm-700 border-warm-200',
      count: 156,
      totalRevenue: '₹2,40,000',
      aov: '₹1,500',
      rule: 'No order in 90+ days despite past activity',
      recommendation: 'Launch automated "We Miss You" ₹300 reactivation gift voucher.',
    },
  ]);

  const handleLaunchBlast = (segName) => {
    toast.success(`Automated targeted campaign scheduled for ${segName}!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Segmentation Intelligence"
        subtitle="Dynamic rule-based audience cohorts for targeted SMS/Email marketing and automated LTV maximization"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Customers', path: '/customers' }, { label: 'Segments' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segments.map((seg) => {
          const Icon = seg.icon;
          return (
            <div key={seg.id} className="commerce-card p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border font-bold ${seg.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slateText-main">{seg.name}</h3>
                      <span className="text-[10px] font-bold text-slateText-muted uppercase">{seg.badge}</span>
                    </div>
                  </div>

                  <span className="text-lg font-black text-slateText-main">{seg.count} Shoppers</span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-surface-muted/50 rounded-2xl border border-surface-border my-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slateText-muted uppercase">Segment Value</span>
                    <p className="font-black text-brand-600 text-sm mt-0.5">{seg.totalRevenue}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slateText-muted uppercase">Average Order</span>
                    <p className="font-black text-slateText-main text-sm mt-0.5">{seg.aov}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-slateText-muted"><strong className="text-slateText-main">Rule:</strong> {seg.rule}</p>
                  <p className="text-slateText-muted"><strong className="text-brand-600">AI Tactic:</strong> {seg.recommendation}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/customers?segment=${seg.name.split(' ')[0]}`)}
                >
                  View Shoppers
                </Button>
                <Button
                  size="sm"
                  variant="coral"
                  icon={Send}
                  onClick={() => handleLaunchBlast(seg.name)}
                >
                  Launch Offer Blast
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
