import { NextResponse } from 'next/server';
import discounts from '@/config/discounts.json';
import vatRates from '@/config/vat.json';
import { products } from '@/config/products'; 

export async function POST(request: Request) {
  try {
    const { orderedProducts, region } = await request.json();

    if (!orderedProducts || !Array.isArray(orderedProducts) || !region) {
      return NextResponse.json({ error: 'Products and region are required.' }, { status: 400 });
    }

    for (const orderedProduct of orderedProducts) {
      if (!orderedProduct.productId || !orderedProduct.quantity) {
        return NextResponse.json({ error: 'Each product must have a productId and quantity.' }, { status: 400 });
      }
    }

    const discountData = discounts.find((d) => d.region === region);
    if (!discountData) {
      return NextResponse.json({ error: 'Invalid region for discount.' }, { status: 400 });
    }
    const discountRate = discountData.percentage;

    const vatData = vatRates.find((v) => v.region === region);
    if (!vatData) {
      return NextResponse.json({ error: 'Invalid region for VAT.' }, { status: 400 });
    }
    const vatRate = vatData.percentage;

    let totalOrderAmount = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    for (const orderedProduct of orderedProducts) {
      const productData = products.find((p) => p.id === orderedProduct.productId);
      if (!productData) {
        return NextResponse.json({ error: `Invalid product ID: ${orderedProduct.productId}` }, { status: 400 });
      }

      const productCost = productData.price * orderedProduct.quantity;

      const discount = (productCost * discountRate) / 100;
      const taxableAmount = productCost - discount;

      const tax = (taxableAmount * vatRate) / 100;

      totalOrderAmount += productCost;
      totalDiscount += discount;
      totalTax += tax;
    }

    const finalAmount = totalOrderAmount - totalDiscount + totalTax;

    return NextResponse.json({
      totalOrderAmount,
      totalDiscount,
      totalTax,
      finalAmount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
