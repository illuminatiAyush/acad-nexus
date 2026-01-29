import React, { useState } from 'react';
import { FileText, Calendar, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const ApprovalsPage = () => {
  const [requestType, setRequestType] = useState('leave');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">New Request</h2>
        <p className="text-slate-500">Submit an academic request. Approvals are automated based on your attendance and current stress load.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Request Type</label>
              <div className="grid grid-cols-3 gap-3">
                {['leave', 'noc', 'event'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRequestType(type)}
                    className={`border rounded-lg py-3 text-sm font-medium capitalize transition-all ${
                      requestType === type 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    {type === 'noc' ? 'Internship NOC' : type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Simple Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-700" />
              <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-700" />
            </div>
            <textarea rows="4" className="w-full p-3 border border-slate-300 rounded-md text-slate-700" placeholder="Reason..."></textarea>
            
            <div className="pt-4 flex justify-end">
              <button type="button" className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2">
                Submit Request <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary-600" /> Eligibility Check
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Attendance</span>
                <span className="text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded">87%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-emerald-500 h-full w-[87%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};