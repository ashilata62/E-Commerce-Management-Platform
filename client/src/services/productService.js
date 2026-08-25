import { localStore } from './mockDataStore';

export const productService = {
  getProducts: async (params = {}) => {
    let results = [...localStore.data.products];
    const { search, category, brand, status, stockStatus, flashSale } = params;

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
      );
    }
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
    if (brand && brand !== 'All') {
      results = results.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
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
