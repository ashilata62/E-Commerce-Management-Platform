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
  ArrowRight,
  X,
  SlidersHorizontal,
  RotateCcw,
  Palette,
  Ruler,
  BadgePercent,
  CircleDollarSign,
  ShieldCheck
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
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('price'); // 'price' | 'size' | 'color' | 'brand' | 'discount' | 'rating'

  // Prevent background scroll and page jerk when modal/drawer is open
  useEffect(() => {
    if (showFilterModal || showSortModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFilterModal, showSortModal]);

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

  // Comprehensive Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    brand: 'All',
    status: 'All',
    stockStatus: 'All',
    sortBy: 'popularity',
    sortOrder: 'desc',
    priceMin: '',
    priceMax: '',
    selectedSizes: [],
    selectedColors: [],
    selectedBrands: [],
    minRating: '',
    minDiscount: '',
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
        priceMin: filters.priceMin || undefined,
        priceMax: filters.priceMax || undefined,
        selectedSizes: filters.selectedSizes?.length ? filters.selectedSizes : undefined,
        selectedColors: filters.selectedColors?.length ? filters.selectedColors : undefined,
        selectedBrands: filters.selectedBrands?.length ? filters.selectedBrands : undefined,
        minRating: filters.minRating || undefined,
        minDiscount: filters.minDiscount || undefined,
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

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilters({
      category: 'All',
      brand: 'All',
      status: 'All',
      stockStatus: 'All',
      sortBy: 'popularity',
      sortOrder: 'desc',
      priceMin: '',
      priceMax: '',
      selectedSizes: [],
      selectedColors: [],
      selectedBrands: [],
      minRating: '',
      minDiscount: '',
    });
    setCurrentPage(1);
    toast.info('All filters reset');
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

  const SORT_OPTIONS = [
    { label: 'Popularity (Customer Favorites)', value: 'popularity', icon: Sparkles, desc: 'Based on trending orders' },
    { label: 'Price -- Low to High (₹ Sasta Pehle)', value: 'price_asc', icon: ArrowUpDown, desc: 'Affordable & budget friendly' },
    { label: 'Price -- High to Low (₹ Premium First)', value: 'price_desc', icon: ArrowUpDown, desc: 'Luxury designer collections' },
    { label: 'Customer Rating (4.5★ & Above)', value: 'rating', icon: Star, desc: 'Top rated outfits from buyers' },
    { label: 'Discount % (Highest Savings 🔥)', value: 'discount', icon: Flame, desc: 'Maximum 50%+ OFF deals' },
    { label: 'Newest Arrivals (2026 Edition 🆕)', value: 'newest', icon: Tag, desc: 'Recently added fashion outfits' },
  ];

  const COLOR_OPTIONS = [
    { label: 'Burgundy', hex: '#800020' },
    { label: 'Ruby Red', hex: '#E0115F' },
    { label: 'Emerald Green', hex: '#1B8A5A' },
    { label: 'Midnight Navy', hex: '#1A2A6C' },
    { label: 'Sage Floral / Green', hex: '#87A96B' },
    { label: 'Charcoal Grey', hex: '#36454F' },
    { label: 'Lavender', hex: '#9B59B6' },
    { label: 'Gold Mustard', hex: '#D4AC0D' },
    { label: 'Blush Pink', hex: '#FF69B4' },
    { label: 'Peach Pink', hex: '#F39C12' },
    { label: 'Olive Green', hex: '#556B2F' },
    { label: 'Ivory White', hex: '#ECEFF1' },
    { label: 'Indigo Blue', hex: '#2980B9' },
  ];

  const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', '2-3 Y', '4-5 Y', '6-7 Y', '8-9 Y'];
  const BRAND_OPTIONS = ['Kaira Ethnic', 'UrbanThread', 'Aura Studio', 'Royal Heritage'];
  const PRICE_PRESETS = [
    { label: 'Under ₹999', min: '0', max: '999' },
    { label: '₹1,000 - ₹1,999', min: '1000', max: '1999' },
    { label: '₹2,000 - ₹3,499', min: '2000', max: '3499' },
    { label: '₹3,500 & Above', min: '3500', max: '' },
  ];

  const activeFiltersCount = [
    (filters.priceMin || filters.priceMax) ? 1 : 0,
    filters.selectedSizes?.length || 0,
    filters.selectedColors?.length || 0,
    filters.selectedBrands?.length || 0,
    filters.minRating ? 1 : 0,
    filters.minDiscount ? 1 : 0,
    filters.category !== 'All' ? 1 : 0,
    search ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const customerQuickCategories = [
    { label: '✨ All Outfits', value: 'All' },
    { label: '👧 Girls & Women', value: 'Girls' },
    { label: '👦 Boys & Men', value: 'Boys' },
    { label: '👶 Kids', value: 'Kids' },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto pb-16">
      {/* 1. Page Header (Role-Aware) */}
      {isCustomer ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-surface-border shadow-soft-xs">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div
            onClick={() => handleFilterChange('stockStatus', 'All')}
            className={`p-2.5 sm:p-3.5 rounded-xl border cursor-pointer transition-all ${
              filters.stockStatus === 'All'
                ? 'bg-brand-50/50 border-brand-300 shadow-soft-sm'
                : 'bg-white border-surface-border hover:bg-surface-muted'
            }`}
          >
            <p className="text-[10px] sm:text-[11px] font-bold text-slateText-muted uppercase truncate">Total Catalog</p>
            <p className="text-lg sm:text-xl font-black text-slateText-main mt-0.5">{stats.totalProducts || products.length}</p>
          </div>

          <div
            onClick={() => handleFilterChange('stockStatus', 'inStock')}
            className={`p-2.5 sm:p-3.5 rounded-xl border cursor-pointer transition-all ${
              filters.stockStatus === 'inStock'
                ? 'bg-emeraldGreen-50/50 border-emeraldGreen-500/40 shadow-soft-sm'
                : 'bg-white border-surface-border hover:bg-surface-muted'
            }`}
          >
            <p className="text-[10px] sm:text-[11px] font-bold text-emeraldGreen-600 uppercase truncate">In Stock</p>
            <p className="text-lg sm:text-xl font-black text-slateText-main mt-0.5">{stats.inStock}</p>
          </div>

          <div
            onClick={() => handleFilterChange('stockStatus', 'lowStock')}
            className={`p-2.5 sm:p-3.5 rounded-xl border cursor-pointer transition-all ${
              filters.stockStatus === 'lowStock'
                ? 'bg-warm-50/50 border-warm-300 shadow-soft-sm'
                : 'bg-white border-surface-border hover:bg-surface-muted'
            }`}
          >
            <p className="text-[10px] sm:text-[11px] font-bold text-warm-600 uppercase truncate">Low Stock Alert</p>
            <p className="text-lg sm:text-xl font-black text-warm-700 mt-0.5">{stats.lowStock}</p>
          </div>

          <div
            onClick={() => handleFilterChange('stockStatus', 'outOfStock')}
            className={`p-2.5 sm:p-3.5 rounded-xl border cursor-pointer transition-all ${
              filters.stockStatus === 'outOfStock'
                ? 'bg-roseDanger-50/50 border-roseDanger-500/40 shadow-soft-sm'
                : 'bg-white border-surface-border hover:bg-surface-muted'
            }`}
          >
            <p className="text-[10px] sm:text-[11px] font-bold text-roseDanger-500 uppercase truncate">Out of Stock</p>
            <p className="text-lg sm:text-xl font-black text-roseDanger-500 mt-0.5">{stats.outOfStock}</p>
          </div>
        </div>
      )}

      {/* 3. Search Bar */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={isCustomer ? "Search kurtas, dresses, suits, shirts..." : "Search by name, SKU, tags or brand..."}
            className="flex-1 min-w-0"
          />

          {!isCustomer && (
            <div className="flex items-center gap-2 shrink-0">
              {/* View Mode Toggle for Admin */}
              <div className="flex items-center bg-surface-muted p-1 rounded-xl border border-surface-border">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
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
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
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

        {/* 4. Flipkart-Style Sort & Filter Quick Toolbar (Mobile & Desktop) */}
        {isCustomer && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* Main Full Filter Suite Button */}
            <button
              type="button"
              onClick={() => setShowFilterModal(true)}
              className={`px-3.5 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 shadow-soft-xs transition-all shrink-0 cursor-pointer active:scale-95 border ${
                activeFiltersCount > 0
                  ? 'bg-brand-600 text-white border-brand-600 shadow-purple-glow'
                  : 'bg-white text-slateText-main hover:bg-surface-muted border-brand-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-brand-700 text-[10px] font-black flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Main Sort Button Trigger */}
            <button
              type="button"
              onClick={() => setShowSortModal(true)}
              className="px-3.5 py-2 rounded-2xl bg-white border border-[#E7E0F7] text-slateText-main font-bold text-xs flex items-center gap-1.5 shadow-soft-xs hover:bg-surface-muted transition-all shrink-0 cursor-pointer active:scale-95"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-600" />
              <span>Sort: {SORT_OPTIONS.find(o => o.value === filters.sortBy)?.label.split('(')[0].trim() || 'Popularity'}</span>
              <span className="text-[10px] text-slateText-muted font-bold">▾</span>
            </button>

            {/* Quick Price: Under ₹999 */}
            <button
              type="button"
              onClick={() => {
                if (filters.priceMax === '999') {
                  handleFilterChange('priceMax', '');
                } else {
                  handleFilterChange('priceMax', '999');
                  toast.success('Filtered: Under ₹999 💰');
                }
              }}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 border active:scale-95 ${
                filters.priceMax === '999'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-soft-xs font-black'
                  : 'bg-white text-slate-700 hover:bg-surface-muted border-surface-border'
              }`}
            >
              <span>₹ Under 999</span>
            </button>

            {/* Quick Discount: 50% OFF */}
            <button
              type="button"
              onClick={() => {
                if (filters.minDiscount === '50') {
                  handleFilterChange('minDiscount', '');
                } else {
                  handleFilterChange('minDiscount', '50');
                  toast.success('Filtered: 50%+ Mega Discount Deals 🔥');
                }
              }}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 border active:scale-95 ${
                filters.minDiscount === '50'
                  ? 'bg-coral-50 border-coral-400 text-coral-600 shadow-soft-xs font-black'
                  : 'bg-white text-slate-700 hover:bg-surface-muted border-surface-border'
              }`}
            >
              <span>🔥 50%+ OFF</span>
            </button>

            {/* Quick Rating: 4.5★ */}
            <button
              type="button"
              onClick={() => {
                if (filters.minRating === '4.5') {
                  handleFilterChange('minRating', '');
                } else {
                  handleFilterChange('minRating', '4.5');
                  toast.success('Filtered: 4.5★ & Above Rated ⭐');
                }
              }}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 border active:scale-95 ${
                filters.minRating === '4.5'
                  ? 'bg-amber-50 border-amber-400 text-amber-700 shadow-soft-xs font-black'
                  : 'bg-white text-slate-700 hover:bg-surface-muted border-surface-border'
              }`}
            >
              <span>⭐ 4.5★ & Above</span>
            </button>

            {/* Clear Filters Chip (if any active) */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-2.5 py-2 rounded-2xl bg-roseDanger-50 border border-roseDanger-200 text-roseDanger-600 font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer hover:bg-roseDanger-100 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        )}

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

      {/* 5. Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
          <SkeletonLoader type="product" count={8} />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No Outfits Found"
          description="We couldn't find any products matching your active filters. Try resetting filters or adjusting search keywords."
          actionText="Reset All Filters"
          actionIcon={RotateCcw}
          onAction={handleResetFilters}
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
                  <div
                    className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] bg-surface-muted mb-3 cursor-pointer"
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
        /* Admin List View */
        <div className="space-y-2.5">
          {/* Mobile Card List (Visible only on mobile) */}
          <div className="block sm:hidden space-y-2.5">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="commerce-card p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-12 h-12 rounded-xl object-cover border border-surface-border shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slateText-main truncate">{product.name}</p>
                    <p className="text-[10px] text-slateText-muted">{product.brand} • {product.category}</p>
                    <p className="text-xs font-black text-slateText-main mt-0.5">{formatCurrency(product.price)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <StatusBadge status={product.status} size="sm" />
                  <span className="text-[10px] font-bold text-slate-500">{product.stock} in stock</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden sm:block commerce-card overflow-hidden">
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
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalCount}
          pageSize={12}
        />
      )}

      {/* 6. Flipkart / Myntra Comprehensive Split-Pane Filter Modal */}
      {showFilterModal && (
        <div
          className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-fade-in flex items-end sm:items-stretch sm:justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowFilterModal(false);
          }}
        >
          <div
            className="w-full sm:w-[500px] md:w-[540px] bg-white rounded-t-3xl sm:rounded-none sm:rounded-l-3xl shadow-2xl border-t sm:border-t-0 sm:border-l border-[#E7E0F7] overflow-hidden animate-slide-left flex flex-col h-[90vh] sm:h-full justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Filter Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E7E0F7] bg-[#F4F0FD] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-soft-xs">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slateText-main">
                    Filter & Refine Outfits
                  </h3>
                  <p className="text-xs text-slateText-muted">
                    {totalCount} outfits match your criteria
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-black text-brand-600 hover:text-brand-700 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowFilterModal(false)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center shadow-soft-xs cursor-pointer active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Split-Pane Filter Body */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Column: Filter Categories */}
              <div className="w-32 sm:w-44 bg-slate-50 border-r border-[#E7E0F7] overflow-y-auto shrink-0 divide-y divide-slate-100">
                {[
                  { key: 'price', label: 'Price Range', icon: CircleDollarSign, badge: (filters.priceMin || filters.priceMax) ? '1' : null },
                  { key: 'size', label: 'Size', icon: Ruler, badge: filters.selectedSizes?.length || null },
                  { key: 'color', label: 'Color', icon: Palette, badge: filters.selectedColors?.length || null },
                  { key: 'brand', label: 'Brand', icon: ShieldCheck, badge: filters.selectedBrands?.length || null },
                  { key: 'discount', label: 'Discount %', icon: BadgePercent, badge: filters.minDiscount ? '1' : null },
                  { key: 'rating', label: 'Customer Rating', icon: Star, badge: filters.minRating ? '1' : null },
                ].map((item) => {
                  const isActive = activeFilterTab === item.key;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveFilterTab(item.key)}
                      className={`w-full text-left p-3 sm:p-3.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-white text-brand-700 font-black border-l-4 border-brand-600 shadow-soft-xs'
                          : 'text-slateText-muted hover:text-slateText-main hover:bg-slate-100/60 font-semibold'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-black flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Dynamic Filter Controls */}
              <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
                {/* 1. PRICE TAB */}
                {activeFilterTab === 'price' && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-xs font-black text-slateText-main uppercase tracking-wider">
                      Select Price Budget
                    </h4>

                    {/* Presets */}
                    <div className="grid grid-cols-1 gap-2">
                      {PRICE_PRESETS.map((preset) => {
                        const isSelected = filters.priceMin === preset.min && filters.priceMax === preset.max;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                handleFilterChange('priceMin', '');
                                handleFilterChange('priceMax', '');
                              } else {
                                handleFilterChange('priceMin', preset.min);
                                handleFilterChange('priceMax', preset.max);
                              }
                            }}
                            className={`p-3 rounded-2xl border text-xs font-bold text-left flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-50/80 border-brand-500 text-brand-700 font-black shadow-soft-xs'
                                : 'bg-white border-surface-border text-slateText-main hover:bg-slate-50'
                            }`}
                          >
                            <span>{preset.label}</span>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-brand-600 bg-brand-600' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Range Inputs */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <p className="text-[11px] font-bold text-slateText-muted">Or Enter Custom Price (₹)</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min ₹"
                          value={filters.priceMin}
                          onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
                        />
                        <span className="text-slate-400 text-xs font-bold">to</span>
                        <input
                          type="number"
                          placeholder="Max ₹"
                          value={filters.priceMax}
                          onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SIZE TAB */}
                {activeFilterTab === 'size' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slateText-main uppercase tracking-wider">
                        Available Sizes
                      </h4>
                      {filters.selectedSizes?.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleFilterChange('selectedSizes', [])}
                          className="text-[11px] text-brand-600 font-bold hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SIZE_OPTIONS.map((size) => {
                        const isSelected = filters.selectedSizes?.includes(size);
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => toggleArrayFilter('selectedSizes', size)}
                            className={`p-3 rounded-2xl border text-xs font-black flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-600 text-white border-brand-600 shadow-purple-glow'
                                : 'bg-white border-surface-border text-slateText-main hover:bg-slate-50'
                            }`}
                          >
                            <span>{size}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. COLOR TAB */}
                {activeFilterTab === 'color' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slateText-main uppercase tracking-wider">
                        Outfit Colors
                      </h4>
                      {filters.selectedColors?.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleFilterChange('selectedColors', [])}
                          className="text-[11px] text-brand-600 font-bold hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {COLOR_OPTIONS.map((color) => {
                        const isSelected = filters.selectedColors?.includes(color.label);
                        return (
                          <label
                            key={color.label}
                            onClick={() => toggleArrayFilter('selectedColors', color.label)}
                            className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-50/80 border-brand-500 text-brand-700 font-black'
                                : 'bg-white border-surface-border hover:bg-slate-50 text-slateText-main font-semibold text-xs'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className="w-5 h-5 rounded-full border border-slate-300 shrink-0 shadow-xs"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span className="text-xs">{color.label}</span>
                            </div>

                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'}`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. BRAND TAB */}
                {activeFilterTab === 'brand' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slateText-main uppercase tracking-wider">
                        Designer Brands
                      </h4>
                      {filters.selectedBrands?.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleFilterChange('selectedBrands', [])}
                          className="text-[11px] text-brand-600 font-bold hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {BRAND_OPTIONS.map((brand) => {
                        const isSelected = filters.selectedBrands?.includes(brand);
                        return (
                          <label
                            key={brand}
                            onClick={() => toggleArrayFilter('selectedBrands', brand)}
                            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-50/80 border-brand-500 text-brand-700 font-black shadow-soft-xs'
                                : 'bg-white border-surface-border hover:bg-slate-50 text-slateText-main text-xs font-bold'
                            }`}
                          >
                            <span>{brand}</span>
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'}`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. DISCOUNT TAB */}
                {activeFilterTab === 'discount' && (
                  <div className="space-y-3 animate-fade-in">
                    <h4 className="text-xs font-black text-slateText-main uppercase tracking-wider">
                      Minimum Discount Offer
                    </h4>

                    <div className="space-y-2">
                      {[
                        { label: '50% or more (🔥 Mega Sale)', val: '50' },
                        { label: '40% or more', val: '40' },
                        { label: '30% or more', val: '30' },
                        { label: '20% or more', val: '20' },
                      ].map((disc) => {
                        const isSelected = filters.minDiscount === disc.val;
                        return (
                          <label
                            key={disc.val}
                            onClick={() => handleFilterChange('minDiscount', isSelected ? '' : disc.val)}
                            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-coral-50 border-coral-500 text-coral-700 font-black shadow-soft-xs'
                                : 'bg-white border-surface-border hover:bg-slate-50 text-slateText-main text-xs font-bold'
                            }`}
                          >
                            <span>{disc.label}</span>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-coral-600 bg-coral-600' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 6. RATING TAB */}
                {activeFilterTab === 'rating' && (
                  <div className="space-y-3 animate-fade-in">
                    <h4 className="text-xs font-black text-slateText-main uppercase tracking-wider">
                      Customer Ratings
                    </h4>

                    <div className="space-y-2">
                      {[
                        { label: '4.5★ & Above (Top Quality)', val: '4.5' },
                        { label: '4.0★ & Above', val: '4.0' },
                        { label: '3.5★ & Above', val: '3.5' },
                      ].map((rate) => {
                        const isSelected = filters.minRating === rate.val;
                        return (
                          <label
                            key={rate.val}
                            onClick={() => handleFilterChange('minRating', isSelected ? '' : rate.val)}
                            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-amber-50 border-amber-500 text-amber-800 font-black shadow-soft-xs'
                                : 'bg-white border-surface-border hover:bg-slate-50 text-slateText-main text-xs font-bold'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                              <span>{rate.label}</span>
                            </span>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-amber-600 bg-amber-600' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Filter Modal Footer */}
            <div className="p-4 border-t border-[#E7E0F7] bg-[#F4F0FD] flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2.5 rounded-2xl bg-white border border-[#E7E0F7] text-slateText-main text-xs font-black hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowFilterModal(false);
                  toast.success(`Filters applied! Showing ${totalCount} outfits`);
                }}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-brand-600 to-[#7854F7] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-purple-glow hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <span>Apply Filters ({totalCount} Outfits)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Flipkart / Amazon Mobile Sort Bottom Sheet Modal */}
      {showSortModal && (
        <div
          className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-fade-in flex items-end sm:items-stretch sm:justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSortModal(false);
          }}
        >
          <div
            className="w-full sm:w-[420px] bg-white rounded-t-3xl sm:rounded-none sm:rounded-l-3xl shadow-2xl border-t sm:border-t-0 sm:border-l border-[#E7E0F7] overflow-hidden animate-slide-left flex flex-col max-h-[85vh] sm:max-h-full sm:h-full justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#E7E0F7] bg-[#F4F0FD] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white text-brand-600 flex items-center justify-center shadow-soft-xs">
                  <ArrowUpDown className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slateText-main uppercase tracking-wider">
                    Sort Outfits By
                  </h3>
                  <p className="text-[11px] text-slateText-muted">Select your preferred sorting criteria</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSortModal(false)}
                className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center shadow-soft-xs cursor-pointer active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Radio Options */}
            <div className="p-3 sm:p-4 space-y-1.5 overflow-y-auto divide-y divide-slate-100">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = filters.sortBy === opt.value;
                const IconComponent = opt.icon;
                return (
                  <label
                    key={opt.value}
                    onClick={() => {
                      handleFilterChange('sortBy', opt.value);
                      setShowSortModal(false);
                      toast.success(`Sorted by ${opt.label.split('(')[0].trim()}`);
                    }}
                    className={`pt-3 pb-3 px-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#F4F0FD]/80 text-brand-700 font-black shadow-soft-xs'
                        : 'hover:bg-slate-50 text-slateText-main'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-xs ${isSelected ? 'font-black text-brand-700' : 'font-bold text-slateText-main'}`}>
                          {opt.label}
                        </p>
                        <p className="text-[10px] text-slateText-muted mt-0.5">{opt.desc}</p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-brand-600 bg-brand-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
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
