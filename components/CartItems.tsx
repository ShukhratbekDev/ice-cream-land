'use client';

import Image from 'next/image';
import { setCurrency } from '@/lib/setCurrency';
import React from 'react';
import { useCart } from '@/hooks/useCart';
import useBasicStore from '@/hooks/useBasicStore';
import { CartItemWithProduct } from '@/db/schema';
import { useProducts } from '@/hooks/useProducts';
import RemoveItemFromCart from '@/components/RemoveItemFromCart';
import CartItemQuantityInput from '@/components/CartItemQuantity';

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
    <div className="grid grid-flow-row auto-rows-max gap-4 mb-4" role="list" aria-label="Shopping cart items">
      {data?.length === 0 ? (
        <p className="py-6 text-muted-foreground text-center" role="status">
          Your shopping cart is empty
        </p>
      ) : (
        data?.map((item) => (
          <div
            key={item.productId}
            className="flex items-center space-x-4 overflow-hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
            role="listitem"
          >
            <div className="flex-none w-[100px] group">
              <figure
                className="group-hover:opacity-80 relative w-full aspect-[4/3]"
                aria-label={`Image of ${item?.product?.name}`}
              >
                <Image
                  src={item?.product?.imageUrl ?? ''}
                  alt={item?.product?.name ?? ''}
                  className="object-cover rounded-md"
                  fill
                  sizes="(max-width: 768px) 100px, 100px"
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate">{item?.product?.name}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item?.product?.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <CartItemQuantityInput itemInCart={item} />
                <span
                  className="text-sm font-medium"
                  aria-label={`Price: ${setCurrency({
                    price: getPrice(item) ?? 0,
                    locale: selectedRegion?.regionId,
                    currency: selectedRegion?.currency,
                  })}`}
                >
                  {setCurrency({
                    price: getPrice(item) ?? 0,
                    locale: selectedRegion?.regionId,
                    currency: selectedRegion?.currency,
                  })}
                </span>
              </div>
            </div>
            <div className="flex-none">
              {item?.productId && (
                <RemoveItemFromCart productId={item.productId} aria-label={`Remove ${item?.product?.name} from cart`} />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
