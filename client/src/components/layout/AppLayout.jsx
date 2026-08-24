import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';

export const AppLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('kiaan_sidebar_collapsed') === 'true';
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('kiaan_sidebar_collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8FE] flex">
      {/* Collapsible Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Main Content Area with dynamic transition for collapsed (lg:pl-20) / expanded (lg:pl-72) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        <Header onMenuClick={() => setIsMobileOpen(true)} />

        <main className="flex-1 p-5 sm:p-7 lg:p-9 max-w-[1600px] w-full mx-auto pb-24 lg:pb-12">
          <Outlet />
        </main>

        {/* Mobile Navigation bar for <= 1024px */}
        <MobileNavigation />
      </div>
    </div>
  );
};

export default AppLayout;
