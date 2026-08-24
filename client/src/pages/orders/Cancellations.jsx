import React, { useState } from 'react';
import { Ban, CheckCircle2, DollarSign, Calendar } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

export const Cancellations = () => {
  const [cancellations] = useState([
    {
      id: 'cn_1',
      orderNumber: 'ORD-82946',
      customerName: 'Rohan Mehra',
      amount: 1518.95,
      reason: 'Customer placed duplicate order by mistake',
      refundStatus: 'Credited to Source Bank (HDFC)',
      refundId: 'RFND-992104',
      cancelledAt: '2026-05-20T15:00:00Z',
    },
    {
      id: 'cn_2',
      orderNumber: 'ORD-81190',
      customerName: 'Deepak Joshi',
      amount: 2499,
      reason: 'Shipping address pin code unserviceable for heavy parcels',
      refundStatus: 'Processed via UPI',
      refundId: 'RFND-991823',
      cancelledAt: '2026-05-16T12:10:00Z',
    },
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Order Cancellations & Refunds"
        subtitle="Audit logs for cancelled buyer sessions, gateway refund trace IDs, and reversal reconciliations"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Orders', path: '/orders' }, { label: 'Cancellations' }]}
        badge={`${cancellations.length} Cancelled`}
      />

      <div className="space-y-4">
        {cancellations.map((item) => (
          <div key={item.id} className="commerce-card p-6 border-roseDanger-200/60 bg-gradient-to-r from-roseDanger-50/20 via-white to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-roseDanger-50 text-roseDanger-500 flex items-center justify-center shrink-0">
                  <Ban className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slateText-main">Order #{item.orderNumber}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-roseDanger-50 text-roseDanger-600">
                      Cancelled
                    </span>
                  </div>
                  <p className="text-xs text-slateText-muted mt-1">Reason: "{item.reason}"</p>
                  <p className="text-xs font-semibold text-slateText-main mt-1">
                    Customer: {item.customerName} • {formatDateTime(item.cancelledAt)}
                  </p>
                </div>
              </div>

              <div className="text-right self-end sm:self-center">
                <p className="text-base font-black text-roseDanger-600">{formatCurrency(item.amount)}</p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emeraldGreen-600 justify-end mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.refundStatus}</span>
                </div>
                <p className="text-[10px] font-mono text-slateText-muted mt-0.5">{item.refundId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
