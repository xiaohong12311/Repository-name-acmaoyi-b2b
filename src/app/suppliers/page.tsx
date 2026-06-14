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

export default function SuppliersPage() {
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
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">Suppliers</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Directory</h1>
        <p className="text-gray-500">
          Browse {filteredSuppliers.length} verified suppliers and manufacturers
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Country Filter */}
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[180px]">
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Business Type Filter */}
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="manufacturer">Manufacturer</SelectItem>
            <SelectItem value="trading">Trading Company</SelectItem>
            <SelectItem value="wholesaler">Wholesaler</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No suppliers found matching your criteria.</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setSelectedCountry('all');
            setSelectedType('all');
          }}>
            Clear Filters
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
          <h2 className="text-2xl font-bold mb-4">Become a Supplier</h2>
          <p className="mb-6 text-blue-100">
            Join our platform and connect with thousands of wholesale buyers worldwide.
          </p>
          <Link href="/supplier-join">
            <Button variant="secondary" size="lg" className="gap-2">
              Apply Now
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}