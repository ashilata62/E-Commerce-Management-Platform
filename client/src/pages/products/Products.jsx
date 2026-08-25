import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Plus,
  LayoutGrid,
  List,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Tag,
  Star,
  Layers,
  ArrowUpDown,
  ShoppingBag,
  Heart,
  Sparkles,
  Check,
  Flame,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterBar } from '../../components/common/FilterBar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import { Pagination } from '../../components/common/Pagination';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS } from '../../utils/constants';

export const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const isCustomer = user?.role === 'Customer';

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, inStock: 0, lowStock: 0, outOfStock: 0 });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Wishlist state for customer
  const [wishlist, setWishlist] = useState(['prd_001', 'prd_002', 'prd_004']);

  const toggleWishlist = (id, name) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      toast.info(`Removed ${name} from Wishlist`);
    } else {
      setWishlist(prev => [...prev, id]);
      toast.success(`Saved ${name} to Wishlist ❤️`);
    }
  };

  // Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    brand: 'All',
    status: 'All',
    stockStatus: 'All',
    sortBy: 'salesCount',
    sortOrder: 'desc',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Delete modal state
  const [deleteProductItem, setDeleteProductItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        search: search || undefined,
        category: filters.category !== 'All' ? filters.category : undefined,
        brand: filters.brand !== 'All' ? filters.brand : undefined,
        status: isCustomer ? 'Published' : (filters.status !== 'All' ? filters.status : undefined),
        stockStatus: isCustomer ? undefined : (filters.stockStatus !== 'All' ? filters.stockStatus : undefined),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      };

      const res = await productService.getProducts(params);
      if (res.success) {
        setProducts(res.data);
        setTotalCount(res.total);
        setTotalPages(res.totalPages);
        if (res.stats) setStats(res.stats);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, search, currentPage]);

  const handleFilterChange = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilters({
      category: 'All',
      brand: 'All',
      status: 'All',
      stockStatus: 'All',
      sortBy: 'salesCount',
      sortOrder: 'desc',
    });
    setCurrentPage(1);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProductItem) return;
    try {
      setDeleting(true);
      const res = await productService.deleteProduct(deleteProductItem._id);
      if (res.success) {
        toast.success(`Product "${deleteProductItem.name}" deleted`);
        setDeleteProductItem(null);
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error deleting product');
    } finally {
      setDeleting(false);
    }
  };

  const activeFiltersCount = Object.entries(filters).filter(
    ([k, v]) => !['sortBy', 'sortOrder'].includes(k) && v !== 'All'
  ).length + (search ? 1 : 0);

  const customerQuickCategories = [
    { label: '✨ All Outfits', value: 'All' },
    { label: '👧 Girls & Women', value: 'Girls' },
    { label: '👦 Boys & Men', value: 'Boys' },
    { label: '👶 Kids', value: 'Kids' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Page Header (Role-Aware) */}
      {isCustomer ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-surface-border shadow-soft-xs">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Kiaan Premium Catalog</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slateText-main">
              Explore Latest Outfits & Styles
            </h1>
            <p className="text-xs text-slateText-muted">
              Handpicked ethnic wear, bridal sets, casuals and festive collections
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200 shrink-0">
            {totalCount} Outfits Available
          </span>
        </div>
      ) : (
        <PageHeader
          title="Products Catalog"
          subtitle="Manage inventory, pricing, variations, and marketplace listings"
          breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Products' }]}
          badge={`${totalCount} Active SKUs`}
        >
          {user?.role !== 'Staff' && (
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => navigate('/products/add')}
            >
              Add Product
            </Button>
          )}
        </PageHeader>
      )}

      {/* 2. Quick Filters / Category Tabs */}
      {isCustomer ? (
        /* Customer: Clean Girls, Boys, Kids Tabs with Active Highlight */
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {customerQuickCategories.map((cat) => {
            const isActive = filters.category === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleFilterChange('category', cat.value)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all shrink-0 cursor-pointer flex items-center gap-2 active:scale-95 border ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-[#7854F7] text-white border-brand-600 shadow-purple-glow'
                    : 'bg-white text-slateText-main hover:bg-surface-muted border-[#E7E0F7] shadow-soft-xs'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Admin / Merchant: Inventory Stats Bar */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            onClick={() => handleFilterChange('stockStatus', 'All')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              filters.stockStatus === 'All'
                ? 'bg-brand-50/50 border-brand-300 shadow-soft-sm'
                : 'bg-white border-surface-border hover:bg-surface-muted'
            }`}
          >
            <p className="text-[11px] font-bold text-slateText-muted uppercase">Total Catalog</p>
            <p className="text-xl font-black text-slateText-main mt-0.5">{stats.totalProducts || products.length}</p>
          </div>

          <div
            onClick={() => handleFilterChange('stockStatus', 'inStock')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              filters.stockStatus === 'inStock'
                ? 'bg-emeraldGreen-50/50 border-emeraldGreen-500/40 shadow-soft-sm'
                : 'bg-white border-surface-border hover:bg-surface-muted'
            }`}
          >
            <p className="text-[11px] font-bold text-emeraldGreen-600 uppercase">In Stock</p>
            <p className="text-xl font-black text-slateText-main mt-0.5">{stats.inStock}</p>
          </div>

          <div
            onClick={() => handleFilterChange('stockStatus', 'lowStock')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              filters.stockStatus === 'lowStock'
                ? 'bg-warm-50/50 border-warm-300 shadow-soft-sm'
                : 'bg-white border-surface-border hover:bg-surface-muted'
            }`}
          >
            <p className="text-[11px] font-bold text-warm-600 uppercase">Low Stock Alert</p>
            <p className="text-xl font-black text-warm-700 mt-0.5">{stats.lowStock}</p>
          </div>

          <div
            onClick={() => handleFilterChange('stockStatus', 'outOfStock')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              filters.stockStatus === 'outOfStock'
                ? 'bg-roseDanger-50/50 border-roseDanger-500/40 shadow-soft-sm'
                : 'bg-white border-surface-border hover:bg-surface-muted'
            }`}
          >
            <p className="text-[11px] font-bold text-roseDanger-500 uppercase">Out of Stock</p>
            <p className="text-xl font-black text-roseDanger-500 mt-0.5">{stats.outOfStock}</p>
          </div>
        </div>
      )}

      {/* 3. Search & Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={isCustomer ? "Search kurtas, dresses, suits, shirts, watches..." : "Search by product name, SKU, tags or brand..."}
            className="flex-1"
          />

          {!isCustomer && (
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              {/* View Mode Toggle for Admin */}
              <div className="flex items-center bg-surface-muted p-1 rounded-xl border border-surface-border">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-brand-600 shadow-soft-sm'
                      : 'text-slateText-muted hover:text-slateText-main'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-brand-600 shadow-soft-sm'
                      : 'text-slateText-muted hover:text-slateText-main'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {!isCustomer && (
          <FilterBar
            filters={filters}
            options={{
              category: PRODUCT_CATEGORIES,
              brand: PRODUCT_BRANDS,
              status: ['All', 'Published', 'Draft', 'Archived'],
              sortBy: ['salesCount', 'price', 'stock', 'rating'],
            }}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            activeFiltersCount={activeFiltersCount}
          />
        )}
      </div>

      {/* 4. Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          <SkeletonLoader type="product" count={8} />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No Outfits Found"
          description="We couldn't find any products matching your search. Try changing filters or search terms."
          actionText={isCustomer ? "Show All Outfits" : "Add New Product"}
          actionIcon={isCustomer ? ShoppingBag : Plus}
          onAction={isCustomer ? handleResetFilters : () => navigate('/products/add')}
        />
      ) : (isCustomer || viewMode === 'grid') ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
          {products.map((product) => {
            const prodId = product._id || product.id;
            const isWish = wishlist.includes(prodId);
            const discountPercent = product.compareAtPrice
              ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
              : null;

            return (
              <div
                key={prodId}
                className="group commerce-card p-3 sm:p-4 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:shadow-soft-md transition-all relative overflow-hidden"
              >
                <div>
                  {/* Image Container with Badges & Wishlist */}
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] bg-surface-muted mb-3 cursor-pointer"
                    onClick={() => navigate(`/products/${prodId}`)}
                  >
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Discount Badge */}
                    {discountPercent && discountPercent > 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-coral-500 text-white font-extrabold text-[10px] shadow-soft-xs">
                        {discountPercent}% OFF
                      </span>
                    )}

                    {/* Customer Wishlist Button */}
                    {isCustomer ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(prodId, product.name);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-coral-500 shadow-soft-xs transition-colors cursor-pointer active:scale-90"
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWish ? 'fill-coral-500 text-coral-500' : ''}`} />
                      </button>
                    ) : (
                      /* Admin Hover Action Overlay */
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${prodId}`);
                          }}
                          className="w-9 h-9 rounded-xl bg-white text-slateText-main flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 shadow-soft-md transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/edit/${prodId}`);
                          }}
                          className="w-9 h-9 rounded-xl bg-white text-slateText-main flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 shadow-soft-md transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteProductItem(product);
                          }}
                          className="w-9 h-9 rounded-xl bg-white text-roseDanger-500 flex items-center justify-center hover:bg-roseDanger-50 shadow-soft-md transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Brand & Category */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-slateText-muted mb-1">
                    <span className="uppercase text-brand-600 font-bold">{product.brand}</span>
                    <span>{product.category}</span>
                  </div>

                  {/* Title */}
                  <h4
                    onClick={() => navigate(`/products/${prodId}`)}
                    className="text-xs sm:text-sm font-bold text-slateText-main line-clamp-1 cursor-pointer hover:text-brand-600 transition-colors"
                  >
                    {product.name}
                  </h4>

                  {/* Price & Compare Price */}
                  <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1.5">
                    <span className="text-sm sm:text-base font-black text-slateText-main">
                      {formatCurrency(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-[11px] text-slateText-muted line-through font-medium">
                        {formatCurrency(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Rating & Action */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-border gap-2">
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-warm-600">
                    <Star className="w-3.5 h-3.5 fill-warm-500 text-warm-500" />
                    <span>{product.rating}</span>
                    <span className="text-[10px] text-slateText-muted font-normal">
                      ({product.reviewsCount})
                    </span>
                  </div>

                  {isCustomer ? (
                    <button
                      type="button"
                      onClick={() => addToCart(product, 'M', 'Default', 1)}
                      className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs transition-all flex items-center gap-1 shadow-soft-xs cursor-pointer active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <StatusBadge status={product.status} size="sm" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Admin List View Table */
        <div className="commerce-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-border text-[11px] font-extrabold text-slateText-muted uppercase bg-surface-muted/50">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category / Brand</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Sales</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-sm font-medium">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-brand-50/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-surface-border"
                        />
                        <div>
                          <p
                            onClick={() => navigate(`/products/${product._id}`)}
                            className="font-bold text-slateText-main hover:text-brand-600 cursor-pointer"
                          >
                            {product.name}
                          </p>
                          <p className="text-xs font-mono text-slateText-muted">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-slateText-muted">
                      <p className="text-slateText-main">{product.category}</p>
                      <p className="text-[11px]">{product.brand}</p>
                    </td>
                    <td className="py-3 px-4 font-black text-slateText-main">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          product.stock <= product.lowStockThreshold
                            ? 'bg-roseDanger-50 text-roseDanger-500'
                            : 'bg-emeraldGreen-50 text-emeraldGreen-500'
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-bold text-slateText-main">
                      {formatNumber(product.salesCount)} units
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/products/${product._id}`)}
                          className="p-1.5 rounded-lg text-slateText-muted hover:text-brand-600 hover:bg-brand-50 transition-colors cursor-pointer"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/products/edit/${product._id}`)}
                          className="p-1.5 rounded-lg text-slateText-muted hover:text-brand-600 hover:bg-brand-50 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteProductItem(product)}
                          className="p-1.5 rounded-lg text-slateText-muted hover:text-roseDanger-600 hover:bg-roseDanger-50 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalCount}
          pageSize={12}
        />
      )}

      {/* Admin Delete Confirmation Modal */}
      {!isCustomer && (
        <ConfirmDialog
          isOpen={!!deleteProductItem}
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteProductItem?.name}"? This action cannot be undone.`}
          confirmText="Delete Product"
          cancelText="Cancel"
          variant="danger"
          loading={deleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteProductItem(null)}
        />
      )}
    </div>
  );
};

export default Products;
