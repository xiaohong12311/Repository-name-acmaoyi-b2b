'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFavorites, useInquiry, useSampleCart } from '@/hooks/use-b2b-store';
import { mockProducts, getProductSupplier } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Trash2,
  MessageSquarePlus,
  ShoppingCart,
  MapPin,
} from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToInquiry } = useInquiry();
  const { addToSampleCart } = useSampleCart();

  const handleAddToInquiry = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      addToInquiry(product, product.moq);
    }
  };

  const handleAddToSampleCart = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product && product.sampleAvailable) {
      const specs: Record<string, string> = {};
      product.specifications.forEach(s => {
        specs[s.name] = s.value;
      });
      addToSampleCart(product, 1, specs);
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">收藏夹为空</h1>
          <p className="text-gray-500 mb-6">
            您还没有收藏任何产品，请先浏览产品目录
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              浏览产品
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">收藏夹</h1>
        <p className="text-gray-500">
          共 {favorites.length} 个收藏产品
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(fav => {
          const product = mockProducts.find(p => p.id === fav.productId);
          const supplier = getProductSupplier(fav.productId);
          
          return (
            <Card key={fav.productId} className="overflow-hidden">
              {/* Product Image */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <Link href={`/products/${fav.productId}`}>
                  <Image
                    src={fav.productImage}
                    alt={fav.productName}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
                
                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                  onClick={() => removeFromFavorites(fav.productId)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <CardContent className="p-4">
                {/* Supplier */}
                {supplier && (
                  <Link 
                    href={`/suppliers/${supplier.id}`}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-700 mb-2"
                  >
                    <MapPin className="h-3 w-3" />
                    {fav.supplierName}
                    {supplier.verified && (
                      <Badge variant="outline" className="ml-1 text-xs px-1 h-4">
                        认证
                      </Badge>
                    )}
                  </Link>
                )}

                {/* Product Name */}
                <Link href={`/products/${fav.productId}`}>
                  <h3 className="font-medium text-gray-900 hover:text-blue-700 line-clamp-2 mb-2">
                    {fav.productName}
                  </h3>
                </Link>

                {/* Price & MOQ */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-lg font-bold text-blue-700 tabular-nums">
                      ¥{fav.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">起</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    MOQ: {fav.moq}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 gap-1 bg-blue-700 hover:bg-blue-800"
                    onClick={() => handleAddToInquiry(fav.productId)}
                  >
                    <MessageSquarePlus className="h-3 w-3" />
                    加询盘
                  </Button>
                  
                  {product?.sampleAvailable && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1"
                      onClick={() => handleAddToSampleCart(fav.productId)}
                    >
                      <ShoppingCart className="h-3 w-3" />
                      申请样品
                    </Button>
                  )}
                </div>

                {/* Added Time */}
                <div className="mt-3 text-xs text-gray-400">
                  收藏于 {new Date(fav.addedAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg border p-6">
        <h3 className="font-semibold mb-4">快捷操作</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline"
            className="gap-2"
            onClick={() => {
              favorites.forEach(fav => {
                const product = mockProducts.find(p => p.id === fav.productId);
                if (product) {
                  addToInquiry(product, product.moq);
                }
              });
            }}
          >
            <MessageSquarePlus className="h-4 w-4" />
            全部加入询盘单
          </Button>
          
          <Button 
            variant="outline"
            className="gap-2"
            onClick={() => {
              favorites.forEach(fav => {
                const product = mockProducts.find(p => p.id === fav.productId);
                if (product && product.sampleAvailable) {
                  const specs: Record<string, string> = {};
                  product.specifications.forEach(s => {
                    specs[s.name] = s.value;
                  });
                  addToSampleCart(product, 1, specs);
                }
              });
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            全部申请样品
          </Button>
          
          <Link href="/products">
            <Button variant="outline" className="gap-2">
              继续浏览产品
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}