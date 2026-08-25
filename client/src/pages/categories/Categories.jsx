import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Layers, ArrowRight, UploadCloud, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';
import { formatNumber } from '../../utils/formatters';

const DEFAULT_CATEGORY_FALLBACK = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80';

const PRESET_IMAGES = [
  { label: '👟 Shoes / Footwear', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80' },
  { label: '👗 Western Wear', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80' },
  { label: '👜 Bags & Totes', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80' },
  { label: '👔 Men Formals', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
];

export const Categories = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newCat, setNewCat] = useState({
    name: '',
    image: '',
    description: '',
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await productService.getCategories();
      if (res.success) {
        setCategories(res.data);
      }
    } catch (err) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


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


  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const compressed = await compressImage(event.target.result, 400, 0.6);
      setNewCat(prev => ({ ...prev, image: compressed }));
      toast.success('Category cover image uploaded!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    try {
      setSubmitting(true);
      const finalImage = newCat.image.trim() || DEFAULT_CATEGORY_FALLBACK;
      const res = await productService.createCategory({
        ...newCat,
        image: finalImage,
      });
      if (res.success) {
        toast.success(`Category "${newCat.name}" created!`);
        setShowAddModal(false);
        setNewCat({ name: '', image: '', description: '' });
        fetchCategories();
      }
    } catch (err) {
      toast.error('Error creating category');
    } finally {
      setSubmitting(false);
    }
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
        title="Store Categories"
        subtitle="Manage product taxonomy, navigation hierarchies, and department imagery"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Categories' }]}
        badge={`${categories.length} Departments`}
      >
        <Button variant="primary" icon={Plus} onClick={() => setShowAddModal(true)}>
          New Category
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/categories/${cat.slug || cat.name.toLowerCase()}`)}
            className="commerce-card overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
                <img
                  src={cat.image || DEFAULT_CATEGORY_FALLBACK}
                  alt={cat.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_CATEGORY_FALLBACK;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <h3 className="text-xl font-extrabold text-white">{cat.name}</h3>
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                    {formatNumber(cat.itemCount || 1200)} Items
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-slateText-muted leading-relaxed font-medium">
                  {cat.description || 'Curated clothing, styles, and essentials for modern lifestyle shoppers.'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface-muted/40 border-t border-surface-border flex items-center justify-between text-xs font-bold text-brand-600 group-hover:text-brand-700">
              <span>Manage Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create Store Category"
        subtitle="Add a new department vertical to your storefront"
      >
        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Category Name *</label>
            <input
              type="text"
              value={newCat.name}
              onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
              placeholder="e.g. Ethnic Footwear"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none focus:border-brand-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Cover Image</label>
            
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mb-2 p-3 border border-dashed border-brand-300 hover:border-brand-500 bg-brand-50/40 rounded-xl text-center cursor-pointer flex items-center justify-center gap-2 group transition-all"
            >
              <UploadCloud className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-brand-600">Click to upload photo from computer</span>
            </div>

            

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setNewCat({ ...newCat, image: preset.url })}
                  className="px-2 py-1 rounded-lg bg-surface-muted hover:bg-brand-50 text-[11px] font-bold text-slateText-main hover:text-brand-600 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Preview Box */}
            {newCat.image && (
              <div className="mt-3 relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-surface-border">
                <img src={newCat.image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setNewCat({ ...newCat, image: '' })}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-roseDanger-500 text-white"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Description</label>
            <textarea
              rows={3}
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
              placeholder="Brief description for category banner..."
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={submitting}>
              Create Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
