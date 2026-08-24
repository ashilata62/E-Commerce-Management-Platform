import React from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FulfillmentPipelineCard = () => {
  const navigate = useNavigate();

  const stages = [
    {
      title: 'Unfulfilled / To Pack',
      count: 18,
      desc: 'Print invoice & generate label',
      icon: Clock,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeColor: 'bg-amber-500 text-white',
      action: 'Pack 18 Orders',
    },
    {
      title: 'Ready for Courier Pickup',
      count: 34,
      desc: 'Assigned to BlueDart & Delhivery',
      icon: Package,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      badgeColor: 'bg-blue-500 text-white',
      action: 'Print Manifest',
    },
    {
      title: 'In Transit / On Route',
      count: 42,
      desc: 'Delivering across Indian metros',
      icon: Truck,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      badgeColor: 'bg-purple-500 text-white',
      action: 'Track Fleet',
    },
    {
      title: 'Delivered Successfully',
      count: 34,
      desc: 'Completed today with OTP verified',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeColor: 'bg-emerald-500 text-white',
      action: 'View Proofs',
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black text-slateText-main">Fulfillment & Courier Pipeline</h3>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
              Live Logistics
            </span>
          </div>
          <p className="text-xs text-slateText-muted mt-0.5 font-medium">
            Active dispatch status with BlueDart & Delhivery Express
          </p>
        </div>

        <button
          onClick={() => navigate('/orders')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
        >
          <span>All Orders</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${stage.color} flex flex-col justify-between space-y-3 transition-transform hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-soft-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slateText-main">{stage.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{stage.desc}</p>
                  </div>
                </div>

                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full shadow-soft-xs ${stage.badgeColor}`}>
                  {stage.count}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-black/5">
                <span className="text-[10px] font-bold opacity-75">Next Action:</span>
                <span
                  onClick={() => navigate('/orders')}
                  className="text-[11px] font-black underline cursor-pointer hover:opacity-90"
                >
                  {stage.action} →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FulfillmentPipelineCard;
