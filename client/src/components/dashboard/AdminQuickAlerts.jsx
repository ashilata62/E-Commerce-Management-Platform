import React from 'react';
import {
  Package,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Plus,
  Printer,
  Ticket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export const AdminQuickAlerts = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const alerts = [
    {
      id: 'dispatch',
      icon: Package,
      count: '18 Orders',
      label: 'Ready for BlueDart dispatch',
      path: '/orders',
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    },
    {
      id: 'stock',
      icon: AlertTriangle,
      count: '3 Outfits',
      label: 'Running low on inventory (Sizes M & L)',
      path: '/products',
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    },
    {
      id: 'returns',
      icon: RotateCcw,
      count: '2 RMAs',
      label: 'Pending size exchange requests',
      path: '/returns',
      color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    },
  ];

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#6C4DF6] via-[#7B5CF8] to-[#9171F9] text-white shadow-purple-glow flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
      {/* Greeting & Revenue Target */}
      <div className="space-y-1.5 sm:space-y-2 max-w-xl">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
            Merchant Executive OS
          </span>
          <span className="text-[11px] sm:text-xs text-white/80 font-semibold">• Live Store Control</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
          Welcome back, Kiaan! 👋
        </h2>

        <p className="text-xs text-white/90 font-medium leading-relaxed">
          Your clothing store is up <strong className="text-amber-300 font-bold">+24.8% in gross revenue</strong> this week with <strong className="text-white font-bold">128 active orders</strong>. Here are today's top action items:
        </p>
      </div>

      {/* 3 Actionable Alert Badges */}
      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-2.5 shrink-0">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <button
              key={alert.id}
              onClick={() => navigate(alert.path)}
              className="flex items-center justify-between gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white transition-all text-left group cursor-pointer w-full"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black block leading-none">{alert.count}</span>
                  <span className="text-[10px] text-white/80 font-medium leading-tight truncate block">{alert.label}</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminQuickAlerts;
