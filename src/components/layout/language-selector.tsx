'use client';

import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'fr' | 'sw')}
        className="bg-transparent border-none text-sm text-gray-600 cursor-pointer focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}

export function LanguageSelectorExpanded() {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-gray-500" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLanguage(lang.code)}
            className="text-xs"
          >
            {lang.nativeName}
          </Button>
        ))}
      </div>
    </div>
  );
}