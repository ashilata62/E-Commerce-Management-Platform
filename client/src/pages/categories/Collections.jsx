import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Plus, Tag, ArrowRight } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const Collections = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [collections, setCollections] = useState([
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCollections(prev => [
      {
        id: 'col_' + Date.now(),
        title: newTitle,
        badge: 'New Edit',
        productsCount: 12,
        banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
        description: 'Curated seasonal lookbook for modern commerce shoppers.',
      },
      ...prev,
    ]);
    toast.success(`Collection "${newTitle}" created!`);
    setShowModal(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Curated Collections"
        subtitle="Seasonal edits, influencer lookbooks, and thematic storefront showcases"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Collections' }]}
      >
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          New Collection
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.id} className="commerce-card overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
                <img src={col.banner} alt={col.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] font-black shadow-soft-sm">
                  {col.badge}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                  {col.productsCount} Items
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slateText-main">{col.title}</h3>
                <p className="text-xs text-slateText-muted mt-1 leading-relaxed">{col.description}</p>
              </div>
            </div>

            <div className="p-4 bg-surface-muted/40 border-t border-surface-border flex items-center justify-between text-xs font-bold text-brand-600">
              <span>View Products</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Collection">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Collection Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Winter Velvet Couture"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Collection</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
