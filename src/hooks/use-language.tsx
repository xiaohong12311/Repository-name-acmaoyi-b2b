'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, LanguageCode, Translation } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: any; // eslint-disable-line @typescript-eslint/no-explicit-any -- large translation object exceeds TS inference depth
  languages: { code: LanguageCode; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const availableLanguages: { code: LanguageCode; name: string; nativeName: string }[] = [
  { code: 'en' as LanguageCode, name: 'English', nativeName: 'English' },
  { code: 'fr' as LanguageCode, name: 'French', nativeName: 'Français' },
  { code: 'sw' as LanguageCode, name: 'Swahili', nativeName: 'Kiswahili' },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('language') as LanguageCode;
    if (savedLang && availableLanguages.some(l => l.code === savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for getting nested translations with fallback
export function useTranslation() {
  const { t } = useLanguage();
  
  // Helper function to get nested translation
  const getTranslation = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = t;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return { t, getTranslation };
}