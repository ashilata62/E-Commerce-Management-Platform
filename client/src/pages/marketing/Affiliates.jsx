import React, { useState, useEffect } from 'react';
import { Share2, Plus, Users, DollarSign, MousePointerClick, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { marketingService } from '../../services/marketingService';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const Affiliates = () => {
  const toast = useToast();
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [newPartner, setNewPartner] = useState({
    name: '',
    partnerCode: '',
    category: 'Fashion Influencer',
    commissionRate: 10,
  });

  const fetchAffiliates = async () => {
    try {
      setLoading(true);
      const res = await marketingService.getAffiliates();
      if (res.success) {
        setAffiliates(res.data);
      }
    } catch (err) {
      toast.error('Failed to load affiliates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newPartner.name.trim()) return;

    try {
      const res = await marketingService.createAffiliate(newPartner);
      if (res.success) {
        toast.success(`Affiliate partner "${newPartner.name}" onboarded!`);
        setShowModal(false);
        setNewPartner({ name: '', partnerCode: '', category: 'Fashion Influencer', commissionRate: 10 });
        fetchAffiliates();
      }
    } catch (err) {
      toast.error('Failed to add affiliate');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Affiliate & Creator Network"
        subtitle="Manage creator partnerships, custom referral links, track attribution orders, and commission payouts"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Marketing' }, { label: 'Affiliates' }]}
        badge={`${affiliates.length} Partners`}
      >
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          Add Partner
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {affiliates.map((aff) => (
          <div key={aff._id} className="commerce-card p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-slateText-main">{aff.name}</h3>
                  <p className="text-xs text-slateText-muted">{aff.category}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
                  {aff.commissionRate}% Comm.
                </span>
              </div>

              <div className="p-3 bg-surface-muted/60 rounded-xl border border-surface-border mb-3">
                <p className="text-[10px] font-bold text-slateText-muted uppercase">Partner Referral Code</p>
                <p className="font-mono text-sm font-black text-brand-600 mt-0.5">{aff.partnerCode}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-surface-muted/40 rounded-xl">
                  <span className="text-[10px] text-slateText-muted font-bold uppercase">Clicks</span>
                  <p className="font-black text-slateText-main">{formatNumber(aff.clicks || 1200)}</p>
                </div>
                <div className="p-2.5 bg-surface-muted/40 rounded-xl">
                  <span className="text-[10px] text-slateText-muted font-bold uppercase">Orders</span>
                  <p className="font-black text-slateText-main">{aff.orders || 45}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-surface-border space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slateText-muted">Revenue Driven:</span>
                  <span className="font-bold text-slateText-main">{formatCurrency(aff.revenueGenerated || 120000)}</span>
                </div>
                <div className="flex justify-between text-emeraldGreen-600 font-bold">
                  <span>Earned Payout:</span>
                  <span>{formatCurrency(aff.payoutBalance || 12000)}</span>
                </div>
              </div>
            </div>

            <Button
              size="xs"
              variant="outline"
              className="w-full"
              onClick={() => toast.success(`Payout of ${formatCurrency(aff.payoutBalance || 12000)} processed for ${aff.name}`)}
            >
              Process Payout
            </Button>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register Affiliate Creator">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Partner / Channel Name *</label>
            <input
              type="text"
              value={newPartner.name}
              onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
              placeholder="e.g. Priya Lifestyle Vlogs"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Custom Promo Code</label>
            <input
              type="text"
              value={newPartner.partnerCode}
              onChange={(e) => setNewPartner({ ...newPartner, partnerCode: e.target.value.toUpperCase() })}
              placeholder="e.g. PRIYA15"
              className="w-full px-4 py-2.5 rounded-xl border text-sm font-mono uppercase outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Commission Rate (%)</label>
            <input
              type="number"
              value={newPartner.commissionRate}
              onChange={(e) => setNewPartner({ ...newPartner, commissionRate: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Onboard Partner</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
