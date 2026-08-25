import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CMO, BoltCommerce",
      img: "https://i.pravatar.cc/150?img=1",
      text: "Kiaan Technology PRO completely transformed how we run our campaigns. We can finally see the exact revenue tied to every email we send. It's paid for itself 100x over."
    },
    {
      name: "Marcus Chen",
      role: "Founder, LUMIN Apparel",
      img: "https://i.pravatar.cc/150?img=11",
      text: "The customer segmentation tools are incredible. We reduced our customer acquisition cost by 40% just by targeting our VIP lookalikes directly from the platform."
    },
    {
      name: "Elena Rodriguez",
      role: "E-commerce Director",
      img: "https://i.pravatar.cc/150?img=5",
      text: "I used to spend 10 hours a week pulling reports from 4 different tools. Now I log into one dashboard every morning and have everything I need to make decisions."
    },
    {
      name: "Arjun Sharma",
      role: "CEO, FashionFront India",
      img: "https://i.pravatar.cc/150?img=33",
      text: "The automation workflows alone saved us 20+ hours every week. Our abandoned cart recovery rate went from 8% to 34% within the first month. Absolutely game-changing."
    },
    {
      name: "Priya Patel",
      role: "Founder, GlowSkin Co.",
      img: "https://i.pravatar.cc/150?img=47",
      text: "We scaled from ₹5L to ₹50L monthly revenue in just 6 months using the campaign manager. The ROI visibility is unlike anything I've seen in any other platform."
    },
    {
      name: "David Kim",
      role: "Head of Growth, NovaNest",
      img: "https://i.pravatar.cc/150?img=60",
      text: "Connecting our Shopify store took literally 60 seconds. Within a week we had audience segments, live campaign metrics, and automated flows running. Incredible product."
    }
  ];

  // Automatic slide every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Get 3 visible testimonials starting at currentIndex
  const visibleTestimonials = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section className="py-12 sm:py-24 bg-brand-600 text-white relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-500 rounded-full blur-[100px] -z-0 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-coral-500 rounded-full blur-[100px] sm:blur-[120px] -z-0 opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-purple-700 rounded-full blur-[120px] sm:blur-[150px] -z-0 opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-brand-100 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-white/20"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Live Customer Reviews
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 tracking-tight"
          >
            Don't Just Take Our Word For It
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-brand-100 font-medium leading-relaxed"
          >
            Join thousands of e-commerce brands that are growing faster and marketing smarter.
          </motion.p>
        </div>

        {/* 3 Dynamic Cards with Automatic Transition */}
        <div className="relative min-h-[300px] sm:min-h-[380px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((test, i) => (
                <motion.div 
                  key={`${test.name}-${currentIndex}-${i}`}
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl cursor-pointer hover:bg-white/15 transition-all shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-amber-400 mb-4 sm:mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-white/95 font-medium leading-relaxed mb-6 sm:mb-8">
                      "{test.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10">
                    <img 
                      src={test.img} 
                      alt={test.name} 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/30 object-cover shadow-md" 
                    />
                    <div>
                      <div className="font-bold text-white text-sm sm:text-base">{test.name}</div>
                      <div className="text-xs sm:text-sm text-brand-200">{test.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Minimalist Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {testimonials.map((_, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 rounded-full ${
                idx === currentIndex 
                  ? "w-8 h-2 bg-white shadow-sm" 
                  : "w-2 h-2 bg-white/25"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
