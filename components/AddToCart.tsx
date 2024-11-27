import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '@/db/schema';
import { useAddItemToCart } from '@/hooks/useAddItemToCart';
import { useRemoveItemFromCart } from '@/hooks/useRemoveItemFromCart';
import { useUpdateItemInCart } from '@/hooks/useUpdateItemInCart';
import { useCart } from '@/hooks/useCart';

type AddToCartProps = {
  product: Product;
};

const AddToCart = ({ product }: AddToCartProps) => {
  const { data } = useCart();
  const itemInCart = data?.find((item) => item.productId === product.productId);
  const [quantity, setQuantity] = useState(itemInCart?.quantity ?? 1);
  const { mutate: addItem, isPending: loadingAddItem } = useAddItemToCart();
  const { mutate: removeItem, isPending: loadingRemoveItem } = useRemoveItemFromCart();
  const { mutate: updateItem, isPending: loadingUpdateItem } = useUpdateItemInCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleRemoveItem = () => {
    removeItem(product.productId);
    setQuantity(1);
  };

  return (
    <>
      {itemInCart?.quantity && itemInCart.quantity > 0 ? (
        <>
          <Input type="number" min="1" max="100" value={quantity} onChange={handleQuantityChange} className="w-20" />
          <Button
            className="flex-grow"
            onClick={() => updateItem({ productId: product.productId, quantity })}
            loading={loadingUpdateItem}
            disabled={itemInCart?.quantity === quantity}
            icon={<ShoppingCart className="h-4 w-4" />}
          >
            Update
          </Button>
          <Button
            className="flex"
            onClick={handleRemoveItem}
            variant="secondary"
            loading={loadingRemoveItem}
            icon={<Trash2 />}
          />
        </>
      ) : (
        <Button
          className="flex-grow"
          onClick={() => addItem({ productId: product.productId, quantity })}
          loading={loadingAddItem}
          icon={<ShoppingCart className="h-4 w-4" />}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddToCart;
