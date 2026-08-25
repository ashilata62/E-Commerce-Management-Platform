import { localStore } from './mockDataStore';

export const productService = {
  getProducts: async (params = {}) => {
    let results = [...localStore.data.products];
    const {
      search,
      category,
      brand,
      status,
      stockStatus,
      flashSale,
      priceMin,
      priceMax,
      selectedSizes,
      selectedColors,
      selectedBrands,
      minRating,
      minDiscount
    } = params;

    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Category / Gender Tabs
    if (category && category !== 'All') {
      const catKey = category.toLowerCase().trim();

      if (catKey === 'girls' || catKey.includes('girl') || catKey.includes('women')) {
        results = results.filter(p => p.targetGender === 'girls' || p.targetGender === 'kids_girl');
      } else if (catKey === 'boys' || catKey.includes('boy') || catKey.includes('men')) {
        results = results.filter(p => p.targetGender === 'boys' || p.targetGender === 'kids_boy');
      } else if (catKey === 'kids' || catKey.includes('kid') || catKey.includes('bachhe')) {
        results = results.filter(p => p.category === 'Kids Collection' || p.targetGender === 'kids_boy' || p.targetGender === 'kids_girl');
      } else {
        results = results.filter(p => p.category.toLowerCase() === catKey);
      }
    }

    // 3. Price Range Filter
    if (priceMin !== undefined && priceMin !== null && priceMin !== '') {
      results = results.filter(p => Number(p.price) >= Number(priceMin));
    }
    if (priceMax !== undefined && priceMax !== null && priceMax !== '') {
      results = results.filter(p => Number(p.price) <= Number(priceMax));
    }

    // 4. Size Filter
    if (selectedSizes && selectedSizes.length > 0 && !selectedSizes.includes('All')) {
      results = results.filter(p => {
        if (!p.sizes || p.sizes.length === 0) return true;
        return selectedSizes.some(s => p.sizes.includes(s) || (s === 'Free Size' && p.sizes.includes('Free Size')));
      });
    }

    // 5. Color Filter
    if (selectedColors && selectedColors.length > 0 && !selectedColors.includes('All')) {
      results = results.filter(p => {
        const productColors = (p.variants || []).map(v => (v.color || '').toLowerCase());
        const desc = (p.description || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        return selectedColors.some(c => {
          const cLower = c.toLowerCase();
          return productColors.some(pc => pc.includes(cLower)) || desc.includes(cLower) || pName.includes(cLower);
        });
      });
    }

    // 6. Brand Filter
    if (brand && brand !== 'All') {
      results = results.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (selectedBrands && selectedBrands.length > 0 && !selectedBrands.includes('All')) {
      results = results.filter(p => selectedBrands.includes(p.brand));
    }

    // 7. Rating Filter
    if (minRating) {
      results = results.filter(p => (Number(p.rating) || 0) >= Number(minRating));
    }

    // 8. Discount Filter
    if (minDiscount) {
      results = results.filter(p => {
        if (!p.compareAtPrice || p.compareAtPrice <= p.price) return false;
        const discountPercent = Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
        return discountPercent >= Number(minDiscount);
      });
    }

    // 9. Status and Stock Status
    if (status && status !== 'All') {
      results = results.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (flashSale) {
      results = results.filter(p => p.flashSale);
    }
    if (stockStatus) {
      if (stockStatus === 'inStock') results = results.filter(p => p.stock > 0);
      else if (stockStatus === 'lowStock') results = results.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0);
      else if (stockStatus === 'outOfStock') results = results.filter(p => p.stock === 0);
    }

    // Dynamic Sorting Algorithms
    const { sortBy = 'popularity', sortOrder = 'desc' } = params;
    if (sortBy) {
      results.sort((a, b) => {
        if (sortBy === 'price_asc') {
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        }
        if (sortBy === 'price_desc') {
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        }
        if (sortBy === 'rating') {
          return (Number(b.rating) || 0) - (Number(a.rating) || 0);
        }
        if (sortBy === 'discount') {
          const discA = a.compareAtPrice ? ((a.compareAtPrice - a.price) / a.compareAtPrice) : 0;
          const discB = b.compareAtPrice ? ((b.compareAtPrice - b.price) / b.compareAtPrice) : 0;
          return discB - discA;
        }
        if (sortBy === 'newest') {
          return (new Date(b.createdAt || '2026-05-01')) - (new Date(a.createdAt || '2026-05-01'));
        }
        if (sortBy === 'price') {
          return sortOrder === 'asc'
            ? (Number(a.price) || 0) - (Number(b.price) || 0)
            : (Number(b.price) || 0) - (Number(a.price) || 0);
        }
        // Default Popularity / Sales Count
        return (Number(b.salesCount) || 0) - (Number(a.salesCount) || 0);
      });
    }

    return {
      success: true,
      count: results.length,
      total: results.length,
      totalPages: 1,
      data: results,
      stats: {
        totalProducts: localStore.data.products.length,
        inStock: localStore.data.products.filter(p => p.stock > p.lowStockThreshold).length,
        lowStock: localStore.data.products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0).length,
        outOfStock: localStore.data.products.filter(p => p.stock === 0).length,
      }
    };
  },

  getProductById: async (id) => {
    const product = localStore.data.products.find(p => p._id === id || p.sku === id);
    if (!product) return { success: false, message: 'Not found' };
    return { success: true, data: product };
  },

  createProduct: async (productData) => {
    const newProduct = {
      _id: 'prd_' + Date.now(),
      ...productData,
      rating: 4.8,
      reviewsCount: 0,
      salesCount: 0,
      revenue: 0,
      soldPercent: 0,
      createdAt: new Date().toISOString(),
    };
    localStore.data.products.unshift(newProduct);
    return { success: true, data: newProduct };
  },

  updateProduct: async (id, productData) => {
    const idx = localStore.data.products.findIndex(p => p._id === id);
    if (idx !== -1) {
      localStore.data.products[idx] = { ...localStore.data.products[idx], ...productData };
      return { success: true, data: localStore.data.products[idx] };
    }
    return { success: false, message: 'Not found' };
  },

  deleteProduct: async (id) => {
    const idx = localStore.data.products.findIndex(p => p._id === id);
    if (idx !== -1) {
      const deleted = localStore.data.products.splice(idx, 1);
      return { success: true, data: deleted[0] };
    }
    return { success: false, message: 'Not found' };
  },

  getCategories: async () => {
    return { success: true, data: localStore.data.categories };
  },

  createCategory: async (catData) => {
    const newCat = {
      _id: 'cat_' + Date.now(),
      slug: (catData.name || 'category').toLowerCase().replace(/\s+/g, '-'),
      itemCount: 0,
      ...catData,
    };
    localStore.data.categories.push(newCat);
    return { success: true, data: newCat };
  },

  getBrands: async () => {
    return { success: true, data: localStore.data.brands };
  },

  createBrand: async (brandData) => {
    const newBrand = {
      _id: 'br_' + Date.now(),
      productsCount: 0,
      ...brandData,
    };
    localStore.data.brands.push(newBrand);
    return { success: true, data: newBrand };
  },
};
