import { DiscountVat } from '@/db/schema';

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
