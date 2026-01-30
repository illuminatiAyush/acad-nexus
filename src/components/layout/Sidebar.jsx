import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, FileText, Bell, BarChart2, Settings, 
  Plus, Moon, Sun, LogOut, ChevronDown, GraduationCap, RefreshCw, Menu 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAcademic } from '../../context/AcademicContext';

export const Sidebar = () => {
  const { user, logout, switchRole, darkMode, toggleDarkMode, requests } = useAcademic();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Controls the slide

  const isStudent = user?.role === 'student';

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Stress Calendar', path: '/calendar' },
    { 
      icon: FileText, 
      label: isStudent ? 'My Requests' : 'Approvals', 
      path: '/approvals',
      badge: !isStudent && requests.length > 0 ? requests.length : null 
    },
    { icon: Bell, label: 'Notifications', path: '/alerts', badge: isStudent ? 2 : 5 },
  ];

  return (
    // 1. Detection Zone: Fixed to top-left.
    // When you hover THIS container, the sidebar opens.
    <div 
      className="fixed top-0 left-0 h-screen z-50 flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      
      {/* 2. The Menu Button (Visible when CLOSED) */}
      <div className={`p-4 transition-opacity duration-300 absolute top-0 left-0 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50">
          <Menu size={24} />
        </button>
      </div>

      {/* 3. The Sliding Sidebar (Visible when OPEN) */}
      {/* -translate-x-full hides it off-screen to the left */}
      <aside className={`w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen shadow-2xl transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* --- Sidebar Content (Same as before) --- */}
        <div className="flex flex-col h-full">
            
            {/* Brand */}
            <div className="p-6 pb-4">
                <div className="flex items-center gap-3 text-primary-600 dark:text-primary-500 mb-1">
                <GraduationCap size={28} strokeWidth={2.5} />
                <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                    AcadNexus
                </h1>
                </div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 pl-10 uppercase tracking-widest">
                Acad Nexus
                </p>
            </div>

            {/* Role Badge */}
            <div className="px-6 mb-6">
                <div className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border ${
                isStudent 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
                    : 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/20 dark:text-primary-400 dark:border-primary-800'
                }`}>
                {isStudent ? 'Student Mode' : 'Faculty Mode'}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive 
                        ? 'bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400 font-semibold' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                    >
                    <div className="flex items-center gap-3">
                        <item.icon size={18} />
                        <span className="text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                        <span className="bg-stress-high text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                        </span>
                    )}
                    </Link>
                );
                })}

                <div className="mt-6 mb-6">
                    <button 
                        onClick={() => navigate('/approvals')}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg shadow-primary-500/20 transition-all active:scale-95"
                    >
                        <Plus size={18} />
                        {isStudent ? 'New Request' : 'Schedule Exam'}
                    </button>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-lg">
                    <button onClick={() => darkMode && toggleDarkMode()} className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all ${!darkMode ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}> <Sun size={14} /> Light </button>
                    <button onClick={() => !darkMode && toggleDarkMode()} className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all ${darkMode ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500'}`}> <Moon size={14} /> Dark </button>
                </div>
                {/* Simplified User Profile for brevity */}
                 <button onClick={logout} className="w-full flex items-center justify-center gap-2 p-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg"> <LogOut size={14} /> Sign Out </button>
            </div>
        </div>
      </aside>
    </div>
  );
};