import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/utils/api-requests';

export const useProduct = (productId: number) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    staleTime: 10 * 1000,
  });
};
