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

export default function CustomizationPage() {
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
    // In real implementation, this would submit to API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Custom Request Submitted!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your customization request. 
            Our team will analyze your requirements and provide a customized quote within 24-48 hours.
          </p>
          <Button onClick={() => setSubmitted(false)}>
            Submit Another Request
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
          Custom Wholesale
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Custom Product Manufacturing
        </h1>
        <p className="text-gray-500 text-lg">
          Get products customized to your exact specifications. 
          From logo printing to full OEM/ODM solutions.
        </p>
      </div>

      {/* Customization Types */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 text-center">
            <Tag className="h-10 w-10 text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Logo Printing</h3>
            <p className="text-sm text-gray-500">
              Print or engrave your brand logo
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 text-center">
            <Package className="h-10 w-10 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Custom Packaging</h3>
            <p className="text-sm text-gray-500">
              Design your own packaging
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 text-center">
            <Ruler className="h-10 w-10 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Size Modification</h3>
            <p className="text-sm text-gray-500">
              Adjust product dimensions
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 text-center">
            <Palette className="h-10 w-10 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Color Customization</h3>
            <p className="text-sm text-gray-500">
              Choose custom colors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Process */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-center">Customization Process</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Submit Request', desc: 'Fill in your requirements' },
            { step: 2, title: 'Quote Review', desc: 'Receive pricing within 48h' },
            { step: 3, title: 'Sample Production', desc: 'Approve samples before bulk' },
            { step: 4, title: 'Mass Production', desc: 'Production and delivery' },
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
          <CardTitle>Custom Request Form</CardTitle>
          <CardDescription>
            Describe your customization requirements. Our team will provide a tailored solution.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Product Information */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Boxes className="h-5 w-5 text-blue-700" />
              Product Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productName">Product Name *</Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                  placeholder="What product do you want to customize?"
                />
              </div>
              <div>
                <Label htmlFor="category">Product Category *</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="packaging">Packaging & Shipping</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="textiles">Textiles & Apparel</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="furniture">Furniture & Home</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Estimated Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="e.g., 10000"
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget Range (USD) *</Label>
                <Select value={formData.budget} onValueChange={(v) => setFormData({...formData, budget: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
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
              Customization Requirements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customizationType">Customization Type *</Label>
                <Select value={formData.customizationType} onValueChange={(v) => setFormData({...formData, customizationType: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logo">Logo Printing Only</SelectItem>
                    <SelectItem value="packaging">Custom Packaging</SelectItem>
                    <SelectItem value="partial">Partial OEM</SelectItem>
                    <SelectItem value="full">Full OEM/ODM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deadline">Expected Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="logoRequirement">Logo Requirements</Label>
                <Textarea
                  id="logoRequirement"
                  value={formData.logoRequirement}
                  onChange={(e) => setFormData({...formData, logoRequirement: e.target.value})}
                  placeholder="Describe your logo requirements (size, position, printing method...)"
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="packagingRequirement">Packaging Requirements</Label>
                <Textarea
                  id="packagingRequirement"
                  value={formData.packagingRequirement}
                  onChange={(e) => setFormData({...formData, packagingRequirement: e.target.value})}
                  placeholder="Describe packaging needs (material, design, labels...)"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="sizeRequirement">Size Requirements</Label>
                <Input
                  id="sizeRequirement"
                  value={formData.sizeRequirement}
                  onChange={(e) => setFormData({...formData, sizeRequirement: e.target.value})}
                  placeholder="e.g., 10x15cm, custom dimensions"
                />
              </div>
              <div>
                <Label htmlFor="materialRequirement">Material Requirements</Label>
                <Input
                  id="materialRequirement"
                  value={formData.materialRequirement}
                  onChange={(e) => setFormData({...formData, materialRequirement: e.target.value})}
                  placeholder="e.g., PLA, recyclable paper"
                />
              </div>
              <div>
                <Label htmlFor="colorRequirement">Color Requirements</Label>
                <Input
                  id="colorRequirement"
                  value={formData.colorRequirement}
                  onChange={(e) => setFormData({...formData, colorRequirement: e.target.value})}
                  placeholder="e.g., Navy blue, custom Pantone"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-700" />
              Additional Details
            </h3>
            <div>
              <Label htmlFor="additionalRequirements">Other Requirements</Label>
              <Textarea
                id="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={(e) => setFormData({...formData, additionalRequirements: e.target.value})}
                placeholder="Any other specific requirements, certifications needed, quality standards..."
                rows={4}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-700" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="business@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
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
              Response within 24-48 hours
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  Submit Custom Request
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Submission</DialogTitle>
                  <DialogDescription>
                    Please review your customization request.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <p><strong>Product:</strong> {formData.productName}</p>
                  <p><strong>Category:</strong> {formData.category}</p>
                  <p><strong>Quantity:</strong> {formData.quantity}</p>
                  <p><strong>Customization:</strong> {formData.customizationType}</p>
                  <p><strong>Budget:</strong> {formData.budget}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-6">Customization Benefits</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-medium mb-2">Quality Guarantee</h4>
                  <p className="text-sm text-gray-600">
                    All customized products undergo quality inspection before shipment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-blue-700 shrink-0" />
                <div>
                  <h4 className="font-medium mb-2">Fast Turnaround</h4>
                  <p className="text-sm text-gray-600">
                    Sample production within 7-10 days, bulk orders based on quantity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}