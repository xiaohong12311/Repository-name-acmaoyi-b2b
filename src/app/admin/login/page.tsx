'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

// Create Supabase client lazily to avoid build errors
let supabase: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_COZE_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_COZE_SUPABASE_ANON_KEY || '';
    if (supabaseUrl && supabaseAnonKey) {
      supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
  }
  return supabase;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount to access env variables
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const client = getSupabaseClient();
    if (!client) {
      setError('Supabase 配置错误');
      setLoading(false);
      return;
    }

    try {
      const { data, error: loginError } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message === 'Invalid login credentials' 
          ? '邮箱或密码错误' 
          : loginError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        // Check if user is admin
        const isAdmin = await checkAdminStatus(data.session.access_token);
        if (!isAdmin) {
          setError('您不是管理员，无法访问后台');
          await client.auth.signOut();
          setLoading(false);
          return;
        }
        
        // Store session token
        localStorage.setItem('admin_session', data.session.access_token);
        router.push('/admin/dashboard');
      }
    } catch {
      setError('登录失败，请稍后重试');
    }
    setLoading(false);
  };

  const checkAdminStatus = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/check-auth', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result.isAdmin === true;
    } catch {
      return false;
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">ACMAOYI Admin</CardTitle>
          <CardDescription>管理员登录</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@acmaoyi.com"
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
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : (
                '登录'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}