import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  Info,
  DollarSign,
  Layers,
  Truck,
  Eye,
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export const AddProduct = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'media' | 'pricing' | 'variants' | 'shipping'
  const [submitting, setSubmitting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Women',
    brand: 'Aura Studio',
    description: '',
    badge: 'New Arrival',
    status: 'Published',
    price: 1899,
    compareAtPrice: 2999,
    costPrice: 650,
    taxPercent: 5,
    sku: `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
    stock: 50,
    lowStockThreshold: 10,
    weight: '0.45 kg',
    dimensions: '30x20x5 cm',
    deliveryDays: '2-4 Days',
    flashSale: false,
    tags: 'ethnic, festive, trending',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      { size: 'S', color: 'Midnight Ruby', stock: 15, sku: 'VAR-S' },
      { size: 'M', color: 'Midnight Ruby', stock: 20, sku: 'VAR-M' },
      { size: 'L', color: 'Midnight Ruby', stock: 15, sku: 'VAR-L' },
    ],
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddImage = () => {
    if (!imageUrlInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()],
    }));
    setImageUrlInput('');
    toast.success('Image added to gallery!');
  };

  const handleRemoveImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleAddVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        { size: 'XL', color: 'Classic Noir', stock: 10, sku: `VAR-${Date.now().toString().slice(-4)}` }
      ]
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...formData.variants];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  const handleRemoveVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (statusOverride = null) => {
    if (!formData.name.trim()) {
      toast.warning('Please enter a product title.');
      setActiveTab('basic');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        status: statusOverride || formData.status,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags,
        price: Number(formData.price),
        compareAtPrice: Number(formData.compareAtPrice),
        costPrice: Number(formData.costPrice),
        stock: Number(formData.stock),
      };

      const res = await productService.createProduct(payload);
      if (res.success) {
        toast.success(`Product "${payload.name}" published to catalog!`);
        navigate('/products');
      }
    } catch (error) {
      toast.error('Failed to create product: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Info },
    { id: 'media', label: 'Media & Gallery', icon: ImageIcon },
    { id: 'pricing', label: 'Pricing & Cost', icon: DollarSign },
    { id: 'variants', label: 'Variants & Stock', icon: Layers },
    { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Add New Product"
        subtitle="Create a new catalog item with images, variants, and pricing rules"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
          { label: 'Add Product' },
        ]}
      >
        <Button variant="secondary" onClick={() => setShowPreviewModal(true)} icon={Eye}>
          Preview
        </Button>
        <Button variant="outline" onClick={() => handleSubmit('Draft')} disabled={submitting}>
          Save as Draft
        </Button>
        <Button variant="primary" onClick={() => handleSubmit('Published')} loading={submitting}>
          Publish Product
        </Button>
      </PageHeader>

      {/* Multi-Step Tab Bar */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-white border border-surface-border rounded-2xl shadow-soft-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-brand-500 text-white shadow-purple-glow'
                  : 'text-slateText-muted hover:text-slateText-main hover:bg-surface-muted'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="commerce-card p-6 sm:p-8">
        {/* TAB 1: BASIC INFO */}
        {activeTab === 'basic' && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-base font-bold text-slateText-main border-b pb-3">
              Basic Product Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Embroidered Anarkali Kurta Set"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/40 focus:bg-white text-sm focus:border-brand-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/40 text-sm focus:border-brand-500 outline-none"
                >
                  {PRODUCT_CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Brand Name
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/40 text-sm focus:border-brand-500 outline-none"
                >
                  {PRODUCT_BRANDS.filter(b => b !== 'All').map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Product Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe material, fit, wash care, craftsmanship and styling tips..."
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/40 focus:bg-white text-sm focus:border-brand-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Product Highlight Badge
                </label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  placeholder="e.g. Bestseller, Trending, 60% Off"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/40 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Search & SEO Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="ethnic, festive, kurta, summer"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/40 text-sm outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA & GALLERY */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-base font-bold text-slateText-main border-b pb-3">
              Product Images & Visual Assets
            </h3>

            {/* URL Input Bar */}
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Paste high-res image URL (e.g. Unsplash photo link)..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/40 text-sm focus:border-brand-500 outline-none"
              />
              <Button variant="primary" icon={Plus} onClick={handleAddImage}>
                Add Image
              </Button>
            </div>

            {/* Quick Demo Image Suggestion presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slateText-muted">
              <span className="font-bold">Quick Demo Presets:</span>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  images: [...prev.images, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80']
                }))}
                className="px-2.5 py-1 rounded-lg bg-surface-muted hover:bg-brand-50 text-brand-600 font-semibold"
              >
                + Linen Shirt
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  images: [...prev.images, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80']
                }))}
                className="px-2.5 py-1 rounded-lg bg-surface-muted hover:bg-coral-50 text-coral-600 font-semibold"
              >
                + Crimson Sneakers
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  images: [...prev.images, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80']
                }))}
                className="px-2.5 py-1 rounded-lg bg-surface-muted hover:bg-warm-50 text-warm-700 font-semibold"
              >
                + Leather Tote
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {formData.images.map((url, idx) => (
                <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-square border border-surface-border bg-surface-muted">
                  <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slateText-main/80 backdrop-blur-sm text-white text-[10px] font-bold">
                    {idx === 0 ? 'Primary' : `#${idx + 1}`}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-roseDanger-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRICING & COST */}
        {activeTab === 'pricing' && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-base font-bold text-slateText-main border-b pb-3">
              Pricing Strategy & Margins
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-bold focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Compare-at Price (₹ MRP)
                </label>
                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Cost per Item (₹ COGS)
                </label>
                <input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
                />
              </div>
            </div>

            {/* Profit Margin Calculator Card */}
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-brand-700 uppercase">Estimated Gross Profit</p>
                <p className="text-2xl font-black text-brand-900 mt-0.5">
                  {formatCurrency(Number(formData.price) - Number(formData.costPrice))}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-700 uppercase">Margin Percentage</p>
                <p className="text-2xl font-black text-emeraldGreen-500 mt-0.5">
                  {formData.price > 0 ? Math.round(((formData.price - formData.costPrice) / formData.price) * 100) : 0}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="flashSale"
                  name="flashSale"
                  checked={formData.flashSale}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-coral-500 accent-coral-500 cursor-pointer"
                />
                <label htmlFor="flashSale" className="text-xs font-bold text-slateText-main cursor-pointer">
                  Feature in Flash Sale Section
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VARIANTS & STOCK */}
        {activeTab === 'variants' && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slateText-main">
                Variants (Size & Color Matrix)
              </h3>
              <Button variant="outline" size="sm" icon={Plus} onClick={handleAddVariant}>
                Add Variant Row
              </Button>
            </div>

            <div className="space-y-3">
              {formData.variants.map((variant, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3.5 rounded-xl border border-surface-border bg-surface-muted/30 items-center">
                  <div>
                    <label className="text-[10px] font-bold text-slateText-muted uppercase">Size</label>
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(idx, 'size', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-surface-border bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slateText-muted uppercase">Color</label>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => handleVariantChange(idx, 'color', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-surface-border bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slateText-muted uppercase">Stock Count</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(idx, 'stock', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-surface-border bg-white"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slateText-muted uppercase">Variant SKU</label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => handleVariantChange(idx, 'sku', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-surface-border bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(idx)}
                      className="mt-4 p-1.5 rounded-lg text-roseDanger-500 hover:bg-roseDanger-50"
                      title="Delete Variant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t">
              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Master SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border font-mono text-sm bg-surface-muted/40 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Low Stock Alert Threshold
                </label>
                <input
                  type="number"
                  name="lowStockThreshold"
                  value={formData.lowStockThreshold}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm bg-surface-muted/40 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SHIPPING & DELIVERY */}
        {activeTab === 'shipping' && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-base font-bold text-slateText-main border-b pb-3">
              Shipping & Logistics Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Package Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 0.5 kg"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Dimensions (L x W x H)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g. 30x20x5 cm"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-main mb-1.5">
                  Estimated Delivery Time
                </label>
                <input
                  type="text"
                  name="deliveryDays"
                  value={formData.deliveryDays}
                  onChange={handleChange}
                  placeholder="e.g. 2-4 Days"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Bottom Navigation Footer */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-surface-border">
          <Button
            variant="secondary"
            onClick={() => {
              const idx = tabs.findIndex(t => t.id === activeTab);
              if (idx > 0) setActiveTab(tabs[idx - 1].id);
            }}
            disabled={activeTab === tabs[0].id}
          >
            Previous Tab
          </Button>

          {activeTab !== tabs[tabs.length - 1].id ? (
            <Button
              variant="primary"
              onClick={() => {
                const idx = tabs.findIndex(t => t.id === activeTab);
                if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
              }}
            >
              Next Step →
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => handleSubmit('Published')}
              loading={submitting}
            >
              Finish & Publish
            </Button>
          )}
        </div>
      </div>

      {/* Live Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Storefront Product Card Preview"
      >
        <div className="max-w-xs mx-auto commerce-card p-4 rounded-2xl">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3">
            <img src={formData.images[0]} alt="preview" className="w-full h-full object-cover" />
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-brand-500 text-white font-extrabold text-[10px]">
              {formData.badge}
            </span>
          </div>
          <p className="text-[10px] font-bold text-brand-600 uppercase">{formData.brand}</p>
          <h4 className="text-sm font-bold text-slateText-main truncate">{formData.name || 'Untitled Product'}</h4>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-base font-black text-slateText-main">{formatCurrency(formData.price)}</span>
            <span className="text-xs text-slateText-muted line-through">{formatCurrency(formData.compareAtPrice)}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
