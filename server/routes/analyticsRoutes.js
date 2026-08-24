import express from 'express';
import {
  getAnalyticsOverview,
  getProductAnalytics,
  getCustomerAnalytics,
  getReportsData,
} from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/overview', getAnalyticsOverview);
router.get('/products', getProductAnalytics);
router.get('/customers', getCustomerAnalytics);
router.get('/reports', getReportsData);

export default router;
