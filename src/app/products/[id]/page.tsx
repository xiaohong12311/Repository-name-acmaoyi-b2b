'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFavorites, useSampleCart, useInquiry } from '@/hooks/use-b2b-store';
import { getProductById, getSupplierById, getProductsBySupplier } from '@/data/mock';
import { ProductCard } from '@/components/product/product-card';
import { SupplierCard } from '@/components/supplier/supplier-card';
import { 
  Heart, ShoppingCart, MessageSquarePlus, Share2, 
  Package, Clock, Shield, Truck, Check, ChevronRight,
  ExternalLink, CreditCard
} from 'lucide-react';
import { ShopifyLinkButton } from '@/components/shopify/buy-button';
import { getShopifyProductHandle, shopifyConfig } from '@/lib/shopify/buy-button-config';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const product = getProductById(productId);
  const supplier = product ? getSupplierById(product.supplierId) : null;
  const relatedProducts = product ? getProductsBySupplier(product.supplierId).filter(p => p.id !== productId) : [];
  
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToSampleCart } = useSampleCart();
  const { addToInquiry } = useInquiry();
  
  const [quantity, setQuantity] = useState(product?.moq || 100);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/products">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(product.id);
  
  // Calculate price based on quantity
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
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-blue-700">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          {/* Image Thumbnails */}
          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <div 
                key={index}
                className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImageIndex === index ? 'border-blue-700' : 'border-gray-200 hover:border-gray-400'
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
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Supplier */}
          {supplier && (
            <Link 
              href={`/suppliers/${supplier.id}`}
              className="flex items-center gap-2 mb-4"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={supplier.logo}
                  alt={supplier.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="text-sm text-gray-600 hover:text-blue-700">{supplier.name}</span>
              {supplier.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {product.sampleAvailable && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Sample Available
              </Badge>
            )}
            {product.customizationAvailable && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Customizable
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-gray-50">
              <CardContent className="p-4 flex items-center gap-3">
                <Package className="h-5 w-5 text-blue-700" />
                <div>
                  <div className="text-xs text-gray-500">MOQ</div>
                  <div className="font-medium">{product.moq} {product.unit}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-700" />
                <div>
                  <div className="text-xs text-gray-500">Lead Time</div>
                  <div className="font-medium">{product.leadTime}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tier Pricing */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Tier Pricing</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {product.tierPrices.map((tier, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center p-4 ${
                      quantity >= tier.minQuantity && 
                      (tier.maxQuantity === null || quantity <= tier.maxQuantity)
                        ? 'bg-blue-50'
                        : ''
                    }`}
                  >
                    <div>
                      <span className="font-medium">{tier.minQuantity}</span>
                      {tier.maxQuantity ? (
                        <span className="text-gray-500"> - {tier.maxQuantity}</span>
                      ) : (
                        <span className="text-gray-500">+</span>
                      )}
                      <span className="text-gray-500 ml-1">{product.unit}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-blue-700 tabular-nums">
                        ${tier.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 ml-1">/ {product.unit}</span>
                      {tier.discount && (
                        <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                          {tier.discount}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quantity & Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Label className="text-gray-600">Quantity:</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                  min={product.moq}
                  className="w-32"
                />
                <span className="text-gray-500">{product.unit}</span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Estimated Total:</span>
                <span className="text-2xl font-bold text-blue-700 tabular-nums">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              {/* B2B Actions Row */}
              <div className="flex gap-3 mb-4">
                <Button
                  variant="outline"
                  size="lg"
                  className={`gap-2 ${isFav ? 'text-red-500 border-red-200' : ''}`}
                  onClick={() => isFav ? removeFromFavorites(product.id) : addToFavorites(product)}
                >
                  <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
                  {isFav ? 'Saved' : 'Save'}
                </Button>
                
                {product.sampleAvailable && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2"
                    onClick={handleAddToSampleCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add Sample
                  </Button>
                )}
                
                <Button 
                  size="lg" 
                  className="gap-2 bg-blue-700 hover:bg-blue-800"
                  onClick={handleAddToInquiry}
                >
                  <MessageSquarePlus className="h-5 w-5" />
                  Add to Inquiry
                </Button>
                
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Direct Purchase via Shopify */}
              {(() => {
                const shopifyHandle = getShopifyProductHandle(product.id);
                return shopifyHandle ? (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        Direct Purchase (PayPal & Credit Card supported)
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <ShopifyLinkButton
                        productHandle={shopifyHandle}
                        buttonText="Buy Now"
                        variant="default"
                        size="lg"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      />
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2"
                        onClick={() => window.open(`https://${shopifyConfig.shopDomain}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Store
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Click "Buy Now" to purchase directly on our Shopify store. 
                      Supports PayPal, VISA, MasterCard, and more.
                    </p>
                  </div>
                ) : null;
              })()}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="specs" className="mb-12">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specs">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{spec.name}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-blue-700 shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Shipping Method</h4>
                  <p className="text-gray-500">Sea freight, Air freight, Express available. Costs calculated separately.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-700 shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Delivery Time</h4>
                  <p className="text-gray-500">{product.leadTime} after order confirmation and payment.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-700 shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Quality Guarantee</h4>
                  <p className="text-gray-500">Quality inspection before shipment. Returns accepted for defective products.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customization">
          <Card>
            <CardContent className="p-6">
              {product.customizationAvailable ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    This product supports customization. Available options:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Logo Customization</h4>
                      <p className="text-sm text-gray-500">Print or engrave your logo on the product</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Packaging Customization</h4>
                      <p className="text-sm text-gray-500">Custom packaging design and materials</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Size Customization</h4>
                      <p className="text-sm text-gray-500">Adjust dimensions to your requirements</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Material Customization</h4>
                      <p className="text-sm text-gray-500">Choose from available material options</p>
                    </div>
                  </div>
                  <Link href="/customization">
                    <Button className="gap-2">
                      <MessageSquarePlus className="h-4 w-4" />
                      Request Customization
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-gray-500">This product does not support customization.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq">
          <Card>
            <CardContent className="p-6 space-y-4">
              {[
                { q: 'What is the minimum order quantity?', a: `MOQ is ${product.moq} ${product.unit}. Orders below MOQ may have higher pricing.` },
                { q: 'Can I request samples before bulk order?', a: product.sampleAvailable ? 'Yes, samples are available. Sample price: $' + (product.samplePrice || 0).toFixed(2) : 'No, samples are not available for this product.' },
                { q: 'What payment methods are accepted?', a: 'We accept T/T, L/C, PayPal, and Western Union.' },
                { q: 'Is quality inspection included?', a: 'Yes, all products undergo quality inspection before shipment.' },
              ].map((item, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h4 className="font-medium mb-2">{item.q}</h4>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Supplier Info */}
      {supplier && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Supplier Information</h2>
          <SupplierCard supplier={supplier} />
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Related Products from This Supplier</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}