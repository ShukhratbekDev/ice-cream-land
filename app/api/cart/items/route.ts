import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartItems, users } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { productId, quantity } = await request.json();

  if (!productId || !quantity) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { cart: true },
  });

  await db.insert(cartItems).values({ productId, quantity, cartId: userData?.cart?.cartId });

  return new NextResponse('Created', { status: 201 });
}
