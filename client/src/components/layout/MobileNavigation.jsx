import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Megaphone,
  User,
  Layers,
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const MobileNavigation = () => {
  const { user } = useAuth();
  const { totalItems, openCart } = useCart();
  const currentRole = user?.role || 'Admin';

  const customerNavItems = [
    { label: 'Shop', path: '/products', icon: ShoppingBag },
    { label: 'Categories', path: '/categories', icon: Layers },
    { label: 'My Orders', path: '/orders', icon: Package, badge: '2' },
    { label: 'Account', path: '/customer', icon: User },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/products', icon: ShoppingBag },
    { label: 'Orders', path: '/orders', icon: Package, badge: '128' },
    { label: 'Customers', path: '/customers', icon: Users },
    { label: 'Marketing', path: '/campaigns', icon: Megaphone },
  ];

  const navItems = currentRole === 'Customer' ? customerNavItems : adminNavItems;

  return (
    <>
      {/* Mobile Floating Cart Button for Customers */}
      {currentRole === 'Customer' && (
        <button
          type="button"
          onClick={openCart}
          className="fixed bottom-16 right-4 z-40 lg:hidden p-3.5 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          aria-label="View Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-coral-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
        </button>
      )}

      {/* Flipkart / Amazon Style Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border lg:hidden px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-150 relative ${
                  isActive
                    ? 'text-brand-600 font-extrabold scale-105'
                    : 'text-slateText-muted hover:text-slateText-main font-semibold'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-0.5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 text-[8px] font-black px-1.5 py-0.2 rounded-full bg-coral-500 text-white shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] leading-tight mt-0.5">{item.label}</span>
            </NavLink>
          );
        })}

        {/* Customer Cart Trigger inside Bottom Nav */}
        {currentRole === 'Customer' && (
          <button
            type="button"
            onClick={openCart}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-slateText-muted hover:text-brand-600 transition-all cursor-pointer relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 mb-0.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 text-[8px] font-black px-1.5 py-0.2 rounded-full bg-emerald-500 text-white shadow-xs">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold leading-tight mt-0.5">Cart</span>
          </button>
        )}
      </nav>
    </>
  );
};

export default MobileNavigation;

