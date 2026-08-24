import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Lock, Mail, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { KiaanBrandLogo } from '../../components/common/KiaanLogo';

export const Login = () => {
  const navigate = useNavigate();
  const { login, switchDemoRole } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('admin@kiaan.com');
  const [password, setPassword] = useState('password123');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        navigate('/dashboard');
      } else {
        toast.error(res.message || 'Login failed');
      }
    } catch (err) {
      toast.error('An error occurred during login');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = (role) => {
    switchDemoRole(role);
    toast.success(`Logged in instantly as ${role}!`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center p-4 sm:p-6 selection:bg-brand-100">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 mb-2">
          <KiaanBrandLogo size="lg" showBadge={true} badgeText="ENTERPRISE" />
        </div>

        {/* Login Form Card */}
        <div className="commerce-card p-6 sm:p-8 bg-white border border-surface-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slateText-main mb-1.5">
                Work Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slateText-muted absolute left-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kiaan.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/30 focus:bg-white text-sm outline-none focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slateText-main">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] font-bold text-brand-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slateText-muted absolute left-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted/30 focus:bg-white text-sm outline-none focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              loading={submitting}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to Store OS
            </Button>
          </form>

          {/* 1-Click Instant Demo Login Buttons */}
          <div className="mt-6 pt-6 border-t border-surface-border space-y-2.5">
            <p className="text-[11px] font-extrabold uppercase text-slateText-muted tracking-wider text-center">
              1-Click Demo Profiles:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('Admin')}
                className="py-2 px-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-brand-700 text-xs font-bold border border-purple-200 transition-colors text-center"
              >
                👑 Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Manager')}
                className="py-2 px-2 rounded-xl bg-coral-50 hover:bg-coral-100 text-coral-600 text-xs font-bold border border-coral-200 transition-colors text-center"
              >
                📊 Manager
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Staff')}
                className="py-2 px-2 rounded-xl bg-surface-muted hover:bg-gray-200 text-slateText-main text-xs font-bold border border-surface-border transition-colors text-center"
              >
                📦 Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
