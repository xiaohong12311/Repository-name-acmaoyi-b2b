'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Settings, 
  LogOut,
  Loader2
} from 'lucide-react';

interface SupplierInfo {
  id: string;
  company_name: string;
  email: string;
  is_verified: boolean;
}

export default function SupplierDashboardPage() {
  const router = useRouter();
  const [supplier, setSupplier] = useState<SupplierInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    inquiries: 0,
  });

  useEffect(() => {
    const session = localStorage.getItem('supplier_session');
    const email = localStorage.getItem('supplier_email');
    
    if (!session) {
      router.push('/supplier/login');
      return;
    }

    // Fetch supplier info
    fetchSupplierInfo(session, email);
  }, [router]);

  const fetchSupplierInfo = async (token: string, email: string | null) => {
    try {
      // Get supplier by email
      const response = await fetch(`/api/supplier/info?email=${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch supplier info');
      }

      setSupplier(data.supplier);
      setStats({
        products: data.stats?.products || 0,
        orders: data.stats?.orders || 0,
        inquiries: data.stats?.inquiries || 0,
      });
    } catch (err) {
      console.error('Fetch error:', err);
      localStorage.removeItem('supplier_session');
      router.push('/supplier/login');
    } finally {
      setLoading(false);
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
          <div>
            <h1 className="text-xl font-bold text-gray-900">Supplier Portal</h1>
            <p className="text-sm text-gray-500">{supplier?.company_name}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{supplier?.email}</span>
            {!supplier?.is_verified && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                Pending Verification
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.products}</p>
                  <p className="text-sm text-gray-500">Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.orders}</p>
                  <p className="text-sm text-gray-500">Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.inquiries}</p>
                  <p className="text-sm text-gray-500">Inquiries</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/supplier/products">
                <Button className="w-full" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Manage Products
                </Button>
              </Link>
              <Link href="/supplier/orders">
                <Button className="w-full" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Orders
                </Button>
              </Link>
              <Link href="/supplier/inquiries">
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Inquiries
                </Button>
              </Link>
              <Link href="/supplier/settings">
                <Button className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}