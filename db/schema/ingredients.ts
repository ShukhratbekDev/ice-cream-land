import { createInsertSchema } from 'drizzle-zod';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const ingredients = pgTable('ingredients', {
  ingredientId: serial().primaryKey(),
  name: varchar().unique().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertIngredientsSchema = createInsertSchema(ingredients);
