import React, { useEffect } from 'react';
import { Navbar } from '../../components/landing/Navbar';
import { Hero } from '../../components/landing/Hero';
import { TrustSection } from '../../components/landing/TrustSection';
import { ProblemSolution } from '../../components/landing/ProblemSolution';
import { Features } from '../../components/landing/Features';
import { FeatureShowcase } from '../../components/landing/FeatureShowcase';
import { AnalyticsSection } from '../../components/landing/AnalyticsSection';
import { HowItWorks } from '../../components/landing/HowItWorks';
import { Benefits } from '../../components/landing/Benefits';
import { ProductPreview } from '../../components/landing/ProductPreview';
import { Testimonials } from '../../components/landing/Testimonials';
import { FAQ } from '../../components/landing/FAQ';
import { Footer } from '../../components/landing/Footer';

export const LandingPage = () => {
  // Add smooth scrolling to hash links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-surface-bg font-sans selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden relative">
      <Navbar />
      
      <main>
        <Hero />
        <TrustSection />
        <ProblemSolution />
        <Features />
        <FeatureShowcase />
        <AnalyticsSection />
        <HowItWorks />
        <Benefits />
        <ProductPreview />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};
