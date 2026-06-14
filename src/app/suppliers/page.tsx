'use client';

import { useState } from 'react';
import { SupplierCard } from '@/components/supplier/supplier-card';
import { mockSuppliers, mockCategories } from '@/data/mock';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin } from 'lucide-react';

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // 获取所有地区
  const locations = [...new Set(mockSuppliers.map(s => s.location.split('省')[0] || s.location))];

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    if (searchQuery) {
      return supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (selectedLocation) {
      return supplier.location.includes(selectedLocation);
    }
    if (selectedCategory) {
      return supplier.mainProducts.some(p => p.includes(selectedCategory));
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">供应商目录</h1>
        <p className="text-gray-500">
          共 {filteredSuppliers.length} 家认证供应商，覆盖多个行业
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg border p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索供应商..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Location Filter */}
          <div className="flex gap-2">
            <Button
              variant={selectedLocation === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLocation('')}
            >
              全部地区
            </Button>
            {locations.slice(0, 4).map(loc => (
              <Button
                key={loc}
                variant={selectedLocation === loc ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLocation(loc)}
              >
                {loc}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge
            variant={selectedCategory === '' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory('')}
          >
            全部产品
          </Badge>
          {['餐具', 'LED', '包装', '工作服', '货架'].map(cat => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Suppliers Grid */}
      {filteredSuppliers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map(supplier => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的供应商</h3>
          <p className="text-gray-500 mb-4">尝试调整筛选条件</p>
          <Button onClick={() => {
            setSearchQuery('');
            setSelectedLocation('');
            setSelectedCategory('');
          }}>
            清除筛选
          </Button>
        </div>
      )}
    </div>
  );
}