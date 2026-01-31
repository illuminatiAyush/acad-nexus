import React, { useState } from 'react';
import { 
  TrendingUp, Clock, AlertTriangle, CheckCircle2, 
  Zap, Calendar, ArrowRight, X, Activity, FileText 
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, requests, resolveRequest } = useAcademic();
  const navigate = useNavigate();
  const [showAlerts, setShowAlerts] = useState(true);

  // Mock Logic: Determine Stress Level
  const stressScore = 78; // 0-100
  const isHellWeek = stressScore > 75;
  const stressColor = stressScore > 75 ? 'text-red-500' : stressScore > 50 ? 'text-amber-500' : 'text-emerald-500';
  const stressBg = stressScore > 75 ? 'bg-red-500' : stressScore > 50 ? 'bg-amber-500' : 'bg-emerald-500';

  // Heatmap Data (Mock)
  const heatmapData = [45, 60, 85, 95, 50, 30, 25]; // Mon-Sun
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Hello, {user?.name} 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {user?.role === 'student' ? "Here's your academic breakdown for the week." : "Overview of department activity and approvals."}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* --- TOP SECTION: STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Stress Meter */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Current Load</p>
              <h3 className={`text-3xl font-bold mt-1 ${stressColor}`}>{stressScore}%</h3>
            </div>
            <div className={`p-2 rounded-full bg-slate-100 dark:bg-slate-700 ${stressColor}`}>
              <Activity size={20} />
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${stressBg}`} style={{ width: `${stressScore}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Based on assignments & exam proximity.</p>
        </div>

        {/* 2. Next Critical Deadline */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Next Deadline</p>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1">DBMS Final Lab</h3>
              <p className="text-xs text-red-500 font-semibold mt-1">Due in 14 hours</p>
            </div>
            <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500">
              <AlertTriangle size={20} />
            </div>
          </div>
          <button className="w-full mt-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            View Details
          </button>
        </div>

        {/* 3. Pending Actions (Role Based) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {user?.role === 'student' ? 'Active Requests' : 'Pending Approvals'}
              </p>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{requests.length}</h3>
            </div>
            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500">
              <FileText size={20} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock size={12} />
            <span>Last updated just now</span>
          </div>
        </div>
      </div>

      {/* --- MAIN SECTION: SPLIT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Heatmap & Hell Week (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Heatmap Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <TrendingUp size={18} className="text-primary-500" /> Weekly Workload
              </h3>
              <select className="text-xs bg-slate-50 dark:bg-slate-700 border-none rounded px-2 py-1 text-slate-600 dark:text-slate-300 outline-none">
                <option>This Week</option>
              </select>
            </div>

            {/* Bars */}
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2">
              {heatmapData.map((val, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full h-full flex items-end">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 ${
                        val > 80 ? 'bg-red-500' : val > 50 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ height: `${val}%` }}
                    ></div>
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {val}% Load
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hell Week Warning Banner */}
          {isHellWeek && (
            <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Zap size={20} fill="currentColor" /> Hell Week Detected
                  </h3>
                  <p className="text-red-100 text-sm mt-1 max-w-md">
                    High academic load detected for Thu-Fri. Consider rescheduling non-urgent submissions.
                  </p>
                </div>
                <button 
                  onClick={() => navigate('/calendar')}
                  className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-red-50 transition-colors"
                >
                  View Calendar
                </button>
              </div>
              {/* Background Decoration */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Activity & Actions (1/3 width) */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {user?.role === 'student' ? (
                <>
                  <button 
                    onClick={() => navigate('/request')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  >
                    <span className="text-sm font-medium">New Request</span>
                    <ArrowRight size={16} />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                    <span className="text-sm font-medium">Download History</span>
                    <ArrowRight size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors">
                    <span className="text-sm font-medium">Approve All Critical</span>
                    <CheckCircle2 size={16} />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors">
                    <span className="text-sm font-medium">Schedule Event</span>
                    <Calendar size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Recent Activity</h3>
              <span className="text-xs text-primary-500 cursor-pointer hover:underline">View All</span>
            </div>
            
            <div className="space-y-4">
              {requests.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">No recent activity.</p>
              ) : (
                requests.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex gap-3 items-start pb-3 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                      {item.student.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{item.type}</p>
                      <div className="flex justify-between items-center mt-0.5">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.student}</span>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      {/* Action buttons only for faculty */}
                      {user?.role === 'faculty' && (
                         <div className="flex gap-2 mt-2">
                           <button 
                             onClick={() => resolveRequest(item.id)}
                             className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                           >
                             Approve
                           </button>
                           <button 
                             onClick={() => resolveRequest(item.id)}
                             className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400"
                           >
                             Dismiss
                           </button>
                         </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM: SMART ALERTS (Dismissible) --- */}
      {showAlerts && (
        <div className="bg-slate-900 dark:bg-indigo-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Zap size={20} className="text-yellow-400" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-bold">System Optimization Tip</p>
              <p className="text-xs text-slate-300">
                Your profile is 80% complete. Add your electives to get better stress predictions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">
              Update Profile
            </button>
            <button 
              onClick={() => setShowAlerts(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};