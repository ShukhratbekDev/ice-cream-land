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
  const { mutate: addItem } = useAddItemToCart();
  const { mutate: removeItem } = useRemoveItemFromCart();
  const { mutate: updateItem } = useUpdateItemInCart();

  const itemInCart = data?.items?.find((item) => item.productId === product.productId);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    if (itemInCart) {
      updateItem({ productId: product.productId, quantity });
    } else {
      addItem({ productId: product.productId, quantity });
    }
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
      {itemInCart && <Input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="w-20" />}
      <Button className="flex-grow" onClick={handleAddToCart} disabled={itemInCart?.quantity === quantity}>
        <ShoppingCart className="mr-2 h-4 w-4" /> {itemInCart ? 'Update' : 'Add to Cart'}
      </Button>
      {itemInCart && (
        <Button className="flex" onClick={handleRemoveItem} variant="secondary">
          <Trash2 />
        </Button>
      )}
    </>
  );
};

export default AddToCart;
