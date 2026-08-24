import React, { useState, useEffect } from 'react';
import { Ticket, Plus, Copy, Check, Trash2, Calendar, Tag, Percent } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { marketingService } from '../../services/marketingService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const Coupons = () => {
  const toast = useToast();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await marketingService.getCoupons();
      if (res.success) {
        setCoupons(res.data);
      }
    } catch (err) {
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    try {
      const res = await marketingService.createCoupon(newCoupon);
      if (res.success) {
        toast.success(`Coupon ${newCoupon.code.toUpperCase()} created!`);
        setShowModal(false);
        setNewCoupon({ code: '', discountType: 'percentage', discountValue: 20, minOrderAmount: 999, maxDiscount: 500, usageLimit: 500, expiryDate: '2026-12-31', description: '' });
        fetchCoupons();
      }
    } catch (err) {
      toast.error('Failed to create coupon');
    }
  };

  const handleDelete = async (id) => {
    try {
      await marketingService.deleteCoupon(id);
      toast.success('Coupon removed');
      fetchCoupons();
    } catch (err) {
      toast.error('Error deleting coupon');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Discounts & Voucher Codes"
        subtitle="Manage cart promotions, affiliate promo codes, and minimum spend checkout vouchers"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Marketing' }, { label: 'Coupons' }]}
        badge={`${coupons.length} Active Vouchers`}
      >
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          Create Coupon
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((cpn) => (
          <div
            key={cpn._id}
            className="commerce-card p-6 relative overflow-hidden bg-white border-2 border-dashed border-brand-200 flex flex-col justify-between"
          >
            <div>
              {/* Top Voucher Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black uppercase text-brand-600">
                    {cpn.discountType === 'percentage' ? `${cpn.discountValue}% OFF` : `₹${cpn.discountValue} OFF`}
                  </span>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emeraldGreen-50 text-emeraldGreen-600">
                  {cpn.status}
                </span>
              </div>

              {/* Code Banner with Copy Trigger */}
              <div className="p-3 bg-surface-muted/70 rounded-xl border border-surface-border flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-base font-black tracking-widest text-slateText-main">
                  {cpn.code}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(cpn.code)}
                  className="p-1.5 rounded-lg bg-white hover:bg-brand-50 text-slateText-muted hover:text-brand-600 border border-surface-border transition-colors shadow-soft-sm"
                  title="Copy Code"
                >
                  {copiedCode === cpn.code ? <Check className="w-4 h-4 text-emeraldGreen-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs text-slateText-muted leading-relaxed font-medium">
                {cpn.description || `Get ${cpn.discountValue}% off on minimum order of ₹${cpn.minOrderAmount}`}
              </p>

              {/* Rules Breakdown */}
              <div className="mt-4 pt-3 border-t border-surface-border/70 space-y-1.5 text-xs text-slateText-muted">
                <div className="flex justify-between">
                  <span>Min. Order Value:</span>
                  <span className="font-bold text-slateText-main">{formatCurrency(cpn.minOrderAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Usage Count:</span>
                  <span className="font-bold text-slateText-main">{cpn.usedCount} / {cpn.usageLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expires On:</span>
                  <span className="font-bold text-slateText-main">{formatDate(cpn.expiryDate)}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-surface-border flex items-center justify-between">
              <Button size="xs" variant="ghost" className="text-roseDanger-500 hover:bg-roseDanger-50" icon={Trash2} onClick={() => handleDelete(cpn._id)}>
                Delete
              </Button>
              <Button size="xs" variant="primary" onClick={() => handleCopy(cpn.code)}>
                Copy Code
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Discount Coupon">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Coupon Code *</label>
            <input
              type="text"
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
              placeholder="e.g. FESTIVE50"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm font-mono uppercase font-bold outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Discount Type</label>
              <select
                value={newCoupon.discountType}
                onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
                <option value="shipping">Free Shipping</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Discount Value</label>
              <input
                type="number"
                value={newCoupon.discountValue}
                onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm font-bold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Min. Order Value (₹)</label>
              <input
                type="number"
                value={newCoupon.minOrderAmount}
                onChange={(e) => setNewCoupon({ ...newCoupon, minOrderAmount: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Expiry Date</label>
              <input
                type="date"
                value={newCoupon.expiryDate}
                onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Voucher</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
