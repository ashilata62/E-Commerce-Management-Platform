import React from 'react';
import { motion } from 'framer-motion';

export const ProductPreview = () => {
  return (
    <section className="py-12 sm:py-24 bg-surface-bg border-b border-surface-border overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 text-slateText-main tracking-tight"
          >
            See Your Marketing Performance at a Glance
          </motion.h2>
        </div>

        <div className="flex flex-col xl:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          
          {/* Left Side: Graph/Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex-1 w-full relative"
          >
            <div className="absolute inset-0 bg-brand-300/30 rounded-full blur-[100px] -z-10 pointer-events-none" />
            
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-surface-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-4 sm:p-6 md:p-8 text-left relative overflow-hidden">
               
               {/* Top KPI Cards */}
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
                  {[
                    { label: "Revenue", val: "$42,890.00", trend: "+12.5%", color: "text-emeraldGreen-500", bg: "bg-emeraldGreen-50" },
                    { label: "Orders", val: "842", trend: "+5.2%", color: "text-brand-600", bg: "bg-brand-50" },
                    { label: "Conv. Rate", val: "3.2%", trend: "+0.8%", color: "text-coral-500", bg: "bg-coral-50" },
                    { label: "Customers", val: "4,120", trend: "+14.1%", color: "text-warm-500", bg: "bg-warm-50" }
                  ].map((kpi, i) => (
                    <div key={i} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-surface-border hover:shadow-soft-md transition-shadow cursor-default bg-surface-bg flex flex-col justify-center">
                       <div className="text-[10px] sm:text-xs font-bold text-slateText-muted uppercase tracking-wider mb-1 sm:mb-2">{kpi.label}</div>
                       <div className="text-base sm:text-xl md:text-2xl font-black text-slateText-main mb-1 truncate">{kpi.val}</div>
                       <div className={`text-[9px] sm:text-[10px] font-bold ${kpi.color} px-1.5 py-0.5 rounded-md ${kpi.bg} inline-block self-start`}>{kpi.trend}</div>
                    </div>
                  ))}
               </div>

               {/* Middle Revenue Chart */}
               <div className="bg-surface-bg border border-surface-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                     <div className="text-sm sm:text-base font-bold text-slateText-main">Revenue Overview</div>
                     <div className="px-2.5 py-1 bg-white border border-surface-border rounded-lg text-[10px] sm:text-xs font-bold text-slateText-main shadow-sm">Last 30 Days</div>
                  </div>
                  <div className="h-48 flex items-end justify-between gap-2 px-2 relative">
                     <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
                        {[1,2,3,4].map(i => <div key={i} className="w-full border-b border-surface-border border-dashed" />)}
                     </div>
                     {[30, 45, 20, 50, 70, 85, 60, 40, 95, 100, 80, 65, 55, 90].map((h, i) => (
                        <div key={i} className="flex-1 bg-brand-100 rounded-t-sm group relative h-full flex items-end">
                           <motion.div 
                             initial={{ height: 0 }}
                             whileInView={{ height: `${h}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1, delay: i * 0.05, type: 'spring' }}
                             className="w-full bg-brand-500 rounded-t-sm group-hover:bg-brand-600 transition-colors"
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Bottom Campaign Table */}
               <div className="bg-white border border-surface-border rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-surface-border bg-surface-bg font-bold text-slateText-main flex justify-between items-center">
                    Campaign Performance
                    <span className="text-xs text-brand-600 cursor-pointer hover:underline">View All</span>
                  </div>
                  <div className="divide-y divide-surface-border">
                     {[
                       { name: "Welcome Email Series", status: "Active", rev: "$4,200", conv: "5.4%" },
                       { name: "Summer Retargeting Ad", status: "Active", rev: "$8,950", conv: "2.1%" },
                       { name: "Abandoned Cart Flow", status: "Active", rev: "$2,100", conv: "8.2%" }
                     ].map((camp, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-surface-bg transition-colors">
                           <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100 text-xs font-bold text-brand-600 shrink-0">
                               {i + 1}
                             </div>
                             <div>
                               <div className="font-bold text-slateText-main text-xs sm:text-sm">{camp.name}</div>
                               <div className="text-xs text-emeraldGreen-500 font-bold mt-0.5">{camp.status}</div>
                             </div>
                           </div>
                           <div className="flex gap-4 sm:gap-8 text-right">
                             <div>
                               <div className="text-[10px] sm:text-xs text-slateText-muted font-bold">Revenue</div>
                               <div className="text-xs sm:text-sm font-bold text-slateText-main">{camp.rev}</div>
                             </div>
                             <div className="hidden sm:block">
                               <div className="text-[10px] sm:text-xs text-slateText-muted font-bold">Conv.</div>
                               <div className="text-xs sm:text-sm font-bold text-slateText-main">{camp.conv}</div>
                             </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Side: Animated Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: 'spring' }}
            className="flex-1 w-full max-w-xl mx-auto xl:mx-0 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
            
            <motion.div
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="/images/marketing-performance.jpg" 
                alt="Marketing Performance Growth" 
                className="w-full h-auto rounded-[3rem] relative z-10 border-4 border-white shadow-2xl object-cover aspect-square"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
