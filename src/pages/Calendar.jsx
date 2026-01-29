import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Clock } from 'lucide-react';

const academicEvents = [
  { id: 1, date: 5, title: "DBMS Lab Final", type: "exam", stress: 3 },
  { id: 2, date: 5, title: "History Essay", type: "assignment", stress: 1 },
  { id: 3, date: 12, title: "Algorithms Midterm", type: "exam", stress: 3 },
  { id: 4, date: 12, title: "Math Quiz", type: "quiz", stress: 2 },
  { id: 5, date: 12, title: "Physics Lab", type: "assignment", stress: 1 },
  { id: 6, date: 24, title: "Project Demo", type: "project", stress: 3 },
];

export const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const getEventsForDay = (day) => academicEvents.filter(e => e.date === day);

  const getStressLevel = (day) => {
    const events = getEventsForDay(day);
    const totalScore = events.reduce((acc, curr) => acc + curr.stress, 0);
    if (totalScore >= 5) return 'bg-stress-high text-white hover:bg-red-600'; 
    if (totalScore >= 2) return 'bg-stress-medium text-white hover:bg-yellow-500'; 
    if (events.length > 0) return 'bg-primary-100 text-primary-700 hover:bg-primary-200';
    return 'hover:bg-slate-50 text-slate-700'; 
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">January 2026</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-lg"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const events = getEventsForDay(day);
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`border-r border-b border-slate-100 p-2 flex flex-col items-start justify-between transition-colors relative ${getStressLevel(day)}`}
              >
                <span className="font-medium text-sm p-1 rounded">{day}</span>
                <div className="flex gap-1 mt-1 px-1">
                  {events.map((_, idx) => (
                    <div key={idx} className="h-1.5 w-1.5 rounded-full bg-white/60"></div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};