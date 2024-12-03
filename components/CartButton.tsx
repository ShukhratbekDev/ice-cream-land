'use client';

import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import useBasicStore from '@/hooks/useBasicStore';
import { useCart } from '@/hooks/useCart';
import ShoppingCartSidebar from '@/components/ShoppingCartSidebar';

const CartButton = () => {
  const { data } = useCart();
  const { setCartSidebarState, isCartSidebarOpen } = useBasicStore();

  return (
    <>
      <div className="relative inline-block">
        <ButtonWithLoading
          variant="ghost"
          size="icon"
          onClick={() => setCartSidebarState(true)}
          aria-label={`Shopping cart${data?.length ? `. ${data.length} items` : '. Empty'}`}
          className="hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ShoppingCart className="size-4" aria-hidden="true" />
        </ButtonWithLoading>
        {data && data?.length > 0 && (
          <div
            className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full min-w-5 h-5 px-1.5 text-xs font-medium flex items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">Number of items in cart:</span>
            {data.length}
          </div>
        )}
      </div>
      {isCartSidebarOpen && <ShoppingCartSidebar />}
    </>
  );
};

export default CartButton;
