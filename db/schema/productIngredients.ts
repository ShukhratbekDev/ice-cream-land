import { createInsertSchema } from 'drizzle-zod';
import { pgTable, primaryKey, integer } from 'drizzle-orm/pg-core';
import { products } from '@/db/schema/products';
import { ingredients } from '@/db/schema/ingredients';

export const productIngredients = pgTable(
  'product_ingredients',
  {
    productId: integer()
      .notNull()
      .references(() => products.productId),
    ingredientId: integer()
      .notNull()
      .references(() => ingredients.ingredientId),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.ingredientId] }),
  })
);

export const insertProductIngredientsSchema = createInsertSchema(productIngredients);
