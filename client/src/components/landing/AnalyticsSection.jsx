import React from 'react';
import { motion } from 'framer-motion';

export const AnalyticsSection = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <section id="analytics" className="py-24 bg-brand-600 text-white relative overflow-hidden">
      {/* Dark background lighting effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500 rounded-full blur-[150px] -z-0 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coral-500 rounded-full blur-[150px] -z-0 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            {...fadeUp}
            className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight"
          >
            See What's Driving Your Growth
          </motion.h2>
          <motion.p 
            {...fadeUp}
            className="text-xl text-white/70 font-medium leading-relaxed"
          >
            Stop drowning in spreadsheets. Get clear, visual, and actionable insights into your entire e-commerce marketing ecosystem.
          </motion.p>
        </div>

        {/* Vibrant Visual Analytics Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="rounded-[3rem] bg-white/5 border border-white/10 p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8"
        >
           {/* Top Metrics Column */}
           <div className="flex-1 flex flex-col gap-4 w-full">
              {[
                { label: "Total Revenue", val: "$1,204,500", trend: "+14.2%" },
                { label: "Total Orders", val: "8,432", trend: "+8.1%" },
                { label: "Avg. Conversion", val: "4.8%", trend: "+1.2%" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                   <div className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2">{stat.label}</div>
                   <div className="text-3xl font-black text-white mb-2">{stat.val}</div>
                   <div className={`text-sm font-bold text-emeraldGreen-400`}>
                     {stat.trend} vs last month
                   </div>
                </div>
              ))}
           </div>

           {/* Image Area */}
           <div className="flex-[2] relative group w-full">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-emeraldGreen-500 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
             <img 
                src="/images/analytics-mockup.jpg" 
                alt="E-Commerce Analytics Dashboard" 
                className="w-full h-auto rounded-[2rem] relative z-10 border-4 border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] object-cover"
             />
           </div>
        </motion.div>

      </div>
    </section>
  );
};

