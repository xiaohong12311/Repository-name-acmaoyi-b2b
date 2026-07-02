// Product Types
export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  sku?: string;
  slug?: string; // URL-friendly identifier
  description: string;
  images: string[];
  mainImage?: string;
  categoryId: string;
  category?: string;
  supplierId: string;
  moq: number; // Minimum Order Quantity
  unit: string; // Unit: pcs, box, set, etc.
  specifications: ProductSpecification[];
  tierPrices: TierPrice[]; // Tier pricing
  samplePrice?: number; // Sample price
  sampleAvailable: boolean; // Sample available
  customizationAvailable: boolean; // Customization available
  leadTime: string; // Lead time
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
  country: string;
  businessType: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  verified: boolean; // 是否认证供应商
  yearsInBusiness: number;
  employees: number;
  productCount: number;
  annualRevenue: string;
  certifications: string[];
  mainProducts: string[];
  images: string[];
  website: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  responseTime: string; // 平均响应时间
  products?: Product[]; // 供应商的产品列表（详情页使用）
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