import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalIcon, Plus, 
  AlertTriangle, BookOpen, GraduationCap, Clock, X, MoreVertical 
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';

export const CalendarPage = () => {
  const { user } = useAcademic();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Jan 2026
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month'); // 'month' or 'week'

  // --- MOCK DATA ENGINE ---
  // In a real app, this comes from your database
  const generateEvents = (year, month) => [
    { id: 1, day: 5, title: "DBMS Lab Final", type: "exam", stress: 40 },
    { id: 2, day: 5, title: "History Essay", type: "assignment", stress: 20 },
    { id: 3, day: 8, title: "Algorithms Quiz", type: "quiz", stress: 30 },
    { id: 4, day: 12, title: "Physics Midterm", type: "exam", stress: 50 },
    { id: 5, day: 12, title: "Math Problem Set", type: "assignment", stress: 20 },
    { id: 6, day: 13, title: "Chemistry Lab", type: "assignment", stress: 20 },
    { id: 7, day: 13, title: "Project Alpha Demo", type: "project", stress: 50 }, // Hell Week Start
    { id: 8, day: 14, title: "Stats Final", type: "exam", stress: 60 },
    { id: 9, day: 14, title: "Code Review", type: "assignment", stress: 15 },
    { id: 10, day: 24, title: "Guest Lecture", type: "event", stress: 5 },
  ];

  const events = generateEvents(currentDate.getFullYear(), currentDate.getMonth());

  // --- LOGIC HELPERS ---
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const getEventsForDay = (day) => events.filter(e => e.day === day);
  
  const getDailyStress = (day) => {
    const dayEvents = getEventsForDay(day);
    return dayEvents.reduce((acc, curr) => acc + curr.stress, 0);
  };

  const getStressColor = (score) => {
    if (score === 0) return 'hover:bg-slate-50 dark:hover:bg-slate-800/50';
    if (score >= 70) return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30';
    if (score >= 40) return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30';
    return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30';
  };

  const getStressLabel = (score) => {
    if (score >= 70) return { label: 'CRITICAL', color: 'text-red-600 dark:text-red-400' };
    if (score >= 40) return { label: 'MODERATE', color: 'text-amber-600 dark:text-amber-400' };
    return { label: 'LIGHT', color: 'text-emerald-600 dark:text-emerald-400' };
  };

  // --- RENDERERS ---

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6 animate-in fade-in duration-500">
      
      {/* LEFT: CALENDAR GRID */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setView('month')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${view === 'month' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setView('week')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${view === 'week' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                Week
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1 mr-4">
               <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400"><ChevronLeft size={20} /></button>
               <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400"><ChevronRight size={20} /></button>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary-500/20">
              <Plus size={16} />
              {user?.role === 'student' ? 'Add Personal Task' : 'Schedule Exam'}
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
          ))}
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-white dark:bg-slate-900">
          {/* Empty cells for start of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30"></div>
          ))}

          {/* Actual Days */}
          {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
            const day = i + 1;
            const stress = getDailyStress(day);
            const dayEvents = getEventsForDay(day);
            const isSelected = selectedDate === day;

            return (
              <div 
                key={day}
                onClick={() => setSelectedDate(day)}
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

                {/* Event Dots / Icons */}
                <div className="mt-2 space-y-1">
                  {dayEvents.slice(0, 3).map((ev, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[10px] truncate text-slate-600 dark:text-slate-400">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        ev.type === 'exam' ? 'bg-red-500' : ev.type === 'project' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="truncate">{ev.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                     <div className="text-[10px] text-slate-400 pl-2">+{dayEvents.length - 3} more</div>
                  )}
                </div>
                
                {/* Tooltip on Hover */}
                {stress > 0 && (
                   <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Clock size={14} className="text-slate-400" />
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: DETAILS PANEL (Slide Over) */}
      <div className={`w-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col transition-all duration-300 ${selectedDate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden lg:flex'}`}>
        
        {selectedDate ? (
          <>
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-800/50 rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <CalIcon size={20} className="text-slate-400" /> 
                  {currentDate.toLocaleString('default', { month: 'short' })} {selectedDate}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                   <span className={`text-xs font-bold px-2 py-0.5 rounded ${getStressLabel(getDailyStress(selectedDate)).color} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700`}>
                      {getStressLabel(getDailyStress(selectedDate)).label} LOAD
                   </span>
                   <span className="text-xs text-slate-500">{getDailyStress(selectedDate)}/100 Stress Score</span>
                </div>
              </div>
              <button onClick={() => setSelectedDate(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Hell Week Warning */}
              {getDailyStress(selectedDate) > 75 && (
                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 p-4 rounded-xl flex gap-3">
                    <AlertTriangle className="text-red-500 shrink-0" size={20} />
                    <div>
                       <h4 className="text-sm font-bold text-red-700 dark:text-red-400">High Stress Warning</h4>
                       <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                          {user?.role === 'faculty' 
                             ? 'Consider rescheduling assessments. Students are overloaded this day.' 
                             : 'You have a very heavy load. Prioritize critical tasks first.'}
                       </p>
                    </div>
                 </div>
              )}

              {/* Event List */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Scheduled Events</h4>
                <div className="space-y-3">
                   {getEventsForDay(selectedDate).length === 0 ? (
                      <p className="text-sm text-slate-400 italic">No events scheduled.</p>
                   ) : (
                      getEventsForDay(selectedDate).map((ev) => (
                        <div key={ev.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                           <div className={`mt-1 p-1.5 rounded-full ${
                              ev.type === 'exam' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                           }`}>
                              {ev.type === 'exam' ? <GraduationCap size={14} /> : <BookOpen size={14} />}
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between">
                                 <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{ev.title}</p>
                                 <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600"><MoreVertical size={14} /></button>
                              </div>
                              <p className="text-xs text-slate-500 capitalize">{ev.type} • {ev.stress} Stress Pts</p>
                           </div>
                        </div>
                      ))
                   )}
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800">
               {user?.role === 'faculty' ? (
                  <button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                     Reschedule Assessments
                  </button>
               ) : (
                  <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium text-sm hover:bg-primary-700 transition-colors">
                     Add Study Session
                  </button>
               )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <CalIcon size={32} className="opacity-50" />
            </div>
            <p className="text-sm">Select a date to view detailed breakdown.</p>
          </div>
        )}
      </div>

    </div>
  );
};