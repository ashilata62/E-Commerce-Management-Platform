import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Tag, ArrowRight, UploadCloud, Trash2, Image as ImageIcon } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { formatNumber } from '../../utils/formatters';

const STORAGE_KEY = 'kiaan_collections_store';
const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80';

const INITIAL_COLLECTIONS = [
  {
    id: 'col_1',
    title: 'Festive Royal Silk & Zari',
    badge: 'Festive Edit',
    productsCount: 42,
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    description: 'Exclusive handloom zari kurtas, royal silk drapes, and anarkali sets.',
  },
  {
    id: 'col_2',
    title: 'Summer Resort & Pure Linen',
    badge: 'Hot Season',
    productsCount: 28,
    banner: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    description: 'Breathable flax linen shirts, smocked beach maxis, and pastel co-ords.',
  },
  {
    id: 'col_3',
    title: 'Urban Street Drop 2026',
    badge: 'Streetwear',
    productsCount: 35,
    banner: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'Heavyweight oversized cotton tees, boxy fits, cargo pants and graphic drops.',
  },
];

const PRESET_COLLECTION_IMAGES = [
  { label: '👟 Shoes & Footwear', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80', badge: 'Footwear Drop' },
  { label: '👗 Ethnic & Festive', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', badge: 'Festive Wear' },
  { label: '👜 Bags & Accessories', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80', badge: 'Luxury Goods' },
  { label: '👕 Casual Linen', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', badge: 'Summer Essentials' },
];

export const Collections = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [collections, setCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    badge: 'Trending Edit',
    banner: '',
    description: '',
  });

  // Load collections from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCollections(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Error loading collections from localStorage:', e);
    }
    setCollections(INITIAL_COLLECTIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COLLECTIONS));
  }, []);

  // Save collections to LocalStorage helper
  const saveCollections = (updatedList) => {
    setCollections(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error saving collections to localStorage:', e);
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


  // Local File Upload Handler (with compression for localStorage)
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
      setFormData(prev => ({ ...prev, banner: compressed }));
      toast.success('Collection cover image uploaded successfully!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Create Collection Handler
  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.warning('Please enter a collection title');
      return;
    }

    const newCollection = {
      id: 'col_' + Date.now(),
      title: formData.title.trim(),
      badge: formData.badge.trim() || 'New Collection',
      productsCount: Math.floor(10 + Math.random() * 40),
      banner: formData.banner.trim() || DEFAULT_BANNER,
      description: formData.description.trim() || 'Curated seasonal lookbook and storefront showcase.',
    };

    const updated = [newCollection, ...collections];
    saveCollections(updated);
    toast.success(`Collection "${newCollection.title}" created successfully!`);
    setShowModal(false);
    setFormData({ title: '', badge: 'Trending Edit', banner: '', description: '' });
  };

  // Delete Collection Handler
  const handleDelete = (id, title) => {
    const updated = collections.filter(c => c.id !== id);
    saveCollections(updated);
    toast.info(`Collection "${title}" removed`);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Page Header */}
      <PageHeader
        title="Curated Collections"
        subtitle="Seasonal edits, influencer lookbooks, and thematic storefront showcases"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Collections' }]}
        badge={`${collections.length} Collections Active`}
      >
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          New Collection
        </Button>
      </PageHeader>

      {/* Collections Grid Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.id} className="commerce-card overflow-hidden group flex flex-col justify-between shadow-soft-sm hover:shadow-soft-md transition-shadow">
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
                <img
                  src={col.banner || DEFAULT_BANNER}
                  alt={col.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_BANNER;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] font-black shadow-soft-sm uppercase tracking-wider">
                  {col.badge}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold">
                  {col.productsCount} Products
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(col.id, col.title);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-roseDanger-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Collection"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-slateText-main group-hover:text-brand-600 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-slateText-muted mt-1.5 leading-relaxed font-medium">
                  {col.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface-muted/40 border-t border-surface-border flex items-center justify-between text-xs font-bold text-brand-600 group-hover:text-brand-700">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Create Collection Modal Form */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Collection"
        subtitle="Add a thematic showcase with custom cover image and category badge"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">
              Collection Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Footwear & Shoes Edition, Winter Velvet Couture..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none focus:border-brand-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">
              Collection Type / Badge Name
            </label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. Shoes Special, Trending, Festive Edit, Bestsellers..."
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none focus:border-brand-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">
              Cover Image
            </label>

            {/* Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mb-2 p-3.5 border border-dashed border-brand-300 hover:border-brand-500 bg-brand-50/40 hover:bg-brand-50 rounded-xl text-center cursor-pointer flex items-center justify-center gap-2 group transition-all"
            >
              <UploadCloud className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-brand-600">Click to upload photo from your computer</span>
            </div>

            

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESET_COLLECTION_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, banner: preset.url, badge: preset.badge })}
                  className="px-2.5 py-1 rounded-lg bg-surface-muted hover:bg-brand-50 text-[11px] font-bold text-slateText-main hover:text-brand-600 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Live Image Preview Thumbnail */}
            {formData.banner && (
              <div className="mt-3 relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-surface-border shadow-soft-sm">
                <img src={formData.banner} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-brand-500 text-white text-[10px] font-bold">
                  {formData.badge}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, banner: '' })}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-roseDanger-500 text-white hover:bg-roseDanger-600"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">
              Collection Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what type of products are in this collection..."
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Collection
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
