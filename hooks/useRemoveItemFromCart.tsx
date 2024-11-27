import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { removeItemFromCart } from '@/utils/api-requests';
import { InsertCartSchema } from '@/db/schema';

export const useRemoveItemFromCart = (): UseMutationResult<void, Error, number, { previousCart: InsertCartSchema }> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, { previousCart: InsertCartSchema }>({
    mutationFn: removeItemFromCart,
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<InsertCartSchema>(['cart']) || { items: [] };

      queryClient.setQueryData<InsertCartSchema>(['cart'], (old = { items: [] }) => ({
        ...old,
        items: old?.items?.filter((item) => item.productId !== productId),
      }));

      return { previousCart };
    },
    onError: (err, product, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
