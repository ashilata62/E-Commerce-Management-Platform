import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Sparkles,
  Award,
  Package,
  RotateCcw,
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
  ShieldCheck,
  ExternalLink,
  Crown,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { KiaanBrandLogo } from '../common/KiaanLogo';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user } = useAuth();
  const toast = useToast();
  const location = useLocation();

  const currentRole = user?.role || 'Admin';

  const customerNavSections = [
    {
      title: null,
      items: [
        { label: 'My Account Hub', path: '/', icon: LayoutDashboard, roles: ['Customer'] },
      ],
    },
    {
      title: 'SHOPPING & ORDERS',
      items: [
        { label: 'Browse Store', path: '/products', icon: ShoppingBag, badge: 'Deals', roles: ['Customer'] },
        { label: 'My Orders', path: '/orders', icon: Package, badge: '2', roles: ['Customer'] },
        { label: 'Returns & Refunds', path: '/returns', icon: RotateCcw, roles: ['Customer'] },
      ],
    },
  ];

  const allNavSections = [
    {
      title: null,
      items: [
        { label: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Staff'] },
      ],
    },
    {
      title: 'STORE',
      items: [
        { label: 'Products', path: '/products', icon: ShoppingBag, badge: '8', roles: ['Admin', 'Manager', 'Staff'] },
        { label: 'Categories', path: '/categories', icon: Layers, roles: ['Admin', 'Manager'] },
        { label: 'Collections', path: '/collections', icon: Sparkles, roles: ['Admin', 'Manager'] },
        { label: 'Brands', path: '/brands', icon: Award, roles: ['Admin', 'Manager'] },
      ],
    },
    {
      title: 'ORDERS',
      items: [
        { label: 'All Orders', path: '/orders', icon: Package, badge: '128', roles: ['Admin', 'Manager', 'Staff'] },
        { label: 'Returns', path: '/returns', icon: RotateCcw, roles: ['Admin', 'Manager', 'Staff'] },
        { label: 'Cancellations', path: '/cancellations', icon: Ban, roles: ['Admin', 'Manager', 'Staff'] },
      ],
    },
    {
      title: 'CUSTOMERS',
      items: [
        { label: 'All Customers', path: '/customers', icon: Users, roles: ['Admin', 'Manager', 'Staff'] },
        { label: 'Segments', path: '/customer-segments', icon: UserCheck, roles: ['Admin', 'Manager'] },
        { label: 'Reviews', path: '/reviews', icon: MessageSquareQuote, roles: ['Admin', 'Manager'] },
      ],
    },
    {
      title: 'MARKETING',
      items: [
        { label: 'Campaigns', path: '/campaigns', icon: Megaphone, badge: 'Live', roles: ['Admin', 'Manager'] },
        { label: 'Coupons', path: '/coupons', icon: Ticket, roles: ['Admin', 'Manager'] },
        { label: 'Flash Sale', path: '/flash-sale', icon: Zap, badge: 'HOT', roles: ['Admin', 'Manager'] },
        { label: 'Affiliates', path: '/affiliates', icon: Share2, roles: ['Admin', 'Manager'] },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { label: 'Sales Analytics', path: '/analytics/sales', icon: TrendingUp, roles: ['Admin', 'Manager'] },
        { label: 'Product Analytics', path: '/analytics/products', icon: BarChart2, roles: ['Admin', 'Manager'] },
        { label: 'Customer Analytics', path: '/analytics/customers', icon: PieChart, roles: ['Admin', 'Manager'] },
        { label: 'Reports', path: '/reports', icon: FileText, roles: ['Admin'] },
        { label: 'AI Insights', path: '/ai-assistant', icon: Sparkles, badge: 'AI', roles: ['Admin', 'Manager'] },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { label: 'Store Settings', path: '/settings/store', icon: Store, roles: ['Admin'] },
        { label: 'Payment', path: '/settings/payment', icon: CreditCard, roles: ['Admin'] },
        { label: 'Shipping', path: '/settings/shipping', icon: Truck, roles: ['Admin'] },
        { label: 'Users & Roles', path: '/settings/users-roles', icon: ShieldCheck, roles: ['Admin'] },
      ],
    },
  ];

  // Dynamically filter sections and items according to the logged-in user's role
  const navSections = currentRole === 'Customer'
    ? customerNavSections
    : allNavSections
        .map(section => ({
          ...section,
          items: section.items.filter(item => !item.roles || item.roles.includes(currentRole)),
        }))
        .filter(section => section.items.length > 0);

  const handleStorePreview = (e) => {
    e.preventDefault();
    toast.info('Opening live storefront preview modal / sandbox...');
  };

  const handleUpgradeClick = () => {
    toast.success('Enterprise Plus unlocked: Unlimited Flash Sales & Global Multi-Currency ready!');
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#F4F0FD] border-r border-[#E7E0F7] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo & Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E7E0F7] shrink-0 bg-[#F4F0FD]">
          <NavLink to="/" className="group" onClick={() => setIsMobileOpen(false)}>
            <KiaanBrandLogo size="md" />
          </NavLink>

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slateText-muted hover:text-slateText-main hover:bg-white/70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {section.title && (
                <p className="px-3 text-[10px] font-bold text-[#9C98B0] tracking-wider uppercase">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-150 group ${
                        isActive
                          ? 'bg-[#E4DAFA] text-[#6C4DF6] font-extrabold'
                          : 'text-[#68647A] font-semibold hover:text-[#202124] hover:bg-white/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-[#6C4DF6]'
                              : 'text-[#858099] group-hover:text-[#202124]'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/60 text-[#6C4DF6]'
                              : item.badge === 'HOT'
                              ? 'bg-coral-50 text-coral-500 border border-coral-200'
                              : item.badge === 'Live'
                              ? 'bg-emeraldGreen-50 text-emeraldGreen-500 border border-emeraldGreen-500/20'
                              : item.badge === 'AI'
                              ? 'bg-purple-100 text-brand-700'
                              : 'bg-[#E5DCF9] text-[#6C4DF6]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Quick Promotion & Store View */}
        <div className="p-3 border-t border-[#E7E0F7] shrink-0 bg-[#F4F0FD] space-y-2">
          {currentRole === 'Customer' ? (
            /* Customer Rewards & Wishlist Box */
            <div
              onClick={() => toast.success('You have ₹450 (1,280 Coins) ready to use on any checkout!')}
              className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white cursor-pointer hover:shadow-soft-md transition-all duration-200 relative overflow-hidden group shadow-soft-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold leading-none">₹450 Wallet Coins</h5>
                    <p className="text-[10px] text-white/90 mt-0.5">Gold Member Perks</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ) : (
            /* Merchant Upgrade Plan Card */
            <div
              onClick={handleUpgradeClick}
              className="p-3 rounded-2xl bg-gradient-to-r from-[#6C4DF6] to-[#8A6AF8] text-white cursor-pointer hover:shadow-purple-glow transition-all duration-200 relative overflow-hidden group shadow-soft-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Crown className="w-4 h-4 text-warm-300" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold leading-none">Upgrade Plan</h5>
                    <p className="text-[10px] text-white/80 mt-0.5">Grow your business</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          )}

          {/* View Your Store External link */}
          <a
            href="#store-preview"
            onClick={handleStorePreview}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-bold text-slateText-main bg-white hover:bg-white/90 hover:text-brand-600 border border-[#E7E0F7] transition-colors shadow-soft-sm"
          >
            <span className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-brand-500" />
              {currentRole === 'Customer' ? 'Explore Store Deals' : 'View Your Store'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slateText-muted" />
          </a>
        </div>
      </aside>
    </>
  );
};
