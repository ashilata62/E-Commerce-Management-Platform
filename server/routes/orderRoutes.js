import express from 'express';
import {
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  createOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);
router.post('/:id/cancel', cancelOrder);

export default router;
