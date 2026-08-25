import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Ban,
  ArrowUpDown,
  FileSpreadsheet,
  ChevronRight,
  MapPin,
  CreditCard,
  Calendar,
  Sparkles,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { ORDER_STATUSES } from '../../utils/constants';

export const Orders = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const isCustomer = user?.role === 'Customer';

  const [orders, setOrders] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getOrders({
        status: activeTab !== 'All' ? activeTab : undefined,
        search: search || undefined,
      });
      if (res.success) {
        setOrders(res.data);
        if (res.statusCounts) setStatusCounts(res.statusCounts);
      }
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab, search]);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Order ID,Customer,Amount,Status,Payment,Date"].join(",") + "\n"
      + orders.map(o => `"${o.orderNumber}","${o.customer?.name}","${o.totalAmount}","${o.orderStatus}","${o.paymentStatus}","${o.createdAt}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Orders exported as CSV file');
    setShowExportModal(false);
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emeraldGreen-50 text-emeraldGreen-700 border-emeraldGreen-200';
      case 'Shipped':
      case 'In Transit': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
      case 'Confirmed': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled': return 'bg-roseDanger-50 text-roseDanger-600 border-roseDanger-200';
      default: return 'bg-surface-muted text-slateText-main border-surface-border';
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-20">
      {/* 1. Header (Mobile & Desktop Aware) */}
      {isCustomer ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-surface-border shadow-soft-xs">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
              <Package className="w-3.5 h-3.5 text-brand-600" />
              <span>Kiaan Orders & Purchases</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slateText-main">
              My Orders & Shipments
            </h1>
            <p className="text-xs text-slateText-muted">
              Live delivery tracking, courier status, returns and tax invoices
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 font-extrabold text-xs border border-brand-200 shrink-0">
            {orders.length} Total Orders
          </span>
        </div>
      ) : (
        <PageHeader
          title="Order Management"
          subtitle="Track incoming purchases, print packing slips, assign couriers, and manage delivery status"
          breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Orders' }]}
          badge={`${orders.length} in view`}
        >
          <Button variant="outline" icon={Download} onClick={() => setShowExportModal(true)}>
            Export Orders
          </Button>
        </PageHeader>
      )}

      {/* 2. Status Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {ORDER_STATUSES.map((status) => {
          const count = statusCounts[status] ?? (status === 'All' ? orders.length : 0);
          const isActive = activeTab === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setActiveTab(status)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer border active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-[#7854F7] text-white border-brand-600 shadow-purple-glow'
                  : 'bg-white text-slateText-main hover:bg-surface-muted border-[#E7E0F7] shadow-soft-xs'
              }`}
            >
              <span>{status}</span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-white/25 text-white' : 'bg-surface-muted text-slateText-muted'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Search Toolbar */}
      <div className="flex items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={isCustomer ? "Search by Order ID (e.g. 82942) or outfit name..." : "Search by Order ID, customer name, email or tracking number..."}
          className="flex-1"
        />
      </div>

      {/* 4. MOBILE-FIRST ORDER CARDS (Shown on Mobile screens < 768px) */}
      <div className="block md:hidden space-y-4">
        {loading ? (
          <div className="text-center py-12 text-xs font-bold text-slateText-muted">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="commerce-card p-8 text-center rounded-3xl space-y-3 bg-white">
            <Package className="w-12 h-12 text-brand-300 mx-auto" />
            <h4 className="text-base font-black text-slateText-main">No Orders Found</h4>
            <p className="text-xs text-slateText-muted">No orders match your selected status tab or search.</p>
            {isCustomer && (
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors shadow-soft-sm cursor-pointer"
              >
                Browse Shop
              </button>
            )}
          </div>
        ) : (
          orders.map((order) => {
            const firstItem = order.items?.[0] || {};
            const totalItemsCount = order.items?.reduce((sum, it) => sum + (it.quantity || 1), 0) || order.items?.length || 1;

            return (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-[#E7E0F7] shadow-soft-xs overflow-hidden transition-all hover:shadow-soft-md"
              >
                {/* Card Top: Status & Date */}
                <div className="p-4 bg-[#F4F0FD]/60 border-b border-[#E7E0F7] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 ${getStatusBgColor(order.orderStatus)}`}>
                      {order.orderStatus === 'Delivered' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {(order.orderStatus === 'Shipped' || order.orderStatus === 'In Transit') && <Truck className="w-3.5 h-3.5" />}
                      {order.orderStatus === 'Processing' && <Clock className="w-3.5 h-3.5" />}
                      {order.orderStatus === 'Cancelled' && <Ban className="w-3.5 h-3.5" />}
                      <span>{order.orderStatus}</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-black text-brand-600 block">
                      #{order.orderNumber}
                    </span>
                    <span className="text-[10px] text-slateText-muted">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Card Body: Product thumbnail & details */}
                <div
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="p-4 flex gap-3.5 items-center cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <img
                    src={firstItem.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80'}
                    alt={firstItem.name || 'Order Item'}
                    className="w-18 h-20 rounded-2xl object-cover bg-slate-100 shrink-0 border border-slate-200 shadow-xs"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs sm:text-sm font-black text-slateText-main truncate">
                      {firstItem.name || 'Fashion Apparel Outfit'}
                    </h4>

                    <div className="flex items-center gap-2">
                      {firstItem.size && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          Size: {firstItem.size}
                        </span>
                      )}
                      {firstItem.color && (
                        <span className="text-[10px] text-slate-500 font-medium truncate">
                          {firstItem.color}
                        </span>
                      )}
                    </div>

                    {order.items?.length > 1 && (
                      <p className="text-[10px] font-bold text-brand-600">
                        + {order.items.length - 1} more {order.items.length - 1 === 1 ? 'item' : 'items'} in order
                      </p>
                    )}

                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-sm font-black text-slateText-main">
                          {formatCurrency(order.totalAmount)}
                        </span>
                        {order.discount > 0 && (
                          <span className="text-[10px] text-emeraldGreen-600 font-bold ml-1.5">
                            (Saved ₹{order.discount})
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">
                        {order.paymentMethod || 'UPI Paid'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: 1-Click Action Buttons */}
                <div className="p-3 bg-[#F4F0FD]/40 border-t border-[#E7E0F7] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slateText-muted font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    <span className="truncate">{order.shippingAddress?.city || 'Mumbai'}, {order.shippingAddress?.state || 'India'}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-soft-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. DESKTOP ORDERS TABLE (Shown on Tablet & Desktop screens >= 768px) */}
      <div className="hidden md:block commerce-card overflow-hidden rounded-3xl border border-[#E7E0F7]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border text-[11px] font-extrabold text-slateText-muted uppercase bg-surface-muted/50">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Items / SKUs</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Order Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-sm font-medium">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="hover:bg-brand-50/20 cursor-pointer transition-colors"
                >
                  {/* Order Number & Timestamp */}
                  <td className="py-3.5 px-4">
                    <p className="font-mono font-bold text-brand-600 text-xs">{order.orderNumber}</p>
                    <p className="text-[11px] text-slateText-muted mt-0.5">{formatDateTime(order.createdAt)}</p>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={order.customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                        alt={order.customer?.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-surface-border"
                      />
                      <div>
                        <p className="text-xs font-bold text-slateText-main">{order.customer?.name}</p>
                        <p className="text-[10px] text-slateText-muted">{order.customer?.phone || order.shippingAddress?.city}</p>
                      </div>
                    </div>
                  </td>

                  {/* Items */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      {order.items?.slice(0, 3).map((it, idx) => (
                        <img
                          key={idx}
                          src={it.image}
                          alt={it.name}
                          className="w-8 h-8 rounded-lg object-cover border border-surface-border"
                          title={`${it.name} (${it.size || ''})`}
                        />
                      ))}
                      {order.items?.length > 3 && (
                        <span className="text-[10px] font-bold text-slateText-muted bg-surface-muted px-1.5 py-1 rounded">
                          +{order.items.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4">
                    <p className="text-xs font-black text-slateText-main">{formatCurrency(order.totalAmount)}</p>
                    {order.discount > 0 && (
                      <span className="text-[10px] text-emeraldGreen-600 font-bold">
                        -₹{order.discount} off
                      </span>
                    )}
                  </td>

                  {/* Payment */}
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.paymentStatus === 'Paid' ? 'bg-emeraldGreen-50 text-emeraldGreen-600' : 'bg-warm-50 text-warm-700'
                    }`}>
                      {order.paymentStatus}
                    </span>
                    <p className="text-[10px] text-slateText-muted mt-0.5">{order.paymentMethod}</p>
                  </td>

                  {/* Order Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={order.orderStatus} size="sm" />
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="xs"
                      variant="ghost"
                      icon={Eye}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/orders/${order._id}`);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Modal */}
      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Export Order Dataset">
        <div className="space-y-4">
          <p className="text-xs text-slateText-muted">
            Download current filtered view ({orders.length} orders) in CSV format for shipping manifest generation or accounting reconciliation.
          </p>
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>Cancel</Button>
            <Button variant="primary" icon={FileSpreadsheet} onClick={handleExportCSV}>
              Download CSV
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
