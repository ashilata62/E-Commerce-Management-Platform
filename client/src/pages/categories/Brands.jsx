import React, { useState, useEffect } from 'react';
import { Plus, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';

export const Brands = () => {
  const toast = useToast();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await productService.getBrands();
      if (res.success) {
        setBrands(res.data);
      }
    } catch (err) {
      toast.error('Failed to load brands');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    try {
      const res = await productService.createBrand({ name: newBrandName });
      if (res.success) {
        toast.success(`Brand "${newBrandName}" registered!`);
        setShowModal(false);
        setNewBrandName('');
        fetchBrands();
      }
    } catch (err) {
      toast.error('Failed to register brand');
    }
  };

  return (
    <div className="space-y-6">
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
          <div key={b._id} className="commerce-card p-6 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <img
                src={b.logo || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80'}
                alt={b.name}
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
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register Brand Label">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Brand Name *</label>
            <input
              type="text"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              placeholder="e.g. Zenith Stride"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Add Brand</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
