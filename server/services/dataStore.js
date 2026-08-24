import {
  initialUsers,
  initialCategories,
  initialBrands,
  initialProducts,
  initialOrders,
  initialCustomers,
  initialCampaigns,
  initialCoupons,
  initialAffiliates,
  initialReviews,
  initialStoreSettings,
  initialAnalytics,
} from '../data/seedData.js';

// In-Memory Data Storage with full reactivity
class DataStore {
  constructor() {
    this.users = JSON.parse(JSON.stringify(initialUsers));
    this.categories = JSON.parse(JSON.stringify(initialCategories));
    this.brands = JSON.parse(JSON.stringify(initialBrands));
    this.products = JSON.parse(JSON.stringify(initialProducts));
    this.orders = JSON.parse(JSON.stringify(initialOrders));
    this.customers = JSON.parse(JSON.stringify(initialCustomers));
    this.campaigns = JSON.parse(JSON.stringify(initialCampaigns));
    this.coupons = JSON.parse(JSON.stringify(initialCoupons));
    this.affiliates = JSON.parse(JSON.stringify(initialAffiliates));
    this.reviews = JSON.parse(JSON.stringify(initialReviews));
    this.storeSettings = JSON.parse(JSON.stringify(initialStoreSettings));
    this.analytics = JSON.parse(JSON.stringify(initialAnalytics));
  }

  reset() {
    this.constructor();
  }
}

export const store = new DataStore();
