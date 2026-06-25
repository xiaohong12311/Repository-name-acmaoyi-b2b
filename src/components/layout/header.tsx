'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useB2BStore } from '@/hooks/use-b2b-store';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, ShoppingCart, Heart, MessageSquarePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCompanyInfo } from '@/config/brand-config';
import { LanguageSelector } from '@/components/layout/language-selector';
import { useLanguage } from '@/hooks/use-language';

export function Header() {
  const { favorites, sampleCart, inquiryItems } = useB2BStore();
  const companyInfo = getCompanyInfo();
  const { t } = useLanguage();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/suppliers', label: t.nav.suppliers },
    { href: '/factory', label: t.nav.factory },
    { href: '/supplier-join', label: t.nav.joinSupplier },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-white font-bold text-lg">
            A
          </div>
          <span className="hidden sm:inline-block font-bold text-lg text-gray-900">
            {companyInfo.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-bold text-gray-900 hover:text-blue-700 transition-colors'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Favorites */}
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5 text-gray-900" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-700 text-white">
                  {favorites.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Sample Cart */}
          <Link href="/sample-cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-900" />
              {sampleCart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-600 text-white">
                  {sampleCart.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Inquiry */}
          <Link href="/inquiry">
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquarePlus className="h-5 w-5 text-gray-900" />
              {inquiryItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-amber-500 text-white">
                  {inquiryItems.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 text-gray-900" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-300px p-4">
              <SheetTitle className="text-left">Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-bold text-gray-900 hover:text-blue-700 transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}

              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}