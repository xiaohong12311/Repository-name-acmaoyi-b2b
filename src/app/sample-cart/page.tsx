'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSampleCart } from '@/hooks/use-b2b-store';
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
  ShoppingCart,
  Trash2,
  MinusCircle,
  PlusCircle,
  Send,
  Package,
  Building2,
  Mail,
  Phone,
  Truck,
  CreditCard,
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

export default function SampleCartPage() {
  const { 
    sampleCart, 
    updateSampleCartItem, 
    removeFromSampleCart, 
    clearSampleCart,
    getSampleCartTotal 
  } = useSampleCart();
  
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleQuantityChange = (productId: string, delta: number) => {
    const item = sampleCart.find(i => i.productId === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      updateSampleCartItem(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromSampleCart(productId);
  };

  const handleSubmitOrder = () => {
    // 这里应该调用API提交样品订单
    setShowSuccessDialog(true);
    clearSampleCart();
  };

  const totalAmount = getSampleCartTotal();

  // 按供应商分组
  const groupedBySupplier = sampleCart.reduce((acc, item) => {
    if (!acc[item.supplierName]) {
      acc[item.supplierName] = [];
    }
    acc[item.supplierName].push(item);
    return acc;
  }, {} as Record<string, typeof sampleCart>);

  if (sampleCart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">样品车为空</h1>
          <p className="text-gray-500 mb-6">
            您还没有添加任何样品，请先浏览支持样品申请的产品
          </p>
          <Link href="/products?sample=true">
            <Button size="lg" className="gap-2">
              浏览可申请样品的产品
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">样品车</h1>
          <p className="text-gray-500">
            共 {sampleCart.length} 种样品，来自 {Object.keys(groupedBySupplier).length} 个供应商
          </p>
        </div>
        <Button variant="outline" onClick={clearSampleCart} className="gap-2">
          <Trash2 className="h-4 w-4" />
          清空样品车
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Sample Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                样品清单
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
                      {items.length} 种样品
                    </Badge>
                  </div>

                  {/* Samples Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>产品</TableHead>
                        <TableHead>规格</TableHead>
                        <TableHead>数量</TableHead>
                        <TableHead className="text-right">单价</TableHead>
                        <TableHead className="text-right">小计</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map(item => (
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
                              <Link 
                                href={`/products/${item.productId}`}
                                className="font-medium text-gray-900 hover:text-blue-700 line-clamp-1"
                              >
                                {item.productName}
                              </Link>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs text-gray-500">
                              {Object.entries(item.specifications).slice(0, 2).map(([key, value]) => (
                                <div key={key}>{key}: {value}</div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleQuantityChange(item.productId, -1)}
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <span className="font-medium tabular-nums w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleQuantityChange(item.productId, 1)}
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            ¥{item.samplePrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums font-medium">
                            ¥{(item.samplePrice * item.quantity).toFixed(2)}
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
                      ))}
                    </TableBody>
                  </Table>

                  {/* Supplier Subtotal */}
                  <div className="flex justify-end py-2 border-t mt-2">
                    <div className="text-sm">
                      <span className="text-gray-500">{supplierName} 小计：</span>
                      <span className="font-semibold text-blue-700 ml-2 tabular-nums">
                        ¥{items.reduce((sum, item) => sum + item.samplePrice * item.quantity, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sample Info */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-700" />
                样品申请说明
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2 text-green-700">
                    <Package className="h-4 w-4" />
                    样品确认
                  </div>
                  <p className="text-green-600">样品确认后再大批采购，降低风险</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2 text-blue-700">
                    <CreditCard className="h-4 w-4" />
                    支付方式
                  </div>
                  <p className="text-blue-600">支持支付宝、微信、银行转账</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2 text-yellow-700">
                    <Truck className="h-4 w-4" />
                    物流配送
                  </div>
                  <p className="text-yellow-600">样品通常3-5个工作日送达</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                确认订单
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">样品数量</span>
                  <span>{sampleCart.reduce((sum, item) => sum + item.quantity, 0)} 件</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">供应商数量</span>
                  <span>{Object.keys(groupedBySupplier).length} 家</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">总计</span>
                  <span className="font-bold text-xl text-blue-700 tabular-nums">
                    ¥{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Contact Info */}
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
                <Label className="mb-2 block">备注</Label>
                <Textarea 
                  placeholder="如有特殊要求请说明..."
                  className="h-16"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              <Button 
                size="lg" 
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
                onClick={handleSubmitOrder}
                disabled={!contactName || !contactEmail || !contactPhone || !shippingAddress}
              >
                <Send className="h-5 w-5" />
                提交样品订单
              </Button>

              <p className="text-xs text-center text-gray-500">
                提交后供应商将联系您确认订单和支付方式
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              样品订单提交成功
            </DialogTitle>
            <DialogDescription>
              您的样品订单已提交成功，供应商将通过邮件联系您确认支付和发货事宜。
              样品通常在支付确认后3-5个工作日内送达。
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