import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { addItemToCart } from '@/utils/api-requests';
import { CartItem, InsertCartSchema, SelectCartItemsSchema } from '@/db/schema';

export const useAddItemToCart = (): UseMutationResult<void, Error, CartItem, { previousCart: InsertCartSchema }> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CartItem, { previousCart: InsertCartSchema }>({
    mutationFn: addItemToCart,
    onMutate: async (item: CartItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<InsertCartSchema>(['cart']) || { items: [] };

      queryClient.setQueryData<InsertCartSchema>(['cart'], (old = { items: [] }) => ({
        ...old,
        items: [...(old?.items || []), item as SelectCartItemsSchema],
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
