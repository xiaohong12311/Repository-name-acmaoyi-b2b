'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFavorites, useSampleCart, useInquiry } from '@/hooks/use-b2b-store';
import { getProductById, getSupplierById } from '@/data/mock';
import { Heart, Trash2, ShoppingCart, MessageSquarePlus, Plus } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToSampleCart } = useSampleCart();
  const { addToInquiry } = useInquiry();
  const { t } = useLanguage();

  const handleAddAllToInquiry = () => {
    favorites.forEach(item => {
      const product = getProductById(item.productId);
      if (product) {
        addToInquiry(product, product.moq);
      }
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">{t.favorites.emptyTitle}</h1>
          <p className="text-gray-500 mb-8">
            {t.favorites.emptyDesc}
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              {t.favorites.browseProducts}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.favorites.title}</h1>
          <p className="text-gray-500">{t.favorites.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            {favorites.length} {t.favorites.items}
          </Badge>
          <Button variant="outline" className="gap-2" onClick={handleAddAllToInquiry}>
            <MessageSquarePlus className="h-4 w-4" />
            {t.favorites.addAllToInquiry}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => {
          const product = getProductById(item.productId);
          const supplier = product ? getSupplierById(product.supplierId) : null;
          
          if (!product) return null;

          const lowestPrice = product.tierPrices[product.tierPrices.length - 1]?.price || 0;
          const highestPrice = product.tierPrices[0]?.price || 0;

          return (
            <Card key={item.productId} className="group overflow-hidden hover:shadow-lg transition-all">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
                
                {/* Tags */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.sampleAvailable && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      {t.favorites.sampleAvailable}
                    </Badge>
                  )}
                  {product.customizationAvailable && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      {t.favorites.customizable}
                    </Badge>
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-red-500"
                  onClick={() => removeFromFavorites(item.productId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                {/* Supplier */}
                {supplier && (
                  <Link 
                    href={`/suppliers/${supplier.id}`}
                    className="text-xs text-gray-500 hover:text-blue-700 mb-2 block"
                  >
                    {supplier.name}
                  </Link>
                )}

                {/* Product Name */}
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium text-gray-900 hover:text-blue-700 line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                </Link>

                {/* MOQ */}
                <div className="text-xs text-gray-500 mb-3">
                  MOQ: {product.moq} {product.unit}
                </div>

                {/* Price */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">{t.favorites.price}</span>
                  <div className="text-right">
                    <span className="font-semibold text-blue-700 tabular-nums">
                      ${lowestPrice.toFixed(2)}
                    </span>
                    {lowestPrice < highestPrice && (
                      <span className="text-xs text-gray-400 ml-1">
                        {t.favorites.from}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {product.sampleAvailable && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1"
                      onClick={() => {
                        const specs: Record<string, string> = {};
                        product.specifications.forEach(s => {
                          specs[s.name] = s.value;
                        });
                        addToSampleCart(product, 1, specs);
                      }}
                    >
                      <ShoppingCart className="h-3 w-3" />
                      {t.favorites.addSample}
                    </Button>
                  )}
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 gap-1 bg-blue-700 hover:bg-blue-800"
                    onClick={() => addToInquiry(product, product.moq)}
                  >
                    <MessageSquarePlus className="h-3 w-3" />
                    {t.favorites.addInquiry}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
