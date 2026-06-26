import { en } from './en';
import { fr } from './fr';
import { sw } from './sw';

// Explicitly define the Translation type to avoid deep inference issues
// with large object literals that cause TypeScript to infer 'unknown'
export type LanguageCode = 'en' | 'fr' | 'sw';

// Use a more robust type approach: define the shape from en but with explicit typing
// to prevent TS from inferring 'unknown' on nested properties
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Cast en to get its type without inference depth issues
const _enTyped = en as DeepReadonly<typeof en>;
export type Translation = typeof _enTyped;
export type TranslationKey = keyof Translation;

export const translations: Record<LanguageCode, Translation> = {
  en: en as Translation,
  fr: fr as Translation,
  sw: sw as Translation,
};
