import { NextResponse } from 'next/server';
import type { Product, Supplier, SiteSettings } from '@/types';

// 模拟数据存储（实际项目中应该使用数据库）
let siteSettings: SiteSettings = {
  siteName: 'B2B批发采购平台',
  siteDescription: '专业的B2B批发采购平台，连接优质供应商与采购商',
  contactEmail: 'support@b2b-platform.com',
  contactPhone: '400-888-8888',
  address: '浙江省杭州市滨江区网商路599号',
  logo: '',
  banner: '',
  seoKeywords: '',
  seoDescription: '',
};

let products: Product[] = [
  {
    id: 'prod-001',
    name: '一次性餐具套装',
    description: '环保可降解餐具套装，包含餐盒、筷子、勺子等',
    categoryId: 'cat-001',
    supplierId: 'sup-001',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 100, maxQuantity: 500, price: 0.8 },
      { minQuantity: 500, maxQuantity: 1000, price: 0.6 },
      { minQuantity: 1000, maxQuantity: null, price: 0.45 },
    ],
    moq: 100,
    unit: '套',
    specifications: [{ name: '材质', value: 'PLA' }, { name: '尺寸', value: '标准规格' }],
    sampleAvailable: true,
    samplePrice: 5,
    customizationAvailable: true,
    leadTime: '7-15天',
    status: 'active',
    createdAt: '2024-04-01',
    updatedAt: '2024-04-15',
  },
  {
    id: 'prod-002',
    name: 'LED节能灯泡',
    description: '9W LED节能灯泡，寿命长达5000小时',
    categoryId: 'cat-002',
    supplierId: 'sup-002',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 50, maxQuantity: 200, price: 12 },
      { minQuantity: 200, maxQuantity: 500, price: 10 },
      { minQuantity: 500, maxQuantity: null, price: 8 },
    ],
    moq: 50,
    unit: '个',
    specifications: [{ name: '功率', value: '9W' }, { name: '色温', value: '暖白/冷白可选' }],
    sampleAvailable: true,
    samplePrice: 15,
    customizationAvailable: false,
    leadTime: '5-10天',
    status: 'active',
    createdAt: '2024-04-02',
    updatedAt: '2024-04-14',
  },
  {
    id: 'prod-003',
    name: '服装包装袋',
    description: '自粘式服装包装袋，透明材质',
    categoryId: 'cat-003',
    supplierId: 'sup-003',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 1000, maxQuantity: 5000, price: 0.15 },
      { minQuantity: 5000, maxQuantity: 10000, price: 0.12 },
      { minQuantity: 10000, maxQuantity: null, price: 0.08 },
    ],
    moq: 1000,
    unit: '个',
    specifications: [{ name: '材质', value: 'PE' }, { name: '尺寸', value: '30x40cm' }],
    sampleAvailable: false,
    customizationAvailable: true,
    leadTime: '3-7天',
    status: 'active',
    createdAt: '2024-04-03',
    updatedAt: '2024-04-13',
  },
  {
    id: 'prod-004',
    name: '企业工作服',
    description: '定制企业工作服，多款式可选',
    categoryId: 'cat-004',
    supplierId: 'sup-004',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 30, maxQuantity: 100, price: 85 },
      { minQuantity: 100, maxQuantity: 300, price: 70 },
      { minQuantity: 300, maxQuantity: null, price: 55 },
    ],
    moq: 30,
    unit: '套',
    specifications: [{ name: '材质', value: '涤棉' }, { name: '颜色', value: '可定制' }],
    sampleAvailable: true,
    samplePrice: 100,
    customizationAvailable: true,
    leadTime: '15-30天',
    status: 'active',
    createdAt: '2024-04-04',
    updatedAt: '2024-04-12',
  },
  {
    id: 'prod-005',
    name: '仓储货架',
    description: '重型仓储货架，承重能力强',
    categoryId: 'cat-005',
    supplierId: 'sup-005',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 10, maxQuantity: 50, price: 380 },
      { minQuantity: 50, maxQuantity: 100, price: 350 },
      { minQuantity: 100, maxQuantity: null, price: 320 },
    ],
    moq: 10,
    unit: '套',
    specifications: [{ name: '材质', value: '钢材' }, { name: '尺寸', value: '可定制' }],
    sampleAvailable: false,
    customizationAvailable: true,
    leadTime: '10-20天',
    status: 'active',
    createdAt: '2024-04-05',
    updatedAt: '2024-04-11',
  },
  {
    id: 'prod-006',
    name: '办公文件柜',
    description: '钢制办公文件柜，防锈耐用',
    categoryId: 'cat-006',
    supplierId: 'sup-006',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 5, maxQuantity: 20, price: 280 },
      { minQuantity: 20, maxQuantity: 50, price: 250 },
      { minQuantity: 50, maxQuantity: null, price: 220 },
    ],
    moq: 5,
    unit: '个',
    specifications: [{ name: '材质', value: '冷轧钢' }, { name: '尺寸', value: '180x90x40cm' }],
    sampleAvailable: false,
    customizationAvailable: false,
    leadTime: '7-15天',
    status: 'active',
    createdAt: '2024-04-06',
    updatedAt: '2024-04-10',
  },
];

let suppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: '绿源餐具有限公司',
    description: '专业生产环保可降解餐具的厂家',
    logo: '/api/placeholder/100/100',
    location: '浙江杭州',
    categories: ['餐饮用品'],
    mainProducts: ['餐具', '餐盒', '筷子'],
    verified: true,
    rating: 4.8,
    reviewCount: 156,
    responseTime: '<2小时',
    totalEmployees: '50-100人',
    yearEstablished: 2018,
    annualRevenue: '500万-1000万',
    certifications: ['ISO 9001', '食品安全生产许可'],
    contactPerson: '张经理',
    contactPhone: '138-xxxx-xxxx',
    contactEmail: 'sales@greenyuan.com',
    factoryImages: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-002',
    name: '光明照明科技有限公司',
    description: 'LED照明产品专业制造商',
    logo: '/api/placeholder/100/100',
    location: '广东深圳',
    categories: ['照明设备'],
    mainProducts: ['LED灯泡', 'LED灯带', 'LED面板灯'],
    verified: true,
    rating: 4.9,
    reviewCount: 203,
    responseTime: '<1小时',
    totalEmployees: '100-200人',
    yearEstablished: 2015,
    annualRevenue: '1000万-2000万',
    certifications: ['ISO 9001', 'CE认证', 'RoHS认证'],
    contactPerson: '李经理',
    contactPhone: '139-xxxx-xxxx',
    contactEmail: 'sales@brightled.com',
    factoryImages: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-003',
    name: '精美包装材料厂',
    description: '各类包装材料生产定制',
    logo: '/api/placeholder/100/100',
    location: '江苏苏州',
    categories: ['包装材料'],
    mainProducts: ['包装袋', '包装盒', '包装纸'],
    verified: true,
    rating: 4.7,
    reviewCount: 89,
    responseTime: '<3小时',
    totalEmployees: '20-50人',
    yearEstablished: 2020,
    annualRevenue: '100万-300万',
    certifications: ['ISO 9001'],
    contactPerson: '王经理',
    contactPhone: '137-xxxx-xxxx',
    contactEmail: 'sales@finepack.com',
    factoryImages: ['/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-004',
    name: '卓越服装定制工厂',
    description: '企业服装定制专业服务商',
    logo: '/api/placeholder/100/100',
    location: '福建泉州',
    categories: ['服装定制'],
    mainProducts: ['工作服', '制服', '广告衫'],
    verified: true,
    rating: 4.6,
    reviewCount: 67,
    responseTime: '<2小时',
    totalEmployees: '100-200人',
    yearEstablished: 2016,
    annualRevenue: '500万-1000万',
    certifications: ['ISO 9001', '纺织品质量认证'],
    contactPerson: '陈经理',
    contactPhone: '135-xxxx-xxxx',
    contactEmail: 'sales@excellentwear.com',
    factoryImages: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-005',
    name: '仓储设备有限公司',
    description: '工业仓储货架专业制造商',
    logo: '/api/placeholder/100/100',
    location: '山东青岛',
    categories: ['仓储设备'],
    mainProducts: ['货架', '仓储设备', '物流设备'],
    verified: true,
    rating: 4.5,
    reviewCount: 45,
    responseTime: '<4小时',
    totalEmployees: '50-100人',
    yearEstablished: 2014,
    annualRevenue: '300万-500万',
    certifications: ['ISO 9001', '质量合格认证'],
    contactPerson: '孙经理',
    contactPhone: '136-xxxx-xxxx',
    contactEmail: 'sales@waretech.com',
    factoryImages: ['/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-006',
    name: '办公家具制造厂',
    description: '各类办公家具生产定制',
    logo: '/api/placeholder/100/100',
    location: '广东佛山',
    categories: ['办公家具'],
    mainProducts: ['办公桌', '文件柜', '办公椅'],
    verified: true,
    rating: 4.4,
    reviewCount: 38,
    responseTime: '<5小时',
    totalEmployees: '30-50人',
    yearEstablished: 2019,
    annualRevenue: '100万-200万',
    certifications: ['ISO 9001'],
    contactPerson: '赵经理',
    contactPhone: '138-xxxx-xxxx',
    contactEmail: 'sales@officepro.com',
    factoryImages: ['/api/placeholder/400/300'],
    status: 'active',
  },
];

interface InquiryData {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
    notes: string;
  }>;
  message: string;
  status: string;
  createdAt: string;
}

let inquiries: InquiryData[] = [];

// GET - 获取设置
export async function GET() {
  return NextResponse.json({
    settings: siteSettings,
    products: products,
    suppliers: suppliers,
    inquiries: inquiries,
  });
}

// POST - 更新设置
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case 'settings':
        siteSettings = { ...siteSettings, ...data };
        return NextResponse.json({ success: true, settings: siteSettings });
      
      case 'product':
        if (data.id) {
          // 更新产品
          const index = products.findIndex(p => p.id === data.id);
          if (index >= 0) {
            products[index] = { ...products[index], ...data, updatedAt: new Date().toISOString() };
          }
        } else {
          // 新增产品
          const newProduct: Product = {
            id: `prod-${String(products.length + 1).padStart(3, '0')}`,
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          products.push(newProduct);
        }
        return NextResponse.json({ success: true, products });
      
      case 'supplier':
        if (data.id) {
          // 更新供应商
          const index = suppliers.findIndex(s => s.id === data.id);
          if (index >= 0) {
            suppliers[index] = { ...suppliers[index], ...data };
          }
        } else {
          // 新增供应商
          const newSupplier: Supplier = {
            id: `sup-${String(suppliers.length + 1).padStart(3, '0')}`,
            ...data,
          };
          suppliers.push(newSupplier);
        }
        return NextResponse.json({ success: true, suppliers });
      
      case 'delete-product':
        products = products.filter(p => p.id !== data.id);
        return NextResponse.json({ success: true, products });
      
      case 'delete-supplier':
        suppliers = suppliers.filter(s => s.id !== data.id);
        return NextResponse.json({ success: true, suppliers });
      
      case 'inquiry':
        inquiries.push({
          id: `inq-${String(inquiries.length + 1).padStart(3, '0')}`,
          ...data,
          createdAt: new Date().toISOString(),
          status: 'pending',
        });
        return NextResponse.json({ success: true, inquiries });
      
      default:
        return NextResponse.json({ error: '无效的操作类型' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: '数据解析失败' }, { status: 400 });
  }
}