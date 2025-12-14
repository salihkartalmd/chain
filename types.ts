export enum HabitType {
  BUILD = 'build',
  QUIT = 'quit'
}

export interface Habit {
  id: string;
  title: string;
  type: HabitType;
  createdAt: string; // ISO Date
  icon?: string;
  description?: string;
  color: string; // Hex code
}

export interface HabitLog {
  [date: string]: { // key is YYYY-MM-DD
    [habitId: string]: boolean; // true if completed/successful
  };
}

export enum ViewMode {
  DAILY = 'daily',
  STATS = 'stats',
  CALENDAR = 'calendar',
  SETTINGS = 'settings'
}

export type Language = 'en' | 'tr' | 'de' | 'es' | 'ar';
export type Theme = 'light' | 'dark';

export interface AppSettings {
  language: Language;
  theme: Theme;
}