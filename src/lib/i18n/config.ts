export type Language = 'en' | 'fr' | 'sw';

export const languages: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'French', flag: '🇫🇷' },
  sw: { name: 'Swahili', flag: '🇰🇪' },
};

export const defaultLanguage: Language = 'en';