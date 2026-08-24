import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Calendar, TrendingUp, DollarSign, Tag, ArrowUpRight, Zap } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { marketingService } from '../../services/marketingService';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const Campaigns = () => {
  const toast = useToast();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    runTime: 'Next 7 Days',
    productsCount: 150,
    banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  });

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await marketingService.getCampaigns();
      if (res.success) {
        setCampaigns(res.data);
      }
    } catch (err) {
      toast.error('Failed to load marketing campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCampaign.name.trim()) return;

    try {
      setSubmitting(true);
      const res = await marketingService.createCampaign(newCampaign);
      if (res.success) {
        toast.success(`Campaign "${newCampaign.name}" launched!`);
        setShowModal(false);
        setNewCampaign({ name: '', description: '', runTime: 'Next 7 Days', productsCount: 150, banner: '' });
        fetchCampaigns();
      }
    } catch (err) {
      toast.error('Failed to launch campaign');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Promotional Campaigns"
        subtitle="Manage seasonal sales, flash event blitzes, conversion banners, and ROAS performance"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Marketing' }, { label: 'Campaigns' }]}
        badge={`${campaigns.length} Campaigns`}
      >
        <Button variant="coral" icon={Plus} onClick={() => setShowModal(true)}>
          New Campaign
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((cmp) => (
          <div key={cmp._id} className="commerce-card overflow-hidden group flex flex-col justify-between">
            <div>
              {/* Campaign Banner Header */}
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
                <img
                  src={cmp.banner || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'}
                  alt={cmp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    cmp.status === 'Active'
                      ? 'bg-emeraldGreen-500 text-white shadow-soft-sm'
                      : cmp.status === 'Scheduled'
                      ? 'bg-warm-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}>
                    {cmp.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-black text-white">{cmp.name}</h3>
                  <p className="text-xs text-white/80 line-clamp-1">{cmp.description}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 p-3 bg-surface-muted/50 rounded-xl border border-surface-border text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slateText-muted uppercase">Revenue</span>
                    <p className="font-black text-brand-600 text-sm mt-0.5">{formatCurrency(cmp.revenue)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slateText-muted uppercase">Orders Driven</span>
                    <p className="font-black text-slateText-main text-sm mt-0.5">{formatNumber(cmp.orders)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slateText-muted uppercase">ROAS</span>
                    <p className="font-black text-emeraldGreen-600 text-sm mt-0.5">{cmp.roas > 0 ? `${cmp.roas}x` : 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slateText-muted uppercase">Products</span>
                    <p className="font-black text-slateText-main text-sm mt-0.5">{cmp.productsCount} SKUs</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slateText-muted font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Run Schedule: <strong className="text-slateText-main">{cmp.runTime}</strong></span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-muted/40 border-t border-surface-border flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => toast.info(`Viewing deep ROAS breakdown for ${cmp.name}`)}
              >
                <span>Analytics Breakdown</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* New Campaign Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Marketing Campaign">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Campaign Title *</label>
            <input
              type="text"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              placeholder="e.g. Festive Diwali Grand Utsav"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Promo Tagline / Offer</label>
            <input
              type="text"
              value={newCampaign.description}
              onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
              placeholder="e.g. Flat 50% Off + Extra 10% on UPI"
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Run Window</label>
            <input
              type="text"
              value={newCampaign.runTime}
              onChange={(e) => setNewCampaign({ ...newCampaign, runTime: e.target.value })}
              placeholder="e.g. 01 Jun - 10 Jun"
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="coral" type="submit" loading={submitting}>Launch Campaign</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
