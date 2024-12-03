'use client';

import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import useBasicStore from '@/hooks/useBasicStore';
import CartItems from '@/components/CartItems';
import CartTotalDetails from '@/components/CartTotalDetails';
import { cn } from '@/lib/utils';

const ShoppingCartSidebar = () => {
  const { isCartSidebarOpen, setCartSidebarState } = useBasicStore();

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCartSidebarOpen) {
        setCartSidebarState(false);
      }
    },
    [isCartSidebarOpen, setCartSidebarState]
  );

  // Add keyboard event listener
  useEffect(() => {
    if (isCartSidebarOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Lock body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll when sidebar is closed
      document.body.style.overflow = 'unset';
    };
  }, [isCartSidebarOpen, handleKeyDown]);

  return (
    <Sheet open={isCartSidebarOpen} onOpenChange={setCartSidebarState}>
      <SheetContent
        className={cn(
          'w-full sm:max-w-md md:max-w-lg',
          'flex flex-col h-full',
          'transition-transform duration-300 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
        side="right"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <SheetHeader className="space-y-2.5">
          <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
            <ShoppingCart className="size-5" aria-hidden="true" />
            <span>Shopping Cart</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-grow min-h-0 mt-6">
          {/* Cart Items Section */}
          <div
            className={cn(
              'flex-grow overflow-y-auto',
              'scrollbar-thin scrollbar-thumb-accent scrollbar-track-background',
              'pb-4 space-y-4'
            )}
            role="region"
            aria-label="Cart items list"
            tabIndex={0}
          >
            <CartItems />
          </div>

          {/* Cart Summary Section */}
          <div
            className={cn(
              'mt-auto pt-4',
              'border-t border-border/50',
              'bg-background/80 backdrop-blur-sm',
              'sticky bottom-0'
            )}
          >
            <CartTotalDetails />
            <div className="mt-4 px-0.5">
              <Button
                asChild
                className={cn('w-full h-11 font-medium', 'transition-all duration-200', 'hover:translate-y-[1px]')}
                onClick={() => setCartSidebarState(false)}
              >
                <Link
                  href="/order/cart"
                  className="flex items-center justify-center gap-2"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
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
