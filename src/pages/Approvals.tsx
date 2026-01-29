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
        
        {/* Left: The Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <form className="space-y-6">
            
            {/* Request Type Selector */}
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

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-slate-400" size={18} />
                  <input type="date" className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 outline-none text-slate-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-slate-400" size={18} />
                  <input type="date" className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 outline-none text-slate-700" />
                </div>
              </div>
            </div>

            {/* Reason Text Area */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Request</label>
              <textarea 
                rows={4} 
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 outline-none text-slate-700"
                placeholder="Please provide detailed reason..."
              ></textarea>
            </div>

            {/* Upload Document */}
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <FileText className="text-slate-400 mb-2" size={32} />
              <p className="text-sm text-slate-600 font-medium">Click to upload supporting documents</p>
              <p className="text-xs text-slate-400">PDF, JPG up to 5MB</p>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="button" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2">
                Submit Request <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Right: Automated Pre-Check (The Logic) */}
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary-600" />
              Eligibility Check
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Attendance</span>
                <span className="text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded">87%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[87%]"></div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                <span className="text-slate-600">Pending Assignments</span>
                <span className="text-slate-900 font-bold">2</span>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                <span className="text-slate-600">Stress Score</span>
                <span className="text-amber-600 font-bold bg-amber-100 px-2 py-0.5 rounded">Medium</span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-100 flex gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <p>Your "NOC" request will require HOD approval because your stress score is currently elevated.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};