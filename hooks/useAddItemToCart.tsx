import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { addItemToCart } from '@/utils/api-requests';
import { CartItemWithProduct } from '@/db/schema';

export const useAddItemToCart = (): UseMutationResult<
  void,
  Error,
  Partial<CartItemWithProduct>,
  { previousCart: Partial<CartItemWithProduct>[] }
> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<CartItemWithProduct>, { previousCart: Partial<CartItemWithProduct>[] }>({
    mutationFn: addItemToCart,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
