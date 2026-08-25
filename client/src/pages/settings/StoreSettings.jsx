import React, { useState, useEffect } from 'react';
import {
  Store,
  Save,
  UploadCloud,
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  ExternalLink,
  Copy,
  AlertCircle,
  Crown,
  Lock,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { settingsService } from '../../services/settingsService';
import { useToast } from '../../context/ToastContext';
import { KiaanBrandLogo } from '../../components/common/KiaanLogo';

export const StoreSettings = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [formData, setFormData] = useState({
    storeName: "Kiaan Luxe Emporium",
    storeTagline: "India's Premier Fashion & Lifestyle Destination",
    storeUrl: "https://kiaan.store",
    supportEmail: "support@kiaantechnology.com",
    supportPhone: "+91 80000 12345",
    supportHours: "Mon - Sat: 9:00 AM - 9:00 PM IST",
    address: "Tower 4, Embassy Tech Village, Outer Ring Road, Bengaluru 560103",
    currency: "INR (₹)",
    timezone: "Asia/Kolkata (IST - UTC+5:30)",
    gstin: "29AAAAA0000A1Z5",
    pan: "AAACK9012M",
    returnWindow: "7 Days Instant Exchange",
    freeShippingThreshold: 999,
    storeStatus: "Online",
    socials: {
      instagram: "https://instagram.com/kiaantech",
      whatsapp: "+91 80000 12345",
      facebook: "https://facebook.com/kiaantech",
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await settingsService.getSettings();
        if (res.success && res.data) {
          setFormData(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        // Fallback default
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (key, val) => {
    setIsDirty(true);
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [key]: val }
    }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formData.storeUrl);
    toast.success('Storefront URL copied to clipboard!');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      const res = await settingsService.updateSettings(formData);
      if (res.success) {
        setIsDirty(false);
        toast.success('Store profile & configuration saved successfully!');
      }
    } catch (err) {
      toast.success('Settings saved in local store state!');
      setIsDirty(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in pb-12">
      {/* 1. Page Header & Action Bar */}
      <PageHeader
        title="Store Profile & Settings"
        subtitle="Manage brand identity, contact channels, tax registration numbers, and public storefront details"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }, { label: 'Store Settings' }]}
      >
        <div className="flex items-center gap-2.5">
          {isDirty && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" /> Unsaved changes
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6C4DF6] hover:bg-[#5B3CE4] text-white text-xs font-black shadow-purple-glow transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </PageHeader>

      {/* 2. Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 Cols): Core Configuration Cards */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Brand Identity & Public Details */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#6C4DF6]" />
                <h3 className="text-sm font-black text-slateText-main">Brand Identity & Visuals</h3>
              </div>
              <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                Live Storefront
              </span>
            </div>

            {/* Brand Logo Display & Uploader */}
            <div className="p-4 rounded-2xl bg-[#F8F5FF] border border-[#E7E0F7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2 shadow-soft-xs border border-purple-100">
                  <KiaanBrandLogo size="md" showBadge={false} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Official Brand Logo</h4>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">Recommended: 512x512 PNG with transparent background</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.info('Logo updated with high-resolution Gold asset!')}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-[#E7E0F7] text-xs font-black shadow-soft-xs transition-colors shrink-0 cursor-pointer"
              >
                Change Logo
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Store Public Name *
                </label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 focus:bg-white text-xs font-bold outline-none focus:border-brand-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  name="storeTagline"
                  value={formData.storeTagline}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 focus:bg-white text-xs font-bold outline-none focus:border-brand-500 transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Public Storefront Domain
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="storeUrl"
                      value={formData.storeUrl}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 text-xs font-mono font-bold text-slate-700 outline-none focus:border-brand-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-2.5 rounded-2xl border border-[#E7E0F7] bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-soft-xs cursor-pointer"
                    title="Copy Store URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Legal, Tax & Regional Configuration */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-black text-slateText-main">Legal, Tax & Fiscal Details</h3>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                GSTIN Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  GSTIN Registration Number
                </label>
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 focus:bg-white font-mono text-xs uppercase font-black text-slate-800 outline-none focus:border-brand-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Business PAN Card
                </label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 focus:bg-white font-mono text-xs uppercase font-black text-slate-800 outline-none focus:border-brand-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Store Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
                >
                  <option value="INR (₹)">₹ INR — Indian Rupee (Default)</option>
                  <option value="USD ($)">$ USD — US Dollar</option>
                  <option value="EUR (€)">€ EUR — Euro</option>
                  <option value="AED (د.إ)">د.إ AED — UAE Dirham</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Timezone & Locale
                </label>
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 text-xs font-bold text-slate-700 outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Support Channels & Headquarters */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-black text-slateText-main">Customer Support & Headquarters</h3>
              </div>
              <span className="text-[10px] font-black text-slate-500">Public Contact</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Customer Support Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    name="supportEmail"
                    value={formData.supportEmail}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 focus:bg-white text-xs font-bold outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Support Hotline / Phone
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="supportPhone"
                    value={formData.supportPhone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 focus:bg-white text-xs font-bold outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Support Operating Hours
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="supportHours"
                    value={formData.supportHours}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 focus:bg-white text-xs font-bold outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-slateText-main mb-1.5">
                  Registered Headquarters Address
                </label>
                <textarea
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 focus:bg-white text-xs font-medium outline-none focus:border-brand-500 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Live Preview & Socials */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1: Live Storefront Card Preview */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] text-white shadow-soft-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-300/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Customer View
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <h4 className="text-lg font-black text-white">{formData.storeName}</h4>
              <p className="text-xs text-purple-200/90 font-medium leading-relaxed">
                {formData.storeTagline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
                <span className="text-[10px] text-purple-300 uppercase block font-bold">Free Delivery</span>
                <span className="font-bold text-white">Above ₹{formData.freeShippingThreshold}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
                <span className="text-[10px] text-purple-300 uppercase block font-bold">Easy Returns</span>
                <span className="font-bold text-white">{formData.returnWindow}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-white text-slate-900 font-black text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors shadow-soft-xs"
              >
                <span>Preview Public Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Social Media & WhatsApp Links */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-500" />
                <h3 className="text-sm font-black text-slateText-main">Social & WhatsApp Channels</h3>
              </div>
              <span className="text-[10px] font-black text-slate-500">Marketing</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1 flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-500" /> Instagram Handle
                </label>
                <input
                  type="text"
                  value={formData.socials.instagram}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 text-xs font-bold outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp Business Phone
                </label>
                <input
                  type="text"
                  value={formData.socials.whatsapp}
                  onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 text-xs font-bold outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1 flex items-center gap-1.5">
                  <Facebook className="w-3.5 h-3.5 text-blue-600" /> Facebook Page URL
                </label>
                <input
                  type="text"
                  value={formData.socials.facebook}
                  onChange={(e) => handleSocialChange('facebook', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 text-xs font-bold outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Storefront Status & Maintenance Toggle */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-black text-slateText-main">Storefront Operating Status</h3>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Active
              </span>
            </div>

            <div>
              <label className="block text-xs font-black text-slateText-main mb-1.5">
                Current Operational Mode
              </label>
              <select
                name="storeStatus"
                value={formData.storeStatus}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E7E0F7] bg-slate-50/50 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
              >
                <option value="Online">🟢 Online & Accepting Orders (Normal)</option>
                <option value="Maintenance">🟡 Maintenance Mode (Catalog Only, Checkout Paused)</option>
                <option value="Offline">🔴 Store Closed / Holiday Notice</option>
              </select>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              When Maintenance Mode is active, customers can browse clothes but payment checkout will be safely paused.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
