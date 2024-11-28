'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import useBasicStore from '@/hooks/useBasicStore';
import Link from 'next/link';
import React from 'react';
import CartItems from '@/components/CartItems';
import CartTotalDetails from '@/components/CartTotalDetails';

const ShoppingCartSidebar = () => {
  const { isCartSidebarOpen, setCartSidebarState } = useBasicStore();

  return (
    <Sheet open={isCartSidebarOpen} onOpenChange={() => setCartSidebarState(false)}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <CartItems />
          </div>
          <div className="border-t border-gray-200 py-6">
            <CartTotalDetails />
            <div className="mt-6">
              <Button className="w-full" asChild onClick={() => setCartSidebarState(false)}>
                <Link href="/order/cart">Order now</Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSidebar;
