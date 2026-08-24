import { store } from '../services/dataStore.js';

// @desc Get all orders with status tab filter, date range, search
// @route GET /api/orders
export const getOrders = async (req, res) => {
  try {
    let results = [...store.orders];
    const { status, search, paymentStatus, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    if (status && status !== 'All') {
      results = results.filter(o => o.orderStatus.toLowerCase() === status.toLowerCase());
    }

    if (paymentStatus && paymentStatus !== 'All') {
      results = results.filter(o => o.paymentStatus.toLowerCase().includes(paymentStatus.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(o =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
      );
    }

    results.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const statusCounts = {
      All: store.orders.length,
      Pending: store.orders.filter(o => o.orderStatus === 'Confirmed' && o.paymentStatus.includes('Pending')).length,
      Confirmed: store.orders.filter(o => o.orderStatus === 'Confirmed').length,
      Processing: store.orders.filter(o => o.orderStatus === 'Processing').length,
      Shipped: store.orders.filter(o => o.orderStatus === 'Shipped').length,
      Delivered: store.orders.filter(o => o.orderStatus === 'Delivered').length,
      Cancelled: store.orders.filter(o => o.orderStatus === 'Cancelled').length,
      Returned: store.orders.filter(o => o.orderStatus === 'Returned').length,
    };

    res.json({
      success: true,
      count: results.length,
      statusCounts,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single order by ID or order number
// @route GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const order = store.orders.find(o => o._id === req.params.id || o.orderNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, data: order });
};

// @desc Update order status & timeline
// @route PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const { status, trackingNumber, courierPartner } = req.body;
  const index = store.orders.findIndex(o => o._id === req.params.id || o.orderNumber === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const order = store.orders[index];
  order.orderStatus = status || order.orderStatus;

  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (courierPartner) order.courierPartner = courierPartner;

  // Add timeline entry
  const now = new Date();
  const timeFormatted = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  
  order.timeline.push({
    status: `Status changed to ${status}`,
    time: timeFormatted,
    completed: true,
  });

  if (status === 'Delivered') {
    order.paymentStatus = 'Paid';
  }

  res.json({
    success: true,
    message: `Order #${order.orderNumber} status updated to ${status}`,
    data: order,
  });
};

// @desc Cancel order
// @route POST /api/orders/:id/cancel
export const cancelOrder = async (req, res) => {
  const { reason = 'Cancelled by store operator' } = req.body;
  const index = store.orders.findIndex(o => o._id === req.params.id || o.orderNumber === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const order = store.orders[index];
  order.orderStatus = 'Cancelled';
  if (order.paymentStatus === 'Paid') {
    order.paymentStatus = 'Refunded';
  }

  order.timeline.push({
    status: `Order Cancelled: ${reason}`,
    time: 'Just now',
    completed: true,
  });

  res.json({
    success: true,
    message: `Order #${order.orderNumber} has been cancelled and refund processed.`,
    data: order,
  });
};

// @desc Create new order (e.g. manual order or cart checkout)
// @route POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrderNumber = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      _id: 'ord_' + Date.now(),
      orderNumber: newOrderNumber,
      customer: orderData.customer || {
        name: 'Guest Shopper',
        email: 'guest@example.com',
        phone: '+91 99000 11222',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      },
      items: orderData.items || [],
      subtotal: Number(orderData.subtotal) || 2499,
      discount: Number(orderData.discount) || 0,
      couponCode: orderData.couponCode || '',
      shippingFee: Number(orderData.shippingFee) || 0,
      tax: Number(orderData.tax) || 124.95,
      totalAmount: Number(orderData.totalAmount) || 2623.95,
      paymentStatus: orderData.paymentStatus || 'Paid',
      paymentMethod: orderData.paymentMethod || 'UPI',
      orderStatus: 'Confirmed',
      shippingAddress: orderData.shippingAddress || {
        street: '100 Feet Road, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        country: 'India',
      },
      trackingNumber: 'Pending',
      courierPartner: 'Delhivery Express',
      timeline: [
        { status: 'Order Placed', time: 'Just now', completed: true },
        { status: 'Payment Confirmed', time: 'Just now', completed: true },
        { status: 'Packing', time: 'Pending', completed: false },
        { status: 'Shipped', time: 'Pending', completed: false },
        { status: 'Delivered', time: 'Pending', completed: false },
      ],
      createdAt: new Date().toISOString(),
    };

    store.orders.unshift(newOrder);
    res.status(201).json({ success: true, message: 'Order created', data: newOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
