import { NextResponse } from 'next/server';
import { products } from '@/config/products';
import { regions } from '@/config/regions';
import { convertPrice } from '@/lib/convertPrice';

export async function GET() {
  return NextResponse.json(
    products.map((product) => {
      const basePrice = product.price;
      return {
        ...product,
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
