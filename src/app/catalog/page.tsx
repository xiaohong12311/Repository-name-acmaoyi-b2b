'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockSuppliers, mockCategories } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Download,
  FileText,
  Building2,
  Package,
  Mail,
  Phone,
  Clock,
  Search,
  Filter,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

interface CatalogItem {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierLogo: string;
  catalogName: string;
  catalogUrl: string;
  fileSize: string;
  pages: number;
  categories: string[];
  lastUpdated: string;
}

// 模拟目录数据
const mockCatalogs: CatalogItem[] = mockSuppliers.map((supplier, index) => ({
  id: `catalog-${index}`,
  supplierId: supplier.id,
  supplierName: supplier.name,
  supplierLogo: supplier.logo,
  catalogName: `${supplier.name} 产品目录`,
  catalogUrl: '#',
  fileSize: ['2.5MB', '4.8MB', '3.2MB', '5.1MB'][index % 4],
  pages: [25, 48, 32, 51][index % 4],
  categories: supplier.mainProducts,
  lastUpdated: ['2024-03', '2024-04', '2024-02', '2024-04'][index % 4],
}));

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestForm, setRequestForm] = useState({
    email: '',
    phone: '',
    company: '',
  });

  const filteredCatalogs = mockCatalogs.filter(catalog => {
    if (searchQuery) {
      return catalog.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        catalog.catalogName.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (selectedCategory) {
      return catalog.categories.some(cat => cat.includes(selectedCategory));
    }
    return true;
  });

  const handleDownload = (catalog: CatalogItem) => {
    // 模拟下载
    alert(`开始下载：${catalog.catalogName}`);
  };

  const handleRequestCatalog = () => {
    setShowRequestDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-6">
            产品目录下载
          </Badge>
          <h1 className="text-4xl font-bold mb-6">
            获取产品目录
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8">
            下载供应商产品目录PDF，包含完整产品信息、阶梯价格、规格参数
            <br />
            方便离线查阅，便于采购决策
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 gap-2">
              <Download className="h-4 w-4" />
              下载全部目录
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={handleRequestRequestCatalog}>
              定制目录需求
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: mockCatalogs.length, label: '供应商目录' },
              { value: 'PDF', label: '目录格式' },
              { value: '免费', label: '下载费用' },
              { value: '实时更新', label: '更新频率' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-amber-700 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索供应商或目录..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
              >
                全部
              </Button>
              {mockCategories.slice(0, 5).map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              可下载目录 ({filteredCatalogs.length})
            </h2>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => filteredCatalogs.forEach(c => handleDownload(c))}>
              <Download className="h-4 w-4" />
              批量下载
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalogs.map(catalog => (
              <Card key={catalog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-4 flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shadow">
                      <Image
                        src={catalog.supplierLogo}
                        alt={catalog.supplierName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <Link 
                        href={`/suppliers/${catalog.supplierId}`}
                        className="font-semibold text-gray-900 hover:text-amber-700"
                      >
                        {catalog.supplierName}
                      </Link>
                      <div className="text-xs text-gray-500 mt-1">
                        更新于 {catalog.lastUpdated}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-amber-600" />
                      <span className="font-medium">{catalog.catalogName}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">格式</div>
                        <div className="font-medium text-sm">PDF</div>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">大小</div>
                        <div className="font-medium text-sm">{catalog.fileSize}</div>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">页数</div>
                        <div className="font-medium text-sm">{catalog.pages}</div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {catalog.categories.map(cat => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-amber-600 hover:bg-amber-700 gap-1"
                        onClick={() => handleDownload(catalog)}
                      >
                        <Download className="h-4 w-4" />
                        下载目录
                      </Button>
                      <Link href={`/suppliers/${catalog.supplierId}`}>
                        <Button size="sm" variant="outline">
                          查看供应商
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCatalogs.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">未找到匹配的目录</p>
            </div>
          )}
        </div>
      </section>

      {/* Platform Catalog */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            平台综合目录
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">B2B批发采购平台综合目录</h3>
                  <p className="text-blue-100 mb-4">
                    包含全平台100+供应商、5000+产品信息
                  </p>
                  <div className="flex gap-4 justify-center text-sm">
                    <Badge className="bg-white/20">PDF格式</Badge>
                    <Badge className="bg-white/20">约150页</Badge>
                    <Badge className="bg-white/20">15MB</Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {mockCategories.map(cat => (
                      <div key={cat.id} className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{cat.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button size="lg" className="w-full bg-blue-700 hover:bg-blue-800 gap-2">
                    <Download className="h-5 w-5" />
                    下载平台综合目录
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Request Custom Catalog */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              需要定制目录？
            </h2>
            <p className="text-gray-600 mb-8">
              如果您需要特定行业或特定供应商的产品目录，可以提交定制需求
            </p>
            <Button size="lg" variant="outline" className="gap-2" onClick={handleRequestCatalog}>
              <Mail className="h-5 w-5" />
              提交目录需求
            </Button>
          </div>
        </div>
      </section>

      {/* Request Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>定制目录需求</DialogTitle>
            <DialogDescription>
              请填写您的需求，我们将为您整理相关产品目录
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label className="mb-2 block">公司名称</Label>
              <Input 
                placeholder="请输入公司名称"
                value={requestForm.company}
                onChange={e => setRequestForm({...requestForm, company: e.target.value})}
              />
            </div>
            <div>
              <Label className="mb-2 block">邮箱</Label>
              <Input 
                type="email"
                placeholder="请输入邮箱地址"
                value={requestForm.email}
                onChange={e => setRequestForm({...requestForm, email: e.target.value})}
              />
            </div>
            <div>
              <Label className="mb-2 block">电话</Label>
              <Input 
                placeholder="请输入联系电话"
                value={requestForm.phone}
                onChange={e => setRequestForm({...requestForm, phone: e.target.value})}
              />
            </div>
            <div>
              <Label className="mb-2 block">需求说明</Label>
              <Input 
                placeholder="如：需要厨房用品类目录..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
              取消
            </Button>
            <Button onClick={() => setShowRequestDialog(false)}>
              提交需求
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function handleRequestRequestCatalog() {
  // This function is a placeholder
}