import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, HeartHandshake, Banknote, Target, MousePointerClick } from 'lucide-react';

export const Benefits = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-brand-600" />,
      title: "Save 15+ Hours a Week",
      desc: "Stop jumping between 6 different marketing tools. Automate your busywork and focus on high-level strategy.",
      bg: "bg-brand-50"
    },
    {
      icon: <Target className="w-8 h-8 text-coral-500" />,
      title: "Increase Conversions",
      desc: "Deliver exactly what your customers want, exactly when they want it, using behavioral targeting.",
      bg: "bg-coral-50"
    },
    {
      icon: <Banknote className="w-8 h-8 text-emeraldGreen-500" />,
      title: "Track Exact ROI",
      desc: "Never wonder if an ad or email worked. See the direct revenue impact of every single marketing dollar.",
      bg: "bg-emeraldGreen-50"
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-warm-500" />,
      title: "Build Customer Loyalty",
      desc: "Turn one-time buyers into lifelong advocates by understanding their entire journey.",
      bg: "bg-warm-50"
    },
    {
      icon: <MousePointerClick className="w-8 h-8 text-blue-500" />,
      title: "Data-Driven Decisions",
      desc: "Make confident choices backed by real-time analytics rather than gut feelings.",
      bg: "bg-blue-50"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-roseDanger-500" />,
      title: "Enterprise Grade Scale",
      desc: "Whether you have 100 or 1,000,000 customers, our platform scales effortlessly with your growth.",
      bg: "bg-roseDanger-50"
    }
  ];

  return (
    <section className="py-24 bg-surface-bg border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            {...fadeUp}
            className="text-4xl md:text-5xl font-extrabold mb-5 text-slateText-main tracking-tight"
          >
            Built for Outcomes, Not Just Features
          </motion.h2>
          <motion.p 
            {...fadeUp}
            className="text-xl text-slateText-muted font-medium leading-relaxed"
          >
            The ultimate goal isn't just to send more emails or run more ads. It's to fundamentally transform how your business grows.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-8 border border-surface-border shadow-soft-sm hover:-translate-y-2 hover:shadow-soft-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${benefit.bg} flex items-center justify-center mb-6`}>
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-slateText-main mb-4">{benefit.title}</h3>
              <p className="text-slateText-muted font-medium leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
