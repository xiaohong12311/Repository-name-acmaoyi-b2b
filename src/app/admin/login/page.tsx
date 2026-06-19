'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const [config, setConfig] = useState<SupabaseConfig | null>(null);

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
        const configData: SupabaseConfig = await res.json();
        setConfig(configData);
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

    if (!config) {
      setError('Supabase 配置错误');
      setLoading(false);
      return;
    }

    try {
      // 使用直接 fetch 调用 Supabase Auth API
      const response = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.supabaseAnonKey,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error_description || data.message || 'Login failed';
        setError(errorMsg === 'Invalid login credentials' ? '邮箱或密码错误' : errorMsg);
        setLoading(false);
        return;
      }

      if (data.access_token) {
        // 保存 session token 到 cookie
        document.cookie = `admin_session=${data.access_token}; path=/; max-age=3600`;
        
        // 检查是否是管理员
        const checkRes = await fetch('/api/admin/check-auth', {
          headers: {
            'x-session': data.access_token
          }
        });
        
        const checkData = await checkRes.json();
        
        if (checkData.isAdmin) {
          router.push('/admin/dashboard');
        } else {
          setError('您不是管理员，无法访问后台');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          {configLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : error && !loading ? (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          
          {!configLoading && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              {error && loading && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}