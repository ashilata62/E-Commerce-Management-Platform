import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Users, Megaphone, BarChart2 } from 'lucide-react';

export const MobileNavigation = () => {
  const navItems = [
    { label: 'Home', path: '/', icon: LayoutDashboard },
    { label: 'Products', path: '/products', icon: ShoppingBag },
    { label: 'Orders', path: '/orders', icon: Package },
    { label: 'Customers', path: '/customers', icon: Users },
    { label: 'Marketing', path: '/campaigns', icon: Megaphone },
    { label: 'Analytics', path: '/analytics/sales', icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-surface-border lg:hidden px-2 py-1.5 flex items-center justify-around shadow-soft-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-brand-600 font-bold scale-105'
                  : 'text-slateText-muted hover:text-slateText-main font-medium'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
