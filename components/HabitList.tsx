import React, { useState } from 'react';
import { Habit, HabitLog, HabitType } from '../types';
import { CheckIcon, TrashIcon } from './Icons';
import { THEME, formatDate, TRANSLATIONS } from '../constants';

interface HabitListProps {
  habits: Habit[];
  logs: HabitLog;
  selectedDate: Date;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  lang: 'en' | 'tr' | 'de' | 'es' | 'ar';
}

export const HabitList: React.FC<HabitListProps> = ({ habits, logs, selectedDate, onToggle, onDelete, lang }) => {
  const [activeTab, setActiveTab] = useState<HabitType>(HabitType.BUILD);
  const dateKey = formatDate(selectedDate);
  const t = TRANSLATIONS[lang];

  const filteredHabits = habits.filter(h => h.type === activeTab);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex p-1 bg-coffee-100 dark:bg-coffee-900 rounded-xl mb-4 shrink-0">
        <button
          onClick={() => setActiveTab(HabitType.BUILD)}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === HabitType.BUILD 
              ? 'bg-white dark:bg-coffee-800 text-coffee-800 dark:text-coffee-100 shadow-sm' 
              : 'text-coffee-400 hover:text-coffee-600 dark:hover:text-coffee-300'
          }`}
        >
          {t.habitTypes[HabitType.BUILD]}
        </button>
        <button
          onClick={() => setActiveTab(HabitType.QUIT)}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === HabitType.QUIT 
              ? 'bg-white dark:bg-coffee-800 text-coffee-800 dark:text-coffee-100 shadow-sm' 
              : 'text-coffee-400 hover:text-coffee-600 dark:hover:text-coffee-300'
          }`}
        >
          {t.habitTypes[HabitType.QUIT]}
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-4">
        {filteredHabits.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-coffee-400 dark:text-coffee-500 p-8 text-center">
            <p className="text-lg mb-2">{t.emptyList.title}</p>
            <p className="text-sm opacity-70">{t.emptyList.subtitle}</p>
          </div>
        ) : (
          filteredHabits.map((habit) => {
            const isCompleted = logs[dateKey]?.[habit.id] || false;
            
            // Calculate Streak
            let streak = 0;
            if (isCompleted) streak = 1;
            
            let d = new Date(selectedDate);
            d.setDate(d.getDate() - 1);
            while (true) {
              const k = formatDate(d);
              if (logs[k]?.[habit.id]) {
                streak++;
                d.setDate(d.getDate() - 1);
              } else {
                break;
              }
            }

            return (
              <div 
                key={habit.id} 
                className="bg-white dark:bg-coffee-900 rounded-2xl p-4 shadow-sm border border-coffee-50 dark:border-coffee-800 flex items-center justify-between overflow-hidden relative"
              >
                {/* Color Indicator Bar */}
                <div 
                  className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bottom-0 w-1.5" 
                  style={{ backgroundColor: habit.color || '#A38456' }}
                />

                <div className="flex-1 ps-3 rtl:pe-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-coffee-400 dark:text-coffee-500 font-medium">
                      {streak > 0 ? `${streak} ${t.streak}` : t.notStarted}
                    </span>
                  </div>
                  <h3 className="text-coffee-900 dark:text-coffee-100 font-semibold text-lg">{habit.title}</h3>
                  {habit.description && <p className="text-coffee-500 dark:text-coffee-400 text-xs mt-0.5">{habit.description}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if(window.confirm(`${habit.title} ${t.confirmDelete}`)) {
                        onDelete(habit.id);
                      }
                    }}
                    className="text-coffee-200 dark:text-coffee-700 hover:text-red-400 dark:hover:text-red-400 p-3 rounded-full transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => onToggle(habit.id)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isCompleted 
                        ? 'text-white border-transparent shadow-md' 
                        : 'border-coffee-100 dark:border-coffee-700 bg-transparent text-transparent'
                    }`}
                    style={{ 
                      backgroundColor: isCompleted ? (habit.color || THEME.success) : 'transparent',
                      borderColor: isCompleted ? 'transparent' : undefined
                    }}
                  >
                    <CheckIcon className="w-8 h-8" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};