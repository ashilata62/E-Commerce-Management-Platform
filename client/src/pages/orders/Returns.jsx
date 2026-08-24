import React, { useState } from 'react';
import { RotateCcw, CheckCircle2, XCircle, Clock, Package } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const Returns = () => {
  const toast = useToast();
  const [returns, setReturns] = useState([
    {
      id: 'ret_001',
      returnNumber: 'RMA-9012',
      orderNumber: 'ORD-81204',
      customerName: 'Kavita Iyer',
      item: 'Embroidered Anarkali Kurta Set (Size M)',
      reason: 'Size too loose, requested exchange to Size S',
      amount: 2499,
      status: 'In Transit',
      courier: 'Delhivery Reverse Pickup',
      requestedAt: '2026-05-22T14:30:00Z',
    },
    {
      id: 'ret_002',
      returnNumber: 'RMA-9013',
      orderNumber: 'ORD-80992',
      customerName: 'Sameer Sen',
      item: 'Zenith Velocity Sneakers (UK 9)',
      reason: 'Slight discoloration on heel cup',
      amount: 2499,
      status: 'Approved',
      courier: 'BlueDart Reverse',
      requestedAt: '2026-05-23T11:20:00Z',
    },
  ]);

  const handleApprove = (id) => {
    setReturns(prev => prev.map(r => r.id === id ? { ...r, status: 'Completed' } : r));
    toast.success('RMA Return approved and replacement dispatched');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Returns & RMA Management"
        subtitle="Reverse logistics tracking, customer replacement processing, and refund approvals"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Orders', path: '/orders' }, { label: 'Returns' }]}
        badge={`${returns.length} Open RMAs`}
      />

      <div className="space-y-4">
        {returns.map((rma) => (
          <div key={rma.id} className="commerce-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-coral-50 text-coral-500 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slateText-main">{rma.returnNumber}</h3>
                  <span className="text-xs font-mono text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    Order #{rma.orderNumber}
                  </span>
                </div>
                <p className="text-xs font-bold text-slateText-main mt-1">{rma.item}</p>
                <p className="text-xs text-slateText-muted mt-0.5">Reason: "{rma.reason}"</p>
                <div className="flex items-center gap-3 text-[11px] text-slateText-muted mt-2">
                  <span>Customer: <strong className="text-slateText-main">{rma.customerName}</strong></span>
                  <span>• Amount: <strong className="text-slateText-main">{formatCurrency(rma.amount)}</strong></span>
                  <span>• Courier: <strong className="text-slateText-main">{rma.courier}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-warm-50 text-warm-700">
                {rma.status}
              </span>
              {rma.status !== 'Completed' && (
                <Button size="sm" variant="success" onClick={() => handleApprove(rma.id)}>
                  Complete RMA
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
