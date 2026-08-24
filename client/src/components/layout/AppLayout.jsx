import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';

export const AppLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8FE] flex">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area with proper 72-rem padding & generous spacious container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-300">
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
