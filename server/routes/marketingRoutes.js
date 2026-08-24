import express from 'express';
import {
  getCampaigns,
  createCampaign,
  getCoupons,
  createCoupon,
  deleteCoupon,
  getAffiliates,
  createAffiliate,
  getReviews,
  updateReviewStatus,
} from '../controllers/marketingController.js';

const router = express.Router();

router.get('/campaigns', getCampaigns);
router.post('/campaigns', createCampaign);

router.get('/coupons', getCoupons);
router.post('/coupons', createCoupon);
router.delete('/coupons/:id', deleteCoupon);

router.get('/affiliates', getAffiliates);
router.post('/affiliates', createAffiliate);

router.get('/reviews', getReviews);
router.put('/reviews/:id', updateReviewStatus);

export default router;
