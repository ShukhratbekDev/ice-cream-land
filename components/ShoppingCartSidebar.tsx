'use client';

import { Button } from '@/components/ui/button';

import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';

import useBasicStore from '@/hooks/useBasicStore';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useRemoveItemFromCart } from '@/hooks/useRemoveItemFromCart';
import { CartItemWithProduct } from '@/db/schema';

const ShoppingCartSidebar = () => {
  const { data } = useCart();
  const { mutate: removeItem } = useRemoveItemFromCart();
  const { isCartModalOpen, setCartSidebarState, selectedRegion } = useBasicStore();
  const { data: products } = useProducts();

  const getPrice = (itemInCart: CartItemWithProduct) => {
    const product = products?.find((item) => itemInCart?.productId === item.productId);
    const regionalPrice = selectedRegion
      ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
      : undefined;
    return regionalPrice
      ? `${regionalPrice.price.toFixed(2)} ${regionalPrice.currency}`
      : `$ ${product?.price.toFixed(2)}`;
  };

  const getCartTotal = () => {
    const total = (data?.items ?? [])
      .reduce((acc, itemInCart) => {
        const product = products?.find((item) => itemInCart.productId === item.productId);

        if (!product) {
          return acc;
        }

        const regionalPrice = selectedRegion
          ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
          : undefined;
        acc += (regionalPrice?.price ?? product.price) * (itemInCart?.quantity ?? 1);

        return acc;
      }, 0)
      .toFixed(2);

    return selectedRegion ? `${total} ${selectedRegion.currency}` : `$ ${total}`;
  };

  return (
    <Sheet open={isCartModalOpen} onOpenChange={() => setCartSidebarState(false)}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <div className="grid grid-flow-row auto-rows-max gap-4">
              {data?.items?.length === 0 ? (
                <h1 className="py-6">You do not have any items</h1>
              ) : (
                data?.items?.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 overflow-hidden">
                    <div className="flex-none w-[100px] group">
                      <figure className="group-hover:opacity-80 relative w-full aspect-[4/3]">
                        <Image
                          src={item?.product?.imageUrl}
                          alt={item?.product?.name}
                          className="object-cover"
                          fill
                          sizes="100vw"
                        />
                      </figure>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{item?.product?.name}</p>
                      <p className="text-sm text-muted-foreground">{item?.product?.description}</p>
                      <div className="flex">
                        <p className="text-gray-500">QTY: {item.quantity}</p>
                        <p className="ml-4">{getPrice(item)}</p>
                      </div>
                    </div>
                    <div>
                      <Button onClick={() => item.productId && removeItem(item.productId)} variant="ghost" size="icon">
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{getCartTotal()}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes are calculated at checkout</p>

            <div className="mt-6">
              <Button className="w-full bg-black text-white">Order now</Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <Button className="w-full mt-4" onClick={() => setCartSidebarState(false)}>
                Continue shopping
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSidebar;
