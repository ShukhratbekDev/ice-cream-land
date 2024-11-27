import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { addItemToCart } from '@/utils/api-requests';
import { CartItem, InsertCartSchema } from '@/db/schema';

export const useAddItemToCart = (): UseMutationResult<void, Error, CartItem, { previousCart: InsertCartSchema }> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CartItem, { previousCart: InsertCartSchema }>({
    mutationFn: addItemToCart,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
