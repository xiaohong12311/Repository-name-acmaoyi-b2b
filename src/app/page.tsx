'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
  Truck,
  ChevronRight,
  ShoppingBag,
  Boxes,
  BadgeCheck,
  Ship,
  MapPin,
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

/* ==================== Section Renderers ==================== */

function DynamicHero({ section, t, companyInfo }: { section: PageSection; t: any; companyInfo: { name: string } }) {
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
    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 40%, #2563EB 100%)' }}>
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full" />

      <div className="container mx-auto px-6 relative text-center">
        <Badge className="bg-white/15 text-white border-0 mb-6 px-4 py-2 text-sm backdrop-blur-sm">
          {content.badge || tl.heroBadge}
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {section.title || `${companyInfo.name} - ${tl.heroTitle}`}
        </h1>
        <p className="text-lg md:text-xl text-blue-200 mb-8 md:mb-10 max-w-2xl mx-auto">
          {section.subtitle || tl.heroSubtitle}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-5 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder={content.search_placeholder || tl.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 md:h-16 pl-14 pr-32 rounded-2xl text-foreground bg-white shadow-float border-0 focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
            />
            <button
              type="submit"
              className="absolute right-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">{t.common.search}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function DynamicCoreFeatures({ section }: { section: PageSection }) {
  const content = section.content as Record<string, unknown>;
  const items = (content.items as Array<Record<string, string>>) || [];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || TrendingUp;
            return (
              <Link key={index} href={feature.link || '#'} className="group">
                <Card className="bg-card shadow-card hover:shadow-float transition-all hover:-translate-y-1 cursor-pointer border-0">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="w-3 h-3" />
                    </div>
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
    <section className="py-14 bg-muted/50">
      <div className="container mx-auto px-6">
        {section.title && <h2 className="text-2xl font-bold text-foreground text-center mb-10">{section.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || TrendingUp;
            return (
              <Link key={index} href={item.link || '#'}>
                <Card className="bg-card shadow-card hover:shadow-float transition-all hover:-translate-y-1 cursor-pointer group border-0">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${item.color || 'bg-primary/10 text-primary'} mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
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
    <section className="px-6 pb-14">
      <div className="bg-card rounded-2xl shadow-card p-8 md:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || CheckCircle;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-full ${item.color || 'bg-success/10 text-success'} flex items-center justify-center mb-3`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-2xl font-bold text-foreground">{item.value}</span>
                <span className="mt-1 text-sm text-muted-foreground">{item.label}</span>
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
    <section className="px-6 pb-14">
      <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 40%, #2563EB 100%)' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 md:p-10">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-6 h-6 text-blue-300" />
                </div>
                <span className="text-3xl font-bold text-white">{item.value}</span>
                <p className="mt-1 text-sm text-blue-200">{item.label}</p>
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
    <section className="px-6 pb-16">
      <div className="bg-primary/5 rounded-2xl p-10 md:p-14 text-center border border-primary/10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{section.title}</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">{section.subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={content.button1_link || '/products'}>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              {content.button1_text || 'Start Shopping'}
            </button>
          </Link>
          <Link href={content.button2_link || '/supplier-join'}>
            <button className="bg-card text-foreground px-8 py-3 rounded-xl text-sm font-semibold hover:bg-muted active:scale-[0.98] transition-all border border-border inline-flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {content.button2_text || 'Become a Supplier'}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==================== Main Page ==================== */

export default function HomePage() {
  const { t } = useLanguage();
  const tl = t.home as Record<string, string>;
  const companyInfo = getCompanyInfo();
  const { sections, loading: sectionsLoading } = usePageSections('home');

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

  // Render each section type
  const renderSection = (type: string) => {
    const section = sectionMap.get(type);
    if (!section) return null;

    switch (type) {
      case 'hero':
        return <DynamicHero key={type} section={section} t={t.home as any} companyInfo={companyInfo} />;
      case 'core_features':
        return <DynamicCoreFeatures key={type} section={section} />;
      case 'categories':
        return (
          <section key={type} className="py-14 px-6">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{section.title || tl.categories}</h2>
                  <p className="text-muted-foreground text-sm">{section.subtitle || tl.categoriesDesc}</p>
                </div>
                <Link href="/products" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  {tl.viewAll} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {mockCategories.map(category => (
                  <Link key={category.id} href={`/products?category=${category.slug}`} className="group">
                    <Card className="bg-card shadow-card overflow-hidden hover:shadow-float transition-all border-0">
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden rounded-t-xl">
                          <Image src={category.image} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 16vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <h3 className="font-medium text-sm">{category.name}</h3>
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
          <section key={type} className="py-14 px-6">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{section.title || tl.featuredProducts}</h2>
                  <p className="text-muted-foreground text-sm">{section.subtitle || tl.featuredProductsDesc}</p>
                </div>
                <Link href="/products" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  {tl.viewAllProducts} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredProducts.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      case 'featured_suppliers':
        return (
          <section key={type} className="py-14 px-6">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{section.title || tl.verifiedSuppliers}</h2>
                  <p className="text-muted-foreground text-sm">{section.subtitle || tl.verifiedSuppliersDesc}</p>
                </div>
                <Link href="/suppliers" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  {tl.viewAllSuppliers} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredSuppliers.map(supplier => (
                  <Card key={supplier.id} className="bg-card shadow-card p-5 border-0 hover:shadow-float transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{supplier.name}</h3>
                        <p className="mt-0.5 text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />{supplier.country || 'China'}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-success/10 text-success text-xs font-semibold px-2.5 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5" />Verified
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(supplier.categories || []).slice(0, 3).map((cat: string, idx: number) => (
                        <span key={idx} className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded font-medium">{cat}</span>
                      ))}
                    </div>
                    <Link href={`/suppliers/${supplier.id}`} className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                      View Profile <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Card>
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
        // Generic section renderer for custom sections
        return (
          <section key={section.id} className="py-14 px-6" style={section.background_color ? { backgroundColor: section.background_color } : undefined}>
            <div className="container mx-auto">
              {section.image_url && (
                <div className="mb-8">
                  <Image src={section.image_url} alt={section.title || 'Section image'} width={1200} height={400} className="w-full h-auto rounded-2xl object-cover" />
                </div>
              )}
              {section.title && <h2 className="text-2xl font-bold text-foreground text-center mb-4">{section.title}</h2>}
              {section.subtitle && <p className="text-muted-foreground text-center mb-8">{section.subtitle}</p>}
              {section.items && section.items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {section.items.filter(i => i.is_visible).map(item => {
                    const Icon = iconMap[item.icon_name || ''] || TrendingUp;
                    return (
                      <Link key={item.id} href={item.link_url || '#'}>
                        <Card className="bg-card shadow-card hover:shadow-float transition-all hover:-translate-y-1 cursor-pointer group border-0">
                          <CardContent className="p-6 text-center">
                            {item.image_url && (
                              <div className="mb-4">
                                <Image src={item.image_url} alt={item.title || ''} width={200} height={150} className="w-full h-auto rounded-xl object-cover" />
                              </div>
                            )}
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              <Icon className="h-7 w-7" />
                            </div>
                            {item.title && <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>}
                            {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
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
    <div className="min-h-screen bg-background">
      {sectionOrder.map(type => renderSection(type))}
    </div>
  );
}
