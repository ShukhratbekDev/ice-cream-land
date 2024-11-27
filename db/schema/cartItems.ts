import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { carts } from '@/db/schema/carts';
import { Product, products } from '@/db/schema/products';
import z from 'zod';

export const cartItems = pgTable('cart_items', {
  cartItemId: serial().primaryKey(),
  cartId: integer().references(() => carts.cartId),
  productId: integer().references(() => products.productId),
  quantity: integer().default(1),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertCartItemsSchema = createInsertSchema(cartItems);
export const selectCartItemsSchema = createSelectSchema(cartItems);

export type InsertCartItemsSchema = z.infer<typeof insertCartItemsSchema>;
export type SelectCartItemsSchema = z.infer<typeof selectCartItemsSchema>;

export type CartItem = Pick<SelectCartItemsSchema, 'productId' | 'quantity'>;
export type CartItemWithProduct = SelectCartItemsSchema & { product: Product };
