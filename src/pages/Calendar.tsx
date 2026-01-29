import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Clock } from 'lucide-react';

// Mock Data: This would normally come from your Database
const academicEvents = [
  { id: 1, date: 5, title: "DBMS Lab Final", type: "exam", stress: 3 },
  { id: 2, date: 5, title: "History Essay", type: "assignment", stress: 1 },
  { id: 3, date: 12, title: "Algorithms Midterm", type: "exam", stress: 3 },
  { id: 4, date: 12, title: "Math Quiz", type: "quiz", stress: 2 },
  { id: 5, date: 12, title: "Physics Lab", type: "assignment", stress: 1 }, // High Stress Day!
  { id: 6, date: 24, title: "Project Demo", type: "project", stress: 3 },
];

export const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Helper to get events for a specific day
  const getEventsForDay = (day: number) => academicEvents.filter(e => e.date === day);

  // Helper to calculate total "Stress Score" for a day
  const getStressLevel = (day: number) => {
    const events = getEventsForDay(day);
    const totalScore = events.reduce((acc, curr) => acc + curr.stress, 0);
    
    if (totalScore >= 5) return 'bg-stress-high text-white hover:bg-red-600'; // High Risk
    if (totalScore >= 2) return 'bg-stress-medium text-white hover:bg-yellow-500'; // Moderate
    if (events.length > 0) return 'bg-primary-100 text-primary-700 hover:bg-primary-200'; // Low
    return 'hover:bg-slate-50 text-slate-700'; // Empty
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
      
      {/* Left: The Calendar Grid */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        {/* Calendar Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">January 2026</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-lg"><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
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
                
                {/* Visual Dots for Events */}
                <div className="flex gap-1 mt-1 px-1">
                  {events.map((e, idx) => (
                    <div key={idx} className="h-1.5 w-1.5 rounded-full bg-white/60"></div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Selected Day Details */}
      <div className="w-full lg:w-80 bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-y-auto">
        {selectedDay ? (
          <>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Schedule for Jan {selectedDay}</h3>
            <p className="text-sm text-slate-500 mb-6">3 Events scheduled</p>

            <div className="space-y-4">
              {getEventsForDay(selectedDay).map((event) => (
                <div key={event.id} className="border-l-4 border-primary-500 pl-4 py-1">
                  <h4 className="font-semibold text-slate-800 text-sm">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase font-bold tracking-wide">
                      {event.type}
                    </span>
                    {event.stress > 2 && (
                       <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                         <AlertTriangle size={10} /> High Stress
                       </span>
                    )}
                  </div>
                </div>
              ))}
              
              {getEventsForDay(selectedDay).length === 0 && (
                <div className="text-center py-10 text-slate-400">
                  <Clock size={40} className="mx-auto mb-3 opacity-20" />
                  <p>No deadlines set for this day.</p>
                  <p className="text-xs">Enjoy your free time!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
            <Clock size={48} className="mb-4 opacity-20" />
            <p>Select a date to view deadlines and stress analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};