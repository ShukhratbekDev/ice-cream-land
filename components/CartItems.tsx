'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { setCurrency } from '@/lib/setCurrency';
import React from 'react';
import { useCart } from '@/hooks/useCart';
import useBasicStore from '@/hooks/useBasicStore';
import { CartItemWithProduct } from '@/db/schema';
import { useProducts } from '@/hooks/useProducts';
import RemoveItemFromCart from '@/components/RemoveItemFromCart';

const CartItems = () => {
  const { data } = useCart();
  const { selectedRegion } = useBasicStore();
  const { data: products } = useProducts();

  const getPrice = (itemInCart: Partial<CartItemWithProduct>) => {
    const product = products?.find((item) => itemInCart?.productId === item.productId);
    const regionalPrice = selectedRegion
      ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
      : undefined;

    return regionalPrice?.price ?? product?.price;
  };

  return (
    <div className="grid grid-flow-row auto-rows-max gap-4 mb-4">
      {data?.length === 0 ? (
        <h1 className="py-6">You do not have any items</h1>
      ) : (
        data?.map((item) => (
          <div key={item.productId} className="flex items-center space-x-4 overflow-hidden ">
            <div className="flex-none w-[100px] group">
              <figure className="group-hover:opacity-80 relative w-full aspect-[4/3]">
                <Image
                  src={item?.product?.imageUrl ?? ''}
                  alt={item?.product?.name ?? ''}
                  className="object-cover"
                  fill
                  sizes="100vw"
                />
              </figure>
            </div>
            <div className="w-full">
              <p className="text-sm font-medium leading-none">{item?.product?.name}</p>
              <p className="text-sm text-muted-foreground">{item?.product?.description}</p>
              <div className="flex">
                <p className="text-gray-500">
                  <Badge variant="outline">Qty {item.quantity}</Badge>
                </p>
                <p className="ml-4">
                  {setCurrency({
                    price: getPrice(item),
                    locale: selectedRegion?.regionId,
                    currency: selectedRegion?.currency,
                  })}
                </p>
              </div>
            </div>
            <div>{item?.productId && <RemoveItemFromCart productId={item.productId} />}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
