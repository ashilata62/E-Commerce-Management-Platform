import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  Search,
  Eye,
  UserCheck,
  Crown,
  Sparkles,
  ShoppingBag,
  Mail,
  Phone,
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { customerService } from '../../services/customerService';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatDate, formatNumber } from '../../utils/formatters';
import { CUSTOMER_SEGMENTS } from '../../utils/constants';

export const Customers = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [customers, setCustomers] = useState([]);
  const [segmentsSummary, setSegmentsSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSegment, setActiveSegment] = useState('All');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Mumbai',
    segment: 'New',
  });

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await customerService.getCustomers({
        segment: activeSegment !== 'All' ? activeSegment : undefined,
        search: search || undefined,
      });
      if (res.success) {
        setCustomers(res.data);
        if (res.segmentsSummary) setSegmentsSummary(res.segmentsSummary);
      }
    } catch (err) {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [activeSegment, search]);

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    if (!newCustomer.email.trim()) return;

    try {
      const res = await customerService.createCustomer(newCustomer);
      if (res.success) {
        toast.success(`Customer ${newCustomer.name} created!`);
        setShowAddModal(false);
        setNewCustomer({ name: '', email: '', phone: '', city: 'Mumbai', segment: 'New' });
        fetchCustomers();
      }
    } catch (err) {
      toast.error('Failed to register customer');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Directory"
        subtitle="Manage customer profiles, purchase history, lifetime value tiers, and contact records"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Customers' }]}
        badge={`${customers.length} Shoppers`}
      >
        <Button variant="primary" icon={Plus} onClick={() => setShowAddModal(true)}>
          Add Customer
        </Button>
      </PageHeader>

      {/* Segment Pill Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {CUSTOMER_SEGMENTS.map((seg) => (
          <button
            key={seg}
            onClick={() => setActiveSegment(seg)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSegment === seg
                ? 'bg-brand-500 text-white shadow-soft-sm'
                : 'bg-white border border-surface-border text-slateText-muted hover:text-slateText-main hover:bg-surface-muted'
            }`}
          >
            {seg === 'VIP' && '👑 '}
            {seg} Shoppers
          </button>
        ))}
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search customers by name, email, phone number or city..."
      />

      {/* Customers Table */}
      <div className="commerce-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border text-[11px] font-extrabold text-slateText-muted uppercase bg-surface-muted/50">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Segment</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Lifetime Spent</th>
                <th className="py-3.5 px-4">Avg. Order Value</th>
                <th className="py-3.5 px-4">Last Purchase</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-sm font-medium">
              {customers.map((cst) => (
                <tr
                  key={cst._id}
                  onClick={() => navigate(`/customers/${cst._id}`)}
                  className="hover:bg-brand-50/20 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cst.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                        alt={cst.name}
                        className="w-10 h-10 rounded-2xl object-cover ring-1 ring-surface-border shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-slateText-main">{cst.name}</p>
                        <p className="text-[11px] text-slateText-muted">{cst.email}</p>
                        <p className="text-[10px] text-brand-600 font-semibold">{cst.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={cst.segment} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slateText-main">
                    {cst.totalOrders} Orders
                  </td>
                  <td className="py-3.5 px-4 font-black text-brand-600">
                    {formatCurrency(cst.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slateText-main">
                    {formatCurrency(cst.averageOrderValue || Math.round(cst.totalSpent / (cst.totalOrders || 1)))}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slateText-muted font-medium">
                    {formatDate(cst.lastPurchase)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="xs"
                      variant="ghost"
                      icon={Eye}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/customers/${cst._id}`);
                      }}
                    >
                      Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Register Customer">
        <form onSubmit={handleCreateCustomer} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Full Name *</label>
            <input
              type="text"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              placeholder="e.g. Ananya Deshmukh"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Email Address *</label>
            <input
              type="email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              placeholder="e.g. ananya@example.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Phone Number</label>
            <input
              type="text"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">City</label>
            <input
              type="text"
              value={newCustomer.city}
              onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
              placeholder="Mumbai"
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Customer</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
