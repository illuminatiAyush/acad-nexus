import React from 'react';
import { Bell, Search, RefreshCw } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext'; // Import hook

export const Header = () => {
  const { user, switchRole } = useAcademic(); // Get user and switch function

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-slate-100 px-3 py-2 rounded-md w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-sm text-slate-700 w-full"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        
        {/* Role Switcher (Dev Tool) */}
        <button 
          onClick={() => switchRole(user.role === 'faculty' ? 'student' : 'faculty')}
          className="flex items-center gap-2 text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <RefreshCw size={12} />
          Switch to {user.role === 'faculty' ? 'Student' : 'Faculty'}
        </button>

        <button className="relative text-slate-500 hover:text-slate-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-stress-high rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-700">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border ${
            user.role === 'faculty' ? 'bg-primary-100 text-primary-600 border-primary-200' : 'bg-emerald-100 text-emerald-600 border-emerald-200'
          }`}>
            {user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};