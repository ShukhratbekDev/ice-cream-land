import { char, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { products } from '@/db/schema/products';
import { regions } from '@/db/schema/regions';

export const productLocalizations = pgTable('product_localizations', {
  productLocalizationId: serial().primaryKey(),
  productId: integer()
    .references(() => products.productId)
    .notNull(),
  regionId: char({ length: 3 })
    .references(() => regions.regionId)
    .notNull(), // Localization region identifier
  localizedName: varchar(),
  localizedDescription: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
