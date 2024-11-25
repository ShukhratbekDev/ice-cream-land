import { createInsertSchema } from 'drizzle-zod';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { carts } from '@/db/schema/carts';
import { products } from '@/db/schema/products';

export const cartItems = pgTable('cartItems', {
  cartItemId: serial().primaryKey(),
  cartId: integer().references(() => carts.cartId),
  productId: integer().references(() => products.productId),
  quantity: integer().default(1),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertCartItemsSchema = createInsertSchema(cartItems);
