import React from 'react';
import { Bell, Search, RefreshCw, Moon, Sun } from 'lucide-react'; // Added Moon, Sun
import { useAcademic } from '../../context/AcademicContext';

export const Header = () => {
  const { user, switchRole, darkMode, toggleDarkMode } = useAcademic(); // Get dark mode stuff

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-200">
      
      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-md w-96 transition-colors duration-200">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full placeholder:text-slate-400"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Role Switcher */}
        <button 
          onClick={() => switchRole(user.role === 'faculty' ? 'student' : 'faculty')}
          className="flex items-center gap-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <RefreshCw size={12} />
          <span>{user.role === 'faculty' ? 'Student View' : 'Faculty View'}</span>
        </button>

        <button className="relative text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-stress-high rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border ${
            user.role === 'faculty' 
              ? 'bg-primary-100 text-primary-600 border-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:border-primary-800' 
              : 'bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-800'
          }`}>
            {user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};