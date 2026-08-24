import React from 'react';
import { motion } from 'framer-motion';

export const TrustSection = () => {
  return (
    <section className="py-12 border-b border-surface-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-bold text-brand-500 uppercase tracking-wider mb-8">Trusted by growing e-commerce teams</p>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        >
           {/* Abstract brand placeholders */}
           <div className="text-2xl font-black font-serif tracking-tighter">AuraSpace</div>
           <div className="text-xl font-extrabold tracking-wide">BoltCommerce</div>
           <div className="text-2xl font-bold font-mono">LUMIN</div>
           <div className="text-xl font-bold italic">GlobalCart</div>
           <div className="text-2xl font-black tracking-widest">PaySwift</div>
        </motion.div>
      </div>
    </section>
  );
};
