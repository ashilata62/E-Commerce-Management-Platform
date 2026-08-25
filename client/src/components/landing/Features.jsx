import React from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, 
  Users, 
  BarChart2, 
  TrendingUp, 
  Target, 
  Zap, 
  Activity, 
  PieChart 
} from 'lucide-react';

export const Features = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  const featureList = [
    {
      icon: <Megaphone className="w-6 h-6 text-brand-600" />,
      title: "Campaign Management",
      desc: "Create, manage and monitor omnichannel marketing campaigns from a single dashboard."
    },
    {
      icon: <Users className="w-6 h-6 text-coral-500" />,
      title: "Customer Insights",
      desc: "Understand customer behavior, purchase frequency, and lifetime value instantly."
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-emeraldGreen-500" />,
      title: "Marketing Analytics",
      desc: "Track critical performance metrics across all your marketing channels."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-warm-500" />,
      title: "Sales & Revenue",
      desc: "Connect your marketing activities directly to actual revenue generated."
    },
    {
      icon: <Target className="w-6 h-6 text-roseDanger-500" />,
      title: "Audience Management",
      desc: "Organize customers into powerful segments for highly targeted marketing."
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-500" />,
      title: "Marketing Automation",
      desc: "Reduce repetitive tasks with smart triggers and automated workflows."
    },
    {
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      title: "Performance Tracking",
      desc: "Monitor your campaign performance and store health in real time."
    },
    {
      icon: <PieChart className="w-6 h-6 text-purple-500" />,
      title: "ROI Insights",
      desc: "Finally understand exactly which marketing activities drive business growth."
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-24 bg-white border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
          <motion.h2 
            {...fadeUp}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 text-slateText-main tracking-tight"
          >
            Everything You Need to Market Smarter
          </motion.h2>
          <motion.p 
            {...fadeUp}
            className="text-sm sm:text-lg md:text-xl text-slateText-muted font-medium leading-relaxed"
          >
            Stop guessing what works. Our comprehensive suite of tools gives you complete control over your e-commerce growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featureList.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5, type: 'spring' }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-5 sm:p-6 rounded-2xl bg-surface-bg border border-surface-border hover:shadow-soft-md transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-xl border border-surface-border flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform shadow-soft-sm">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slateText-main mb-1.5 group-hover:text-brand-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slateText-muted leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
