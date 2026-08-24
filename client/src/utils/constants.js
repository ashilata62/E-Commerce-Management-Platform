export const ORDER_STATUSES = [
  'All',
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Returned',
];

export const PRODUCT_CATEGORIES = [
  'All',
  'Women',
  'Men',
  'Kids',
  'Footwear',
  'Beauty',
  'Accessories',
];

export const PRODUCT_BRANDS = [
  'All',
  'Aura Studio',
  'UrbanThread',
  'Kaira Ethnic',
  'Zenith Stride',
  'Veda Botanicals',
];

export const CUSTOMER_SEGMENTS = [
  'All',
  'VIP',
  'New',
  'Returning',
  'At Risk',
  'Inactive',
];

export const STATUS_COLORS = {
  // Order & Payment statuses
  Delivered: { bg: 'bg-emeraldGreen-50', text: 'text-emeraldGreen-500', border: 'border-emeraldGreen-500/20', dot: 'bg-emeraldGreen-500' },
  Paid: { bg: 'bg-emeraldGreen-50', text: 'text-emeraldGreen-500', border: 'border-emeraldGreen-500/20', dot: 'bg-emeraldGreen-500' },
  Shipped: { bg: 'bg-brand-50', text: 'text-brand-600', border: 'border-brand-300', dot: 'bg-brand-500' },
  Processing: { bg: 'bg-warm-50', text: 'text-warm-700', border: 'border-warm-300', dot: 'bg-warm-500' },
  Confirmed: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', dot: 'bg-blue-500' },
  Pending: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500' },
  'Pending (COD)': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  Cancelled: { bg: 'bg-roseDanger-50', text: 'text-roseDanger-500', border: 'border-roseDanger-500/20', dot: 'bg-roseDanger-500' },
  Refunded: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300', dot: 'bg-gray-400' },
  Returned: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', dot: 'bg-orange-500' },

  // Product statuses
  Published: { bg: 'bg-emeraldGreen-50', text: 'text-emeraldGreen-500', border: 'border-emeraldGreen-500/20', dot: 'bg-emeraldGreen-500' },
  Draft: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300', dot: 'bg-gray-400' },
  Archived: { bg: 'bg-roseDanger-50', text: 'text-roseDanger-500', border: 'border-roseDanger-500/20', dot: 'bg-roseDanger-500' },

  // Customer segments
  VIP: { bg: 'bg-brand-50', text: 'text-brand-600', border: 'border-brand-300', dot: 'bg-brand-500' },
  New: { bg: 'bg-coral-50', text: 'text-coral-600', border: 'border-coral-300', dot: 'bg-coral-500' },
  Returning: { bg: 'bg-emeraldGreen-50', text: 'text-emeraldGreen-600', border: 'border-emeraldGreen-200', dot: 'bg-emeraldGreen-500' },
  'At Risk': { bg: 'bg-warm-50', text: 'text-warm-700', border: 'border-warm-300', dot: 'bg-warm-500' },
  Inactive: { bg: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-200', dot: 'bg-gray-400' },
  Active: { bg: 'bg-emeraldGreen-50', text: 'text-emeraldGreen-500', border: 'border-emeraldGreen-500/20', dot: 'bg-emeraldGreen-500' },
};
