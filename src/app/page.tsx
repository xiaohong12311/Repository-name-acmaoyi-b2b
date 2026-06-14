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
  // 取前4个产品作为推荐
  const featuredProducts = mockProducts.slice(0, 4);
  // 取前3个供应商作为推荐
  const featuredSuppliers = mockSuppliers.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1581091226826-a8a4d5d88f16?w=1200"
            alt="工厂背景"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-0 mb-6 px-4 py-2">
              专业B2B批发采购平台
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              连接优质工厂与采购商
              <br />
              <span className="text-blue-200">一站式批发解决方案</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              阶梯价格、样品申请、询盘管理、定制批发
              <br />
              让批发采购更高效、更透明
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2">
                  浏览产品目录
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/inquiry">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                  <MessageSquarePlus className="h-4 w-4" />
                  发送询盘
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
              { icon: TrendingUp, title: '阶梯价格', desc: '批量采购享优惠' },
              { icon: ShoppingCart, title: '样品车', desc: '先看样再大批' },
              { icon: MessageSquarePlus, title: '询盘单', desc: '一键发送询价' },
              { icon: Factory, title: '工厂直供', desc: '源头品质保障' },
            ].map((feature, index) => (
              <Link 
                key={index}
                href={feature.title === '阶梯价格' ? '/products' : 
                      feature.title === '样品车' ? '/sample-cart' :
                      feature.title === '询盘单' ? '/inquiry' : '/factory'}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">产品分类</h2>
              <p className="text-gray-500">按行业快速找到所需产品</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                查看全部
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">热门批发产品</h2>
              <p className="text-gray-500">阶梯价格清晰展示，批量采购更优惠</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                查看全部产品
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">认证供应商</h2>
              <p className="text-gray-500">经过严格审核的优质供应商</p>
            </div>
            <Link href="/suppliers">
              <Button variant="outline" className="gap-2">
                查看全部供应商
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
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">更多核心功能</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: '收藏夹',
                desc: '收藏感兴趣的产品，方便后续询盘',
                link: '/favorites',
                color: 'text-red-500 bg-red-100',
              },
              {
                icon: Building2,
                title: '供应商入驻',
                desc: '工厂入驻展示产品，对接采购商',
                link: '/supplier-join',
                color: 'text-green-600 bg-green-100',
              },
              {
                icon: Download,
                title: '获取目录',
                desc: '下载产品目录PDF，方便查阅',
                link: '/catalog',
                color: 'text-blue-600 bg-blue-100',
              },
              {
                icon: Factory,
                title: '定制批发',
                desc: 'Logo定制、包装定制、规格定制',
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
              { icon: ShieldCheck, value: '100+', label: '认证供应商' },
              { icon: TrendingUp, value: '5000+', label: '批发产品' },
              { icon: Clock, value: '24h', label: '快速响应' },
              { icon: Truck, value: '全球', label: '物流覆盖' },
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
          <h2 className="text-3xl font-bold mb-4">准备好开始批发采购了吗？</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            注册成为采购商，享受阶梯价格、样品申请、定制批发等专属服务
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                开始采购
              </Button>
            </Link>
            <Link href="/supplier-join">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                供应商入驻
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}