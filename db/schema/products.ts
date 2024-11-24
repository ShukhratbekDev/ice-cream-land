import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { boolean, numeric, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { categories } from '@/db/schema/categories';
import { relations } from 'drizzle-orm';
import { productIngredients } from '@/db/schema/productIngredients';
import z from 'zod';

export const products = pgTable('products', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  price: numeric({ precision: 10, scale: 2 }).notNull(),
  currency: varchar().notNull().default('USD'),
  rating: numeric({ precision: 3, scale: 1 }).notNull(),
  imageUrl: varchar().notNull(),
  description: text(),
  categoryId: serial().references(() => categories.id),
  isHot: boolean().default(false),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  productIngredients: many(productIngredients),
}));

export const insertProductsSchema = createInsertSchema(products);
export const selectProductsSchema = createSelectSchema(products);
export type selectProductsSchema = z.infer<typeof selectProductsSchema>;
