import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from '@/db/schema/users';
import z from 'zod';
import { CartItemWithProduct } from '@/db/schema/cartItems';

export const carts = pgTable('carts', {
  cartId: serial().primaryKey(),
  userId: varchar().references(() => users.userId),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertCartSchema = createInsertSchema(carts);
export const selectCartSchema = createSelectSchema(carts);

export type InsertCartSchema = z.infer<typeof insertCartSchema> & { items?: CartItemWithProduct[] };
export type SelectCartSchema = z.infer<typeof selectCartSchema> & { items?: CartItemWithProduct[] };
