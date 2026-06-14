'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSupplierJoin } from '@/hooks/use-b2b-store';
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
  Building2, Factory, Package, Users, Truck, Shield, Globe,
  Award, Clock, CheckCircle, ChevronRight
} from 'lucide-react';

export default function SupplierJoinPage() {
  const { submitApplication } = useSupplierJoin();
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    businessType: '',
    yearsInBusiness: '',
    productCategories: '',
    annualRevenue: '',
    employees: '',
    certifications: '',
    description: '',
    website: '',
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    submitApplication({
      companyName: formData.companyName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      address: formData.address,
      businessType: formData.businessType,
      yearsInBusiness: parseInt(formData.yearsInBusiness) || 0,
      productCategories: formData.productCategories.split(',').map(c => c.trim()),
      certifications: formData.certifications.split(',').map(c => c.trim()),
      description: formData.description,
      website: formData.website,
      documents: [],
      status: 'pending',
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your interest in joining our platform. 
            Our team will review your application and contact you within 2-3 business days.
          </p>
          <Button onClick={() => setSubmitted(false)}>
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
          Supplier Partnership
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Become a Verified Supplier
        </h1>
        <p className="text-gray-500 text-lg">
          Join our global B2B platform and connect with thousands of buyers worldwide.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="h-10 w-10 text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Global Reach</h3>
            <p className="text-sm text-gray-500">
              Access buyers from 100+ countries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-10 w-10 text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Verified Badge</h3>
            <p className="text-sm text-gray-500">
              Build trust with verification status
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="h-10 w-10 text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Product Showcase</h3>
            <p className="text-sm text-gray-500">
              Display your full product catalog
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-10 w-10 text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Direct Orders</h3>
            <p className="text-sm text-gray-500">
              Receive orders directly from buyers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Application Form */}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Supplier Application Form</CardTitle>
          <CardDescription>
            Fill in your company information below. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Company Information */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-700" />
              Company Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Your company name"
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(v) => setFormData({...formData, businessType: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="trading">Trading Company</SelectItem>
                    <SelectItem value="wholesaler">Wholesaler</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-700" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Person *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  placeholder="Full name"
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
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(v) => setFormData({...formData, country: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cn">China</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Street, City, State/Province, Postal Code"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Factory className="h-5 w-5 text-blue-700" />
              Business Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({...formData, yearsInBusiness: e.target.value})}
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  value={formData.employees}
                  onChange={(e) => setFormData({...formData, employees: e.target.value})}
                  placeholder="e.g., 50-100"
                />
              </div>
              <div>
                <Label htmlFor="annualRevenue">Annual Revenue (USD)</Label>
                <Select value={formData.annualRevenue} onValueChange={(v) => setFormData({...formData, annualRevenue: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1m">$0 - $1 Million</SelectItem>
                    <SelectItem value="1-5m">$1 - $5 Million</SelectItem>
                    <SelectItem value="5-10m">$5 - $10 Million</SelectItem>
                    <SelectItem value="10m+">$10 Million+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-700" />
              Product Categories
            </h3>
            <div>
              <Label htmlFor="productCategories">Main Product Categories *</Label>
              <Input
                id="productCategories"
                value={formData.productCategories}
                onChange={(e) => setFormData({...formData, productCategories: e.target.value})}
                placeholder="e.g., Electronics, Packaging, Textiles (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your main product categories separated by commas
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-700" />
              Certifications & Qualifications
            </h3>
            <div>
              <Label htmlFor="certifications">Certifications</Label>
              <Input
                id="certifications"
                value={formData.certifications}
                onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                placeholder="e.g., ISO 9001, CE, FDA (comma-separated)"
              />
            </div>
          </div>

          {/* Company Description */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Factory className="h-5 w-5 text-blue-700" />
              Company Description
            </h3>
            <div>
              <Label htmlFor="description">Describe Your Company *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Tell us about your company, products, and what makes you unique..."
                rows={5}
              />
            </div>
          </div>

          {/* Terms Dialog */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-sm text-gray-500">
              By submitting this application, you agree to our supplier terms and conditions.
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="gap-2 bg-blue-700 hover:bg-blue-800"
                >
                  Submit Application
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Application</DialogTitle>
                  <DialogDescription>
                    Please review your information before submitting.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <p><strong>Company:</strong> {formData.companyName}</p>
                  <p><strong>Contact:</strong> {formData.contactName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Business Type:</strong> {formData.businessType}</p>
                  <p><strong>Country:</strong> {formData.country}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSubmit}>Confirm & Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How long does the review process take?', a: 'Our team typically reviews applications within 2-3 business days. You will receive an email notification once your application is approved.' },
            { q: 'What are the requirements for verification?', a: 'To become verified, you need to provide business registration documents, product certifications, and pass our quality assessment.' },
            { q: 'Is there a fee to join the platform?', a: 'Basic supplier membership is free. Premium features like advanced analytics and priority listing are available in paid plans.' },
            { q: 'Can I update my information after joining?', a: 'Yes, you can update your company information, product catalog, and certifications anytime from your supplier dashboard.' },
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