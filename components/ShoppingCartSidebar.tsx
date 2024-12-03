'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import useBasicStore from '@/hooks/useBasicStore';
import Link from 'next/link';
import React from 'react';
import CartItems from '@/components/CartItems';
import CartTotalDetails from '@/components/CartTotalDetails';
import { ShoppingCart } from 'lucide-react';

const ShoppingCartSidebar = () => {
  const { isCartSidebarOpen, setCartSidebarState } = useBasicStore();

  return (
    <Sheet open={isCartSidebarOpen} onOpenChange={() => setCartSidebarState(false)}>
      <SheetContent
        className="sm:max-w-lg w-[90vw] flex flex-col"
        side="right"
        role="dialog"
        aria-label="Shopping cart sidebar"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="size-5" aria-hidden="true" />
            <span>Shopping Cart</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col min-h-0">
          <div
            className="mt-8 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-background"
            role="region"
            aria-label="Cart items"
          >
            <CartItems />
          </div>
          <div className="border-t border-gray-200 py-4 mt-auto bg-background/80 backdrop-blur-sm">
            <CartTotalDetails />
            <div className="mt-4">
              <Button
                className="w-full font-medium"
                asChild
                onClick={() => setCartSidebarState(false)}
                aria-label="Proceed to order page"
              >
                <Link href="/order/cart" className="flex items-center justify-center gap-2">
                  Order now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSidebar;
