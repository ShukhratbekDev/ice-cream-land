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
        <ButtonWithLoading variant="ghost" size="icon" onClick={() => setCartSidebarState(true)}>
          <ShoppingCart className="size-4" />
        </ButtonWithLoading>
        {data && data?.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-[.5rem] font-medium flex items-center justify-center">
            {data.length}
          </div>
        )}
      </div>
      {isCartSidebarOpen && <ShoppingCartSidebar />}
    </>
  );
};

export default CartButton;
