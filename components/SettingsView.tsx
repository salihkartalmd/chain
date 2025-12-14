import React from 'react';
import { AppSettings, Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import { GlobeIcon, MoonIcon, SunIcon } from './Icons';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings }) => {
  const t = TRANSLATIONS[settings.language].settings;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Appearance Section */}
      <div className="bg-white dark:bg-coffee-900 rounded-3xl p-5 border border-coffee-100 dark:border-coffee-800 shadow-sm">
        <h3 className="font-bold text-coffee-800 dark:text-coffee-200 mb-4 flex items-center gap-2">
          <SunIcon className="w-5 h-5 text-coffee-500" />
          {t.appearance}
        </h3>

        <div className="flex items-center justify-between p-3 bg-coffee-50 dark:bg-coffee-950/50 rounded-xl mb-3">
          <span className="text-coffee-700 dark:text-coffee-300 font-medium">{t.theme}</span>
          <div className="flex bg-white dark:bg-coffee-800 p-1 rounded-lg border border-coffee-100 dark:border-coffee-700">
            <button
              onClick={() => onUpdateSettings({ theme: 'light' })}
              className={`p-2 rounded-md transition-all ${settings.theme === 'light' ? 'bg-coffee-100 dark:bg-coffee-600 text-coffee-800 dark:text-white shadow-sm' : 'text-coffee-400'}`}
              aria-label={t.lightMode}
            >
              <SunIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onUpdateSettings({ theme: 'dark' })}
              className={`p-2 rounded-md transition-all ${settings.theme === 'dark' ? 'bg-coffee-100 dark:bg-coffee-600 text-coffee-800 dark:text-white shadow-sm' : 'text-coffee-400'}`}
              aria-label={t.darkMode}
            >
              <MoonIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Language Section */}
      <div className="bg-white dark:bg-coffee-900 rounded-3xl p-5 border border-coffee-100 dark:border-coffee-800 shadow-sm">
        <h3 className="font-bold text-coffee-800 dark:text-coffee-200 mb-4 flex items-center gap-2">
          <GlobeIcon className="w-5 h-5 text-coffee-500" />
          {t.language}
        </h3>
        
        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onUpdateSettings({ language: lang.code })}
              className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                settings.language === lang.code 
                  ? 'bg-coffee-600 text-white shadow-md' 
                  : 'bg-coffee-50 dark:bg-coffee-950/50 text-coffee-700 dark:text-coffee-300 hover:bg-coffee-100 dark:hover:bg-coffee-800'
              }`}
            >
              <span className="flex items-center gap-3 font-medium">
                <span className="text-xl">{lang.flag}</span>
                {lang.label}
              </span>
              {settings.language === lang.code && <div className="w-2 h-2 rounded-full bg-white" />}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-coffee-400 dark:text-coffee-600">{t.about} • {t.version}</p>
      </div>
    </div>
  );
};