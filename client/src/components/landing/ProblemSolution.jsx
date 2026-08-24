import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, EyeOff, Clock, SearchX, CheckCircle2 } from 'lucide-react';

export const ProblemSolution = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  const stagger = {
    whileInView: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const problems = [
    {
      icon: <LayoutGrid className="w-6 h-6 text-roseDanger-500" />,
      title: "Too Many Tools",
      desc: "Marketing data scattered across different platforms."
    },
    {
      icon: <EyeOff className="w-6 h-6 text-warm-500" />,
      title: "Poor Visibility",
      desc: "Hard to understand which campaigns actually drive revenue."
    },
    {
      icon: <Clock className="w-6 h-6 text-slateText-muted" />,
      title: "Manual Work",
      desc: "Repetitive marketing tasks consume valuable time."
    },
    {
      icon: <SearchX className="w-6 h-6 text-brand-400" />,
      title: "Missed Opportunities",
      desc: "Customer behavior and insights are not used effectively."
    }
  ];

  return (
    <section className="py-24 bg-surface-bg relative overflow-hidden border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* The Problem */}
        <div className="text-center mb-16">
          <motion.h2 
            {...fadeUp}
            className="text-3xl md:text-4xl font-extrabold mb-4 text-slateText-main"
          >
            The old way of e-commerce marketing is broken
          </motion.h2>
        </div>

        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {problems.map((prob, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 border border-surface-border shadow-soft-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer hover:shadow-soft-md"
            >
              <div className="w-12 h-12 bg-surface-muted rounded-xl flex items-center justify-center mb-4">
                {prob.icon}
              </div>
              <h3 className="text-lg font-bold text-slateText-main mb-2">{prob.title}</h3>
              <p className="text-sm font-medium text-slateText-muted">{prob.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* The Solution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] bg-brand-600 text-white p-10 md:p-16 relative overflow-hidden shadow-purple-glow text-center"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500 rounded-full blur-[80px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              One Platform. Smarter Marketing.
            </h2>
            <p className="text-xl text-white/80 font-medium mb-10">
              Kiaan Technology PRO brings all your marketing activities, customer insights, and revenue tracking into one unified, intelligent hub.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
               {['Centralized Data', 'Automated Workflows', 'Clear ROI Tracking'].map((badge, i) => (
                 <div key={i} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                   <CheckCircle2 className="w-4 h-4 text-emeraldGreen-500" /> {badge}
                 </div>
               ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
