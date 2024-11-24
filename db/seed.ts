import { db } from './.';
import {
  products,
  categories,
  ingredients,
  productIngredients,
  discountsVat,
  regions,
  insertCategoriesSchema,
  insertIngredientsSchema,
  insertProductsSchema,
  insertProductIngredientsSchema,
  insertRegionsSchema,
  insertDiscountsVatSchema,
} from './schema';

import { products as productsData } from '../config/products';
import { regions as regionsData } from '../config/regions';
import { discountsVat as discountsVatData } from '../config/discountsVat';

async function seedData() {
  // Extract unique categories
  const uniqueCategories = Array.from(new Set(productsData.map((product) => product.category)));

  // Extract unique ingredients
  const uniqueIngredients = Array.from(new Set(productsData.flatMap((product) => product.ingredients)));

  // Seed categories
  const insertedCategories = await db
    .insert(categories)
    .values(uniqueCategories.map((name) => insertCategoriesSchema.parse({ name })))
    .returning({ id: categories.id, name: categories.name })
    .onConflictDoNothing();

  // Mapping from category names to IDs
  const categoryMap = new Map(insertedCategories.map((c) => [c.name, c.id]));

  // Seed ingredients
  const insertedIngredients = await db
    .insert(ingredients)
    .values(uniqueIngredients.map((name) => insertIngredientsSchema.parse({ name })))
    .returning({ id: ingredients.id, name: ingredients.name });

  // Create a map from ingredient names to IDs
  const ingredientMap = new Map(insertedIngredients.map((i) => [i.name, i.id]));

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
            categoryId: categoryMap.get(product.category), // Assuming you've mapped categories
            isHot: product.isHot,
          })
        )
        .returning({ id: products.id });

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
    .insert(discountsVat)
    .values(discountsVatData.map((item) => insertDiscountsVatSchema.parse(item)))
    .onConflictDoNothing();
}

seedData().catch(console.error);