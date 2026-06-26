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
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import { usePageSections, type PageSection } from '@/hooks/use-page-sections';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, ShoppingCart, MessageSquarePlus, Factory,
  Heart, Building2, Download, CheckCircle, Globe,
  Users, Star, ShieldCheck, Clock, Truck,
};

function DynamicHero({ section, t, companyInfo }: { section: PageSection; t: Record<string, unknown>; companyInfo: { name: string } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const tl = t as Record<string, string>;
  const content = section.content as Record<string, string>;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {section.image_url ? (
          <Image src={section.image_url} alt="Hero background" fill className="object-cover" priority />
        ) : (
          <Image src="https://images.unsplash.com/photo-1581091226826-a8a4d5d88f16?w=1200" alt="Factory background" fill className="object-cover" priority />
        )}
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 text-sm">
            {content.badge || tl.heroBadge}
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            {section.title || `${companyInfo.name} - ${tl.heroTitle}`}
            <br />
            <span className="text-blue-200">{section.subtitle || tl.heroSubtitle}</span>
          </h1>
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-6 md:mt-8">
            <div className="relative">
              <Input
                type="text"
                placeholder={content.search_placeholder || tl.searchPlaceholder}
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
  );
}

function DynamicCoreFeatures({ section }: { section: PageSection }) {
  const content = section.content as Record<string, unknown>;
  const items = (content.items as Array<Record<string, string>>) || [];

  return (
    <section className="py-12 md:py-16 bg-gray-50 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || TrendingUp;
            return (
              <Link key={index} href={feature.link || '#'} className="group">
                <Card className="hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DynamicMoreFeatures({ section }: { section: PageSection }) {
  const content = section.content as Record<string, unknown>;
  const items = (content.items as Array<Record<string, string>>) || [];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        {section.title && <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">{section.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || TrendingUp;
            return (
              <Link key={index} href={item.link || '#'}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${item.color || 'bg-blue-100 text-blue-600'} mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DynamicTrustIndicators({ section }: { section: PageSection }) {
  const content = section.content as Record<string, unknown>;
  const items = (content.items as Array<Record<string, string>>) || [];

  return (
    <section className="py-8 md:py-12 bg-white border-t border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || CheckCircle;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ${item.color || 'bg-green-100 text-green-600'} mb-2`}>
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">{item.value}</div>
                <div className="text-xs md:text-sm text-gray-500">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DynamicTrustStats({ section }: { section: PageSection }) {
  const content = section.content as Record<string, unknown>;
  const items = (content.items as Array<Record<string, string>>) || [];

  return (
    <section className="py-8 md:py-12 bg-blue-50 border-t border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ${item.color || 'bg-white text-blue-600'} mb-2 shadow-sm`}>
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">{item.value}</div>
                <div className="text-xs md:text-sm text-gray-500">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DynamicCTA({ section }: { section: PageSection }) {
  const content = section.content as Record<string, string>;

  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto">{section.subtitle}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={content.button1_link || '/products'}>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              {content.button1_text || 'Start Shopping'}
            </Button>
          </Link>
          <Link href={content.button2_link || '/supplier-join'}>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {content.button2_text || 'Become a Supplier'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const tl = t.home as Record<string, string>;
  const companyInfo = getCompanyInfo();
  const { sections, loading: sectionsLoading } = usePageSections('home');

  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Build section map for quick lookup
  const sectionMap = useMemo(() => {
    const map = new Map<string, PageSection>();
    for (const s of sections) {
      if (s.is_visible) map.set(s.section_type, s);
    }
    return map;
  }, [sections]);

  // Get items for featured products from DB, fallback to mock
  const featuredProducts = useMemo(() => {
    const prodSection = sectionMap.get('featured_products');
    if (prodSection?.items && prodSection.items.length > 0) {
      const dbProducts = prodSection.items
        .filter(i => i.item_type === 'product' && i.is_visible && i.reference_id !== null)
        .map(item => {
          const mp = mockProducts.find(p => p.id === String(item.reference_id));
          return mp || null;
        })
        .filter((p): p is NonNullable<typeof p> => p !== null);
      if (dbProducts.length > 0) return dbProducts;
    }
    return mockProducts.slice(0, 4);
  }, [sectionMap]);

  // Get items for featured suppliers from DB, fallback to mock
  const featuredSuppliers = useMemo(() => {
    const supSection = sectionMap.get('featured_suppliers');
    if (supSection?.items && supSection.items.length > 0) {
      const dbSuppliers = supSection.items
        .filter(i => i.item_type === 'supplier' && i.is_visible && i.reference_id !== null)
        .map(item => {
          const ms = mockSuppliers.find(s => s.id === String(item.reference_id));
          return ms || null;
        })
        .filter((s): s is NonNullable<typeof s> => s !== null);
      if (dbSuppliers.length > 0) return dbSuppliers;
    }
    return mockSuppliers.slice(0, 3);
  }, [sectionMap]);

  // Render each section type - DB version if available, else fallback
  const renderSection = (type: string) => {
    const section = sectionMap.get(type);
    if (!section) return null; // Section deleted or hidden

    switch (type) {
      case 'hero':
        return <DynamicHero key={type} section={section} t={t.home as Record<string, unknown>} companyInfo={companyInfo} />;
      case 'core_features':
        return <DynamicCoreFeatures key={type} section={section} />;
      case 'categories':
        return (
          <section key={type} className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title || tl.categories}</h2>
                  <p className="text-gray-500">{section.subtitle || tl.categoriesDesc}</p>
                </div>
                <Link href="/products">
                  <Button variant="outline" className="gap-2">
                    {tl.viewAll}
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
                          <Image src={category.image} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 16vw" />
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
        );
      case 'featured_products':
        return (
          <section key={type} className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title || tl.featuredProducts}</h2>
                  <p className="text-gray-500">{section.subtitle || tl.featuredProductsDesc}</p>
                </div>
                <Link href="/products">
                  <Button variant="outline" className="gap-2">
                    {tl.viewAllProducts}
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
        );
      case 'featured_suppliers':
        return (
          <section key={type} className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title || tl.verifiedSuppliers}</h2>
                  <p className="text-gray-500">{section.subtitle || tl.verifiedSuppliersDesc}</p>
                </div>
                <Link href="/suppliers">
                  <Button variant="outline" className="gap-2">
                    {tl.viewAllSuppliers}
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
        );
      case 'more_features':
        return <DynamicMoreFeatures key={type} section={section} />;
      case 'trust_indicators':
        return <DynamicTrustIndicators key={type} section={section} />;
      case 'trust_stats':
        return <DynamicTrustStats key={type} section={section} />;
      case 'cta':
        return <DynamicCTA key={type} section={section} />;
      default:
        // Generic section renderer for custom sections added by admin
        return (
          <section key={section.id} className="py-16" style={section.background_color ? { backgroundColor: section.background_color } : undefined}>
            <div className="container mx-auto px-4">
              {section.image_url && (
                <div className="mb-8">
                  <Image src={section.image_url} alt={section.title || 'Section image'} width={1200} height={400} className="w-full h-auto rounded-lg object-cover" />
                </div>
              )}
              {section.title && <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">{section.title}</h2>}
              {section.subtitle && <p className="text-gray-500 text-center mb-8">{section.subtitle}</p>}
              {section.items && section.items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.items.filter(i => i.is_visible).map(item => {
                    const Icon = iconMap[item.icon_name || ''] || TrendingUp;
                    return (
                      <Link key={item.id} href={item.link_url || '#'}>
                        <Card className="hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group">
                          <CardContent className="p-6 text-center">
                            {item.image_url && (
                              <div className="mb-4">
                                <Image src={item.image_url} alt={item.title || ''} width={200} height={150} className="w-full h-auto rounded-lg object-cover" />
                              </div>
                            )}
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                              <Icon className="h-6 w-6" />
                            </div>
                            {item.title && <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>}
                            {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
    }
  };

  // Section order from DB, or default order
  const sectionOrder = sectionsLoading
    ? ['hero', 'core_features', 'categories', 'featured_products', 'featured_suppliers', 'more_features', 'trust_indicators', 'trust_stats', 'cta']
    : sections.filter(s => s.is_visible).map(s => s.section_type);

  return (
    <div className="min-h-screen">
      {sectionOrder.map(type => renderSection(type))}
    </div>
  );
}
