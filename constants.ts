import { HabitType, Language } from './types';

export const APP_STORAGE_KEY = 'zincir_app_data_v2';

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const HABIT_COLORS = [
  '#A38456', // Coffee Gold
  '#D4A373', // Tan
  '#CCD5AE', // Sage
  '#E76F51', // Burnt Sienna
  '#2A9D8F', // Persian Green
  '#B5838D', // English Lavender
  '#6B705C', // Olive
  '#457B9D', // Celadon Blue
];

export const SAMPLE_HABITS = [
  {
    id: '1',
    title: 'Book Reading (20m)',
    type: HabitType.BUILD,
    createdAt: new Date().toISOString(),
    description: 'Feed your mind.',
    color: '#A38456'
  },
  {
    id: '2',
    title: 'No Smoking',
    type: HabitType.QUIT,
    createdAt: new Date().toISOString(),
    description: 'Healthy lungs.',
    color: '#E76F51'
  }
];

export const THEME = {
  active: 'bg-coffee-600 text-white',
  inactive: 'text-coffee-400 hover:bg-coffee-100 dark:hover:bg-coffee-800',
  success: 'bg-coffee-500',
};

export const LOCALES: Record<Language, string> = {
  en: 'en-US',
  tr: 'tr-TR',
  de: 'de-DE',
  es: 'es-ES',
  ar: 'ar-SA'
};

export const TRANSLATIONS = {
  en: {
    tabs: { daily: 'Today', calendar: 'Calendar', stats: 'Analysis', settings: 'Settings' },
    titles: { daily: 'Today', calendar: 'Calendar', stats: 'Analysis', settings: 'Settings' },
    subtitles: { daily: 'Daily Overview', calendar: 'Monthly View', stats: 'Status Summary', settings: 'Preferences' },
    habitTypes: { [HabitType.BUILD]: 'Build', [HabitType.QUIT]: 'Quit' },
    emptyList: { title: 'No chains in this category.', subtitle: 'Start something new.' },
    streak: 'day streak',
    notStarted: 'Not started yet',
    confirmDelete: 'will be deleted. Are you sure?',
    stats: {
      streak: 'Current Streak',
      total: 'Total Success',
      rate: 'Completion Rate',
      bestDay: 'Best Day',
      weekly: 'Weekly Activity',
      last7Days: 'Last 7 Days',
      performance: 'Habit Performance',
      days: 'Days',
      times: 'times',
      noData: 'No data yet.'
    },
    calendar: {
      detailHint: 'Tap a day for details.',
      noData: 'No data to display.',
      noActivity: 'No chains completed on this date.',
      completed: 'Completed',
      monthYearFormat: { month: 'long', year: 'numeric' }
    },
    form: {
      newHabit: 'New Chain',
      nameLabel: 'Habit Name',
      namePlaceholder: 'e.g. Drink 2L Water',
      typeLabel: 'Goal Type',
      colorLabel: 'Color',
      descLabel: 'Description (Optional)',
      descPlaceholder: 'Why do you want this?',
      submit: 'Start Chain'
    },
    settings: {
      appearance: 'Appearance',
      language: 'Language',
      theme: 'Theme',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      about: 'About',
      version: 'Version 1.2.1'
    }
  },
  tr: {
    tabs: { daily: 'Liste', calendar: 'Takvim', stats: 'Analiz', settings: 'Ayarlar' },
    titles: { daily: 'Bugün', calendar: 'Takvim', stats: 'Analiz', settings: 'Ayarlar' },
    subtitles: { daily: 'Günün Özeti', calendar: 'Aylık Bakış', stats: 'Durum Özeti', settings: 'Tercihler' },
    habitTypes: { [HabitType.BUILD]: 'Edinme', [HabitType.QUIT]: 'Kurtulma' },
    emptyList: { title: 'Bu kategoride zincir yok.', subtitle: 'Yeni bir başlangıç yap.' },
    streak: 'gün serisi',
    notStarted: 'Henüz başlanmadı',
    confirmDelete: 'silinecek. Emin misin?',
    stats: {
      streak: 'Mevcut Zincir',
      total: 'Toplam Başarı',
      rate: 'Ortalama Başarı',
      bestDay: 'En İyi Gün',
      weekly: 'Haftalık Aktivite',
      last7Days: 'Son 7 Gün',
      performance: 'Alışkanlık Performansı',
      days: 'Gün',
      times: 'kez',
      noData: 'Henüz veri yok.'
    },
    calendar: {
      detailHint: 'Detayları görmek için bir güne dokun.',
      noData: 'Görüntülenecek veri yok.',
      noActivity: 'Bu tarihte tamamlanan zincir yok.',
      completed: 'Tamamlandı',
      monthYearFormat: { month: 'long', year: 'numeric' }
    },
    form: {
      newHabit: 'Yeni Zincir',
      nameLabel: 'Alışkanlık Adı',
      namePlaceholder: 'Örn: 2 Litre Su İç',
      typeLabel: 'Hedef Türü',
      colorLabel: 'Renk Seçimi',
      descLabel: 'Açıklama (İsteğe bağlı)',
      descPlaceholder: 'Neden bunu istiyorsun?',
      submit: 'Zinciri Başlat'
    },
    settings: {
      appearance: 'Görünüm',
      language: 'Dil',
      theme: 'Tema',
      darkMode: 'Koyu Mod',
      lightMode: 'Açık Mod',
      about: 'Hakkında',
      version: 'Versiyon 1.2.1'
    }
  },
  de: {
    tabs: { daily: 'Liste', calendar: 'Kalender', stats: 'Statistik', settings: 'Einst.' },
    titles: { daily: 'Heute', calendar: 'Kalender', stats: 'Statistik', settings: 'Einstellungen' },
    subtitles: { daily: 'Tagesübersicht', calendar: 'Monatsansicht', stats: 'Zusammenfassung', settings: 'Präferenzen' },
    habitTypes: { [HabitType.BUILD]: 'Aufbau', [HabitType.QUIT]: 'Aufgabe' },
    emptyList: { title: 'Keine Gewohnheiten.', subtitle: 'Starte etwas Neues.' },
    streak: 'Tage Folge',
    notStarted: 'Noch nicht begonnen',
    confirmDelete: 'wird gelöscht. Sicher?',
    stats: {
      streak: 'Aktuelle Strähne',
      total: 'Gesamterfolg',
      rate: 'Erfolgsquote',
      bestDay: 'Bester Tag',
      weekly: 'Wochenaktivität',
      last7Days: 'Letzte 7 Tage',
      performance: 'Leistung',
      days: 'Tage',
      times: 'mal',
      noData: 'Keine Daten.'
    },
    calendar: {
      detailHint: 'Tippen für Details.',
      noData: 'Keine Daten.',
      noActivity: 'Keine Einträge an diesem Datum.',
      completed: 'Erledigt',
      monthYearFormat: { month: 'long', year: 'numeric' }
    },
    form: {
      newHabit: 'Neue Kette',
      nameLabel: 'Name',
      namePlaceholder: 'z.B. 2L Wasser trinken',
      typeLabel: 'Zieltyp',
      colorLabel: 'Farbe',
      descLabel: 'Beschreibung (Optional)',
      descPlaceholder: 'Warum möchtest du das?',
      submit: 'Kette starten'
    },
    settings: {
      appearance: 'Aussehen',
      language: 'Sprache',
      theme: 'Thema',
      darkMode: 'Dunkelmodus',
      lightMode: 'Heller Modus',
      about: 'Über',
      version: 'Version 1.2.1'
    }
  },
  es: {
    tabs: { daily: 'Hoy', calendar: 'Calendario', stats: 'Análisis', settings: 'Ajustes' },
    titles: { daily: 'Hoy', calendar: 'Calendario', stats: 'Análisis', settings: 'Ajustes' },
    subtitles: { daily: 'Resumen Diario', calendar: 'Vista Mensual', stats: 'Resumen de Estado', settings: 'Preferencias' },
    habitTypes: { [HabitType.BUILD]: 'Crear', [HabitType.QUIT]: 'Dejar' },
    emptyList: { title: 'No hay hábitos.', subtitle: 'Empieza algo nuevo.' },
    streak: 'días racha',
    notStarted: 'No empezado',
    confirmDelete: 'se eliminará. ¿Seguro?',
    stats: {
      streak: 'Racha Actual',
      total: 'Éxito Total',
      rate: 'Tasa de Éxito',
      bestDay: 'Mejor Día',
      weekly: 'Actividad Semanal',
      last7Days: 'Últimos 7 Días',
      performance: 'Rendimiento',
      days: 'Días',
      times: 'veces',
      noData: 'Sin datos.'
    },
    calendar: {
      detailHint: 'Toca un día para detalles.',
      noData: 'Sin datos.',
      noActivity: 'Nada completado hoy.',
      completed: 'Completado',
      monthYearFormat: { month: 'long', year: 'numeric' }
    },
    form: {
      newHabit: 'Nueva Cadena',
      nameLabel: 'Nombre',
      namePlaceholder: 'ej. Beber 2L Agua',
      typeLabel: 'Tipo',
      colorLabel: 'Color',
      descLabel: 'Descripción (Opcional)',
      descPlaceholder: '¿Por qué quieres esto?',
      submit: 'Iniciar Cadena'
    },
    settings: {
      appearance: 'Apariencia',
      language: 'Idioma',
      theme: 'Tema',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
      about: 'Acerca de',
      version: 'Versión 1.2.1'
    }
  },
  ar: {
    tabs: { daily: 'اليوم', calendar: 'التقويم', stats: 'تحليل', settings: 'إعدادات' },
    titles: { daily: 'اليوم', calendar: 'التقويم', stats: 'تحليل', settings: 'الإعدادات' },
    subtitles: { daily: 'ملخص اليوم', calendar: 'عرض شهري', stats: 'ملخص الحالة', settings: 'التفضيلات' },
    habitTypes: { [HabitType.BUILD]: 'اكتساب', [HabitType.QUIT]: 'إقلاع' },
    emptyList: { title: 'لا توجد عادات.', subtitle: 'ابدأ شيئاً جديداً.' },
    streak: 'أيام متتالية',
    notStarted: 'لم يبدأ بعد',
    confirmDelete: 'سيتم حذفه. هل أنت متأكد؟',
    stats: {
      streak: 'السلسلة الحالية',
      total: 'إجمالي النجاح',
      rate: 'معدل الإكمال',
      bestDay: 'أفضل يوم',
      weekly: 'النشاط الأسبوعي',
      last7Days: 'آخر 7 أيام',
      performance: 'أداء العادة',
      days: 'أيام',
      times: 'مرات',
      noData: 'لا توجد بيانات.'
    },
    calendar: {
      detailHint: 'اضغط على يوم للتفاصيل.',
      noData: 'لا توجد بيانات.',
      noActivity: 'لم تكتمل أي عادات في هذا التاريخ.',
      completed: 'مكتمل',
      monthYearFormat: { month: 'long', year: 'numeric' }
    },
    form: {
      newHabit: 'سلسلة جديدة',
      nameLabel: 'اسم العادة',
      namePlaceholder: 'مثال: شرب 2 لتر ماء',
      typeLabel: 'نوع الهدف',
      colorLabel: 'لون',
      descLabel: 'وصف (اختياري)',
      descPlaceholder: 'لماذا تريد هذا؟',
      submit: 'ابدأ السلسلة'
    },
    settings: {
      appearance: 'المظهر',
      language: 'اللغة',
      theme: 'السمة',
      darkMode: 'الوضع الداكن',
      lightMode: 'الوضع الفاتح',
      about: 'حول',
      version: 'الإصدار 1.2.1'
    }
  }
};