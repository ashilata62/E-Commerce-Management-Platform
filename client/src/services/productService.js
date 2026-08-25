import { localStore } from './mockDataStore';

const STORAGE_KEY = 'kiaan_products_catalog';

const CATEGORIES_KEY = 'kiaan_categories';

const BRANDS_KEY = 'kiaan_brands_catalog';

const getStoredBrands = () => {
  try {
    const saved = localStorage.getItem(BRANDS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localStore.data.brands = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.error('LocalStorage read error:', e);
  }
  localStorage.setItem(BRANDS_KEY, JSON.stringify(localStore.data.brands));
  return localStore.data.brands;
};

const saveStoredBrands = (brands) => {
  localStore.data.brands = brands;
  try {
    localStorage.setItem(BRANDS_KEY, JSON.stringify(brands));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};


const getStoredCategories = () => {
  try {
    const saved = localStorage.getItem(CATEGORIES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localStore.data.categories = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.error('LocalStorage read error:', e);
  }
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(localStore.data.categories));
  return localStore.data.categories;
};

const saveStoredCategories = (categories) => {
  localStore.data.categories = categories;
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};


// Helper to get synced products
const getStoredProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localStore.data.products = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.error('LocalStorage read error:', e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localStore.data.products));
  return localStore.data.products;
};

// Helper to save products
const saveStoredProducts = (products) => {
  localStore.data.products = products;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};

export const productService = {
  getProducts: async (params = {}) => {
    let results = getStoredProducts();
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
      results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
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
      if (stockStatus === 'inStock') results = results.filter(p => p.stock > (p.lowStockThreshold || 5));
      else if (stockStatus === 'lowStock') results = results.filter(p => p.stock <= (p.lowStockThreshold || 5) && p.stock > 0);
      else if (stockStatus === 'outOfStock') results = results.filter(p => p.stock === 0);
    }

    const currentList = localStore.data.products;
    return {
      success: true,
      count: results.length,
      total: results.length,
      totalPages: 1,
      data: results,
      stats: {
        totalProducts: currentList.length,
        inStock: currentList.filter(p => p.stock > (p.lowStockThreshold || 5)).length,
        lowStock: currentList.filter(p => p.stock <= (p.lowStockThreshold || 5) && p.stock > 0).length,
        outOfStock: currentList.filter(p => p.stock === 0).length,
      }
    };
  },

  getProductById: async (id) => {
    const products = getStoredProducts();
    const product = products.find(p => p._id === id || p.sku === id);
    if (!product) return { success: false, message: 'Not found' };
    return { success: true, data: product };
  },

  createProduct: async (productData) => {
    const products = getStoredProducts();
    const newProduct = {
      _id: 'prd_' + Date.now(),
      name: productData.name || 'New Catalog Product',
      category: productData.category || "Women's Ethnic",
      brand: productData.brand || "Kaira Ethnic",
      sku: productData.sku || `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      price: Number(productData.price) || 1999,
      compareAtPrice: Number(productData.compareAtPrice) || 2999,
      costPrice: Number(productData.costPrice) || 800,
      stock: Number(productData.stock) || 50,
      lowStockThreshold: Number(productData.lowStockThreshold) || 10,
      badge: productData.badge || 'New Arrival',
      status: productData.status || 'Published',
      description: productData.description || '',
      images: (productData.images && productData.images.length > 0)
        ? productData.images
        : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'],
      variants: productData.variants || [],
      rating: 5.0,
      reviewsCount: 1,
      salesCount: 0,
      revenue: 0,
      soldPercent: 0,
      createdAt: new Date().toISOString(),
    };

    const updated = [newProduct, ...products];
    saveStoredProducts(updated);
    return { success: true, data: newProduct };
  },

  updateProduct: async (id, productData) => {
    const products = getStoredProducts();
    const idx = products.findIndex(p => p._id === id);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...productData };
      saveStoredProducts(products);
      return { success: true, data: products[idx] };
    }
    return { success: false, message: 'Not found' };
  },

  deleteProduct: async (id) => {
    const products = getStoredProducts();
    const idx = products.findIndex(p => p._id === id);
    if (idx !== -1) {
      const deleted = products.splice(idx, 1);
      saveStoredProducts(products);
      return { success: true, data: deleted[0] };
    }
    return { success: false, message: 'Not found' };
  },

  getCategories: async () => {
    const cats = getStoredCategories();
    return { success: true, data: cats };
  },

  createCategory: async (catData) => {
    const categories = getStoredCategories();
    const defaultImg = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80';
    const newCat = {
      _id: 'cat_' + Date.now(),
      slug: (catData.name || 'category').toLowerCase().replace(/\s+/g, '-'),
      name: catData.name,
      image: (catData.image && catData.image.trim()) ? catData.image.trim() : defaultImg,
      description: catData.description || 'Curated clothing, styles, and essentials for modern lifestyle shoppers.',
      itemCount: catData.itemCount || 0,
    };
    const updated = [...categories, newCat];
    saveStoredCategories(updated);
    return { success: true, data: newCat };
  },

  getBrands: async () => {
    const brands = getStoredBrands();
    return { success: true, data: brands };
  },

  createBrand: async (brandData) => {
    const brands = getStoredBrands();
    const newBrand = {
      _id: 'br_' + Date.now(),
      logo: brandData.logo || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80',
      productsCount: 0,
      ...brandData,
    };
    const updated = [...brands, newBrand];
    saveStoredBrands(updated);
    return { success: true, data: newBrand };
  },
};
