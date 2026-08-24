import React from 'react';
import { ShoppingBag, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-brand-600 text-white border-t border-brand-500/30 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-soft-sm">
                <ShoppingBag className="w-5 h-5 text-brand-600" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Kiaan<span className="text-white/80">Technology</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-white/20 text-white border border-white/30">
                  PRO
                </span>
              </div>
            </Link>
            <p className="text-brand-100 font-medium mb-8 max-w-sm leading-relaxed">
              The premium e-commerce marketing platform designed to unify your data, automate your campaigns, and scale your revenue.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-brand-200 hover:text-white font-medium transition-colors">Features</a></li>
              <li><a href="#analytics" className="text-brand-200 hover:text-white font-medium transition-colors">Analytics</a></li>
              <li><a href="#solutions" className="text-brand-200 hover:text-white font-medium transition-colors">Campaigns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-brand-200 hover:text-white font-medium transition-colors">About</a></li>
              <li><a href="#" className="text-brand-200 hover:text-white font-medium transition-colors">Contact</a></li>
              <li><a href="#" className="text-brand-200 hover:text-white font-medium transition-colors">Careers</a></li>
              <li><a href="#" className="text-brand-200 hover:text-white font-medium transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-brand-200 hover:text-white font-medium transition-colors">Documentation</a></li>
              <li><a href="#faq" className="text-brand-200 hover:text-white font-medium transition-colors">Help Center</a></li>
              <li><a href="#faq" className="text-brand-200 hover:text-white font-medium transition-colors">FAQ</a></li>
              <li><a href="#" className="text-brand-200 hover:text-white font-medium transition-colors">Blog</a></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-brand-500/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-brand-200 text-sm font-medium">
            &copy; {new Date().getFullYear()} Kiaan Technology PRO. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-brand-200">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
