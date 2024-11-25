import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { boolean, char, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import z from 'zod';

export const regions = pgTable('regions', {
  regionId: char({ length: 3 }).primaryKey(),
  name: varchar().notNull(),
  isDefault: boolean().default(false),
  flagUrl: varchar().notNull(),
  currency: char({ length: 3 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertRegionsSchema = createInsertSchema(regions);
export const selectRegionsSchema = createSelectSchema(regions);
export type selectRegionsSchema = z.infer<typeof selectRegionsSchema>;
