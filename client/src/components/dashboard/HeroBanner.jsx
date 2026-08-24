import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, TrendingUp, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HeroBanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Kiaan';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6C4DF6] via-[#7B5BF8] to-[#916BFA] text-white p-6 sm:p-8 lg:p-10 shadow-soft-lg">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 rounded-full bg-coral-500/20 blur-xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left hero greeting & description */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wide text-white border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-warm-400" />
            <span>Store Performance Peak</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Good Morning, {firstName}! 👋
          </h2>

          <p className="text-lg sm:text-xl text-white/95 font-semibold">
            Your Store is Performing Great!
          </p>

          <p className="text-sm sm:text-base text-white/80 max-w-md font-medium leading-relaxed">
            You have <span className="text-white font-bold underline decoration-warm-400 underline-offset-4">128 new orders</span> and{' '}
            <span className="text-white font-bold underline decoration-coral-300 underline-offset-4">22 new messages</span> requiring fulfillment.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-extrabold text-sm shadow-soft-md transition-all duration-200 active:scale-95 group"
            >
              <span>View Store Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/orders')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-sm border border-white/20 transition-all duration-200"
            >
              <span>Manage Orders (128)</span>
            </button>
          </div>
        </div>

        {/* Right floating mini stat cards overlay with lifestyle visual */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm">
            {/* Lifestyle Image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-soft-xl border-2 border-white/20 aspect-[4/3] bg-brand-900">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=80"
                alt="Commerce Lifestyle"
                className="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-bold text-white/90">
                Luxe Boutique Experience
              </div>
            </div>

            {/* Floating Mini Stat 1: Orders */}
            <div className="absolute -top-3 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-soft-lg border border-white flex items-center gap-3 animate-bounce-subtle">
              <div className="w-9 h-9 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slateText-muted">Orders</p>
                <p className="text-base sm:text-lg font-black text-slateText-main">128</p>
              </div>
            </div>

            {/* Floating Mini Stat 2: Revenue */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-soft-lg border border-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slateText-muted">Revenue</p>
                <p className="text-base sm:text-lg font-black text-slateText-main">₹2,84,920</p>
              </div>
            </div>

            {/* Floating Mini Stat 3: Visitors */}
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-soft-lg border border-white flex items-center gap-3 hidden sm:flex">
              <div className="w-9 h-9 rounded-xl bg-warm-50 text-warm-600 flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slateText-muted">Visitors</p>
                <p className="text-base sm:text-lg font-black text-slateText-main">12,842</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
