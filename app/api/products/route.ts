import { NextResponse } from 'next/server';
import { regions } from '@/config/regions';
import { convertPrice } from '@/lib/convertPrice';
import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId }: { userId: string | null } = await auth();
  const productData = await db.query.products.findMany({
    columns: {
      categoryId: false,
    },
    with: {
      category: { columns: { id: true, name: true } },
      ...(userId ? { likes: { where: (likes, { eq }) => eq(likes.userId, userId) } } : {}),
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

  return NextResponse.json(
    productData.map((product) => {
      const basePrice = Number(product.price);
      return {
        ...product,
        isLiked: !!product?.likes?.find((like) => like.userId === userId),
        ingredients: product.ingredients.map((item) => item.ingredient),
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
