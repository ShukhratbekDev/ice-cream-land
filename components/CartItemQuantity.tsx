'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useUpdateItemInCart } from '@/hooks/useUpdateItemInCart';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CartItemWithProduct } from '@/db/schema';

interface CartItemQuantityInputProps {
  itemInCart: Partial<CartItemWithProduct>;
  className?: string;
}

export default function CartItemQuantityInput({ itemInCart, className }: CartItemQuantityInputProps) {
  const { mutate: updateItemInCart, isPending } = useUpdateItemInCart();
  const [quantity, setQuantity] = useState(itemInCart.quantity ?? 1);

  useEffect(() => {
    setQuantity(itemInCart.quantity ?? 1);
  }, [itemInCart.quantity]);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    setQuantity(newQuantity);

    updateItemInCart(
      { ...itemInCart, quantity: newQuantity },
      {
        onError: () => {
          // Revert on error
          setQuantity(itemInCart.quantity ?? 1);
          console.error('Failed to update quantity');
        },
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;
    handleQuantityChange(value);
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1 || isPending}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min="1"
        max="99"
        value={quantity}
        onChange={handleInputChange}
        className="h-8 w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        disabled={isPending}
        aria-label="Item quantity"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={quantity >= 99 || isPending}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
