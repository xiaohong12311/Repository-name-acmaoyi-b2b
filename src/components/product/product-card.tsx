'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites, useSampleCart, useInquiry } from '@/hooks/use-b2b-store';
import type { Product } from '@/types';
import { Heart, MessageSquarePlus, ShoppingCart, Check, MapPin } from 'lucide-react';
import { getProductSupplier } from '@/data/mock';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  showTierPrices?: boolean;
}

export function ProductCard({ product, showTierPrices = true }: ProductCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToSampleCart } = useSampleCart();
  const { addToInquiry } = useInquiry();
  
  const supplier = getProductSupplier(product.id);
  const isFav = isFavorite(product.id);

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToSampleCart = () => {
    if (product.sampleAvailable) {
      const specs: Record<string, string> = {};
      product.specifications.forEach(s => {
        specs[s.name] = s.value;
      });
      addToSampleCart(product, 1, specs);
    }
  };

  const handleAddToInquiry = () => {
    addToInquiry(product, product.moq);
  };

  // Calculate lowest and highest price
  const lowestPrice = product.tierPrices[product.tierPrices.length - 1]?.price || 0;
  const highestPrice = product.tierPrices[0]?.price || 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || product.mainImage || '/product-1.jpg'}
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
              Sample Available
            </Badge>
          )}
          {product.customizationAvailable && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
              Customizable
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white",
            isFav && "text-red-500"
          )}
          onClick={handleToggleFavorite}
        >
          <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
        </Button>
      </div>

      <CardContent className="p-4">
        {/* Supplier Info */}
        {supplier && (
          <Link 
            href={`/suppliers/${supplier.id}`}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-700 mb-2"
          >
            <MapPin className="h-3 w-3" />
            {supplier.name}
            {supplier.verified && (
              <Badge variant="outline" className="ml-1 text-xs px-1 h-4">
                Verified
              </Badge>
            )}
          </Link>
        )}

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-blue-700 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* MOQ Info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>MOQ: {product.moq} {product.unit}</span>
          <span>Lead Time: {product.leadTime}</span>
        </div>

        {/* Tier Pricing Display */}
        {showTierPrices && (
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Wholesale Price</span>
              <div className="text-right">
                <span className="font-semibold text-blue-700 text-lg tabular-nums">
                  $${lowestPrice.toFixed(2)}
                </span>
                {lowestPrice < highestPrice && (
                  <span className="text-xs text-gray-400 ml-1">
                    from (Save {((highestPrice - lowestPrice) / highestPrice * 100).toFixed(0)}%)
                  </span>
                )}
              </div>
            </div>
            
            {/* Tier Price Table */}
            <div className="space-y-1">
              {product.tierPrices.slice(0, 3).map((tier, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center text-xs py-1 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-500">
                    {tier.minQuantity}{tier.maxQuantity ? `-${tier.maxQuantity}` : '+'} {product.unit}
                  </span>
                  <span className="font-medium text-gray-700 tabular-nums">
                    $${tier.price.toFixed(2)}/{product.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {product.sampleAvailable && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 gap-1"
              onClick={handleAddToSampleCart}
            >
              <ShoppingCart className="h-3 w-3" />
              Add Sample
            </Button>
          )}
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 gap-1 bg-blue-700 hover:bg-blue-800"
            onClick={handleAddToInquiry}
          >
            <MessageSquarePlus className="h-3 w-3" />
            Add Inquiry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}