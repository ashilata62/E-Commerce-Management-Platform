import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit3,
  TrendingUp,
  ShoppingBag,
  Star,
  CheckCircle2,
  AlertTriangle,
  Package,
  Layers,
  Sparkles,
  Share2,
  Clock,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RatingStars } from '../../components/common/RatingStars';
import { productService } from '../../services/productService';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Mock mini sales trajectory data for this product
  const salesHistory = [
    { month: 'Jan', units: 120, revenue: 299880 },
    { month: 'Feb', units: 180, revenue: 449820 },
    { month: 'Mar', units: 240, revenue: 599760 },
    { month: 'Apr', units: 310, revenue: 774690 },
    { month: 'May', units: 420, revenue: 1049580 },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productService.getProductById(id);
        if (res.success) {
          setProduct(res.data);
        }
      } catch (err) {
        toast.error('Failed to load product details');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading || !product) {
    return <div className="h-96 rounded-3xl bg-gray-200 animate-pulse" />;
  }

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title={product.name}
        subtitle={`Brand: ${product.brand} • SKU: ${product.sku}`}
        breadcrumbs={[
          { label: 'Products', path: '/products' },
          { label: product.name },
        ]}
      >
        <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate('/products')}>
          Back
        </Button>
        <Button
          variant="outline"
          icon={Share2}
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            toast.success('Product link copied to clipboard!');
          }}
        >
          Share
        </Button>
        <Button
          variant="primary"
          icon={Edit3}
          onClick={() => navigate(`/products/edit/${product._id}`)}
        >
          Edit Product
        </Button>
      </PageHeader>

      {/* Top Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-muted border border-surface-border shadow-soft-md">
            <img
              src={product.images?.[activeImageIdx] || product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-brand-500 text-white font-black text-xs shadow-soft-sm">
                {product.badge}
              </span>
            )}
            {discountPercent && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-coral-500 text-white font-black text-xs shadow-coral-glow">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail row */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx
                      ? 'border-brand-500 ring-2 ring-brand-100'
                      : 'border-surface-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Key Performance & Specifications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="commerce-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border pb-4">
              <div>
                <span className="text-xs font-black uppercase text-brand-600 tracking-wider">
                  {product.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slateText-main mt-0.5">
                  {product.name}
                </h2>
              </div>
              <StatusBadge status={product.status} size="lg" />
            </div>

            {/* Rating & reviews */}
            <div className="flex items-center gap-4">
              <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="md" />
              <span className="text-slateText-muted text-xs font-semibold">
                • {formatNumber(product.salesCount)} Units Sold
              </span>
            </div>

            {/* Pricing Details */}
            <div className="p-4 rounded-2xl bg-surface-muted/60 border border-surface-border flex flex-wrap items-baseline gap-4">
              <span className="text-3xl font-black text-slateText-main">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-slateText-muted line-through font-semibold">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
              {product.costPrice && (
                <span className="text-xs font-bold text-emeraldGreen-600 bg-emeraldGreen-50 px-2.5 py-1 rounded-lg">
                  Margin: {Math.round(((product.price - product.costPrice) / product.price) * 100)}% (₹{product.price - product.costPrice} profit/item)
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-extrabold text-slateText-muted uppercase tracking-wider mb-2">
                Overview & Description
              </h4>
              <p className="text-sm text-slateText-main leading-relaxed">
                {product.description || 'Premium tailored fabric crafted for comfort and festive elegance.'}
              </p>
            </div>

            {/* Metrics Quick Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl border border-surface-border bg-white text-center">
                <p className="text-[10px] font-bold text-slateText-muted uppercase">Gross Revenue</p>
                <p className="text-base font-black text-brand-600 mt-0.5">
                  {formatCurrency(product.revenue || product.salesCount * product.price)}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-surface-border bg-white text-center">
                <p className="text-[10px] font-bold text-slateText-muted uppercase">Available Stock</p>
                <p className={`text-base font-black mt-0.5 ${product.stock <= product.lowStockThreshold ? 'text-roseDanger-500' : 'text-slateText-main'}`}>
                  {product.stock} units
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-surface-border bg-white text-center">
                <p className="text-[10px] font-bold text-slateText-muted uppercase">Flash Sale Status</p>
                <p className="text-xs font-bold text-coral-600 mt-1">
                  {product.flashSale ? '⚡ Active' : 'Off'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variants Matrix Table & Sales Graph Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Variants List */}
        <div className="lg:col-span-6 commerce-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slateText-main flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-500" />
              <span>SKU Variations</span>
            </h3>
            <span className="text-xs text-slateText-muted font-bold">
              {product.variants?.length || 0} active variants
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-slateText-muted font-bold uppercase text-[10px]">
                  <th className="pb-2">Size</th>
                  <th className="pb-2">Color</th>
                  <th className="pb-2">Stock</th>
                  <th className="pb-2 text-right">Variant SKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border font-medium">
                {product.variants?.map((v, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-bold text-slateText-main">{v.size}</td>
                    <td className="py-2.5">{v.color}</td>
                    <td className="py-2.5 font-bold text-emeraldGreen-600">{v.stock}</td>
                    <td className="py-2.5 font-mono text-slateText-muted text-right">{v.sku}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Performance Chart */}
        <div className="lg:col-span-6 commerce-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slateText-main flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emeraldGreen-500" />
              <span>Monthly Sales Trajectory</span>
            </h3>
            <span className="text-xs font-bold text-emeraldGreen-600 bg-emeraldGreen-50 px-2 py-0.5 rounded-full">
              +42% Growth
            </span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesHistory}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C4DF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6C4DF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => [formatNumber(value) + ' units', 'Sales']} />
                <Area type="monotone" dataKey="units" stroke="#6C4DF6" strokeWidth={3} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
