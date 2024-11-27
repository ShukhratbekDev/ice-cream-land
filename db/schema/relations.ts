import { relations } from 'drizzle-orm';
import { regions } from '@/db/schema/regions';
import { discountVats } from '@/db/schema/discountVats';
import { productIngredients } from '@/db/schema/productIngredients';
import { ingredients } from '@/db/schema/ingredients';
import { products } from '@/db/schema/products';
import { categories } from '@/db/schema/categories';
import { likes } from '@/db/schema/likes';
import { users } from '@/db/schema/users';
import { carts } from '@/db/schema/carts';
import { cartItems } from '@/db/schema/cartItems';
import { orders } from '@/db/schema/orders';
import { orderItems } from '@/db/schema/orderItems';

export const discountsVatRelations = relations(discountVats, ({ one }) => ({
  region: one(regions, {
    fields: [discountVats.regionId],
    references: [regions.regionId],
  }),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  products: many(productIngredients),
}));

export const productIngredientsRelations = relations(productIngredients, ({ one }) => ({
  product: one(products, {
    fields: [productIngredients.productId],
    references: [products.productId],
  }),
  ingredient: one(ingredients, {
    fields: [productIngredients.ingredientId],
    references: [ingredients.ingredientId],
  }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.categoryId],
  }),
  liked: one(likes, {
    fields: [products.productId],
    references: [likes.productId],
  }),
  likes: many(likes),
  ingredients: many(productIngredients),
}));

export const userRelations = relations(users, ({ one, many }) => ({
  likes: many(likes),
  cart: one(carts, {
    fields: [users.userId],
    references: [carts.userId],
  }),
  orders: many(orders),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  likedProduct: one(products, {
    fields: [likes.productId],
    references: [products.productId],
  }),
  likedBy: one(users, {
    fields: [likes.userId],
    references: [users.userId],
  }),
}));

export const cartsRelations = relations(carts, ({ many }) => ({
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.cartId],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.productId],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.userId],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.orderId],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.productId],
  }),
}));
