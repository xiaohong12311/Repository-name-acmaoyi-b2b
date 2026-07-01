'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useB2BStore } from '@/hooks/use-b2b-store';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, ShoppingCart, Heart, MessageSquarePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCompanyInfo } from '@/config/brand-config';
import { LanguageSelector } from '@/components/layout/language-selector';
import { useLanguage } from '@/hooks/use-language';
import { usePathname } from 'next/navigation';

export function Header() {
  const { favorites, sampleCart, inquiryItems } = useB2BStore();
  const companyInfo = getCompanyInfo();
  const { t } = useLanguage();
  const pathname = usePathname();

  const isHome = pathname === '/';

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/suppliers', label: t.nav.suppliers },
    { href: '/factory', label: t.nav.factory },
    { href: '/supplier-join', label: t.nav.joinSupplier },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Home page: white text on dark hero; Other pages: deep blue on light background
  const textColor = isHome ? 'text-white' : 'text-blue-900';
  const hoverBg = isHome ? 'hover:bg-white/10' : 'hover:bg-blue-900/10';
  const activeBg = isHome ? 'bg-white/10' : 'bg-blue-900/10';
  const hoverText = isHome ? 'hover:text-white/90' : 'hover:text-blue-800';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.jpg"
            alt={companyInfo.name}
            width={88}
            height={88}
            className="h-11 w-11 rounded-lg object-cover"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-bold px-3 py-2 rounded-lg transition-colors',
                isActive(link.href)
                  ? cn(textColor, 'font-bold', activeBg)
                  : cn(textColor, 'font-bold', hoverText, hoverBg)
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Favorites */}
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className={cn('relative h-9 w-9', hoverBg)}>
              <Heart className={cn('h-[18px] w-[18px]', textColor)} />
              {favorites.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                  {favorites.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Sample Cart */}
          <Link href="/sample-cart">
            <Button variant="ghost" size="icon" className={cn('relative h-9 w-9', hoverBg)}>
              <ShoppingCart className={cn('h-[18px] w-[18px]', textColor)} />
              {sampleCart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-success text-success-foreground">
                  {sampleCart.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Inquiry */}
          <Link href="/inquiry">
            <Button variant="ghost" size="icon" className={cn('relative h-9 w-9', hoverBg)}>
              <MessageSquarePlus className={cn('h-[18px] w-[18px]', textColor)} />
              {inquiryItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-warning text-white">
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
              <Button variant="ghost" size="icon" className={cn('h-9 w-9', hoverBg)}>
                <Menu className={cn('h-5 w-5', textColor)} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-1 mt-6">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium px-3 py-2.5 rounded-lg transition-colors',
                      isActive(link.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
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
