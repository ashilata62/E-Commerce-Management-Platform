import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  CreditCard,
  Package,
  AlertCircle,
  FileText,
  Send,
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { orderService } from '../../services/orderService';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await orderService.getOrderById(id);
      if (res.success) {
        setOrder(res.data);
        setNewStatus(res.data.orderStatus);
        setTrackingNumber(res.data.trackingNumber || '');
      }
    } catch (err) {
      toast.error('Failed to load order');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      setUpdating(true);
      const res = await orderService.updateOrderStatus(order._id, {
        status: newStatus,
        trackingNumber: trackingNumber || undefined,
      });
      if (res.success) {
        toast.success(res.message);
        fetchOrder();
      }
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order and initiate a customer refund?')) return;
    try {
      const res = await orderService.cancelOrder(order._id, 'Customer request cancellation');
      if (res.success) {
        toast.success('Order cancelled and refund logged');
        fetchOrder();
      }
    } catch (err) {
      toast.error('Failed to cancel order');
    }
  };

  if (loading || !order) {
    return <div className="h-96 rounded-3xl bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      <PageHeader
        title={`Order #${order.orderNumber}`}
        subtitle={`Placed on ${formatDateTime(order.createdAt)} • Payment: ${order.paymentStatus}`}
        breadcrumbs={[
          { label: 'Orders', path: '/orders' },
          { label: order.orderNumber },
        ]}
      >
        <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate('/orders')}>
          Back to Orders
        </Button>
        <Button variant="outline" icon={Printer} onClick={() => setShowInvoiceModal(true)}>
          Print Invoice
        </Button>
        {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && (
          <Button variant="danger" onClick={handleCancelOrder}>
            Cancel Order
          </Button>
        )}
      </PageHeader>

      {/* Visual Tracking Stepper Timeline */}
      <div className="commerce-card p-6 sm:p-8">
        <h3 className="text-sm font-extrabold uppercase text-slateText-muted tracking-wider mb-6">
          Delivery Pipeline Timeline
        </h3>

        <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-5 left-10 right-10 h-0.5 bg-surface-border z-0" />

          {order.timeline?.map((step, idx) => {
            const isFinished = step.completed;
            return (
              <div key={idx} className="relative z-10 flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-2 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-soft-sm shrink-0 ${
                    isFinished
                      ? 'bg-emeraldGreen-500 text-white'
                      : 'bg-surface-muted text-slateText-muted border border-surface-border'
                  }`}
                >
                  {isFinished ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slateText-main">{step.status}</h4>
                  <p className="text-[11px] text-slateText-muted mt-0.5">{step.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Main Content & Customer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Purchased Items List & Calculation */}
        <div className="lg:col-span-8 space-y-6">
          <div className="commerce-card p-6">
            <h3 className="text-base font-bold text-slateText-main mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-500" />
              <span>Order Items ({order.items?.length || 0})</span>
            </h3>

            <div className="divide-y divide-surface-border">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-surface-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slateText-main truncate">{item.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slateText-muted mt-0.5 font-medium">
                      {item.size && <span>Size: <strong className="text-slateText-main">{item.size}</strong></span>}
                      {item.color && <span>• Color: <strong className="text-slateText-main">{item.color}</strong></span>}
                      <span>• Qty: <strong className="text-slateText-main">{item.quantity}</strong></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slateText-main">{formatCurrency(item.total || item.unitPrice * item.quantity)}</p>
                    <p className="text-[11px] text-slateText-muted">{formatCurrency(item.unitPrice)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="mt-4 pt-4 border-t border-surface-border space-y-2 text-xs">
              <div className="flex justify-between text-slateText-muted">
                <span>Subtotal</span>
                <span className="font-bold text-slateText-main">{formatCurrency(order.subtotal)}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-emeraldGreen-600 font-semibold">
                  <span>Coupon Discount ({order.couponCode || 'PROMO'})</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slateText-muted">
                <span>Estimated GST Tax</span>
                <span className="font-bold text-slateText-main">{formatCurrency(order.tax)}</span>
              </div>

              <div className="flex justify-between text-slateText-muted">
                <span>Shipping & Delivery Fee</span>
                <span className="font-bold text-slateText-main">
                  {order.shippingFee === 0 ? 'FREE' : formatCurrency(order.shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-slateText-main pt-2 border-t border-surface-border">
                <span>Total Amount</span>
                <span className="text-brand-600 text-lg">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Quick Order Status Controller */}
          <div className="commerce-card p-6 bg-gradient-to-r from-brand-50/50 via-white to-white border-brand-200">
            <h4 className="text-sm font-bold text-slateText-main mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-500" />
              <span>Update Fulfillment & Tracking</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slateText-muted uppercase mb-1">
                  Change Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border text-xs font-bold bg-white outline-none"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slateText-muted uppercase mb-1">
                  Tracking AWB Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. DEL-8829104"
                  className="w-full px-3 py-2 rounded-xl border border-surface-border text-xs font-mono bg-white outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button size="sm" variant="primary" onClick={handleUpdateStatus} loading={updating}>
                Save & Update Timeline
              </Button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Customer & Shipping Details */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer Card */}
          <div className="commerce-card p-6 space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slateText-muted tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-brand-500" />
              <span>Customer Information</span>
            </h4>

            <div className="flex items-center gap-3">
              <img
                src={order.customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={order.customer?.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-100"
              />
              <div>
                <h3 className="text-sm font-bold text-slateText-main">{order.customer?.name}</h3>
                <p className="text-xs text-slateText-muted">{order.customer?.email}</p>
                <p className="text-xs font-semibold text-brand-600 mt-0.5">{order.customer?.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="commerce-card p-6 space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slateText-muted tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-coral-500" />
              <span>Shipping Address</span>
            </h4>

            <div className="text-xs text-slateText-main font-medium leading-relaxed bg-surface-muted/50 p-3.5 rounded-xl border border-surface-border">
              <p className="font-bold">{order.customer?.name}</p>
              <p>{order.shippingAddress?.street}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
              <p className="text-slateText-muted">{order.shippingAddress?.country || 'India'}</p>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slateText-muted font-bold">Courier Partner:</p>
              <p className="text-xs font-bold text-slateText-main mt-0.5">{order.courierPartner || 'Delhivery Express'}</p>
            </div>
          </div>

          {/* Payment Card */}
          <div className="commerce-card p-6 space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slateText-muted tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emeraldGreen-500" />
              <span>Payment Details</span>
            </h4>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slateText-muted font-medium">Method:</span>
              <span className="font-bold text-slateText-main">{order.paymentMethod}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slateText-muted font-medium">Status:</span>
              <StatusBadge status={order.paymentStatus} size="sm" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slateText-muted font-medium">Total Paid:</span>
              <span className="font-black text-slateText-main">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      <Modal isOpen={showInvoiceModal} onClose={() => setShowInvoiceModal(false)} maxWidth="max-w-2xl" title="Tax Invoice">
        <div id="printable-invoice" className="p-6 bg-white border rounded-xl space-y-6 text-xs text-slateText-main">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-lg font-black text-brand-600">Kiaan Luxe Emporium</h2>
              <p className="text-[10px] text-slateText-muted">GSTIN: 29AAAAA0000A1Z5 • support@kiaantechnology.com</p>
            </div>
            <div className="text-right">
              <h3 className="font-black text-base">INVOICE</h3>
              <p className="font-mono text-slateText-muted">#{order.orderNumber}</p>
              <p className="text-slateText-muted">{formatDateTime(order.createdAt)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b pb-4">
            <div>
              <p className="font-bold text-slateText-muted uppercase">Billed To:</p>
              <p className="font-bold mt-1">{order.customer?.name}</p>
              <p>{order.shippingAddress?.street}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
            </div>
            <div>
              <p className="font-bold text-slateText-muted uppercase">Payment Info:</p>
              <p className="mt-1">Method: {order.paymentMethod}</p>
              <p>Status: {order.paymentStatus}</p>
              <p>Courier: {order.courierPartner}</p>
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-[10px] font-bold uppercase text-slateText-muted">
                <th className="pb-2">Item Description</th>
                <th className="pb-2">Qty</th>
                <th className="pb-2">Unit Price</th>
                <th className="pb-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium">
              {order.items?.map((it, i) => (
                <tr key={i}>
                  <td className="py-2">{it.name} ({it.size || 'Std'})</td>
                  <td className="py-2">{it.quantity}</td>
                  <td className="py-2">{formatCurrency(it.unitPrice)}</td>
                  <td className="py-2 text-right font-bold">{formatCurrency(it.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end pt-4 border-t">
            <div className="w-48 space-y-1">
              <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(order.subtotal)}</span></div>
              <div className="flex justify-between"><span>GST Tax:</span><span>{formatCurrency(order.tax)}</span></div>
              <div className="flex justify-between font-bold text-sm pt-2 border-t">
                <span>Grand Total:</span><span>{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
          <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>Close</Button>
          <Button variant="primary" icon={Printer} onClick={() => { window.print(); }}>Print Document</Button>
        </div>
      </Modal>
    </div>
  );
};
