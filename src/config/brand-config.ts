/**
 * 品牌配置文件
 * 
 * 所有品牌相关信息都在这里配置。
 * 以后修改品牌信息，只需修改这个文件即可！
 */

export const brandConfig = {
  // ========== 公司基本信息 ==========
  company: {
    name: 'Acmaoyi',                    // 公司名称
    fullName: 'Acmaoyi Beauty Supply',  // 公司全称
    slogan: 'Professional B2B Beauty Wholesale Platform', // 品牌标语
    description: 'Connecting premium Chinese manufacturers with global buyers. Professional B2B wholesale platform.', // 公司简介
    
    // 联系方式
    email: 'hongxiaohong12311@outlook.com',
    phone: '+86 15827634276',
    whatsapp: '+86 15827634276',       // WhatsApp 号码（可选）
    address: '16 Amoyi Street',        // 公司地址
  },

  // ========== 网站信息 ==========
  site: {
    domain: 'acmaoyi.com',             // 主域名（部署后填写实际域名）
    logoUrl: '/logo.png',              // Logo 图片路径（上传到 public 目录）
    faviconUrl: '/favicon.ico',        // Favicon 图标路径
  },

  // ========== 社交媒体链接 ==========
  social: {
    facebook: '',                      // Facebook 主页链接（如：https://facebook.com/acmaoyi）
    tiktok: '',                        // TikTok 主页链接（如：https://tiktok.com/@acmaoyi）
    instagram: 'https://www.instagram.com/acmaoyi',  // Instagram 链接
    twitter: 'https://x.com/ACMaoyi',                // X (Twitter) 链接
    linkedin: '',                      // LinkedIn 链接（可选）
  },

  // ========== 广告追踪 Pixel ==========
  // 在广告平台获取 Pixel ID 后填入这里
  ads: {
    tiktokPixelId: '',                 // TikTok Pixel ID（从 TikTok Ads Manager 获取）
    facebookPixelId: '',               // Facebook Pixel ID（从 Facebook Business Manager 获取）
    googleAnalyticsId: '',             // Google Analytics ID（可选）
  },

  // ========== Shopify 配置 ==========
  shopify: {
    shopDomain: 'btbvuh-7y.myshopify.com',         // Shopify 商店域名
    // 产品 handle 映射（从 buy-button-config.ts 引用）
  },

  // ========== SEO 配置 ==========
  seo: {
    siteTitle: 'Acmaoyi - 专业BtoB批发平台',
    siteDescription: 'Professional B2B wholesale platform for beauty products. Connect with verified agents, get competitive wholesale prices, and enjoy global shipping.',
    keywords: 'B2B wholesale, beauty products, cosmetics wholesale, skincare wholesale, beauty agent, wholesale platform',
  },

  // ========== 认证信息（展示信任度）==========
  trust: {
    verifiedSupplier: true,            // 是否显示 "Verified Agent" 标识
    yearsInBusiness: 5,                // 经营年限（用于展示）
    totalSuppliers: 100,               // Agent数量（用于展示）
    totalProducts: 5000,               // 产品数量（用于展示）
    countriesServed: 'USA, South Africa, France, China', // 服务国家
  },

  // ========== 页脚信息 ==========
  footer: {
    copyright: `© ${new Date().getFullYear()} Acmaoyi. All rights reserved.`,
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
};

// 导出便捷访问函数
export function getCompanyInfo() {
  return brandConfig.company;
}

export function getContactInfo() {
  return {
    email: brandConfig.company.email,
    phone: brandConfig.company.phone,
    whatsapp: brandConfig.company.whatsapp,
    address: brandConfig.company.address,
  };
}

export function getSocialLinks() {
  return brandConfig.social;
}

export function getAdsConfig() {
  return brandConfig.ads;
}

export function getTrustInfo() {
  return brandConfig.trust;
}

export function getSeoConfig() {
  return brandConfig.seo;
}