import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { products } from '@/db/schema';
import { convertPrice } from '@/lib/convertPrice';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const regionsData = await db.query.regions.findMany();
  const productData = await db.query.products.findFirst({
    where: eq(products.productId, Number(id)),
    columns: {
      categoryId: false,
    },
    with: {
      category: { columns: { categoryId: true, name: true } },
      ingredients: {
        columns: {
          ingredientId: false,
          productId: false,
        },
        with: {
          ingredient: {
            columns: {
              ingredientId: true,
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
    regionalPrices: regionsData.map((region) => {
      const regionalPrice = convertPrice(basePrice, region.currency);
      return {
        regionId: region.regionId,
        price: regionalPrice,
        currency: region.currency,
      };
    }),
  });
}
