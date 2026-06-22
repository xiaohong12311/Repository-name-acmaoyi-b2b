'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { LanguageProvider } from '@/hooks/use-language';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700">
        {/* Hero Section with Search */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              ACMAOYI
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Quality Wholesale Solutions
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products, suppliers, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-6 pr-14 text-lg rounded-full border-2 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20 transition-all"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 border-0"
              >
                <Search className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => router.push('/products')}
            >
              Browse Products
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => router.push('/suppliers')}
            >
              Find Agents
            </Button>
          </div>
        </section>
      </div>
    </LanguageProvider>
  );
}