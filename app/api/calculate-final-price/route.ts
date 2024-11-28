import { NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { DiscountVat, discountVats } from '@/db/schema/discountVats';

type CalculationResult = {
  discountAmount: number;
  discountedAmount: number;
  taxAmount: number;
  finalAmount: number;
  discountPercentage: number;
  taxPercentage: number;
};

export function calculatePricing(orderAmount: number, discountVat: DiscountVat): CalculationResult {
  if (orderAmount <= 0) {
    throw new Error('Order amount must be greater than zero.');
  }

  const discountAmount = orderAmount * (parseFloat(discountVat.discountPercentage ?? '0') / 100);
  const discountedAmount = orderAmount - discountAmount;
  const taxAmount = discountedAmount * (parseFloat(discountVat.vatPercentage ?? '0') / 100);
  const finalAmount = discountedAmount + taxAmount;

  return {
    discountPercentage: Number(discountVat.discountPercentage),
    taxPercentage: Number(discountVat.vatPercentage),
    discountAmount,
    discountedAmount,
    taxAmount,
    finalAmount,
  };
}

export async function POST(request: Request) {
  const { price, regionId } = await request.json();
  const discountVat = await db.query.discountVats.findFirst({ where: eq(discountVats.regionId, regionId) });

  if (!discountVat) {
    return NextResponse.json({ error: 'Discount and VAT not found for specified region.' }, { status: 404 });
  }

  const calculationResult = calculatePricing(price, discountVat);

  return NextResponse.json(calculationResult);
}
