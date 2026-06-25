import { en } from './en';
import { fr } from './fr';
import { sw } from './sw';

export type TranslationKey = keyof typeof en;
export type LanguageCode = 'en' | 'fr' | 'sw';
export type Translation = typeof en;

export const translations: Record<LanguageCode, Translation> = {
  en,
  fr: fr as Translation,
  sw: sw as Translation,
};