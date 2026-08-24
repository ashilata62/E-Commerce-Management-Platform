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
      title: 'MY ACCOUNT',
      items: [
        {
          label: 'My Account Hub',
          desc: 'Order Status & Wallet Coins',
          path: '/',
          icon: LayoutDashboard,
          roles: ['Customer']
        },
      ],
    },
    {
      title: 'SHOPPING & ORDERS',
      items: [
        {
          label: 'Browse Store',
          desc: 'Shop Latest Clothing & Outfits',
          path: '/products',
          icon: ShoppingBag,
          badge: 'Deals',
          roles: ['Customer']
        },
        {
          label: 'My Orders',
          desc: 'Live BlueDart Courier Tracking',
          path: '/orders',
          icon: Package,
          badge: '2',
          roles: ['Customer']
        },
        {
          label: 'Returns & Refunds',
          desc: '7-Day Size Exchange & RMA',
          path: '/returns',
          icon: RotateCcw,
          roles: ['Customer']
        },
      ],
    },
  ];

  const allNavSections = [
    {
      title: 'MAIN HUB',
      items: [
        {
          label: 'Dashboard',
          desc: 'Live Sales & Store Operations',
          path: '/',
          icon: LayoutDashboard,
          roles: ['Admin', 'Manager', 'Staff']
        },
      ],
    },
    {
      title: 'STORE (Catalog & Stock)',
      items: [
        {
          label: 'Products',
          desc: 'Manage Stock, Sizes & Prices',
          path: '/products',
          icon: ShoppingBag,
          badge: '12',
          roles: ['Admin', 'Manager', 'Staff']
        },
        {
          label: 'Categories',
          desc: 'Ethnic, Western, Kids & Formals',
          path: '/categories',
          icon: Layers,
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Collections',
          desc: 'Seasonal & Featured Outfit Sets',
          path: '/collections',
          icon: Sparkles,
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Brands',
          desc: 'Kaira, UrbanThread & Heritage',
          path: '/brands',
          icon: Award,
          roles: ['Admin', 'Manager']
        },
      ],
    },
    {
      title: 'ORDERS (Fulfillment & Shipping)',
      items: [
        {
          label: 'All Orders',
          desc: 'Packing, Invoices & BlueDart AWB',
          path: '/orders',
          icon: Package,
          badge: '128',
          roles: ['Admin', 'Manager', 'Staff']
        },
        {
          label: 'Returns',
          desc: 'Size Exchanges & Doorstep RMA',
          path: '/returns',
          icon: RotateCcw,
          roles: ['Admin', 'Manager', 'Staff']
        },
        {
          label: 'Cancellations',
          desc: 'Refunds & Auto-Restock',
          path: '/cancellations',
          icon: Ban,
          roles: ['Admin', 'Manager', 'Staff']
        },
      ],
    },
    {
      title: 'CUSTOMERS (CRM & Reviews)',
      items: [
        {
          label: 'All Customers',
          desc: 'Buyer Profiles, History & LTV',
          path: '/customers',
          icon: Users,
          roles: ['Admin', 'Manager', 'Staff']
        },
        {
          label: 'Segments',
          desc: 'VIP & High-Value Shopper Groups',
          path: '/customer-segments',
          icon: UserCheck,
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Reviews',
          desc: 'Ratings & Photo Feedback Moderation',
          path: '/reviews',
          icon: MessageSquareQuote,
          roles: ['Admin', 'Manager']
        },
      ],
    },
    {
      title: 'MARKETING (Growth & Offers)',
      items: [
        {
          label: 'Campaigns',
          desc: 'WhatsApp & Email Sales Blasts',
          path: '/campaigns',
          icon: Megaphone,
          badge: 'Live',
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Coupons',
          desc: 'Discount Codes (FESTIVE20)',
          path: '/coupons',
          icon: Ticket,
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Flash Sale',
          desc: 'Timed Ticking Sale Markdowns',
          path: '/flash-sale',
          icon: Zap,
          badge: 'HOT',
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Affiliates',
          desc: 'Influencer Referral Commissions',
          path: '/affiliates',
          icon: Share2,
          roles: ['Admin', 'Manager']
        },
      ],
    },
    {
      title: 'ANALYTICS (Reports & AI)',
      items: [
        {
          label: 'Sales Analytics',
          desc: 'Daily & Monthly Revenue Growth',
          path: '/analytics/sales',
          icon: TrendingUp,
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Product Analytics',
          desc: 'Top-Selling Outfits & Demand',
          path: '/analytics/products',
          icon: BarChart2,
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Customer Analytics',
          desc: 'Retention & Average Order Value',
          path: '/analytics/customers',
          icon: PieChart,
          roles: ['Admin', 'Manager']
        },
        {
          label: 'Reports',
          desc: 'GST, Tax & Financial PDF Export',
          path: '/reports',
          icon: FileText,
          roles: ['Admin']
        },
        {
          label: 'AI Insights',
          desc: 'Smart Price & Restock Assistant',
          path: '/ai-assistant',
          icon: Sparkles,
          badge: 'AI',
          roles: ['Admin', 'Manager']
        },
      ],
    },
    {
      title: 'SETTINGS (System & Setup)',
      items: [
        {
          label: 'Store Settings',
          desc: 'Logo Branding, Contact & Currency',
          path: '/settings/store',
          icon: Store,
          roles: ['Admin']
        },
        {
          label: 'Payment',
          desc: 'UPI, Razorpay, Cards & COD Setup',
          path: '/settings/payment',
          icon: CreditCard,
          roles: ['Admin']
        },
        {
          label: 'Shipping',
          desc: 'Courier Rates & Free Over ₹999',
          path: '/settings/shipping',
          icon: Truck,
          roles: ['Admin']
        },
        {
          label: 'Users & Roles',
          desc: 'Staff Team Access Permissions',
          path: '/settings/users-roles',
          icon: ShieldCheck,
          roles: ['Admin']
        },
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

  const handleUpgradeClick = () => {
    toast.success('Enterprise Plus unlocked: Unlimited Flash Sales & Global Multi-Currency ready!');
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Shell (Soft Lavender Variation 1 Theme) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-[#F4F0FD] border-r border-[#E7E0F7] transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E7E0F7] shrink-0 bg-[#F4F0FD]">
          <NavLink to="/" className="flex items-center">
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
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {section.title && (
                <p className="px-3 text-[10px] font-black text-[#8A84A1] tracking-wider uppercase">
                  {section.title}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all duration-150 group ${
                        isActive
                          ? 'bg-[#E4DAFA] text-[#6C4DF6] shadow-soft-sm font-black'
                          : 'text-[#58546A] hover:text-[#202124] hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isActive
                              ? 'bg-[#6C4DF6] text-white shadow-soft-xs'
                              : 'bg-white text-[#68647A] group-hover:text-[#6C4DF6] group-hover:bg-[#E4DAFA]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className={`text-xs leading-snug truncate ${isActive ? 'font-black text-[#6C4DF6]' : 'font-bold text-[#202124]'}`}>
                            {item.label}
                          </span>
                          {item.desc && (
                            <span className={`text-[10px] leading-tight truncate mt-0.5 ${isActive ? 'text-[#6C4DF6]/80 font-medium' : 'text-[#858099] font-normal group-hover:text-slate-600'}`}>
                              {item.desc}
                            </span>
                          )}
                        </div>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full shrink-0 ml-1.5 ${
                            isActive
                              ? 'bg-white text-[#6C4DF6] shadow-soft-xs'
                              : item.badge === 'HOT'
                              ? 'bg-coral-500 text-white shadow-soft-xs'
                              : item.badge === 'Live'
                              ? 'bg-emeraldGreen-500 text-white shadow-soft-xs'
                              : item.badge === 'AI'
                              ? 'bg-purple-600 text-white'
                              : 'bg-[#E4DAFA] text-[#6C4DF6]'
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
                    <Crown className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold leading-none">Enterprise OS</h5>
                    <p className="text-[10px] text-white/90 mt-0.5">Active Merchant Pro</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          )}

          {/* Direct Store View Button */}
          <NavLink
            to="/"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-slateText-muted hover:text-brand-500 hover:bg-white/80 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5" />
              <span>Live Website View</span>
            </div>
            <ExternalLink className="w-3 h-3" />
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
