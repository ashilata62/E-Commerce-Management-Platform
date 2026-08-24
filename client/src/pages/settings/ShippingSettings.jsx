import React, { useState } from 'react';
import { Truck, CheckCircle2, Plus, Save, MapPin } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/formatters';

export const ShippingSettings = () => {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const [rules, setRules] = useState({
    freeShippingThreshold: 499,
    standardRate: 50,
    expressRate: 120,
    estimatedDays: '2 - 4 Business Days',
    couriers: [
      { name: 'Delhivery Express', active: true, service: 'Surface & Air Priority' },
      { name: 'BlueDart Aviation', active: true, service: 'Metro Express Air' },
      { name: 'Shiprocket Aggregator', active: true, service: 'Multi-Courier Auto Dispatch' },
      { name: 'DTDC Courier', active: false, service: 'Regional Surface' },
    ]
  });

  const handleToggleCourier = (idx) => {
    const updated = [...rules.couriers];
    updated[idx].active = !updated[idx].active;
    setRules(prev => ({ ...prev, couriers: updated }));
    toast.info(`${updated[idx].name} updated`);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Shipping policies & courier rules updated!');
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Shipping, Delivery & Couriers"
        subtitle="Manage free delivery spend thresholds, flat rate rules, packaging costs, and integrated logistics partners"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }, { label: 'Shipping' }]}
      >
        <Button variant="primary" icon={Save} onClick={handleSave} loading={saving}>
          Save Rules
        </Button>
      </PageHeader>

      {/* Rules Config Card */}
      <div className="commerce-card p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-slateText-main border-b pb-3 flex items-center gap-2">
          <Truck className="w-4 h-4 text-brand-500" />
          <span>National Delivery Rates & Free Thresholds</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">
              Free Shipping Order Min (₹)
            </label>
            <input
              type="number"
              value={rules.freeShippingThreshold}
              onChange={(e) => setRules({ ...rules, freeShippingThreshold: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-bold outline-none"
            />
            <p className="text-[10px] text-slateText-muted mt-1">Orders above this get free shipping</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">
              Standard Shipping Charge (₹)
            </label>
            <input
              type="number"
              value={rules.standardRate}
              onChange={(e) => setRules({ ...rules, standardRate: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">
              Express Priority Rate (₹)
            </label>
            <input
              type="number"
              value={rules.expressRate}
              onChange={(e) => setRules({ ...rules, expressRate: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-bold outline-none"
            />
          </div>
        </div>
      </div>

      {/* Courier Partners */}
      <div className="commerce-card p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slateText-main border-b pb-3">
          Integrated Logistics Couriers
        </h3>

        <div className="divide-y divide-surface-border">
          {rules.couriers.map((c, idx) => (
            <div key={idx} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  c.active ? 'bg-brand-50 text-brand-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slateText-main">{c.name}</h4>
                  <p className="text-xs text-slateText-muted">{c.service}</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={c.active}
                  onChange={() => handleToggleCourier(idx)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emeraldGreen-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
