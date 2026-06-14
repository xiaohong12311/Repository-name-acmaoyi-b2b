import type { Product, Supplier, Category, FavoriteItem, SampleCartItem } from '@/types';

// 模拟产品数据
export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: '高品质不锈钢餐具套装',
    description: '采用304不锈钢材质，包含餐刀、餐叉、餐勺各24件，适合酒店餐厅批量采购。表面抛光处理，耐用易清洗。',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      'https://images.unsplash.com/photo-1584993131806-4b4e5c3c8fda?w=400',
    ],
    categoryId: 'cat-kitchen',
    supplierId: 'sup-001',
    moq: 100,
    unit: '套',
    specifications: [
      { name: '材质', value: '304不锈钢' },
      { name: '套装内容', value: '餐刀×24 + 餐叉×24 + 餐勺×24' },
      { name: '重量', value: '约3.5kg' },
      { name: '包装', value: '纸箱包装' },
    ],
    tierPrices: [
      { minQuantity: 100, maxQuantity: 500, price: 12.5, discount: '省8%' },
      { minQuantity: 501, maxQuantity: 1000, price: 11.8, discount: '省15%' },
      { minQuantity: 1001, maxQuantity: null, price: 10.5, discount: '省25%' },
    ],
    samplePrice: 35,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '7-15个工作日',
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: 'prod-002',
    name: 'LED商业照明灯具',
    description: '高亮度LED面板灯，适用于办公室、商场、展厅等商业场所。节能高效，寿命长达50000小时。',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1a6a0db60fbb?w=400',
      'https://images.unsplash.com/photo-1565814322220-0dc0593db0c9?w=400',
    ],
    categoryId: 'cat-lighting',
    supplierId: 'sup-002',
    moq: 50,
    unit: '件',
    specifications: [
      { name: '功率', value: '60W' },
      { name: '尺寸', value: '600×600mm' },
      { name: '色温', value: '4000K（自然白）' },
      { name: '光效', value: '≥100lm/W' },
    ],
    tierPrices: [
      { minQuantity: 50, maxQuantity: 200, price: 45, discount: '省10%' },
      { minQuantity: 201, maxQuantity: 500, price: 40, discount: '省20%' },
      { minQuantity: 501, maxQuantity: null, price: 35, discount: '省30%' },
    ],
    samplePrice: 60,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '10-20个工作日',
    status: 'active',
    createdAt: '2024-02-10',
    updatedAt: '2024-04-05',
  },
  {
    id: 'prod-003',
    name: '定制印刷包装盒',
    description: '提供各类产品包装盒定制服务，支持Logo印刷、尺寸定制、材质选择。适合电子产品、礼品、食品等行业。',
    images: [
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400',
      'https://images.unsplash.com/photo-1607166452427-7e4477c5a9a8?w=400',
    ],
    categoryId: 'cat-packaging',
    supplierId: 'sup-003',
    moq: 500,
    unit: '个',
    specifications: [
      { name: '材质', value: '可选白卡纸/灰板纸/牛皮纸' },
      { name: '印刷', value: '四色印刷/专色印刷' },
      { name: '表面处理', value: '可选覆膜/烫金/UV' },
      { name: '定制周期', value: '设计确认后5-10天' },
    ],
    tierPrices: [
      { minQuantity: 500, maxQuantity: 2000, price: 2.8 },
      { minQuantity: 2001, maxQuantity: 5000, price: 2.2 },
      { minQuantity: 5001, maxQuantity: null, price: 1.8 },
    ],
    samplePrice: 5,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '设计确认后7-15个工作日',
    status: 'active',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-15',
  },
  {
    id: 'prod-004',
    name: '工业级电动工具套装',
    description: '专业级电动工具套装，包含电钻、电锯、打磨机等，适合工厂生产线及建筑工地使用。',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c3769071a1e8?w=400',
      'https://images.unsplash.com/photo-1581092160562-6aa8e93f8d3a?w=400',
    ],
    categoryId: 'cat-tools',
    supplierId: 'sup-001',
    moq: 20,
    unit: '套',
    specifications: [
      { name: '套装内容', value: '电钻×2 + 电锯×1 + 打磨机×1 + 配件' },
      { name: '电压', value: '220V' },
      { name: '功率', value: '各工具800-1200W' },
      { name: '保修', value: '1年保修' },
    ],
    tierPrices: [
      { minQuantity: 20, maxQuantity: 100, price: 850 },
      { minQuantity: 101, maxQuantity: 500, price: 780 },
      { minQuantity: 501, maxQuantity: null, price: 720 },
    ],
    samplePrice: 1200,
    sampleAvailable: false,
    customizationAvailable: false,
    leadTime: '15-30个工作日',
    status: 'active',
    createdAt: '2024-03-01',
    updatedAt: '2024-04-10',
  },
  {
    id: 'prod-005',
    name: '棉质工作服定制',
    description: '高品质棉质工作服，支持企业Logo定制，适合工厂员工、仓库人员等。透气舒适，耐穿耐磨。',
    images: [
      'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400',
      'https://images.unsplash.com/photo-1598632640488-5e6a1e7a0a5d?w=400',
    ],
    categoryId: 'cat-garment',
    supplierId: 'sup-004',
    moq: 100,
    unit: '件',
    specifications: [
      { name: '材质', value: '100%棉' },
      { name: '颜色', value: '可选蓝/灰/白/黑' },
      { name: '尺码', value: 'S-XXXL' },
      { name: '定制', value: 'Logo印刷/绣花' },
    ],
    tierPrices: [
      { minQuantity: 100, maxQuantity: 300, price: 45 },
      { minQuantity: 301, maxQuantity: 1000, price: 38 },
      { minQuantity: 1001, maxQuantity: null, price: 32 },
    ],
    samplePrice: 60,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '设计确认后10-20个工作日',
    status: 'active',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-25',
  },
  {
    id: 'prod-006',
    name: '智能仓储货架系统',
    description: '模块化智能货架系统，配备电子标签和库存管理接口，适合电商仓库、物流中心。',
    images: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400',
      'https://images.unsplash.com/photo-1586528136493-4d7b3e5c8c54?w=400',
    ],
    categoryId: 'cat-storage',
    supplierId: 'sup-002',
    moq: 10,
    unit: '组',
    specifications: [
      { name: '规格', value: '高度2-6米可选' },
      { name: '承重', value: '每层200-500kg' },
      { name: '材质', value: '冷轧钢' },
      { name: '系统', value: '含电子标签及管理软件' },
    ],
    tierPrices: [
      { minQuantity: 10, maxQuantity: 50, price: 2800 },
      { minQuantity: 51, maxQuantity: 200, price: 2500 },
      { minQuantity: 201, maxQuantity: null, price: 2200 },
    ],
    samplePrice: 3200,
    sampleAvailable: false,
    customizationAvailable: true,
    leadTime: '30-45个工作日',
    status: 'active',
    createdAt: '2024-01-25',
    updatedAt: '2024-04-15',
  },
];

// 模拟供应商数据
export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: '华东五金制造有限公司',
    logo: 'https://images.unsplash.com/photo-1560472354-b4f8a4f5c6b0?w=100',
    description: '专注五金工具及餐具制造20年，拥有完整生产线和严格质检体系。',
    location: '浙江省义乌市',
    categories: ['cat-kitchen', 'cat-tools'],
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    yearEstablished: 2004,
    totalEmployees: '500-1000人',
    annualRevenue: '5000-10000万美元',
    certifications: ['ISO9001', 'ISO14001', 'CE认证'],
    mainProducts: ['餐具', '电动工具', '厨房用品'],
    factoryImages: [
      'https://images.unsplash.com/photo-1581091226826-a8a4d5d88f16?w=400',
      'https://images.unsplash.com/photo-1565043666747-5f33f8a98e9b?w=400',
    ],
    contactPerson: '张经理',
    contactPhone: '+86 138****5678',
    contactEmail: 'sales@huadong-wujin.com',
    responseTime: '平均2小时内',
    status: 'active',
  },
  {
    id: 'sup-002',
    name: '深圳光电科技集团',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100',
    description: 'LED照明及智能设备制造商，产品出口全球50+国家。',
    location: '广东省深圳市',
    categories: ['cat-lighting', 'cat-storage'],
    rating: 4.9,
    reviewCount: 289,
    verified: true,
    yearEstablished: 2010,
    totalEmployees: '1000-2000人',
    annualRevenue: '10000-50000万美元',
    certifications: ['ISO9001', 'UL认证', 'CE认证', 'RoHS'],
    mainProducts: ['LED灯具', '智能仓储', '商业照明'],
    factoryImages: [
      'https://images.unsplash.com/photo-1581092160562-6aa8e93f8d3a?w=400',
      'https://images.unsplash.com/photo-1565793298595-7a8d5eb5d03b?w=400',
    ],
    contactPerson: '李总监',
    contactPhone: '+86 139****8899',
    contactEmail: 'export@sz-optotech.com',
    responseTime: '平均1小时内',
    status: 'active',
  },
  {
    id: 'sup-003',
    name: '精美包装印刷厂',
    logo: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=100',
    description: '专业包装设计与印刷，提供一站式定制解决方案。',
    location: '广东省东莞市',
    categories: ['cat-packaging'],
    rating: 4.6,
    reviewCount: 98,
    verified: true,
    yearEstablished: 2015,
    totalEmployees: '200-500人',
    annualRevenue: '1000-5000万美元',
    certifications: ['ISO9001', 'FSC认证'],
    mainProducts: ['包装盒', '礼品盒', '印刷服务'],
    factoryImages: [
      'https://images.unsplash.com/photo-1607166452427-7e4477c5a9a8?w=400',
    ],
    contactPerson: '王厂长',
    contactPhone: '+86 137****1234',
    contactEmail: 'sales@jingmei-pack.com',
    responseTime: '平均4小时内',
    status: 'active',
  },
  {
    id: 'sup-004',
    name: '苏州纺织服装有限公司',
    logo: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=100',
    description: '工作服、制服定制专家，服务众多知名企业。',
    location: '江苏省苏州市',
    categories: ['cat-garment'],
    rating: 4.7,
    reviewCount: 124,
    verified: true,
    yearEstablished: 2008,
    totalEmployees: '300-500人',
    annualRevenue: '2000-5000万美元',
    certifications: ['ISO9001', 'Oeko-Tex'],
    mainProducts: ['工作服', '制服', '定制服装'],
    factoryImages: [
      'https://images.unsplash.com/photo-1598632640488-5e6a1e7a0a5d?w=400',
    ],
    contactPerson: '陈经理',
    contactPhone: '+86 135****7890',
    contactEmail: 'order@suzhou-textile.com',
    responseTime: '平均3小时内',
    status: 'active',
  },
];

// 模拟分类数据
export const mockCategories: Category[] = [
  {
    id: 'cat-kitchen',
    name: '厨房用品',
    slug: 'kitchen',
    description: '餐具、厨具、厨房配件等',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-lighting',
    name: '照明设备',
    slug: 'lighting',
    description: 'LED灯具、商业照明、工业照明',
    image: 'https://images.unsplash.com/photo-1513506003901-1a6a0db60fbb?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-packaging',
    name: '包装印刷',
    slug: 'packaging',
    description: '包装盒、礼品盒、印刷定制',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-tools',
    name: '工业工具',
    slug: 'tools',
    description: '电动工具、手动工具、工具套装',
    image: 'https://images.unsplash.com/photo-1504148455328-c3769071a1e8?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-garment',
    name: '服装定制',
    slug: 'garment',
    description: '工作服、制服、定制服装',
    image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-storage',
    name: '仓储设备',
    slug: 'storage',
    description: '货架、仓储系统、物流设备',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200',
    parentId: null,
    children: [],
  },
];

// 模拟收藏夹数据
export const mockFavorites: FavoriteItem[] = [];

// 模拟样品车数据
export const mockSampleCart: SampleCartItem[] = [];

// 获取产品对应的供应商
export function getProductSupplier(productId: string): Supplier | undefined {
  const product = mockProducts.find(p => p.id === productId);
  if (!product) return undefined;
  return mockSuppliers.find(s => s.id === product.supplierId);
}

// 获取分类下的产品
export function getProductsByCategory(categoryId: string): Product[] {
  return mockProducts.filter(p => p.categoryId === categoryId);
}

// 获取供应商的产品
export function getProductsBySupplier(supplierId: string): Product[] {
  return mockProducts.filter(p => p.supplierId === supplierId);
}

// 根据数量获取价格
export function getPriceByQuantity(product: Product, quantity: number): number {
  for (const tier of product.tierPrices) {
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
        return tier.price;
      }
    }
  }
  return product.tierPrices[0]?.price || 0;
}