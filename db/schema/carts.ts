import { createInsertSchema } from 'drizzle-zod';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from '@/db/schema/users';

export const carts = pgTable('carts', {
  cartId: serial().primaryKey(),
  userId: varchar().references(() => users.userId),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertCartSchema = createInsertSchema(carts);
