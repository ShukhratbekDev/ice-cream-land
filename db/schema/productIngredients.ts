import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { pgTable, primaryKey, integer } from 'drizzle-orm/pg-core';
import { products } from '@/db/schema/products';
import { ingredients } from '@/db/schema/ingredients';

export const productIngredients = pgTable(
  'product_ingredients',
  {
    productId: integer()
      .notNull()
      .references(() => products.id),
    ingredientId: integer()
      .notNull()
      .references(() => ingredients.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.ingredientId] }),
  })
);

export const productIngredientsRelations = relations(productIngredients, ({ one }) => ({
  product: one(products, {
    fields: [productIngredients.productId],
    references: [products.id],
  }),
  ingredient: one(ingredients, {
    fields: [productIngredients.ingredientId],
    references: [ingredients.id],
  }),
}));

export const insertProductIngredientsSchema = createInsertSchema(productIngredients);
