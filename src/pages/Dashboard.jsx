import React from 'react';
import { TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';

const StatCard = ({ title, value, subtext, icon: Icon, trend, color }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-2">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} shadow-sm`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
        {trend}
      </span>
      <span className="text-xs text-slate-400 dark:text-slate-500">{subtext}</span>
    </div>
  </div>
);

export const Dashboard = () => {
  const { requests, resolveRequest } = useAcademic();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Academic Overview</h2>
        <p className="text-slate-500 dark:text-slate-400">Monitor deadlines, stress levels, and approvals.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Avg. Student Stress" value="7.2/10" subtext="vs last week" trend="+12%" icon={TrendingUp} color="bg-stress-high" />
        <StatCard title="Pending Approvals" value={requests.length} subtext="Requires attention" trend={`${requests.length} Urgent`} icon={Clock} color="bg-primary-500" />
        <StatCard title="Active Students" value="2,450" subtext="On campus" trend="+5%" icon={Users} color="bg-slate-700" />
        <StatCard title="Upcoming Deadlines" value="12" subtext="Next 48 hours" trend="High Load" icon={AlertTriangle} color="bg-stress-medium" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Heatmap Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 transition-colors duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">Academic Load Heatmap</h3>
            <select className="text-sm bg-transparent border border-slate-200 dark:border-slate-600 rounded-md px-2 py-1 text-slate-600 dark:text-slate-300 outline-none">
              <option className="dark:bg-slate-800">This Week</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 65, 85, 95, 50, 30, 20].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div 
                  className={`w-full rounded-t-md transition-all duration-300 hover:opacity-80 ${
                    height > 80 ? 'bg-stress-high' : height > 50 ? 'bg-stress-medium' : 'bg-primary-500'
                  }`} 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Requests Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 transition-colors duration-200">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4">
            Pending Requests ({requests.length})
          </h3>
          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                <p>All caught up!</p>
              </div>
            ) : (
              requests.map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                    {item.student.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{item.student}</p>
                      <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap ml-2">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.type}</p>
                    
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => resolveRequest(item.id)}
                        className="text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-md font-medium hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => resolveRequest(item.id)}
                        className="text-xs border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};