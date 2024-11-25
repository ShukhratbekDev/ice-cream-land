'use client';

import { Button } from '@/components/ui/button';

import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Item, useCart } from 'react-use-cart';
import useBasicStore from '@/hooks/useBasicStore';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useProducts } from '@/hooks/useProducts';

const ShoppingCartSidebar = () => {
  const { items, removeItem } = useCart();
  const { isCartModalOpen, setCartSidebarState, selectedRegion } = useBasicStore();
  const { data } = useProducts();

  const getPrice = (itemInCart: Item) => {
    const product = data?.find((item) => itemInCart.productId === String(item.productId));
    const regionalPrice = selectedRegion
      ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
      : undefined;
    return regionalPrice
      ? `${regionalPrice.price.toFixed(2)} ${regionalPrice.currency}`
      : `$ ${product?.price.toFixed(2)}`;
  };

  const getCartTotal = () => {
    const total = items
      .reduce((acc, itemInCart) => {
        const product = data?.find((item) => itemInCart.id === String(item.productId));
        const regionalPrice = selectedRegion
          ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
          : undefined;
        acc += (regionalPrice?.price ?? itemInCart.price) * (itemInCart?.quantity ?? 1);
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
              {items?.length === 0 ? (
                <h1 className="py-6">You do not have any items</h1>
              ) : (
                items?.map((product) => (
                  <div key={product.productId} className="flex items-center space-x-4 overflow-hidden">
                    <div className="flex-none w-[100px] group">
                      <figure className="group-hover:opacity-80 relative w-full aspect-[4/3]">
                        <Image src={product.imageUrl} alt={product.name} className="object-cover" fill sizes="100vw" />
                      </figure>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <div className="flex">
                        <p className="text-gray-500">QTY: {product.quantity}</p>
                        <p className="ml-4">{getPrice(product)}</p>
                      </div>
                    </div>
                    <div>
                      <Button onClick={() => removeItem(product.productId)} variant="ghost" size="icon">
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
