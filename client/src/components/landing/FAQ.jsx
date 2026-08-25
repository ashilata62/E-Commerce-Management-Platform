import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export const FAQ = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  const faqs = [
    {
      q: "What is Kiaan Technology PRO?",
      a: "It's an all-in-one e-commerce marketing platform that allows you to manage campaigns, analyze customer behavior, and track revenue from a single centralized dashboard."
    },
    {
      q: "Who can use the platform?",
      a: "Our platform is built for serious e-commerce brands, marketing agencies, and scaling businesses looking to unify their scattered marketing tools into one efficient operating system."
    },
    {
      q: "What marketing activities can I manage?",
      a: "You can manage omnichannel campaigns, automate email flows, create highly targeted customer segments, and monitor cross-channel marketing budgets."
    },
    {
      q: "Can I monitor revenue and conversions?",
      a: "Yes. The core philosophy of our platform is tying every marketing activity back to actual revenue, conversion rates, and orders so you know your exact ROI."
    },
    {
      q: "Is my marketing data secure?",
      a: "Absolutely. We use enterprise-grade encryption, SOC 2 compliant infrastructure, and strict role-based access control to ensure your customer and financial data is entirely protected."
    },
    {
      q: "How do I get started?",
      a: "Simply click 'Get Started' to connect your e-commerce store. Our one-click integration takes less than 60 seconds, and we automatically begin analyzing your historical data."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-12 sm:py-24 bg-white border-b border-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2 
            {...fadeUp}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 text-slateText-main tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            {...fadeUp}
            className="text-sm sm:text-lg md:text-xl text-slateText-muted font-medium"
          >
            Everything you need to know about the product and billing.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-3 sm:space-y-4"
        >
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border rounded-2xl overflow-hidden transition-colors ${
                openIndex === i ? 'bg-surface-bg border-brand-200' : 'bg-white border-surface-border hover:bg-surface-bg'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between font-bold text-slateText-main focus:outline-none"
              >
                <span className="text-sm sm:text-lg pr-2">{faq.q}</span>
                <span className={`flex-shrink-0 ml-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-brand-100 text-brand-600' : 'bg-surface-muted text-slateText-muted'}`}>
                  {openIndex === i ? <Minus className="w-4 h-4 sm:w-5 sm:h-5" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-base text-slateText-muted font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
