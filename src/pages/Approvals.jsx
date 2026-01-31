import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, CheckCircle2, XCircle, MoreVertical, 
  Clock, Calendar, FileText, AlertTriangle, ChevronRight,
  User, Download, Zap, Check, X, MessageSquare
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';

export const ApprovalsPage = () => {
  const { user, showNotification } = useAcademic();
  const [selectedId, setSelectedId] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]); // For bulk actions
  const [activeTab, setActiveTab] = useState('pending'); // all, pending, approved, rejected
  const [searchQuery, setSearchQuery] = useState('');

  // --- MOCK DATA (In real app, fetch from DB) ---
  const initialRequests = [
    { 
      id: 1, 
      student: "John Smith", 
      avatar: "JS",
      type: "Medical Leave", 
      status: "pending", 
      priority: "critical",
      stressImpact: "High",
      submitted: "2h ago",
      reason: "Diagnosed with Dengue. Need hospitalization leave for 5 days.",
      dates: "Jan 12 - Jan 17, 2026",
      attendance: 68, // Low attendance flag
      stressScore: 85,
      docs: ["medical_report.pdf"] 
    },
    { 
      id: 2, 
      student: "Sarah Lee", 
      avatar: "SL",
      type: "Internship NOC", 
      status: "pending", 
      priority: "normal",
      stressImpact: "Low",
      submitted: "5h ago",
      reason: "Selected for Microsoft Summer Intern program. Requesting NOC.",
      dates: "May 1 - Jul 1, 2026",
      attendance: 92,
      stressScore: 45,
      docs: ["offer_letter.pdf"] 
    },
    { 
      id: 3, 
      student: "Rahul Sharma", 
      avatar: "RS",
      type: "Event Duty", 
      status: "approved", 
      priority: "normal",
      stressImpact: "Medium",
      submitted: "1d ago",
      reason: "Volunteering for TechFest Core Team.",
      dates: "Feb 20 - Feb 22, 2026",
      attendance: 85,
      stressScore: 60,
      docs: [] 
    },
    { 
      id: 4, 
      student: "Emily Chen", 
      avatar: "EC",
      type: "Medical Leave", 
      status: "rejected", 
      priority: "normal",
      stressImpact: "Medium",
      submitted: "2d ago",
      reason: "Feeling under the weather.",
      dates: "Jan 10, 2026",
      attendance: 72,
      stressScore: 55,
      docs: [] 
    }
  ];

  const [requests, setRequests] = useState(initialRequests);

  // --- FILTER LOGIC ---
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesTab = activeTab === 'all' || req.status === activeTab;
      const matchesSearch = req.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            req.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [requests, activeTab, searchQuery]);

  const activeRequest = requests.find(r => r.id === selectedId) || requests[0];

  // --- ACTIONS ---
  const handleAction = (id, action) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    showNotification(`Request ${action === 'approved' ? 'Approved' : 'Rejected'} Successfully`);
  };

  const handleBulkAction = (action) => {
    setRequests(prev => prev.map(r => selectedIds.includes(r.id) ? { ...r, status: action } : r));
    showNotification(`${selectedIds.length} Requests ${action === 'approved' ? 'Approved' : 'Rejected'}`);
    setSelectedIds([]);
  };

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-4 md:-m-8">
      
      {/* --- TOP BAR: CONTROLS --- */}
      <div className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Approvals</h1>
            <p className="text-xs text-slate-500">Manage student requests and permissions.</p>
          </div>
          
          {/* Search & Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search student, type, or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none text-slate-800 dark:text-white"
              />
            </div>
            <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-slate-100 dark:border-slate-800">
          {['all', 'pending', 'approved', 'rejected'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- MAIN CONTENT: 2 COLUMN --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: REQUEST LIST */}
        <div className="w-full md:w-1/3 border-r border-slate-200 dark:border-slate-800 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
          {filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <CheckCircle2 size={48} className="mb-4 opacity-20" />
              <p>No requests found</p>
            </div>
          ) : (
            filteredRequests.map(req => (
              <div 
                key={req.id}
                onClick={() => setSelectedId(req.id)}
                className={`group p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-all hover:bg-white dark:hover:bg-slate-800 ${
                  selectedId === req.id ? 'bg-white dark:bg-slate-800 border-l-4 border-l-primary-500 shadow-sm' : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex gap-3">
                  {/* Checkbox for Bulk */}
                  <div className="pt-1" onClick={(e) => { e.stopPropagation(); toggleSelection(req.id); }}>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      selectedIds.includes(req.id) ? 'bg-primary-500 border-primary-500' : 'border-slate-300 dark:border-slate-600 hover:border-primary-500'
                    }`}>
                      {selectedIds.includes(req.id) && <Check size={10} className="text-white" />}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-white">{req.student}</span>
                        {req.priority === 'critical' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{req.submitted}</span>
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{req.type}</p>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] rounded-full uppercase font-bold tracking-wide ${
                        req.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        req.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {req.status}
                      </span>
                      {req.priority === 'critical' && (
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900">
                          Critical
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: DETAIL PANEL */}
        {activeRequest ? (
          <div className="hidden md:flex flex-col flex-1 bg-white dark:bg-slate-900 overflow-hidden relative">
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 pb-24 space-y-8">
              
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-400">
                    {activeRequest.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{activeRequest.student}</h2>
                    <p className="text-slate-500 text-sm">Computer Science • Batch of 2026</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <User size={12} /> ID: 2026045
                      </span>
                    </div>
                  </div>
                </div>
                {/* Status Badge Big */}
                <div className={`px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wider ${
                   activeRequest.status === 'approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                   activeRequest.status === 'rejected' ? 'bg-red-50 border-red-200 text-red-600' :
                   'bg-amber-50 border-amber-200 text-amber-600'
                }`}>
                  {activeRequest.status}
                </div>
              </div>

              {/* Request Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Request Summary</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <p className="text-xs text-slate-500">Request Type</p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{activeRequest.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{activeRequest.dates}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-slate-500 mb-1">Reason</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">"{activeRequest.reason}"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Check */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">System Checks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Attendance Card */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Attendance</p>
                      <p className={`text-xl font-bold ${activeRequest.attendance < 75 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {activeRequest.attendance}%
                      </p>
                    </div>
                    {activeRequest.attendance < 75 ? (
                      <AlertTriangle className="text-red-500" />
                    ) : (
                      <CheckCircle2 className="text-emerald-500" />
                    )}
                  </div>

                  {/* Stress Impact Card */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between mb-2">
                       <p className="text-xs text-slate-500">Projected Stress Impact</p>
                       <p className={`text-xs font-bold ${activeRequest.stressImpact === 'High' ? 'text-red-500' : 'text-emerald-500'}`}>
                          {activeRequest.stressImpact} Increase
                       </p>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                       <div className={`h-full w-2/3 ${activeRequest.stressImpact === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Attachments</h3>
                {activeRequest.docs.length > 0 ? (
                  <div className="flex gap-4">
                    {activeRequest.docs.map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-white">{doc}</p>
                          <p className="text-xs text-slate-500">PDF • 1.2 MB</p>
                        </div>
                        <Download size={16} className="text-slate-400" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">No documents attached.</p>
                )}
              </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center z-10">
              <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 flex items-center gap-2 text-sm font-medium">
                <MessageSquare size={18} /> Request More Info
              </button>
              
              <div className="flex gap-3">
                 {activeRequest.status === 'pending' ? (
                   <>
                     <button 
                       onClick={() => handleAction(activeRequest.id, 'rejected')}
                       className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                     >
                       Reject
                     </button>
                     <button 
                       onClick={() => handleAction(activeRequest.id, 'approved')}
                       className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center gap-2"
                     >
                       <Check size={18} /> Approve Request
                     </button>
                   </>
                 ) : (
                   <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                     <CheckCircle2 size={16} /> Action Taken
                   </span>
                 )}
              </div>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white dark:bg-slate-900">
             <p className="text-slate-400">Select a request to view details</p>
          </div>
        )}
      </div>

      {/* --- FLOATING BULK ACTIONS BAR --- */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-6 animate-in slide-in-from-bottom-5">
           <span className="font-bold text-sm">{selectedIds.length} Selected</span>
           <div className="h-4 w-px bg-slate-700"></div>
           <div className="flex gap-2">
              <button 
                onClick={() => handleBulkAction('approved')}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-800 rounded-lg text-emerald-400 text-sm font-medium transition-colors"
              >
                <Check size={16} /> Approve
              </button>
              <button 
                onClick={() => handleBulkAction('rejected')}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-800 rounded-lg text-red-400 text-sm font-medium transition-colors"
              >
                <X size={16} /> Reject
              </button>
           </div>
           <button onClick={() => setSelectedIds([])} className="ml-2 text-slate-500 hover:text-white">
             <XCircle size={20} />
           </button>
        </div>
      )}

    </div>
  );
};