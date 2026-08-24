import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Zap, Send, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const AIAssistant = () => {
  const toast = useToast();
  const [executedActions, setExecutedActions] = useState({});

  const insights = [
    {
      id: 'ai_001',
      type: 'Growth Spike',
      title: 'Sales surged 24.8% this week!',
      description: 'The Mega Summer Sale campaign drove a 42% lift in mobile conversions across Women Ethnic and Footwear.',
      impact: '+₹48,000 Potential',
      actionText: 'Scale Campaign Budget by 20%',
      icon: TrendingUp,
      color: 'bg-emeraldGreen-50 text-emeraldGreen-600 border-emeraldGreen-200',
    },
    {
      id: 'ai_002',
      type: 'Inventory Alert',
      title: '18 products are running low on stock',
      description: 'Classic Chronograph Watch and Italian Leather Tote Bags will stock out in 48 hours at current checkout velocity.',
      impact: 'Stockout Risk',
      actionText: 'Auto-Send Supplier Purchase Orders',
      icon: AlertTriangle,
      color: 'bg-warm-50 text-warm-700 border-warm-200',
    },
    {
      id: 'ai_003',
      type: 'Trend Opportunity',
      title: '"Women\'s Kurta" is trending nationwide',
      description: 'Customer searches up by +32%. Adding 3 pastel color variations could capture ~₹65,000 extra weekend revenue.',
      impact: 'High Demand',
      actionText: 'Apply AI Category Pricing Tweak',
      icon: Lightbulb,
      color: 'bg-brand-50 text-brand-600 border-brand-200',
    },
    {
      id: 'ai_004',
      type: 'Cart Recovery',
      title: '46 High-Value Carts Abandoned today',
      description: 'Triggering an automated 5% SMS discount voucher could recover an estimated ₹42,000 in GMV within 3 hours.',
      impact: 'Immediate Win',
      actionText: 'Send Auto-Recovery Blast',
      icon: Zap,
      color: 'bg-coral-50 text-coral-600 border-coral-200',
    },
  ];

  const handleExecute = (id, actionText) => {
    setExecutedActions(prev => ({ ...prev, [id]: true }));
    toast.success(`Action executed: "${actionText}"!`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="AI Commerce Copilot & Assistant"
        subtitle="Automated machine learning intelligence, stockout predictions, and real-time revenue optimization triggers"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Analytics' }, { label: 'AI Assistant' }]}
        badge="Autonomous Engine"
      />

      {/* Hero Card */}
      <div className="commerce-card p-6 sm:p-8 ai-card-gradient text-white shadow-soft-lg relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-warm-300" />
            <span>Real-Time Business Optimization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Smart Recommendations Ready for Action
          </h2>
          <p className="text-xs sm:text-sm text-white/90 font-medium max-w-lg leading-relaxed">
            Our predictive models scanned over 12,000 recent browsing sessions, checkout steps, and supplier lead times to generate the actions below.
          </p>
        </div>
      </div>

      {/* Insights Cards List */}
      <div className="space-y-4">
        {insights.map((item) => {
          const Icon = item.icon;
          const isDone = executedActions[item.id];

          return (
            <div
              key={item.id}
              className="commerce-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all hover:border-brand-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span className="text-xs font-black text-emeraldGreen-600">{item.impact}</span>
                  </div>
                  <h3 className="text-base font-bold text-slateText-main mt-1">{item.title}</h3>
                  <p className="text-xs text-slateText-muted mt-1 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="self-end sm:self-center shrink-0">
                {isDone ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emeraldGreen-600 bg-emeraldGreen-50 px-4 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Executed</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleExecute(item.id, item.actionText)}
                  >
                    {item.actionText}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
