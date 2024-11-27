import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { updateItemInCart } from '@/utils/api-requests';
import { CartItem, InsertCartSchema } from '@/db/schema';

export const useUpdateItemInCart = (): UseMutationResult<void, Error, CartItem, { previousCart: InsertCartSchema }> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CartItem, { previousCart: InsertCartSchema }>({
    mutationFn: updateItemInCart,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
