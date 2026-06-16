import { pgTable, serial, timestamp, varchar, text, boolean, integer, numeric, jsonb, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 系统表 - 必须保留
export const healthCheck = pgTable("health_check", {
  id: serial().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 询盘单表 - 存储顾客询价记录
export const inquiries = pgTable(
  "inquiries",
  {
    id: serial().primaryKey(),
    company_name: varchar("company_name", { length: 255 }).notNull(),
    contact_name: varchar("contact_name", { length: 128 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 32 }),
    country: varchar("country", { length: 64 }),
    products: jsonb("products").notNull().$type<{
      product_id: string;
      product_name: string;
      quantity: number;
      target_price?: number;
      specifications?: string;
    }[]>(),
    message: text("message"),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, processing, quoted, closed
    notes: text("notes"), // 管理员备注
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("inquiries_status_idx").on(table.status),
    index("inquiries_created_at_idx").on(table.created_at),
    index("inquiries_email_idx").on(table.email),
  ]
);

// 供应商入驻申请表
export const supplierApplications = pgTable(
  "supplier_applications",
  {
    id: serial().primaryKey(),
    company_name: varchar("company_name", { length: 255 }).notNull(),
    contact_name: varchar("contact_name", { length: 128 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 32 }).notNull(),
    country: varchar("country", { length: 64 }),
    address: text("address"),
    business_type: varchar("business_type", { length: 64 }), // manufacturer, wholesaler, trader
    product_categories: jsonb("product_categories").$type<string[]>(),
    year_established: integer("year_established"),
    employee_count: integer("employee_count"),
    annual_revenue: varchar("annual_revenue", { length: 32 }),
    certifications: jsonb("certifications").$type<string[]>(),
    website: varchar("website", { length: 255 }),
    description: text("description"),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, reviewing, approved, rejected
    notes: text("notes"), // 管理员备注
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("supplier_applications_status_idx").on(table.status),
    index("supplier_applications_created_at_idx").on(table.created_at),
    index("supplier_applications_email_idx").on(table.email),
  ]
);

// 产品表 - 存储产品信息（可从 Shopify 同步或手动添加）
export const products = pgTable(
  "products",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    name_en: varchar("name_en", { length: 255 }),
    sku: varchar("sku", { length: 64 }).unique(),
    category: varchar("category", { length: 64 }),
    description: text("description"),
    description_en: text("description_en"),
    main_image_url: varchar("main_image_url", { length: 500 }),
    images: jsonb("images").$type<string[]>(),
    tier_prices: jsonb("tier_prices").$type<{
      min_qty: number;
      max_qty?: number;
      price: number;
    }[]>(),
    moq: integer("moq").default(1),
    unit: varchar("unit", { length: 16 }).default("piece"),
    specifications: jsonb("specifications").$type<Record<string, string>>(),
    shopify_handle: varchar("shopify_handle", { length: 128 }), // Shopify 产品 handle
    supplier_id: integer("supplier_id").references(() => suppliers.id),
    is_active: boolean("is_active").default(true).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("products_category_idx").on(table.category),
    index("products_sku_idx").on(table.sku),
    index("products_supplier_id_idx").on(table.supplier_id),
    index("products_is_active_idx").on(table.is_active),
  ]
);

// 供应商表 - 已入驻的供应商
export const suppliers = pgTable(
  "suppliers",
  {
    id: serial().primaryKey(),
    company_name: varchar("company_name", { length: 255 }).notNull(),
    company_name_en: varchar("company_name_en", { length: 255 }),
    contact_name: varchar("contact_name", { length: 128 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 32 }).notNull(),
    country: varchar("country", { length: 64 }),
    address: text("address"),
    business_type: varchar("business_type", { length: 64 }),
    product_categories: jsonb("product_categories").$type<string[]>(),
    year_established: integer("year_established"),
    employee_count: integer("employee_count"),
    certifications: jsonb("certifications").$type<string[]>(),
    website: varchar("website", { length: 255 }),
    description: text("description"),
    logo_url: varchar("logo_url", { length: 500 }),
    factory_images: jsonb("factory_images").$type<string[]>(),
    is_verified: boolean("is_verified").default(false).notNull(),
    is_active: boolean("is_active").default(true).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("suppliers_is_verified_idx").on(table.is_verified),
    index("suppliers_is_active_idx").on(table.is_active),
  ]
);

// 网站设置表 - 存储网站配置
export const siteSettings = pgTable(
  "site_settings",
  {
    id: serial().primaryKey(),
    setting_key: varchar("setting_key", { length: 64 }).notNull().unique(),
    setting_value: jsonb("setting_value").notNull(),
    description: text("description"),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("site_settings_key_idx").on(table.setting_key),
  ]
);

// 管理员角色标记表 - 用于区分管理员用户
export const adminUsers = pgTable(
  "admin_users",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().unique(), // auth.users 表的 id
    role: varchar("role", { length: 20 }).notNull().default("admin"), // admin, super_admin
    permissions: jsonb("permissions").$type<string[]>(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("admin_users_user_id_idx").on(table.user_id),
  ]
);

// 类型导出
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;
export type SupplierApplication = typeof supplierApplications.$inferSelect;
export type InsertSupplierApplication = typeof supplierApplications.$inferInsert;
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = typeof suppliers.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;