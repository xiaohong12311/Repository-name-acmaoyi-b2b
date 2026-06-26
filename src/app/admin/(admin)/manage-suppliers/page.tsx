'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Trash2, Edit3, Loader2, Save, X, 
  Search, Factory, CheckCircle
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/admin/image-upload';

interface Supplier {
  id: number;
  company_name: string;
  company_name_en: string;
  contact_name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  business_type: string;
  product_categories: string[];
  year_established: number;
  employee_count: number;
  certifications: string[];
  website: string;
  description: string;
  logo_url: string;
  factory_images: string[];
  is_verified: boolean;
  is_active: boolean;
}

const emptySupplier: Omit<Supplier, 'id'> = {
  company_name: '', company_name_en: '', contact_name: '', email: '', phone: '',
  country: '', address: '', business_type: '', product_categories: [],
  year_established: 0, employee_count: 0, certifications: [], website: '',
  description: '', logo_url: '', factory_images: [], is_verified: false, is_active: true,
};

export default function ManageSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSupplier, setNewSupplier] = useState(emptySupplier);
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
      const res = await fetch('/api/admin/manage-suppliers', { headers: { 'x-session': token } });
      const data = await res.json();
      if (data.success) setSuppliers(data.suppliers);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSupplier = async () => {
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      await fetch('/api/admin/manage-suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify(newSupplier),
      });
      setShowAddForm(false);
      setNewSupplier(emptySupplier);
      fetchData();
    } catch (error) {
      console.error('Add error:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSupplier = async () => {
    if (!editingSupplier) return;
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      await fetch('/api/admin/manage-suppliers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify(editingSupplier),
      });
      setEditingSupplier(null);
      fetchData();
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const deleteSupplier = async (id: number) => {
    if (!confirm('确定删除此供应商？')) return;
    const token = getToken();
    if (!token) return;
    try {
      await fetch(`/api/admin/manage-suppliers?id=${id}`, { method: 'DELETE', headers: { 'x-session': token } });
      setSuppliers(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const toggleVerified = async (supplier: Supplier) => {
    const token = getToken();
    if (!token) return;
    try {
      await fetch('/api/admin/manage-suppliers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify({ id: supplier.id, is_verified: !supplier.is_verified }),
      });
      setSuppliers(prev => prev.map(s => s.id === supplier.id ? { ...s, is_verified: !s.is_verified } : s));
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const filteredSuppliers = suppliers.filter(s =>
    !searchQuery || s.company_name.includes(searchQuery) || s.company_name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SupplierForm = ({ supplier, setSupplier, onSave, onCancel }: {
    supplier: Omit<Supplier, 'id'> | Supplier;
    setSupplier: (s: Omit<Supplier, 'id'> | Supplier) => void;
    onSave: () => void;
    onCancel: () => void;
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">公司名称 (中文)</label>
          <Input value={supplier.company_name} onChange={e => setSupplier({ ...supplier, company_name: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">公司名称 (English)</label>
          <Input value={supplier.company_name_en} onChange={e => setSupplier({ ...supplier, company_name_en: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">联系人</label>
          <Input value={supplier.contact_name} onChange={e => setSupplier({ ...supplier, contact_name: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">邮箱</label>
          <Input type="email" value={supplier.email} onChange={e => setSupplier({ ...supplier, email: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">电话</label>
          <Input value={supplier.phone} onChange={e => setSupplier({ ...supplier, phone: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">国家</label>
          <Input value={supplier.country} onChange={e => setSupplier({ ...supplier, country: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">业务类型</label>
          <Input value={supplier.business_type} onChange={e => setSupplier({ ...supplier, business_type: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">地址</label>
        <Input value={supplier.address} onChange={e => setSupplier({ ...supplier, address: e.target.value })} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">产品分类 (逗号分隔)</label>
        <Input
          value={supplier.product_categories.join(', ')}
          onChange={e => setSupplier({ ...supplier, product_categories: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">成立年份</label>
          <Input type="number" value={supplier.year_established} onChange={e => setSupplier({ ...supplier, year_established: Number(e.target.value) })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">员工数</label>
          <Input type="number" value={supplier.employee_count} onChange={e => setSupplier({ ...supplier, employee_count: Number(e.target.value) })} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">认证 (逗号分隔)</label>
          <Input
            value={supplier.certifications.join(', ')}
            onChange={e => setSupplier({ ...supplier, certifications: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">网站</label>
        <Input value={supplier.website} onChange={e => setSupplier({ ...supplier, website: e.target.value })} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">描述</label>
        <Textarea value={supplier.description} onChange={e => setSupplier({ ...supplier, description: e.target.value })} rows={3} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Logo</label>
        <ImageUpload value={supplier.logo_url} onChange={url => setSupplier({ ...supplier, logo_url: url })} type="general" />
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
        <h1 className="text-2xl font-bold text-gray-900">供应商管理</h1>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="h-4 w-4" /> 添加供应商
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="搜索供应商..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="space-y-3">
        {filteredSuppliers.map(supplier => (
          <Card key={supplier.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {supplier.logo_url ? (
                    <img src={supplier.logo_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Factory className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{supplier.company_name_en || supplier.company_name}</span>
                    {supplier.is_verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                    <Badge variant={supplier.is_active ? 'default' : 'secondary'} className="text-xs">
                      {supplier.is_active ? '活跃' : '停用'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{supplier.company_name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {supplier.country} · {supplier.business_type} · {supplier.year_established}年 · {supplier.employee_count}人
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleVerified(supplier)}>
                    {supplier.is_verified ? '取消认证' : '认证'}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => setEditingSupplier(supplier)}>
                    <Edit3 className="h-3.5 w-3.5" /> 编辑
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteSupplier(supplier.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">添加供应商</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}><X className="h-4 w-4" /></Button>
            </div>
            <SupplierForm supplier={newSupplier} setSupplier={setNewSupplier as (s: Omit<Supplier, 'id'> | Supplier) => void} onSave={addSupplier} onCancel={() => setShowAddForm(false)} />
          </div>
        </div>
      )}

      {editingSupplier && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">编辑供应商</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditingSupplier(null)}><X className="h-4 w-4" /></Button>
            </div>
            <SupplierForm supplier={editingSupplier} setSupplier={setEditingSupplier as (s: Omit<Supplier, 'id'> | Supplier) => void} onSave={updateSupplier} onCancel={() => setEditingSupplier(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
