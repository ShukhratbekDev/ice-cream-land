import { relations } from 'drizzle-orm';
import { regions } from '@/db/schema/regions';
import { discountsVat } from '@/db/schema/discountsVat';
import { productIngredients } from '@/db/schema/productIngredients';
import { ingredients } from '@/db/schema/ingredients';
import { products } from '@/db/schema/products';
import { categories } from '@/db/schema/categories';
import { likes } from '@/db/schema/likes';
import { users } from '@/db/schema/users';

export const discountsVatRelations = relations(discountsVat, ({ one }) => ({
  region: one(regions, {
    fields: [discountsVat.regionId],
    references: [regions.id],
  }),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  products: many(productIngredients),
}));

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

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  liked: one(likes, {
    fields: [products.id],
    references: [likes.productId],
  }),
  likes: many(likes),
  ingredients: many(productIngredients),
}));

export const userRelations = relations(users, ({ many }) => ({
  likes: many(likes),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  likedProduct: one(products, {
    fields: [likes.productId],
    references: [products.id],
  }),
  likedBy: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));
