'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockProducts, getProductSupplier } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useFavorites, useSampleCart, useInquiry } from '@/hooks/use-b2b-store';
import type { Product } from '@/types';
import {
  Heart,
  MessageSquarePlus,
  ShoppingCart,
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  Factory,
  Check,
  Share2,
  Download,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const product = mockProducts.find(p => p.id === productId);
  const supplier = product ? getProductSupplier(product.id) : undefined;

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToSampleCart } = useSampleCart();
  const { addToInquiry, inquiryItems } = useInquiry();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(product?.moq || 1);
  const [inquiryNote, setInquiryNote] = useState('');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">产品不存在</h1>
        <Link href="/products">
          <Button>返回产品列表</Button>
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(product.id);

  // 根据数量获取对应阶梯价格
  const getCurrentTierPrice = () => {
    for (const tier of product.tierPrices) {
      if (quantity >= tier.minQuantity) {
        if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
          return tier.price;
        }
      }
    }
    return product.tierPrices[0]?.price || 0;
  };

  const currentPrice = getCurrentTierPrice();

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToSampleCart = () => {
    const specs: Record<string, string> = {};
    product.specifications.forEach(s => {
      specs[s.name] = s.value;
    });
    addToSampleCart(product, 1, specs);
  };

  const handleAddToInquiry = () => {
    addToInquiry(product, quantity, undefined, undefined, inquiryNote);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-700">首页</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-700">产品目录</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                  onClick={() => setSelectedImageIndex(i => i === 0 ? product.images.length - 1 : i - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                  onClick={() => setSelectedImageIndex(i => i === product.images.length - 1 ? 0 : i + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2",
                    selectedImageIndex === index ? "border-blue-700" : "border-transparent"
                  )}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div>
          {/* Tags */}
          <div className="flex gap-2 mb-3">
            {product.sampleAvailable && (
              <Badge className="bg-green-100 text-green-700">可申请样品</Badge>
            )}
            {product.customizationAvailable && (
              <Badge className="bg-blue-100 text-blue-700">支持定制</Badge>
            )}
            {supplier?.verified && (
              <Badge className="bg-yellow-100 text-yellow-700">认证供应商</Badge>
            )}
          </div>

          {/* Product Name */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Supplier Link */}
          {supplier && (
            <Link 
              href={`/suppliers/${supplier.id}`}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-700 mb-4"
            >
              <MapPin className="h-4 w-4" />
              {supplier.name} · {supplier.location}
            </Link>
          )}

          {/* MOQ & Lead Time */}
          <div className="flex gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-medium">MOQ:</span>
              <span>{product.moq} {product.unit}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>交货期: {product.leadTime}</span>
            </div>
          </div>

          {/* Tier Price Table */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                阶梯价格表
                <Badge variant="outline" className="text-xs">
                  批量采购享优惠
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {product.tierPrices.map((tier, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "flex justify-between items-center py-3 px-4 rounded-lg",
                      quantity >= tier.minQuantity && 
                      (tier.maxQuantity === null || quantity <= tier.maxQuantity)
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50"
                    )}
                  >
                    <div>
                      <span className="font-medium text-gray-900">
                        {tier.minQuantity} ~ {tier.maxQuantity || '以上'} {product.unit}
                      </span>
                      {tier.discount && (
                        <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-700">
                          {tier.discount}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xl text-blue-700 tabular-nums">
                        ¥{tier.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">/{product.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Price Summary */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    当前数量 {quantity} {product.unit} 对应价格
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-2xl text-blue-700 tabular-nums">
                      ¥{currentPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-500 ml-1">/{product.unit}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quantity Input */}
          <div className="mb-6">
            <Label className="mb-2 block">采购数量 ({product.unit})</Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min={product.moq}
                value={quantity}
                onChange={e => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                className="w-32"
              />
              <span className="text-sm text-gray-500">
                最小起订量: {product.moq} {product.unit}
              </span>
            </div>
          </div>

          {/* Inquiry Note */}
          <div className="mb-6">
            <Label className="mb-2 block">询盘备注</Label>
            <Textarea
              placeholder="如有特殊需求请在此说明..."
              value={inquiryNote}
              onChange={e => setInquiryNote(e.target.value)}
              className="h-24"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button 
              size="lg" 
              className="flex-1 bg-blue-700 hover:bg-blue-800 gap-2"
              onClick={handleAddToInquiry}
            >
              <MessageSquarePlus className="h-5 w-5" />
              加入询盘单
            </Button>
            
            {product.sampleAvailable && (
              <Button 
                size="lg" 
                variant="outline"
                className="flex-1 gap-2"
                onClick={handleAddToSampleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                申请样品 (¥{product.samplePrice?.toFixed(2)})
              </Button>
            )}
            
            <Button 
              size="lg" 
              variant="ghost"
              className={cn(isFav && "text-red-500")}
              onClick={handleToggleFavorite}
            >
              <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
            </Button>
            
            <Button size="lg" variant="ghost">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { icon: ShieldCheck, label: '品质保障' },
              { icon: Truck, label: '物流配送' },
              { icon: Factory, label: '工厂直供' },
              { icon: Check, label: '样品确认' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <item.icon className="h-4 w-4 text-blue-700" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Description, Supplier */}
      <Tabs defaultValue="specs" className="mt-8">
        <TabsList>
          <TabsTrigger value="specs">产品规格</TabsTrigger>
          <TabsTrigger value="description">产品描述</TabsTrigger>
          <TabsTrigger value="supplier">供应商信息</TabsTrigger>
        </TabsList>

        <TabsContent value="specs">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-4 py-2 border-b last:border-0">
                    <span className="font-medium text-gray-600 w-24">{spec.name}</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="description">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              {product.customizationAvailable && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Factory className="h-5 w-5 text-blue-700" />
                    定制批发服务
                  </h3>
                  <p className="text-gray-600 mb-4">
                    本产品支持定制批发，可根据您的需求进行Logo定制、包装定制、规格定制等。
                    请在询盘单中详细说明您的定制需求，供应商将为您提供专属方案。
                  </p>
                  <Link href="/customization">
                    <Button variant="outline" className="gap-2">
                      了解定制流程
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplier">
          {supplier && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
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
                    <Link href={`/suppliers/${supplier.id}`} className="text-xl font-semibold text-gray-900 hover:text-blue-700 mb-2">
                      {supplier.name}
                    </Link>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{supplier.location}</span>
                      {supplier.verified && (
                        <Badge className="bg-green-100 text-green-700">认证供应商</Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">{supplier.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-xs text-gray-500">成立年份</span>
                        <p className="font-medium">{supplier.yearEstablished}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">员工规模</span>
                        <p className="font-medium">{supplier.totalEmployees}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">响应时间</span>
                        <p className="font-medium">{supplier.responseTime}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">评分</span>
                        <p className="font-medium">{supplier.rating} ({supplier.reviewCount}评价)</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex gap-4">
                      <Button variant="outline" className="gap-2">
                        <Phone className="h-4 w-4" />
                        联系供应商
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Mail className="h-4 w-4" />
                        发送邮件
                      </Button>
                      <Link href={`/suppliers/${supplier.id}`}>
                        <Button className="gap-2">
                          查看详情
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}