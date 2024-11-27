'use client';

import { ButtonWithLoading } from '@/components/ui/button-with-loading';

import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';

import useBasicStore from '@/hooks/useBasicStore';
import { ChevronsUpDown, Trash2 } from 'lucide-react';
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useRemoveItemFromCart } from '@/hooks/useRemoveItemFromCart';
import { CartItemWithProduct } from '@/db/schema';
import { useCalculateFinalPrice } from '@/hooks/useCalculateFinalPrice';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { setCurrency } from '@/lib/setCurrency';

const ShoppingCartSidebar = () => {
  const { data } = useCart();
  const { mutate: removeItem } = useRemoveItemFromCart();
  const { isCartSidebarOpen, setCartSidebarState, selectedRegion } = useBasicStore();
  const { data: products } = useProducts();

  const getPrice = (itemInCart: Partial<CartItemWithProduct>) => {
    const product = products?.find((item) => itemInCart?.productId === item.productId);
    const regionalPrice = selectedRegion
      ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
      : undefined;

    return regionalPrice?.price ?? product?.price;
  };

  const getCartTotal = () => {
    return (data ?? []).reduce((acc, itemInCart) => {
      const product = products?.find((item) => itemInCart.productId === item.productId);

      if (!product) {
        return acc;
      }

      const regionalPrice = selectedRegion
        ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
        : undefined;
      acc += Number(regionalPrice?.price ?? product.price) * (itemInCart?.quantity ?? 1);

      return acc;
    }, 0);
  };

  const { data: finalPrice } = useCalculateFinalPrice(selectedRegion?.regionId ?? 'UZB', getCartTotal());

  return (
    <Sheet open={isCartSidebarOpen} onOpenChange={() => setCartSidebarState(false)}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <div className="grid grid-flow-row auto-rows-max gap-4 mb-4">
              {data?.length === 0 ? (
                <h1 className="py-6">You do not have any items</h1>
              ) : (
                data?.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 overflow-hidden">
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
                    <div>
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
                    <div>
                      <ButtonWithLoading
                        onClick={() => item.productId && removeItem(item.productId)}
                        variant="ghost"
                        size="icon"
                      >
                        <Trash2 />
                      </ButtonWithLoading>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="border-t border-gray-200 py-6">
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between space-x-4 mb-2">
                  <h4 className="text-sm font-semibold">Details</h4>
                  <ChevronsUpDown className="h-4 w-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex justify-between mb-2 text-sm">
                  <div>Subtotal</div>
                  <div>
                    {setCurrency({
                      price: getCartTotal(),
                      locale: selectedRegion?.regionId,
                      currency: selectedRegion?.currency,
                    })}
                  </div>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <div>
                    Discount <Badge variant="secondary">{`${finalPrice?.discountPercentage}%`}</Badge>
                  </div>
                  <div>
                    -{' '}
                    {setCurrency({
                      price: finalPrice?.discountAmount,
                      locale: selectedRegion?.regionId,
                      currency: selectedRegion?.currency,
                    })}
                  </div>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <div>
                    Tax <Badge variant="secondary">{`${finalPrice?.taxPercentage}%`}</Badge>
                  </div>
                  <div>
                    {setCurrency({
                      price: finalPrice?.taxAmount,
                      locale: selectedRegion?.regionId,
                      currency: selectedRegion?.currency,
                    })}
                  </div>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <div>Shipping</div>
                  <div>Free</div>
                </div>
              </CollapsibleContent>
              <div className="flex justify-between font-bold">
                <div>Total</div>
                <div>
                  {setCurrency({
                    price: finalPrice?.finalAmount,
                    locale: selectedRegion?.regionId,
                    currency: selectedRegion?.currency,
                  })}
                </div>
              </div>
            </Collapsible>
            <div className="mt-6">
              <ButtonWithLoading className="w-full bg-black text-white">Order now</ButtonWithLoading>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <ButtonWithLoading className="w-full mt-4" onClick={() => setCartSidebarState(false)}>
                Continue shopping
              </ButtonWithLoading>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSidebar;
