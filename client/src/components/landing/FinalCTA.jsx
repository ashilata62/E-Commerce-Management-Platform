import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-100/60 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-brand-50 rounded-3xl mx-auto flex items-center justify-center mb-8 border border-brand-100 shadow-soft-sm relative"
        >
          {/* Subtle particle animations could go here, for now just the icon */}
          <Zap className="w-10 h-10 text-brand-600 relative z-10" />
          <div className="absolute inset-0 bg-brand-400 rounded-3xl blur-xl opacity-20 animate-pulse" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-slateText-main tracking-tight leading-tight"
        >
          Ready to Turn Marketing <br className="hidden md:block"/> Into Growth?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl text-slateText-muted mb-12 font-medium max-w-2xl mx-auto"
        >
          Bring your e-commerce marketing, insights, and performance into one powerful platform today.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link 
            to="/login" 
            className="px-10 py-5 bg-brand-600 text-white hover:bg-brand-700 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-purple-glow flex items-center justify-center gap-2 group"
          >
            Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="#features" 
            className="px-10 py-5 bg-white text-slateText-main hover:bg-surface-muted border border-surface-border rounded-2xl font-bold text-lg transition-all shadow-soft-sm hover:-translate-y-1 flex items-center justify-center"
          >
            Explore Platform
          </a>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-sm text-slateText-muted font-bold"
        >
          14-day free trial · Cancel anytime · No credit card required
        </motion.p>

      </div>
    </section>
  );
};
