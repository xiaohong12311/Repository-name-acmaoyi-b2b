'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Plus, Trash2, Save, Loader2, X, 
  GripVertical, ShoppingBag, Factory
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/admin/image-upload';

interface SectionItem {
  id: number;
  item_type: string;
  reference_id: number | null;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  link_url: string;
  icon_name: string;
  content: Record<string, unknown>;
  sort_order: number;
  is_visible: boolean;
}

interface Product {
  id: number;
  name: string;
  name_en: string;
  main_image_url: string;
  category: string;
  supplier_id: number;
}

interface Supplier {
  id: number;
  company_name: string;
  company_name_en: string;
  logo_url: string;
}

export default function SectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sectionId = Number(params.id);

  const [section, setSection] = useState<Record<string, unknown> | null>(null);
  const [items, setItems] = useState<SectionItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [addItemType, setAddItemType] = useState<'product' | 'supplier' | 'custom'>('product');

  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; admin_session=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    fetchData();
  }, [sectionId]);

  const fetchData = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const [sectionRes, itemsRes, productsRes, suppliersRes] = await Promise.all([
        fetch(`/api/admin/sections?id=${sectionId}`, { headers: { 'x-session': token } }),
        fetch(`/api/admin/section-items?section_id=${sectionId}`, { headers: { 'x-session': token } }),
        fetch('/api/admin/products?limit=100', { headers: { 'x-session': token } }),
        fetch('/api/admin/manage-suppliers', { headers: { 'x-session': token } }),
      ]);

      const [sectionData, itemsData, productsData, suppliersData] = await Promise.all([
        sectionRes.json(),
        itemsRes.json(),
        productsRes.json(),
        suppliersRes.json(),
      ]);

      if (sectionData.success) setSection(sectionData.section);
      if (itemsData.success) setItems(itemsData.items);
      if (productsData.success) setProducts(productsData.products);
      if (suppliersData.success) setSuppliers(suppliersData.suppliers);
    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async () => {
    if (!section) return;
    const token = getToken();
    if (!token) return;

    setSaving(true);
    try {
      await fetch('/api/admin/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify({
          id: section.id,
          title: section.title,
          subtitle: section.subtitle,
          content: section.content,
          image_url: section.image_url,
          background_color: section.background_color,
        }),
      });
    } catch (error) {
      console.error('Save section error:', error);
    } finally {
      setSaving(false);
    }
  };

  const addItem = async (type: string, referenceId?: number) => {
    const token = getToken();
    if (!token) return;

    const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.sort_order)) : 0;

    try {
      let itemData: Record<string, unknown> = {
        section_id: sectionId,
        item_type: type,
        sort_order: maxOrder + 1,
      };

      if (type === 'product' && referenceId) {
        const product = products.find(p => p.id === referenceId);
        if (product) {
          itemData = { ...itemData, reference_id: referenceId, title: product.name_en || product.name, image_url: product.main_image_url };
        }
      } else if (type === 'supplier' && referenceId) {
        const supplier = suppliers.find(s => s.id === referenceId);
        if (supplier) {
          itemData = { ...itemData, reference_id: referenceId, title: supplier.company_name_en || supplier.company_name, image_url: supplier.logo_url };
        }
      }

      await fetch('/api/admin/section-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify(itemData),
      });

      fetchData();
      setShowAddItem(false);
    } catch (error) {
      console.error('Add item error:', error);
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm('确定删除此项？')) return;
    const token = getToken();
    if (!token) return;

    try {
      await fetch(`/api/admin/section-items?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-session': token },
      });
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (error) {
      console.error('Delete item error:', error);
    }
  };

  const updateItem = async (item: SectionItem, updates: Partial<SectionItem>) => {
    const token = getToken();
    if (!token) return;

    try {
      await fetch('/api/admin/section-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify({ id: item.id, ...updates }),
      });
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, ...updates } : i));
    } catch (error) {
      console.error('Update item error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!section) {
    return <div className="text-center py-12 text-gray-500">板块不存在</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push('/admin/sections')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> 返回
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">编辑板块: {section.title as string}</h1>
          <p className="text-gray-500">{section.section_type as string}</p>
        </div>
        <Button onClick={saveSection} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          保存板块
        </Button>
      </div>

      {/* Section Basic Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">标题</label>
              <Input
                value={(section.title as string) || ''}
                onChange={(e) => setSection(prev => prev ? { ...prev, title: e.target.value } : prev)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">副标题</label>
              <Input
                value={(section.subtitle as string) || ''}
                onChange={(e) => setSection(prev => prev ? { ...prev, subtitle: e.target.value } : prev)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">背景颜色</label>
              <Input
                value={(section.background_color as string) || ''}
                onChange={(e) => setSection(prev => prev ? { ...prev, background_color: e.target.value } : prev)}
                placeholder="bg-blue-50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">背景图片</label>
              <ImageUpload
                value={(section.image_url as string) || ''}
                onChange={(url) => setSection(prev => prev ? { ...prev, image_url: url } : prev)}
                type="general"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">自定义内容 (JSON)</label>
            <Textarea
              value={JSON.stringify(section.content, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setSection(prev => prev ? { ...prev, content: parsed } : prev);
                } catch { /* ignore */ }
              }}
              rows={6}
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Section Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">板块内容项目</CardTitle>
          <Button size="sm" onClick={() => setShowAddItem(true)} className="gap-2">
            <Plus className="h-4 w-4" /> 添加项目
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {item.item_type === 'product' ? '产品' : item.item_type === 'supplier' ? '供应商' : '自定义'}
                    </Badge>
                    <span className="font-medium text-gray-900 truncate">{item.title || '无标题'}</span>
                  </div>
                  {item.item_type === 'product' && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <ShoppingBag className="h-3 w-3" />
                      产品 ID: {item.reference_id}
                    </div>
                  )}
                  {item.item_type === 'supplier' && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Factory className="h-3 w-3" />
                      供应商 ID: {item.reference_id}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1"
                    onClick={() => {
                      const newTitle = prompt('标题:', item.title);
                      if (newTitle !== null) updateItem(item, { title: newTitle });
                    }}
                  >
                    <Save className="h-3 w-3" /> 编辑
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>暂无内容项目</p>
                <p className="text-sm mt-1">点击"添加项目"来添加产品或供应商</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">添加内容项目</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddItem(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                variant={addItemType === 'product' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAddItemType('product')}
                className="gap-1"
              >
                <ShoppingBag className="h-4 w-4" /> 从产品选择
              </Button>
              <Button
                variant={addItemType === 'supplier' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAddItemType('supplier')}
                className="gap-1"
              >
                <Factory className="h-4 w-4" /> 从供应商选择
              </Button>
              <Button
                variant={addItemType === 'custom' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAddItemType('custom')}
              >
                自定义
              </Button>
            </div>

            {addItemType === 'product' && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {products.map(product => {
                  const alreadyAdded = items.some(i => i.item_type === 'product' && i.reference_id === product.id);
                  return (
                    <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <ShoppingBag className="h-4 w-4 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name_en || product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <Button
                        size="sm"
                        disabled={alreadyAdded}
                        onClick={() => addItem('product', product.id)}
                      >
                        {alreadyAdded ? '已添加' : '添加'}
                      </Button>
                    </div>
                  );
                })}
                {products.length === 0 && <p className="text-center text-gray-500 py-4">暂无产品，请先添加产品</p>}
              </div>
            )}

            {addItemType === 'supplier' && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {suppliers.map(supplier => {
                  const alreadyAdded = items.some(i => i.item_type === 'supplier' && i.reference_id === supplier.id);
                  return (
                    <div key={supplier.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Factory className="h-4 w-4 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{supplier.company_name_en || supplier.company_name}</p>
                      </div>
                      <Button
                        size="sm"
                        disabled={alreadyAdded}
                        onClick={() => addItem('supplier', supplier.id)}
                      >
                        {alreadyAdded ? '已添加' : '添加'}
                      </Button>
                    </div>
                  );
                })}
                {suppliers.length === 0 && <p className="text-center text-gray-500 py-4">暂无供应商</p>}
              </div>
            )}

            {addItemType === 'custom' && (
              <div className="space-y-3">
                <Input placeholder="标题" id="custom-title" />
                <Input placeholder="链接" id="custom-link" />
                <Button onClick={() => {
                  const title = (document.getElementById('custom-title') as HTMLInputElement).value;
                  const link = (document.getElementById('custom-link') as HTMLInputElement).value;
                  const token = getToken();
                  if (!token) return;
                  const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.sort_order)) : 0;
                  fetch('/api/admin/section-items', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-session': token },
                    body: JSON.stringify({
                      section_id: sectionId,
                      item_type: 'custom',
                      title,
                      link_url: link,
                      sort_order: maxOrder + 1,
                    }),
                  }).then(() => { fetchData(); setShowAddItem(false); });
                }}>
                  添加自定义项
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
