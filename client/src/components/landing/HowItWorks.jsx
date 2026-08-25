import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Settings, LineChart, TrendingUp } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: <Link2 className="w-8 h-8 text-brand-600" />,
      title: "Connect Your Store",
      desc: "Integrate your e-commerce platform in 60 seconds with zero coding required.",
      color: "brand"
    },
    {
      num: "02",
      icon: <Settings className="w-8 h-8 text-coral-500" />,
      title: "Set Up Marketing",
      desc: "Create campaigns, automate emails, and segment your audience effortlessly.",
      color: "coral"
    },
    {
      num: "03",
      icon: <LineChart className="w-8 h-8 text-emeraldGreen-500" />,
      title: "Track Performance",
      desc: "Monitor your conversions, revenue, and ROI across all active campaigns in real-time.",
      color: "emeraldGreen"
    },
    {
      num: "04",
      icon: <TrendingUp className="w-8 h-8 text-warm-500" />,
      title: "Grow With Insights",
      desc: "Use actionable data to optimize spend, reduce churn, and scale your brand faster.",
      color: "warm"
    }
  ];

  const getColorClasses = (color) => {
    switch(color) {
      case 'brand': return 'bg-brand-50 border-brand-200 text-brand-600';
      case 'coral': return 'bg-coral-50 border-coral-200 text-coral-500';
      case 'emeraldGreen': return 'bg-emeraldGreen-50 border-emeraldGreen-200 text-emeraldGreen-500';
      case 'warm': return 'bg-warm-50 border-warm-200 text-warm-500';
      default: return 'bg-gray-50 border-gray-200 text-gray-500';
    }
  };

  return (
    <section id="how-it-works" className="py-12 sm:py-24 bg-white border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 sm:mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 text-slateText-main tracking-tight"
          >
            Four Steps to Exponential Growth
          </motion.h2>
        </div>

        <div className="relative">
           {/* Desktop Connecting Line */}
           <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-surface-muted rounded-full">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brand-400 via-coral-400 to-emeraldGreen-400 rounded-full" 
              />
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 relative z-10">
              {steps.map((step, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ delay: i * 0.15, duration: 0.6, type: 'spring' }}
                   whileHover={{ scale: 1.03 }}
                   className="flex flex-col items-center text-center group cursor-pointer bg-slate-50/50 sm:bg-transparent p-5 sm:p-0 rounded-2xl border border-slate-100 sm:border-0"
                 >
                    <div className="relative mb-5 sm:mb-8">
                       <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-4 sm:border-8 border-white shadow-soft-lg ${getColorClasses(step.color)} bg-white z-10 relative group-hover:scale-110 transition-transform duration-500`}>
                          {step.icon}
                       </div>
                       <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 font-black text-2xl sm:text-4xl text-surface-muted/60 group-hover:text-surface-muted transition-colors">
                          {step.num}
                       </div>
                    </div>
                    
                    <h3 className="text-base sm:text-xl font-bold text-slateText-main mb-2 sm:mb-3 group-hover:text-brand-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slateText-muted font-medium leading-relaxed">
                      {step.desc}
                    </p>
                 </motion.div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};
