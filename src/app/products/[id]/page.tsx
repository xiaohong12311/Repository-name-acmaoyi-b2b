'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFavorites, useSampleCart, useInquiry } from '@/hooks/use-b2b-store';
import { useProduct } from '@/hooks/use-products';
import { useSupplier } from '@/hooks/use-suppliers';
import { ProductCard } from '@/components/product/product-card';
import { 
  Heart, ShoppingCart, MessageSquarePlus, Share2, 
  Package, Clock, Shield, Truck, Check, ChevronRight,
  Star, ArrowRight, ShieldCheck, Minus, Plus, Loader2
} from 'lucide-react';

export default function ProductDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const productId = params.id as string;
  
  const { product, loading, error } = useProduct(productId);
  const { supplier } = useSupplier(product?.supplierId || null);
  
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToSampleCart } = useSampleCart();
  const { addToInquiry } = useInquiry();
  
  const [quantity, setQuantity] = useState(100);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTier, setSelectedTier] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading product...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Package className="h-9 w-9 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t.productDetail.notFound}</h1>
          <p className="text-muted-foreground mb-6">{t.productDetail.notFoundDesc}</p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90">{t.nav.products}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(product.id);
  
  const getPriceForQuantity = (qty: number) => {
    for (const tier of product.tierPrices) {
      if (tier.maxQuantity === null || qty <= tier.maxQuantity) {
        if (qty >= tier.minQuantity) {
          return tier.price;
        }
      }
    }
    return product.tierPrices[0].price;
  };

  const currentPrice = getPriceForQuantity(quantity);
  const totalAmount = currentPrice * quantity;

  const handleAddToSampleCart = () => {
    const specs: Record<string, string> = {};
    product.specifications.forEach(s => {
      specs[s.name] = s.value;
    });
    addToSampleCart(product, 1, specs);
  };

  const handleAddToInquiry = () => {
    addToInquiry(product, quantity);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-primary transition-colors">{t.nav.products}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4 shadow-card">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/40'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* SKU & Verified */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-muted-foreground">SKU: {product.sku || product.id}</span>
              {supplier?.verified && (
                <Badge className="bg-emerald-50 text-emerald-700 border-0 gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  {t.productDetail.verified}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-400 fill-amber-400/30'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">4.8</span>
              <span className="text-sm text-muted-foreground">(12 reviews)</span>
            </div>

            {/* Tier Pricing Table */}
            <Card className="bg-card shadow-card border-0 mb-5">
              <CardContent className="p-0">
                <div className="px-5 py-3 border-b border-border/50">
                  <h3 className="font-semibold text-foreground text-sm">Tier Pricing</h3>
                </div>
                <div className="divide-y divide-border/30">
                  {product.tierPrices.map((tier, index) => {
                    const isActive = quantity >= tier.minQuantity && 
                      (tier.maxQuantity === null || quantity <= tier.maxQuantity);
                    return (
                      <button 
                        key={index}
                        onClick={() => {
                          setSelectedTier(index);
                          setQuantity(tier.minQuantity);
                        }}
                        className={`w-full flex justify-between items-center px-5 py-3.5 transition-colors ${
                          isActive ? 'bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            isActive ? 'border-primary' : 'border-border'
                          }`}>
                            {isActive && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          <span className="text-sm text-foreground">
                            {tier.minQuantity}{tier.maxQuantity ? ` - ${tier.maxQuantity}` : '+'} {product.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary tabular-nums">${tier.price.toFixed(2)}</span>
                          <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                          {tier.discount && (
                            <Badge className="bg-emerald-50 text-emerald-700 border-0 text-xs">
                              {tier.discount}
                            </Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* MOQ */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg mb-5 text-sm font-medium">
              <Package className="h-4 w-4" />
              Minimum Order: {product.moq} {product.unit}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <Label className="text-sm text-muted-foreground">Quantity:</Label>
              <div className="flex items-center border border-border rounded-lg">
                <button 
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  onClick={() => setQuantity(Math.max(product.moq, quantity - product.moq))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                  min={product.moq}
                  className="w-24 h-10 text-center border-0 focus:ring-0 tabular-nums"
                />
                <button 
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  onClick={() => setQuantity(quantity + product.moq)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">{product.unit}</span>
              <span className="ml-auto text-lg font-bold text-primary tabular-nums">${totalAmount.toFixed(2)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 gap-2 flex-1"
                onClick={handleAddToInquiry}
              >
                <MessageSquarePlus className="h-5 w-5" />
                Send Inquiry
              </Button>
              {product.sampleAvailable && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-2"
                  onClick={handleAddToSampleCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Sample Cart
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className={`h-11 w-11 ${isFav ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                onClick={() => isFav ? removeFromFavorites(product.id) : addToFavorites(product)}
              >
                <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Supplier Card */}
            {supplier && (
              <Card className="bg-card shadow-card border-0">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted">
                        <Image
                          src={supplier.logo}
                          alt={supplier.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{supplier.name}</h4>
                          {supplier.verified && (
                            <ShieldCheck className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{supplier.country}</p>
                      </div>
                    </div>
                    <Link href={`/suppliers/${supplier.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        View Agent
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Specifications */}
        <Card className="bg-card shadow-card border-0 mb-12">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Product Specifications</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {product.specifications.map((spec, index) => (
                <div key={index} className={`flex justify-between p-3.5 rounded-lg ${index % 2 === 0 ? 'bg-muted/50' : 'bg-muted/30'}`}>
                  <span className="text-sm text-muted-foreground">{spec.name}</span>
                  <span className="text-sm font-medium text-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Quality */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          <Card className="bg-card shadow-card border-0">
            <CardContent className="p-5 flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Shipping</h4>
                <p className="text-sm text-muted-foreground">Sea/Air/Express available. {product.leadTime} delivery.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-card border-0">
            <CardContent className="p-5 flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Quality Guarantee</h4>
                <p className="text-sm text-muted-foreground">Pre-shipment inspection. Returns accepted for defects.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-card border-0">
            <CardContent className="p-5 flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Lead Time</h4>
                <p className="text-sm text-muted-foreground">{product.leadTime} after order confirmation.</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
