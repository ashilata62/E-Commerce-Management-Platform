import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  CreditCard,
  Crown,
  Sparkles,
  Calendar,
  Clock,
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { customerService } from '../../services/customerService';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const res = await customerService.getCustomerById(id);
        if (res.success) {
          setCustomer(res.data);
        }
      } catch (err) {
        toast.error('Failed to load customer profile');
        navigate('/customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading || !customer) {
    return <div className="h-96 rounded-3xl bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      <PageHeader
        title={customer.name}
        subtitle={`Member since 2026 • Segment: ${customer.segment}`}
        breadcrumbs={[
          { label: 'Customers', path: '/customers' },
          { label: customer.name },
        ]}
      >
        <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate('/customers')}>
          Back to Directory
        </Button>
      </PageHeader>

      {/* Top Profile Card */}
      <div className="commerce-card p-6 sm:p-8 bg-gradient-to-r from-white via-white to-brand-50/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={customer.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={customer.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slateText-main">{customer.name}</h2>
                <StatusBadge status={customer.segment} size="sm" />
              </div>
              <p className="text-xs text-slateText-muted mt-0.5">{customer.email}</p>
              <p className="text-xs font-semibold text-brand-600 mt-0.5">{customer.phone} • {customer.city}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t sm:border-t-0 sm:border-l border-surface-border pt-4 sm:pt-0 sm:pl-6">
            <div>
              <p className="text-[10px] font-bold text-slateText-muted uppercase">Lifetime Value</p>
              <p className="text-lg font-black text-brand-600 mt-0.5">{formatCurrency(customer.totalSpent)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slateText-muted uppercase">Total Orders</p>
              <p className="text-lg font-black text-slateText-main mt-0.5">{customer.totalOrders}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slateText-muted uppercase">Avg Order Value</p>
              <p className="text-lg font-black text-slateText-main mt-0.5">{formatCurrency(customer.averageOrderValue || 2450)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Purchase History */}
      <div className="commerce-card p-6">
        <h3 className="text-base font-bold text-slateText-main mb-4 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-brand-500" />
          <span>Purchase History ({customer.orders?.length || 0})</span>
        </h3>

        {customer.orders && customer.orders.length > 0 ? (
          <div className="divide-y divide-surface-border">
            {customer.orders.map((ord) => (
              <div
                key={ord._id}
                onClick={() => navigate(`/orders/${ord._id}`)}
                className="py-4 flex items-center justify-between hover:bg-brand-50/20 px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-xs font-bold text-brand-600 font-mono">{ord.orderNumber}</p>
                  <p className="text-[11px] text-slateText-muted mt-0.5">{formatDateTime(ord.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slateText-main">{formatCurrency(ord.totalAmount)}</p>
                  <StatusBadge status={ord.orderStatus} size="sm" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slateText-muted py-4 text-center font-medium">
            No order history linked to this customer record.
          </p>
        )}
      </div>
    </div>
  );
};
