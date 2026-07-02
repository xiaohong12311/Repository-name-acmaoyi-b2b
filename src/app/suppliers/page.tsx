'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCategories } from '@/data/mock';
import { useSuppliers } from '@/hooks/use-suppliers';
import { Search, MapPin, ChevronRight, ShieldCheck, Clock, Users, Building2, X, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function SuppliersPage() {
  const { t } = useLanguage();
  const { suppliers: dbSuppliers, loading, error } = useSuppliers();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredSuppliers = dbSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || supplier.country === selectedCountry;
    const matchesType = selectedType === 'all' || supplier.businessType === selectedType;
    const matchesVerified = !verifiedOnly || supplier.verified;
    return matchesSearch && matchesCountry && matchesType && matchesVerified;
  });

  const countries = [...new Set(dbSuppliers.map(s => s.country))];
  const hasFilters = searchQuery || selectedCountry !== 'all' || selectedType !== 'all' || verifiedOnly;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{t.nav.agent}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.suppliers.title}</h1>
          <p className="text-muted-foreground">{t.suppliers.subtitle}</p>
        </div>

        {/* Filters */}
        <Card className="bg-card shadow-card border-0 mb-8">
          <CardContent className="p-5">
            <div className="flex flex-wrap items-center gap-4">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[160px] h-10 text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder={t.suppliers.country} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[160px] h-10 text-sm">
                  <SelectValue placeholder={t.suppliers.type} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.suppliers.allTypes}</SelectItem>
                  <SelectItem value="manufacturer">{t.suppliers.manufacturer}</SelectItem>
                  <SelectItem value="trading">{t.suppliers.tradingCompany}</SelectItem>
                  <SelectItem value="wholesaler">{t.suppliers.wholesaler}</SelectItem>
                </SelectContent>
              </Select>

              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" checked={verifiedOnly} onChange={() => setVerifiedOnly(!verifiedOnly)} />
                  <div className="w-10 h-5 bg-muted rounded-full peer-checked:bg-primary transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
                </div>
                <span className="text-sm text-muted-foreground">Verified Only</span>
              </label>

              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(''); setSelectedCountry('all'); setSelectedType('all'); setVerifiedOnly(false); }} className="gap-1 text-primary">
                  <X className="h-3 w-3" /> {t.products.clearFilters}
                </Button>
              )}

              <span className="ml-auto text-sm text-muted-foreground">
                {filteredSuppliers.length} agents found
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading agents...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">{t.suppliers.noSuppliers}</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCountry('all'); setSelectedType('all'); setVerifiedOnly(false); }}>
              {t.products.clearFilters}
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSuppliers.map(supplier => (
              <Card key={supplier.id} className="bg-card shadow-card border-0 hover:shadow-float transition-shadow duration-300 group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted">
                        <Image src={supplier.logo} alt={supplier.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{supplier.name}</h3>
                        <Badge variant="secondary" className="text-xs mt-1">{supplier.country}</Badge>
                      </div>
                    </div>
                    {supplier.verified && (
                      <Badge className="bg-emerald-50 text-emerald-700 border-0 gap-1 shrink-0">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {supplier.categories.slice(0, 3).map(cat => (
                      <Badge key={cat} variant="secondary" className="text-xs bg-muted/60 text-muted-foreground">{cat}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {supplier.yearsInBusiness} Years</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {supplier.employees} Employees</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {supplier.certifications.slice(0, 3).map(cert => (
                      <span key={cert} className="text-xs px-2 py-0.5 rounded bg-primary/5 text-primary/70">{cert}</span>
                    ))}
                  </div>

                  <Link href={`/suppliers/${supplier.id}`} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 gap-1">
                      {t.suppliers.viewProfile}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA */}
        <Card className="mt-12 bg-primary text-primary-foreground border-0 shadow-float">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">{t.suppliers.becomeSupplier}</h2>
            <p className="mb-6 text-primary-foreground/80 max-w-xl mx-auto">{t.suppliers.becomeSupplierDesc}</p>
            <Link href="/supplier-join">
              <Button variant="secondary" size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                {t.suppliers.applyNow}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
