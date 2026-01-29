import React from 'react';
import { Bell, Search } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-3 bg-slate-100 px-3 py-2 rounded-md w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-sm text-slate-700 w-full"
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-slate-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-stress-high rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold border border-primary-200">
          AR
        </div>
      </div>
    </header>
  );
};