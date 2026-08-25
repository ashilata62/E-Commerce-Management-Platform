import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, TrendingUp, ShoppingBag, Package } from 'lucide-react';

export const Hero = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-32 pb-12 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#F8F5FF] via-[#FFF3F8] to-[#F0FDF4] border-b border-surface-border">
      {/* Vibrant Background Gradients */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-purple-300/40 rounded-full blur-[90px] sm:blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-pink-300/40 rounded-full blur-[90px] sm:blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-8">
          
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs sm:text-sm font-bold mb-4 sm:mb-6 border border-purple-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
              The Ultimate Clothing & Fashion Store OS
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15] text-slate-900">
              Grow Your Clothing & Fashion Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">Faster Than Ever</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-sm sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              Manage apparel inventory, track customer orders, view live sales reports, and launch high-converting fashion campaigns in one simple app.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              <Link to="/register" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl sm:rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_rgba(168,85,247,0.5)]">
                Start Selling & Shopping <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <a href="#features" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl sm:rounded-full font-bold text-sm sm:text-base md:text-lg transition-all border border-purple-100 flex items-center justify-center shadow-sm hover:-translate-y-0.5 active:scale-95">
                View Features
              </a>
            </motion.div>
            
            <motion.p variants={fadeUp} className="text-xs sm:text-sm text-slate-500 mt-4 font-medium">
              Join 10,000+ fashion & clothing brands. Free customer sign up.
            </motion.p>
          </motion.div>

          {/* Vibrant Image Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: 'spring' }}
            className="flex-1 w-full max-w-lg lg:max-w-2xl mx-auto relative group mt-4 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-3xl sm:rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
            <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative"
            >
              <img 
                src="/images/ecommerce-features.jpg" 
                alt="Clothing & Fashion E-Commerce Store Platform" 
                className="w-full h-auto rounded-3xl sm:rounded-[3rem] relative z-10 border-2 sm:border-4 border-white shadow-2xl object-cover aspect-square"
              />

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-xl border border-purple-100 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-extrabold text-slate-800">
                <span className="text-xs sm:text-base">👗</span>
                <span>Fashion & Clothes Store</span>
              </div>

              <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-xl border border-pink-100 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-extrabold text-slate-800">
                <span className="text-xs sm:text-base">🚚</span>
                <span>Live Order & Courier Tracking</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
