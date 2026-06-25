'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Palette, Package, Tag, Ruler, Boxes, FileText, 
  CheckCircle, Clock, Shield, ChevronRight, Sparkles
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function CustomizationPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    quantity: '',
    budget: '',
    customizationType: '',
    logoRequirement: '',
    packagingRequirement: '',
    sizeRequirement: '',
    materialRequirement: '',
    colorRequirement: '',
    additionalRequirements: '',
    deadline: '',
    contactName: '',
    email: '',
    phone: '',
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">{t.customization.submittedTitle}</h1>
          <p className="text-gray-500 mb-8">{t.customization.submittedDesc}</p>
          <Button onClick={() => setSubmitted(false)}>
            {t.customization.submitAnother}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <Badge variant="secondary" className="bg-purple-100 text-purple-700 mb-4">
          <Sparkles className="h-3 w-3 mr-1" />
          {t.customization.badge}
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t.customization.title}
        </h1>
        <p className="text-gray-500 text-lg">
          {t.customization.subtitle}
        </p>
      </div>

      {/* Customization Types */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 text-center">
            <Tag className="h-10 w-10 text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t.customization.logoPrinting}</h3>
            <p className="text-sm text-gray-500">{t.customization.logoPrintingDesc}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 text-center">
            <Package className="h-10 w-10 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t.customization.customPackaging}</h3>
            <p className="text-sm text-gray-500">{t.customization.customPackagingDesc}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 text-center">
            <Ruler className="h-10 w-10 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t.customization.sizeMod}</h3>
            <p className="text-sm text-gray-500">{t.customization.sizeModDesc}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 text-center">
            <Palette className="h-10 w-10 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t.customization.colorCustom}</h3>
            <p className="text-sm text-gray-500">{t.customization.colorCustomDesc}</p>
          </CardContent>
        </Card>
      </div>

      {/* Process */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-center">{t.customization.process}</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: 1, title: t.customization.step1Title, desc: t.customization.step1Desc },
            { step: 2, title: t.customization.step2Title, desc: t.customization.step2Desc },
            { step: 3, title: t.customization.step3Title, desc: t.customization.step3Desc },
            { step: 4, title: t.customization.step4Title, desc: t.customization.step4Desc },
          ].map((item) => (
            <Card key={item.step}>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <h4 className="font-medium mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{t.customization.formTitle}</CardTitle>
          <CardDescription>{t.customization.formDesc}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Product Information */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Boxes className="h-5 w-5 text-blue-700" />
              {t.customization.productInfo}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productName">{t.customization.productName} *</Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                  placeholder={t.customization.productNamePlaceholder}
                />
              </div>
              <div>
                <Label htmlFor="category">{t.customization.productCategory} *</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.customization.selectCategory} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="packaging">{t.customization.catPackaging}</SelectItem>
                    <SelectItem value="electronics">{t.customization.catElectronics}</SelectItem>
                    <SelectItem value="textiles">{t.customization.catTextiles}</SelectItem>
                    <SelectItem value="food">{t.customization.catFood}</SelectItem>
                    <SelectItem value="furniture">{t.customization.catFurniture}</SelectItem>
                    <SelectItem value="other">{t.customization.catOther}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">{t.customization.estQuantity} *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="e.g., 10000"
                />
              </div>
              <div>
                <Label htmlFor="budget">{t.customization.budgetRange} *</Label>
                <Select value={formData.budget} onValueChange={(v) => setFormData({...formData, budget: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.customization.selectBudget} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5k">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10-50k">$10,000 - $50,000</SelectItem>
                    <SelectItem value="50k+">$50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Customization Requirements */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-700" />
              {t.customization.customReqs}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customizationType">{t.customization.customType} *</Label>
                <Select value={formData.customizationType} onValueChange={(v) => setFormData({...formData, customizationType: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.customization.selectType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logo">{t.customization.typeLogo}</SelectItem>
                    <SelectItem value="packaging">{t.customization.typePackaging}</SelectItem>
                    <SelectItem value="partial">{t.customization.typePartial}</SelectItem>
                    <SelectItem value="full">{t.customization.typeFull}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deadline">{t.customization.expectedDeadline}</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="logoRequirement">{t.customization.logoReqs}</Label>
                <Textarea
                  id="logoRequirement"
                  value={formData.logoRequirement}
                  onChange={(e) => setFormData({...formData, logoRequirement: e.target.value})}
                  placeholder={t.customization.logoReqsPlaceholder}
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="packagingRequirement">{t.customization.packagingReqs}</Label>
                <Textarea
                  id="packagingRequirement"
                  value={formData.packagingRequirement}
                  onChange={(e) => setFormData({...formData, packagingRequirement: e.target.value})}
                  placeholder={t.customization.packagingReqsPlaceholder}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="sizeRequirement">{t.customization.sizeReqs}</Label>
                <Input
                  id="sizeRequirement"
                  value={formData.sizeRequirement}
                  onChange={(e) => setFormData({...formData, sizeRequirement: e.target.value})}
                  placeholder={t.customization.sizeReqsPlaceholder}
                />
              </div>
              <div>
                <Label htmlFor="materialRequirement">{t.customization.materialReqs}</Label>
                <Input
                  id="materialRequirement"
                  value={formData.materialRequirement}
                  onChange={(e) => setFormData({...formData, materialRequirement: e.target.value})}
                  placeholder={t.customization.materialReqsPlaceholder}
                />
              </div>
              <div>
                <Label htmlFor="colorRequirement">{t.customization.colorReqs}</Label>
                <Input
                  id="colorRequirement"
                  value={formData.colorRequirement}
                  onChange={(e) => setFormData({...formData, colorRequirement: e.target.value})}
                  placeholder={t.customization.colorReqsPlaceholder}
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-700" />
              {t.customization.additionalDetails}
            </h3>
            <div>
              <Label htmlFor="additionalRequirements">{t.customization.otherReqs}</Label>
              <Textarea
                id="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={(e) => setFormData({...formData, additionalRequirements: e.target.value})}
                placeholder={t.customization.otherReqsPlaceholder}
                rows={4}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-700" />
              {t.customization.contactInfo}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contactName">{t.customization.contactName} *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  placeholder={t.customization.contactNamePlaceholder}
                />
              </div>
              <div>
                <Label htmlFor="email">{t.customization.email} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="business@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">{t.customization.phone} *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
          </div>

          {/* Submit Dialog */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t.customization.responseTime}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  {t.customization.submitRequest}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.customization.confirmTitle}</DialogTitle>
                  <DialogDescription>
                    {t.customization.confirmDesc}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <p><strong>{t.customization.productName}:</strong> {formData.productName}</p>
                  <p><strong>{t.customization.productCategory}:</strong> {formData.category}</p>
                  <p><strong>{t.customization.estQuantity}:</strong> {formData.quantity}</p>
                  <p><strong>{t.customization.customType}:</strong> {formData.customizationType}</p>
                  <p><strong>{t.customization.budgetRange}:</strong> {formData.budget}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">{t.common.cancel}</Button>
                  <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">{t.customization.submitBtn}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-6">{t.customization.benefits}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-medium mb-2">{t.customization.qualityGuarantee}</h4>
                  <p className="text-sm text-gray-600">{t.customization.qualityGuaranteeDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-blue-700 shrink-0" />
                <div>
                  <h4 className="font-medium mb-2">{t.customization.fastTurnaround}</h4>
                  <p className="text-sm text-gray-600">{t.customization.fastTurnaroundDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
