import { createInsertSchema } from 'drizzle-zod';
import { integer, numeric, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { orders } from '@/db/schema/orders';
import { products } from '@/db/schema/products';

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
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems);
