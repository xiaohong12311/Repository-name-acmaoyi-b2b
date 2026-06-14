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

// 管理侧边栏组件
function AdminSidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: '仪表盘', href: '/admin', active: true },
    { icon: Package, label: '产品管理', href: '/admin/products' },
    { icon: Building2, label: '供应商管理', href: '/admin/suppliers' },
    { icon: MessageSquarePlus, label: '询盘管理', href: '/admin/inquiries' },
    { icon: ShoppingCart, label: '样品订单', href: '/admin/samples' },
    { icon: FileText, label: '目录管理', href: '/admin/catalogs' },
    { icon: Settings, label: '网站设置', href: '/admin/settings' },
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
            <span className="font-semibold">后台管理</span>
            <div className="text-xs text-gray-400">批发采购平台</div>
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
    siteName: 'B2B批发采购平台',
    siteDescription: '专业的B2B批发采购平台，连接优质供应商与采购商',
    contactEmail: 'support@b2b-platform.com',
    contactPhone: '400-888-8888',
    address: '浙江省杭州市滨江区网商路599号',
  });

  // 模拟统计数据
  const stats = {
    totalProducts: mockProducts.length,
    totalSuppliers: mockSuppliers.length,
    pendingInquiries: 15,
    sampleOrders: 8,
    monthlyRevenue: '¥128,500',
    activeUsers: 156,
  };

  // 模拟询盘数据
  const recentInquiries = [
    { id: 1, company: 'ABC贸易公司', products: 3, status: 'pending', date: '2024-04-15' },
    { id: 2, company: 'XYZ进出口', products: 5, status: 'processing', date: '2024-04-14' },
    { id: 3, company: 'DEF采购商', products: 2, status: 'quoted', date: '2024-04-13' },
    { id: 4, company: 'GHI批发商', products: 4, status: 'pending', date: '2024-04-12' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 侧边栏 */}
      <AdminSidebar />
      
      {/* 主内容区 */}
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
            <p className="text-gray-500">欢迎回来，管理员</p>
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
              <span className="text-sm font-medium">管理员</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Package, label: '产品总数', value: stats.totalProducts, color: 'blue' },
            { icon: Building2, label: '供应商数量', value: stats.totalSuppliers, color: 'green' },
            { icon: MessageSquarePlus, label: '待处理询盘', value: stats.pendingInquiries, color: 'amber' },
            { icon: ShoppingCart, label: '样品订单', value: stats.sampleOrders, color: 'purple' },
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
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="products">产品管理</TabsTrigger>
            <TabsTrigger value="suppliers">供应商管理</TabsTrigger>
            <TabsTrigger value="settings">网站设置</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Inquiries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquarePlus className="h-5 w-5" />
                    最近询盘
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>公司</TableHead>
                        <TableHead>产品数</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>日期</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentInquiries.map(inquiry => (
                        <TableRow key={inquiry.id}>
                          <TableCell>{inquiry.company}</TableCell>
                          <TableCell>{inquiry.products}件</TableCell>
                          <TableCell>
                            <Badge variant={
                              inquiry.status === 'pending' ? 'secondary' :
                              inquiry.status === 'processing' ? 'default' :
                              'outline'
                            }>
                              {inquiry.status === 'pending' ? '待处理' :
                               inquiry.status === 'processing' ? '处理中' : '已报价'}
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
                    本月数据
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">月成交额</span>
                      <span className="font-bold text-xl text-blue-700">{stats.monthlyRevenue}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">活跃采购商</span>
                      <span className="font-bold text-xl text-green-700">{stats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">询盘转化率</span>
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
                    产品列表
                  </CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="搜索产品..." className="pl-9 w-64" />
                    </div>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      添加产品
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>产品</TableHead>
                      <TableHead>供应商</TableHead>
                      <TableHead>MOQ</TableHead>
                      <TableHead>价格区间</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="w-24">操作</TableHead>
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
                            ¥{product.tierPrices[0].price.toFixed(2)} - ¥{product.tierPrices[product.tierPrices.length - 1].price.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                              {product.status === 'active' ? '上架' : '下架'}
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
                    供应商列表
                  </CardTitle>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    添加供应商
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>供应商</TableHead>
                      <TableHead>所在地</TableHead>
                      <TableHead>产品数</TableHead>
                      <TableHead>评分</TableHead>
                      <TableHead>认证</TableHead>
                      <TableHead className="w-24">操作</TableHead>
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
                            {supplier.verified ? '已认证' : '待认证'}
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
                    基本设置
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">网站名称</Label>
                    <Input 
                      value={siteConfig.siteName}
                      onChange={e => setSiteConfig({...siteConfig, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">网站描述</Label>
                    <Textarea 
                      value={siteConfig.siteDescription}
                      onChange={e => setSiteConfig({...siteConfig, siteDescription: e.target.value})}
                      className="h-24"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">联系邮箱</Label>
                    <Input 
                      type="email"
                      value={siteConfig.contactEmail}
                      onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">联系电话</Label>
                    <Input 
                      value={siteConfig.contactPhone}
                      onChange={e => setSiteConfig({...siteConfig, contactPhone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">公司地址</Label>
                    <Textarea 
                      value={siteConfig.address}
                      onChange={e => setSiteConfig({...siteConfig, address: e.target.value})}
                      className="h-24"
                    />
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    保存设置
                  </Button>
                </CardContent>
              </Card>

              {/* Logo & Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Logo与图片设置
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">网站Logo</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">点击上传Logo</p>
                      <p className="text-xs text-gray-400 mt-1">建议尺寸 200x60px</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-2 block">首页Banner</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">点击上传Banner图片</p>
                      <p className="text-xs text-gray-400 mt-1">建议尺寸 1920x400px</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-2 block">SEO设置</Label>
                    <div className="space-y-3">
                      <Input placeholder="关键词（逗号分隔）" />
                      <Textarea placeholder="SEO描述" className="h-24" />
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