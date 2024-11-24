import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';
import { char, numeric, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { regions } from '@/db/schema/regions';
import { relations } from 'drizzle-orm';

export const discountsVat = pgTable('discounts_vat', {
  id: serial().primaryKey(),
  regionId: char({ length: 3 })
    .references(() => regions.id)
    .notNull(),
  orderCost: numeric({ precision: 10, scale: 2 }),
  discountPercentage: numeric({ precision: 5, scale: 2 }),
  vatPercentage: numeric({ precision: 5, scale: 2 }),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const discountsVatRelations = relations(discountsVat, ({ one }) => ({
  region: one(regions, {
    fields: [discountsVat.regionId],
    references: [regions.id],
  }),
}));

export const insertDiscountsVatSchema = createInsertSchema(discountsVat);

export type DiscountsVat = z.infer<typeof insertDiscountsVatSchema>;
