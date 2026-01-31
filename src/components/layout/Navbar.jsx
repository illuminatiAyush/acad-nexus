import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// import React from 'react';
import { LayoutDashboard, Calendar, Plus, FileText, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAcademic } from '../../context/AcademicContext';

export const Navbar = () => {
  const { user, requests } = useAcademic();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check role
  const isStudent = user?.role === 'student';

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-6 left-6 right-6 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 flex justify-between items-center z-50 lg:hidden animate-in slide-in-from-bottom-4">
      
      {/* Dashboard */}
      <Link to="/" className={`p-3 rounded-xl transition-colors ${isActive('/') ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-400 hover:text-slate-600'}`}>
        <LayoutDashboard size={24} />
      </Link>

      {/* Calendar */}
      <Link to="/calendar" className={`p-3 rounded-xl transition-colors ${isActive('/calendar') ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-400 hover:text-slate-600'}`}>
        <Calendar size={24} />
      </Link>

      {/* CENTER ACTION BUTTON (The Missing Piece) */}
      <button 
        onClick={() => navigate(isStudent ? '/request' : '/calendar')}
        className="bg-primary-600 text-white p-4 rounded-full shadow-lg shadow-primary-500/40 -mt-10 border-[6px] border-slate-50 dark:border-slate-950 active:scale-95 transition-transform hover:bg-primary-700"
      >
        <Plus size={28} />
      </button>

      {/* Approvals / Requests List */}
      <Link to="/approvals" className={`relative p-3 rounded-xl transition-colors ${isActive('/approvals') ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-400 hover:text-slate-600'}`}>
        <FileText size={24} />
        {requests.length > 0 && (
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
        )}
      </Link>

      {/* Alerts */}
      <Link to="/alerts" className={`relative p-3 rounded-xl transition-colors ${isActive('/alerts') ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-400 hover:text-slate-600'}`}>
        <Bell size={24} />
      </Link>

    </nav>
  );
};

const StyledWrapper = styled.div`
  /* Floating Dock Position */
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999; /* Super high so it stays on top */

  .button-container {
    display: flex;
    background-color: rgba(15, 15, 14, 0.95); /* Pink color */
    backdrop-filter: blur(8px); /* Glass effect */
    width: 260px;
    height: 54px;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 30px; /* Pill shape */
    box-shadow: 0px 5px 15px rgba(66, 17, 127, 0.4);
    padding: 0 10px;
    transition: all 0.3s ease;
  }

  .button-container:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(228, 157, 236, 0.5);
  }

  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .button:hover {
    transform: translateY(-3px) scale(1.1);
    background-color: rgba(255, 255, 255, 0.2);
  }

  .button:active {
    transform: scale(0.95);
  }

  .icon {
    font-size: 22px;
  }
`;