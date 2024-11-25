import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { likeProduct } from '@/utils/api-requests';
import { Product } from '@/db/schema';

export const useLikeProduct = (): UseMutationResult<
  void,
  Error,
  Product,
  { previousLikes: Product[]; previousProducts: Product[] }
> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Product, { previousLikes: Product[]; previousProducts: Product[] }>({
    mutationFn: likeProduct,
    onMutate: async (product: Product) => {
      await queryClient.cancelQueries({ queryKey: ['likedProducts'] });
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousLikes = queryClient.getQueryData<Product[]>(['likedProducts']) || [];
      const previousProducts = queryClient.getQueryData<Product[]>(['products']) || [];

      queryClient.setQueryData<Product[]>(['likedProducts'], (old = []) => [...old, product]);
      queryClient.setQueryData<Product[]>(['products'], (products = []) =>
        products.map((item) => ({ ...item, isLiked: item.id === product.id ? true : item.isLiked }))
      );

      return { previousLikes, previousProducts };
    },
    onError: (err, product, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(['likedProducts'], context.previousLikes);
      }
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likedProducts'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
