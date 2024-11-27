import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { removeItemFromCart } from '@/utils/api-requests';
import { CartItemWithProduct } from '@/db/schema';

export const useRemoveItemFromCart = (): UseMutationResult<
  void,
  Error,
  number,
  { previousCart: Partial<CartItemWithProduct>[] }
> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, { previousCart: Partial<CartItemWithProduct>[] }>({
    mutationFn: removeItemFromCart,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
