import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { removeItemFromCart } from '@/utils/api-requests';
import { InsertCartSchema } from '@/db/schema';

export const useRemoveItemFromCart = (): UseMutationResult<void, Error, number, { previousCart: InsertCartSchema }> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, { previousCart: InsertCartSchema }>({
    mutationFn: removeItemFromCart,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
