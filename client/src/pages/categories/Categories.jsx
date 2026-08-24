import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Layers, ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';
import { formatNumber } from '../../utils/formatters';

export const Categories = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newCat, setNewCat] = useState({
    name: '',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
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

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    try {
      setSubmitting(true);
      const res = await productService.createCategory(newCat);
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
                  src={cat.image}
                  alt={cat.name}
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
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Cover Image URL</label>
            <input
              type="url"
              value={newCat.image}
              onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Description</label>
            <textarea
              rows={3}
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
              placeholder="Brief description for category banner..."
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
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
