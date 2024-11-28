import { db } from '../.';
import {
  products,
  categories,
  ingredients,
  productIngredients,
  discountVats,
  regions,
  orders,
  orderItems,
  users,
  insertCategoriesSchema,
  insertIngredientsSchema,
  insertProductsSchema,
  insertProductIngredientsSchema,
  insertRegionsSchema,
  insertDiscountVatsSchema,
  insertUsersSchema,
  insertOrderSchema,
  insertOrderItemSchema,
} from '../schema';

import { products as productsData } from './products';
import { regions as regionsData } from './regions';
import { discountsVat as discountsVatData } from './discountsVat';
import { sampleUsers as usersData } from './users';
import { sampleOrders as ordersData } from './orders';
import { sampleOrderItems as orderItemsData } from './orderItems';

async function seedData() {
  // Extract unique categories
  const uniqueCategories = Array.from(new Set(productsData.map((product) => product.category)));

  // Extract unique ingredients
  const uniqueIngredients = Array.from(new Set(productsData.flatMap((product) => product.ingredients)));

  // Seed categories
  const insertedCategories = await db
    .insert(categories)
    .values(uniqueCategories.map((name) => insertCategoriesSchema.parse({ name })))
    .returning({ categoryId: categories.categoryId, name: categories.name })
    .onConflictDoNothing();

  // Mapping from category names to IDs
  const categoryMap = new Map(insertedCategories.map((c) => [c.name, c.categoryId]));

  // Seed ingredients
  const insertedIngredients = await db
    .insert(ingredients)
    .values(uniqueIngredients.map((name) => insertIngredientsSchema.parse({ name })))
    .returning({ ingredientId: ingredients.ingredientId, name: ingredients.name });

  // Create a map from ingredient names to IDs
  const ingredientMap = new Map(insertedIngredients.map((i) => [i.name, i.ingredientId]));

  await Promise.all(
    productsData.map(async (product) => {
      const productIdResult = await db
        .insert(products)
        .values(
          insertProductsSchema.parse({
            name: product.name,
            // drizzle-zod has an error when we put number type to numberic with message "Expected string, received number"
            // Numeric and Decimal fields in PG are numeric strings not numbers
            // to fix that, cast to string
            price: String(product.price),
            currency: product.currency,
            rating: String(product.rating),
            imageUrl: product.image,
            description: product.description,
            categoryId: categoryMap.get(product.category),
            isHot: product.isHot,
          })
        )
        .returning({ id: products.productId });

      const productId = productIdResult[0].id;

      const productIngredientValues = product.ingredients.map((ingredientName) => {
        const ingredientId = ingredientMap.get(ingredientName);
        if (!ingredientId) {
          throw new Error(`Ingredient ID not found for ingredient: ${ingredientName}`);
        }
        return insertProductIngredientsSchema.parse({ productId, ingredientId });
      });

      await db.insert(productIngredients).values(productIngredientValues).onConflictDoNothing();
    })
  );

  // Seed Regions
  await db
    .insert(regions)
    .values(regionsData.map((item) => insertRegionsSchema.parse(item)))
    .onConflictDoNothing();

  // Seed Discounts and VAT
  await db
    .insert(discountVats)
    .values(discountsVatData.map((item) => insertDiscountVatsSchema.parse(item)))
    .onConflictDoNothing();

  // Seed Users
  await db
    .insert(users)
    .values(usersData.map((user) => insertUsersSchema.parse(user)))
    .onConflictDoNothing();

  // Seed Orders
  await db
    .insert(orders)
    .values(ordersData.map((order) => insertOrderSchema.parse(order)))
    .onConflictDoNothing();

  // Seed OrderItems
  await db
    .insert(orderItems)
    .values(orderItemsData.map((orderItem) => insertOrderItemSchema.parse(orderItem)))
    .onConflictDoNothing();
}

seedData().catch(console.error);
