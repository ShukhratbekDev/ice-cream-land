import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { updateItemInCart } from '@/utils/api-requests';
import { CartItem, InsertCartSchema } from '@/db/schema';

export const useUpdateItemInCart = (): UseMutationResult<void, Error, CartItem, { previousCart: InsertCartSchema }> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CartItem, { previousCart: InsertCartSchema }>({
    mutationFn: updateItemInCart,
    onMutate: async (updatedItem: CartItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<InsertCartSchema>(['cart']) || { items: [] };

      queryClient.setQueryData<InsertCartSchema>(['cart'], (old = { items: [] }) => ({
        ...old,
        items: old?.items?.filter((item) =>
          item.productId === updatedItem.productId ? { ...item, quantity: updatedItem.quantity } : item
        ),
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
