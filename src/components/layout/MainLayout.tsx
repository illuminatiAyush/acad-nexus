import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header /> 
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};