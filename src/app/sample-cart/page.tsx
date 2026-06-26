'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useSampleCart } from '@/hooks/use-b2b-store';
import { getProductById, getSupplierById } from '@/data/mock';
import { ShoppingCart, Trash2, Plus, Package, Truck, CreditCard, ChevronRight, Info, Minus } from 'lucide-react';
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

  const totalItems = sampleCart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = sampleCart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.samplePrice || 0) * item.quantity;
  }, 0);

  if (sampleCart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t.sampleCart.emptyTitle}</h1>
          <p className="text-muted-foreground mb-6">{t.sampleCart.emptyDesc}</p>
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{t.sampleCart.title}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{t.sampleCart.title}</h1>
            <p className="text-muted-foreground">{t.sampleCart.subtitle}</p>
          </div>
          <Badge className="bg-emerald-50 text-emerald-700 border-0 gap-1">
            <Package className="h-3 w-3" />
            {sampleCart.length} {t.sampleCart.products}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <Card className="bg-card shadow-card border-0">
              <CardContent className="p-0">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">{t.sampleCart.samplePrice}</div>
                  <div className="col-span-2 text-center">{t.sampleCart.quantity}</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                  <div className="col-span-1"></div>
                </div>

                {sampleCart.map((item) => {
                  const product = getProductById(item.productId);
                  const supplier = product ? getSupplierById(product.supplierId) : null;
                  if (!product) return null;
                  const lineTotal = (product.samplePrice || 0) * item.quantity;

                  return (
                    <div key={item.productId} className="grid grid-cols-12 gap-4 px-5 py-4 items-center border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <div className="col-span-5 flex gap-3 items-center">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div className="min-w-0">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1 text-sm">{product.name}</h3>
                          </Link>
                          {supplier && (
                            <Link href={`/suppliers/${supplier.id}`} className="text-xs text-muted-foreground hover:text-primary">{supplier.name}</Link>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="font-medium text-foreground tabular-nums">${(product.samplePrice || 0).toFixed(2)}</span>
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center tabular-nums text-sm font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.productId, Math.min(5, item.quantity + 1))}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="font-semibold text-foreground tabular-nums">${lineTotal.toFixed(2)}</span>
                      </div>

                      <div className="col-span-1 flex justify-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromSampleCart(item.productId)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Notice */}
            <div className="flex items-start gap-2 mt-4 p-3 rounded-xl bg-amber-50 text-amber-800 text-sm">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{t.sampleCart.shippingNote}</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <Card className="bg-card shadow-card border-0 sticky top-24">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t.sampleCart.orderSummary}
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.sampleCart.totalItems}</span>
                    <span className="font-medium tabular-nums">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.sampleCart.estimatedCost}</span>
                    <span className="font-semibold text-foreground tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.sampleCart.shippingInfo}</span>
                    <span className="text-muted-foreground text-xs">{t.sampleCart.shippingNote}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Final pricing confirmed by supplier</p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary/90 gap-2" size="lg">
                      <ShoppingCart className="h-4 w-4" />
                      {t.sampleCart.requestSamples}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Order</DialogTitle>
                      <DialogDescription>Are you sure you want to submit this sample request?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>{t.common.cancel}</Button>
                      <Button onClick={handleCheckout}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Link href="/products" className="block text-center text-sm text-primary hover:underline">
                  {t.sampleCart.browseProducts}
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
