'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product/product-card';
import { mockProducts, mockCategories } from '@/data/mock';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [moqRange, setMoqRange] = useState([0, 1000]);
  const [showSampleOnly, setShowSampleOnly] = useState(false);
  const [showCustomOnly, setShowCustomOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // 过滤和排序产品
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // 搜索过滤
    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 分类过滤
    if (selectedCategory) {
      products = products.filter(p => {
        const category = mockCategories.find(c => c.slug === selectedCategory);
        return category ? p.categoryId === category.id : true;
      });
    }

    // MOQ过滤
    products = products.filter(p => 
      p.moq >= moqRange[0] && p.moq <= moqRange[1]
    );

    // 样品过滤
    if (showSampleOnly) {
      products = products.filter(p => p.sampleAvailable);
    }

    // 定制过滤
    if (showCustomOnly) {
      products = products.filter(p => p.customizationAvailable);
    }

    // 排序
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.tierPrices[0]?.price - b.tierPrices[0]?.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.tierPrices[0]?.price - a.tierPrices[0]?.price);
        break;
      case 'moq-low':
        products.sort((a, b) => a.moq - b.moq);
        break;
      case 'moq-high':
        products.sort((a, b) => b.moq - a.moq);
        break;
    }

    return products;
  }, [searchQuery, selectedCategory, moqRange, showSampleOnly, showCustomOnly, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMoqRange([0, 1000]);
    setShowSampleOnly(false);
    setShowCustomOnly(false);
    setSortBy('default');
  };

  const hasActiveFilters = searchQuery || selectedCategory || showSampleOnly || showCustomOnly || 
    moqRange[0] !== 0 || moqRange[1] !== 1000;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">产品目录</h1>
        <p className="text-gray-500">
          共 {filteredProducts.length} 件批发产品，阶梯价格清晰展示
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">筛选条件</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                  清除全部
                </Button>
              )}
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索产品..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Categories */}
            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories">
                <AccordionTrigger className="text-sm font-medium py-2">
                  产品分类
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === '' ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => setSelectedCategory('')}
                    >
                      全部分类
                    </Button>
                    {mockCategories.map(cat => (
                      <Button
                        key={cat.id}
                        variant={selectedCategory === cat.slug ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => setSelectedCategory(cat.slug)}
                      >
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* MOQ Range */}
            <Accordion type="single" collapsible defaultValue="moq">
              <AccordionItem value="moq">
                <AccordionTrigger className="text-sm font-medium py-2">
                  MOQ范围
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Slider
                      value={moqRange}
                      onValueChange={setMoqRange}
                      max={1000}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{moqRange[0]} 件</span>
                      <span>{moqRange[1]} 件</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Features */}
            <Accordion type="single" collapsible defaultValue="features">
              <AccordionItem value="features">
                <AccordionTrigger className="text-sm font-medium py-2">
                  产品特性
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showSampleOnly}
                        onChange={e => setShowSampleOnly(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">可申请样品</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCustomOnly}
                        onChange={e => setShowCustomOnly(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">支持定制</span>
                    </label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-lg border p-3">
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <div className="flex gap-2">
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1">
                      {mockCategories.find(c => c.slug === selectedCategory)?.name}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
                    </Badge>
                  )}
                  {showSampleOnly && (
                    <Badge variant="secondary" className="gap-1">
                      可申请样品
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setShowSampleOnly(false)} />
                    </Badge>
                  )}
                  {showCustomOnly && (
                    <Badge variant="secondary" className="gap-1">
                      支持定制
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setShowCustomOnly(false)} />
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">默认排序</SelectItem>
                <SelectItem value="price-low">价格从低到高</SelectItem>
                <SelectItem value="price-high">价格从高到低</SelectItem>
                <SelectItem value="moq-low">MOQ从低到高</SelectItem>
                <SelectItem value="moq-high">MOQ从高到高</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的产品</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或搜索关键词</p>
              <Button onClick={clearFilters}>清除筛选</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}