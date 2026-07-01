'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Trash2, Edit3, Loader2, Save, X, 
  Search, ShoppingBag
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/admin/image-upload';

interface Product {
  id: number;
  name: string;
  name_en: string;
  sku: string;
  category: string;
  description: string;
  description_en: string;
  main_image_url: string;
  images: string[];
  tier_prices: Array<{ minQuantity: number; maxQuantity: number | null; price: number; discount?: string }>;
  moq: number;
  unit: string;
  specifications: Array<{ name: string; value: string }>;
  supplier_id: number | null;
  is_active: boolean;
}

interface Supplier {
  id: number;
  company_name: string;
  company_name_en: string;
}

const emptyProduct: Omit<Product, 'id'> = {
  name: '', name_en: '', sku: '', category: '',
  description: '', description_en: '', main_image_url: '',
  images: [], tier_prices: [{ minQuantity: 1, maxQuantity: null, price: 0 }],
  moq: 1, unit: 'pcs', specifications: [], supplier_id: null, is_active: true,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; admin_session=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const [prodRes, supRes] = await Promise.all([
        fetch('/api/admin/products?limit=100', { headers: { 'x-session': token } }),
        fetch('/api/admin/manage-suppliers', { headers: { 'x-session': token } }),
      ]);
      const [prodData, supData] = await Promise.all([prodRes.json(), supRes.json()]);
      if (prodData.success) setProducts(prodData.products);
      if (supData.success) setSuppliers(supData.suppliers);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify(newProduct),
      });
      setShowAddForm(false);
      setNewProduct(emptyProduct);
      fetchData();
    } catch (error) {
      console.error('Add product error:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateProduct = async () => {
    if (!editingProduct) return;
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify(editingProduct),
      });
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('确定删除此产品？')) return;
    const token = getToken();
    if (!token) return;
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE', headers: { 'x-session': token } });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const toggleActive = async (product: Product) => {
    const token = getToken();
    if (!token) return;
    try {
      await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify({ id: product.id, is_active: !product.is_active }),
      });
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, is_active: !p.is_active } : p));
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const getSupplierName = (supplierId: number | null) => {
    if (!supplierId) return '未分配';
    const s = suppliers.find(s => s.id === supplierId);
    return s ? (s.company_name_en || s.company_name) : `ID: ${supplierId}`;
  };

  const filteredProducts = products.filter(p =>
    !searchQuery || p.name.includes(searchQuery) || p.name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProductForm = ({ product, setProduct, onSave, onCancel }: {
    product: Omit<Product, 'id'> | Product;
    setProduct: (p: Omit<Product, 'id'> | Product) => void;
    onSave: () => void;
    onCancel: () => void;
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">产品名称 (中文)</label>
          <Input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">产品名称 (English)</label>
          <Input value={product.name_en} onChange={e => setProduct({ ...product, name_en: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">SKU</label>
          <Input value={product.sku} onChange={e => setProduct({ ...product, sku: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">分类</label>
          <Input value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Agent</label>
          <select
            value={product.supplier_id || ''}
            onChange={e => setProduct({ ...product, supplier_id: e.target.value ? Number(e.target.value) : null })}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">未分配</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.company_name_en || s.company_name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">描述 (中文)</label>
        <Textarea value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} rows={3} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">描述 (English)</label>
        <Textarea value={product.description_en} onChange={e => setProduct({ ...product, description_en: e.target.value })} rows={3} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">主图</label>
        <ImageUpload value={product.main_image_url} onChange={url => setProduct({ ...product, main_image_url: url })} type="product" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">MOQ</label>
          <Input type="number" value={product.moq} onChange={e => setProduct({ ...product, moq: Number(e.target.value) })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">单位</label>
          <Input value={product.unit} onChange={e => setProduct({ ...product, unit: e.target.value })} />
        </div>
      </div>
      {/* Tier Prices */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">阶梯价格</label>
        <div className="space-y-2">
          {product.tier_prices.map((tp, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-2 items-end">
              <div>
                <label className="text-xs text-gray-500">最小数量</label>
                <Input type="number" value={tp.minQuantity} onChange={e => {
                  const newTiers = [...product.tier_prices];
                  newTiers[idx] = { ...newTiers[idx], minQuantity: Number(e.target.value) };
                  setProduct({ ...product, tier_prices: newTiers });
                }} />
              </div>
              <div>
                <label className="text-xs text-gray-500">最大数量</label>
                <Input type="number" value={tp.maxQuantity || ''} placeholder="无上限" onChange={e => {
                  const newTiers = [...product.tier_prices];
                  newTiers[idx] = { ...newTiers[idx], maxQuantity: e.target.value ? Number(e.target.value) : null };
                  setProduct({ ...product, tier_prices: newTiers });
                }} />
              </div>
              <div>
                <label className="text-xs text-gray-500">单价 ($)</label>
                <Input type="number" step="0.01" value={tp.price} onChange={e => {
                  const newTiers = [...product.tier_prices];
                  newTiers[idx] = { ...newTiers[idx], price: Number(e.target.value) };
                  setProduct({ ...product, tier_prices: newTiers });
                }} />
              </div>
              <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                setProduct({ ...product, tier_prices: product.tier_prices.filter((_, i) => i !== idx) });
              }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => {
            const lastMax = product.tier_prices.length > 0 ? (product.tier_prices[product.tier_prices.length - 1].maxQuantity || 1000) + 1 : 1;
            setProduct({ ...product, tier_prices: [...product.tier_prices, { minQuantity: lastMax, maxQuantity: null, price: 0 }] });
          }}>
            <Plus className="h-4 w-4 mr-1" /> 添加价格档
          </Button>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={onSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          保存
        </Button>
        <Button variant="outline" onClick={onCancel}>取消</Button>
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="h-4 w-4" /> 添加产品
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索产品..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredProducts.map(product => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {product.main_image_url ? (
                    <img src={product.main_image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="w-8 h-8 m-auto text-gray-400 mt-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{product.name_en || product.name}</span>
                    <Badge variant={product.is_active ? 'default' : 'secondary'} className="text-xs">
                      {product.is_active ? '上架' : '下架'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{product.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{product.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Agent: {getSupplierName(product.supplier_id)} · MOQ: {product.moq} {product.unit}
                    {product.tier_prices.length > 0 && ` · 起: $${product.tier_prices[0].price}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleActive(product)}>
                    {product.is_active ? '下架' : '上架'}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => setEditingProduct(product)}>
                    <Edit3 className="h-3.5 w-3.5" /> 编辑
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteProduct(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">添加产品</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}><X className="h-4 w-4" /></Button>
            </div>
            <ProductForm product={newProduct} setProduct={setNewProduct as (p: Omit<Product, 'id'> | Product) => void} onSave={addProduct} onCancel={() => setShowAddForm(false)} />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">编辑产品</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditingProduct(null)}><X className="h-4 w-4" /></Button>
            </div>
            <ProductForm product={editingProduct} setProduct={setEditingProduct as (p: Omit<Product, 'id'> | Product) => void} onSave={updateProduct} onCancel={() => setEditingProduct(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
