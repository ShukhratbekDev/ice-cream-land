import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartItems, discountVats, regions, users } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { Order, orders } from '@/db/schema/orders';
import { convertPrice } from '@/lib/convertPrice';
import { calculatePricing } from '@/app/api/calculate-final-price/route';
import { InsertOrderItemSchema, orderItems } from '@/db/schema/orderItems';

export async function POST(request: NextRequest) {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { regionId, createdAt } = await request.json();

  if (!regionId) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const discountVat = await db.query.discountVats.findFirst({ where: eq(discountVats.regionId, regionId) });
  if (!discountVat) {
    return NextResponse.json({ error: 'Discount and VAT not found for specified region.' }, { status: 404 });
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { cart: { with: { items: { with: { product: true } } } } },
  });

  if (!userData?.cart?.cartId) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  const regionsData = await db.query.regions.findFirst({ where: eq(regions.regionId, regionId) });

  const getTotal = (userData?.cart?.items ?? []).reduce((acc, itemInCart) => {
    acc +=
      Number(convertPrice(Number(itemInCart?.product?.price), regionsData?.currency) ?? itemInCart?.product?.price) *
      (itemInCart?.quantity ?? 1);

    return acc;
  }, 0);

  const finalPrice = calculatePricing(getTotal, discountVat);

  const order = await db
    .insert(orders)
    .values({
      userId,
      regionId,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      currency: regionsData?.currency,
      totalAmount: String(finalPrice.finalAmount),
      discountAmount: String(finalPrice.discountAmount),
      discountedAmount: String(finalPrice.discountedAmount),
      discountPercentage: String(finalPrice.discountPercentage),
      taxAmount: String(finalPrice.taxAmount),
      taxPercentage: String(finalPrice.taxPercentage),
    } as Order)
    .returning();

  await db.insert(orderItems).values(
    (userData?.cart?.items ?? []).map((item) => ({
      orderId: order?.[0]?.orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: convertPrice(Number(item?.product?.price), regionsData?.currency) ?? item?.product?.price,
      currency: regionsData?.currency,
    })) as InsertOrderItemSchema[]
  );

  await db.delete(cartItems).where(eq(cartItems.cartId, userData.cart.cartId));

  return new NextResponse('Created', { status: 201 });
}
