'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getCompanyInfo } from '@/config/brand-config';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const companyInfo = getCompanyInfo();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12 md:py-20 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1581091226826-a8a4d5d88f16?w=1200"
            alt="Factory background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-0 mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 text-sm">
              Professional B2B Wholesale Platform
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {companyInfo.name} - Quality Wholesale Solutions
              <br />
              <span className="text-blue-200">Connecting Global Buyers & Suppliers</span>
            </h1>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-6 md:mt-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products, suppliers, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 md:h-14 pl-12 pr-4 rounded-full text-gray-900 bg-white/95 backdrop-blur border-0 focus:ring-2 focus:ring-blue-300 text-base"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
