import React, { useState, useEffect } from 'react';
import { 
  FileText, Calendar, Upload, AlertTriangle, CheckCircle2, 
  ChevronRight, X, Clock, Briefcase, GraduationCap, Zap, ArrowLeft
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';
import { useNavigate } from 'react-router-dom';

export const RequestsPage = () => {
  const { addRequest, user } = useAcademic();
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState('medical'); // medical, noc, event, custom
  const [step, setStep] = useState(1); // 1: Type, 2: Details, 3: Success
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    reason: '',
    startDate: '',
    endDate: '',
    company: '',
    eventTitle: ''
  });

  // --- MOCK ELIGIBILITY LOGIC ---
  const eligibility = {
    attendance: 82, // Change this to <75 to test "Not Eligible" state
    minRequired: 75,
    status: 'eligible', // eligible, warning, ineligible
    stressWeek: true // Simulates if the requested dates clash with exams
  };

  const isEligible = eligibility.attendance >= eligibility.minRequired;

  // --- HANDLERS ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFiles([...files, e.target.files[0]]);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Call
    setTimeout(() => {
      addRequest({
        type: requestType === 'medical' ? 'Medical Leave' : 
              requestType === 'noc' ? 'Internship NOC' : 'Event Permission',
        description: formData.reason,
        status: 'pending'
      });
      setStep(3); // Show success screen
    }, 800);
  };

  // --- RENDER HELPERS ---
  const renderFormFields = () => {
    switch (requestType) {
      case 'noc':
        return (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company / Organization</label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                  placeholder="e.g. Google, Microsoft, Startup Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
            </div>
          </>
        );
      case 'event':
        return (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Event Title</label>
              <div className="relative">
                <Zap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                  placeholder="e.g. TechFest Hackathon"
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // --- SUCCESS SCREEN (STEP 3) ---
  if (step === 3) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center animate-in zoom-in-95 duration-300">
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Request Submitted!</h2>
        <p className="text-slate-500 mb-8">
          Your request has been sent to the Faculty Coordinator. You will be notified once it is reviewed.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Back to Dashboard
          </button>
          <button 
            onClick={() => { setStep(1); setFormData({}); setFiles([]); }} 
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-3 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">New Request</h1>
        <p className="text-slate-500 dark:text-slate-400">Submit academic requests digitally. We'll check your eligibility instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT: FORM SECTION */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
          
          {/* Step 1: Request Type */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">1. Select Request Type</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'medical', icon: FileText, label: 'Medical Leave' },
                { id: 'noc', icon: Briefcase, label: 'Internship NOC' },
                { id: 'event', icon: Zap, label: 'Event Permission' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setRequestType(type.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    requestType === type.id 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                      : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <type.icon size={24} />
                  <span className="text-xs font-bold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Details Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider -mb-2">2. Request Details</label>
            
            {renderFormFields()}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Start Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white dark:[color-scheme:dark]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">End Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white dark:[color-scheme:dark]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Reason / Description</label>
              <textarea 
                rows="4" 
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white placeholder:text-slate-400"
                placeholder="Please describe why you need this..."
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Supporting Documents</label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400">PDF, JPG or PNG (Max 5MB)</p>
              </div>
              
              {/* File Preview List */}
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-primary-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[150px]">{file.name}</span>
                      </div>
                      <button type="button" onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500"><X size={16}/></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={!isEligible}
                className={`flex-[2] py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                  isEligible 
                  ? 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/20' 
                  : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                }`}
              >
                {isEligible ? 'Submit Request' : 'Not Eligible'} 
                {isEligible && <ChevronRight size={18} />}
              </button>
            </div>
          </form>

        </div>

        {/* RIGHT: ELIGIBILITY & IMPACT */}
        <div className="space-y-6">
          
          {/* Eligibility Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
              <GraduationCap size={18} className="text-primary-500" /> Eligibility Check
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Attendance</span>
                <span className={`font-bold ${isEligible ? 'text-emerald-500' : 'text-red-500'}`}>
                  {eligibility.attendance}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isEligible ? 'bg-emerald-500' : 'bg-red-500'}`} 
                  style={{ width: `${eligibility.attendance}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0%</span>
                <span className="font-bold text-slate-500">Required: {eligibility.minRequired}%</span>
                <span>100%</span>
              </div>

              {!isEligible && (
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg flex gap-3 border border-red-100 dark:border-red-900/50">
                  <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 dark:text-red-400">
                    Your attendance is below 75%. You cannot submit this request without Dean's approval.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Stress Impact Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
             <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                <Zap size={18} className="text-amber-500" /> Stress Impact
             </h3>
             <p className="text-xs text-slate-500 mb-4">
                Based on your selected dates, here is the projected impact on your academic load.
             </p>
             
             {eligibility.stressWeek ? (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50">
                   <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">⚠️ Exam Week Warning</p>
                   <p className="text-[10px] text-amber-600 dark:text-amber-500">
                      Your leave overlaps with "Midterm Exams". This might affect your grades significantly.
                   </p>
                </div>
             ) : (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                   <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">✅ Low Impact</p>
                   <p className="text-[10px] text-emerald-600 dark:text-emerald-500">
                      Safe time to take leave. No major submissions due.
                   </p>
                </div>
             )}
          </div>

        </div>

      </div>
    </div>
  );
};
