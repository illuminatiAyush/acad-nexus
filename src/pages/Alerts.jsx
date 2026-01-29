import React from 'react';
import { AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Academic Overload Detected',
    student: 'Rahul Sharma (CS-A)',
    message: 'Student has 4 major exams and 2 project deadlines in 3 days. Stress score: 9.2/10.',
    time: '10 mins ago',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Attendance Shortage Risk',
    student: 'Priya Patel (EC-B)',
    message: 'Attendance dropped to 74%. Needs 3 consecutive days to qualify for exams.',
    time: '2 hours ago',
  }
];

export const AlertsPage = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">System Alerts</h2>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${alert.type === 'critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800 text-lg">{alert.title}</h3>
                <span className="flex items-center gap-1 text-xs text-slate-400"><Clock size={14} /> {alert.time}</span>
              </div>
              <p className="text-slate-600 mt-3 text-sm">{alert.message}</p>
              <div className="mt-5 flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg">Review Details <ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};