import React from 'react';
import { Header } from './Header';
import { Navbar } from './Navbar'; 
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col">
      {/* Header stays at top */}
      <Header /> 
      
      {/* Main Content - No ml-64 because Sidebar is gone */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-24">
        <Outlet />
      </main>

      {/* Navbar stays at bottom */}
      <Navbar />
    </div>
  );
};