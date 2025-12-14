import React, { useMemo, useState } from 'react';
import { Habit, HabitLog, Language } from '../types';
import { formatDate, TRANSLATIONS, LOCALES } from '../constants';
import { CheckIcon } from './Icons';

interface CalendarViewProps {
  habits: Habit[];
  logs: HabitLog;
  lang: Language;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ habits, logs, lang }) => {
  const [selectedDay, setSelectedDay] = useState<{ date: Date; completed: Habit[] } | null>(null);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const t = TRANSLATIONS[lang];
  const locale = LOCALES[lang];

  // Get days in current month
  const daysInMonth = useMemo(() => {
    const days = [];
    const date = new Date(currentYear, currentMonth, 1);
    while (date.getMonth() === currentMonth) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth, currentYear]);

  // Determine completed habits for a day
  const getDayHabits = (date: Date) => {
    const key = formatDate(date);
    const dayLog = logs[key] || {};
    return habits.filter(h => dayLog[h.id]);
  };

  const handleDayClick = (date: Date) => {
    const completed = getDayHabits(date);
    setSelectedDay({ date, completed });
  };

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-coffee-400 dark:text-coffee-500">
        <p>{t.calendar.noData}</p>
      </div>
    );
  }

  // Calculate grid offset
  // Note: getDay() returns 0 for Sunday. Adjust based on start of week preferences if needed.
  // Standardizing on Mon=0 ... Sun=6 for grid
  const startOffset = (daysInMonth[0].getDay() + 6) % 7;
  const totalSlots = startOffset + daysInMonth.length;
  const minCells = totalSlots > 35 ? 42 : 35;
  const blanks = Array.from({ length: startOffset });
  const trailingBlanks = Array.from({ length: minCells - totalSlots });

  // Weekday Headers (Localized)
  const weekdays = useMemo(() => {
     const days = [];
     const d = new Date(2024, 0, 1); // A Monday
     for(let i=0; i<7; i++) {
        days.push(d.toLocaleDateString(locale, { weekday: 'short' }));
        d.setDate(d.getDate() + 1);
     }
     return days;
  }, [locale]);

  return (
    <div className="flex flex-col h-full pb-4 relative">
      <div className="bg-white dark:bg-coffee-900 rounded-3xl shadow-sm border border-coffee-100 dark:border-coffee-800 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-coffee-50 dark:border-coffee-800 shrink-0">
          <h2 className="text-xl font-bold text-coffee-800 dark:text-coffee-100">
            {today.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
          </h2>
          <p className="text-coffee-400 dark:text-coffee-500 text-xs mt-0.5">{t.calendar.detailHint}</p>
        </div>
        
        {/* Grid Container */}
        <div className="flex-1 flex flex-col p-2 min-h-0">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2 shrink-0">
            {weekdays.map(d => (
              <div key={d} className="text-center text-xs font-medium text-coffee-300 dark:text-coffee-600">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-1 min-h-0">
            {/* Empty cells */}
            {blanks.map((_, i) => (
              <div key={`empty-start-${i}`} className="bg-coffee-50/30 dark:bg-coffee-800/20 rounded-lg" />
            ))}

            {daysInMonth.map(date => {
              const completedHabits = getDayHabits(date);
              const isToday = formatDate(date) === formatDate(today);
              
              return (
                <button 
                  key={date.toISOString()}
                  onClick={() => handleDayClick(date)}
                  className={`
                    rounded-lg flex flex-col items-center justify-start pt-1 gap-0.5 transition-all relative overflow-hidden active:scale-95
                    hover:bg-coffee-50 dark:hover:bg-coffee-800 cursor-pointer
                    ${isToday ? 'bg-coffee-50 dark:bg-coffee-800 border border-coffee-200 dark:border-coffee-600 shadow-sm' : 'bg-white dark:bg-coffee-900 border border-coffee-50 dark:border-coffee-800'}
                  `}
                >
                  <span className={`text-[10px] font-semibold leading-none ${isToday ? 'text-coffee-800 dark:text-coffee-100' : 'text-coffee-400 dark:text-coffee-500'}`}>
                    {date.getDate()}
                  </span>
                  
                  {/* Dots Container */}
                  <div className="flex flex-wrap justify-center content-start gap-0.5 px-0.5 w-full h-full pointer-events-none">
                    {completedHabits.map(h => (
                      <div 
                        key={h.id}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: h.color || '#A38456' }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}

            {trailingBlanks.map((_, i) => (
               <div key={`empty-end-${i}`} className="bg-coffee-50/30 dark:bg-coffee-800/20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDay && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="bg-white dark:bg-coffee-900 w-full max-w-xs rounded-3xl shadow-2xl p-6 relative animate-scale-up border border-coffee-100 dark:border-coffee-800"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedDay(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-coffee-300 dark:text-coffee-600 hover:text-coffee-600 dark:hover:text-coffee-300 p-2"
            >
              &times;
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-coffee-800 dark:text-coffee-100">
                {selectedDay.date.toLocaleDateString(locale, { day: 'numeric', month: 'long' })}
              </h3>
              <p className="text-sm text-coffee-400 dark:text-coffee-500 font-medium">
                {selectedDay.date.toLocaleDateString(locale, { weekday: 'long' })}
              </p>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
              {selectedDay.completed.length > 0 ? (
                selectedDay.completed.map(habit => (
                  <div key={habit.id} className="flex items-center gap-3 p-3 bg-coffee-50/50 dark:bg-coffee-800/50 rounded-xl border border-coffee-100 dark:border-coffee-700">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm shrink-0"
                      style={{ backgroundColor: habit.color }}
                    />
                    <span className="text-coffee-800 dark:text-coffee-200 font-medium text-sm line-clamp-1">
                      {habit.title}
                    </span>
                    <div className="ml-auto text-coffee-400 dark:text-coffee-500">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-coffee-400 dark:text-coffee-500 text-sm">{t.calendar.noActivity}</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-coffee-50 dark:border-coffee-800 text-center">
               <span className="text-xs text-coffee-300 dark:text-coffee-600 font-medium">
                 {selectedDay.completed.length} / {habits.length} {t.calendar.completed}
               </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};