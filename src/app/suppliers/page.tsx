'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SupplierCard } from '@/components/supplier/supplier-card';
import { mockSuppliers, mockCategories } from '@/data/mock';
import { Search, Filter, MapPin, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function SuppliersPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Filter suppliers
  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || supplier.country === selectedCountry;
    const matchesType = selectedType === 'all' || supplier.businessType === selectedType;
    return matchesSearch && matchesCountry && matchesType;
  });

  // Get unique countries
  const countries = [...new Set(mockSuppliers.map(s => s.country))];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-700">{t.nav.home}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{t.nav.suppliers}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.suppliers.supplierDirectory}</h1>
        <p className="text-gray-500">
          {t.suppliers.browseSuppliers.replace('{count}', String(filteredSuppliers.length))}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t.suppliers.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Country Filter */}
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[180px]">
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder={t.suppliers.country} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.suppliers.allCountries}</SelectItem>
            {countries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Business Type Filter */}
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder={t.suppliers.type} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.suppliers.allTypes}</SelectItem>
            <SelectItem value="manufacturer">{t.suppliers.manufacturer}</SelectItem>
            <SelectItem value="trading">{t.suppliers.tradingCompany}</SelectItem>
            <SelectItem value="wholesaler">{t.suppliers.wholesaler}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">{t.suppliers.noSuppliers}</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setSelectedCountry('all');
            setSelectedType('all');
          }}>
            {t.products.clearFilters}
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map(supplier => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      )}

      {/* CTA */}
      <Card className="mt-12 bg-blue-700 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t.suppliers.becomeSupplier}</h2>
          <p className="mb-6 text-blue-100">
            {t.suppliers.becomeSupplierDesc}
          </p>
          <Link href="/supplier-join">
            <Button variant="secondary" size="lg" className="gap-2">
              {t.suppliers.applyNow}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
