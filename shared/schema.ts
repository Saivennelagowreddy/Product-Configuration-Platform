import { pgTable, text, serial, integer, boolean, json, real, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User model (preserved from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Product Configuration Schema
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(''),
});

export const insertProductCategorySchema = createInsertSchema(productCategories).pick({
  name: true,
  description: true,
});

export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type ProductCategory = typeof productCategories.$inferSelect;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  series: text("series"),
  description: text("description"),
  minFlowRate: real("min_flow_rate"),
  maxFlowRate: real("max_flow_rate"),
  minPressure: real("min_pressure"),
  maxPressure: real("max_pressure"),
  minTemperature: real("min_temperature"),
  maxTemperature: real("max_temperature"),
  efficiency: real("efficiency"),
  powerConsumption: real("power_consumption"),
  noiseLevel: real("noise_level"),
  price: real("price"),
  maintenanceInterval: integer("maintenance_interval"),
  estimatedLifetime: integer("estimated_lifetime"),
  specifications: json("specifications").$type<Record<string, any>>(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const applicationTypes = pgTable("application_types", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
});

export const insertApplicationTypeSchema = createInsertSchema(applicationTypes).omit({
  id: true,
});

export type InsertApplicationType = z.infer<typeof insertApplicationTypeSchema>;
export type ApplicationType = typeof applicationTypes.$inferSelect;

// Define relations
export const productCategoriesRelations = relations(productCategories, ({ many }) => ({
  products: many(products),
  applicationTypes: many(applicationTypes),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),
}));

export const applicationTypesRelations = relations(applicationTypes, ({ one }) => ({
  category: one(productCategories, {
    fields: [applicationTypes.categoryId],
    references: [productCategories.id],
  }),
}));

// Configuration Schemas (for API requests/responses)
export const productConfigurationSchema = z.object({
  categoryId: z.number(),
  applicationType: z.number(),
  flowRate: z.number().min(0),
  pressure: z.number().min(0),
  temperature: z.number(),
});

export type ProductConfiguration = z.infer<typeof productConfigurationSchema>;

export const performanceMetricsSchema = z.object({
  efficiency: z.number(),
  powerConsumption: z.number(),
  noiseLevel: z.number(),
  maintenanceInterval: z.number(),
  estimatedLifetime: z.number(),
  performanceByLoad: z.array(
    z.object({
      load: z.number(),
      performance: z.number(),
    })
  ),
  alternativeProducts: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      series: z.string(),
      efficiency: z.number(),
      powerConsumption: z.number(),
      flowRate: z.number(),
      price: z.number(),
      isSelected: z.boolean().optional(),
    })
  ),
  isWithinTargetPower: z.boolean(),
  isExceedsLifetime: z.boolean(),
  isAboveTargetNoise: z.boolean(),
  isExtendedMaintenance: z.boolean(),
  comparedToAverage: z.number(),
});

export type PerformanceMetrics = z.infer<typeof performanceMetricsSchema>;
