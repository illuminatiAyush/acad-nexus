import React from 'react';
import { TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
        {trend}
      </span>
      <span className="text-xs text-slate-400">{subtext}</span>
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Academic Overview</h2>
        <p className="text-slate-500">Monitor deadlines, stress levels, and approvals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Avg. Student Stress" value="7.2/10" subtext="vs last week" trend="+12%" icon={TrendingUp} color="bg-stress-high" />
        <StatCard title="Pending Approvals" value="18" subtext="Requires attention" trend="4 Urgent" icon={Clock} color="bg-primary-500" />
        <StatCard title="Active Students" value="2,450" subtext="On campus" trend="+5%" icon={Users} color="bg-slate-700" />
        <StatCard title="Upcoming Deadlines" value="12" subtext="Next 48 hours" trend="High Load" icon={AlertTriangle} color="bg-stress-medium" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800">Academic Load Heatmap</h3>
            <select className="text-sm border border-slate-200 rounded-md px-2 py-1 text-slate-600">
              <option>This Week</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 65, 85, 95, 50, 30, 20].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className={`w-full rounded-t-md transition-all duration-300 hover:opacity-80 ${height > 80 ? 'bg-stress-high' : height > 50 ? 'bg-stress-medium' : 'bg-primary-500'}`} style={{ height: `${height}%` }}></div>
                <span className="text-xs text-slate-400 font-medium">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-lg text-slate-800 mb-4">Pending Requests</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">JS</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-slate-800">John Smith</p>
                    <span className="text-xs text-slate-400">2h ago</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Medical Leave Application</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};