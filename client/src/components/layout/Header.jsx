import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Plus,
  HelpCircle,
  ShoppingBag,
  Megaphone,
  Ticket,
  ChevronDown,
  LogOut,
  Shield,
  User,
  CheckCircle2,
  Package,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';

export const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout, switchDemoRole } = useAuth();
  const { storeStatus, toggleStoreStatus, unreadNotifications, unreadMessages, notifications, markAllAsRead } = useStore();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const quickActionsRef = useRef(null);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target)) {
        setShowQuickActions(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-surface-border px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger menu toggle & Store status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slateText-muted hover:text-slateText-main hover:bg-surface-muted transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Store status pill */}
        <button
          type="button"
          onClick={toggleStoreStatus}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emeraldGreen-50 text-emeraldGreen-500 border border-emeraldGreen-500/20 hover:bg-emeraldGreen-500/10 transition-colors"
          title="Click to toggle store operational mode"
        >
          <span className="w-2 h-2 rounded-full bg-emeraldGreen-500 status-dot-pulse shrink-0" />
          <span>● Store {storeStatus}</span>
        </button>
      </div>

      {/* Center: Large search bar */}
      <form
        onSubmit={handleGlobalSearch}
        className="flex-1 max-w-xl relative hidden md:block"
      >
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slateText-muted absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, orders, customers..."
            className="w-full bg-surface-muted/70 hover:bg-surface-muted focus:bg-white text-slateText-main placeholder:text-slateText-muted border border-surface-border focus:border-brand-500 rounded-xl pl-10 pr-12 py-2 text-sm outline-none transition-all shadow-soft-sm focus:shadow-soft-md"
          />
          <kbd className="absolute right-3 hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-slateText-muted bg-white border border-surface-border rounded shadow-soft-sm pointer-events-none">
            ↵ Enter
          </kbd>
        </div>
      </form>

      {/* Right: Quick actions, Notifications, Messages, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Actions Dropdown */}
        <div className="relative" ref={quickActionsRef}>
          <button
            type="button"
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-600 text-xs sm:text-sm font-bold transition-all shadow-soft-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Action</span>
            <ChevronDown className="w-3.5 h-3.5 text-brand-500" />
          </button>

          {showQuickActions && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-soft-xl border border-surface-border p-2 z-50 animate-fade-in">
              <div className="text-[10px] font-bold text-slateText-muted uppercase px-3 py-1.5">
                Create New
              </div>
              <button
                onClick={() => {
                  setShowQuickActions(false);
                  navigate('/products/add');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slateText-main hover:bg-surface-muted rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
                <span>Add Product</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickActions(false);
                  navigate('/campaigns');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slateText-main hover:bg-surface-muted rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-coral-50 text-coral-500 flex items-center justify-center">
                  <Megaphone className="w-3.5 h-3.5" />
                </div>
                <span>New Campaign</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickActions(false);
                  navigate('/coupons');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slateText-main hover:bg-surface-muted rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-warm-50 text-warm-600 flex items-center justify-center">
                  <Ticket className="w-3.5 h-3.5" />
                </div>
                <span>Create Coupon</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Button & Dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-surface-muted/60 hover:bg-surface-muted text-slateText-muted hover:text-slateText-main transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-soft-xl border border-surface-border p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slateText-main">Notifications</h4>
                  {unreadNotifications > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral-50 text-coral-500">
                      {unreadNotifications} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                >
                  Mark all read
                </button>
              </div>

              <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all ${
                      item.read
                        ? 'bg-white border-surface-border/60 text-slateText-muted'
                        : 'bg-brand-50/40 border-brand-100 text-slateText-main'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold">{item.title}</p>
                      <span className="text-[10px] text-slateText-muted shrink-0">{item.time}</span>
                    </div>
                    <p className="text-xs text-slateText-muted mt-1 leading-snug">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages indicator button */}
        <button
          type="button"
          onClick={() => toast.info(`22 customer support chats waiting in unified inbox.`)}
          className="relative p-2.5 rounded-xl bg-surface-muted/60 hover:bg-surface-muted text-slateText-muted hover:text-slateText-main transition-colors hidden sm:flex"
          aria-label="View messages"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
            {unreadMessages}
          </span>
        </button>

        {/* User Avatar & Profile Switcher */}
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-muted transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-brand-100"
            />
            <div className="text-left hidden xl:block">
              <p className="text-xs font-bold text-slateText-main leading-tight">{user?.name || 'Kiaan Sharma'}</p>
              <p className="text-[10px] text-brand-600 font-semibold">{user?.role || 'Admin'}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slateText-muted hidden xl:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-soft-xl border border-surface-border p-3 z-50 animate-fade-in">
              <div className="p-3 bg-surface-muted/60 rounded-xl mb-3">
                <p className="text-xs font-bold text-slateText-main">{user?.name}</p>
                <p className="text-[11px] text-slateText-muted truncate">{user?.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-50 text-brand-600">
                  <Shield className="w-3 h-3" />
                  Role: {user?.role}
                </div>
              </div>

              {/* Demo Switch Roles */}
              <div className="space-y-1 mb-3 pb-3 border-b border-surface-border">
                <p className="text-[10px] font-bold text-slateText-muted uppercase px-2">
                  Switch Demo Role:
                </p>
                {['Admin', 'Manager', 'Staff'].map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      switchDemoRole(role);
                      setShowUserMenu(false);
                      toast.success(`Switched role profile to ${role}!`);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                      user?.role === role
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-slateText-main hover:bg-surface-muted'
                    }`}
                  >
                    <span>{role}</span>
                    {user?.role === role && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                  navigate('/login');
                  toast.info('Logged out of session');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-roseDanger-500 hover:bg-roseDanger-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
