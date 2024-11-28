import { createInsertSchema } from 'drizzle-zod';
import { char, integer, numeric, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { orders } from '@/db/schema/orders';
import { products } from '@/db/schema/products';
import z from 'zod';

export const orderItems = pgTable('order_items', {
  orderItemId: serial().primaryKey(),
  orderId: integer()
    .references(() => orders.orderId)
    .notNull(),
  productId: integer()
    .references(() => products.productId)
    .notNull(),
  quantity: integer().notNull(),
  price: numeric({ precision: 10, scale: 2 }).notNull(),
  currency: char({ length: 3 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems);
export type InsertOrderItemSchema = z.infer<typeof insertOrderItemSchema>;
