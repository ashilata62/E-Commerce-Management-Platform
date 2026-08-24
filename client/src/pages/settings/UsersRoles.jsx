import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, UserPlus, Shield, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { settingsService } from '../../services/settingsService';
import { useToast } from '../../context/ToastContext';

export const UsersRoles = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Staff',
    phone: '',
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await settingsService.getUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newUser.email.trim()) return;

    try {
      const res = await settingsService.addUser(newUser);
      if (res.success) {
        toast.success(`Team member ${newUser.name} invited as ${newUser.role}!`);
        setShowModal(false);
        setNewUser({ name: '', email: '', role: 'Staff', phone: '' });
        fetchUsers();
      }
    } catch (err) {
      toast.error('Failed to invite user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await settingsService.deleteUser(id);
      toast.success('Team member removed');
      fetchUsers();
    } catch (err) {
      toast.error('Error removing user');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Team Members & Access Roles"
        subtitle="Manage administrator privileges, store manager access, warehouse staff logins, and RBAC security"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }, { label: 'Users & Roles' }]}
        badge={`${users.length} Team Members`}
      >
        <Button variant="primary" icon={UserPlus} onClick={() => setShowModal(true)}>
          Invite Member
        </Button>
      </PageHeader>

      {/* Team Member List */}
      <div className="commerce-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border text-[11px] font-extrabold text-slateText-muted uppercase bg-surface-muted/50">
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Access Role</th>
                <th className="py-3.5 px-4">Contact Phone</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-sm font-medium">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-brand-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={u.name}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-surface-border shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-slateText-main">{u.name}</p>
                        <p className="text-[11px] text-slateText-muted">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      u.role === 'Admin'
                        ? 'bg-purple-100 text-brand-700'
                        : u.role === 'Manager'
                        ? 'bg-coral-50 text-coral-600'
                        : 'bg-surface-muted text-slateText-main'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-slateText-muted">
                    {u.phone || '+91 98000 00000'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emeraldGreen-600 bg-emeraldGreen-50 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emeraldGreen-500" />
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {u.role !== 'Admin' && (
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="p-1.5 rounded-lg text-slateText-muted hover:text-roseDanger-500 hover:bg-roseDanger-50 transition-colors"
                        title="Remove Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="commerce-card p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slateText-main border-b pb-3">
          Role Permissions Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-slateText-muted font-bold uppercase text-[10px]">
                <th className="pb-2">Feature Domain</th>
                <th className="pb-2 text-center">Admin</th>
                <th className="pb-2 text-center">Manager</th>
                <th className="pb-2 text-center">Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border font-medium">
              {[
                { domain: 'Store Settings & Payment Gateways', admin: true, manager: false, staff: false },
                { domain: 'Publish & Modify Products', admin: true, manager: true, staff: false },
                { domain: 'View & Dispatch Orders', admin: true, manager: true, staff: true },
                { domain: 'Manage Flash Sales & Campaigns', admin: true, manager: true, staff: false },
                { domain: 'Customer Data & Segmentation', admin: true, manager: true, staff: false },
                { domain: 'Full Financial Reports & Tax Audits', admin: true, manager: false, staff: false },
              ].map((row, i) => (
                <tr key={i} className="py-2.5">
                  <td className="py-2.5 font-bold text-slateText-main">{row.domain}</td>
                  <td className="py-2.5 text-center">{row.admin ? <CheckCircle2 className="w-4 h-4 text-emeraldGreen-500 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                  <td className="py-2.5 text-center">{row.manager ? <CheckCircle2 className="w-4 h-4 text-emeraldGreen-500 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                  <td className="py-2.5 text-center">{row.staff ? <CheckCircle2 className="w-4 h-4 text-emeraldGreen-500 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Invite Team Member">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Full Name *</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="e.g. Vikram Sharma"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Work Email *</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="vikram@kiaan.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Assigned Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none"
            >
              <option value="Admin">Admin (Full Access)</option>
              <option value="Manager">Manager (Operations & Marketing)</option>
              <option value="Staff">Staff (Order Fulfillment)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Send Invite</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
