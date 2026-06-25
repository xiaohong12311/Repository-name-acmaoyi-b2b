'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function SupplierJoinPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    businessType: '',
    productCategories: '',
    website: '',
    description: '',
    certifications: '',
  });

  const handleSubmit = () => {
    alert(t.joinSupplier.submitSuccess);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-3">{t.joinSupplier.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.joinSupplier.description}</p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{t.joinSupplier.formTitle}</CardTitle>
          <CardDescription>{t.joinSupplier.formDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">{t.joinSupplier.companyInfo}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.joinSupplier.companyName}</Label>
                <Input name="companyName" value={formData.companyName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>{t.joinSupplier.contactName}</Label>
                <Input name="contactName" value={formData.contactName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>{t.joinSupplier.email}</Label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>{t.joinSupplier.phone}</Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>{t.joinSupplier.country}</Label>
                <Select onValueChange={(value: string) => setFormData(prev => ({ ...prev, country: value }))}>
                  <SelectTrigger><SelectValue placeholder={t.joinSupplier.selectCountry} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="china">China</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="vietnam">Vietnam</SelectItem>
                    <SelectItem value="turkey">Turkey</SelectItem>
                    <SelectItem value="indonesia">Indonesia</SelectItem>
                    <SelectItem value="thailand">Thailand</SelectItem>
                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="other">{t.joinSupplier.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.joinSupplier.businessType}</Label>
                <Select onValueChange={(value: string) => setFormData(prev => ({ ...prev, businessType: value }))}>
                  <SelectTrigger><SelectValue placeholder={t.joinSupplier.selectType} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturer">{t.joinSupplier.manufacturer}</SelectItem>
                    <SelectItem value="trading">{t.joinSupplier.tradingCompany}</SelectItem>
                    <SelectItem value="both">{t.joinSupplier.both}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">{t.joinSupplier.productInfo}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t.joinSupplier.productCategories}</Label>
                <Input name="productCategories" value={formData.productCategories} onChange={handleChange} placeholder={t.joinSupplier.categoriesPlaceholder} />
              </div>
              <div className="space-y-2">
                <Label>{t.joinSupplier.website}</Label>
                <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
              </div>
              <div className="space-y-2">
                <Label>{t.joinSupplier.description}</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder={t.joinSupplier.companyDescriptionPlaceholder} />
              </div>
              <div className="space-y-2">
                <Label>{t.joinSupplier.certifications}</Label>
                <Input name="certifications" value={formData.certifications} onChange={handleChange} placeholder={t.joinSupplier.certPlaceholder} />
              </div>
            </div>
          </div>

          {/* Terms Dialog */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-sm text-gray-500">
              {t.joinSupplier.termsNote}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2 bg-blue-700 hover:bg-blue-800">
                  {t.joinSupplier.submitApplication}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.joinSupplier.confirmTitle}</DialogTitle>
                  <DialogDescription>{t.joinSupplier.confirmDescription}</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <p><strong>{t.joinSupplier.companyName}:</strong> {formData.companyName}</p>
                  <p><strong>{t.joinSupplier.contactName}:</strong> {formData.contactName}</p>
                  <p><strong>{t.joinSupplier.email}:</strong> {formData.email}</p>
                  <p><strong>{t.joinSupplier.businessType}:</strong> {formData.businessType}</p>
                  <p><strong>{t.joinSupplier.country}:</strong> {formData.country}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">{t.common.cancel}</Button>
                  <Button onClick={handleSubmit}>{t.joinSupplier.confirmSubmit}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-6">{t.joinSupplier.faqTitle}</h2>
        <div className="space-y-4">
          {[
            { q: t.joinSupplier.faq1Q, a: t.joinSupplier.faq1A },
            { q: t.joinSupplier.faq2Q, a: t.joinSupplier.faq2A },
            { q: t.joinSupplier.faq3Q, a: t.joinSupplier.faq3A },
            { q: t.joinSupplier.faq4Q, a: t.joinSupplier.faq4A },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
