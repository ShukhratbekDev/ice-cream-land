import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { updateItemInCart } from '@/utils/api-requests';
import { CartItemWithProduct } from '@/db/schema';

export const useUpdateItemInCart = (): UseMutationResult<
  void,
  Error,
  Partial<CartItemWithProduct>,
  { previousCart: Partial<CartItemWithProduct>[] }
> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<CartItemWithProduct>, { previousCart: Partial<CartItemWithProduct>[] }>({
    mutationFn: updateItemInCart,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
