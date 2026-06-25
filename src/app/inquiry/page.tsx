'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useInquiry } from '@/hooks/use-b2b-store';
import type { InquiryItem } from '@/types';
import { mockProducts, getProductById, getSupplierById } from '@/data/mock';
import { Trash2, Plus, MessageSquarePlus, Send, Calendar, Package, DollarSign } from 'lucide-react';
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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <MessageSquarePlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">{t.inquiry.emptyTitle}</h1>
          <p className="text-gray-500 mb-8">
            {t.inquiry.emptyDesc}
          </p>
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.inquiry.title}</h1>
          <p className="text-gray-500">{t.inquiry.subtitle}</p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          {inquiryItems.length} {t.inquiry.items}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Inquiry Items List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {t.inquiry.productList}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {inquiryItems.map((item) => {
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
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            MOQ: {product.moq} {product.unit}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Lead: {product.leadTime}
                          </Badge>
                        </div>

                        {/* Quantity Input */}
                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-gray-500">{t.inquiry.quantity}:</Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                            min={product.moq}
                            className="w-24"
                          />
                          <span className="text-sm text-gray-500">{product.unit}</span>
                        </div>
                      </div>

                      {/* Price Info */}
                      <div className="text-right shrink-0">
                        <div className="text-sm text-gray-500 mb-1">{t.inquiry.estPrice}</div>
                        <div className="font-semibold text-blue-700 tabular-nums">
                          ${((product.tierPrices[product.tierPrices.length - 1]?.price || 0) * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromInquiry(item.productId)}
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

        {/* Inquiry Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {t.inquiry.details}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">{t.inquiry.companyName}</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={t.inquiry.companyNamePlaceholder}
                />
              </div>

              <div>
                <Label htmlFor="contactName">{t.inquiry.contactPerson}</Label>
                <Input
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={t.inquiry.contactNamePlaceholder}
                />
              </div>

              <div>
                <Label htmlFor="contactEmail">{t.inquiry.email}</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">{t.inquiry.phone}</Label>
                <Input
                  id="contactPhone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 (888) 888-8888"
                />
              </div>

              <div>
                <Label htmlFor="targetPrice">{t.inquiry.targetPrice}</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="targetPrice"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder={t.inquiry.targetPricePlaceholder}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">{t.inquiry.requirements}</Label>
                <Textarea
                  id="requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder={t.inquiry.requirementsPlaceholder}
                  rows={4}
                />
              </div>

              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 gap-2"
                size="lg"
                onClick={handleSubmitInquiry}
              >
                <Send className="h-4 w-4" />
                {t.inquiry.sendInquiry}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                {t.inquiry.responseTime}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
