# 🚀 部署指南

本文档详细说明如何将你的 B2B 批发平台部署到生产环境。

---

## 📋 部署前检查清单

在部署之前，确保以下事项已完成：

### 必须完成

- [x] 品牌配置已设置 (`src/config/brand-config.ts`)
- [x] Shopify 产品 handle 已配置 (`src/lib/shopify/buy-button-config.ts`)
- [x] 代码测试通过（无 TypeScript 错误）
- [x] 网站在预览环境正常运行

### 可选配置（部署后可随时更新）

- [ ] TikTok Pixel ID（在 TikTok Ads Manager 获取）
- [ ] Facebook Pixel ID（在 Facebook Business Manager 获取）
- [ ] Logo 图片（上传到 `public/logo.png`）
- [ ] Favicon 图标（上传到 `public/favicon.ico`）
- [ ] 自定义域名（购买域名后配置 DNS）

---

## 🌐 部署方案选择

推荐使用 **Vercel** 部署，原因：

| 平台 | 优势 | 成本 |
|------|------|------|
| **Vercel** | 免费、自动部署、全球 CDN、支持自定义域名 | 免费 |
| Netlify | 免费、功能丰富 | 免费 |
| 自己服务器 | 完全控制 | 需购买服务器 |

---

## 📝 Vercel 部署步骤

### 步骤 1：准备代码

```bash
# 项目已在沙箱环境中，需要导出或连接到 GitHub
```

### 步骤 2：创建 GitHub 仓库（推荐）

```
1. 登录 GitHub (github.com)
2. 创建新仓库，如：acmaoyi-b2b-platform
3. 将项目代码上传到仓库
```

### 步骤 3：连接 Vercel

```
1. 登录 Vercel (vercel.com)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择你的 GitHub 仓库
5. 点击 "Import"
```

### 步骤 4：配置项目

```
在 Vercel 配置页面：

Framework Preset: Next.js
Build Command: pnpm build
Output Directory: .next

点击 "Deploy"
```

### 步骤 5：等待部署完成

```
Vercel 会自动：
- 安装依赖
- 构建项目
- 部署到全球 CDN

大约 2-3 分钟完成
```

### 步骤 6：获取部署地址

```
部署完成后，Vercel 会提供一个地址：
https://your-project.vercel.app

这个地址可以立即访问！
```

---

## 🔗 配置自定义域名

### 步骤 1：购买域名

```
推荐平台：
- Namecheap (namecheap.com) - 价格便宜
- GoDaddy (godaddy.com) - 老牌服务商
- 阿里云/腾讯云 - 国内服务

购买一个简短好记的域名，如：
- acmaoyi.com
- acmaoyiwholesale.com
- beautyb2b.com
```

### 步骤 2：在 Vercel 添加域名

```
1. 进入 Vercel 项目设置
2. 点击 "Domains"
3. 输入你的域名
4. Vercel 会显示 DNS 配置信息
```

### 步骤 3：配置 DNS

```
在域名服务商后台配置 DNS：

添加 A 记录：
- 名称: @
- 值: 76.76.21.21 (Vercel IP)

添加 CNAME 记录：
- 名称: www
- 值: cname.vercel-dns.com
```

### 步骤 4：等待生效

```
DNS 配置生效时间：几分钟到几小时不等

生效后，访问你的域名即可看到网站！
```

---

## ⚙️ 更新品牌配置

部署后，如需更新品牌信息，修改配置文件：

### 文件位置

```
src/config/brand-config.ts
```

### 修改示例

```typescript
// 更新公司信息
company: {
  name: '你的公司名称',
  description: '你的公司简介',
  email: '你的邮箱',
  phone: '你的电话',
  address: '你的地址',
},

// 更新广告 Pixel（投流时配置）
ads: {
  tiktokPixelId: '你的TikTok Pixel ID',
  facebookPixelId: '你的Facebook Pixel ID',
},
```

### 更新后重新部署

```
修改代码后：
1. 推送到 GitHub
2. Vercel 自动检测更新
3. 自动重新部署

或者手动触发：
Vercel 项目页面 → Deployments → 点击 "Redeploy"
```

---

## 🛒 更新 Shopify 产品链接

### 文件位置

```
src/lib/shopify/buy-button-config.ts
```

### 添加新产品

```typescript
export const productMapping: Record<string, { handle: string }> = {
  '1': { handle: 'foxgoblin咔咔眼线水笔' },
  '2': { handle: 'foxgoblin-燕窝胶原养肤持妆bb霜' },
  '3': { handle: 'foxgoblin-水嫩修颜隔离霜' },
  // 添加新产品
  '4': { handle: '新产品-handle' },
  '5': { handle: '另一个产品-handle' },
};
```

---

## 📊 TikTok/Facebook 广告 Pixel 获取方法

### TikTok Pixel

```
1. 登录 TikTok Ads Manager (ads.tiktok.com)
2. 创建广告账户（如未创建）
3. 进入 Assets → Events → Pixel
4. 点击 "Create Pixel" 或复制现有 Pixel ID
5. 将 Pixel ID 粘贴到 brand-config.ts 的 ads.tiktokPixelId
```

### Facebook Pixel

```
1. 登录 Facebook Business Manager (business.facebook.com)
2. 进入 Events Manager → Data Sources
3. 创建或复制 Pixel ID
4. 将 Pixel ID 粘贴到 brand-config.ts 的 ads.facebookPixelId
```

---

## ✅ 部署完成后

部署成功后，你的网站将：

- ✅ 全球可访问（美国、南非、法国等）
- ✅ 支持移动端访问
- ✅ 自动追踪广告转化（配置 Pixel 后）
- ✅ Buy Now 按钮跳转 Shopify 支付
- ✅ 支持 PayPal、VISA、信用卡支付
- ✅ 支持供应商入驻申请

---

## 🆘 常见问题

### 问题 1：部署失败

```
检查：
- 代码是否有 TypeScript 错误
- 依赖是否正确安装
- 查看 Vercel 的错误日志
```

### 问题 2：域名无法访问

```
检查：
- DNS 配置是否正确
- 域名是否已生效（可能需要等待）
```

### 问题 3：Buy Now 按钮不工作

```
检查：
- Shopify 产品 handle 是否正确配置
- 产品是否在 Shopify 已发布
```

---

## 📞 需要帮助？

如有任何部署问题，可以继续在这个对话中提问，我会帮你解决！