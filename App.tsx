import React, { useState, useEffect } from 'react';
import { Habit, HabitLog, ViewMode, HabitType, AppSettings } from './types';
import { APP_STORAGE_KEY, SAMPLE_HABITS, formatDate, HABIT_COLORS, TRANSLATIONS, LOCALES } from './constants';
import { HabitList } from './components/HabitList';
import { HabitForm } from './components/HabitForm';
import { CalendarView } from './components/CalendarView';
import { StatsView } from './components/StatsView';
import { SettingsView } from './components/SettingsView';
import { ListIcon, CalendarIcon, ChartIcon, PlusIcon, SettingsIcon } from './components/Icons';

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLog>({});
  const [settings, setSettings] = useState<AppSettings>({ language: 'tr', theme: 'light' });
  
  const [view, setView] = useState<ViewMode>(ViewMode.DAILY);
  const [showAddModal, setShowAddModal] = useState(false);
  const [today] = useState(new Date());

  // Load Data
  useEffect(() => {
    const savedData = localStorage.getItem(APP_STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setHabits(parsed.habits || []);
      setLogs(parsed.logs || {});
      // Ensure settings exist if old data was loaded
      setSettings(prev => ({...prev, ...(parsed.settings || {})}));
    } else {
      setHabits(SAMPLE_HABITS);
    }
  }, []);

  // Save Data
  useEffect(() => {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify({ habits, logs, settings }));
  }, [habits, logs, settings]);

  // Apply Theme and Language
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Set RTL for Arabic
    if (settings.language === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.lang = 'ar';
    } else {
      root.setAttribute('dir', 'ltr');
      root.lang = settings.language;
    }
  }, [settings.theme, settings.language]);

  const toggleHabit = (habitId: string) => {
    const dateKey = formatDate(today);
    setLogs(prev => {
      const dayLogs = prev[dateKey] || {};
      const newStatus = !dayLogs[habitId];
      return {
        ...prev,
        [dateKey]: {
          ...dayLogs,
          [habitId]: newStatus
        }
      };
    });
  };

  const addHabit = (title: string, type: HabitType, description: string, color: string) => {
    const newHabit: Habit = {
      id: generateId(),
      title,
      type,
      description,
      color: color || HABIT_COLORS[0],
      createdAt: new Date().toISOString()
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const t = TRANSLATIONS[settings.language];
  const locale = LOCALES[settings.language];

  return (
    <div className="h-[100dvh] bg-[#FDFBF7] dark:bg-coffee-950 flex flex-col max-w-lg mx-auto shadow-2xl shadow-coffee-900/5 relative overflow-hidden transition-colors duration-300">
      
      {/* Header */}
      <header className="px-6 pt-10 pb-4 bg-[#FDFBF7]/90 dark:bg-coffee-950/90 backdrop-blur-md border-b border-coffee-50 dark:border-coffee-900 shrink-0 z-10 transition-colors">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-coffee-900 dark:text-coffee-50 tracking-tight transition-colors">
              {t.titles[view as keyof typeof t.titles]}
            </h1>
            <p className="text-coffee-400 dark:text-coffee-500 text-sm font-medium transition-colors">
              {view === ViewMode.DAILY && today.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}
              {view !== ViewMode.DAILY && t.subtitles[view as keyof typeof t.subtitles]}
            </p>
          </div>
          {view !== ViewMode.SETTINGS && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-coffee-600 dark:bg-coffee-500 text-white p-3 rounded-full shadow-lg shadow-coffee-600/20 active:scale-95 transition-all hover:bg-coffee-700"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-4 overflow-y-auto no-scrollbar pb-24 h-full">
        {view === ViewMode.DAILY && (
          <HabitList 
            habits={habits} 
            logs={logs} 
            selectedDate={today} 
            onToggle={toggleHabit} 
            onDelete={deleteHabit}
            lang={settings.language}
          />
        )}
        {view === ViewMode.CALENDAR && (
          <CalendarView habits={habits} logs={logs} lang={settings.language} />
        )}
        {view === ViewMode.STATS && (
          <StatsView habits={habits} logs={logs} lang={settings.language} />
        )}
        {view === ViewMode.SETTINGS && (
          <SettingsView settings={settings} onUpdateSettings={handleUpdateSettings} />
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="bg-white dark:bg-coffee-900 border-t border-coffee-50 dark:border-coffee-900 px-6 py-2 pb-6 shrink-0 z-20 transition-colors">
        <nav className="flex justify-between items-center max-w-sm mx-auto">
          <button 
            onClick={() => setView(ViewMode.DAILY)}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl w-16 transition-all duration-300 ${view === ViewMode.DAILY ? 'text-coffee-700 dark:text-coffee-200 -translate-y-1' : 'text-gray-300 dark:text-coffee-700 hover:text-coffee-300'}`}
          >
            <div className={`p-1 rounded-full ${view === ViewMode.DAILY ? 'bg-coffee-50 dark:bg-coffee-800' : ''}`}>
              <ListIcon className="w-6 h-6" />
            </div>
            {view === ViewMode.DAILY && <span className="text-[10px] font-bold">{t.tabs.daily}</span>}
          </button>
          
          <button 
            onClick={() => setView(ViewMode.CALENDAR)}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl w-16 transition-all duration-300 ${view === ViewMode.CALENDAR ? 'text-coffee-700 dark:text-coffee-200 -translate-y-1' : 'text-gray-300 dark:text-coffee-700 hover:text-coffee-300'}`}
          >
            <div className={`p-1 rounded-full ${view === ViewMode.CALENDAR ? 'bg-coffee-50 dark:bg-coffee-800' : ''}`}>
               <CalendarIcon className="w-6 h-6" />
            </div>
            {view === ViewMode.CALENDAR && <span className="text-[10px] font-bold">{t.tabs.calendar}</span>}
          </button>

          <button 
            onClick={() => setView(ViewMode.STATS)}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl w-16 transition-all duration-300 ${view === ViewMode.STATS ? 'text-coffee-700 dark:text-coffee-200 -translate-y-1' : 'text-gray-300 dark:text-coffee-700 hover:text-coffee-300'}`}
          >
             <div className={`p-1 rounded-full ${view === ViewMode.STATS ? 'bg-coffee-50 dark:bg-coffee-800' : ''}`}>
               <ChartIcon className="w-6 h-6" />
            </div>
            {view === ViewMode.STATS && <span className="text-[10px] font-bold">{t.tabs.stats}</span>}
          </button>

          <button 
            onClick={() => setView(ViewMode.SETTINGS)}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl w-16 transition-all duration-300 ${view === ViewMode.SETTINGS ? 'text-coffee-700 dark:text-coffee-200 -translate-y-1' : 'text-gray-300 dark:text-coffee-700 hover:text-coffee-300'}`}
          >
             <div className={`p-1 rounded-full ${view === ViewMode.SETTINGS ? 'bg-coffee-50 dark:bg-coffee-800' : ''}`}>
               <SettingsIcon className="w-6 h-6" />
            </div>
            {view === ViewMode.SETTINGS && <span className="text-[10px] font-bold">{t.tabs.settings}</span>}
          </button>
        </nav>
      </div>

      {/* Add Habit Modal */}
      {showAddModal && (
        <HabitForm 
          onAdd={addHabit} 
          onClose={() => setShowAddModal(false)} 
          lang={settings.language}
        />
      )}
    </div>
  );
};

export default App;