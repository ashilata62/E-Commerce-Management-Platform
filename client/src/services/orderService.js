import { localStore } from './mockDataStore';

export const orderService = {
  getOrders: async (params = {}) => {
    let results = [...localStore.data.orders];
    const { status, search } = params;

    if (status && status !== 'All') {
      const s = status.toLowerCase();
      if (s === 'pending') {
        results = results.filter(
          o => o.orderStatus.toLowerCase() === 'pending' || o.paymentStatus.toLowerCase().includes('pending')
        );
      } else {
        results = results.filter(o => o.orderStatus.toLowerCase() === s);
      }
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(o =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer?.name.toLowerCase().includes(q) ||
        o.customer?.email?.toLowerCase().includes(q) ||
        o.trackingNumber?.toLowerCase().includes(q)
      );
    }

    const statusCounts = {
      All: localStore.data.orders.length,
      Pending: localStore.data.orders.filter(
        o => o.orderStatus.toLowerCase() === 'pending' || o.paymentStatus.toLowerCase().includes('pending')
      ).length,
      Confirmed: localStore.data.orders.filter(o => o.orderStatus.toLowerCase() === 'confirmed').length,
      Processing: localStore.data.orders.filter(o => o.orderStatus.toLowerCase() === 'processing').length,
      Shipped: localStore.data.orders.filter(o => o.orderStatus.toLowerCase() === 'shipped').length,
      Delivered: localStore.data.orders.filter(o => o.orderStatus.toLowerCase() === 'delivered').length,
      Cancelled: localStore.data.orders.filter(o => o.orderStatus.toLowerCase() === 'cancelled').length,
      Returned: localStore.data.orders.filter(o => o.orderStatus.toLowerCase() === 'returned').length,
    };

    return {
      success: true,
      count: results.length,
      statusCounts,
      data: results,
    };
  },

  getOrderById: async (id) => {
    const order = localStore.data.orders.find(o => o._id === id || o.orderNumber === id);
    if (!order) return { success: false, message: 'Not found' };
    return { success: true, data: order };
  },

  updateOrderStatus: async (id, data) => {
    const idx = localStore.data.orders.findIndex(o => o._id === id || o.orderNumber === id);
    if (idx !== -1) {
      const ord = localStore.data.orders[idx];
      ord.orderStatus = data.status || ord.orderStatus;
      if (data.trackingNumber) ord.trackingNumber = data.trackingNumber;
      ord.timeline.push({
        status: `Status updated to ${data.status}`,
        time: 'Just now',
        completed: true,
      });
      return { success: true, message: `Status updated to ${data.status}`, data: ord };
    }
    return { success: false, message: 'Not found' };
  },

  cancelOrder: async (id, reason) => {
    const idx = localStore.data.orders.findIndex(o => o._id === id || o.orderNumber === id);
    if (idx !== -1) {
      const ord = localStore.data.orders[idx];
      ord.orderStatus = 'Cancelled';
      ord.paymentStatus = 'Refunded';
      ord.timeline.push({
        status: `Order Cancelled: ${reason}`,
        time: 'Just now',
        completed: true,
      });
      return { success: true, data: ord };
    }
    return { success: false, message: 'Not found' };
  },

  createOrder: async (orderData) => {
    const newOrder = {
      _id: 'ord_' + Date.now(),
      orderNumber: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString(),
      ...orderData,
    };
    localStore.data.orders.unshift(newOrder);
    return { success: true, data: newOrder };
  },
};
