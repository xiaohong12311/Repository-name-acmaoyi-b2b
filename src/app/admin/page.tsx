'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Package,
  Building2,
  MessageSquarePlus,
  ShoppingCart,
  Settings,
  FileText,
  Users,
  TrendingUp,
  Bell,
  Search,
  Edit,
  Trash2,
  Plus,
  Eye,
  Download,
  Upload,
  Save,
} from 'lucide-react';
import { mockProducts, mockSuppliers } from '@/data/mock';

// Admin Sidebar Component
function AdminSidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: Building2, label: 'Suppliers', href: '/admin/suppliers' },
    { icon: MessageSquarePlus, label: 'Inquiries', href: '/admin/inquiries' },
    { icon: ShoppingCart, label: 'Sample Orders', href: '/admin/samples' },
    { icon: FileText, label: 'Catalogs', href: '/admin/catalogs' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 font-bold text-lg">
            B2B
          </div>
          <div>
            <span className="font-semibold">Admin Panel</span>
            <div className="text-xs text-gray-400">Wholesale Platform</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active ? 'bg-blue-700' : 'hover:bg-gray-800'
                }`}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default function AdminPage() {
  const [siteConfig, setSiteConfig] = useState({
    siteName: 'B2B Wholesale Platform',
    siteDescription: 'Professional B2B wholesale platform connecting quality suppliers with buyers worldwide',
    contactEmail: 'support@b2b-platform.com',
    contactPhone: '+1 (888) 888-8888',
    address: '123 Business Street, San Francisco, CA 94102',
  });

  // Mock statistics
  const stats = {
    totalProducts: mockProducts.length,
    totalSuppliers: mockSuppliers.length,
    pendingInquiries: 15,
    sampleOrders: 8,
    monthlyRevenue: '$128,500',
    activeUsers: 156,
  };

  // Mock inquiries data
  const recentInquiries = [
    { id: 1, company: 'ABC Trading Co.', products: 3, status: 'pending', date: '2024-04-15' },
    { id: 2, company: 'XYZ Import Export', products: 5, status: 'processing', date: '2024-04-14' },
    { id: 3, company: 'DEF Buyers Inc.', products: 2, status: 'quoted', date: '2024-04-13' },
    { id: 4, company: 'GHI Wholesalers', products: 4, status: 'pending', date: '2024-04-12' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium">
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Package, label: 'Total Products', value: stats.totalProducts, color: 'blue' },
            { icon: Building2, label: 'Suppliers', value: stats.totalSuppliers, color: 'green' },
            { icon: MessageSquarePlus, label: 'Pending Inquiries', value: stats.pendingInquiries, color: 'amber' },
            { icon: ShoppingCart, label: 'Sample Orders', value: stats.sampleOrders, color: 'purple' },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-full bg-${stat.color}-100 text-${stat.color}-700 flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Inquiries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquarePlus className="h-5 w-5" />
                    Recent Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentInquiries.map(inquiry => (
                        <TableRow key={inquiry.id}>
                          <TableCell>{inquiry.company}</TableCell>
                          <TableCell>{inquiry.products} items</TableCell>
                          <TableCell>
                            <Badge variant={
                              inquiry.status === 'pending' ? 'secondary' :
                              inquiry.status === 'processing' ? 'default' :
                              'outline'
                            }>
                              {inquiry.status === 'pending' ? 'Pending' :
                               inquiry.status === 'processing' ? 'Processing' : 'Quoted'}
                            </Badge>
                          </TableCell>
                          <TableCell>{inquiry.date}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Monthly Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Monthly Revenue</span>
                      <span className="font-bold text-xl text-blue-700">{stats.monthlyRevenue}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Active Buyers</span>
                      <span className="font-bold text-xl text-green-700">{stats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Conversion Rate</span>
                      <span className="font-bold text-xl text-amber-700">32%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product List
                  </CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search products..." className="pl-9 w-64" />
                    </div>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>MOQ</TableHead>
                      <TableHead>Price Range</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map(product => {
                      const supplier = mockSuppliers.find(s => s.id === product.supplierId);
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                              <div className="font-medium line-clamp-1">{product.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{supplier?.name || '-'}</TableCell>
                          <TableCell>{product.moq} {product.unit}</TableCell>
                          <TableCell className="tabular-nums">
                            ${product.tierPrices[product.tierPrices.length - 1].price.toFixed(2)} - ${product.tierPrices[0].price.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                              {product.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Supplier List
                  </CardTitle>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Supplier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSuppliers.map(supplier => (
                      <TableRow key={supplier.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100">
                              <Image
                                src={supplier.logo}
                                alt={supplier.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div className="font-medium">{supplier.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{supplier.location}</TableCell>
                        <TableCell>{mockProducts.filter(p => p.supplierId === supplier.id).length}</TableCell>
                        <TableCell>{supplier.rating}</TableCell>
                        <TableCell>
                          <Badge variant={supplier.verified ? 'default' : 'secondary'}>
                            {supplier.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Basic Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Site Name</Label>
                    <Input 
                      value={siteConfig.siteName}
                      onChange={e => setSiteConfig({...siteConfig, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Site Description</Label>
                    <Textarea 
                      value={siteConfig.siteDescription}
                      onChange={e => setSiteConfig({...siteConfig, siteDescription: e.target.value})}
                      className="h-24"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Contact Email</Label>
                    <Input 
                      type="email"
                      value={siteConfig.contactEmail}
                      onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Contact Phone</Label>
                    <Input 
                      value={siteConfig.contactPhone}
                      onChange={e => setSiteConfig({...siteConfig, contactPhone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Address</Label>
                    <Textarea 
                      value={siteConfig.address}
                      onChange={e => setSiteConfig({...siteConfig, address: e.target.value})}
                      className="h-24"
                    />
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Logo & Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Logo & Images
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Site Logo</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload logo</p>
                      <p className="text-xs text-gray-400 mt-1">Recommended: 200x60px</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-2 block">Homepage Banner</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload banner</p>
                      <p className="text-xs text-gray-400 mt-1">Recommended: 1920x400px</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-2 block">SEO Settings</Label>
                    <div className="space-y-3">
                      <Input placeholder="Keywords (comma separated)" />
                      <Textarea placeholder="SEO description" className="h-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}