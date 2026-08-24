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
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { orderService } from '../../services/orderService';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { ORDER_STATUSES } from '../../utils/constants';

export const Orders = () => {
  const navigate = useNavigate();
  const toast = useToast();

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

  return (
    <div className="space-y-6">
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

      {/* Tabs Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-surface-border">
        {ORDER_STATUSES.map((status) => {
          const count = statusCounts[status] ?? (status === 'All' ? orders.length : 0);
          const isActive = activeTab === status;
          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-brand-500 text-white shadow-soft-sm'
                  : 'text-slateText-muted hover:text-slateText-main hover:bg-surface-muted'
              }`}
            >
              <span>{status}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-surface-muted text-slateText-muted'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by Order ID, customer name, email or tracking number..."
          className="flex-1"
        />
      </div>

      {/* Orders Table */}
      <div className="commerce-card overflow-hidden">
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
