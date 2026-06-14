'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInquiry } from '@/hooks/use-b2b-store';
import { mockProducts } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  MessageSquarePlus,
  Trash2,
  MinusCircle,
  PlusCircle,
  Send,
  FileText,
  Building2,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

export default function InquiryPage() {
  const { inquiryItems, updateInquiryItem, removeFromInquiry, clearInquiry } = useInquiry();
  
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleQuantityChange = (productId: string, delta: number) => {
    const item = inquiryItems.find(i => i.productId === productId);
    if (item) {
      const product = mockProducts.find(p => p.id === productId);
      const newQuantity = Math.max(product?.moq || 1, item.quantity + delta);
      updateInquiryItem(productId, { quantity: newQuantity });
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromInquiry(productId);
  };

  const handleSubmitInquiry = () => {
    // 这里应该调用API发送询盘
    // 目前模拟成功
    setShowSuccessDialog(true);
    clearInquiry();
  };

  // 按供应商分组
  const groupedBySupplier = inquiryItems.reduce((acc, item) => {
    if (!acc[item.supplierName]) {
      acc[item.supplierName] = [];
    }
    acc[item.supplierName].push(item);
    return acc;
  }, {} as Record<string, typeof inquiryItems>);

  if (inquiryItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <MessageSquarePlus className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">询盘单为空</h1>
          <p className="text-gray-500 mb-6">
            您还没有添加任何产品到询盘单，请先浏览产品目录
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              浏览产品
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">询盘单</h1>
          <p className="text-gray-500">
            共 {inquiryItems.length} 个产品，来自 {Object.keys(groupedBySupplier).length} 个供应商
          </p>
        </div>
        <Button variant="outline" onClick={clearInquiry} className="gap-2">
          <Trash2 className="h-4 w-4" />
          清空询盘单
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Inquiry Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                询盘产品列表
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(groupedBySupplier).map(([supplierName, items]) => (
                <div key={supplierName} className="mb-6 last:mb-0">
                  {/* Supplier Header */}
                  <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
                    <Building2 className="h-4 w-4" />
                    {supplierName}
                    <Badge variant="outline" className="ml-2">
                      {items.length} 个产品
                    </Badge>
                  </div>

                  {/* Products Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>产品</TableHead>
                        <TableHead>数量</TableHead>
                        <TableHead className="text-right">目标价</TableHead>
                        <TableHead className="text-right">备注</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map(item => {
                        const product = mockProducts.find(p => p.id === item.productId);
                        return (
                          <TableRow key={item.productId}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                                  <Image
                                    src={item.productImage}
                                    alt={item.productName}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                </div>
                                <div>
                                  <Link 
                                    href={`/products/${item.productId}`}
                                    className="font-medium text-gray-900 hover:text-blue-700 line-clamp-1"
                                  >
                                    {item.productName}
                                  </Link>
                                  <div className="text-xs text-gray-500">
                                    MOQ: {product?.moq} {product?.unit}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleQuantityChange(item.productId, -(product?.moq ?? 10))}
                                >
                                  <MinusCircle className="h-4 w-4" />
                                </Button>
                                <span className="font-medium tabular-nums w-16 text-center">
                                  {item.quantity}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleQuantityChange(item.productId, product?.moq ?? 10)}
                                >
                                  <PlusCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                placeholder="可选"
                                className="w-24 h-8 text-right"
                                value={item.targetPrice || ''}
                                onChange={e => updateInquiryItem(item.productId, {
                                  targetPrice: e.target.value ? parseFloat(e.target.value) : undefined
                                })}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                placeholder="备注"
                                className="w-32 h-8"
                                value={item.notes}
                                onChange={e => updateInquiryItem(item.productId, { notes: e.target.value })}
                              />
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveItem(item.productId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                询盘信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">公司名称 *</Label>
                <Input 
                  placeholder="请输入公司名称"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">联系人 *</Label>
                <Input 
                  placeholder="请输入联系人姓名"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">邮箱 *</Label>
                <Input 
                  type="email"
                  placeholder="请输入邮箱地址"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">电话 *</Label>
                <Input 
                  placeholder="请输入联系电话"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">收货地址 *</Label>
                <Textarea 
                  placeholder="请输入详细收货地址"
                  className="h-24"
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">补充说明</Label>
                <Textarea 
                  placeholder="如有其他需求请在此说明..."
                  className="h-32"
                  value={additionalNotes}
                  onChange={e => setAdditionalNotes(e.target.value)}
                />
              </div>

              <Separator />

              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <h4 className="font-medium text-blue-900 mb-2">询盘说明</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• 供应商将在1-2个工作日内回复</li>
                  <li>• 您可以设置目标价格供供应商参考</li>
                  <li>• 多个供应商的产品将分别发送询盘</li>
                </ul>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-blue-700 hover:bg-blue-800 gap-2"
                onClick={handleSubmitInquiry}
                disabled={!company || !contactName || !contactEmail || !contactPhone || !shippingAddress}
              >
                <Send className="h-5 w-5" />
                发送询盘
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-green-600" />
              询盘发送成功
            </DialogTitle>
            <DialogDescription>
              您的询盘已成功发送给相关供应商，供应商将在1-2个工作日内通过邮件回复您。
              您可以在后台查看询盘状态和历史记录。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link href="/products">
              <Button>继续浏览产品</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}