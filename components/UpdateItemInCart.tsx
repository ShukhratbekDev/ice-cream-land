import { Input } from '@/components/ui/input';
import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import { ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useUpdateItemInCart } from '@/hooks/useUpdateItemInCart';
import { CartItemWithProduct } from '@/db/schema';

type UpdateItemInCartProps = {
  itemInCart: Partial<CartItemWithProduct>;
};
const UpdateItemInCart = ({ itemInCart }: UpdateItemInCartProps) => {
  const [quantity, setQuantity] = useState(itemInCart?.quantity ?? 1);
  const { mutate: updateItem, isPending } = useUpdateItemInCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  useEffect(() => {
    if (itemInCart?.quantity) {
      setQuantity(itemInCart?.quantity);
    } else {
      setQuantity(1);
    }
  }, [itemInCart]);

  return (
    <>
      <Input type="number" min="1" max="100" value={quantity} onChange={handleQuantityChange} className="w-20" />
      <ButtonWithLoading
        className="flex-grow"
        onClick={() => updateItem({ productId: itemInCart.productId, quantity })}
        loading={isPending}
        disabled={itemInCart?.quantity === quantity}
        icon={<ShoppingCart className="h-4 w-4" />}
      >
        Update
      </ButtonWithLoading>
    </>
  );
};

export default UpdateItemInCart;
