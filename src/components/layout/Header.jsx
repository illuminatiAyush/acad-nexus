import React from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export const Header = () => {
  const { user, toggleDarkMode, darkMode } = useAcademic();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 transition-colors duration-200">
      
      {/* Search Bar - Full width on mobile, fixed on desktop */}
      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-md w-full md:w-96 transition-colors duration-200">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search courses or alerts..." 
          className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full placeholder:text-slate-400"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 pl-4">

      {/* 1. Dark Mode Toggle (Placed BEFORE Bell) */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          title="Toggle Theme"
        >
           {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        
        {/* Bell - Visible Everywhere */}
        <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 h-2.5 w-2.5 bg-stress-high rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        {/* 3. Mobile Profile (Hidden on Desktop because Sidebar has it) */}
        <div className="flex items-center gap-3 lg:hidden border-l border-slate-200 dark:border-slate-800 pl-4">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm border ${
            user?.role === 'student' 
            ? 'bg-emerald-100 text-emerald-600 border-emerald-200' 
            : 'bg-primary-100 text-primary-600 border-primary-200'
          }`}>
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
        
        {/* --- MOBILE ONLY CONTROLS --- */}
        {/* These are HIDDEN on Desktop (lg:hidden) because the Sidebar handles them */}
        <div className="flex items-center gap-3 lg:hidden border-l border-slate-200 dark:border-slate-800 pl-4">
          
          <button onClick={toggleDarkMode} className="text-slate-500 dark:text-slate-400">
             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm border ${
            user?.role === 'student' 
            ? 'bg-emerald-100 text-emerald-600 border-emerald-200' 
            : 'bg-primary-100 text-primary-600 border-primary-200'
          }`}>
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
        
      </div>
    </header>
  );
};