'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useInquiry } from '@/hooks/use-b2b-store';
import { getProductById, getSupplierById } from '@/data/mock';
import { Trash2, Plus, MessageSquarePlus, Send, Package, DollarSign, ChevronRight, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function InquiryPage() {
  const { inquiryItems, removeFromInquiry, updateQuantity, clearInquiry } = useInquiry();
  const { t } = useLanguage();
  const [targetPrice, setTargetPrice] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmitInquiry = async () => {
    alert(t.inquiry.submitSuccess);
    clearInquiry();
  };

  if (inquiryItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <MessageSquarePlus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t.inquiry.emptyTitle}</h1>
          <p className="text-muted-foreground mb-6">{t.inquiry.emptyDesc}</p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              {t.inquiry.browseProducts}
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
          <span className="text-foreground font-medium">{t.inquiry.title}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{t.inquiry.title}</h1>
            <p className="text-muted-foreground">{t.inquiry.subtitle}</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-0 gap-1">
            <Package className="h-3 w-3" />
            {inquiryItems.length} {t.inquiry.items}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inquiry Items */}
          <div className="lg:col-span-2">
            <Card className="bg-card shadow-card border-0">
              <CardContent className="p-0">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">{t.inquiry.targetPrice}</div>
                  <div className="col-span-2 text-center">Specs</div>
                  <div className="col-span-1"></div>
                </div>

                {inquiryItems.map((item) => {
                  const product = getProductById(item.productId);
                  const supplier = product ? getSupplierById(product.supplierId) : null;
                  if (!product) return null;

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
                            <p className="text-xs text-muted-foreground">{supplier.name}</p>
                          )}
                          <Badge variant="secondary" className="text-xs mt-1">SKU: {product.sku || product.id}</Badge>
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                          min={product.moq}
                          className="w-20 h-8 text-center text-sm"
                        />
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <div className="relative w-20">
                          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                          <Input className="pl-6 h-8 text-sm" placeholder="--" />
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <Input className="h-8 text-sm" placeholder="e.g. Size L" />
                      </div>

                      <div className="col-span-1 flex justify-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromInquiry(item.productId)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Additional Requirements */}
            <Card className="bg-card shadow-card border-0 mt-5">
              <CardContent className="p-5">
                <Label className="text-sm font-medium text-foreground mb-2 block">{t.inquiry.requirements}</Label>
                <Textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder={t.inquiry.requirementsPlaceholder}
                  rows={4}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-card shadow-card border-0 sticky top-24">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-foreground text-lg">{t.inquiry.details}</h3>

                <div>
                  <Label className="text-sm">{t.inquiry.companyName}</Label>
                  <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder={t.inquiry.companyNamePlaceholder} className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm">{t.inquiry.contactPerson}</Label>
                  <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder={t.inquiry.contactNamePlaceholder} className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm">{t.inquiry.email}</Label>
                  <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="your@email.com" className="mt-1" />
                </div>

                <div>
                  <Label className="text-sm">{t.inquiry.phone}</Label>
                  <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+1 (888) 888-8888" className="mt-1" />
                </div>

                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 text-amber-800 text-xs">
                  <Info className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{t.inquiry.responseTime}</span>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 gap-2" size="lg" onClick={handleSubmitInquiry}>
                  <Send className="h-4 w-4" />
                  {t.inquiry.sendInquiry}
                </Button>

                <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
                  {t.common.cancel}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
