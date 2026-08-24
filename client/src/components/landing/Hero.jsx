import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, TrendingUp } from 'lucide-react';

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
    <section id="home" className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#F8F5FF] via-[#FFF3F8] to-[#F0FDF4] border-b border-surface-border">
      {/* Vibrant Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-300/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-bold mb-8 border border-purple-200 shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse"></span>
              The Ultimate Shopping Experience
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900">
              Grow Your E-Commerce Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">Faster Than Ever</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              Connect with your customers, manage your products effortlessly, and launch beautiful campaigns that drive massive sales.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.5)]">
                Start Selling Now <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-white/60 hover:bg-white text-slate-800 rounded-full font-bold text-lg transition-all border border-purple-100 flex items-center justify-center shadow-sm hover:-translate-y-1 backdrop-blur-sm">
                View Features
              </a>
            </motion.div>
            
            <motion.p variants={fadeUp} className="text-sm text-slate-500 mt-4">
              Join 10,000+ vibrant brands. No credit card required.
            </motion.p>
          </motion.div>

          {/* Vibrant Image Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: 'spring' }}
            className="flex-1 w-full max-w-2xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
            <motion.div
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="/images/ecommerce-family.jpg" 
                alt="E-Commerce Family Shopping" 
                className="w-full h-auto rounded-[3rem] relative z-10 border-4 border-white shadow-2xl object-cover aspect-square"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
