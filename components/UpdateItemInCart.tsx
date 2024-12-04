import { Input } from '@/components/ui/input';
import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import { ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useUpdateItemInCart } from '@/hooks/useUpdateItemInCart';
import { CartItemWithProduct } from '@/db/schema';

const MAX_QUANTITY = 99;

type UpdateItemInCartProps = {
  itemInCart: Partial<CartItemWithProduct>;
};

const UpdateItemInCart = ({ itemInCart }: UpdateItemInCartProps) => {
  const [quantity, setQuantity] = useState(itemInCart?.quantity ?? 1);
  const { mutate: updateItem, isPending } = useUpdateItemInCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : Math.min(value, MAX_QUANTITY));
  };

  const handleUpdate = () => {
    const validQuantity = Math.min(quantity, MAX_QUANTITY);
    if (validQuantity !== quantity) {
      setQuantity(validQuantity);
    }
    updateItem({ productId: itemInCart.productId, quantity: validQuantity });
  };

  useEffect(() => {
    if (itemInCart?.quantity) {
      setQuantity(Math.min(itemInCart.quantity, MAX_QUANTITY));
    } else {
      setQuantity(1);
    }
  }, [itemInCart]);

  return (
    <>
      <Input
        type="number"
        min="1"
        max={MAX_QUANTITY}
        value={quantity}
        onChange={handleQuantityChange}
        className="w-20"
        aria-label="Product quantity"
      />
      <ButtonWithLoading
        className="flex-grow"
        onClick={handleUpdate}
        loading={isPending}
        disabled={itemInCart?.quantity === quantity || quantity > MAX_QUANTITY}
        icon={<ShoppingCart className="h-4 w-4" />}
      >
        Update
      </ButtonWithLoading>
    </>
  );
};

export default UpdateItemInCart;
