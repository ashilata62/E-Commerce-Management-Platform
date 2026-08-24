import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  Image as ImageIcon,
  DollarSign,
  Layers,
  Info,
  Truck,
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS } from '../../utils/constants';

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productService.getProductById(id);
        if (res.success) {
          setFormData(res.data);
        }
      } catch (err) {
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await productService.updateProduct(id, formData);
      if (res.success) {
        toast.success(`Updated "${formData.name}" successfully!`);
        navigate('/products');
      }
    } catch (err) {
      toast.error('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return <div className="h-96 rounded-2xl bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={`Edit: ${formData.name}`}
        subtitle={`SKU: ${formData.sku}`}
        breadcrumbs={[
          { label: 'Products', path: '/products' },
          { label: 'Edit Product' },
        ]}
      >
        <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate('/products')}>
          Back to List
        </Button>
        <Button variant="primary" icon={Save} onClick={handleSave} loading={saving}>
          Save Changes
        </Button>
      </PageHeader>

      <div className="commerce-card p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slateText-main mb-1.5">Product Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-semibold outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
            >
              {PRODUCT_CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">Brand</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
            >
              {PRODUCT_BRANDS.filter(b => b !== 'All').map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">Selling Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">Compare-at Price (₹)</label>
            <input
              type="number"
              name="compareAtPrice"
              value={formData.compareAtPrice || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">Total Inventory Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1.5">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm font-semibold outline-none"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slateText-main mb-1.5">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm outline-none"
          />
        </div>
      </div>
    </div>
  );
};
