import { store } from '../services/dataStore.js';

// @desc Get all products with filters, search, sort, pagination
// @route GET /api/products
export const getProducts = async (req, res) => {
  try {
    let results = [...store.products];
    const {
      search,
      category,
      brand,
      status,
      stockStatus,
      minPrice,
      maxPrice,
      flashSale,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
    } = req.query;

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
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

    if (flashSale === 'true') {
      results = results.filter(p => p.flashSale);
    }

    if (stockStatus) {
      if (stockStatus === 'inStock') {
        results = results.filter(p => p.stock > p.lowStockThreshold);
      } else if (stockStatus === 'lowStock') {
        results = results.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0);
      } else if (stockStatus === 'outOfStock') {
        results = results.filter(p => p.stock === 0);
      }
    }

    if (minPrice) {
      results = results.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter(p => p.price <= Number(maxPrice));
    }

    // Sort
    results.sort((a, b) => {
      let valA = a[sortBy] ?? 0;
      let valB = b[sortBy] ?? 0;
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    const total = results.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginated = results.slice(startIndex, startIndex + Number(limit));

    res.json({
      success: true,
      count: paginated.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)) || 1,
      data: paginated,
      stats: {
        totalProducts: store.products.length,
        inStock: store.products.filter(p => p.stock > p.lowStockThreshold).length,
        lowStock: store.products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0).length,
        outOfStock: store.products.filter(p => p.stock === 0).length,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single product by ID
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = store.products.find(p => p._id === req.params.id || p.sku === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
};

// @desc Create new product
// @route POST /api/products
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = {
      _id: 'prd_' + Date.now(),
      name: productData.name || 'New Catalog Item',
      category: productData.category || 'Women',
      brand: productData.brand || 'Aura Studio',
      sku: productData.sku || `SKU-${Date.now().toString().slice(-6)}`,
      price: Number(productData.price) || 999,
      compareAtPrice: Number(productData.compareAtPrice) || Number(productData.price) * 1.5,
      costPrice: Number(productData.costPrice) || Math.round(Number(productData.price) * 0.4),
      stock: Number(productData.stock) || 50,
      lowStockThreshold: Number(productData.lowStockThreshold) || 10,
      rating: 4.8,
      reviewsCount: 0,
      salesCount: 0,
      revenue: 0,
      status: productData.status || 'Published',
      badge: productData.badge || 'New Arrival',
      description: productData.description || 'Modern premium commerce apparel and lifestyle product.',
      images: productData.images?.length ? productData.images : [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
      ],
      variants: productData.variants?.length ? productData.variants : [
        { size: 'M', color: 'Default', stock: 25, sku: `SKU-${Date.now().toString().slice(-4)}-M` },
        { size: 'L', color: 'Default', stock: 25, sku: `SKU-${Date.now().toString().slice(-4)}-L` },
      ],
      weight: productData.weight || '0.5 kg',
      dimensions: productData.dimensions || '30x20x5 cm',
      tags: productData.tags || ['new', 'featured'],
      flashSale: Boolean(productData.flashSale),
      soldPercent: 0,
      createdAt: new Date().toISOString(),
    };

    store.products.unshift(newProduct);
    res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Update product
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const index = store.products.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  store.products[index] = {
    ...store.products[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  res.json({ success: true, message: 'Product updated successfully', data: store.products[index] });
};

// @desc Delete product
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  const index = store.products.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const deleted = store.products.splice(index, 1);
  res.json({ success: true, message: 'Product removed from catalog', data: deleted[0] });
};

// @desc Get categories
// @route GET /api/products/categories/all
export const getCategories = async (req, res) => {
  res.json({ success: true, data: store.categories });
};

// @desc Create category
// @route POST /api/products/categories
export const createCategory = async (req, res) => {
  const newCategory = {
    _id: 'cat_' + Date.now(),
    name: req.body.name || 'New Category',
    slug: (req.body.name || 'category').toLowerCase().replace(/\s+/g, '-'),
    itemCount: 0,
    image: req.body.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    description: req.body.description || '',
    status: 'Active',
    featured: true,
  };
  store.categories.push(newCategory);
  res.status(201).json({ success: true, data: newCategory });
};

// @desc Get brands
// @route GET /api/products/brands/all
export const getBrands = async (req, res) => {
  res.json({ success: true, data: store.brands });
};

// @desc Create brand
// @route POST /api/products/brands
export const createBrand = async (req, res) => {
  const newBrand = {
    _id: 'br_' + Date.now(),
    name: req.body.name || 'New Brand',
    logo: req.body.logo || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80',
    productsCount: 0,
    status: 'Active',
  };
  store.brands.push(newBrand);
  res.status(201).json({ success: true, data: newBrand });
};
