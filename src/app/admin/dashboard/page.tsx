'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, Users, FileText, Factory, 
  Settings, LogOut, Loader2, Eye, CheckCircle, 
  XCircle, Clock, MessageSquare
} from 'lucide-react';
import { InquiryList } from '@/components/admin/inquiry-list';
import { SupplierApplicationList } from '@/components/admin/supplier-application-list';
import Link from 'next/link';

interface AdminInfo {
  isAdmin: boolean;
  role: string;
  user: { id: string; email: string };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pendingInquiries: 0,
    pendingApplications: 0,
    totalProducts: 0,
    totalSuppliers: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    // 从 cookie 获取 token
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    const token = getCookie('admin_session');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const response = await fetch('/api/admin/check-auth', {
        headers: { 'x-session': token },
      });
      const result = await response.json();

      if (!result.isAdmin) {
        document.cookie = 'admin_session=; path=/; max-age=0';
        router.push('/admin/login');
        return;
      }

      setAdminInfo(result);
    } catch {
      document.cookie = 'admin_session=; path=/; max-age=0';
      router.push('/admin/login');
    }
    setLoading(false);
  };

  // 从 cookie 获取 token 的辅助函数
  const getCookieToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; admin_session=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const fetchStats = async () => {
    const token = getCookieToken();
    if (!token) return;

    try {
      // Fetch inquiry stats
      const inquiryRes = await fetch('/api/admin/inquiries?status=pending&limit=1', {
        headers: { 'x-session': token },
      });
      const inquiryData = await inquiryRes.json();
      
      // Fetch application stats
      const appRes = await fetch('/api/admin/suppliers?status=pending&limit=1', {
        headers: { 'x-session': token },
      });
      const appData = await appRes.json();

      setStats({
        pendingInquiries: inquiryData.total || 0,
        pendingApplications: appData.total || 0,
        totalProducts: 0,
        totalSuppliers: 0,
      });
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const handleLogout = async () => {
    document.cookie = 'admin_session=; path=/; max-age=0';
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!adminInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">ACMAOYI Admin</h1>
            <Badge variant="secondary">{adminInfo.role}</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{adminInfo.user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-primary/80">
              <LogOut className="h-4 w-4 mr-2" />
              退出
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">待处理询盘</CardTitle>
              <MessageSquare className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingInquiries}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">待审核供应商</CardTitle>
              <Factory className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">产品数量</CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">供应商数量</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSuppliers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inquiries" className="space-y-4">
          <TabsList className="bg-white border">
            <TabsTrigger value="inquiries" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              询盘单
              {stats.pendingInquiries > 0 && (
                <Badge variant="destructive" className="ml-1">{stats.pendingInquiries}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="gap-2">
              <Factory className="h-4 w-4" />
              供应商申请
              {stats.pendingApplications > 0 && (
                <Badge variant="destructive" className="ml-1">{stats.pendingApplications}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              产品管理
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              网站设置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>询盘单管理</CardTitle>
                <CardDescription>查看和处理顾客询价请求</CardDescription>
              </CardHeader>
              <CardContent>
                <InquiryList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <CardTitle>供应商入驻申请</CardTitle>
                <CardDescription>审核供应商入驻申请</CardDescription>
              </CardHeader>
              <CardContent>
                <SupplierApplicationList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>产品管理</CardTitle>
                <CardDescription>管理网站上的产品信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>产品管理功能正在开发中...</p>
                  <p className="text-sm mt-2">目前请在 Shopify 后台管理产品</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>网站设置</CardTitle>
                <CardDescription>配置网站基本信息、联系方式、广告追踪等</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/admin/settings">
                    <Card className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="pt-6 text-center">
                        <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-semibold">网站设置</h3>
                        <p className="text-sm text-muted-foreground mt-1">Logo、名称、联系方式</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}