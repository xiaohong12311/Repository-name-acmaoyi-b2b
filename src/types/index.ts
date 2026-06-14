// B2B 批发平台类型定义

// 产品类型
export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  categoryId: string;
  supplierId: string;
  moq: number; // 最小起订量
  unit: string; // 单位：件、箱、套等
  specifications: ProductSpecification[];
  tierPrices: TierPrice[]; // 阶梯价格
  samplePrice?: number; // 样品价格
  sampleAvailable: boolean; // 是否提供样品
  customizationAvailable: boolean; // 是否支持定制
  leadTime: string; // 交货期
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt: string;
  updatedAt: string;
}

// 产品规格
export interface ProductSpecification {
  name: string;
  value: string;
}

// 阶梯价格
export interface TierPrice {
  minQuantity: number;
  maxQuantity: number | null; // null 表示无上限
  price: number;
  discount?: string; // 如 "省15%"
}

// 供应商类型
export interface Supplier {
  id: string;
  name: string;
  logo: string;
  description: string;
  location: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  verified: boolean; // 是否认证供应商
  yearEstablished: number;
  totalEmployees: string;
  annualRevenue: string;
  certifications: string[];
  mainProducts: string[];
  factoryImages: string[];
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  responseTime: string; // 平均响应时间
  status: 'active' | 'inactive';
}

// 产品分类
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  children: Category[];
}

// 询盘单项目
export interface InquiryItem {
  productId: string;
  productName: string;
  productImage: string;
  supplierId: string;
  supplierName: string;
  quantity: number;
  targetPrice?: number;
  specifications: Record<string, string>;
  notes: string;
}

// 询盘单
export interface Inquiry {
  id: string;
  items: InquiryItem[];
  company: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  shippingAddress: string;
  preferredShippingMethod?: string;
  additionalNotes: string;
  status: 'draft' | 'sent' | 'processing' | 'quoted' | 'closed';
  createdAt: string;
  updatedAt: string;
}

// 收藏夹
export interface FavoriteItem {
  productId: string;
  productName: string;
  productImage: string;
  supplierName: string;
  price: number;
  moq: number;
  addedAt: string;
}

// 样品车项目
export interface SampleCartItem {
  productId: string;
  productName: string;
  productImage: string;
  supplierId: string;
  supplierName: string;
  samplePrice: number;
  quantity: number;
  specifications: Record<string, string>;
}

// 定制批发需求
export interface CustomizationRequest {
  productId: string;
  productName: string;
  supplierId: string;
  customizationType: 'logo' | 'packaging' | 'size' | 'material' | 'design' | 'other';
  description: string;
  referenceImages: string[];
  quantity: number;
  targetPrice?: number;
  deadline?: string;
}

// 目录下载记录
export interface CatalogDownload {
  id: string;
  supplierId: string;
  supplierName: string;
  catalogUrl: string;
  catalogName: string;
  downloadedAt: string;
}

// 后台管理数据
export interface AdminConfig {
  siteName: string;
  siteDescription: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    wechat?: string;
    linkedin?: string;
    alibaba?: string;
  };
}

// 网站设置
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logo?: string;
  banner?: string;
  seoKeywords?: string;
  seoDescription?: string;
}

// 后台编辑内容
export interface EditableContent {
  id: string;
  type: 'banner' | 'text' | 'image' | 'product' | 'supplier';
  content: Record<string, unknown>;
  position: string;
  order: number;
  isActive: boolean;
}