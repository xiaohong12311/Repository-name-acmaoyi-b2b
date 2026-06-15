# Shopify Headless 连接指南 (中文/英文双语版)
# Shopify Headless Integration Guide (Chinese/English Bilingual)

---

## 📋 目录 | Table of Contents

1. [什么是 Shopify Headless？](#什么是-shopify-headless--what-is-shopify-headless)
2. [准备工作](#准备工作--prerequisites)
3. [步骤一：创建 Shopify 开发者应用](#步骤一创建-shopify-开发者应用--step-1-create-a-shopify-custom-app)
4. [步骤二：获取 API 密钥](#步骤二获取-api-密钥--step-2-get-api-credentials)
5. [步骤三：配置环境变量](#步骤三配置环境变量--step-3-configure-environment-variables)
6. [步骤四：在 Shopify 中设置产品](#步骤四在-shopify-中设置产品--step-4-setup-products-in-shopify)
7. [步骤五：设置阶梯价格](#步骤五设置阶梯价格--step-5-setup-tier-pricing)
8. [步骤六：验证连接](#步骤六验证连接--step-6-verify-connection)
9. [常见问题解答](#常见问题解答--faq)

---

## 什么是 Shopify Headless？ | What is Shopify Headless?

**中文说明：**
Shopify Headless 是一种架构模式，意思是：
- **前端**（你看到的网页）和 **后端**（Shopify 的数据系统）是分开的
- 你可以用任何技术栈（如 Next.js）来制作前端页面
- Shopify 只负责存储产品数据、处理订单、支付等后端功能
- 通过 API（应用程序接口）来连接前端和后端

**英文说明：**
Shopify Headless is an architecture pattern where:
- **Frontend** (the web pages you see) and **Backend** (Shopify's data system) are separated
- You can use any technology stack (like Next.js) to build your frontend
- Shopify only handles backend functions: product data storage, order processing, payments, etc.
- Frontend and backend are connected via API (Application Programming Interface)

**为什么选择 Headless？ | Why choose Headless?**

| 中文 | English |
|------|---------|
| ✅ 完全自定义页面设计 | ✅ Complete control over page design |
| ✅ 可以添加任何 B2B 功能 | ✅ Can add any B2B features |
| ✅ 更好的用户体验 | ✅ Better user experience |
| ✅ 支持 SEO 优化 | ✅ Supports SEO optimization |
| ❌ 需要一些技术配置 | ❌ Requires some technical setup |

---

## 准备工作 | Prerequisites

### 你需要的东西 | What You Need

**中文：**
1. 一个 Shopify 商店账户（已开通）
2. Shopify 管理后台的访问权限
3. 你的商店网址（例如：`your-store.myshopify.com`）

**English:**
1. A Shopify store account (active)
2. Admin access to your Shopify dashboard
3. Your store URL (e.g., `your-store.myshopify.com`)

### 登录 Shopify | Log into Shopify

**中文步骤：**
1. 打开浏览器，访问 `https://admin.shopify.com`
2. 输入你的邮箱和密码登录
3. 确保你看到的是你想要连接的商店

**English Steps:**
1. Open your browser, go to `https://admin.shopify.com`
2. Enter your email and password to login
3. Make sure you're viewing the correct store you want to connect

---

## 步骤一：创建 Shopify 开发者应用 | Step 1: Create a Shopify Custom App

### 中文详细步骤：

**1.1 进入设置页面**
- 在 Shopify 管理后台左侧菜单，找到并点击 **"Settings"（设置）**
- 设置图标通常是一个齿轮形状 🔧

**1.2 找到应用管理**
- 在设置页面中，找到 **"Apps and sales channels"（应用和销售渠道）**
- 点击进入这个选项

**1.3 开发应用**
- 点击页面右上角的 **"Develop apps"（开发应用）** 按钮
- 如果看不到这个按钮，可能是权限问题，需要联系商店管理员

**1.4 创建新应用**
- 点击 **"Create an app"（创建应用）**
- 会弹出一个对话框

**1.5 填写应用名称**
- 在 **"App name"（应用名称）** 输入框中，输入一个名称
- 建议命名为：`B2B Wholesale Frontend` 或 `我的批发前端`
- 这个名称只是用来标识，不影响功能

**1.6 选择开发者**
- 在 **"App developer"（应用开发者）** 选项中
- 选择你自己或者创建一个新的开发者账户
- 点击 **"Create app"（创建应用）** 完成

---

### English Detailed Steps:

**1.1 Go to Settings**
- In Shopify admin left menu, find and click **"Settings"**
- The settings icon looks like a gear 🔧

**1.2 Find App Management**
- In the settings page, find **"Apps and sales channels"**
- Click to enter this option

**1.3 Develop Apps**
- Click the **"Develop apps"** button at the top right of the page
- If you can't see this button, it might be a permission issue - contact your store admin

**1.4 Create New App**
- Click **"Create an app"**
- A dialog box will pop up

**1.5 Fill in App Name**
- In the **"App name"** input box, enter a name
- Recommended name: `B2B Wholesale Frontend`
- This name is just for identification, doesn't affect functionality

**1.6 Select Developer**
- In the **"App developer"** option
- Select yourself or create a new developer account
- Click **"Create app"** to complete

---

## 步骤二：获取 API 密钥 | Step 2: Get API Credentials

### 中文详细步骤：

**2.1 配置 API 权限**
- 创建应用后，你会看到应用详情页面
- 点击 **"Configuration"（配置）** 标签页
- 这是设置应用权限的地方

**2.2 设置 Storefront API 权限**
- 在 **"Storefront API integration"** 部分
- 点击 **"Configure"（配置）** 按钮

**2.3 选择权限范围**
会出现一个权限列表，你需要勾选以下权限：

| 权限名称 | 中文说明 | 是否必须 |
|---------|---------|---------|
| `unauthenticated_read_product_listings` | 读取产品列表 | ✅ 必须 |
| `unauthenticated_read_product_tags` | 读取产品标签 | ✅ 必须 |
| `unauthenticated_read_products` | 读取产品详情 | ✅ 必须 |
| `unauthenticated_read_product_images` | 读取产品图片 | ✅ 必须 |
| `unauthenticated_read_product_variants` | 读取产品变体（用于阶梯价格） | ✅ 必须 |
| `unauthenticated_read_collections` | 读取产品分类 | ✅ 必须 |
| `unauthenticated_read_content` | 读取商店内容 | ⭕ 可选 |
| `unauthenticated_read_checkouts` | 读取购物车 | ⭕ 可选 |
| `unauthenticated_write_checkouts` | 创建购物车 | ⭕ 可选 |

- 勾选所有必须的权限
- 点击 **"Save"（保存）**

**2.4 安装应用到商店**
- 回到应用详情页面
- 点击 **"Install app"（安装应用）** 按钮
- 会弹出确认对话框，点击 **"Install"（安装）**

**2.5 获取 API Token（重要！）**
安装完成后，你会看到：

- **Storefront API access token**：这是一个长字符串，类似：
  ```
  shpat_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
  ```
  
**⚠️ 重要提醒：**
- 这个 Token 需要复制保存，稍后要用！
- 不要分享给任何人，这是你的商店密钥
- 如果丢失，需要重新创建应用

---

### English Detailed Steps:

**2.1 Configure API Permissions**
- After creating the app, you'll see the app details page
- Click the **"Configuration"** tab
- This is where you set app permissions

**2.2 Setup Storefront API Permissions**
- In the **"Storefront API integration"** section
- Click the **"Configure"** button

**2.3 Select Permission Scopes**
A permission list will appear, select these permissions:

| Permission Name | Description | Required? |
|-----------------|-------------|-----------|
| `unauthenticated_read_product_listings` | Read product listings | ✅ Required |
| `unauthenticated_read_product_tags` | Read product tags | ✅ Required |
| `unauthenticated_read_products` | Read product details | ✅ Required |
| `unauthenticated_read_product_images` | Read product images | ✅ Required |
| `unauthenticated_read_product_variants` | Read product variants (for tier pricing) | ✅ Required |
| `unauthenticated_read_collections` | Read product categories | ✅ Required |
| `unauthenticated_read_content` | Read store content | ⭕ Optional |
| `unauthenticated_read_checkouts` | Read shopping cart | ⭕ Optional |
| `unauthenticated_write_checkouts` | Create shopping cart | ⭕ Optional |

- Check all required permissions
- Click **"Save"**

**2.4 Install App to Store**
- Go back to app details page
- Click **"Install app"** button
- A confirmation dialog appears, click **"Install"**

**2.5 Get API Token (Important!)**
After installation, you'll see:

- **Storefront API access token**: A long string like:
  ```
  shpat_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
  ```
  
**⚠️ Important Reminders:**
- Copy and save this Token, you'll need it later!
- Don't share with anyone, this is your store secret key
- If lost, you need to recreate the app

---

## 步骤三：配置环境变量 | Step 3: Configure Environment Variables

### 中文详细步骤：

**3.1 什么是环境变量？**
环境变量就像一个"配置清单"，告诉代码：
- 你的 Shopify 商店网址是什么
- 你的 API 密钥是什么

**3.2 创建环境变量文件**

在你的项目中，需要创建一个名为 `.env.local` 的文件。

**文件内容格式：**
```env
# Shopify 商店网址（不要带 https://）
SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com

# Shopify Storefront API Token（刚才获取的那个长字符串）
SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**3.3 实际操作步骤：**

如果你使用部署平台（如 Vercel）：
1. 登录你的部署平台
2. 进入项目设置页面
3. 找到 **"Environment Variables"（环境变量）** 设置
4. 添加两个变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` | 你的商店网址（不带 https://） |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | `shpat_xxx...` | 你的 API Token |

---

### English Detailed Steps:

**3.1 What are Environment Variables?**
Environment variables are like a "configuration list" that tells the code:
- What is your Shopify store URL
- What is your API key

**3.2 Create Environment Variable File**

In your project, create a file named `.env.local`.

**File Content Format:**
```env
# Shopify store URL (without https://)
SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com

# Shopify Storefront API Token (the long string you got earlier)
SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**3.3 Practical Steps:**

If using a deployment platform (like Vercel):
1. Login to your deployment platform
2. Go to project settings page
3. Find **"Environment Variables"** settings
4. Add two variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` | Your store URL (without https://) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | `shpat_xxx...` | Your API Token |

---

## 步骤四：在 Shopify 中设置产品 | Step 4: Setup Products in Shopify

### 中文详细步骤：

**4.1 添加产品**
- 在 Shopify 管理后台左侧菜单
- 点击 **"Products"（产品）**
- 点击 **"Add product"（添加产品）**

**4.2 填写产品信息**

| 字段 | 中文说明 | 示例 |
|------|---------|------|
| **Title** | 产品名称 | Disposable Tableware Set |
| **Description** | 产品描述 | Eco-friendly biodegradable tableware set |
| **Price** | 基础价格 | $5.00 |
| **Images** | 产品图片 | 上传产品图片 |

**4.3 添加 B2B 特殊标签（重要！）**

在产品编辑页面的底部，找到 **"Tags"（标签）** 区域，添加以下标签：

| 标签 | 中文说明 | 示例值 | 用途 |
|------|---------|--------|------|
| `MOQ:xxx` | 最小起订量 | `MOQ:100` | 显示产品最小订购数量 |
| `sample-available` | 可提供样品 | `sample-available` | 标记产品可申请样品 |
| `sample-price:xxx` | 样品价格 | `sample-price:5` | 样品的价格 |
| `customizable` | 可定制 | `customizable` | 标记产品支持定制 |
| `lead-time:xxx` | 交货周期 | `lead-time:7-15 days` | 批量订购交货时间 |
| `unit:xxx` | 计量单位 | `unit:sets` | 产品计量单位 |

**示例：**
假设你要添加一个餐具产品，标签填写：
```
MOQ:100, sample-available, sample-price:5, customizable, lead-time:7-15 days, unit:sets, category:Food Service Supplies
```

**4.4 保存产品**
- 点击页面顶部或底部的 **"Save"（保存）** 按钮

---

### English Detailed Steps:

**4.1 Add Product**
- In Shopify admin left menu
- Click **"Products"**
- Click **"Add product"**

**4.2 Fill Product Information**

| Field | Description | Example |
|-------|-------------|---------|
| **Title** | Product name | Disposable Tableware Set |
| **Description** | Product description | Eco-friendly biodegradable tableware set |
| **Price** | Base price | $5.00 |
| **Images** | Product images | Upload product images |

**4.3 Add B2B Special Tags (Important!)**

At the bottom of the product edit page, find the **"Tags"** section, add these tags:

| Tag | Description | Example Value | Purpose |
|-----|-------------|---------------|---------|
| `MOQ:xxx` | Minimum Order Quantity | `MOQ:100` | Show product minimum order quantity |
| `sample-available` | Sample available | `sample-available` | Mark product can request sample |
| `sample-price:xxx` | Sample price | `sample-price:5` | Price for sample |
| `customizable` | Customizable | `customizable` | Mark product supports customization |
| `lead-time:xxx` | Lead time | `lead-time:7-15 days` | Bulk order delivery time |
| `unit:xxx` | Unit of measurement | `unit:sets` | Product measurement unit |

**Example:**
For a tableware product, enter tags:
```
MOQ:100, sample-available, sample-price:5, customizable, lead-time:7-15 days, unit:sets, category:Food Service Supplies
```

**4.4 Save Product**
- Click **"Save"** button at top or bottom of page

---

## 步骤五：设置阶梯价格 | Step 5: Setup Tier Pricing

### 中文详细步骤：

**5.1 什么是阶梯价格？**
阶梯价格是指：
- 买 100 个，每个 $0.8
- 买 500 个，每个 $0.6
- 买 1000 个，每个 $0.45
买得越多，单价越低！

**5.2 在 Shopify 中设置阶梯价格**

Shopify 使用 **"Variants"（变体）** 来实现阶梯价格。

**操作步骤：**

1. 在产品编辑页面，找到 **"Variants"（变体）** 区域
2. 点击 **"Add variant"（添加变体）**

**5.3 创建价格变体**

| 变体名称 | 价格 | 库存 | 说明 |
|---------|------|------|------|
| `100-500 units` | $0.80 | 9999 | 第一档价格 |
| `500-1000 units` | $0.60 | 9999 | 第二档价格 |
| `1000+ units` | $0.45 | 9999 | 第三档价格 |

**5.4 变体详情设置**

对于每个变体：

1. **Option name**: 输入 `Quantity Range`
2. **Option value**: 输入 `100-500 units`（或其他范围）
3. **Price**: 输入对应价格，如 `$0.80`
4. **Inventory**: 设置为一个大数字（如 9999），表示不限库存

**5.5 保存设置**
- 点击 **"Save"** 保存产品

---

### English Detailed Steps:

**5.1 What is Tier Pricing?**
Tier pricing means:
- Buy 100 units, each $0.8
- Buy 500 units, each $0.6
- Buy 1000 units, each $0.45
The more you buy, the lower the unit price!

**5.2 Setup Tier Pricing in Shopify**

Shopify uses **"Variants"** to implement tier pricing.

**Steps:**

1. In product edit page, find **"Variants"** section
2. Click **"Add variant"**

**5.3 Create Price Variants**

| Variant Name | Price | Inventory | Description |
|--------------|-------|-----------|-------------|
| `100-500 units` | $0.80 | 9999 | First tier price |
| `500-1000 units` | $0.60 | 9999 | Second tier price |
| `1000+ units` | $0.45 | 9999 | Third tier price |

**5.4 Variant Details Setup**

For each variant:

1. **Option name**: Enter `Quantity Range`
2. **Option value**: Enter `100-500 units` (or other range)
3. **Price**: Enter corresponding price, e.g., `$0.80`
4. **Inventory**: Set to a large number (e.g., 9999) for unlimited stock

**5.5 Save Settings**
- Click **"Save"** to save the product

---

## 步骤六：验证连接 | Step 6: Verify Connection

### 中文详细步骤：

**6.1 检查配置是否正确**

环境变量设置好后，项目会自动连接 Shopify。

**6.2 验证产品显示**

1. 打开你的批发平台网站
2. 点击 **"Products"（产品）** 菜单
3. 查看是否能显示 Shopify 中的产品

**如果产品显示正常，说明连接成功！** ✅

**如果产品不显示，请检查：**

| 检查项 | 解决方法 |
|--------|---------|
| 环境变量是否正确 | 确认 Token 没有空格或错误字符 |
| 产品是否有标签 | 确保产品有 MOQ 标签 |
| API 权限是否完整 | 回到步骤二重新检查权限 |

---

### English Detailed Steps:

**6.1 Check Configuration**

After environment variables are set, the project will automatically connect to Shopify.

**6.2 Verify Product Display**

1. Open your wholesale platform website
2. Click **"Products"** menu
3. Check if products from Shopify are displayed

**If products display correctly, connection is successful!** ✅

**If products don't show, please check:**

| Check Item | Solution |
|------------|----------|
| Environment variables correct | Confirm Token has no spaces or wrong characters |
| Product has tags | Ensure product has MOQ tag |
| API permissions complete | Go back to Step 2 to recheck permissions |

---

## 常见问题解答 | FAQ

### Q1: 我的 Shopify 版本支持 Headless 吗？
**中文：** 
最新版 Shopify 支持 Headless。你需要：
- 任何 Shopify 计划（Basic 及以上）都可以使用 Storefront API
- Shopify Plus 有更多高级功能，但基础功能对所有计划开放

**English:**
Latest Shopify version supports Headless. You need:
- Any Shopify plan (Basic or above) can use Storefront API
- Shopify Plus has more advanced features, but basic features are open to all plans

---

### Q2: 我找不到 "Develop apps" 按钮？
**中文：**
可能原因：
1. 你不是商店管理员，需要联系管理员给你权限
2. 你的 Shopify 计划不支持开发应用

**解决方法：**
- 联系商店管理员请求 "Develop apps" 权限
- 或升级 Shopify 计划

**English:**
Possible reasons:
1. You're not store admin, need to contact admin for permissions
2. Your Shopify plan doesn't support app development

**Solution:**
- Contact store admin to request "Develop apps" permission
- Or upgrade Shopify plan

---

### Q3: Token 失效了怎么办？
**中文：**
如果 Token 失效：
1. 回到应用详情页面
2. 点击 "Uninstall" 先卸载应用
3. 重新安装应用
4. 会生成新的 Token

**English:**
If Token is invalid:
1. Go back to app details page
2. Click "Uninstall" to uninstall app first
3. Reinstall the app
4. New Token will be generated

---

### Q4: 产品价格显示不对？
**中文：**
检查：
1. Shopify 产品基础价格是否设置正确
2. 变体价格是否设置正确
3. 确保产品有 `MOQ:xxx` 标签

**English:**
Check:
1. If Shopify product base price is set correctly
2. If variant prices are set correctly
3. Ensure product has `MOQ:xxx` tag

---

### Q5: 如何添加供应商信息？
**中文：**
目前供应商信息使用本地数据，要连接 Shopify：
- 在 Shopify 中创建 "Collections"（分类）
- 每个分类对应一个供应商
- 分类描述中添加供应商信息

**English:**
Currently supplier info uses local data, to connect to Shopify:
- Create "Collections" in Shopify
- Each collection corresponds to a supplier
- Add supplier info in collection description

---

## 📞 需要帮助？ | Need Help?

如果你在操作过程中遇到任何问题，可以：

1. **查阅 Shopify 官方文档**：
   - 中文：https://help.shopify.com/zh-CN
   - 英文：https://help.shopify.com

2. **询问我**：
   - 把你遇到的具体问题告诉我
   - 我会用更简单的方式解释

---

**祝你成功连接 Shopify！** 🎉
**Hope you successfully connect to Shopify!** 🎉