import React from 'react';
import { AlertTriangle, Clock, CheckCircle2, ArrowRight, Bell } from 'lucide-react';

export const AlertsPage = () => {
  // Mock Data
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Academic Overload Detected',
      message: 'Student has 4 major exams and 2 project deadlines in 3 days. Stress score: 9.2/10.',
      time: '10 mins ago',
      action: 'Review Details'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Attendance Shortage Risk',
      message: 'Attendance dropped to 74%. Needs 3 consecutive days to qualify for exams.',
      time: '2 hours ago',
      action: 'Review Details'
    },
    {
      id: 3,
      type: 'success',
      title: 'Internship Approved',
      message: 'Your NOC request for "Google Summer of Code" has been approved by the Dean.',
      time: '1 day ago',
      action: 'View Document'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 flex items-center gap-3">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
            <Bell size={24} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
            {/* FIXED: Added dark:text-white so it's visible in dark mode */}
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">System Alerts</h2>
            <p className="text-slate-500 dark:text-slate-400">Real-time notifications and academic warnings.</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            // FIXED: Added dark:bg-slate-800 and dark:border-slate-700
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center transition-colors duration-200"
          >
            {/* Icon Box */}
            <div className={`p-4 rounded-full shrink-0 ${
              alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
              alert.type === 'warning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
              'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
            }`}>
              {alert.type === 'critical' ? <AlertTriangle size={24} /> :
               alert.type === 'warning' ? <Clock size={24} /> :
               <CheckCircle2 size={24} />}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-800 dark:text-white text-lg">{alert.title}</h3>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {alert.time}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {alert.message}
              </p>
            </div>

            {/* Action Button */}
            <button className="whitespace-nowrap px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600">
              {alert.action} <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};