import React, { useState } from 'react';
import { CreditCard, Zap, CheckCircle2, Shield, Lock, DollarSign, Save } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const PaymentSettings = () => {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const [gateways, setGateways] = useState({
    razorpay: { enabled: true, keyId: 'rzp_live_89021481923', testMode: false },
    stripe: { enabled: true, keyId: 'pk_live_51M08291401823', testMode: false },
    upi: { enabled: true, vpa: 'kiaanluxe@okhdfcbank' },
    cod: { enabled: true, extraFee: 0, minOrder: 0, maxOrder: 10000 },
  });

  const handleToggle = (gw) => {
    setGateways(prev => ({
      ...prev,
      [gw]: { ...prev[gw], enabled: !prev[gw].enabled }
    }));
    toast.info(`${gw.toUpperCase()} status toggled`);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Payment gateway configuration saved!');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Payment Gateways & Methods"
        subtitle="Manage instant UPI checkouts, credit/debit card processing, Razorpay/Stripe keys, and Cash on Delivery rules"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }, { label: 'Payment' }]}
      >
        <Button variant="primary" icon={Save} onClick={handleSave} loading={saving}>
          Save Gateways
        </Button>
      </PageHeader>

      <div className="space-y-5">
        {/* UPI AutoPay Card */}
        <div className="commerce-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-brand-200 bg-brand-50/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-black shadow-purple-glow shrink-0">
              UPI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slateText-main">Direct UPI QR & Apps</h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emeraldGreen-50 text-emeraldGreen-600">
                  Zero MDR Fee
                </span>
              </div>
              <p className="text-xs text-slateText-muted mt-0.5">Instant checkout via Google Pay, PhonePe, Paytm, and BHIM</p>
              <p className="text-xs font-mono font-bold text-brand-700 mt-2">VPA: {gateways.upi.vpa}</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={gateways.upi.enabled}
              onChange={() => handleToggle('upi')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
          </label>
        </div>

        {/* Razorpay Card */}
        <div className="commerce-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slateText-main">Razorpay Payment Suite</h3>
              <p className="text-xs text-slateText-muted mt-0.5">Supports Credit Cards, Debit Cards, NetBanking, and EMI</p>
              <p className="text-xs font-mono text-slateText-muted mt-2">Key ID: {gateways.razorpay.keyId}</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={gateways.razorpay.enabled}
              onChange={() => handleToggle('razorpay')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
          </label>
        </div>

        {/* Cash on Delivery (COD) */}
        <div className="commerce-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-warm-50 text-warm-600 flex items-center justify-center font-black shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slateText-main">Cash on Delivery (COD)</h3>
              <p className="text-xs text-slateText-muted mt-0.5">Allow shoppers to pay at doorstep via cash or delivery UPI QR</p>
              <p className="text-xs font-medium text-slateText-main mt-2">Max order threshold: ₹10,000</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={gateways.cod.enabled}
              onChange={() => handleToggle('cod')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
