import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Gift,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: 'Mumbai',
    address: '',
    gender: 'Female',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in your Name, Email and Password');
      return;
    }

    try {
      setSubmitting(true);
      const res = await register(formData);
      if (res.success) {
        toast.success(`🎉 Welcome ${res.user.name}! ₹250 Welcome shopping cash added to your wallet!`);
        navigate('/products');
      } else {
        toast.error(res.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('An unexpected error occurred during signup');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoCustomer = (demoName, demoEmail, demoPhone, demoCity, demoGender) => {
    setFormData({
      name: demoName,
      email: demoEmail,
      phone: demoPhone,
      password: 'password123',
      city: demoCity,
      address: `Flat 304, Green Heights, ${demoCity}`,
      gender: demoGender,
    });
    toast.info(`Filled demo profile: ${demoName}`);
  };

    return (
    <div 
      className="min-h-screen text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xl pointer-events-none z-0" />

      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-600/30 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-coral-500/20 blur-[140px] pointer-events-none z-0" />

      <div className="w-full max-w-5xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Side: Shopping Perks & VIP Welcome Banner (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#5B51D8] via-[#4F46E5] to-[#7854F7] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />

          {/* Logo */}
          <div className="space-y-4 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-soft-sm">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Kiaan<span className="text-warm-300">Fashion</span>
                </span>
                <span className="block text-[10px] text-white/80 font-bold uppercase tracking-wider">
                  Customer Sign Up
                </span>
              </div>
            </Link>

            <div className="pt-4 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-black backdrop-blur-sm border border-white/20">
                <Gift className="w-3.5 h-3.5 text-warm-300" />
                <span>₹250 Instant Signup Bonus</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                Create Your Account & Start Shopping
              </h2>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-medium">
                Join thousands of shoppers for handpicked Indian ethnic wear, bridal sets, and trendy streetwear with express doorstep delivery.
              </p>
            </div>
          </div>

          {/* Customer Shopping Perks */}
          <div className="my-6 space-y-3 relative z-10">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-white">Free Express Delivery</p>
                <p className="text-white/75 text-[11px]">Free delivery unlocked on your 1st purchase</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-white">100% Genuine Apparel</p>
                <p className="text-white/75 text-[11px]">Directly sourced luxury fabrics & guaranteed quality</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Customer Profiles */}
          <div className="pt-4 border-t border-white/20 relative z-10 space-y-2">
            <p className="text-[11px] font-extrabold uppercase text-white/80 tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-warm-300" />
              <span>1-Click Test Autofill</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoCustomer('Ananya Sharma', 'ananya.sharma@gmail.com', '+91 98234 11223', 'Mumbai', 'Female')}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-left text-xs text-white transition-all cursor-pointer"
              >
                <p className="font-extrabold truncate">👧 Ananya Sharma</p>
                <p className="text-[10px] text-white/75">Mumbai (Female)</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoCustomer('Kabir Mehta', 'kabir.mehta@gmail.com', '+91 98111 22334', 'Delhi', 'Male')}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-left text-xs text-white transition-all cursor-pointer"
              >
                <p className="font-extrabold truncate">👦 Kabir Mehta</p>
                <p className="text-[10px] text-white/75">Delhi (Male)</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Customer Registration
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your details to create your customer profile
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emeraldGreen-50 text-emeraldGreen-600 font-extrabold text-xs border border-emeraldGreen-200">
                Active Shopper Portal
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ananya Sharma"
                    required
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 outline-none focus:border-[#5B51D8] focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 outline-none focus:border-[#5B51D8] focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 outline-none focus:border-[#5B51D8] focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 outline-none focus:border-[#5B51D8] focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Delivery City / Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Delivery City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, Delhi, Bengaluru"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 outline-none focus:border-[#5B51D8] focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Shopping Preference
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 outline-none focus:border-[#5B51D8] font-medium"
                  >
                    <option value="Female">👧 Women & Girls Fashion</option>
                    <option value="Male">👦 Men & Boys Fashion</option>
                    <option value="Kids">👶 Kids & Baby Collection</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5 bg-[#5B51D8] hover:bg-[#4F46E5] text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
                loading={submitting || loading}
                icon={ArrowRight}
                iconPosition="right"
              >
                Create Account & Start Shopping
              </Button>
            </form>
          </div>

          {/* Footer: Sign In Link */}
          <div className="pt-6 mt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600 font-medium">
              Already have a customer account?{' '}
              <Link to="/login" className="font-extrabold text-[#5B51D8] hover:underline">
                Login / Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
