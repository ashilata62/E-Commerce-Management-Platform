import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Users, LineChart, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeatureShowcase = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  const slideRight = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  };

  const slideLeft = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  };

  return (
    <section id="solutions" className="py-12 sm:py-24 bg-surface-bg overflow-hidden flex flex-col gap-14 sm:gap-32">
      
      {/* Showcase 1: Campaigns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-16">
          <motion.div {...fadeUp} className="flex-1 lg:pr-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-4 sm:mb-6 border border-brand-100">
              <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 text-brand-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-6 leading-tight text-slateText-main">
              Campaigns That Drive Results
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-slateText-muted mb-4 sm:mb-8 leading-relaxed font-medium">
              Launch, manage, and scale your marketing campaigns across multiple channels. Monitor budget, reach, and real-time conversions without switching tabs.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm sm:text-lg hover:text-brand-700 transition-colors group">
              Explore Campaign Manager <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div {...slideLeft} className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-brand-200/50 rounded-full blur-[80px] -z-10" />
            <div className="rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 bg-white border border-surface-border shadow-soft-xl">
               {/* Mock UI: Campaign List */}
               <div className="bg-surface-bg rounded-xl p-4 sm:p-5 border border-surface-border">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                     <div className="h-5 sm:h-6 w-28 sm:w-32 bg-slateText-main/80 rounded" />
                     <div className="h-7 sm:h-8 w-20 sm:w-24 bg-gradient-to-r from-purple-500 to-brand-600 rounded-lg shadow-purple-glow" />
                  </div>
                  <div className="flex flex-col gap-3 sm:gap-4">
                     {[
                       { name: "Summer Sale 2024", status: "Active", roi: "3.2x", conv: "248" },
                       { name: "Abandoned Cart Flow", status: "Active", roi: "5.1x", conv: "1,402" },
                       { name: "Win-back Email", status: "Paused", roi: "-", conv: "-" },
                     ].map((camp, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ opacity: 0, x: -30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.8 + (i * 0.2), type: 'spring', stiffness: 100 }}
                         whileHover={{ scale: 1.02, x: 6 }}
                         className="flex items-center justify-between p-3.5 sm:p-4 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-purple-glow transition-all cursor-pointer"
                       >
                          <div className="flex items-center gap-3 sm:gap-4">
                             <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${camp.status === 'Active' ? 'bg-purple-100' : 'bg-surface-muted'}`}>
                               <Target className={`w-4 h-4 sm:w-5 sm:h-5 ${camp.status === 'Active' ? 'text-purple-600' : 'text-slateText-muted'}`} />
                             </div>
                             <div>
                               <div className="font-bold text-slateText-main text-xs sm:text-sm">{camp.name}</div>
                               <div className="text-[11px] sm:text-xs text-slateText-muted mt-0.5 flex items-center gap-1">
                                 <span className={`w-2 h-2 rounded-full ${camp.status === 'Active' ? 'bg-purple-500' : 'bg-slateText-muted'}`} />
                                 {camp.status}
                               </div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] sm:text-xs text-purple-400 uppercase font-bold tracking-wider mb-0.5">ROI</div>
                             <div className="font-extrabold text-purple-600 text-xs sm:text-sm">{camp.roi}</div>
                          </div>
                       </motion.div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Showcase 2: Customers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-16">
          
          <motion.div {...slideRight} className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-pink-200/40 rounded-full blur-[80px] -z-10" />
            <div className="rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 bg-white border border-surface-border shadow-soft-xl">
               {/* Mock UI: Customer Segments */}
               <div className="bg-surface-bg rounded-xl p-4 sm:p-5 border border-surface-border">
                  <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
                     <motion.div 
                       initial={{ opacity: 0, y: -20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.6 }}
                       className="flex-1 h-14 sm:h-16 bg-white rounded-xl border border-surface-border p-2.5 sm:p-3 flex flex-col justify-center shadow-sm"
                     >
                        <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slateText-muted">Total Audience</div>
                        <div className="text-lg sm:text-xl font-black text-slateText-main">42,890</div>
                     </motion.div>
                     <motion.div 
                       initial={{ opacity: 0, y: -20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.8 }}
                       className="flex-1 h-14 sm:h-16 bg-pink-50 rounded-xl border border-pink-100 p-2.5 sm:p-3 flex flex-col justify-center shadow-sm"
                     >
                        <div className="text-[9px] sm:text-[10px] uppercase font-bold text-pink-600">High LTV</div>
                        <div className="text-lg sm:text-xl font-black text-pink-600">8,240</div>
                     </motion.div>
                  </div>
                  <div className="space-y-2.5 sm:space-y-3">
                     {[
                       { seg: "VIP Customers (> $500)", size: "8,240", growth: "+12%" },
                       { seg: "Recent Buyers (30 Days)", size: "14,500", growth: "+5%" },
                       { seg: "Churn Risk", size: "3,100", growth: "-2%" }
                     ].map((seg, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1 + (i * 0.15), type: 'spring' }}
                          whileHover={{ scale: 1.02 }}
                          className="flex justify-between items-center bg-white p-3 rounded-lg border border-pink-100 shadow-sm cursor-pointer"
                        >
                           <div className="text-xs sm:text-sm font-bold text-slateText-main">{seg.seg}</div>
                           <div className="text-right">
                              <div className="font-bold text-slateText-main text-xs sm:text-sm">{seg.size}</div>
                              <div className={`text-[10px] font-bold ${seg.growth.startsWith('+') ? 'text-pink-500' : 'text-slateText-muted'}`}>{seg.growth}</div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="flex-1 lg:pl-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-4 sm:mb-6 border border-pink-100">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-pink-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-6 leading-tight text-slateText-main">
              Know Your Customers Intimately
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-slateText-muted mb-4 sm:mb-8 leading-relaxed font-medium">
              Go beyond simple email lists. Automatically segment your audience based on purchase behavior, engagement, and predictive lifetime value.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 text-pink-500 font-bold text-sm sm:text-lg hover:text-pink-600 transition-colors group">
              View Audience Tools <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Showcase 3: Measure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-16">
          <motion.div {...fadeUp} className="flex-1 lg:pr-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emeraldGreen-50 flex items-center justify-center mb-4 sm:mb-6 border border-emeraldGreen-100">
              <LineChart className="w-6 h-6 sm:w-7 sm:h-7 text-emeraldGreen-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-6 leading-tight text-slateText-main">
              Measure What Actually Matters
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-slateText-muted mb-4 sm:mb-8 leading-relaxed font-medium">
              Stop looking at vanity metrics. Connect your marketing spend directly to store revenue, orders, and customer acquisition costs.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 text-emeraldGreen-600 font-bold text-sm sm:text-lg hover:text-emeraldGreen-700 transition-colors group">
              See Revenue Analytics <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div {...slideLeft} className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-emeraldGreen-200/30 rounded-full blur-[80px] -z-10" />
            <div className="rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 bg-white border border-surface-border shadow-soft-xl">
               {/* Mock UI: Analytics Mini */}
               <div className="bg-surface-bg rounded-xl p-4 sm:p-6 border border-surface-border">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.6 }}
                       className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-emeraldGreen-100 hover:shadow-soft-md transition-shadow"
                     >
                        <div className="text-[10px] sm:text-xs font-bold text-slateText-muted uppercase tracking-wider mb-1">Total Revenue</div>
                        <div className="text-xl sm:text-2xl font-black text-slateText-main">$84,250</div>
                     </motion.div>
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.8 }}
                       className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-emeraldGreen-100 hover:shadow-soft-md transition-shadow"
                     >
                        <div className="text-[10px] sm:text-xs font-bold text-slateText-muted uppercase tracking-wider mb-1">Conversion Rate</div>
                        <div className="text-xl sm:text-2xl font-black text-slateText-main">4.8%</div>
                     </motion.div>
                  </div>
                  {/* Mock Chart Area */}
                  <div className="h-28 sm:h-32 bg-white rounded-xl border border-surface-border p-3 sm:p-4 flex items-end gap-1.5 sm:gap-2 overflow-hidden">
                     {[30, 45, 25, 60, 40, 75, 50, 90, 65, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-emeraldGreen-50 rounded-t-sm relative group">
                           <motion.div 
                             initial={{ height: 0 }}
                             whileInView={{ height: `${h}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1, delay: 1 + (i * 0.1), type: 'spring' }}
                             className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emeraldGreen-500 to-emeraldGreen-400 rounded-t-sm" 
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
