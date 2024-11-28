import { NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { discountVats } from '@/db/schema/discountVats';
import { calculatePricing } from '@/lib/calculatePricing';

export async function POST(request: Request) {
  const { price, regionId } = await request.json();
  const discountVat = await db.query.discountVats.findFirst({ where: eq(discountVats.regionId, regionId) });

  if (!discountVat) {
    return NextResponse.json({ error: 'Discount and VAT not found for specified region.' }, { status: 404 });
  }

  const calculationResult = calculatePricing(price, discountVat);

  return NextResponse.json(calculationResult);
}
