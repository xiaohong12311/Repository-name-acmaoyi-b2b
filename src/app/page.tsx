'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/product-card';
import { SupplierCard } from '@/components/supplier/supplier-card';
import { mockProducts, mockSuppliers, mockCategories } from '@/data/mock';
import { 
  MessageSquarePlus, 
  ShoppingCart, 
  Heart, 
  Download, 
  Building2, 
  Factory,
  TrendingUp,
  ShieldCheck,
  Clock,
  Truck,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  // Featured products (top 4)
  const featuredProducts = mockProducts.slice(0, 4);
  // Featured suppliers (top 3)
  const featuredSuppliers = mockSuppliers.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
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
            <Badge className="bg-white/20 text-white border-0 mb-6 px-4 py-2">
              Professional B2B Wholesale Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Connecting Quality Manufacturers with Buyers
              <br />
              <span className="text-blue-200">One-Stop Wholesale Solution</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Tiered Pricing, Sample Requests, Inquiry Management, Custom Wholesale
              <br />
              Making wholesale procurement more efficient and transparent
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2">
                  Browse Product Catalog
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/inquiry">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                  <MessageSquarePlus className="h-4 w-4" />
                  Send Inquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'Tiered Pricing', desc: 'Bulk discounts available', link: '/products' },
              { icon: ShoppingCart, title: 'Sample Cart', desc: 'Request samples first', link: '/sample-cart' },
              { icon: MessageSquarePlus, title: 'Inquiry', desc: 'Send inquiries easily', link: '/inquiry' },
              { icon: Factory, title: 'Factory Direct', desc: 'Quality guaranteed', link: '/factory' },
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Categories</h2>
              <p className="text-gray-500">Find products by industry quickly</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                View All
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Wholesale Products</h2>
              <p className="text-gray-500">Clear tiered pricing, better bulk discounts</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                View All Products
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verified Suppliers</h2>
              <p className="text-gray-500">Rigorously vetted quality suppliers</p>
            </div>
            <Link href="/suppliers">
              <Button variant="outline" className="gap-2">
                View All Suppliers
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
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">More Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Favorites',
                desc: 'Save products for later inquiries',
                link: '/favorites',
                color: 'text-red-500 bg-red-100',
              },
              {
                icon: Building2,
                title: 'Supplier Portal',
                desc: 'Manufacturers showcase products',
                link: '/supplier-join',
                color: 'text-green-600 bg-green-100',
              },
              {
                icon: Download,
                title: 'Get Catalog',
                desc: 'Download product catalog PDF',
                link: '/catalog',
                color: 'text-blue-600 bg-blue-100',
              },
              {
                icon: Factory,
                title: 'Custom Wholesale',
                desc: 'Logo, packaging & specs customization',
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
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: ShieldCheck, value: '100+', label: 'Verified Suppliers' },
              { icon: TrendingUp, value: '5,000+', label: 'Wholesale Products' },
              { icon: Clock, value: '24h', label: 'Quick Response' },
              { icon: Truck, value: 'Global', label: 'Shipping Coverage' },
            ].map((stat, index) => (
              <div key={index}>
                <stat.icon className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Wholesale Procurement?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Register as a buyer to enjoy tiered pricing, sample requests, custom wholesale and exclusive services
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Start Shopping
              </Button>
            </Link>
            <Link href="/supplier-join">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Become a Supplier
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}