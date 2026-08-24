import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      desc: "Perfect for new stores finding their footing.",
      price: annual ? 49 : 59,
      features: [
        { name: "Up to 2,000 active customers", inc: true },
        { name: "Basic email campaigns", inc: true },
        { name: "Standard reporting", inc: true },
        { name: "Advanced segmentation", inc: false },
        { name: "Predictive LTV analytics", inc: false }
      ],
      recommended: false
    },
    {
      name: "Growth",
      desc: "Everything you need to scale your revenue.",
      price: annual ? 99 : 129,
      features: [
        { name: "Up to 15,000 active customers", inc: true },
        { name: "Omnichannel campaigns", inc: true },
        { name: "Advanced reporting & ROI", inc: true },
        { name: "Advanced segmentation", inc: true },
        { name: "Predictive LTV analytics", inc: false }
      ],
      recommended: true
    },
    {
      name: "Scale",
      desc: "For high-volume brands that need enterprise power.",
      price: annual ? 299 : 349,
      features: [
        { name: "Unlimited customers", inc: true },
        { name: "Omnichannel campaigns", inc: true },
        { name: "Advanced reporting & ROI", inc: true },
        { name: "Advanced segmentation", inc: true },
        { name: "Predictive LTV analytics", inc: true }
      ],
      recommended: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-surface-bg border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-5 text-slateText-main tracking-tight"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slateText-muted font-medium mb-8"
          >
            Start for free, upgrade when you need to. No hidden fees.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4"
          >
            <span className={`font-bold ${!annual ? 'text-slateText-main' : 'text-slateText-muted'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 bg-brand-600 rounded-full p-1 transition-colors relative"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${annual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`font-bold ${annual ? 'text-slateText-main' : 'text-slateText-muted'}`}>
              Annually <span className="text-emeraldGreen-500 text-xs ml-1 bg-emeraldGreen-50 px-2 py-1 rounded-full border border-emeraldGreen-100">Save 20%</span>
            </span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-3xl p-8 relative flex flex-col ${
                plan.recommended 
                  ? 'bg-brand-600 text-white shadow-purple-glow transform md:-translate-y-4' 
                  : 'bg-white border border-surface-border shadow-soft-sm'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-coral-500 to-warm-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-slateText-main'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.recommended ? 'text-brand-100' : 'text-slateText-muted'}`}>{plan.desc}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-black">${plan.price}</span>
                <span className={`text-sm font-medium ${plan.recommended ? 'text-brand-200' : 'text-slateText-muted'}`}>/month</span>
              </div>
              
              <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all mb-8 ${
                plan.recommended
                  ? 'bg-white text-brand-600 hover:bg-brand-50 shadow-sm'
                  : 'bg-brand-50 text-brand-600 hover:bg-brand-100 border border-brand-200'
              }`}>
                Get Started
              </button>

              <div className="flex-1">
                <div className={`text-sm font-bold uppercase tracking-wider mb-4 ${plan.recommended ? 'text-brand-200' : 'text-slateText-sub'}`}>
                  What's included
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feat.inc 
                        ? <Check className={`w-5 h-5 shrink-0 ${plan.recommended ? 'text-coral-400' : 'text-brand-500'}`} />
                        : <X className={`w-5 h-5 shrink-0 ${plan.recommended ? 'text-brand-400' : 'text-surface-muted'}`} />
                      }
                      <span className={`text-sm font-medium ${!feat.inc && (plan.recommended ? 'text-brand-300' : 'text-slateText-sub')}`}>
                        {feat.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
