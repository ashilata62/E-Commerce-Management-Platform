import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft,
  Lock, 
  Mail, 
  TrendingUp, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Package,
  Truck,
  LineChart
} from 'lucide-react';
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
        if (res.user.role === 'Customer') {
          navigate('/customer');
        } else {
          navigate('/dashboard');
        }
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
    toast.success(`Logged in instantly as ${role === 'Customer' ? 'Customer (Shopper)' : role}!`);
    if (role === 'Customer') {
      navigate('/customer');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#635BFF] via-[#5B51D8] to-[#4F46E5] text-white flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans selection:bg-white selection:text-[#5B51D8]">
      
      {/* Background Soft Lighting Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Grid Container */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">

        {/* Left Side: Easy Clear Project Description & E-Commerce Showcase */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col space-y-6 text-white"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-bold w-max backdrop-blur-md shadow-sm">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
            <span>All-In-One Store Management System</span>
          </div>

          {/* Super Easy & Clear Project Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Manage Your Online Store, <br />
              <span className="text-amber-300 drop-shadow-sm">Products & Sales in One Place</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/95 max-w-xl leading-relaxed font-medium">
              Easily add products, track customer orders live, view daily sales reports, and manage your online business effortlessly from a single dashboard.
            </p>
          </div>

          {/* Easy 3 Key Features */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-white/90">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
              <Package className="w-3.5 h-3.5 text-amber-300" /> Products & Inventory
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
              <Truck className="w-3.5 h-3.5 text-emerald-300" /> Order & Shipping Tracking
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
              <LineChart className="w-3.5 h-3.5 text-purple-200" /> Sales & Revenue Reports
            </span>
          </div>

          {/* Project Feature Card & 3D Illustration */}
          <div className="rounded-[2.5rem] bg-white/10 border border-white/20 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-5 relative overflow-hidden">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/75">Total Store Revenue</p>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">$1,204,500</h3>
                <span className="inline-block text-xs font-bold text-emerald-300 mt-1">+14.2% vs last month</span>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/75">Total Store Orders</p>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">8,432</h3>
                <span className="inline-block text-xs font-bold text-emerald-300 mt-1">+8.1% vs last month</span>
              </motion.div>
            </div>

            {/* 3D E-Commerce Shopping Showcase Image */}
            <div className="relative group rounded-2xl overflow-hidden border border-white/20 shadow-lg">
              <img 
                src="/images/ecommerce-family.jpg" 
                alt="E-Commerce Shopping Features" 
                className="w-full h-48 sm:h-56 object-cover object-center rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white drop-shadow-md">
                <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-300" /> Real-time Store Sync
                </span>
                <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Enterprise Store OS
                </span>
              </div>
            </div>

          </div>
        </motion.div>


        {/* Right Side: Login Form Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 w-full flex flex-col items-start gap-2.5"
        >
          {/* Compact Back to Home Button above Login Card */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] border border-white/25 backdrop-blur-md transition-all shadow-sm active:scale-95 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-amber-300" />
            <span>Back to Home</span>
          </button>

          {/* Form Card */}
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-white text-slate-900 border border-slate-100 shadow-2xl relative overflow-hidden">

            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-600 to-amber-500" />

            {/* Brand Header */}
            <div className="flex flex-col items-center justify-center text-center space-y-2 mb-6">
              <KiaanBrandLogo size="lg" showBadge={true} badgeText="ENTERPRISE" />
              <p className="text-xs text-slate-500 font-medium">Sign in to your Commerce OS Dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kiaan.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 outline-none focus:border-[#5B51D8] focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-[11px] font-bold text-[#5B51D8] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 outline-none focus:border-[#5B51D8] focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5 bg-[#5B51D8] hover:bg-[#4F46E5] text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.99]"
                loading={submitting}
                icon={ArrowRight}
                iconPosition="right"
              >
                Login
              </Button>
            </form>

            {/* 1-Click Instant Demo Login Profiles */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  ⚡ 1-Click Demo Profiles
                </p>
                <span className="text-[10px] text-[#5B51D8] font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">Instant Access</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Admin')}
                  className="py-2.5 px-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#5B51D8] text-xs font-bold border border-indigo-200/80 transition-all text-center hover:shadow-md flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-base">👑</span>
                  <span>Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Manager')}
                  className="py-2.5 px-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200/80 transition-all text-center hover:shadow-md flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-base">📊</span>
                  <span>Manager</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Staff')}
                  className="py-2.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200/80 transition-all text-center hover:shadow-md flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-base">📦</span>
                  <span>Staff</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Customer')}
                  className="py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200/80 transition-all text-center hover:shadow-md flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-base">🛍️</span>
                  <span>Customer</span>
                </button>
              </div>
            </div>

            {/* Link to Register */}
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-600 font-medium">
                New customer?{' '}
                <Link to="/register" className="font-extrabold text-[#5B51D8] hover:underline">
                  Create an account (Get Started)
                </Link>
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

