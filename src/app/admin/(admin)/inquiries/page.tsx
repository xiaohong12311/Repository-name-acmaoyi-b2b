'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Inquiry {
  id: number;
  company_name: string;
  contact_name: string;
  contact_email: string;
  status: string;
  items: unknown[];
  created_at: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; admin_session=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch('/api/admin/inquiries?limit=50', { headers: { 'x-session': token } });
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Eye className="h-4 w-4 text-blue-500" />;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">询盘管理</h1>
      <div className="space-y-3">
        {inquiries.map(inquiry => (
          <Card key={inquiry.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {getStatusIcon(inquiry.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{inquiry.company_name || '未命名公司'}</span>
                    <Badge variant="outline" className="text-xs">{inquiry.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{inquiry.contact_name} · {inquiry.contact_email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {Array.isArray(inquiry.items) ? `${inquiry.items.length} 个产品` : ''} · {new Date(inquiry.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {inquiries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>暂无询盘</p>
          </div>
        )}
      </div>
    </div>
  );
}
