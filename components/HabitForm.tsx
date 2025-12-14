import React, { useState } from 'react';
import { HabitType, Language } from '../types';
import { HABIT_COLORS, TRANSLATIONS } from '../constants';

interface HabitFormProps {
  onAdd: (title: string, type: HabitType, description: string, color: string) => void;
  onClose: () => void;
  lang: Language;
}

export const HabitForm: React.FC<HabitFormProps> = ({ onAdd, onClose, lang }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<HabitType>(HabitType.BUILD);
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, type, description, selectedColor);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-coffee-50 dark:bg-coffee-950 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up sm:animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-coffee-900 dark:text-coffee-50">{t.form.newHabit}</h2>
          <button onClick={onClose} className="text-coffee-400 hover:text-coffee-600 text-lg p-2">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-2">{t.form.nameLabel}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.form.namePlaceholder}
              className="w-full bg-white dark:bg-coffee-900 border border-coffee-200 dark:border-coffee-800 rounded-xl p-4 text-coffee-900 dark:text-coffee-100 focus:ring-2 focus:ring-coffee-400 focus:outline-none placeholder-coffee-300 dark:placeholder-coffee-600"
              autoFocus
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-2">{t.form.typeLabel}</label>
             <div className="grid grid-cols-2 gap-3">
               <button
                 type="button"
                 onClick={() => setType(HabitType.BUILD)}
                 className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                    type === HabitType.BUILD 
                    ? 'bg-coffee-600 text-white border-coffee-600' 
                    : 'bg-white dark:bg-coffee-900 text-coffee-400 dark:text-coffee-500 border-coffee-200 dark:border-coffee-800'
                 }`}
               >
                 {t.habitTypes[HabitType.BUILD]}
               </button>
               <button
                 type="button"
                 onClick={() => setType(HabitType.QUIT)}
                 className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                    type === HabitType.QUIT 
                    ? 'bg-rose-500 text-white border-rose-500' 
                    : 'bg-white dark:bg-coffee-900 text-coffee-400 dark:text-coffee-500 border-coffee-200 dark:border-coffee-800'
                 }`}
               >
                 {t.habitTypes[HabitType.QUIT]}
               </button>
             </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-2">{t.form.colorLabel}</label>
            <div className="flex flex-wrap gap-3">
              {HABIT_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === color ? 'border-coffee-800 dark:border-coffee-100 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-2">{t.form.descLabel}</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.form.descPlaceholder}
              className="w-full bg-white dark:bg-coffee-900 border border-coffee-200 dark:border-coffee-800 rounded-xl p-4 text-coffee-900 dark:text-coffee-100 focus:ring-2 focus:ring-coffee-400 focus:outline-none placeholder-coffee-300 dark:placeholder-coffee-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-coffee-800 dark:bg-coffee-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-coffee-800/20 active:scale-[0.98] transition-transform"
          >
            {t.form.submit}
          </button>
        </form>
      </div>
    </div>
  );
};