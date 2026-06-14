import { NextResponse } from 'next/server';
import type { Product, Supplier, SiteSettings } from '@/types';

// Mock data storage (should use database in production)
let siteSettings: SiteSettings = {
  siteName: 'B2B Wholesale Platform',
  siteDescription: 'Professional B2B wholesale platform connecting quality suppliers with buyers',
  contactEmail: 'support@b2b-platform.com',
  contactPhone: '+1-888-888-8888',
  address: '123 Business Avenue, Hangzhou, China',
  logo: '',
  banner: '',
  seoKeywords: '',
  seoDescription: '',
};

let products: Product[] = [
  {
    id: 'prod-001',
    name: 'Disposable Tableware Set',
    description: 'Eco-friendly biodegradable tableware set, including food containers, chopsticks, spoons, etc.',
    categoryId: 'cat-001',
    supplierId: 'sup-001',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 100, maxQuantity: 500, price: 0.8 },
      { minQuantity: 500, maxQuantity: 1000, price: 0.6 },
      { minQuantity: 1000, maxQuantity: null, price: 0.45 },
    ],
    moq: 100,
    unit: 'sets',
    specifications: [{ name: 'Material', value: 'PLA' }, { name: 'Size', value: 'Standard' }],
    sampleAvailable: true,
    samplePrice: 5,
    customizationAvailable: true,
    leadTime: '7-15 days',
    status: 'active',
    createdAt: '2024-04-01',
    updatedAt: '2024-04-15',
  },
  {
    id: 'prod-002',
    name: 'LED Energy Saving Bulb',
    description: '9W LED energy saving bulb, lifespan up to 5000 hours',
    categoryId: 'cat-002',
    supplierId: 'sup-002',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 50, maxQuantity: 200, price: 12 },
      { minQuantity: 200, maxQuantity: 500, price: 10 },
      { minQuantity: 500, maxQuantity: null, price: 8 },
    ],
    moq: 50,
    unit: 'pcs',
    specifications: [{ name: 'Power', value: '9W' }, { name: 'Color Temperature', value: 'Warm White / Cool White' }],
    sampleAvailable: true,
    samplePrice: 15,
    customizationAvailable: false,
    leadTime: '5-10 days',
    status: 'active',
    createdAt: '2024-04-02',
    updatedAt: '2024-04-14',
  },
  {
    id: 'prod-003',
    name: 'Apparel Packaging Bag',
    description: 'Self-adhesive apparel packaging bag, transparent material',
    categoryId: 'cat-003',
    supplierId: 'sup-003',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 1000, maxQuantity: 5000, price: 0.15 },
      { minQuantity: 5000, maxQuantity: 10000, price: 0.12 },
      { minQuantity: 10000, maxQuantity: null, price: 0.08 },
    ],
    moq: 1000,
    unit: 'pcs',
    specifications: [{ name: 'Material', value: 'PE' }, { name: 'Size', value: '30x40cm' }],
    sampleAvailable: false,
    customizationAvailable: true,
    leadTime: '3-7 days',
    status: 'active',
    createdAt: '2024-04-03',
    updatedAt: '2024-04-13',
  },
  {
    id: 'prod-004',
    name: 'Corporate Workwear',
    description: 'Custom corporate workwear, multiple styles available',
    categoryId: 'cat-004',
    supplierId: 'sup-004',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 30, maxQuantity: 100, price: 85 },
      { minQuantity: 100, maxQuantity: 300, price: 70 },
      { minQuantity: 300, maxQuantity: null, price: 55 },
    ],
    moq: 30,
    unit: 'sets',
    specifications: [{ name: 'Material', value: 'Polyester/Cotton' }, { name: 'Color', value: 'Customizable' }],
    sampleAvailable: true,
    samplePrice: 100,
    customizationAvailable: true,
    leadTime: '15-30 days',
    status: 'active',
    createdAt: '2024-04-04',
    updatedAt: '2024-04-12',
  },
  {
    id: 'prod-005',
    name: 'Warehouse Storage Rack',
    description: 'Heavy-duty warehouse storage rack, strong load capacity',
    categoryId: 'cat-005',
    supplierId: 'sup-005',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 10, maxQuantity: 50, price: 380 },
      { minQuantity: 50, maxQuantity: 100, price: 350 },
      { minQuantity: 100, maxQuantity: null, price: 320 },
    ],
    moq: 10,
    unit: 'sets',
    specifications: [{ name: 'Material', value: 'Steel' }, { name: 'Size', value: 'Customizable' }],
    sampleAvailable: false,
    customizationAvailable: true,
    leadTime: '10-20 days',
    status: 'active',
    createdAt: '2024-04-05',
    updatedAt: '2024-04-11',
  },
  {
    id: 'prod-006',
    name: 'Office File Cabinet',
    description: 'Steel office file cabinet, rust-resistant and durable',
    categoryId: 'cat-006',
    supplierId: 'sup-006',
    images: ['/api/placeholder/300/300'],
    tierPrices: [
      { minQuantity: 5, maxQuantity: 20, price: 280 },
      { minQuantity: 20, maxQuantity: 50, price: 250 },
      { minQuantity: 50, maxQuantity: null, price: 220 },
    ],
    moq: 5,
    unit: 'pcs',
    specifications: [{ name: 'Material', value: 'Cold-rolled Steel' }, { name: 'Size', value: '180x90x40cm' }],
    sampleAvailable: false,
    customizationAvailable: false,
    leadTime: '7-15 days',
    status: 'active',
    createdAt: '2024-04-06',
    updatedAt: '2024-04-10',
  },
];

let suppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Green Source Tableware Co., Ltd.',
    description: 'Professional manufacturer of eco-friendly biodegradable tableware',
    logo: '/api/placeholder/100/100',
    location: 'Hangzhou, China',
    country: 'China',
    businessType: 'Manufacturer',
    categories: ['Food Service Supplies'],
    mainProducts: ['Tableware Sets', 'Food Containers', 'Cutlery'],
    productCount: 15,
    website: 'https://www.greensourcetableware.com',
    verified: true,
    rating: 4.8,
    reviewCount: 156,
    responseTime: '<2 hours',
    employees: 75,
    yearsInBusiness: 2018,
    annualRevenue: '$500K-$1M',
    certifications: ['ISO 9001', 'Food Safety License'],
    contactPerson: 'Manager Zhang',
    contactPhone: '+86-138-xxxx-xxxx',
    contactEmail: 'sales@greenyuan.com',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-002',
    name: 'Bright LED Technology Co., Ltd.',
    description: 'Professional LED lighting product manufacturer',
    logo: '/api/placeholder/100/100',
    location: 'Shenzhen, China',
    country: 'China',
    businessType: 'Manufacturer',
    categories: ['Lighting Equipment'],
    mainProducts: ['LED Bulbs', 'LED Strips', 'LED Panel Lights'],
    productCount: 20,
    website: 'https://www.brightledtech.com',
    verified: true,
    rating: 4.9,
    reviewCount: 203,
    responseTime: '<1 hour',
    employees: 150,
    yearsInBusiness: 2015,
    annualRevenue: '$1M-$2M',
    certifications: ['ISO 9001', 'CE Certified', 'RoHS Certified'],
    contactPerson: 'Manager Li',
    contactPhone: '+86-139-xxxx-xxxx',
    contactEmail: 'sales@brightled.com',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-003',
    name: 'Fine Packaging Materials Factory',
    description: 'Custom packaging material production',
    logo: '/api/placeholder/100/100',
    location: 'Suzhou, China',
    country: 'China',
    businessType: 'Manufacturer',
    categories: ['Packaging Materials'],
    mainProducts: ['Packaging Bags', 'Packaging Boxes', 'Wrapping Paper'],
    productCount: 12,
    website: 'https://www.finepackaging.com',
    verified: true,
    rating: 4.7,
    reviewCount: 89,
    responseTime: '<3 hours',
    employees: 35,
    yearsInBusiness: 2020,
    annualRevenue: '$100K-$300K',
    certifications: ['ISO 9001'],
    contactPerson: 'Manager Wang',
    contactPhone: '+86-137-xxxx-xxxx',
    contactEmail: 'sales@finepack.com',
    images: ['/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-004',
    name: 'Excellent Apparel Factory',
    description: 'Professional corporate apparel customization',
    logo: '/api/placeholder/100/100',
    location: 'Quanzhou, China',
    country: 'China',
    businessType: 'Manufacturer',
    categories: ['Apparel'],
    mainProducts: ['Workwear', 'Uniforms', 'Promotional T-shirts'],
    productCount: 18,
    website: 'https://www.excellentapparel.com',
    verified: true,
    rating: 4.6,
    reviewCount: 67,
    responseTime: '<2 hours',
    employees: 150,
    yearsInBusiness: 2016,
    annualRevenue: '$500K-$1M',
    certifications: ['ISO 9001', 'Textile Quality Certificate'],
    contactPerson: 'Manager Chen',
    contactPhone: '+86-135-xxxx-xxxx',
    contactEmail: 'sales@excellentwear.com',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-005',
    name: 'Warehouse Equipment Ltd.',
    description: 'Industrial storage rack manufacturer',
    logo: '/api/placeholder/100/100',
    location: 'Qingdao, China',
    country: 'China',
    businessType: 'Manufacturer',
    categories: ['Warehouse Equipment'],
    mainProducts: ['Storage Racks', 'Warehouse Equipment', 'Logistics Equipment'],
    productCount: 10,
    website: 'https://www.warehouserequipment.com',
    verified: true,
    rating: 4.5,
    reviewCount: 45,
    responseTime: '<4 hours',
    employees: 75,
    yearsInBusiness: 2014,
    annualRevenue: '$300K-$500K',
    certifications: ['ISO 9001', 'Quality Certification'],
    contactPerson: 'Manager Sun',
    contactPhone: '+86-136-xxxx-xxxx',
    contactEmail: 'sales@waretech.com',
    images: ['/api/placeholder/400/300'],
    status: 'active',
  },
  {
    id: 'sup-006',
    name: 'Office Furniture Factory',
    description: 'Custom office furniture production',
    logo: '/api/placeholder/100/100',
    location: 'Foshan, China',
    country: 'China',
    businessType: 'Manufacturer',
    categories: ['Office Furniture'],
    mainProducts: ['Office Desks', 'File Cabinets', 'Office Chairs'],
    productCount: 8,
    website: 'https://www.officefurniturepro.com',
    verified: true,
    rating: 4.4,
    reviewCount: 38,
    responseTime: '<5 hours',
    employees: 40,
    yearsInBusiness: 2019,
    annualRevenue: '$100K-$200K',
    certifications: ['ISO 9001'],
    contactPerson: 'Manager Zhao',
    contactPhone: '+86-138-xxxx-xxxx',
    contactEmail: 'sales@officepro.com',
    images: ['/api/placeholder/400/300'],
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