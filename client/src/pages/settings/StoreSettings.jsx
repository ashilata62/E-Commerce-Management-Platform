import React, { useState, useEffect } from 'react';
import { Store, Save, UploadCloud, Globe, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { settingsService } from '../../services/settingsService';
import { useToast } from '../../context/ToastContext';

export const StoreSettings = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "Kiaan Luxe Emporium",
    storeTagline: "India's Premier Fashion & Lifestyle Destination",
    supportEmail: "support@kiaantechnology.com",
    supportPhone: "+91 80000 12345",
    address: "Tower 4, Embassy Tech Village, Outer Ring Road, Bengaluru 560103",
    currency: "INR (₹)",
    gstin: "29AAAAA0000A1Z5",
    storeStatus: "Online",
    socials: {
      instagram: "https://instagram.com/kiaantech",
      facebook: "https://facebook.com/kiaantech",
      twitter: "https://x.com/kiaantech",
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await settingsService.getSettings();
        if (res.success && res.data) {
          setFormData(res.data);
        }
      } catch (err) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await settingsService.updateSettings(formData);
      if (res.success) {
        toast.success('Store settings saved successfully!');
      }
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="h-96 rounded-3xl bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Store Profile & Settings"
        subtitle="Manage brand identity, contact channels, tax registration numbers, and public storefront details"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }, { label: 'Store Settings' }]}
      >
        <Button variant="primary" icon={Save} onClick={handleSave} loading={saving}>
          Save Settings
        </Button>
      </PageHeader>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Identity Card */}
        <div className="commerce-card p-6 sm:p-8 space-y-5">
          <h3 className="text-base font-bold text-slateText-main border-b pb-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-brand-500" />
            <span>Brand Identity & Legal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">Store Public Name *</label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-semibold outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">Brand Tagline</label>
              <input
                type="text"
                name="storeTagline"
                value={formData.storeTagline}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">GSTIN Registration No.</label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border font-mono text-sm uppercase outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">Storefront Operating Status</label>
              <select
                name="storeStatus"
                value={formData.storeStatus}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-semibold outline-none"
              >
                <option value="Online">● Online & Accepting Orders</option>
                <option value="Maintenance">Maintenance Mode</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="commerce-card p-6 sm:p-8 space-y-5">
          <h3 className="text-base font-bold text-slateText-main border-b pb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-coral-500" />
            <span>Support & Official Contact Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">Customer Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">Support Phone Hotline</label>
              <input
                type="text"
                name="supportPhone"
                value={formData.supportPhone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slateText-main mb-1.5">Registered Office Address</label>
              <textarea
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
