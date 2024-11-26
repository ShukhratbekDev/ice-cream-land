import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';
import { char, numeric, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { regions } from '@/db/schema/regions';

export const discountVats = pgTable('discount_vats', {
  discountVatId: serial().primaryKey(),
  regionId: char({ length: 3 })
    .references(() => regions.regionId)
    .notNull(),
  orderCost: numeric({ precision: 10, scale: 2 }),
  discountPercentage: numeric({ precision: 5, scale: 2 }),
  vatPercentage: numeric({ precision: 5, scale: 2 }),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertDiscountVatsSchema = createInsertSchema(discountVats);

export type DiscountVat = z.infer<typeof insertDiscountVatsSchema>;
