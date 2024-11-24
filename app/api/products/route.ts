import { NextResponse } from 'next/server';
import { regions } from '@/config/regions';
import { convertPrice } from '@/lib/convertPrice';
import { db } from '@/db';

export async function GET() {
  const productData = await db.query.products.findMany({
    columns: {
      categoryId: false,
    },
    with: {
      category: { columns: { id: true, name: true } },
      productIngredients: {
        columns: {
          ingredientId: false,
          productId: false,
        },
        with: {
          ingredient: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(
    productData.map((product) => {
      const basePrice = Number(product.price);
      return {
        ...product,
        ingredients: product.productIngredients.map((item) => item.ingredient),
        price: basePrice,
        regionalPrices: regions.map((region) => {
          const regionalPrice = convertPrice(basePrice, region.currency);
          return {
            regionId: region.id,
            price: regionalPrice,
            currency: region.currency,
          };
        }),
      };
    })
  );
}
