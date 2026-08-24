import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  getBrands,
  createBrand,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/categories/all', getCategories);
router.post('/categories', createCategory);

router.get('/brands/all', getBrands);
router.post('/brands', createBrand);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
