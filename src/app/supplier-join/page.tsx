'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  Users,
  Award,
  TrendingUp,
  Truck,
  ShieldCheck,
  FileText,
  Upload,
  CheckCircle,
  Clock,
  Globe,
  Phone,
  Mail,
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function SupplierJoinPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    yearEstablished: '',
    employees: '',
    categories: '',
    mainProducts: '',
    description: '',
    certifications: '',
    website: '',
    factoryImages: '',
    businessLicense: '',
  });
  
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该调用API提交申请
    setShowSuccessDialog(true);
  };

  const benefits = [
    {
      icon: Globe,
      title: '全球曝光',
      description: '产品展示给全球采购商，获得更多订单机会',
    },
    {
      icon: TrendingUp,
      title: '销售增长',
      description: '专业批发平台，批量订单源源不断',
    },
    {
      icon: ShieldCheck,
      title: '品牌认证',
      description: '通过认证提升供应商信誉度和采购商信任',
    },
    {
      icon: Truck,
      title: '物流支持',
      description: '平台提供物流对接服务，简化发货流程',
    },
    {
      icon: Award,
      title: '行业资源',
      description: '获取行业报告、市场趋势等独家资源',
    },
    {
      icon: Users,
      title: '客户管理',
      description: '管理采购商关系，建立长期合作',
    },
  ];

  const requirements = [
    '合法注册的企业或工厂',
    '具备相应的生产资质和认证',
    '产品质量稳定，符合行业标准',
    '具备基本的出口/批发能力',
    '诚信经营，无重大投诉记录',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-6">
            供应商入驻
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            成为认证供应商
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            加入我们的批发采购平台，将您的产品展示给全球采购商
            <br />
            获取批量订单，拓展业务渠道
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 gap-2">
              <FileText className="h-4 w-4" />
              立即申请入驻
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              了解入驻流程
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            入驻供应商权益
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mb-4">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            入驻流程
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: 1, title: '提交申请', desc: '填写基本信息，提交资质材料', icon: FileText },
                { step: 2, title: '资质审核', desc: '平台审核企业资质和产品', icon: ShieldCheck },
                { step: 3, title: '签署协议', desc: '确认合作条款，签署协议', icon: CheckCircle },
                { step: 4, title: '正式入驻', desc: '上架产品，开始运营', icon: Building2 },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-700 text-white font-bold mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </CardContent>
                  </Card>
                  
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-700" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Badge variant="outline" className="gap-2 py-2">
                <Clock className="h-4 w-4" />
                审核周期约 3-5 个工作日
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            入驻要求
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            供应商入驻申请
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>
                  请填写真实有效的企业信息，我们将尽快审核您的申请
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">公司名称 *</Label>
                      <Input 
                        placeholder="请输入公司全称"
                        value={formData.companyName}
                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">联系人 *</Label>
                      <Input 
                        placeholder="请输入联系人姓名"
                        value={formData.contactName}
                        onChange={e => setFormData({...formData, contactName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">邮箱 *</Label>
                      <Input 
                        type="email"
                        placeholder="请输入企业邮箱"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">电话 *</Label>
                      <Input 
                        placeholder="请输入联系电话"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">所在地 *</Label>
                      <Input 
                        placeholder="如：广东省深圳市"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">成立年份 *</Label>
                      <Input 
                        type="number"
                        placeholder="如：2010"
                        value={formData.yearEstablished}
                        onChange={e => setFormData({...formData, yearEstablished: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Business Info */}
                  <div>
                    <h3 className="font-semibold mb-4">企业信息</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">员工规模 *</Label>
                        <Select 
                          value={formData.employees}
                          onValueChange={v => setFormData({...formData, employees: v})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择员工规模" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50-100">50-100人</SelectItem>
                            <SelectItem value="100-200">100-200人</SelectItem>
                            <SelectItem value="200-500">200-500人</SelectItem>
                            <SelectItem value="500-1000">500-1000人</SelectItem>
                            <SelectItem value="1000+">1000人以上</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="mb-2 block">主营类别 *</Label>
                        <Select 
                          value={formData.categories}
                          onValueChange={v => setFormData({...formData, categories: v})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择主营类别" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kitchen">厨房用品</SelectItem>
                            <SelectItem value="lighting">照明设备</SelectItem>
                            <SelectItem value="packaging">包装印刷</SelectItem>
                            <SelectItem value="tools">工业工具</SelectItem>
                            <SelectItem value="garment">服装定制</SelectItem>
                            <SelectItem value="storage">仓储设备</SelectItem>
                            <SelectItem value="other">其他</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">主营产品 *</Label>
                    <Input 
                      placeholder="如：餐具、LED灯、包装盒（多个产品用逗号分隔）"
                      value={formData.mainProducts}
                      onChange={e => setFormData({...formData, mainProducts: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">公司简介 *</Label>
                    <Textarea 
                      placeholder="请简要介绍公司背景、主营业务、核心优势等..."
                      className="h-32"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">认证资质</Label>
                    <Input 
                      placeholder="如：ISO9001、CE认证（多个认证用逗号分隔）"
                      value={formData.certifications}
                      onChange={e => setFormData({...formData, certifications: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">企业官网</Label>
                    <Input 
                      placeholder="https://www.example.com"
                      value={formData.website}
                      onChange={e => setFormData({...formData, website: e.target.value})}
                    />
                  </div>

                  <Separator />

                  {/* File Upload */}
                  <div>
                    <h3 className="font-semibold mb-4">资质材料</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">营业执照 *</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">点击或拖拽上传</p>
                          <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG、PDF</p>
                        </div>
                      </div>
                      <div>
                        <Label className="mb-2 block">工厂照片</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">上传工厂实景照片</p>
                          <p className="text-xs text-gray-400 mt-1">建议上传3-5张</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Terms */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="terms">
                        <AccordionTrigger className="text-sm font-medium">
                          入驻协议与条款
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm text-gray-600 space-y-2">
                            <p>1. 供应商需确保提交的信息真实有效</p>
                            <p>2. 产品质量需符合平台标准和国家法规</p>
                            <p>3. 需在规定时间内响应采购商询盘</p>
                            <p>4. 平台有权对违规供应商进行处罚或清退</p>
                            <p>5. 供应商需遵守平台的交易规则和费用政策</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <label className="flex items-center gap-2 mt-4 cursor-pointer">
                      <input type="checkbox" required className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">我已阅读并同意入驻协议 *</span>
                    </label>
                  </div>

                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-full bg-green-700 hover:bg-green-800 gap-2"
                  >
                    <FileText className="h-5 w-5" />
                    提交入驻申请
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            常见问题
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: '入驻需要什么费用？',
                  a: '目前平台入驻免费，仅收取交易成功后的小比例服务费。具体费用政策请参考入驻协议。',
                },
                {
                  q: '审核需要多长时间？',
                  a: '一般情况下，资质审核需要3-5个工作日。审核通过后会邮件通知您签署协议。',
                },
                {
                  q: '可以上架多少产品？',
                  a: '认证供应商可以上架无限数量的产品。建议上架完整的产品目录，便于采购商浏览。',
                },
                {
                  q: '如何处理采购商订单？',
                  a: '平台提供订单管理系统，您可以在后台查看询盘、确认订单、安排发货。建议在24小时内响应询盘。',
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              申请提交成功
            </DialogTitle>
            <DialogDescription>
              您的供应商入驻申请已提交成功，我们将在3-5个工作日内审核您的资质。
              审核结果将通过邮件通知您，请保持邮箱畅通。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}