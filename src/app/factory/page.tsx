'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockSuppliers } from '@/data/mock';
import { Factory, Award, Users, Globe, Shield, CheckCircle } from 'lucide-react';

export default function FactoryPage() {
  // Get featured suppliers for factory showcase
  const featuredSuppliers = mockSuppliers.filter(s => s.verified).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 mb-12">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
            Factory Showcase
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-4">
            Explore Verified Manufacturers
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Discover certified factories and manufacturers with quality assurance. 
            Our verified suppliers undergo rigorous quality checks and certification verification.
          </p>
          <Link href="/suppliers">
            <Button size="lg" className="gap-2">
              <Globe className="h-4 w-4" />
              Browse All Suppliers
            </Button>
          </Link>
        </div>
      </div>

      {/* Why Choose Verified Suppliers */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">Why Choose Verified Suppliers?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <Shield className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-gray-500">
                Rigorous quality control and product inspection
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-blue-700 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Certified Facilities</h3>
              <p className="text-sm text-gray-500">
                ISO, CE, FDA and other certifications verified
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <Factory className="h-10 w-10 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Direct Factory Access</h3>
              <p className="text-sm text-gray-500">
                Source directly from manufacturers
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <Users className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Experienced Teams</h3>
              <p className="text-sm text-gray-500">
                Professional production and quality teams
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Factories */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">Featured Factories</h2>
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
                          Verified
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
                      <div className="text-xs text-gray-500">Employees</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700 tabular-nums">
                        {supplier.yearsInBusiness}
                      </div>
                      <div className="text-xs text-gray-500">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700 tabular-nums">
                        {supplier.productCount}
                      </div>
                      <div className="text-xs text-gray-500">Products</div>
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
        <h2 className="text-xl font-bold mb-6">Factory Capabilities</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Production Capacity</h3>
              <div className="space-y-3">
                {['Large-scale production capability', 'Modern machinery and equipment', 'Flexible production scheduling', 'Quality control checkpoints'].map((item, i) => (
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
              <h3 className="font-semibold mb-4">Quality Assurance</h3>
              <div className="space-y-3">
                {['ISO 9001 quality management', 'Product testing protocols', 'Defect detection systems', 'Compliance documentation'].map((item, i) => (
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
              <h3 className="font-semibold mb-4">Support Services</h3>
              <div className="space-y-3">
                {['OEM/ODM services available', 'Custom packaging solutions', 'Technical documentation', 'After-sales support'].map((item, i) => (
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
          <h2 className="text-2xl font-bold mb-4">Ready to Source Directly from Factories?</h2>
          <p className="mb-6 text-blue-100">
            Join our platform to connect with verified manufacturers and get the best wholesale prices.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/suppliers">
              <Button variant="secondary" size="lg" className="gap-2">
                <Globe className="h-4 w-4" />
                Browse Suppliers
              </Button>
            </Link>
            <Link href="/supplier-join">
              <Button variant="outline" size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2">
                <Factory className="h-4 w-4" />
                Become a Supplier
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}