# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

## 项目功能模块

### B2B 批发平台核心功能

本项目是一个 B2B 批发采购平台，包含以下核心功能模块：

#### 前端页面
| 路径 | 功能 | 说明 |
|------|------|------|
| `/` | 首页 | 产品推荐、供应商推荐、平台介绍 |
| `/products` | 产品列表 | 分类筛选、搜索、阶梯价格展示 |
| `/products/[id]` | 产品详情 | 规格参数、阶梯价格表、询盘/收藏/样品车 |
| `/suppliers` | 供应商目录 | 地区筛选、产品分类筛选 |
| `/suppliers/[id]` | 供应商详情 | 工厂展示、认证资质、联系方式、产品列表 |
| `/inquiry` | 询盘单 | 批量询盘、目标价格、规格填写 |
| `/sample-cart` | 样品车 | 样品申请、数量调整、订单提交 |
| `/favorites` | 收藏夹 | 产品收藏管理 |
| `/supplier-join` | 供应商入驻 | 入驻申请表单、资质上传 |
| `/factory` | 工厂展示 | 工厂环境展示、供应商认证信息 |
| `/customization` | 定制批发 | 定制需求表单、方案提交 |
| `/catalog` | 目录下载 | 供应商产品目录下载 |
| `/admin` | 后台管理 | 产品管理、供应商管理、询盘管理、网站设置 |

#### API 接口
| 路径 | 方法 | 功能 |
|------|------|------|
| `/api/admin/settings` | GET/POST | 获取/更新管理数据 |
| `/api/inquiry` | GET/POST/PUT | 询盘管理 |
| `/api/supplier-join` | GET/POST/PUT | 供应商入驻申请 |

#### 状态管理
- `src/hooks/use-b2b-store.tsx` - 全局状态管理 (收藏夹、样品车、询盘单)
- 使用 React Context + useState 实现
- 提供 `useFavorites`, `useSampleCart`, `useInquiry` hooks

#### 数据类型
- `src/types/index.ts` - 所有业务类型定义
- `Product`, `Supplier`, `TierPrice`, `InquiryItem` 等核心类型
- `SiteSettings` 网站设置类型

#### 阶梯价格系统
- 产品支持多档阶梯价格 (`tierPrices`)
- 根据采购数量自动计算最优价格
- 前端展示价格区间和折扣信息
