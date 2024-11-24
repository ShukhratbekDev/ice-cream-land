import { char, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { products } from '@/db/schema/products';
import { regions } from '@/db/schema/regions';

export const productLocalizations = pgTable('product_localizations', {
  id: serial().primaryKey(),
  productId: integer()
    .references(() => products.id)
    .notNull(),
  regionId: char({ length: 3 })
    .references(() => regions.id)
    .notNull(), // Localization region identifier
  localizedName: varchar(),
  localizedDescription: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
