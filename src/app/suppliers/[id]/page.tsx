'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product/product-card';
import { getSupplierById, getProductsBySupplier } from '@/data/mock';
import { 
  MapPin, Factory, Users, Calendar, Award, Globe, Phone, Mail,
  CheckCircle, Package, Shield, Truck, Clock, ChevronRight
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
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t.supplierDetail.notFound}</h1>
        <p className="text-gray-500 mb-8">{t.supplierDetail.notFoundDesc}</p>
        <Link href="/suppliers">
          <Button>{t.supplierDetail.browseAll}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-700">{t.nav.home}</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/suppliers" className="hover:text-blue-700">{t.nav.agent}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{supplier.name}</span>
      </div>

      {/* Header */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Supplier Image */}
        <div className="lg:col-span-1">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={supplier.logo}
              alt={supplier.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>

        {/* Supplier Info */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            {supplier.verified && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                {t.supplierDetail.verified}
              </Badge>
            )}
            <Badge variant="outline">{supplier.businessType}</Badge>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">{supplier.name}</h1>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-50">
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 text-blue-700 mx-auto mb-2" />
                <div className="font-semibold tabular-nums">{supplier.employees}</div>
                <div className="text-xs text-gray-500">{t.supplierDetail.employees}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-4 text-center">
                <Calendar className="h-5 w-5 text-blue-700 mx-auto mb-2" />
                <div className="font-semibold tabular-nums">{supplier.yearsInBusiness}</div>
                <div className="text-xs text-gray-500">{t.supplierDetail.years}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-4 text-center">
                <Package className="h-5 w-5 text-blue-700 mx-auto mb-2" />
                <div className="font-semibold tabular-nums">{supplier.productCount}</div>
                <div className="text-xs text-gray-500">{t.supplierDetail.products}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-4 text-center">
                <Award className="h-5 w-5 text-blue-700 mx-auto mb-2" />
                <div className="font-semibold tabular-nums">{supplier.certifications.length}</div>
                <div className="text-xs text-gray-500">{t.supplierDetail.certifications}</div>
              </CardContent>
            </Card>
          </div>

          {/* Location & Contact */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{supplier.location}</span>
            </div>
            {supplier.website && (
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4" />
                <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                  {supplier.website}
                </a>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{supplier.description}</p>

          {/* Actions */}
          <div className="flex gap-3">
            <Link href="/inquiry">
              <Button size="lg" className="gap-2 bg-blue-700 hover:bg-blue-800">
                {t.supplierDetail.sendInquiry}
              </Button>
            </Link>
            <Link href="/catalog">
              <Button variant="outline" size="lg" className="gap-2">
                {t.supplierDetail.downloadCatalog}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="products" className="mb-12">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="products">{t.supplierDetail.products}</TabsTrigger>
          <TabsTrigger value="factory">{t.nav.factory}</TabsTrigger>
          <TabsTrigger value="certifications">{t.supplierDetail.certifications}</TabsTrigger>
          <TabsTrigger value="contact">{t.supplierDetail.contact}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supplierProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {supplierProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {t.supplierDetail.noProducts}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="factory">
          <Card>
            <CardContent className="p-6">
              {/* Factory Images */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {supplier.images.map((img, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`${supplier.name} factory ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
              
              {/* Factory Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">{t.supplierDetail.productionCapabilities}</h3>
                  {[t.supplierDetail.modernLines, t.supplierDetail.qualityControl, t.supplierDetail.skilledWorkforce, t.supplierDetail.flexibleScheduling].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">{t.supplierDetail.qualityAssurance}</h3>
                  {[t.supplierDetail.preInspection, t.supplierDetail.inProcessChecks, t.supplierDetail.finalTesting, t.supplierDetail.docCompliance].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-700" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="certifications">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplier.certifications.map(cert => (
                  <Card key={cert} className="bg-gray-50">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Award className="h-8 w-8 text-blue-700" />
                      <div>
                        <div className="font-medium">{cert}</div>
                        <div className="text-xs text-gray-500">{t.supplierDetail.verifiedCertification}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">{t.supplierDetail.certVerification}</h4>
                <p className="text-sm text-gray-600">
                  {t.supplierDetail.certVerificationDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">{t.supplierDetail.contactInfo}</h3>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-700" />
                    <div>
                      <div className="font-medium">{t.supplierDetail.address}</div>
                      <div className="text-gray-600">{supplier.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-700" />
                    <div>
                      <div className="font-medium">{t.supplierDetail.website}</div>
                      <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                        {supplier.website}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">{t.supplierDetail.businessHours}</h3>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-700" />
                    <div>
                      <div className="font-medium">{t.supplierDetail.workingHours}</div>
                      <div className="text-gray-600">{t.supplierDetail.workingHoursTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-700" />
                    <div>
                      <div className="font-medium">{t.supplierDetail.responseTime}</div>
                      <div className="text-gray-600">{t.supplierDetail.within24h}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-gray-600 mb-4">
                  {t.supplierDetail.inquiryPrompt}
                </p>
                <Link href="/inquiry">
                  <Button className="gap-2 bg-blue-700 hover:bg-blue-800">
                    {t.supplierDetail.sendInquiryNow}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
