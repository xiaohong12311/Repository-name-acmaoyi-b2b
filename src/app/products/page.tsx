'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/product/product-card';
import { mockCategories } from '@/data/mock';
import { useProducts } from '@/hooks/use-products';
import { Search, Filter, Grid3x3 as Grid, List, ChevronRight, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function ProductsPage() {
  const { t } = useLanguage();
  const { products: dbProducts, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);

  // Filter products
  const filteredProducts = dbProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return (a.tierPrices[a.tierPrices.length - 1]?.price || 0) - 
             (b.tierPrices[b.tierPrices.length - 1]?.price || 0);
    }
    if (sortBy === 'price-high') {
      return (b.tierPrices[b.tierPrices.length - 1]?.price || 0) - 
             (a.tierPrices[a.tierPrices.length - 1]?.price || 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{t.products.productCatalog}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.products.title}</h1>
          <p className="text-muted-foreground">{t.products.subtitle}</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Category Filter */}
                <Card className="bg-card shadow-card border-0">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-4">{t.products.category}</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === 'all' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {t.products.allCategories}
                      </button>
                      {mockCategories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Verified Only */}
                <Card className="bg-card shadow-card border-0">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-4">Verified Only</h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-10 h-5 bg-muted rounded-full peer-checked:bg-primary transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
                      </div>
                      <span className="text-sm text-muted-foreground">Verified agents only</span>
                    </label>
                  </CardContent>
                </Card>

                {/* Reset */}
                <Button variant="outline" className="w-full" onClick={() => setSelectedCategory('all')}>
                  {t.products.clearFilters}
                </Button>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading products...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive mb-4">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            ) : (
            <>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Showing {sortedProducts.length} of {dbProducts.length} products
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-9 text-sm">
                    <SelectValue placeholder={t.products.sortBy} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">{t.products.default}</SelectItem>
                    <SelectItem value="price-low">{t.products.priceLowHigh}</SelectItem>
                    <SelectItem value="price-high">{t.products.priceHighLow}</SelectItem>
                  </SelectContent>
                </Select>
                <div className="hidden sm:flex gap-1">
                  <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" className="h-9 w-9" onClick={() => setViewMode('grid')}>
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" className="h-9 w-9" onClick={() => setViewMode('list')}>
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.products.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl bg-card border-0 shadow-card"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Results */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">{t.products.noProducts}</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                  {t.products.clearFilters}
                </Button>
              </div>
            ) : (
              <div className={`grid gap-5 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
