'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, Layers, ShoppingBag, Users, FileText, 
  Settings, LogOut, Loader2, Factory, Image as ImageIcon,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminInfo {
  isAdmin: boolean;
  role: string;
  user: { id: string; email: string };
}

const navItems = [
  { href: '/admin/dashboard', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/sections', label: '板块管理', icon: Layers },
  { href: '/admin/products', label: '产品管理', icon: ShoppingBag },
  { href: '/admin/manage-suppliers', label: '供应商管理', icon: Factory },
  { href: '/admin/inquiries', label: '询盘管理', icon: FileText },
  { href: '/admin/media', label: '媒体库', icon: ImageIcon },
  { href: '/admin/settings', label: '网站设置', icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
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

  const handleLogout = () => {
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

  if (!adminInfo) return null;

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-slate-900 text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-60"
      )}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-700 flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="ACMAOYI"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-contain bg-white flex-shrink-0"
          />
          {!collapsed && (
            <span className="font-bold text-lg tracking-tight">ACMAOYI</span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 border-t border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* User Info */}
        <div className="p-3 border-t border-slate-700">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary-foreground">
                {adminInfo.user.email.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-300 truncate">{adminInfo.user.email}</p>
                <Badge variant="secondary" className="text-[10px] mt-0.5">{adminInfo.role}</Badge>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full text-slate-300 hover:text-white hover:bg-slate-800 justify-start"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && <span>退出</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
