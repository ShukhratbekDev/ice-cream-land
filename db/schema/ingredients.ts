import { createInsertSchema } from 'drizzle-zod';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { productIngredients } from '@/db/schema/productIngredients';

export const ingredients = pgTable('ingredients', {
  id: serial().primaryKey(),
  name: varchar().unique().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  productIngredients: many(productIngredients),
}));

export const insertIngredientsSchema = createInsertSchema(ingredients);
