import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Zap,
  Tag,
  Clock,
  Gift,
  ArrowRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const HeroBannerCarousel = ({ onSelectCategory }) => {
  const toast = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const bannerSlides = [
    {
      id: 1,
      tag: '🎁 FESTIVE MEGA DHAMAKA',
      title: 'Rakhi & Festive Mega Sale',
      subtitle: 'Flat 60% to 80% OFF on Banarasi Silk Sarees, Anarkali Sets & Festive Gifts',
      couponCode: 'RAKHI25',
      discountBadge: 'UP TO 80% OFF',
      ctaText: 'Shop Festive Wear',
      category: 'Women',
      bgGradient: 'from-[#7928CA] via-[#B80058] to-[#FF0080]',
      accentColor: '#FFDF00',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      tag: '🔥 SUMMER SPECIAL',
      title: 'Mega Summer Fashion Fest',
      subtitle: 'Trending Oversized Heavyweight Tees, Linen Shirts & Bohemian Dresses',
      couponCode: 'SUMMER20',
      discountBadge: 'STARTING ₹499',
      ctaText: 'Explore Summer Wardrobe',
      category: 'Men',
      bgGradient: 'from-[#6C4DF6] via-[#855FF8] to-[#FF5C8A]',
      accentColor: '#FDE047',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      tag: '👟 FOOTWEAR CARNIVAL',
      title: 'Sneakers & Formal Shoes Rush',
      subtitle: 'Air Cushion Running Sneakers, Handcrafted Oxford Shoes & Slides',
      couponCode: 'STEPS30',
      discountBadge: 'MIN 50% OFF',
      ctaText: 'Browse Footwear Deals',
      category: 'Footwear',
      bgGradient: 'from-[#0F172A] via-[#1E293B] to-[#3B82F6]',
      accentColor: '#60A5FA',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      tag: '💄 BEAUTY GLOW DAYS',
      title: 'Skincare & Beauty Glow Fest',
      subtitle: 'Buy 1 Get 1 FREE on Saffron Vitamin C Serums & Longwear Liquid Lip Kits',
      couponCode: 'GLOWBOGO',
      discountBadge: 'BUY 1 GET 1 FREE',
      ctaText: 'Claim Beauty Offer',
      category: 'Beauty',
      bgGradient: 'from-[#BE185D] via-[#DB2777] to-[#F43F5E]',
      accentColor: '#FBCFE8',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      tag: '✨ TIMEPIECE & LUXURY',
      title: 'Luxury Watches & Bags Gala',
      subtitle: 'Rose Gold Chronograph Watches, Italian Leather Totes & Titanium Aviators',
      couponCode: 'LUXURY40',
      discountBadge: 'FLAT 40% OFF',
      ctaText: 'Explore Luxury Picks',
      category: 'Accessories',
      bgGradient: 'from-[#18181B] via-[#27272A] to-[#D97706]',
      accentColor: '#FBBF24',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 6,
      tag: '🧸 KIDS SPECIAL WARDROBE',
      title: 'Little Champions Carnival',
      subtitle: 'Organic Cotton Dino Co-ords, Girls Foil Lehengas & LED Light Shoes',
      couponCode: 'KIDS50',
      discountBadge: 'FLAT 50% OFF',
      ctaText: 'Shop Kids Wear',
      category: 'Kids',
      bgGradient: 'from-[#0369A1] via-[#0284C7] to-[#38BDF8]',
      accentColor: '#BAE6FD',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 7,
      tag: '⚡ MIDNIGHT CLEARANCE',
      title: 'Super Flash Clearance Rush',
      subtitle: 'Extra 25% Instant UPI Cashback on Entire Store — Ending in 4 Hours',
      couponCode: 'FESTIVE20',
      discountBadge: 'EXTRA 25% OFF',
      ctaText: 'Grab Flash Deals',
      category: 'All',
      bgGradient: 'from-[#C2410C] via-[#EA580C] to-[#F97316]',
      accentColor: '#FEF08A',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 8,
      tag: '👑 VIP SHOPPERS PASS',
      title: 'Join Kiaan Prime Shopper Club',
      subtitle: 'Get 10% Extra Wallet Coins on Every Purchase + Unlimited Free Fast Delivery',
      couponCode: 'VIPCLUB',
      discountBadge: 'FREE 500 COINS',
      ctaText: 'Claim VIP Benefits',
      category: 'All',
      bgGradient: 'from-[#3730A3] via-[#4F46E5] to-[#7C3AED]',
      accentColor: '#C7D2FE',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    }
  ];

  // Auto-scroll every 4.5s unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, bannerSlides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success(`🎉 Copied coupon code "${code}"! Apply at checkout.`);
  };

  const slide = bannerSlides[currentSlide];

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-soft-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Container with Dynamic Gradient */}
      <div
        className={`relative p-6 sm:p-10 text-white bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between overflow-hidden`}
      >
        {/* Ambient Blur Bubbles */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-black/15 blur-2xl pointer-events-none" />

        {/* Slide Content Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
          {/* Left Text & Offers */}
          <div className="md:col-span-8 space-y-4">
            {/* Tag & Discount Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wide border border-white/30">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>{slide.tag}</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black shadow-soft-sm">
                {slide.discountBadge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {slide.title}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-white/95 max-w-xl font-medium leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Coupon Code Pill & CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(slide.category);
                  toast.success(`Browsing ${slide.title}!`);
                }}
                className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-soft-lg hover:bg-slate-100 transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Copy Coupon Tag */}
              <button
                onClick={() => handleCopyCoupon(slide.couponCode)}
                className="px-4 py-2.5 rounded-2xl bg-black/25 hover:bg-black/40 backdrop-blur-md border border-white/30 text-white font-mono text-xs font-black flex items-center gap-2 transition-all"
                title="Click to copy coupon code"
              >
                <Tag className="w-3.5 h-3.5 text-yellow-300" />
                <span>{slide.couponCode}</span>
                <span className="text-[10px] uppercase font-sans font-bold text-yellow-300 ml-1">Copy</span>
              </button>
            </div>
          </div>

          {/* Right Product Spotlight Image */}
          <div className="hidden md:flex md:col-span-4 justify-end">
            <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/30 transform group-hover:scale-105 transition-transform duration-500 bg-slate-100">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-white/90 text-slate-900 shadow-soft-sm backdrop-blur-md">
                Verified Authentic
              </span>
            </div>
          </div>
        </div>

        {/* Slide Counter & Dots Navigation */}
        <div className="relative z-10 flex items-center justify-between pt-6 mt-4 border-t border-white/15">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {bannerSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <span className="text-xs font-mono font-bold text-white/80">
            {currentSlide + 1} / {bannerSlides.length} Offers
          </span>
        </div>
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-soft-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-soft-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HeroBannerCarousel;
