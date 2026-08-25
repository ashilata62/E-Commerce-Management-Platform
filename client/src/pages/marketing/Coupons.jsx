import React, { useState, useEffect } from 'react';
import { Ticket, Plus, Copy, Check, Trash2, Calendar, Tag, Percent } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const STORAGE_KEY = 'kiaan_coupons_store';

const INITIAL_COUPONS = [
  {
    _id: 'cpn_001',
    code: 'FESTIVE20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 1499,
    maxDiscount: 500,
    usedCount: 342,
    usageLimit: 1000,
    expiryDate: '2026-10-31',
    status: 'Active',
    description: 'Flat 20% discount on all Indian Ethnic wear & Anarkalis.',
  },
  {
    _id: 'cpn_002',
    code: 'WELCOME100',
    discountType: 'flat',
    discountValue: 100,
    minOrderAmount: 499,
    usedCount: 890,
    usageLimit: 2000,
    expiryDate: '2026-12-31',
    status: 'Active',
    description: 'Flat ₹100 cashback for first time shoppers.',
  },
];

export const Coupons = () => {
  const toast = useToast();
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 999,
    maxDiscount: 500,
    usageLimit: 500,
    expiryDate: '2026-12-31',
    description: '',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCoupons(parsed);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    setCoupons(INITIAL_COUPONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COUPONS));
  }, []);

  const saveCoupons = (newList) => {
    setCoupons(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code "${code}" copied!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) {
      toast.warning('Please enter a coupon code');
      return;
    }

    const created = {
      _id: 'cpn_' + Date.now(),
      code: newCoupon.code.trim().toUpperCase(),
      discountType: newCoupon.discountType,
      discountValue: Number(newCoupon.discountValue),
      minOrderAmount: Number(newCoupon.minOrderAmount),
      maxDiscount: Number(newCoupon.maxDiscount),
      usedCount: 0,
      usageLimit: Number(newCoupon.usageLimit),
      expiryDate: newCoupon.expiryDate || '2026-12-31',
      status: 'Active',
      description: newCoupon.description || 'Special promo coupon discount for online store purchases.',
    };

    const updated = [created, ...coupons];
    saveCoupons(updated);
    toast.success(`Coupon "${created.code}" created successfully!`);
    setShowModal(false);
    setNewCoupon({
      code: '',
      discountType: 'percentage',
      discountValue: 20,
      minOrderAmount: 999,
      maxDiscount: 500,
      usageLimit: 500,
      expiryDate: '2026-12-31',
      description: '',
    });
  };

  const handleDelete = (id, code) => {
    const updated = coupons.filter(c => c._id !== id);
    saveCoupons(updated);
    toast.info(`Coupon "${code}" deleted`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Promo Coupons & Discounts"
        subtitle="Create discount codes, cart triggers, and limited time voucher vouchers"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Coupons' }]}
        badge={`${coupons.length} Active Coupons`}
      >
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          Create Coupon
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="commerce-card p-6 flex flex-col justify-between group relative">
            <div>
              <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slateText-main tracking-wide">{coupon.code}</h3>
                    <p className="text-[11px] text-slateText-muted font-medium">
                      Min Order: {formatCurrency(coupon.minOrderAmount)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="p-2 rounded-xl bg-surface-muted hover:bg-brand-50 text-slateText-muted hover:text-brand-600 transition-colors"
                  title="Copy Code"
                >
                  {copiedCode === coupon.code ? <Check className="w-4 h-4 text-emeraldGreen-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slateText-muted font-medium">Discount Offer:</span>
                  <span className="font-extrabold text-brand-600">
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : formatCurrency(coupon.discountValue)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slateText-muted font-medium">Redemptions:</span>
                  <span className="font-bold text-slateText-main">
                    {coupon.usedCount} / {coupon.usageLimit} Used
                  </span>
                </div>

                <p className="text-xs text-slateText-muted pt-2 border-t border-surface-border font-medium">
                  {coupon.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-border text-xs">
              <span className="text-slateText-muted font-medium">Expires: {coupon.expiryDate}</span>
              <button
                type="button"
                onClick={() => handleDelete(coupon._id, coupon.code)}
                className="text-roseDanger-500 hover:text-roseDanger-600 font-bold p-1 hover:bg-roseDanger-50 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Discount Coupon">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Coupon Code *</label>
            <input
              type="text"
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
              placeholder="e.g. SUMMER50, FESTIVE30"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm uppercase font-mono font-bold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Discount Type</label>
              <select
                value={newCoupon.discountType}
                onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Discount Value</label>
              <input
                type="number"
                value={newCoupon.discountValue}
                onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Min Order Value (₹)</label>
              <input
                type="number"
                value={newCoupon.minOrderAmount}
                onChange={(e) => setNewCoupon({ ...newCoupon, minOrderAmount: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Total Usage Limit</label>
              <input
                type="number"
                value={newCoupon.usageLimit}
                onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Description</label>
            <input
              type="text"
              value={newCoupon.description}
              onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
              placeholder="e.g. Applicable on all festive ethnic wear products..."
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Coupon</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
