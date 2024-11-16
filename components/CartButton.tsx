'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { useCart } from 'react-use-cart';
import useBasicStore from '@/hooks/useBasicStore';

const CartButton = () => {
  const { totalUniqueItems } = useCart();
  const { setCartModalState } = useBasicStore();

  return (
    <div className="relative inline-block">
      <Button variant="ghost" size="icon" onClick={() => setCartModalState(true)}>
        <ShoppingCart className="size-4" />
      </Button>
      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-[.5rem] font-medium flex items-center justify-center">
        {totalUniqueItems}
      </div>
    </div>
  );
};

export default CartButton;
