'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockSuppliers } from '@/data/mock';
import { Factory, Award, Users, Globe, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function FactoryPage() {
  const { t } = useLanguage();
  // Get featured suppliers for factory showcase
  const featuredSuppliers = mockSuppliers.filter(s => s.verified).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 mb-12">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
            {t.factory.badge}
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-4">
            {t.factory.heroTitle}
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            {t.factory.heroDesc}
          </p>
          <Link href="/suppliers">
            <Button size="lg" className="gap-2">
              <Globe className="h-4 w-4" />
              {t.factory.browseSuppliers}
            </Button>
          </Link>
        </div>
      </div>

      {/* Why Choose Verified Suppliers */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">{t.factory.whyChooseTitle}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <Shield className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t.factory.qualityGuaranteed}</h3>
              <p className="text-sm text-gray-500">
                {t.factory.qualityControlDesc}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-blue-700 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t.factory.certifiedFacilities}</h3>
              <p className="text-sm text-gray-500">
                {t.factory.certifiedDesc}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <Factory className="h-10 w-10 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t.factory.directAccess}</h3>
              <p className="text-sm text-gray-500">
                {t.factory.directAccessDesc}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <Users className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t.factory.experiencedTeams}</h3>
              <p className="text-sm text-gray-500">
                {t.factory.experiencedTeamsDesc}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Factories */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">{t.factory.featuredTitle}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredSuppliers.map(supplier => (
            <Link key={supplier.id} href={`/suppliers/${supplier.id}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all">
                {/* Factory Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={supplier.images[0]}
                    alt={supplier.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {supplier.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {t.factory.verified}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {supplier.businessType}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white">{supplier.name}</h3>
                    <p className="text-gray-300">{supplier.location}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">{supplier.description}</p>
                  
                  {/* Factory Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700 tabular-nums">
                        {supplier.employees}
                      </div>
                      <div className="text-xs text-gray-500">{t.factory.employees}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700 tabular-nums">
                        {supplier.yearsInBusiness}
                      </div>
                      <div className="text-xs text-gray-500">{t.factory.years}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700 tabular-nums">
                        {supplier.productCount}
                      </div>
                      <div className="text-xs text-gray-500">{t.factory.products}</div>
                    </div>
                  </div>
                  
                  {/* Certifications */}
                  <div className="flex gap-2">
                    {supplier.certifications.slice(0, 4).map(cert => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Factory Features */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">{t.factory.capabilitiesTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">{t.factory.productionCapacity}</h3>
              <div className="space-y-3">
                {t.factory.productionItems.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">{t.factory.qualityAssurance}</h3>
              <div className="space-y-3">
                {t.factory.qualityItems.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">{t.factory.supportServices}</h3>
              <div className="space-y-3">
                {t.factory.supportItems.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-blue-700 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t.factory.ctaTitle}</h2>
          <p className="mb-6 text-blue-100">
            {t.factory.ctaDesc}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/suppliers">
              <Button variant="secondary" size="lg" className="gap-2">
                <Globe className="h-4 w-4" />
                {t.factory.browseSuppliers}
              </Button>
            </Link>
            <Link href="/supplier-join">
              <Button variant="outline" size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2">
                <Factory className="h-4 w-4" />
                {t.factory.becomeSupplier}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
