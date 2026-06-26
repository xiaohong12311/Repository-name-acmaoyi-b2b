'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Users, FileText, Factory, Layers, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    sections: 0,
    products: 0,
    suppliers: 0,
    inquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; admin_session=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const fetchStats = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const [sectionsRes, productsRes, suppliersRes, inquiriesRes] = await Promise.all([
        fetch('/api/admin/sections', { headers: { 'x-session': token } }),
        fetch('/api/admin/products', { headers: { 'x-session': token } }),
        fetch('/api/admin/manage-suppliers', { headers: { 'x-session': token } }),
        fetch('/api/admin/inquiries?limit=1', { headers: { 'x-session': token } }),
      ]);

      const [sectionsData, productsData, suppliersData, inquiriesData] = await Promise.all([
        sectionsRes.json(),
        productsRes.json(),
        suppliersRes.json(),
        inquiriesRes.json(),
      ]);

      setStats({
        sections: sectionsData.sections?.length || 0,
        products: productsData.products?.length || 0,
        suppliers: suppliersData.suppliers?.length || 0,
        inquiries: inquiriesData.total || inquiriesData.inquiries?.length || 0,
      });
    } catch (error) {
      console.error('Fetch stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: '页面板块', value: stats.sections, icon: Layers, color: 'text-blue-600 bg-blue-100', href: '/admin/sections' },
    { label: '产品数量', value: stats.products, icon: ShoppingBag, color: 'text-green-600 bg-green-100', href: '/admin/products' },
    { label: '供应商数量', value: stats.suppliers, icon: Factory, color: 'text-purple-600 bg-purple-100', href: '/admin/manage-suppliers' },
    { label: '询盘单', value: stats.inquiries, icon: MessageSquare, color: 'text-orange-600 bg-orange-100', href: '/admin/inquiries' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">管理仪表盘</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(card => (
          <Link key={card.href} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{card.label}</CardTitle>
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : card.value}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/sections">
          <Card className="hover:shadow-md transition-shadow cursor-pointer p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">管理页面板块</h3>
                <p className="text-sm text-gray-500">添加、编辑、删除首页板块</p>
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/admin/products">
          <Card className="hover:shadow-md transition-shadow cursor-pointer p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">管理产品</h3>
                <p className="text-sm text-gray-500">添加产品、选择供应商商品</p>
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/admin/manage-suppliers">
          <Card className="hover:shadow-md transition-shadow cursor-pointer p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">管理供应商</h3>
                <p className="text-sm text-gray-500">供应商信息与认证管理</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
