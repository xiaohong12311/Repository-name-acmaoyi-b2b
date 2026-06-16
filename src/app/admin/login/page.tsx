'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);
  const [error, setError] = useState('');
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);

  // 从 API 获取 Supabase 配置
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/supabase-config');
        if (!res.ok) {
          setError('Supabase 配置错误，请联系管理员');
          setConfigLoading(false);
          return;
        }
        const config: SupabaseConfig = await res.json();
        const client = createClient(config.supabaseUrl, config.supabaseAnonKey);
        setSupabaseClient(client);
      } catch (err) {
        setError('获取配置失败');
      } finally {
        setConfigLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!supabaseClient) {
      setError('Supabase 配置错误');
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === 'Invalid login credentials' 
          ? '邮箱或密码错误' 
          : authError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        // 保存 session token 到 cookie
        document.cookie = `admin_session=${data.session.access_token}; path=/; max-age=3600`;
        
        // 检查是否是管理员
        const checkRes = await fetch('/api/admin/check-auth', {
          headers: {
            'x-session': data.session.access_token
          }
        });
        
        const checkData = await checkRes.json();
        
        if (checkData.isAdmin) {
          router.push('/admin/dashboard');
        } else {
          setError('您不是管理员，无法访问后台');
          await supabaseClient.auth.signOut();
        }
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  if (configLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">ACMAOYI Admin</CardTitle>
          <CardDescription>管理员登录</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : '登录'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}