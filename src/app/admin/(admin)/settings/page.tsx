'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/admin/image-upload';

interface SiteSettings {
  id: string | null;
  site_name: string;
  site_description: string;
  logo_url: string;
  favicon_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  facebook_url: string;
  tiktok_url: string;
  tiktok_pixel_id: string;
  facebook_pixel_id: string;
  shopify_domain: string;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState<SiteSettings>({
    id: null,
    site_name: 'ACMAOYI',
    site_description: 'Professional B2B Wholesale Platform',
    logo_url: '',
    favicon_url: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    facebook_url: '',
    tiktok_url: '',
    tiktok_pixel_id: '',
    facebook_pixel_id: '',
    shopify_domain: 'btbvuh-7y.myshopify.com'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin_session='))
        ?.split('=')[1];

      if (!token) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/admin/settings', {
        headers: { 'x-session': token }
      });

      if (!res.ok) {
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        setError('获取设置失败');
        return;
      }

      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch {
      setError('获取设置失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin_session='))
        ?.split('=')[1];

      if (!token) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session': token
        },
        body: JSON.stringify({ settings })
      });

      const data = await res.json();
      
      if (data.success) {
        setSuccess('设置已保存！');
        setSettings(data.settings);
      } else {
        setError(data.error || '保存失败');
      }
    } catch {
      setError('保存失败');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">网站设置</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="contact">联系方式</TabsTrigger>
            <TabsTrigger value="integration">集成设置</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>网站名称、Logo、描述等基本信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">网站名称</Label>
                  <Input
                    id="site_name"
                    value={settings.site_name}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    placeholder="ACMAOYI"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site_description">网站描述</Label>
                  <Input
                    id="site_description"
                    value={settings.site_description}
                    onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                    placeholder="Professional B2B Wholesale Platform"
                  />
                </div>

                <ImageUpload
                  label="Logo 图片"
                  value={settings.logo_url}
                  onChange={(url) => setSettings({ ...settings, logo_url: url })}
                  type="logo"
                />

                <ImageUpload
                  label="Favicon 图标"
                  value={settings.favicon_url}
                  onChange={(url) => setSettings({ ...settings, favicon_url: url })}
                  type="favicon"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>联系方式</CardTitle>
                <CardDescription>公司联系方式，显示在网站各处</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">联系邮箱</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    placeholder="contact@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">联系电话</Label>
                  <Input
                    id="contact_phone"
                    value={settings.contact_phone}
                    onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                    placeholder="+86 xxx xxxxxxx"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_address">公司地址</Label>
                  <Input
                    id="contact_address"
                    value={settings.contact_address}
                    onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                    placeholder="公司详细地址"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook 主页</Label>
                  <Input
                    id="facebook_url"
                    value={settings.facebook_url}
                    onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok_url">TikTok 主页</Label>
                  <Input
                    id="tiktok_url"
                    value={settings.tiktok_url}
                    onChange={(e) => setSettings({ ...settings, tiktok_url: e.target.value })}
                    placeholder="https://tiktok.com/@youraccount"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle>集成设置</CardTitle>
                <CardDescription>Shopify、广告追踪等第三方集成</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shopify_domain">Shopify 域名</Label>
                  <Input
                    id="shopify_domain"
                    value={settings.shopify_domain}
                    onChange={(e) => setSettings({ ...settings, shopify_domain: e.target.value })}
                    placeholder="your-store.myshopify.com"
                  />
                  <p className="text-sm text-slate-500">用于 Buy Button 跳转支付</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tiktok_pixel_id">TikTok Pixel ID</Label>
                  <Input
                    id="tiktok_pixel_id"
                    value={settings.tiktok_pixel_id}
                    onChange={(e) => setSettings({ ...settings, tiktok_pixel_id: e.target.value })}
                    placeholder="填写后启用 TikTok 广告追踪"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                  <Input
                    id="facebook_pixel_id"
                    value={settings.facebook_pixel_id}
                    onChange={(e) => setSettings({ ...settings, facebook_pixel_id: e.target.value })}
                    placeholder="填写后启用 Facebook 广告追踪"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                保存设置
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}