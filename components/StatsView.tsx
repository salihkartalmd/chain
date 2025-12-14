import React, { useMemo } from 'react';
import { Habit, HabitLog, Language } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FireIcon, TrophyIcon, SparklesIcon, ChartIcon } from './Icons';
import { formatDate, TRANSLATIONS, LOCALES } from '../constants';

interface StatsViewProps {
  habits: Habit[];
  logs: HabitLog;
  lang: Language;
}

export const StatsView: React.FC<StatsViewProps> = ({ habits, logs, lang }) => {
  const t = TRANSLATIONS[lang].stats;
  const locale = LOCALES[lang];
  
  // --- 1. Weekly Data for Chart ---
  const weeklyData = useMemo(() => {
    const res = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = formatDate(d);
      const dayName = d.toLocaleDateString(locale, { weekday: 'short' });
      
      let completedCount = 0;
      habits.forEach(h => {
        if (logs[dateKey]?.[h.id]) completedCount++;
      });

      res.push({
        name: dayName,
        completed: completedCount,
        rate: habits.length > 0 ? (completedCount / habits.length) * 100 : 0
      });
    }
    return res;
  }, [habits, logs, locale]);

  // --- 2. Total Completions ---
  const totalCompletions = useMemo(() => {
    let total = 0;
    Object.values(logs).forEach(dayLog => {
      Object.values(dayLog).forEach(status => {
        if (status) total++;
      });
    });
    return total;
  }, [logs]);

  // --- 3. Current Streak ---
  const currentStreak = useMemo(() => {
    let streak = 0;
    // Check backwards
    for (let i = 0; i < 365; i++) {
        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - i);
        const dateKey = formatDate(checkDate);
        
        const dayLog = logs[dateKey] || {};
        const hasActivity = Object.values(dayLog).some(Boolean);

        if (hasActivity) {
            streak++;
        } else {
            if (i === 0) continue; 
            break;
        }
    }
    return streak;
  }, [logs]);

  // --- 4. Best Day of Week ---
  const bestDay = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.entries(logs).forEach(([dateStr, dayLog]) => {
      const count = Object.values(dayLog).filter(Boolean).length;
      if (count > 0) {
        const d = new Date(dateStr);
        const dayName = d.toLocaleDateString(locale, { weekday: 'long' });
        counts[dayName] = (counts[dayName] || 0) + count;
      }
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : '-';
  }, [logs, locale]);

  // --- 5. Overall Completion Rate ---
  const overallRate = useMemo(() => {
      if (habits.length === 0) return 0;
      let totalRate = 0;
      let daysCounted = 0;
      Object.values(logs).forEach(dayLog => {
          const completed = Object.values(dayLog).filter(Boolean).length;
          if (completed > 0) { 
             totalRate += (completed / habits.length);
             daysCounted++;
          }
      });
      return daysCounted > 0 ? Math.round((totalRate / daysCounted) * 100) : 0;
  }, [habits.length, logs]);

  // --- 6. Per Habit Performance ---
  const habitStats = useMemo(() => {
    return habits.map(h => {
        let count = 0;
        Object.values(logs).forEach(day => {
            if (day[h.id]) count++;
        });
        
        const daysExist = Math.max(1, Math.ceil((new Date().getTime() - new Date(h.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
        const rate = Math.round((count / daysExist) * 100);

        return { ...h, totalCount: count, rate };
    }).sort((a, b) => b.rate - a.rate);
  }, [habits, logs]);

  return (
    <div className="flex flex-col space-y-5 pb-6">
      
      {/* Top Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-coffee-600 to-coffee-800 dark:from-coffee-800 dark:to-coffee-950 rounded-2xl p-4 text-white shadow-lg shadow-coffee-600/20 dark:shadow-none relative overflow-hidden">
            <div className="absolute right-[-10px] rtl:right-auto rtl:left-[-10px] top-[-10px] opacity-10">
                <FireIcon className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-2 mb-1 opacity-90">
                <FireIcon className="w-5 h-5" />
                <span className="text-xs font-semibold tracking-wider uppercase">{t.streak}</span>
            </div>
            <div className="text-4xl font-bold tracking-tight">{currentStreak} <span className="text-base font-normal opacity-70">{t.days}</span></div>
        </div>

        {/* Total Completions Card */}
        <div className="bg-white dark:bg-coffee-900 rounded-2xl p-4 border border-coffee-100 dark:border-coffee-800 shadow-sm relative overflow-hidden">
             <div className="absolute right-[-10px] rtl:right-auto rtl:left-[-10px] top-[-10px] opacity-5 text-coffee-600 dark:text-coffee-400">
                <TrophyIcon className="w-24 h-24" />
            </div>
             <div className="flex items-center gap-2 mb-1 text-coffee-400 dark:text-coffee-500">
                <TrophyIcon className="w-5 h-5" />
                <span className="text-xs font-semibold tracking-wider uppercase">{t.total}</span>
            </div>
            <div className="text-3xl font-bold text-coffee-800 dark:text-coffee-100">{totalCompletions}</div>
        </div>

        {/* Rate Card */}
        <div className="bg-white dark:bg-coffee-900 rounded-2xl p-4 border border-coffee-100 dark:border-coffee-800 shadow-sm">
            <div className="text-xs text-coffee-400 dark:text-coffee-500 font-semibold tracking-wider uppercase mb-1">{t.rate}</div>
            <div className="text-2xl font-bold text-coffee-800 dark:text-coffee-100">%{overallRate}</div>
        </div>

        {/* Best Day Card */}
        <div className="bg-white dark:bg-coffee-900 rounded-2xl p-4 border border-coffee-100 dark:border-coffee-800 shadow-sm">
            <div className="text-xs text-coffee-400 dark:text-coffee-500 font-semibold tracking-wider uppercase mb-1">{t.bestDay}</div>
            <div className="text-xl font-bold text-coffee-800 dark:text-coffee-100 truncate">{bestDay}</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-coffee-900 p-5 rounded-3xl shadow-sm border border-coffee-100 dark:border-coffee-800 h-64 flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-coffee-800 dark:text-coffee-100">{t.weekly}</h3>
            <span className="text-xs bg-coffee-50 dark:bg-coffee-800 text-coffee-500 dark:text-coffee-400 px-2 py-1 rounded-lg">{t.last7Days}</span>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="name" 
                tick={{fill: '#b8a078', fontSize: 11, fontWeight: 500}} 
                axisLine={false} 
                tickLine={false}
                dy={10}
              />
              <Tooltip 
                cursor={{fill: 'rgba(163, 132, 86, 0.1)', radius: 4}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#594130' }}
              />
              <Bar dataKey="rate" radius={[6, 6, 6, 6]} barSize={32}>
                {weeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.rate >= 80 ? '#856642' : '#d1c0a0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Habit Breakdown List */}
      <div className="bg-white dark:bg-coffee-900 rounded-3xl shadow-sm border border-coffee-100 dark:border-coffee-800 overflow-hidden">
          <div className="p-5 border-b border-coffee-50 dark:border-coffee-800">
              <h3 className="font-bold text-coffee-800 dark:text-coffee-100 flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-coffee-500" />
                  {t.performance}
              </h3>
          </div>
          <div className="p-2">
            {habitStats.length === 0 ? (
                <p className="text-center text-coffee-400 dark:text-coffee-600 py-4 text-sm">{t.noData}</p>
            ) : (
                habitStats.map((habit) => (
                    <div key={habit.id} className="p-3 hover:bg-coffee-50 dark:hover:bg-coffee-800 rounded-xl transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-coffee-800 dark:text-coffee-200 text-sm">{habit.title}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-coffee-400 dark:text-coffee-500">{habit.totalCount} {t.times}</span>
                                <span className="text-sm font-bold text-coffee-700 dark:text-coffee-300 bg-coffee-100 dark:bg-coffee-800 px-2 py-0.5 rounded-md">%{habit.rate}</span>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-coffee-50 dark:bg-coffee-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                    width: `${habit.rate}%`, 
                                    backgroundColor: habit.color || '#A38456'
                                }}
                            />
                        </div>
                    </div>
                ))
            )}
          </div>
      </div>

    </div>
  );
};