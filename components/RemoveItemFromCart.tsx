import { Trash2 } from 'lucide-react';
import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import React from 'react';
import { useRemoveItemFromCart } from '@/hooks/useRemoveItemFromCart';

type RemoveItemFromCartProps = {
  productId: number;
};

const RemoveItemFromCart = ({ productId }: RemoveItemFromCartProps) => {
  const { mutate: removeItem, isPending } = useRemoveItemFromCart();

  return (
    <ButtonWithLoading
      className="flex"
      onClick={() => removeItem(productId)}
      variant="secondary"
      loading={isPending}
      icon={<Trash2 />}
    />
  );
};

export default RemoveItemFromCart;
