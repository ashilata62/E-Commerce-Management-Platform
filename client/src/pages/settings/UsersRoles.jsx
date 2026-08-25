import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  UserPlus,
  Shield,
  Trash2,
  Check,
  Search,
  RotateCcw,
  Sparkles,
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Sparkle,
  Award,
  Package,
  RotateCw,
  Ban,
  Users,
  UserCheck,
  MessageSquareQuote,
  Megaphone,
  Ticket,
  Zap,
  Share2,
  TrendingUp,
  BarChart2,
  PieChart,
  FileText,
  Store,
  CreditCard,
  Truck,
  Lock,
  Building2,
  Mail,
  Phone,
  KeyRound,
  Eye,
  Crown,
  Briefcase,
  SlidersHorizontal,
  Info,
  User
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { settingsService } from '../../services/settingsService';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

// List of all 23 functions across the platform with default role assignments
const ALL_FUNCTIONS_LIST = [
  // MAIN HUB
  {
    id: 'dashboard',
    label: 'Dashboard / Store Hub',
    desc: 'Live store overview, revenue, KPIs & customer order hub',
    path: '/dashboard',
    category: 'Main Hub',
    categoryColor: 'bg-violet-100 text-violet-700 border-violet-200',
    icon: LayoutDashboard,
    iconColor: 'text-violet-600 bg-violet-50',
    defaultRoles: ['Admin', 'Manager', 'Staff', 'Customer'],
  },

  // STORE (CATALOG & STOCK)
  {
    id: 'products',
    label: 'Products (Browse & Catalog)',
    desc: 'Manage stock sizes & prices or browse shopping collection',
    path: '/products',
    category: 'Store Catalog',
    categoryColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: ShoppingBag,
    iconColor: 'text-emerald-600 bg-emerald-50',
    defaultRoles: ['Admin', 'Manager', 'Staff', 'Customer'],
  },
  {
    id: 'categories',
    label: 'Categories',
    desc: 'Ethnic, Western, Kids & Formals taxonomy',
    path: '/categories',
    category: 'Store Catalog',
    categoryColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: Layers,
    iconColor: 'text-sky-600 bg-sky-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'collections',
    label: 'Collections',
    desc: 'Seasonal & Festive outfit lookbooks',
    path: '/collections',
    category: 'Store Catalog',
    categoryColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: Sparkles,
    iconColor: 'text-amber-600 bg-amber-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'brands',
    label: 'Brands',
    desc: 'Designer brands & partner labels',
    path: '/brands',
    category: 'Store Catalog',
    categoryColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: Award,
    iconColor: 'text-purple-600 bg-purple-50',
    defaultRoles: ['Admin', 'Manager'],
  },

  // ORDERS (FULFILLMENT & SHIPPING)
  {
    id: 'orders',
    label: 'All Orders (My Orders & Dispatch)',
    desc: 'Order packing, courier tracking & customer order history',
    path: '/orders',
    category: 'Orders & Shipping',
    categoryColor: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: Package,
    iconColor: 'text-blue-600 bg-blue-50',
    defaultRoles: ['Admin', 'Manager', 'Staff', 'Customer'],
  },
  {
    id: 'returns',
    label: 'Returns & Exchange',
    desc: '7-Day size exchange & doorstep RMA requests',
    path: '/returns',
    category: 'Orders & Shipping',
    categoryColor: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: RotateCw,
    iconColor: 'text-orange-600 bg-orange-50',
    defaultRoles: ['Admin', 'Manager', 'Staff', 'Customer'],
  },
  {
    id: 'cancellations',
    label: 'Cancellations',
    desc: 'Refund approvals & auto restock triggers',
    path: '/cancellations',
    category: 'Orders & Shipping',
    categoryColor: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: Ban,
    iconColor: 'text-rose-600 bg-rose-50',
    defaultRoles: ['Admin', 'Manager', 'Staff'],
  },

  // CUSTOMERS (CRM & REVIEWS)
  {
    id: 'customers',
    label: 'All Customers',
    desc: 'Buyer profiles, order history & LTV directory',
    path: '/customers',
    category: 'Customer CRM',
    categoryColor: 'bg-teal-100 text-teal-700 border-teal-200',
    icon: Users,
    iconColor: 'text-teal-600 bg-teal-50',
    defaultRoles: ['Admin', 'Manager', 'Staff'],
  },
  {
    id: 'customer_segments',
    label: 'Customer Segments',
    desc: 'VIP spenders & high-value buyer cohorts',
    path: '/customer-segments',
    category: 'Customer CRM',
    categoryColor: 'bg-teal-100 text-teal-700 border-teal-200',
    icon: UserCheck,
    iconColor: 'text-indigo-600 bg-indigo-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'reviews',
    label: 'Reviews Moderation',
    desc: 'Buyer photo reviews & star rating approval',
    path: '/reviews',
    category: 'Customer CRM',
    categoryColor: 'bg-teal-100 text-teal-700 border-teal-200',
    icon: MessageSquareQuote,
    iconColor: 'text-amber-600 bg-amber-50',
    defaultRoles: ['Admin', 'Manager'],
  },

  // MARKETING (GROWTH & OFFERS)
  {
    id: 'campaigns',
    label: 'Marketing Campaigns',
    desc: 'WhatsApp & Email promotional sales blasts',
    path: '/campaigns',
    category: 'Marketing',
    categoryColor: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    icon: Megaphone,
    iconColor: 'text-fuchsia-600 bg-fuchsia-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'coupons',
    label: 'Coupons & Discounts',
    desc: 'Discount promo codes (e.g. FESTIVE20)',
    path: '/coupons',
    category: 'Marketing',
    categoryColor: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    icon: Ticket,
    iconColor: 'text-emerald-600 bg-emerald-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'flash_sale',
    label: 'Flash Sale Engine',
    desc: 'Timed countdown markdowns & ticker deals',
    path: '/flash-sale',
    category: 'Marketing',
    categoryColor: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    icon: Zap,
    iconColor: 'text-red-600 bg-red-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'affiliates',
    label: 'Affiliate Program',
    desc: 'Influencer referral commissions & payouts',
    path: '/affiliates',
    category: 'Marketing',
    categoryColor: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    icon: Share2,
    iconColor: 'text-cyan-600 bg-cyan-50',
    defaultRoles: ['Admin', 'Manager'],
  },

  // ANALYTICS (REPORTS & AI)
  {
    id: 'analytics_sales',
    label: 'Sales Analytics',
    desc: 'Daily & monthly revenue growth graphs',
    path: '/analytics/sales',
    category: 'Analytics',
    categoryColor: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: TrendingUp,
    iconColor: 'text-emerald-600 bg-emerald-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'analytics_products',
    label: 'Product Analytics',
    desc: 'Top selling outfits, velocity & conversions',
    path: '/analytics/products',
    category: 'Analytics',
    categoryColor: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: BarChart2,
    iconColor: 'text-blue-600 bg-blue-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'analytics_customers',
    label: 'Customer Analytics',
    desc: 'Repeat order rate, AOV & cohort retention',
    path: '/analytics/customers',
    category: 'Analytics',
    categoryColor: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: PieChart,
    iconColor: 'text-purple-600 bg-purple-50',
    defaultRoles: ['Admin', 'Manager'],
  },
  {
    id: 'reports',
    label: 'GST & Financial Reports',
    desc: 'Official GSTR-1, tax PDF & audit downloads',
    path: '/reports',
    category: 'Analytics',
    categoryColor: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: FileText,
    iconColor: 'text-slate-700 bg-slate-100',
    defaultRoles: ['Admin'],
  },

  // SETTINGS (SYSTEM & SETUP)
  {
    id: 'store_settings',
    label: 'Store Settings',
    desc: 'Brand name, logo, contact & GSTIN info',
    path: '/settings/store',
    category: 'System Settings',
    categoryColor: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: Store,
    iconColor: 'text-amber-600 bg-amber-50',
    defaultRoles: ['Admin'],
  },
  {
    id: 'payment_settings',
    label: 'Payment Gateways',
    desc: 'Razorpay, UPI QR, Cards & COD limits',
    path: '/settings/payment',
    category: 'System Settings',
    categoryColor: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: CreditCard,
    iconColor: 'text-emerald-600 bg-emerald-50',
    defaultRoles: ['Admin'],
  },
  {
    id: 'shipping_settings',
    label: 'Shipping Logistics',
    desc: 'Courier rates, pincodes & free threshold',
    path: '/settings/shipping',
    category: 'System Settings',
    categoryColor: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: Truck,
    iconColor: 'text-blue-600 bg-blue-50',
    defaultRoles: ['Admin'],
  },
  {
    id: 'users_roles',
    label: 'Users & Access Roles',
    desc: 'Team RBAC security & checkbox permissions',
    path: '/settings/users-roles',
    category: 'System Settings',
    categoryColor: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: ShieldCheck,
    iconColor: 'text-purple-600 bg-purple-50',
    defaultRoles: ['Admin'],
  },
];

// Helper to build default map
const buildDefaultPermissionsMap = () => {
  const map = {};
  ALL_FUNCTIONS_LIST.forEach((fn) => {
    map[fn.path] = [...fn.defaultRoles];
  });
  return map;
};

export const UsersRoles = () => {
  const toast = useToast();
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Sidebar Preview Role State (Admin, Manager, Staff, Customer)
  const [activePreviewRole, setActivePreviewRole] = useState(() => {
    try {
      return localStorage.getItem('kiaan_sidebar_preview_role') || 'Admin';
    } catch {
      return 'Admin';
    }
  });

  const handlePreviewRoleChange = (role) => {
    setActivePreviewRole(role);
    localStorage.setItem('kiaan_sidebar_preview_role', role);
    window.dispatchEvent(new Event('sidebar-preview-role-changed'));
    toast.success(`Sidebar preview switched to "${role}" view!`);
  };

  // Permission Map State { '/products': ['Admin', 'Manager', 'Staff', 'Customer'], ... }
  const [permissionsMap, setPermissionsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('kiaan_rbac_permissions_map');
      return saved ? JSON.parse(saved) : buildDefaultPermissionsMap();
    } catch {
      return buildDefaultPermissionsMap();
    }
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Staff',
    phone: '',
    department: 'Order Fulfillment',
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await settingsService.getUsers();
      if (res.success && res.data) {
        if (res.data.length <= 3) {
          const enriched = [
            ...res.data,
            {
              _id: 'usr_004',
              name: 'Vikram Malhotra',
              email: 'vikram@kiaan.com',
              role: 'Manager',
              phone: '+91 98450 11223',
              department: 'Marketing & Campaigns',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            },
            {
              _id: 'usr_005',
              name: 'Neha Kapoor',
              email: 'neha@kiaan.com',
              role: 'Staff',
              phone: '+91 98112 33445',
              department: 'Customer Care & Returns',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
            },
            {
              _id: 'usr_006',
              name: 'Rohan Deshmukh',
              email: 'rohan.shopper@gmail.com',
              role: 'Customer',
              phone: '+91 98234 56789',
              department: 'Registered Shopper',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            },
          ];
          setUsers(enriched);
        } else {
          setUsers(res.data);
        }
      }
    } catch (err) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Save permissions to localStorage and notify Sidebar in real time
  const updatePermissionsMap = (newMap, feedbackMessage) => {
    setPermissionsMap(newMap);
    localStorage.setItem('kiaan_rbac_permissions_map', JSON.stringify(newMap));
    window.dispatchEvent(new Event('rbac-permissions-updated'));
    if (feedbackMessage) {
      toast.success(feedbackMessage);
    }
  };

  // Checkbox Toggle for a specific role and function path
  const handleToggleRoleCheckbox = (fnPath, roleKey, fnLabel) => {
    if (roleKey === 'Admin' && (fnPath === '/settings/users-roles' || fnPath === '/dashboard')) {
      toast.error('Admin superuser access to core dashboard cannot be disabled.');
      return;
    }

    const currentRolesForPath = permissionsMap[fnPath] || [];
    const isCurrentlyChecked = currentRolesForPath.includes(roleKey);

    let updatedRoles;
    if (isCurrentlyChecked) {
      updatedRoles = currentRolesForPath.filter((r) => r !== roleKey);
    } else {
      updatedRoles = [...currentRolesForPath, roleKey];
    }

    const newMap = {
      ...permissionsMap,
      [fnPath]: updatedRoles,
    };

    const statusText = !isCurrentlyChecked
      ? `"${fnLabel}" is now visible to ${roleKey}`
      : `"${fnLabel}" is now hidden from ${roleKey}`;

    updatePermissionsMap(newMap, statusText);
  };

  // Bulk Actions: Select All / Deselect All for a role
  const handleBulkToggleRole = (roleKey, selectAll = true) => {
    const newMap = { ...permissionsMap };
    ALL_FUNCTIONS_LIST.forEach((fn) => {
      const current = newMap[fn.path] || [];
      if (selectAll) {
        if (!current.includes(roleKey)) {
          newMap[fn.path] = [...current, roleKey];
        }
      } else {
        // Deselect
        if (roleKey === 'Admin' && (fn.path === '/settings/users-roles' || fn.path === '/dashboard')) {
          newMap[fn.path] = ['Admin'];
        } else {
          newMap[fn.path] = current.filter((r) => r !== roleKey);
        }
      }
    });

    updatePermissionsMap(
      newMap,
      selectAll
        ? `All functions granted to ${roleKey}!`
        : `All functions hidden from ${roleKey}!`
    );
  };

  // Reset to default system permissions
  const handleResetDefaults = () => {
    const defaultMap = buildDefaultPermissionsMap();
    updatePermissionsMap(defaultMap, 'Reset all permissions to standard default!');
  };

  // Filtered Functions List based on search and category
  const filteredFunctions = useMemo(() => {
    return ALL_FUNCTIONS_LIST.filter((fn) => {
      const matchesCategory = categoryFilter === 'All' || fn.category === categoryFilter;
      if (!matchesCategory) return false;

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        fn.label.toLowerCase().includes(q) ||
        fn.desc.toLowerCase().includes(q) ||
        fn.path.toLowerCase().includes(q) ||
        fn.category.toLowerCase().includes(q)
      );
    });
  }, [searchTerm, categoryFilter]);

  // Categories count
  const categories = ['All', 'Main Hub', 'Store Catalog', 'Orders & Shipping', 'Customer CRM', 'Marketing', 'Analytics', 'System Settings'];

  // Calculate live counts of visible functions per role
  const roleCounts = useMemo(() => {
    let admin = 0;
    let manager = 0;
    let staff = 0;
    let customer = 0;

    ALL_FUNCTIONS_LIST.forEach((fn) => {
      const roles = permissionsMap[fn.path] || [];
      if (roles.includes('Admin')) admin++;
      if (roles.includes('Manager')) manager++;
      if (roles.includes('Staff')) staff++;
      if (roles.includes('Customer')) customer++;
    });

    return { admin, manager, staff, customer, total: ALL_FUNCTIONS_LIST.length };
  }, [permissionsMap]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUser.email.trim()) return;

    try {
      const res = await settingsService.addUser(newUser);
      if (res.success) {
        toast.success(`User ${newUser.name} invited successfully!`);
        setShowModal(false);
        setNewUser({ name: '', email: '', role: 'Staff', phone: '', department: 'Order Fulfillment' });
        fetchUsers();
      }
    } catch (err) {
      toast.error('Failed to invite user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await settingsService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success('User removed from system');
    } catch (err) {
      toast.error('Error removing user');
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
    toast.success(`Role updated to ${newRole}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <PageHeader
        title="Role Permissions & Menu Visibility"
        subtitle="Manage access permissions for Admin, Manager, Staff, and Customer accounts"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }, { label: 'Users & Roles' }]}
        badge={`${ALL_FUNCTIONS_LIST.length} Functions Configured`}
      >
        <Button variant="primary" icon={UserPlus} onClick={() => setShowModal(true)}>
          Invite Team Member
        </Button>
      </PageHeader>

      {/* LIVE DEMO ROLE TESTER & PREVIEW BAR */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 text-white shadow-soft-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black">Live Sidebar Visibility Tester</h4>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
                4 Roles Active
              </span>
            </div>
            <p className="text-xs text-white/80 mt-0.5">
              Click any role to see the sidebar adapt in real time according to your checkboxes:
            </p>
          </div>
        </div>

        {/* Role Preview Switch Buttons */}
        <div className="flex items-center gap-1.5 bg-white/10 p-1.5 rounded-xl border border-white/20 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => handlePreviewRoleChange('Admin')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreviewRole === 'Admin'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-white/90 hover:bg-white/15'
            }`}
            title="Preview sidebar as Admin"
          >
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            Admin ({roleCounts.admin})
          </button>

          <button
            type="button"
            onClick={() => handlePreviewRoleChange('Manager')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreviewRole === 'Manager'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-white/90 hover:bg-white/15'
            }`}
            title="Preview sidebar as Manager"
          >
            <Briefcase className="w-3.5 h-3.5 text-coral-500" />
            Manager ({roleCounts.manager})
          </button>

          <button
            type="button"
            onClick={() => handlePreviewRoleChange('Staff')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreviewRole === 'Staff'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-white/90 hover:bg-white/15'
            }`}
            title="Preview sidebar as Staff"
          >
            <Package className="w-3.5 h-3.5 text-blue-500" />
            Staff ({roleCounts.staff})
          </button>

          <button
            type="button"
            onClick={() => handlePreviewRoleChange('Customer')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreviewRole === 'Customer'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-white/90 hover:bg-white/15'
            }`}
            title="Preview sidebar as Customer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            Customer ({roleCounts.customer})
          </button>
        </div>
      </div>

      {/* COMPACT PERMISSION CHECKBOX MATRIX TABLE */}
      <div className="commerce-card overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 sm:p-5 border-b border-surface-border bg-surface-muted/20 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-slateText-main flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                Role Permissions & Checkbox Controls
              </h3>
              <p className="text-xs text-slateText-muted mt-0.5">
                Tick karne par use menu dikhega, untick karne par sidebar se hide ho jayega.
              </p>
            </div>

            {/* Reset Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-3 py-1.5 text-xs font-bold text-slateText-main bg-white hover:bg-surface-muted border border-surface-border rounded-xl transition-all shadow-soft-xs flex items-center gap-1.5 cursor-pointer"
                title="Reset to default permissions"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slateText-muted" />
                Reset Defaults
              </button>
            </div>
          </div>

          {/* Search & Category Filter Pills */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slateText-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search function, coupon, order..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-surface-border bg-white outline-none focus:border-brand-500 font-medium"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-brand-600 text-white shadow-soft-xs'
                      : 'bg-white text-slateText-main hover:bg-surface-muted border border-surface-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clean, Unified Checkbox Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border text-[11px] font-extrabold uppercase bg-surface-muted/60 text-slateText-muted tracking-wider">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-4 min-w-[220px]">Function / Menu</th>
                <th className="py-3 px-3">Module</th>
                <th className="py-3 px-3">Route</th>

                {/* Admin Column */}
                <th className="py-3 px-3 text-center w-28 bg-purple-50/50 border-x border-purple-100/60">
                  <div className="flex flex-col items-center">
                    <span className="text-brand-700 font-black flex items-center gap-1 text-[11px]">
                      <Crown className="w-3 h-3 text-amber-500" />
                      ADMIN
                    </span>
                    <span className="text-[9px] text-brand-600/70 font-semibold">
                      ({roleCounts.admin}/{roleCounts.total})
                    </span>
                  </div>
                </th>

                {/* Manager Column */}
                <th className="py-3 px-3 text-center w-32 bg-coral-50/50 border-r border-coral-100/60">
                  <div className="flex flex-col items-center">
                    <span className="text-coral-700 font-black flex items-center gap-1 text-[11px]">
                      <Briefcase className="w-3 h-3 text-coral-600" />
                      MANAGER
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <button
                        type="button"
                        onClick={() => handleBulkToggleRole('Manager', true)}
                        className="text-[9px] font-bold text-coral-600 hover:underline cursor-pointer"
                      >
                        All
                      </button>
                      <span className="text-[9px] text-slateText-muted">•</span>
                      <button
                        type="button"
                        onClick={() => handleBulkToggleRole('Manager', false)}
                        className="text-[9px] font-bold text-slateText-muted hover:underline cursor-pointer"
                      >
                        None
                      </button>
                    </div>
                  </div>
                </th>

                {/* Staff Column */}
                <th className="py-3 px-3 text-center w-32 bg-blue-50/50 border-r border-blue-100/60">
                  <div className="flex flex-col items-center">
                    <span className="text-blue-700 font-black flex items-center gap-1 text-[11px]">
                      <Package className="w-3 h-3 text-blue-600" />
                      STAFF
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <button
                        type="button"
                        onClick={() => handleBulkToggleRole('Staff', true)}
                        className="text-[9px] font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        All
                      </button>
                      <span className="text-[9px] text-slateText-muted">•</span>
                      <button
                        type="button"
                        onClick={() => handleBulkToggleRole('Staff', false)}
                        className="text-[9px] font-bold text-slateText-muted hover:underline cursor-pointer"
                      >
                        None
                      </button>
                    </div>
                  </div>
                </th>

                {/* Customer Column */}
                <th className="py-3 px-3 text-center w-32 bg-emerald-50/50 border-r border-emerald-100/60">
                  <div className="flex flex-col items-center">
                    <span className="text-emerald-800 font-black flex items-center gap-1 text-[11px]">
                      <ShoppingBag className="w-3 h-3 text-emerald-600" />
                      CUSTOMER
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <button
                        type="button"
                        onClick={() => handleBulkToggleRole('Customer', true)}
                        className="text-[9px] font-bold text-emerald-700 hover:underline cursor-pointer"
                      >
                        All
                      </button>
                      <span className="text-[9px] text-slateText-muted">•</span>
                      <button
                        type="button"
                        onClick={() => handleBulkToggleRole('Customer', false)}
                        className="text-[9px] font-bold text-slateText-muted hover:underline cursor-pointer"
                      >
                        None
                      </button>
                    </div>
                  </div>
                </th>

                <th className="py-3 px-4 text-center">Active Roles</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-border text-xs font-medium">
              {filteredFunctions.map((fn, idx) => {
                const ItemIcon = fn.icon;
                const assignedRoles = permissionsMap[fn.path] || [];
                const isAdminChecked = assignedRoles.includes('Admin');
                const isManagerChecked = assignedRoles.includes('Manager');
                const isStaffChecked = assignedRoles.includes('Staff');
                const isCustomerChecked = assignedRoles.includes('Customer');

                return (
                  <tr
                    key={fn.id}
                    className="hover:bg-brand-50/20 transition-colors group"
                  >
                    {/* Row Number */}
                    <td className="py-3 px-3 text-center font-bold text-slateText-muted">
                      {idx + 1}
                    </td>

                    {/* Function Name & Desc */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-soft-xs border border-surface-border ${fn.iconColor}`}>
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-extrabold text-slateText-main text-xs">
                            {fn.label}
                          </p>
                          <p className="text-[11px] text-slateText-muted leading-tight mt-0.5">
                            {fn.desc}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg border ${fn.categoryColor}`}>
                        {fn.category}
                      </span>
                    </td>

                    {/* URL Route */}
                    <td className="py-3 px-3 font-mono text-[11px] text-slateText-muted">
                      {fn.path}
                    </td>

                    {/* ADMIN CHECKBOX */}
                    <td className="py-3 px-3 text-center align-middle bg-purple-50/30 border-x border-purple-100/50">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={isAdminChecked}
                          onChange={() => handleToggleRoleCheckbox(fn.path, 'Admin', fn.label)}
                          className="w-4 h-4 rounded border-purple-300 text-brand-600 focus:ring-brand-500 cursor-pointer accent-brand-600"
                        />
                      </label>
                    </td>

                    {/* MANAGER CHECKBOX */}
                    <td className="py-3 px-3 text-center align-middle bg-coral-50/30 border-r border-coral-100/50">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={isManagerChecked}
                          onChange={() => handleToggleRoleCheckbox(fn.path, 'Manager', fn.label)}
                          className="w-4 h-4 rounded border-coral-300 text-coral-600 focus:ring-coral-500 cursor-pointer accent-coral-600"
                        />
                      </label>
                    </td>

                    {/* STAFF CHECKBOX */}
                    <td className="py-3 px-3 text-center align-middle bg-blue-50/30 border-r border-blue-100/50">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={isStaffChecked}
                          onChange={() => handleToggleRoleCheckbox(fn.path, 'Staff', fn.label)}
                          className="w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                      </label>
                    </td>

                    {/* CUSTOMER CHECKBOX */}
                    <td className="py-3 px-3 text-center align-middle bg-emerald-50/30 border-r border-emerald-100/50">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={isCustomerChecked}
                          onChange={() => handleToggleRoleCheckbox(fn.path, 'Customer', fn.label)}
                          className="w-4 h-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                        />
                      </label>
                    </td>

                    {/* Active Visibility Status Tag */}
                    <td className="py-3 px-4 text-center">
                      {assignedRoles.length === 4 ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ All 4 Roles
                        </span>
                      ) : assignedRoles.length === 0 ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                          ✕ Hidden Everywhere
                        </span>
                      ) : (
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          {assignedRoles.map((r) => (
                            <span
                              key={r}
                              className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                r === 'Admin'
                                  ? 'bg-purple-100 text-brand-700'
                                  : r === 'Manager'
                                  ? 'bg-coral-100 text-coral-700'
                                  : r === 'Staff'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Info Banner */}
        <div className="p-3.5 bg-surface-muted/40 border-t border-surface-border flex items-center justify-between text-xs text-slateText-muted">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-600 shrink-0" />
            <span>
              Admin, Manager, Staff ya Customer ke checkbox tick/untick karte hi unka sidebar access turant update ho jata hai.
            </span>
          </div>
          <span className="font-bold text-slateText-main">
            Showing {filteredFunctions.length} of {ALL_FUNCTIONS_LIST.length} Functions
          </span>
        </div>
      </div>

      {/* USERS & CUSTOMER ACCOUNTS DIRECTORY */}
      <div className="commerce-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-surface-border bg-surface-muted/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slateText-main flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-600" />
              Users & Customer Accounts ({users.length})
            </h3>
            <p className="text-xs text-slateText-muted mt-0.5">
              Assigned logins with current security roles
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border text-[11px] font-extrabold uppercase bg-surface-muted/50 text-slateText-muted tracking-wider">
                <th className="py-3 px-4">Account / User</th>
                <th className="py-3 px-4">Department / Account Type</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-sm font-medium">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-brand-50/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={u.name}
                        className="w-8 h-8 rounded-xl object-cover ring-1 ring-surface-border shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-slateText-main">{u.name}</p>
                        <p className="text-[11px] text-slateText-muted">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-xs font-semibold text-slateText-main">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-surface-muted text-slateText-main border border-surface-border">
                      {u.department || (u.role === 'Customer' ? 'Registered Shopper' : 'Operations')}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {u.role === 'Admin' ? (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-brand-700 border border-brand-200">
                        Admin (Full Control)
                      </span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          u.role === 'Manager'
                            ? 'bg-coral-50 text-coral-700 border-coral-200'
                            : u.role === 'Staff'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                        <option value="Customer">Customer</option>
                      </select>
                    )}
                  </td>

                  <td className="py-3 px-4 text-xs font-semibold text-slateText-muted">
                    {u.phone || '+91 98000 00000'}
                  </td>

                  <td className="py-3 px-4 text-right">
                    {u.role !== 'Admin' && (
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-1.5 rounded-lg text-slateText-muted hover:text-roseDanger-600 hover:bg-roseDanger-50 transition-colors cursor-pointer"
                        title="Remove Account"
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

      {/* Invite Member Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Invite Team Member / Customer">
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Full Name *</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="e.g. Vikram Sharma"
              required
              className="w-full px-4 py-2 rounded-xl border text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slateText-main mb-1">Work / Customer Email *</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="vikram@kiaan.com"
              required
              className="w-full px-4 py-2 rounded-xl border text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Contact Phone</label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder="+91 98000 00000"
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1">Security Role *</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border text-sm font-bold outline-none focus:border-brand-500 bg-white"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={UserPlus}>
              Send Invite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
