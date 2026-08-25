import { localStore } from './mockDataStore';

const getStoredOrders = () => {
  try {
    const saved = localStorage.getItem('kiaan_orders');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('LocalStorage read error for kiaan_orders', e);
  }
  localStorage.setItem('kiaan_orders', JSON.stringify(localStore.data.orders));
  return localStore.data.orders;
};

const saveStoredOrders = (orders) => {
  localStore.data.orders = orders;
  try {
    localStorage.setItem('kiaan_orders', JSON.stringify(orders));
  } catch (e) {
    console.error('LocalStorage write error for kiaan_orders', e);
  }
};

export const orderService = {
  getOrders: async (params = {}) => {
    const allOrders = getStoredOrders();
    let results = [...allOrders];
    const { status, search } = params;

    if (status && status !== 'All') {
      results = results.filter(o => o.orderStatus.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(o =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer?.name.toLowerCase().includes(q)
      );
    }

    const statusCounts = {
      All: allOrders.length,
      Pending: allOrders.filter(o => o.paymentStatus.includes('Pending')).length,
      Confirmed: allOrders.filter(o => o.orderStatus === 'Confirmed').length,
      Processing: allOrders.filter(o => o.orderStatus === 'Processing').length,
      Shipped: allOrders.filter(o => o.orderStatus === 'Shipped').length,
      Delivered: allOrders.filter(o => o.orderStatus === 'Delivered').length,
      Cancelled: allOrders.filter(o => o.orderStatus === 'Cancelled').length,
      Returned: allOrders.filter(o => o.orderStatus === 'Returned').length,
    };

    return {
      success: true,
      count: results.length,
      statusCounts,
      data: results,
    };
  },

  getOrderById: async (id) => {
    const orders = getStoredOrders();
    const order = orders.find(o => o._id === id || o.orderNumber === id);
    if (!order) return { success: false, message: 'Not found' };
    return { success: true, data: order };
  },

  updateOrderStatus: async (id, data) => {
    const orders = getStoredOrders();
    const idx = orders.findIndex(o => o._id === id || o.orderNumber === id);
    if (idx !== -1) {
      const ord = orders[idx];
      ord.orderStatus = data.status || ord.orderStatus;
      if (data.trackingNumber) ord.trackingNumber = data.trackingNumber;
      if (!ord.timeline) ord.timeline = [];
      ord.timeline.push({
        status: `Status updated to ${data.status}`,
        time: 'Just now',
        completed: true,
      });
      saveStoredOrders(orders);
      return { success: true, message: `Status updated to ${data.status}`, data: ord };
    }
    return { success: false, message: 'Not found' };
  },

  cancelOrder: async (id, reason) => {
    const orders = getStoredOrders();
    const idx = orders.findIndex(o => o._id === id || o.orderNumber === id);
    if (idx !== -1) {
      const ord = orders[idx];
      ord.orderStatus = 'Cancelled';
      ord.paymentStatus = 'Refunded';
      if (!ord.timeline) ord.timeline = [];
      ord.timeline.push({
        status: `Order Cancelled: ${reason}`,
        time: 'Just now',
        completed: true,
      });
      saveStoredOrders(orders);
      return { success: true, data: ord };
    }
    return { success: false, message: 'Not found' };
  },

  createOrder: async (orderData) => {
    const orders = getStoredOrders();
    const newOrder = {
      _id: 'ord_' + Date.now(),
      orderNumber: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString(),
      timeline: [{ status: 'Order Placed', time: 'Just now', completed: true }],
      ...orderData,
    };
    const updated = [newOrder, ...orders];
    saveStoredOrders(updated);
    return { success: true, data: newOrder };
  },
};
