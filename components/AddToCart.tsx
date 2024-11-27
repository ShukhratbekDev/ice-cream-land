import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '@/db/schema';
import { useCart } from '@/hooks/useCart';
import { useAddItemToCart } from '@/hooks/useAddItemToCart';
import { useRemoveItemFromCart } from '@/hooks/useRemoveItemFromCart';
import { useUpdateItemInCart } from '@/hooks/useUpdateItemInCart';

type AddToCartProps = {
  product: Product;
};

const AddToCart = ({ product }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const { data } = useCart();
  const { mutate: addItem, isPending: loadingAddItem } = useAddItemToCart();
  const { mutate: removeItem, isPending: loadingRemoveItem } = useRemoveItemFromCart();
  const { mutate: updateItem, isPending: loadingUpdateItem } = useUpdateItemInCart();

  const itemInCart = data?.items?.find((item) => item.productId === product.productId);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleRemoveItem = () => {
    removeItem(product.productId);
    setQuantity(1);
  };

  useEffect(() => {
    if (itemInCart && itemInCart.quantity) {
      setQuantity(itemInCart.quantity);
    }
  }, [itemInCart, product.productId]);

  return (
    <>
      {!itemInCart && (
        <Button
          className="flex-grow"
          onClick={() => addItem({ productId: product.productId, quantity })}
          loading={loadingAddItem}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      )}
      {itemInCart && (
        <>
          <Input type="number" min="1" max="100" value={quantity} onChange={handleQuantityChange} className="w-20" />
          <Button
            className="flex-grow"
            onClick={() => updateItem({ productId: product.productId, quantity })}
            loading={loadingUpdateItem}
            disabled={itemInCart?.quantity === quantity}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Update
          </Button>
          <Button className="flex" onClick={handleRemoveItem} variant="secondary" loading={loadingRemoveItem}>
            <Trash2 />
          </Button>
        </>
      )}
    </>
  );
};

export default AddToCart;
