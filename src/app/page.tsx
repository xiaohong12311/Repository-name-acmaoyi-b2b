'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product/product-card';
import { SupplierCard } from '@/components/supplier/supplier-card';
import { mockProducts, mockSuppliers, mockCategories } from '@/data/mock';
import { getCompanyInfo } from '@/config/brand-config';
import { 
  MessageSquarePlus, 
  ShoppingCart, 
  Heart, 
  Download, 
  Building2, 
  Factory,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Globe,
  Users,
  Star,
  Search,
  ShieldCheck,
  Clock,
  Truck
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';

export default function HomePage() {
  const { t } = useLanguage();
  const companyInfo = getCompanyInfo();
  // Featured products (top 4)
  const featuredProducts = mockProducts.slice(0, 4);
  // Featured suppliers (top 3)
  const featuredSuppliers = mockSuppliers.slice(0, 3);
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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12 md:py-20 overflow-hidden">
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
              {t.home.heroBadge}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {companyInfo.name} - {t.home.heroTitle}
              <br />
              <span className="text-blue-200">{t.home.heroSubtitle}</span>
            </h1>
            {/* Search Bar - replaces description text and CTA buttons */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-6 md:mt-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t.home.searchPlaceholder}
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

      {/* Core Features */}
      <section className="py-12 md:py-16 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: t.home.tieredPricing, desc: t.home.tieredPricingDesc, link: '/products' },
              { icon: ShoppingCart, title: t.home.sampleCart, desc: t.home.sampleCartDesc, link: '/sample-cart' },
              { icon: MessageSquarePlus, title: t.home.inquiry, desc: t.home.inquiryDesc, link: '/inquiry' },
              { icon: Factory, title: t.home.factoryDirect, desc: t.home.factoryDirectDesc, link: '/factory' },
            ].map((feature, index) => (
              <Link 
                key={index}
                href={feature.link}
                className="group"
              >
                <Card className="hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.home.categories}</h2>
              <p className="text-gray-500">{t.home.categoriesDesc}</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                {t.home.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map(category => (
              <Link key={category.id} href={`/products?category=${category.slug}`}>
                <Card className="group hover:shadow-md transition-all overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 16vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="font-medium">{category.name}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.home.featuredProducts}</h2>
              <p className="text-gray-500">{t.home.featuredProductsDesc}</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                {t.home.viewAllProducts}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.home.verifiedSuppliers}</h2>
              <p className="text-gray-500">{t.home.verifiedSuppliersDesc}</p>
            </div>
            <Link href="/suppliers">
              <Button variant="outline" className="gap-2">
                {t.home.viewAllSuppliers}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSuppliers.map(supplier => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">{t.home.moreCoreFeatures}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: t.home.favorites,
                desc: t.home.favoritesDesc,
                link: '/favorites',
                color: 'text-red-500 bg-red-100',
              },
              {
                icon: Building2,
                title: t.home.supplierPortal,
                desc: t.home.supplierPortalDesc,
                link: '/supplier-join',
                color: 'text-green-600 bg-green-100',
              },
              {
                icon: Download,
                title: t.home.getCatalog,
                desc: t.home.getCatalogDesc,
                link: '/catalog',
                color: 'text-blue-600 bg-blue-100',
              },
              {
                icon: Factory,
                title: t.home.customWholesale,
                desc: t.home.customWholesaleDesc,
                link: '/customization',
                color: 'text-purple-600 bg-purple-100',
              },
            ].map((item, index) => (
              <Link key={index} href={item.link}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${item.color} mb-4`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-8 md:py-12 bg-white border-t border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 text-green-600 mb-2">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">100+</div>
              <div className="text-xs md:text-sm text-gray-500">{t.home.verifiedSuppliers}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 text-blue-600 mb-2">
                <Globe className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">50+</div>
              <div className="text-xs md:text-sm text-gray-500">{t.home.countriesServed}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-100 text-yellow-600 mb-2">
                <Star className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">98%</div>
              <div className="text-xs md:text-sm text-gray-500">{t.home.customerSatisfaction}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 text-purple-600 mb-2">
                <Users className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">1000+</div>
              <div className="text-xs md:text-sm text-gray-500">{t.home.activeBuyers}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-8 md:py-12 bg-blue-50 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-blue-600 mb-2 shadow-sm">
                <ShieldCheck className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">50+</div>
              <div className="text-xs md:text-sm text-gray-500">{t.home.verifiedAgents}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-blue-600 mb-2 shadow-sm">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">5,000+</div>
              <div className="text-xs md:text-sm text-gray-500">{t.home.wholesaleProducts}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-blue-600 mb-2 shadow-sm">
                <Clock className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">24h</div>
              <div className="text-xs md:text-sm text-gray-500">{t.home.quickResponse}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-blue-600 mb-2 shadow-sm">
                <Truck className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">Global</div>
              <div className="text-xs md:text-sm text-gray-500">{t.home.shippingCoverage}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.home.ctaTitle}</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            {t.home.ctaDescription}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                {t.home.startShopping}
              </Button>
            </Link>
            <Link href="/supplier-join">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t.home.becomeSupplier}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
