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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Eye, CheckCircle, XCircle, Clock, Loader2, Trash2,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface SupplierApplication {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  country: string | null;
  address: string | null;
  business_type: string | null;
  product_categories: string[] | null;
  year_established: number | null;
  employee_count: number | null;
  certifications: string[] | null;
  website: string | null;
  description: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

export function SupplierApplicationList() {
  const [applications, setApplications] = useState<SupplierApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApp, setSelectedApp] = useState<SupplierApplication | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [approveNotes, setApproveNotes] = useState('');
  const [createSupplier, setCreateSupplier] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, page]);

  const fetchApplications = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_session');
    if (!token) return;

    try {
      const response = await fetch(
        `/api/admin/suppliers?status=${statusFilter}&page=${page}&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      setApplications(data.applications || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Fetch applications error:', error);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode; label: string }> = {
      pending: { variant: 'outline', icon: <Clock className="h-3 w-3" />, label: '待审核' },
      reviewing: { variant: 'secondary', icon: <Loader2 className="h-3 w-3 animate-spin" />, label: '审核中' },
      approved: { variant: 'default', icon: <CheckCircle className="h-3 w-3" />, label: '已通过' },
      rejected: { variant: 'destructive', icon: <XCircle className="h-3 w-3" />, label: '已拒绝' },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className="gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const handleViewDetail = (app: SupplierApplication) => {
    setSelectedApp(app);
    setShowDetail(true);
  };

  const handleApproveReject = (app: SupplierApplication) => {
    setSelectedApp(app);
    setApproveNotes(app.notes || '');
    setShowApprove(true);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedApp) return;
    setSaving(true);
    const token = localStorage.getItem('admin_session');
    if (!token) return;

    try {
      const response = await fetch('/api/admin/suppliers', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedApp.id,
          status: newStatus,
          notes: approveNotes,
          createSupplier: newStatus === 'approved' && createSupplier,
        }),
      });
      const result = await response.json();
      if (result.application) {
        fetchApplications();
        setShowApprove(false);
      }
    } catch (error) {
      console.error('Update status error:', error);
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条申请记录吗？')) return;
    const token = localStorage.getItem('admin_session');
    if (!token) return;

    try {
      await fetch(`/api/admin/suppliers?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchApplications();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const getBusinessTypeLabel = (type: string | null) => {
    const labels: Record<string, string> = {
      manufacturer: '制造商',
      wholesaler: '批发商',
      trader: '贸易商',
    };
    return type ? labels[type] || type : '-';
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
            <SelectItem value="pending">待审核</SelectItem>
            <SelectItem value="reviewing">审核中</SelectItem>
            <SelectItem value="approved">已通过</SelectItem>
            <SelectItem value="rejected">已拒绝</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          暂无Agent申请
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Card key={app.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(app.status)}
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(app.created_at), { 
                        addSuffix: true, 
                        locale: zhCN 
                      })}
                    </span>
                  </div>
                  <div className="font-medium">{app.company_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {app.contact_name} | {app.email} | {app.phone}
                  </div>
                  <div className="text-sm">
                    {getBusinessTypeLabel(app.business_type)}
                    {app.product_categories && app.product_categories.length > 0 && (
                      <span className="ml-2 text-muted-foreground">
                        | {app.product_categories.slice(0, 2).join(', ')}
                        {app.product_categories.length > 2 && '...'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetail(app)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleApproveReject(app)}>
                    审核
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(app.id)}>
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
            <DialogTitle>申请详情</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">公司名称</Label>
                  <div className="font-medium">{selectedApp.company_name}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">联系人</Label>
                  <div className="font-medium">{selectedApp.contact_name}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">邮箱</Label>
                  <div className="font-medium">{selectedApp.email}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">电话</Label>
                  <div className="font-medium">{selectedApp.phone}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">国家</Label>
                  <div className="font-medium">{selectedApp.country || '-'}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">业务类型</Label>
                  <div className="font-medium">{getBusinessTypeLabel(selectedApp.business_type)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">成立年份</Label>
                  <div className="font-medium">{selectedApp.year_established || '-'}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">员工数</Label>
                  <div className="font-medium">{selectedApp.employee_count || '-'}</div>
                </div>
              </div>

              {selectedApp.address && (
                <div>
                  <Label className="text-muted-foreground">地址</Label>
                  <div className="mt-1">{selectedApp.address}</div>
                </div>
              )}

              {selectedApp.product_categories && selectedApp.product_categories.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">产品类别</Label>
                  <div className="mt-1 flex gap-2">
                    {selectedApp.product_categories.map((c, idx) => (
                      <Badge key={idx} variant="outline">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedApp.certifications && selectedApp.certifications.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">认证资质</Label>
                  <div className="mt-1 flex gap-2">
                    {selectedApp.certifications.map((c, idx) => (
                      <Badge key={idx} variant="secondary">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedApp.website && (
                <div>
                  <Label className="text-muted-foreground">网站</Label>
                  <div className="mt-1 text-primary">{selectedApp.website}</div>
                </div>
              )}

              {selectedApp.description && (
                <div>
                  <Label className="text-muted-foreground">简介</Label>
                  <div className="mt-2 bg-muted p-2 rounded text-sm">
                    {selectedApp.description}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve/Reject Dialog */}
      <Dialog open={showApprove} onOpenChange={setShowApprove}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>审核申请</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="font-medium">{selectedApp?.company_name}</div>
            <div>
              <Label>审核备注</Label>
              <Textarea 
                value={approveNotes} 
                onChange={(e) => setApproveNotes(e.target.value)}
                placeholder="添加审核备注..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={createSupplier} 
                onCheckedChange={(checked) => setCreateSupplier(checked === true)}
              />
              <Label className="cursor-pointer">通过后自动创建Agent档案</Label>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowApprove(false)}>取消</Button>
            <Button variant="destructive" onClick={() => handleUpdateStatus('rejected')} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              拒绝
            </Button>
            <Button onClick={() => handleUpdateStatus('approved')} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              通过
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}