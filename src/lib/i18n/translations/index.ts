import { en } from './en';
import { fr } from './fr';
import { sw } from './sw';

export const translations = {
  en,
  fr,
  sw,
};

export type TranslationKey = keyof typeof en;
export type LanguageCode = 'en' | 'fr' | 'sw';
export type Translation = typeof en;