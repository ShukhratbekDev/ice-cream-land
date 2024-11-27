import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartItems, users } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const productId = Number((await params).id);

  const { quantity } = await request.json();

  if (!quantity) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { cart: true },
  });

  if (!userData?.cart?.cartId) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const cartItemData = await db.query.cartItems.findFirst({
    where: and(eq(cartItems.cartId, userData.cart.cartId), eq(cartItems.productId, productId)),
  });

  if (!cartItemData) {
    return new NextResponse('Not Found', { status: 404 });
  }

  await db.update(cartItems).set({ productId, quantity }).where(eq(cartItems.cartId, userData.cart.cartId));

  return new NextResponse('OK', { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const productId = Number((await params).id);

  const userData = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { cart: true },
  });

  if (!userData?.cart?.cartId) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const cartItemData = await db.query.cartItems.findFirst({
    where: and(eq(cartItems.cartId, userData.cart.cartId), eq(cartItems.productId, productId)),
  });

  if (!cartItemData) {
    return new NextResponse('Not Found', { status: 404 });
  }

  await db.delete(cartItems).where(and(eq(cartItems.cartId, userData.cart.cartId), eq(cartItems.productId, productId)));

  return new NextResponse('OK', { status: 200 });
}
