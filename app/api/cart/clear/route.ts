import { NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { cartItems, users } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function POST() {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { cart: true },
  });

  if (!userData?.cart?.cartId) {
    return new NextResponse('OK', { status: 200 });
  }

  await db.delete(cartItems).where(eq(cartItems.cartId, userData.cart.cartId));

  return new NextResponse('OK', { status: 200 });
}
