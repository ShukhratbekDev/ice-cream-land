import { createInsertSchema } from 'drizzle-zod';
import { char, numeric, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import z from 'zod';
import { users } from '@/db/schema/users';

export const orders = pgTable('orders', {
  orderId: serial().primaryKey(),
  userId: varchar()
    .references(() => users.userId)
    .notNull(),
  totalAmount: numeric({ precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  status: char({ length: 20 }).default('pending'),
});

export const insertOrderSchema = createInsertSchema(orders);

export type Order = z.infer<typeof insertOrderSchema>;
