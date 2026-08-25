import React, { useState, useEffect, useRef } from 'react';
import { Plus, Award, ArrowRight, ExternalLink, UploadCloud, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';

const STORAGE_KEY = 'kiaan_brands_catalog';

const INITIAL_BRANDS = [
  { _id: 'br_001', name: 'Aura Studio', logo: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80', productsCount: 142 },
  { _id: 'br_002', name: 'UrbanThread', logo: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=200&q=80', productsCount: 128 },
  { _id: 'br_003', name: 'Kaira Ethnic', logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80', productsCount: 215 },
  { _id: 'br_004', name: 'Royal Heritage', logo: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80', productsCount: 94 },
];

export const Brands = () => {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const [newBrand, setNewBrand] = useState({
    name: '',
    logo: '',
    description: '',
  });

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBrands(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Error reading brands from localStorage:', e);
    }
    setBrands(INITIAL_BRANDS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BRANDS));
  }, []);

  // Save helper
  const saveBrandsToStorage = (newList) => {
    setBrands(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error('Error saving brands to localStorage:', e);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewBrand(prev => ({ ...prev, logo: event.target.result }));
      toast.success('Brand logo uploaded!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newBrand.name.trim()) {
      toast.warning('Please enter a brand name');
      return;
    }

    const created = {
      _id: 'br_' + Date.now(),
      name: newBrand.name.trim(),
      logo: newBrand.logo.trim() || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80',
      productsCount: Math.floor(10 + Math.random() * 50),
    };

    const updated = [...brands, created];
    saveBrandsToStorage(updated);

    toast.success(`Brand "${created.name}" registered successfully!`);
    setShowModal(false);
    setNewBrand({ name: '', logo: '', description: '' });
  };

  const handleDelete = (id, name) => {
    const updated = brands.filter(b => b._id !== id);
    saveBrandsToStorage(updated);
    toast.info(`Brand "${name}" removed`);
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
        title="Brands & Labels"
        subtitle="Manage licensed merchant brands, in-house labels, and manufacturer accounts"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Brands' }]}
        badge={`${brands.length} Verified Brands`}
      >
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          Register Brand
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((b) => (
          <div key={b._id} className="commerce-card p-6 flex items-center justify-between group relative">
            <div className="flex items-center gap-4">
              <img
                src={b.logo || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80'}
                alt={b.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80';
                }}
                className="w-14 h-14 rounded-2xl object-cover border border-surface-border group-hover:scale-105 transition-transform"
              />
              <div>
                <h3 className="text-base font-bold text-slateText-main">{b.name}</h3>
                <p className="text-xs text-slateText-muted mt-0.5">{b.productsCount || 48} Products Listed</p>
                <span className="inline-block text-[10px] font-bold text-emeraldGreen-600 bg-emeraldGreen-50 px-2 py-0.5 rounded-full mt-1.5">
                  ● Verified Merchant
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDelete(b._id, b.name)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-roseDanger-500 hover:bg-roseDanger-50 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete Brand"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register Brand Label">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Brand Name *</label>
            <input
              type="text"
              value={newBrand.name}
              onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
              placeholder="e.g. Zenith Stride, Footwear House..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Brand Logo (Upload or Link)</label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="mb-2 p-3 border border-dashed border-brand-300 hover:border-brand-500 bg-brand-50/40 rounded-xl text-center cursor-pointer flex items-center justify-center gap-2 group transition-all"
            >
              <UploadCloud className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-brand-600">Upload logo from computer</span>
            </div>

            <input
              type="url"
              value={newBrand.logo}
              onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.value })}
              placeholder="Or paste image URL..."
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
            />

            {newBrand.logo && (
              <div className="mt-2 flex items-center gap-3 p-2 border rounded-xl bg-surface-muted">
                <img src={newBrand.logo} alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
                <span className="text-xs font-medium text-slateText-muted">Logo preview</span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Register Brand</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
