import { NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { carts, users } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { cart: { columns: {}, with: { items: { with: { product: true } } } } },
  });

  if (!userData?.cart) {
    await db.insert(carts).values({ userId });

    const userData = await db.query.users.findFirst({
      where: eq(users.userId, userId),
      with: { cart: { columns: {}, with: { items: { with: { product: true } } } } },
    });

    return NextResponse.json(userData?.cart?.items);
  }

  return NextResponse.json(userData?.cart?.items);
}
