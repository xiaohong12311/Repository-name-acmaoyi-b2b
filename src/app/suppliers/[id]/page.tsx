'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockSuppliers, mockProducts, getProductsBySupplier } from '@/data/mock';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Award,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
  Factory,
  Download,
  MessageSquarePlus,
  Star,
} from 'lucide-react';

export default function SupplierDetailPage() {
  const params = useParams();
  const supplierId = params.id as string;
  
  const supplier = mockSuppliers.find(s => s.id === supplierId);
  const supplierProducts = supplier ? getProductsBySupplier(supplier.id) : [];

  if (!supplier) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">供应商不存在</h1>
        <Link href="/suppliers">
          <Button>返回供应商列表</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-700">首页</Link>
        <span>/</span>
        <Link href="/suppliers" className="hover:text-blue-700">供应商</Link>
        <span>/</span>
        <span className="text-gray-900">{supplier.name}</span>
      </nav>

      {/* Supplier Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={supplier.logo}
                alt={supplier.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl font-bold text-gray-900">{supplier.name}</h1>
                {supplier.verified && (
                  <Badge className="bg-green-100 text-green-700">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    认证供应商
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin className="h-4 w-4" />
                {supplier.location}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">{supplier.rating}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i <= Math.round(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">{supplier.reviewCount}条评价</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {supplier.responseTime}响应
                </div>
              </div>

              <p className="text-gray-600 mb-4">{supplier.description}</p>

              {/* Main Products */}
              <div className="flex flex-wrap gap-2 mb-4">
                {supplier.mainProducts.map(product => (
                  <Badge key={product} variant="outline">
                    {product}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 bg-blue-700 hover:bg-blue-800">
                  <MessageSquarePlus className="h-4 w-4" />
                  发送询盘
                </Button>
                <Button variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  联系供应商
                </Button>
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  发送邮件
                </Button>
                <Link href="/catalog">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    获取目录
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Building2, label: '成立年份', value: supplier.yearEstablished },
          { icon: Users, label: '员工规模', value: supplier.totalEmployees },
          { icon: TrendingUp, label: '年营业额', value: supplier.annualRevenue },
          { icon: Package, label: '产品数量', value: supplierProducts.length },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className="h-6 w-6 text-blue-700 mx-auto mb-2" />
              <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
              <div className="font-semibold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">产品列表</TabsTrigger>
          <TabsTrigger value="factory">工厂展示</TabsTrigger>
          <TabsTrigger value="certifications">认证资质</TabsTrigger>
          <TabsTrigger value="contact">联系方式</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                供应商产品 ({supplierProducts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {supplierProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supplierProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  该供应商暂无产品信息
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Factory Tab */}
        <TabsContent value="factory">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5" />
                工厂展示
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {supplier.factoryImages.length > 0 ? (
                  supplier.factoryImages.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={img}
                        alt={`${supplier.name} 工厂照片 ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    暂无工厂照片
                  </div>
                )}
              </div>
              
              <Separator className="my-6" />
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">工厂概况</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">员工规模</span>
                    <p className="font-medium">{supplier.totalEmployees}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">年营业额</span>
                    <p className="font-medium">{supplier.annualRevenue}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">成立年份</span>
                    <p className="font-medium">{supplier.yearEstablished}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">主营产品</span>
                    <p className="font-medium">{supplier.mainProducts.join('、')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                认证资质
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {supplier.certifications.map(cert => (
                  <div key={cert} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <ShieldCheck className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-medium">{cert}</div>
                      <div className="text-xs text-gray-500">认证资质</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {supplier.certifications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  暂无认证资质信息
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                联系方式
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">联系人</div>
                      <div className="font-medium">{supplier.contactPerson}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">联系电话</div>
                      <div className="font-medium">{supplier.contactPhone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">邮箱</div>
                      <div className="font-medium">{supplier.contactEmail}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">地址</div>
                      <div className="font-medium">{supplier.location}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">联系提示</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• 建议通过平台发送询盘，可获得更好的响应</p>
                    <p>• 平均响应时间：{supplier.responseTime}</p>
                    <p>• 工作时间：周一至周五 9:00-18:00</p>
                    <p>• 支持多语言沟通：中文、英文</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <Button className="w-full gap-2 mt-4">
                    <MessageSquarePlus className="h-4 w-4" />
                    发送询盘
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Package } from 'lucide-react';