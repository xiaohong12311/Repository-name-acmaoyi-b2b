'use client';

import { useLanguage } from '@/hooks/use-language';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const textColor = isHome ? 'text-white/90' : 'text-blue-900';
  const iconColor = isHome ? 'text-white/80' : 'text-blue-900';

  return (
    <div className="flex items-center gap-1">
      <Globe className={cn('h-4 w-4', iconColor)} />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'fr' | 'sw')}
        className={cn('bg-transparent border-none text-sm cursor-pointer focus:outline-none', textColor)}
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
