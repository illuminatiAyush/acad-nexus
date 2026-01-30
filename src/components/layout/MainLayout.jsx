import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar'; 
import { Navbar } from './Navbar'; 
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex">
      
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      {/* lg:ml-64 creates space for the sidebar on desktop */}
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        <Header /> 
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-24">
          <Outlet />
        </main>

        {/* Mobile Navbar (Hidden on Desktop) */}
        <div className="lg:hidden">
          <Navbar />
        </div>
      </div>
    </div>
  );
};