import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-surface-border shadow-soft-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-coral-500 flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slateText-main">
                  Kiaan<span className="text-brand-500">Technology</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-200">
                  PRO
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slateText-muted">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="hover:text-brand-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-slateText-muted hover:text-brand-600 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-soft-sm hover:-translate-y-0.5 shadow-purple-glow flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slateText-main hover:bg-surface-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden flex flex-col gap-6">
           <div className="flex flex-col gap-4 text-lg font-bold text-slateText-main">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="border-b border-surface-border pb-4 hover:text-brand-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
           </div>
           <div className="flex flex-col gap-4 mt-4">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 text-center border border-surface-border rounded-xl font-bold text-slateText-main hover:bg-surface-muted transition-colors text-base"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 text-center bg-brand-600 text-white rounded-xl font-bold shadow-purple-glow text-base"
              >
                Get Started
              </Link>
           </div>
        </div>
      )}
    </>
  );
};
