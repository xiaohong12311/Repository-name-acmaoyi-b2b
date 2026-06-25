'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSampleCart } from '@/hooks/use-b2b-store';
import { getProductById, getSupplierById } from '@/data/mock';
import { ShoppingCart, Trash2, Plus, Package, Truck, CreditCard } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function SampleCartPage() {
  const { sampleCart, removeFromSampleCart, updateQuantity, clearSampleCart } = useSampleCart();
  const { t } = useLanguage();

  const handleCheckout = () => {
    alert(t.sampleCart.submitSuccess);
    clearSampleCart();
  };

  // Calculate totals
  const totalItems = sampleCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = sampleCart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.samplePrice || 0) * item.quantity;
  }, 0);

  if (sampleCart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">{t.sampleCart.emptyTitle}</h1>
          <p className="text-gray-500 mb-8">
            {t.sampleCart.emptyDesc}
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              {t.sampleCart.browseProducts}
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
          <h1 className="text-2xl font-bold text-gray-900">{t.sampleCart.title}</h1>
          <p className="text-gray-500">{t.sampleCart.subtitle}</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          {sampleCart.length} {t.sampleCart.products}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sample Items List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {t.sampleCart.sampleItems}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {sampleCart.map((item) => {
                  const product = getProductById(item.productId);
                  const supplier = product ? getSupplierById(product.supplierId) : null;
                  
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="p-4 flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-medium text-gray-900 hover:text-blue-700 line-clamp-2 mb-1">
                            {product.name}
                          </h3>
                        </Link>
                        {supplier && (
                          <p className="text-sm text-gray-500 mb-2">{supplier.name}</p>
                        )}
                        
                        {/* Specifications */}
                        {Object.keys(item.specifications).length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {Object.entries(item.specifications).map(([key, value]) => (
                              <Badge key={key} variant="outline" className="text-xs">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-gray-500">{t.sampleCart.quantity}:</Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                            min={1}
                            max={5}
                            className="w-20"
                          />
                          <span className="text-xs text-gray-400">({t.sampleCart.maxPerProduct})</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <div className="text-sm text-gray-500 mb-1">{t.sampleCart.samplePrice}</div>
                        <div className="font-semibold text-blue-700 tabular-nums">
                          ${((product.samplePrice || 0) * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Remove */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromSampleCart(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t.sampleCart.orderSummary}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">{t.sampleCart.totalItems}</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">{t.sampleCart.estimatedCost}</span>
                <span className="font-semibold text-blue-700">${totalCost.toFixed(2)}</span>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-blue-700" />
                  <span className="font-medium text-blue-700">{t.sampleCart.shippingInfo}</span>
                </div>
                <p className="text-gray-600">
                  {t.sampleCart.shippingNote}
                </p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-600 hover:bg-green-700 gap-2" size="lg">
                    <ShoppingCart className="h-4 w-4" />
                    {t.sampleCart.requestSamples}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.sampleCart.confirmTitle}</DialogTitle>
                    <DialogDescription>
                      {t.sampleCart.confirmDesc.replace('{items}', String(totalItems)).replace('{products}', String(sampleCart.length)).replace('{cost}', `$${totalCost.toFixed(2)}`)}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-500">
                      {t.sampleCart.confirmNote}
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>{t.sampleCart.cancel}</Button>
                    <Button onClick={handleCheckout} className="bg-green-600 hover:bg-green-700">
                      {t.sampleCart.confirmRequest}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={clearSampleCart}
              >
                {t.sampleCart.clearCart}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
