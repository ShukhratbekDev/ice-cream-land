import React from 'react';
import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/db/schema';
import { useAddItemToCart } from '@/hooks/useAddItemToCart';

type AddItemToCartProps = {
  product: Product;
};

const AddItemToCart = ({ product }: AddItemToCartProps) => {
  const { mutate: addItem, isPending } = useAddItemToCart();

  return (
    <ButtonWithLoading
      className="flex-grow"
      onClick={() => addItem({ productId: product.productId, quantity: 1 })}
      loading={isPending}
      icon={<ShoppingCart className="h-4 w-4" />}
    >
      Add to Cart
    </ButtonWithLoading>
  );
};

export default AddItemToCart;
