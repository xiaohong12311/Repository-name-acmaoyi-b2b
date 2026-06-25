'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockSuppliers } from '@/data/mock';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Download, Search, FileDown, Eye, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function CatalogPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (supplierId: string) => {
    setSelectedDialog(supplierId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4">
          <FileDown className="h-3 w-3 mr-1" />
          {t.catalog.badge}
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t.catalog.heroTitle}
        </h1>
        <p className="text-gray-500 text-lg">
          {t.catalog.heroDesc}
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t.catalog.heroTitle + '...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Supplier Catalogs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredSuppliers.map(supplier => (
          <Card key={supplier.id} className="group overflow-hidden hover:shadow-lg transition-all">
            {/* Supplier Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <Image
                src={supplier.logo}
                alt={supplier.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {supplier.verified && (
                <Badge variant="secondary" className="absolute top-2 right-2 bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {t.catalog.newBadge}
                </Badge>
              )}
            </div>

            <CardContent className="p-6">
              {/* Supplier Name */}
              <Link href={`/suppliers/${supplier.id}`}>
                <h3 className="font-semibold text-gray-900 hover:text-blue-700 mb-2">
                  {supplier.name}
                </h3>
              </Link>
              
              {/* Info */}
              <p className="text-sm text-gray-500 mb-1">{supplier.location}</p>
              <p className="text-sm text-gray-500 mb-4">{supplier.productCount} {t.catalog.pages}</p>

              {/* Catalog Info */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <FileDown className="h-4 w-4" />
                <span>{t.catalog.downloadPdf}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  asChild
                >
                  <Link href={`/suppliers/${supplier.id}`}>
                    <Eye className="h-3 w-3" />
                    {t.nav.products}
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 gap-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleDownload(supplier.id)}
                >
                  <Download className="h-3 w-3" />
                  {t.catalog.downloadPdf}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Download Dialog */}
      <Dialog open={selectedDialog !== null} onOpenChange={() => setSelectedDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.catalog.downloadPdf}</DialogTitle>
            <DialogDescription>
              {t.catalog.heroDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              {t.catalog.requestDesc}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDialog(null)}>
              {t.common.cancel || 'Close'}
            </Button>
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4" />
              {t.catalog.downloadPdf}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* All Catalogs */}
      <Card className="bg-gray-50">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">{t.catalog.downloadAll}</h2>
          <p className="text-gray-500 mb-6">
            {t.catalog.heroDesc}
          </p>
          <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4" />
            {t.catalog.downloadAll}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
