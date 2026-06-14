import type { Product, Supplier, Category, FavoriteItem, SampleCartItem } from '@/types';

// Mock product data
export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Premium Stainless Steel Cutlery Set',
    description: 'Made of 304 stainless steel, includes 24 each of knives, forks, and spoons. Ideal for bulk hotel and restaurant purchases. Polished finish, durable and easy to clean.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      'https://images.unsplash.com/photo-1584993131806-4b4e5c3c8fda?w=400',
    ],
    categoryId: 'cat-kitchen',
    supplierId: 'sup-001',
    moq: 100,
    unit: 'sets',
    specifications: [
      { name: 'Material', value: '304 Stainless Steel' },
      { name: 'Set Contents', value: 'Knife×24 + Fork×24 + Spoon×24' },
      { name: 'Weight', value: '~3.5kg' },
      { name: 'Packaging', value: 'Carton Box' },
    ],
    tierPrices: [
      { minQuantity: 100, maxQuantity: 500, price: 12.5, discount: 'Save 8%' },
      { minQuantity: 501, maxQuantity: 1000, price: 11.8, discount: 'Save 15%' },
      { minQuantity: 1001, maxQuantity: null, price: 10.5, discount: 'Save 25%' },
    ],
    samplePrice: 35,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '7-15 business days',
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: 'prod-002',
    name: 'LED Commercial Lighting Panel',
    description: 'High brightness LED panel light, suitable for offices, malls, exhibition halls. Energy efficient, 50,000 hours lifespan.',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1a6a0db60fbb?w=400',
      'https://images.unsplash.com/photo-1565814322220-0dc0593db0c9?w=400',
    ],
    categoryId: 'cat-lighting',
    supplierId: 'sup-002',
    moq: 50,
    unit: 'units',
    specifications: [
      { name: 'Power', value: '60W' },
      { name: 'Size', value: '600×600mm' },
      { name: 'Color Temperature', value: '4000K (Natural White)' },
      { name: 'Efficacy', value: '≥100lm/W' },
    ],
    tierPrices: [
      { minQuantity: 50, maxQuantity: 200, price: 45, discount: 'Save 10%' },
      { minQuantity: 201, maxQuantity: 500, price: 40, discount: 'Save 20%' },
      { minQuantity: 501, maxQuantity: null, price: 35, discount: 'Save 30%' },
    ],
    samplePrice: 60,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '10-20 business days',
    status: 'active',
    createdAt: '2024-02-10',
    updatedAt: '2024-04-05',
  },
  {
    id: 'prod-003',
    name: 'Custom Printed Packaging Boxes',
    description: 'Custom packaging boxes for various products. Logo printing, size customization, material selection available. Ideal for electronics, gifts, food industries.',
    images: [
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400',
      'https://images.unsplash.com/photo-1607166452427-7e4477c5a9a8?w=400',
    ],
    categoryId: 'cat-packaging',
    supplierId: 'sup-003',
    moq: 500,
    unit: 'pcs',
    specifications: [
      { name: 'Material', value: 'White card/Grey board/Kraft paper' },
      { name: 'Printing', value: '4-color/Spot color' },
      { name: 'Surface Treatment', value: 'Lamination/Gold foil/UV' },
      { name: 'Production Time', value: '5-10 days after design approval' },
    ],
    tierPrices: [
      { minQuantity: 500, maxQuantity: 2000, price: 2.8 },
      { minQuantity: 2001, maxQuantity: 5000, price: 2.2 },
      { minQuantity: 5001, maxQuantity: null, price: 1.8 },
    ],
    samplePrice: 5,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '7-15 business days after design approval',
    status: 'active',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-15',
  },
  {
    id: 'prod-004',
    name: 'Industrial Power Tool Set',
    description: 'Professional power tool set including drill, saw, grinder. Suitable for factory production lines and construction sites.',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c3769071a1e8?w=400',
      'https://images.unsplash.com/photo-1581092160562-6aa8e93f8d3a?w=400',
    ],
    categoryId: 'cat-tools',
    supplierId: 'sup-001',
    moq: 20,
    unit: 'sets',
    specifications: [
      { name: 'Set Contents', value: 'Drill×2 + Saw×1 + Grinder×1 + Accessories' },
      { name: 'Voltage', value: '220V' },
      { name: 'Power', value: '800-1200W per tool' },
      { name: 'Warranty', value: '1 Year' },
    ],
    tierPrices: [
      { minQuantity: 20, maxQuantity: 100, price: 850 },
      { minQuantity: 101, maxQuantity: 500, price: 780 },
      { minQuantity: 501, maxQuantity: null, price: 720 },
    ],
    samplePrice: 1200,
    sampleAvailable: false,
    customizationAvailable: false,
    leadTime: '15-30 business days',
    status: 'active',
    createdAt: '2024-03-01',
    updatedAt: '2024-04-10',
  },
  {
    id: 'prod-005',
    name: 'Custom Cotton Work Uniforms',
    description: 'High quality cotton work uniforms with logo customization. Breathable and durable, ideal for factory and warehouse workers.',
    images: [
      'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400',
      'https://images.unsplash.com/photo-1598632640488-5e6a1e7a0a5d?w=400',
    ],
    categoryId: 'cat-garment',
    supplierId: 'sup-004',
    moq: 100,
    unit: 'pcs',
    specifications: [
      { name: 'Material', value: '100% Cotton' },
      { name: 'Color', value: 'Blue/Grey/White/Black' },
      { name: 'Size', value: 'S-XXXL' },
      { name: 'Customization', value: 'Logo printing/Embroidery' },
    ],
    tierPrices: [
      { minQuantity: 100, maxQuantity: 300, price: 45 },
      { minQuantity: 301, maxQuantity: 1000, price: 38 },
      { minQuantity: 1001, maxQuantity: null, price: 32 },
    ],
    samplePrice: 60,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '10-20 business days after design approval',
    status: 'active',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-25',
  },
  {
    id: 'prod-006',
    name: 'Smart Warehouse Shelving System',
    description: 'Modular smart shelving system with electronic labels and inventory management interface. Ideal for e-commerce warehouses and logistics centers.',
    images: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400',
      'https://images.unsplash.com/photo-1586528136493-4d7b3e5c8c54?w=400',
    ],
    categoryId: 'cat-storage',
    supplierId: 'sup-002',
    moq: 10,
    unit: 'sets',
    specifications: [
      { name: 'Height', value: '2-6m options' },
      { name: 'Load Capacity', value: '200-500kg per level' },
      { name: 'Material', value: 'Cold-rolled Steel' },
      { name: 'System', value: 'Includes e-labels & management software' },
    ],
    tierPrices: [
      { minQuantity: 10, maxQuantity: 50, price: 2800 },
      { minQuantity: 51, maxQuantity: 200, price: 2500 },
      { minQuantity: 201, maxQuantity: null, price: 2200 },
    ],
    samplePrice: 3200,
    sampleAvailable: false,
    customizationAvailable: true,
    leadTime: '30-45 business days',
    status: 'active',
    createdAt: '2024-01-25',
    updatedAt: '2024-04-15',
  },
];

// Mock supplier data
export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'East China Hardware Manufacturing Co.',
    logo: 'https://images.unsplash.com/photo-1560472354-b4f8a4f5c6b0?w=100',
    description: '20 years specializing in hardware tools and cutlery manufacturing with complete production lines and strict QC system.',
    location: 'Yiwu City, Zhejiang Province',
    country: 'China',
    businessType: 'manufacturer',
    categories: ['cat-kitchen', 'cat-tools'],
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    yearsInBusiness: 20,
    employees: 750,
    productCount: 25,
    annualRevenue: '$50-100M',
    certifications: ['ISO9001', 'ISO14001', 'CE'],
    mainProducts: ['Cutlery', 'Power Tools', 'Kitchen Supplies'],
    images: [
      'https://images.unsplash.com/photo-1581091226826-a8a4d5d88f16?w=400',
      'https://images.unsplash.com/photo-1565043666747-5f33f8a98e9b?w=400',
    ],
    website: 'https://www.huadong-wujin.com',
    contactPerson: 'Manager Zhang',
    contactPhone: '+86 138****5678',
    contactEmail: 'sales@huadong-wujin.com',
    responseTime: 'Within 2 hours average',
    status: 'active',
  },
  {
    id: 'sup-002',
    name: 'Shenzhen Optoelectronics Tech Group',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100',
    description: 'LED lighting and smart device manufacturer, exporting to 50+ countries worldwide.',
    location: 'Shenzhen City, Guangdong Province',
    country: 'China',
    businessType: 'manufacturer',
    categories: ['cat-lighting', 'cat-storage'],
    rating: 4.9,
    reviewCount: 289,
    verified: true,
    yearsInBusiness: 14,
    employees: 1500,
    productCount: 18,
    annualRevenue: '$100-500M',
    certifications: ['ISO9001', 'UL', 'CE', 'RoHS'],
    mainProducts: ['LED Lighting', 'Smart Storage', 'Commercial Lighting'],
    images: [
      'https://images.unsplash.com/photo-1581092160562-6aa8e93f8d3a?w=400',
      'https://images.unsplash.com/photo-1565793298595-7a8d5eb5d03b?w=400',
    ],
    website: 'https://www.sz-optotech.com',
    contactPerson: 'Director Li',
    contactPhone: '+86 139****8899',
    contactEmail: 'export@sz-optotech.com',
    responseTime: 'Within 1 hour average',
    status: 'active',
  },
  {
    id: 'sup-003',
    name: 'Premium Packaging & Printing Factory',
    logo: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=100',
    description: 'Professional packaging design and printing, providing one-stop custom solutions.',
    location: 'Dongguan City, Guangdong Province',
    country: 'China',
    businessType: 'manufacturer',
    categories: ['cat-packaging'],
    rating: 4.6,
    reviewCount: 98,
    verified: true,
    yearsInBusiness: 9,
    employees: 350,
    productCount: 12,
    annualRevenue: '$10-50M',
    certifications: ['ISO9001', 'FSC'],
    mainProducts: ['Packaging Boxes', 'Gift Boxes', 'Printing Services'],
    images: [
      'https://images.unsplash.com/photo-1607166452427-7e4477c5a9a8?w=400',
    ],
    website: 'https://www.jingmei-pack.com',
    contactPerson: 'Factory Manager Wang',
    contactPhone: '+86 137****1234',
    contactEmail: 'sales@jingmei-pack.com',
    responseTime: 'Within 4 hours average',
    status: 'active',
  },
  {
    id: 'sup-004',
    name: 'Suzhou Textile & Apparel Co.',
    logo: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=100',
    description: 'Work uniforms and custom apparel specialist, serving many well-known enterprises.',
    location: 'Suzhou City, Jiangsu Province',
    country: 'China',
    businessType: 'manufacturer',
    categories: ['cat-garment'],
    rating: 4.7,
    reviewCount: 124,
    verified: true,
    yearsInBusiness: 16,
    employees: 400,
    productCount: 15,
    annualRevenue: '$20-50M',
    certifications: ['ISO9001', 'Oeko-Tex'],
    mainProducts: ['Work Uniforms', 'Corporate Apparel', 'Custom Clothing'],
    images: [
      'https://images.unsplash.com/photo-1598632640488-5e6a1e7a0a5d?w=400',
    ],
    website: 'https://www.suzhou-textile.com',
    contactPerson: 'Manager Chen',
    contactPhone: '+86 135****7890',
    contactEmail: 'order@suzhou-textile.com',
    responseTime: 'Within 3 hours average',
    status: 'active',
  },
];

// Mock category data
export const mockCategories: Category[] = [
  {
    id: 'cat-kitchen',
    name: 'Kitchen Supplies',
    slug: 'kitchen',
    description: 'Cutlery, kitchenware, kitchen accessories',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-lighting',
    name: 'Lighting Equipment',
    slug: 'lighting',
    description: 'LED lights, commercial lighting, industrial lighting',
    image: 'https://images.unsplash.com/photo-1513506003901-1a6a0db60fbb?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-packaging',
    name: 'Packaging & Printing',
    slug: 'packaging',
    description: 'Packaging boxes, gift boxes, custom printing',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-tools',
    name: 'Industrial Tools',
    slug: 'tools',
    description: 'Power tools, hand tools, tool sets',
    image: 'https://images.unsplash.com/photo-1504148455328-c3769071a1e8?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-garment',
    name: 'Custom Apparel',
    slug: 'garment',
    description: 'Work uniforms, corporate apparel, custom clothing',
    image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=200',
    parentId: null,
    children: [],
  },
  {
    id: 'cat-storage',
    name: 'Storage Equipment',
    slug: 'storage',
    description: 'Warehouse shelving, storage systems, logistics equipment',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200',
    parentId: null,
    children: [],
  },
];

// Helper functions for product/supplier lookup
export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getSupplierById(id: string): Supplier | undefined {
  return mockSuppliers.find(s => s.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return mockProducts.filter(p => p.categoryId === categoryId);
}

export function getProductsBySupplier(supplierId: string): Product[] {
  return mockProducts.filter(p => p.supplierId === supplierId);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find(c => c.slug === slug);
}

export function getProductSupplier(productId: string): Supplier | undefined {
  const product = getProductById(productId);
  if (!product) return undefined;
  return getSupplierById(product.supplierId);
}

export function getPriceByQuantity(productId: string, quantity: number): number {
  const product = getProductById(productId);
  if (!product) return 0;
  
  for (const tier of product.tierPrices) {
    if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
      if (quantity >= tier.minQuantity) {
        return tier.price;
      }
    }
  }
  return product.tierPrices[0]?.price || 0;
}