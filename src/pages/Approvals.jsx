import React, { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';
import { useNavigate } from 'react-router-dom';

export const ApprovalsPage = () => {
  const [requestType, setRequestType] = useState('leave');
  const [reason, setReason] = useState('');
  const { addRequest } = useAcademic();
  const navigate = useNavigate();

  const handleSubmit = () => {
    addRequest({
      type: requestType === 'noc' ? 'Internship NOC' : 'Medical Leave',
      description: reason
    });
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">New Request</h2>
        <p className="text-slate-500 dark:text-slate-400">Submit an academic request for approval.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 transition-colors duration-200">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Request Type</label>
              <div className="grid grid-cols-3 gap-3">
                {['leave', 'noc', 'event'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRequestType(type)}
                    className={`border rounded-lg py-3 text-sm font-medium capitalize transition-all ${
                      requestType === type 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {type === 'noc' ? 'Internship NOC' : type}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                <input type="date" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                <input type="date" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reason</label>
              <textarea 
                rows="4" 
                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="Please describe why you need this..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button 
                type="button" 
                onClick={handleSubmit}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                Submit Request <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary-600 dark:text-primary-400" /> Eligibility Check
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Attendance</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded">87%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-emerald-500 h-full w-[87%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};