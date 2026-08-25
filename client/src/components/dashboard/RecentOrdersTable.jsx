import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

export const RecentOrdersTable = ({ orders = [] }) => {
  const navigate = useNavigate();
  const recentList = orders.slice(0, 5);

  return (
    <div className="commerce-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slateText-main tracking-tight">
            Recent Orders
          </h3>
          <p className="text-[11px] sm:text-xs text-slateText-muted font-medium">Real-time incoming orders & dispatch queue</p>
        </div>
        <button
          onClick={() => navigate('/orders')}
          className="text-[11px] sm:text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 1. Mobile Cards View (Visible only on mobile) */}
      <div className="block sm:hidden space-y-2.5">
        {recentList.map((order) => (
          <div
            key={order._id}
            onClick={() => navigate(`/orders/${order._id}`)}
            className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 active:bg-brand-50/40 transition-colors flex flex-col gap-2.5 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-brand-600 text-xs">
                {order.orderNumber}
              </span>
              <StatusBadge status={order.orderStatus} size="sm" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={order.customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={order.customer?.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-surface-border"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slateText-main truncate">{order.customer?.name}</p>
                  <p className="text-[10px] text-slateText-muted truncate">{order.shippingAddress?.city || 'India'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {order.items?.slice(0, 2).map((item, idx) => (
                  <img
                    key={idx}
                    src={item.image}
                    alt={item.name}
                    className="w-7 h-7 rounded-lg object-cover border border-surface-border"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
              <span className="text-[11px] text-slate-500 font-medium">
                {order.paymentMethod?.split(' ')[0] || 'UPI'}
              </span>
              <span className="font-black text-slate-900">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Desktop Table View (Hidden on mobile) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-border text-[11px] font-extrabold text-slateText-muted uppercase tracking-wider">
              <th className="pb-3 pl-2">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 pr-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border/60 text-sm font-medium">
            {recentList.map((order) => (
              <tr
                key={order._id}
                onClick={() => navigate(`/orders/${order._id}`)}
                className="hover:bg-brand-50/30 cursor-pointer transition-colors group"
              >
                {/* Order ID */}
                <td className="py-3.5 pl-2 font-mono font-bold text-brand-600 text-xs">
                  {order.orderNumber}
                </td>

                {/* Customer with Avatar */}
                <td className="py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={order.customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={order.customer?.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-surface-border"
                    />
                    <div className="truncate max-w-[140px]">
                      <p className="text-xs font-bold text-slateText-main truncate">{order.customer?.name}</p>
                      <p className="text-[10px] text-slateText-muted truncate">{order.shippingAddress?.city || 'India'}</p>
                    </div>
                  </div>
                </td>

                {/* Items preview thumbnail */}
                <td className="py-3.5">
                  <div className="flex items-center gap-1.5">
                    {order.items?.slice(0, 2).map((item, idx) => (
                      <img
                        key={idx}
                        src={item.image}
                        alt={item.name}
                        className="w-7 h-7 rounded-lg object-cover border border-surface-border"
                        title={item.name}
                      />
                    ))}
                    {order.items?.length > 2 && (
                      <span className="text-[10px] font-bold text-slateText-muted bg-surface-muted px-1.5 py-0.5 rounded">
                        +{order.items.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Amount & Payment Method */}
                <td className="py-3.5">
                  <p className="text-xs font-black text-slateText-main">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-[10px] text-slateText-muted font-medium">
                    {order.paymentMethod?.split(' ')[0] || 'UPI'}
                  </p>
                </td>

                {/* Status Badge */}
                <td className="py-3.5">
                  <StatusBadge status={order.orderStatus} size="sm" />
                </td>

                {/* Quick Details Action */}
                <td className="py-3.5 pr-2 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/orders/${order._id}`);
                    }}
                    className="p-1.5 rounded-lg text-slateText-muted hover:text-brand-600 hover:bg-brand-50 transition-colors"
                    title="View Order"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
