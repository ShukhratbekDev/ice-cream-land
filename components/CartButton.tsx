'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import useBasicStore from '@/hooks/useBasicStore';
import { useCart } from '@/hooks/useCart';

const CartButton = () => {
  const { data } = useCart();
  const { setCartSidebarState } = useBasicStore();

  return (
    <div className="relative inline-block">
      <Button variant="ghost" size="icon" onClick={() => setCartSidebarState(true)}>
        <ShoppingCart className="size-4" />
      </Button>
      {data?.items && data?.items?.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-[.5rem] font-medium flex items-center justify-center">
          {data.items.length}
        </div>
      )}
    </div>
  );
};

export default CartButton;
