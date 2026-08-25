import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, Plus, Calendar, TrendingUp, DollarSign, Tag, ArrowUpRight, Zap, UploadCloud, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const STORAGE_KEY = 'kiaan_campaigns_store';
const DEFAULT_CAMPAIGN_BANNER = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80';

const INITIAL_CAMPAIGNS = [
  {
    _id: 'cmp_001',
    name: 'Mega Summer Sale 🛍️',
    description: 'Up to 60% Off on Fashion & Lifestyle',
    runTime: '12 May - 25 May',
    revenue: 124890,
    orders: 312,
    roas: 4.8,
    productsCount: 842,
    status: 'Active',
    banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'cmp_002',
    name: 'Ethnic Grand Utsav',
    description: 'Exclusive Bridal & Festive Handcrafted Wear',
    runTime: '01 Jun - 10 Jun',
    revenue: 0,
    orders: 0,
    roas: 0,
    productsCount: 420,
    status: 'Scheduled',
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
];

const PRESET_BANNERS = [
  { label: '🛍️ Summer Sale', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80' },
  { label: '🥻 Festive Utsav', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
  { label: '👟 Shoes Blitz', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80' },
  { label: '👜 Accessories Drop', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80' },
];

export const Campaigns = () => {
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [campaigns, setCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    runTime: 'Next 7 Days',
    productsCount: 150,
    banner: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCampaigns(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('LocalStorage read error:', e);
    }
    setCampaigns(INITIAL_CAMPAIGNS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CAMPAIGNS));
  }, []);

  const saveCampaigns = (updatedList) => {
    setCampaigns(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  };


  // Compress image to fit localStorage limits
  const compressImage = (dataUrl, maxWidth = 400, quality = 0.6) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };


  // Image Upload File Handler (with compression for localStorage)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const compressed = await compressImage(event.target.result, 400, 0.6);
      setNewCampaign(prev => ({ ...prev, banner: compressed }));
      toast.success('Campaign banner uploaded successfully!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCampaign.name.trim()) {
      toast.warning('Please enter a campaign title');
      return;
    }

    try {
      setSubmitting(true);
      const created = {
        _id: 'cmp_' + Date.now(),
        name: newCampaign.name.trim(),
        description: newCampaign.description.trim() || 'Exclusive seasonal storefront promotion & discounts.',
        runTime: newCampaign.runTime.trim() || 'Next 7 Days',
        revenue: 0,
        orders: 0,
        roas: 0,
        productsCount: Number(newCampaign.productsCount) || 150,
        status: 'Active',
        banner: newCampaign.banner.trim() || DEFAULT_CAMPAIGN_BANNER,
      };

      const updated = [created, ...campaigns];
      saveCampaigns(updated);

      toast.success(`Campaign "${created.name}" launched successfully!`);
      setShowModal(false);
      setNewCampaign({ name: '', description: '', runTime: 'Next 7 Days', productsCount: 150, banner: '' });
    } catch (err) {
      toast.error('Failed to launch campaign');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id, name) => {
    const updated = campaigns.filter(c => c._id !== id);
    saveCampaigns(updated);
    toast.info(`Campaign "${name}" removed`);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <PageHeader
        title="Promotional Campaigns"
        subtitle="Manage seasonal sales, flash event blitzes, conversion banners, and ROAS performance"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Marketing' }, { label: 'Campaigns' }]}
        badge={`${campaigns.length} Active Campaigns`}
      >
        <Button variant="coral" icon={Plus} onClick={() => setShowModal(true)}>
          New Campaign
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((cmp) => (
          <div key={cmp._id} className="commerce-card overflow-hidden group flex flex-col justify-between relative shadow-soft-sm hover:shadow-soft-md transition-all">
            <div>
              {/* Campaign Banner Header */}
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
                <img
                  src={cmp.banner || DEFAULT_CAMPAIGN_BANNER}
                  alt={cmp.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_CAMPAIGN_BANNER;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    cmp.status === 'Active'
                      ? 'bg-emeraldGreen-500 text-white shadow-soft-sm'
                      : cmp.status === 'Scheduled'
                      ? 'bg-warm-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}>
                    {cmp.status}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => handleDelete(cmp._id, cmp.name)}
                    className="p-1.5 rounded-lg bg-roseDanger-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none font-semibold focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Promo Tagline / Offer</label>
            <input
              type="text"
              value={newCampaign.description}
              onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
              placeholder="e.g. Flat 50% Off + Extra 10% on UPI"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Campaign Banner Photo</label>
            
            {/* Upload Click Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mb-2 p-3.5 border border-dashed border-brand-300 hover:border-brand-500 bg-brand-50/40 hover:bg-brand-50 rounded-xl text-center cursor-pointer flex items-center justify-center gap-2 group transition-all"
            >
              <UploadCloud className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-brand-600">Click to upload banner photo from computer</span>
            </div>

            

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESET_BANNERS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setNewCampaign({ ...newCampaign, banner: preset.url })}
                  className="px-2.5 py-1 rounded-lg bg-surface-muted hover:bg-brand-50 text-[11px] font-bold text-slateText-main hover:text-brand-600 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Live Preview Box */}
            {newCampaign.banner && (
              <div className="mt-3 relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-surface-border shadow-soft-sm">
                <img src={newCampaign.banner} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setNewCampaign({ ...newCampaign, banner: '' })}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-roseDanger-500 text-white hover:bg-roseDanger-600"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Run Window</label>
            <input
              type="text"
              value={newCampaign.runTime}
              onChange={(e) => setNewCampaign({ ...newCampaign, runTime: e.target.value })}
              placeholder="e.g. 01 Jun - 10 Jun"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="coral" type="submit" loading={submitting}>Launch Campaign</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
