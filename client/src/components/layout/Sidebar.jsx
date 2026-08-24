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

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user } = useAuth();
  const toast = useToast();
  const location = useLocation();

  const navSections = [
    {
      title: null,
      items: [
        { label: 'Dashboard', path: '/', icon: LayoutDashboard },
      ],
    },
    {
      title: 'STORE',
      items: [
        { label: 'Products', path: '/products', icon: ShoppingBag, badge: '8' },
        { label: 'Categories', path: '/categories', icon: Layers },
        { label: 'Collections', path: '/collections', icon: Sparkles },
        { label: 'Brands', path: '/brands', icon: Award },
      ],
    },
    {
      title: 'ORDERS',
      items: [
        { label: 'All Orders', path: '/orders', icon: Package, badge: '128' },
        { label: 'Returns', path: '/returns', icon: RotateCcw },
        { label: 'Cancellations', path: '/cancellations', icon: Ban },
      ],
    },
    {
      title: 'CUSTOMERS',
      items: [
        { label: 'All Customers', path: '/customers', icon: Users },
        { label: 'Segments', path: '/customer-segments', icon: UserCheck },
        { label: 'Reviews', path: '/reviews', icon: MessageSquareQuote },
      ],
    },
    {
      title: 'MARKETING',
      items: [
        { label: 'Campaigns', path: '/campaigns', icon: Megaphone, badge: 'Live' },
        { label: 'Coupons', path: '/coupons', icon: Ticket },
        { label: 'Flash Sale', path: '/flash-sale', icon: Zap, badge: 'HOT' },
        { label: 'Affiliates', path: '/affiliates', icon: Share2 },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { label: 'Sales Analytics', path: '/analytics/sales', icon: TrendingUp },
        { label: 'Product Analytics', path: '/analytics/products', icon: BarChart2 },
        { label: 'Customer Analytics', path: '/analytics/customers', icon: PieChart },
        { label: 'Reports', path: '/reports', icon: FileText },
        { label: 'AI Insights', path: '/ai-assistant', icon: Sparkles, badge: 'AI' },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { label: 'Store Settings', path: '/settings/store', icon: Store },
        { label: 'Payment', path: '/settings/payment', icon: CreditCard },
        { label: 'Shipping', path: '/settings/shipping', icon: Truck },
        { label: 'Users & Roles', path: '/settings/users-roles', icon: ShieldCheck },
      ],
    },
  ];

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
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-surface-border flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo & Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-surface-border shrink-0 bg-white">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={() => setIsMobileOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-coral-500 flex items-center justify-center text-white shadow-soft-sm group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slateText-main">
                  Kiaan<span className="text-brand-500">Technology</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-200">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slateText-muted font-medium tracking-tight">Commerce Business OS</p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slateText-muted hover:text-slateText-main hover:bg-surface-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {section.title && (
                <p className="px-3 text-[11px] font-extrabold text-slateText-muted tracking-wider uppercase">
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
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 group ${
                        isActive
                          ? 'bg-brand-50 text-brand-600 shadow-soft-sm'
                          : 'text-slateText-muted hover:text-slateText-main hover:bg-surface-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-brand-500'
                              : 'text-slateText-muted group-hover:text-slateText-main'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            item.badge === 'HOT'
                              ? 'bg-coral-50 text-coral-500 border border-coral-200'
                              : item.badge === 'Live'
                              ? 'bg-emeraldGreen-50 text-emeraldGreen-500 border border-emeraldGreen-500/20'
                              : item.badge === 'AI'
                              ? 'bg-purple-100 text-brand-700'
                              : 'bg-surface-muted text-slateText-muted'
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
        <div className="p-3 border-t border-surface-border shrink-0 bg-surface-bg/50 space-y-2">
          {/* Upgrade Plan Card */}
          <div
            onClick={handleUpgradeClick}
            className="p-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white cursor-pointer hover:shadow-purple-glow transition-all duration-200 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-warm-400" />
                </div>
                <div>
                  <h5 className="text-xs font-bold leading-none">Upgrade Plan</h5>
                  <p className="text-[10px] text-white/80 mt-0.5">Grow your business</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* View Your Store External link */}
          <a
            href="#store-preview"
            onClick={handleStorePreview}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-bold text-slateText-main bg-white hover:bg-brand-50 hover:text-brand-600 border border-surface-border transition-colors shadow-soft-sm"
          >
            <span className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-brand-500" />
              View Your Store
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slateText-muted" />
          </a>
        </div>
      </aside>
    </>
  );
};
