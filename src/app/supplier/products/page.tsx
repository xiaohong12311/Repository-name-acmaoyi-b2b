'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Package,
  LogOut,
  Loader2,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  main_image: string | null;
  moq: number;
  unit: string;
  tier_prices: Array<{ min_qty: number; max_qty: number | null; price: number }>;
  is_active: boolean;
  created_at: string;
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  main_image: string;
  moq: number;
  unit: string;
  tier_prices: string; // JSON string
  shopify_handle: string;
}

export default function SupplierProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    main_image: '',
    moq: 1,
    unit: 'piece',
    tier_prices: '',
    shopify_handle: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('supplier_session');
    if (!session) {
      router.push('/supplier/login');
      return;
    }
    fetchProducts(session);
  }, [router]);

  const getToken = () => localStorage.getItem('supplier_session') || '';

  const fetchProducts = async (token: string) => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      
      const response = await fetch(`/api/supplier/products?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products || []);
      } else {
        console.error('Fetch error:', data.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchProducts(getToken());
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      main_image: '',
      moq: 1,
      unit: 'piece',
      tier_prices: '[{"min_qty":1,"max_qty":100,"price":10},{"min_qty":101,"max_qty":null,"price":8}]',
      shopify_handle: '',
    });
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category || '',
      main_image: product.main_image || '',
      moq: product.moq,
      unit: product.unit,
      tier_prices: JSON.stringify(product.tier_prices || []),
      shopify_handle: '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert('Product name is required');
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      
      let tierPrices;
      try {
        tierPrices = JSON.parse(formData.tier_prices);
      } catch {
        tierPrices = [];
      }

      const payload = {
        ...(editingProduct ? { id: editingProduct.id } : {}),
        name: formData.name,
        description: formData.description,
        category: formData.category,
        main_image: formData.main_image,
        moq: formData.moq,
        unit: formData.unit,
        tier_prices: tierPrices,
        shopify_handle: formData.shopify_handle,
      };

      const url = '/api/supplier/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setDialogOpen(false);
        fetchProducts(token);
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = getToken();
      const response = await fetch(`/api/supplier/products?id=${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        fetchProducts(token);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete product');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('supplier_session');
    localStorage.removeItem('supplier_email');
    router.push('/supplier/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/supplier/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Product Management</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Add */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No products yet</p>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                {product.main_image ? (
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={product.main_image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant={product.is_active ? 'default' : 'secondary'}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  {product.category && (
                    <p className="text-sm text-gray-500">{product.category}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {product.description || 'No description'}
                  </p>
                  <p className="text-sm font-medium">
                    MOQ: {product.moq} {product.unit}
                  </p>
                  {product.tier_prices && product.tier_prices.length > 0 && (
                    <p className="text-sm text-green-600">
                      Price: ${product.tier_prices[0].price} - ${product.tier_prices[product.tier_prices.length - 1].price}
                    </p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(product)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Product Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Product name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                rows={3}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Electronics, Clothing"
              />
            </div>
            <div>
              <Label>Main Image URL</Label>
              <Input
                value={formData.main_image}
                onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>MOQ</Label>
                <Input
                  type="number"
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label>Unit</Label>
              <Input
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="piece, kg, box"
              />
              </div>
            </div>
            <div>
              <Label>Tier Prices (JSON)</Label>
              <Textarea
                value={formData.tier_prices}
                onChange={(e) => setFormData({ ...formData, tier_prices: e.target.value })}
                placeholder='[{"min_qty":1,"max_qty":100,"price":10}]'
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: {`[{"min_qty":1,"max_qty":100,"price":10},{"min_qty":101,"max_qty":null,"price":8}]`}
              </p>
            </div>
            <div>
              <Label>Shopify Product Handle</Label>
              <Input
                value={formData.shopify_handle}
                onChange={(e) => setFormData({ ...formData, shopify_handle: e.target.value })}
                placeholder="product-handle-from-shopify"
              />
              <p className="text-xs text-gray-500 mt-1">
                This links the product to Shopify for checkout
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              {editingProduct ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}