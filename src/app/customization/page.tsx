'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Factory,
  Palette,
  Package,
  Ruler,
  Lightbulb,
  Upload,
  Send,
  CheckCircle,
  MessageSquarePlus,
  Clock,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function CustomizationPage() {
  const [formData, setFormData] = useState({
    customizationType: '',
    productName: '',
    quantity: '',
    description: '',
    targetPrice: '',
    deadline: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    company: '',
  });
  
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessDialog(true);
  };

  const customizationTypes = [
    {
      icon: Palette,
      title: 'Logo定制',
      desc: '在产品上印刷或刺绣您的品牌Logo',
      examples: '工作服Logo、餐具Logo、包装盒Logo等',
    },
    {
      icon: Package,
      title: '包装定制',
      desc: '定制专属包装设计和包装材料',
      examples: '礼盒包装、定制纸箱、产品说明书等',
    },
    {
      icon: Ruler,
      title: '规格定制',
      desc: '根据需求调整产品尺寸和规格',
      examples: '尺寸调整、材质替换、功能定制等',
    },
    {
      icon: Lightbulb,
      title: '设计定制',
      desc: '全新产品设计或现有产品改良',
      examples: '产品外观设计、结构改良、新品开发等',
    },
  ];

  const cases = [
    {
      title: '酒店餐具定制',
      client: '某连锁酒店集团',
      desc: '为酒店定制带有品牌Logo的餐具套装，包含餐刀、餐叉、餐勺等，配合酒店整体风格设计。',
      result: '成功交付5000套定制餐具，客户满意度100%',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    },
    {
      title: '电商包装定制',
      client: '某电商平台',
      desc: '为电商定制专属包装盒，包含品牌Logo、产品说明、防震内托，提升品牌形象和用户体验。',
      result: '月产10万+定制包装盒，降低物流破损率30%',
      image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400',
    },
    {
      title: '企业制服定制',
      client: '某制造企业',
      desc: '为企业员工定制工作服，包含Logo绣花、尺码定制、面料选择，提升企业形象。',
      result: '为2000名员工提供定制制服，续签第二年合同',
      image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 to-purple-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=1200"
            alt="定制背景"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-0 mb-6">
              定制批发服务
            </Badge>
            <h1 className="text-4xl font-bold mb-6">
              专业定制批发
              <br />
              <span className="text-purple-200">打造专属品牌产品</span>
            </h1>
            <p className="text-lg text-purple-100 mb-8">
              Logo定制、包装设计、规格调整、新品开发
              <br />
              一站式定制解决方案，满足您的品牌需求
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 gap-2">
                <MessageSquarePlus className="h-4 w-4" />
                提交定制需求
              </Button>
              <Link href="/products?custom=true">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  浏览可定制产品
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            定制服务类型
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizationTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-700 mb-4">
                    <type.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{type.desc}</p>
                  <p className="text-xs text-gray-400 bg-gray-50 rounded p-2">
                    {type.examples}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            定制流程
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: 1, title: '提交需求', desc: '填写定制要求和参考图片' },
                { step: 2, title: '方案沟通', desc: '供应商提供定制方案和报价' },
                { step: 3, title: '确认订单', desc: '确认方案和价格，签署合同' },
                { step: 4, title: '样品确认', desc: '制作样品，确认效果' },
                { step: 5, title: '批量生产', desc: '正式生产，按时交付' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-700 text-white font-bold mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center gap-4">
              <Badge variant="outline" className="gap-2 py-2">
                <Clock className="h-4 w-4" />
                样品周期：5-10天
              </Badge>
              <Badge variant="outline" className="gap-2 py-2">
                <Factory className="h-4 w-4" />
                生产周期：15-30天
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            定制案例
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">{caseItem.client}</Badge>
                    <h3 className="font-semibold text-gray-900 mb-2">{caseItem.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{caseItem.desc}</p>
                    <div className="bg-green-50 rounded p-2 text-sm text-green-700">
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      {caseItem.result}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            定制批发优势
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: '品质保障',
                desc: '样品确认后再大批生产',
              },
              {
                icon: TrendingUp,
                title: '批量优惠',
                desc: '定制批量采购享阶梯价格',
              },
              {
                icon: Clock,
                title: '按时交付',
                desc: '明确交货周期，准时交付',
              },
              {
                icon: Factory,
                title: '专业团队',
                desc: '认证供应商，专业定制',
              },
            ].map((adv, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-700 mb-4">
                    <adv.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{adv.title}</h3>
                  <p className="text-sm text-gray-500">{adv.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            提交定制需求
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>定制需求申请</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="mb-6">
                  <TabsList>
                    <TabsTrigger value="basic">基本信息</TabsTrigger>
                    <TabsTrigger value="detail">详细需求</TabsTrigger>
                    <TabsTrigger value="contact">联系方式</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div>
                      <Label className="mb-2 block">定制类型 *</Label>
                      <Select 
                        value={formData.customizationType}
                        onValueChange={v => setFormData({...formData, customizationType: v})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择定制类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="logo">Logo定制</SelectItem>
                          <SelectItem value="packaging">包装定制</SelectItem>
                          <SelectItem value="size">规格定制</SelectItem>
                          <SelectItem value="design">设计定制</SelectItem>
                          <SelectItem value="other">其他定制</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">产品名称 *</Label>
                      <Input 
                        placeholder="如：不锈钢餐具套装"
                        value={formData.productName}
                        onChange={e => setFormData({...formData, productName: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">采购数量 *</Label>
                      <Input 
                        type="number"
                        placeholder="如：5000"
                        value={formData.quantity}
                        onChange={e => setFormData({...formData, quantity: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">目标价格（可选）</Label>
                        <Input 
                          type="number"
                          placeholder="如：15"
                          value={formData.targetPrice}
                          onChange={e => setFormData({...formData, targetPrice: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">期望交货日期（可选）</Label>
                        <Input 
                          type="date"
                          value={formData.deadline}
                          onChange={e => setFormData({...formData, deadline: e.target.value})}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="detail" className="space-y-4 mt-4">
                    <div>
                      <Label className="mb-2 block">定制需求描述 *</Label>
                      <Textarea 
                        placeholder="请详细描述您的定制需求，包括尺寸、材质、颜色、Logo位置等..."
                        className="h-32"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">参考图片</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2].map(i => (
                          <div key={i} className="border-2 border-dashed rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">上传参考图片 {i}</p>
                            <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="contact" className="space-y-4 mt-4">
                    <div>
                      <Label className="mb-2 block">公司名称 *</Label>
                      <Input 
                        placeholder="请输入公司名称"
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">联系人 *</Label>
                        <Input 
                          placeholder="请输入联系人姓名"
                          value={formData.contactName}
                          onChange={e => setFormData({...formData, contactName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">联系电话 *</Label>
                        <Input 
                          placeholder="请输入联系电话"
                          value={formData.contactPhone}
                          onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">邮箱 *</Label>
                      <Input 
                        type="email"
                        placeholder="请输入邮箱地址"
                        value={formData.contactEmail}
                        onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Separator className="my-6" />

                <Button 
                  size="lg" 
                  className="w-full bg-purple-700 hover:bg-purple-800 gap-2"
                  onClick={handleSubmit}
                >
                  <Send className="h-5 w-5" />
                  提交定制需求
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  提交后，相关供应商将在1-2个工作日内联系您沟通定制方案
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              定制需求提交成功
            </DialogTitle>
            <DialogDescription>
              您的定制需求已提交成功，相关供应商将在1-2个工作日内联系您沟通定制方案和报价。
              您可以在询盘单中查看跟进状态。
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