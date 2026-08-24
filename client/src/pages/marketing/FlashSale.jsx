import React, { useState, useEffect } from 'react';
import { Zap, Clock, Plus, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { productService } from '../../services/productService';
import { formatCurrency } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const FlashSale = () => {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 36 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getProducts();
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      toast.error('Failed to load flash sale products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleFlashSale = async (product) => {
    try {
      const updated = !product.flashSale;
      await productService.updateProduct(product._id, { flashSale: updated });
      toast.success(`"${product.name}" ${updated ? 'added to' : 'removed from'} Flash Sale`);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to update flash sale status');
    }
  };

  const formatDigits = (n) => String(n).padStart(2, '0');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Flash Sale Management"
        subtitle="Manage high velocity limited-time price drops, countdown allocations, and stock locks"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Marketing' }, { label: 'Flash Sale' }]}
        badge="Active Event"
      />

      {/* Hero Timer Banner */}
      <div className="commerce-card p-6 sm:p-8 bg-gradient-to-r from-coral-500 via-[#FF6F98] to-warm-500 text-white shadow-soft-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>Live Speed Event</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Summer Steal Blitz ⚡</h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium max-w-md">
              Items allocated below are prominently highlighted on the main storefront with dynamic countdown ticks.
            </p>
          </div>

          <div className="bg-slateText-main/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-center">
            <p className="text-[10px] font-extrabold uppercase text-coral-400 tracking-wider mb-2">
              Event Closes In:
            </p>
            <div className="flex items-center gap-2 font-mono font-black text-2xl text-white">
              <span className="bg-white/20 px-3 py-1 rounded-xl">{formatDigits(timeLeft.hours)}h</span>
              <span>:</span>
              <span className="bg-white/20 px-3 py-1 rounded-xl">{formatDigits(timeLeft.minutes)}m</span>
              <span>:</span>
              <span className="bg-coral-500 px-3 py-1 rounded-xl shadow-coral-glow">{formatDigits(timeLeft.seconds)}s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Allocation Table */}
      <div className="commerce-card p-6">
        <h3 className="text-base font-bold text-slateText-main mb-4">
          Allocated Flash Sale Catalog Items
        </h3>

        <div className="divide-y divide-surface-border">
          {products.map((p) => (
            <div key={p._id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="w-14 h-14 rounded-xl object-cover border border-surface-border shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-slateText-main">{p.name}</p>
                  <p className="text-[11px] text-slateText-muted">{p.category} • SKU: {p.sku}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-slateText-main">{formatCurrency(p.price)}</span>
                    {p.compareAtPrice && (
                      <span className="text-[10px] text-slateText-muted line-through">{formatCurrency(p.compareAtPrice)}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  p.flashSale ? 'bg-coral-50 text-coral-600 border border-coral-200' : 'bg-surface-muted text-slateText-muted'
                }`}>
                  {p.flashSale ? '⚡ In Flash Sale' : 'Standard Catalog'}
                </span>
                <Button
                  size="xs"
                  variant={p.flashSale ? 'secondary' : 'coral'}
                  onClick={() => handleToggleFlashSale(p)}
                >
                  {p.flashSale ? 'Remove' : 'Add to Flash Sale'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
