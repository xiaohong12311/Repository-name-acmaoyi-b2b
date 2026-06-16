'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Eye, CheckCircle, XCircle, Clock, Loader2, Trash2,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Inquiry {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  products: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    target_price?: number;
    specifications?: string;
  }>;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
}

interface InquiryListProps {
  // No props needed
}

export function InquiryList({}: InquiryListProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, page]);

  const fetchInquiries = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_session');
    if (!token) return;

    try {
      const response = await fetch(
        `/api/admin/inquiries?status=${statusFilter}&page=${page}&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      setInquiries(data.inquiries || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Fetch inquiries error:', error);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode; label: string }> = {
      pending: { variant: 'outline', icon: <Clock className="h-3 w-3" />, label: '待处理' },
      processing: { variant: 'secondary', icon: <Loader2 className="h-3 w-3 animate-spin" />, label: '处理中' },
      quoted: { variant: 'default', icon: <CheckCircle className="h-3 w-3" />, label: '已报价' },
      closed: { variant: 'outline', icon: <XCircle className="h-3 w-3" />, label: '已关闭' },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className="gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const handleViewDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetail(true);
  };

  const handleEdit = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setEditStatus(inquiry.status);
    setEditNotes(inquiry.notes || '');
    setShowEdit(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedInquiry) return;
    setSaving(true);
    const token = localStorage.getItem('admin_session');
    if (!token) return;

    try {
      const response = await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedInquiry.id,
          status: editStatus,
          notes: editNotes,
        }),
      });
      const result = await response.json();
      if (result.inquiry) {
        fetchInquiries();
        setShowEdit(false);
      }
    } catch (error) {
      console.error('Save edit error:', error);
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条询盘记录吗？')) return;
    const token = localStorage.getItem('admin_session');
    if (!token) return;

    try {
      await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchInquiries();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="状态筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="pending">待处理</SelectItem>
            <SelectItem value="processing">处理中</SelectItem>
            <SelectItem value="quoted">已报价</SelectItem>
            <SelectItem value="closed">已关闭</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          暂无询盘记录
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(inquiry.status)}
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(inquiry.created_at), { 
                        addSuffix: true, 
                        locale: zhCN 
                      })}
                    </span>
                  </div>
                  <div className="font-medium">{inquiry.company_name} - {inquiry.contact_name}</div>
                  <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                  <div className="text-sm">
                    询价产品: {inquiry.products.length} 项
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetail(inquiry)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(inquiry)}>
                    编辑
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(inquiry.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">{page} / {totalPages}</span>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>询盘详情</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">公司名称</Label>
                  <div className="font-medium">{selectedInquiry.company_name}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">联系人</Label>
                  <div className="font-medium">{selectedInquiry.contact_name}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">邮箱</Label>
                  <div className="font-medium">{selectedInquiry.email}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">电话</Label>
                  <div className="font-medium">{selectedInquiry.phone || '-'}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">国家</Label>
                  <div className="font-medium">{selectedInquiry.country || '-'}</div>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">询价产品</Label>
                <div className="mt-2 space-y-2">
                  {selectedInquiry.products.map((p, idx) => (
                    <div key={idx} className="text-sm bg-muted p-2 rounded">
                      <div className="font-medium">{p.product_name}</div>
                      <div>数量: {p.quantity}</div>
                      {p.target_price && <div>目标价格: ${p.target_price}</div>}
                      {p.specifications && <div>规格: {p.specifications}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {selectedInquiry.message && (
                <div>
                  <Label className="text-muted-foreground">留言</Label>
                  <div className="mt-2 bg-muted p-2 rounded text-sm">
                    {selectedInquiry.message}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑询盘</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>状态</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">待处理</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="quoted">已报价</SelectItem>
                  <SelectItem value="closed">已关闭</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>备注</Label>
              <Textarea 
                value={editNotes} 
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="添加处理备注..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEdit(false)}>取消</Button>
            <Button onClick={handleSaveEdit} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}