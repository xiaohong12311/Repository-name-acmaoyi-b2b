'use client';

import Image from 'next/image';
import Link from 'next/link';
import { mockSuppliers } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Factory,
  Building2,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';

export default function FactoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
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
            <Badge className="bg-white/20 text-white border-0 mb-6">
              工厂展示
            </Badge>
            <h1 className="text-4xl font-bold mb-6">
              直击生产现场
              <br />
              <span className="text-gray-300">品质看得见</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              走进认证供应商的生产工厂，了解生产工艺、质量控制
              <br />
              让采购更放心，合作更深入
            </p>
            <Link href="/suppliers">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
                查看全部供应商
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100+', label: '认证工厂' },
              { value: '50+', label: '行业覆盖' },
              { value: '10万+', label: '生产线' },
              { value: 'ISO9001', label: '品质认证' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-blue-700 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            按行业浏览工厂
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: '五金制造', 
                image: 'https://images.unsplash.com/photo-1581091226826-a8a4d5d88f16?w=400',
                count: 35,
                desc: '餐具、厨具、工具生产'
              },
              { 
                name: '电子光电', 
                image: 'https://images.unsplash.com/photo-1565793298595-7a8d5eb5d03b?w=400',
                count: 28,
                desc: 'LED、照明、智能设备'
              },
              { 
                name: '包装印刷', 
                image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5a9a8?w=400',
                count: 22,
                desc: '包装盒、印刷、定制'
              },
              { 
                name: '纺织服装', 
                image: 'https://images.unsplash.com/photo-1598632640488-5e6a1e7a0a5d?w=400',
                count: 18,
                desc: '工作服、制服、面料'
              },
              { 
                name: '仓储设备', 
                image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400',
                count: 15,
                desc: '货架、仓储系统'
              },
              { 
                name: '其他行业', 
                image: 'https://images.unsplash.com/photo-1504148455328-c3769071a1e8?w=400',
                count: 20,
                desc: '多元化生产'
              },
            ].map((cat, index) => (
              <Link key={index} href={`/suppliers?industry=${cat.name}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-semibold mb-1">{cat.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">{cat.desc}</span>
                          <Badge variant="secondary" className="bg-white/20 text-white">
                            {cat.count}家
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Factories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">认证工厂展示</h2>
            <Link href="/suppliers">
              <Button variant="outline" className="gap-2">
                查看全部
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockSuppliers.slice(0, 2).map(supplier => (
              <Card key={supplier.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Factory Images */}
                  <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50">
                    {supplier.factoryImages.slice(0, 2).map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded overflow-hidden">
                        <Image
                          src={img}
                          alt={`${supplier.name} 工厂`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Supplier Info */}
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={supplier.logo}
                          alt={supplier.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <Link href={`/suppliers/${supplier.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-700 mb-1">
                          {supplier.name}
                        </Link>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{supplier.location}</span>
                          {supplier.verified && (
                            <Badge className="bg-green-100 text-green-700">
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              认证工厂
                            </Badge>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              员工规模
                            </div>
                            <div className="font-medium mt-1">{supplier.totalEmployees}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              成立年份
                            </div>
                            <div className="font-medium mt-1">{supplier.yearEstablished}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              认证资质
                            </div>
                            <div className="font-medium mt-1">{supplier.certifications.length}项</div>
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {supplier.certifications.slice(0, 3).map(cert => (
                            <Badge key={cert} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <Link href={`/suppliers/${supplier.id}`}>
                            <Button size="sm" className="gap-1">
                              查看详情
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Phone className="h-3 w-3" />
                            联系工厂
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            工厂展示功能
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Factory,
                title: '生产实景',
                desc: '工厂车间实拍，展示生产环境和设备',
              },
              {
                icon: ShieldCheck,
                title: '品质认证',
                desc: 'ISO、CE等认证资质，品质有保障',
              },
              {
                icon: Users,
                title: '团队规模',
                desc: '员工数量、技术团队，评估生产能力',
              },
              {
                icon: Clock,
                title: '响应速度',
                desc: '平均响应时间，高效沟通',
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">想了解更多工厂信息？</h2>
          <p className="text-blue-100 mb-8">
            查看完整供应商目录，获取工厂联系方式和产品目录
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/suppliers">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                浏览供应商
              </Button>
            </Link>
            <Link href="/supplier-join">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                工厂入驻
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}