'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product/product-card';
import { getSupplierById, getProductsBySupplier } from '@/data/mock';
import { 
  MapPin, Factory, Users, Calendar, Award, Globe, Phone, Mail,
  CheckCircle, Package, Shield, Truck, Clock, ChevronRight, Heart, Share2
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function SupplierDetailPage() {
  const params = useParams();
  const supplierId = params.id as string;
  const { t } = useLanguage();
  
  const supplier = getSupplierById(supplierId);
  const supplierProducts = supplier ? getProductsBySupplier(supplierId) : [];

  if (!supplier) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Factory className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t.supplierDetail.notFound}</h1>
          <p className="text-muted-foreground mb-6">{t.supplierDetail.notFoundDesc}</p>
          <Link href="/suppliers">
            <Button>{t.supplierDetail.browseAll}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/suppliers" className="hover:text-primary transition-colors">{t.nav.agent}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{supplier.name}</span>
        </div>

        {/* Header */}
        <div className="bg-card rounded-2xl shadow-card border-0 p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{supplier.name}</h1>
                {supplier.verified && (
                  <Badge className="bg-emerald-50 text-emerald-700 border-0 gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {t.supplierDetail.verified}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{supplier.location}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-xl">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="gap-1"><Calendar className="h-3 w-3" /> {supplier.yearsInBusiness} {t.supplierDetail.years}</Badge>
            <Badge variant="secondary" className="gap-1"><Users className="h-3 w-3" /> {supplier.employees} {t.supplierDetail.employees}</Badge>
            <Badge variant="secondary" className="gap-1"><Factory className="h-3 w-3" /> {supplier.businessType}</Badge>
            <Badge variant="secondary" className="gap-1"><Package className="h-3 w-3" /> {supplier.productCount} {t.supplierDetail.products}</Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{supplier.description}</p>
        </div>

        {/* Certifications */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">{t.supplierDetail.certifications}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {supplier.certifications.map(cert => (
              <Card key={cert} className="bg-card shadow-card border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{cert}</div>
                    <div className="text-xs text-muted-foreground">{t.supplierDetail.verifiedCertification}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Factory Images */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">{t.nav.factory}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {supplier.images.map((img, index) => (
              <div key={index} className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                <Image src={img} alt={`${supplier.name} factory ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>

        {/* Production Capabilities */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">{t.supplierDetail.productionCapabilities}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Factory, value: '200+', label: t.supplierDetail.modernLines },
              { icon: Users, value: supplier.employees, label: t.supplierDetail.skilledWorkforce },
              { icon: Clock, value: '7 days', label: t.supplierDetail.flexibleScheduling },
              { icon: Shield, value: '99.5%', label: t.supplierDetail.qualityAssurance },
            ].map((item, i) => (
              <Card key={i} className="bg-card shadow-card border-0 text-center">
                <CardContent className="p-5">
                  <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground tabular-nums">{item.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">{t.supplierDetail.qualityAssurance}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: CheckCircle, title: t.supplierDetail.preInspection, desc: 'Raw material and component inspection before production begins' },
              { icon: Shield, title: t.supplierDetail.inProcessChecks, desc: 'Continuous monitoring and testing during manufacturing' },
              { icon: Award, title: t.supplierDetail.finalTesting, desc: 'Complete product testing and certification before shipment' },
            ].map((item, i) => (
              <Card key={i} className="bg-card shadow-card border-0">
                <CardContent className="p-5">
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">{t.supplierDetail.products}</h2>
          {supplierProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {supplierProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="bg-card shadow-card border-0">
              <CardContent className="p-8 text-center text-muted-foreground">
                {t.supplierDetail.noProducts}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact */}
        <Card className="bg-primary text-primary-foreground border-0 shadow-float">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div>
                <h2 className="text-xl font-bold mb-2">{t.supplierDetail.contact}</h2>
                <div className="space-y-2 text-primary-foreground/80 text-sm">
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {t.supplierDetail.businessHours}</div>
                  <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> {t.supplierDetail.responseTime}: {t.supplierDetail.within24h}</div>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3">
                <Link href="/catalog">
                  <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0">
                    {t.supplierDetail.downloadCatalog}
                  </Button>
                </Link>
                <Link href="/inquiry">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2">
                    {t.supplierDetail.sendInquiryNow}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
