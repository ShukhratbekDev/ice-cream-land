import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { products } from '@/db/schema';
import { regions } from '@/config/regions';
import { convertPrice } from '@/lib/convertPrice';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const productData = await db.query.products.findFirst({
    where: eq(products.id, Number(id)),
    columns: {
      categoryId: false,
    },
    with: {
      category: { columns: { id: true, name: true } },
      ingredients: {
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
  const basePrice = Number(productData?.price);

  return NextResponse.json({
    ...productData,
    ingredients: productData?.ingredients.map((item) => item.ingredient),
    price: basePrice,
    regionalPrices: regions.map((region) => {
      const regionalPrice = convertPrice(basePrice, region.currency);
      return {
        regionId: region.id,
        price: regionalPrice,
        currency: region.currency,
      };
    }),
  });
}
