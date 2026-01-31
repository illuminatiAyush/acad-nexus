import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalIcon, Plus, 
  AlertTriangle, BookOpen, GraduationCap, Clock, X, Trash2, // Added Trash2
  Save, ArrowLeft, Zap, AlertOctagon
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';

export const CalendarPage = () => {
  const { user } = useAcademic();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState(null);
  
  // --- STATE ---
  const [events, setEvents] = useState([
    { id: 1, day: 5, title: "DBMS Lab Final", type: "exam", stress: 40 },
    { id: 2, day: 5, title: "History Essay", type: "assignment", stress: 20 },
    { id: 3, day: 8, title: "Algorithms Quiz", type: "quiz", stress: 30 },
    { id: 4, day: 12, title: "Physics Midterm", type: "exam", stress: 50 },
    { id: 7, day: 13, title: "Project Alpha Demo", type: "project", stress: 50 },
    { id: 8, day: 14, title: "Stats Final", type: "exam", stress: 60 },
  ]);

  const [isAddingMode, setIsAddingMode] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', type: 'assignment', intensity: 'medium' });

  // --- LOGIC ---
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const getEventsForDay = (day) => events.filter(e => e.day === day);
  
  const getDailyStress = (day) => getEventsForDay(day).reduce((acc, curr) => acc + curr.stress, 0);

  const getIntensityValue = (intensity) => {
    switch(intensity) {
      case 'high': return 50;
      case 'medium': return 30;
      case 'low': return 10;
      default: return 20;
    }
  };

  const projectedStress = selectedDate ? getDailyStress(selectedDate) + getIntensityValue(newTask.intensity) : 0;
  const isOverload = projectedStress > 80;

  // --- ACTIONS ---
  const handleSaveTask = () => {
    if (!newTask.title || !selectedDate) return;
    const newEvent = {
      id: Date.now(),
      day: selectedDate,
      title: newTask.title,
      type: newTask.type,
      stress: getIntensityValue(newTask.intensity)
    };
    setEvents([...events, newEvent]);
    setIsAddingMode(false);
    setNewTask({ title: '', type: 'assignment', intensity: 'medium' });
  };

  // NEW: Delete Function
  const handleDeleteTask = (e, id) => {
    e.stopPropagation(); // Prevent triggering other clicks
    setEvents(events.filter(ev => ev.id !== id));
  };

  const getStressColor = (score) => {
    if (score === 0) return 'hover:bg-slate-50 dark:hover:bg-slate-800/50';
    if (score >= 70) return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30';
    if (score >= 40) return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30';
    return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30';
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6 animate-in fade-in duration-500">
      
      {/* LEFT: CALENDAR GRID */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden transition-all duration-300">
        
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 mr-4">
               <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400"><ChevronLeft size={20} /></button>
               <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400"><ChevronRight size={20} /></button>
            </div>
            <button 
              onClick={() => {
                const today = new Date().getDate(); 
                setSelectedDate(today);
                setIsAddingMode(true);
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary-500/20"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-white dark:bg-slate-900">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30"></div>
          ))}

          {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
            const day = i + 1;
            const stress = getDailyStress(day);
            const isSelected = selectedDate === day;

            return (
              <div 
                key={day}
                onClick={() => { setSelectedDate(day); setIsAddingMode(false); }}
                className={`
                  relative border-r border-b border-slate-100 dark:border-slate-800 p-2 cursor-pointer transition-all duration-200 group
                  ${getStressColor(stress)}
                  ${isSelected ? 'ring-2 ring-inset ring-primary-500 z-10' : ''}
                `}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-medium ${stress > 0 ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>{day}</span>
                  {stress > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 rounded-full ${
                      stress >= 70 ? 'bg-red-100 text-red-700' : stress >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {stress}%
                    </span>
                  )}
                </div>

                <div className="mt-2 space-y-1">
                  {getEventsForDay(day).slice(0, 3).map((ev, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[10px] truncate text-slate-600 dark:text-slate-400">
                      <div className={`w-1.5 h-1.5 rounded-full ${ev.type === 'exam' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                      <span className="truncate">{ev.title}</span>
                    </div>
                  ))}
                </div>

                <div onClick={(e) => { e.stopPropagation(); setSelectedDate(day); setIsAddingMode(true); }} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 dark:bg-white/5">
                  <Plus size={24} className="text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: SIDE PANEL */}
      <div className={`w-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col transition-all duration-300 ${selectedDate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden lg:flex'}`}>
        
        {/* ADD TASK MODE */}
        {isAddingMode && selectedDate ? (
           <>
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
               <button onClick={() => setIsAddingMode(false)} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><ArrowLeft size={20} /></button>
               <h3 className="text-lg font-bold text-slate-800 dark:text-white">Add to Jan {selectedDate}</h3>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
               <div className={`p-4 rounded-xl border ${isOverload ? 'bg-red-50 dark:bg-red-900/10 border-red-200' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs font-bold text-slate-500 uppercase">Projected Stress</span>
                     <span className={`text-sm font-bold ${isOverload ? 'text-red-600' : 'text-slate-700 dark:text-white'}`}>{getDailyStress(selectedDate)}% → {projectedStress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-500 ${isOverload ? 'bg-red-500' : 'bg-primary-500'}`} style={{ width: `${Math.min(projectedStress, 100)}%` }}></div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Task Title</label>
                     <input type="text" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" placeholder="e.g., Math Final" autoFocus />
                  </div>
                  
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Intensity</label>
                     <div className="space-y-2">
                        {[{ l: 'low', t: 'Low (10%)' }, { l: 'medium', t: 'Medium (30%)' }, { l: 'high', t: 'High (50%)' }].map((opt) => (
                           <button key={opt.l} onClick={() => setNewTask({...newTask, intensity: opt.l})} className={`w-full text-left p-3 rounded-lg border transition-all ${newTask.intensity === opt.l ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200 dark:border-slate-700'}`}>
                              <span className={`text-sm font-bold ${newTask.intensity === opt.l ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{opt.t}</span>
                              {newTask.intensity === opt.l && <Zap size={16} className="float-right text-indigo-500" fill="currentColor" />}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-800">
               <button onClick={handleSaveTask} className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"><Save size={18} /> Save</button>
            </div>
           </>
        ) : (
        /* DETAILS MODE */
          selectedDate && (
            <>
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-800/50 rounded-t-2xl">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2"><CalIcon size={20} className="text-slate-400" /> Jan {selectedDate}</h3>
                  <div className="flex items-center gap-2 mt-2"><span className="text-xs font-bold text-slate-500">Total Stress: {getDailyStress(selectedDate)}/100</span></div>
                </div>
                <button onClick={() => setSelectedDate(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {getEventsForDay(selectedDate).length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-slate-400 text-sm mb-4">No events scheduled.</p>
                        <button onClick={() => setIsAddingMode(true)} className="text-primary-500 text-sm font-bold hover:underline">Add First Task</button>
                    </div>
                ) : (
                    getEventsForDay(selectedDate).map((ev) => (
                    <div key={ev.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <div className={`mt-1 p-1.5 rounded-full ${ev.type === 'exam' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            {ev.type === 'exam' ? <GraduationCap size={14} /> : <BookOpen size={14} />}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{ev.title}</p>
                            <p className="text-xs text-slate-500 capitalize">{ev.type} • {ev.stress} Pts</p>
                        </div>
                        {/* DELETE BUTTON ADDED HERE */}
                        <button 
                          onClick={(e) => handleDeleteTask(e, ev.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                          title="Remove Task"
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                    ))
                )}
              </div>

              <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                  <button onClick={() => setIsAddingMode(true)} className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">+ Add Another Task</button>
              </div>
            </>
          )
        )}
        
        {!selectedDate && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <CalIcon size={48} className="opacity-20 mb-4" />
            <p className="text-sm">Select a date to manage schedule.</p>
          </div>
        )}
      </div>

    </div>
  );
};