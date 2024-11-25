import { useQuery } from '@tanstack/react-query';
import { getLikedProducts } from '@/utils/api-requests';
import { Product } from '@/db/schema';

export const useLikedProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['likedProducts'],
    queryFn: getLikedProducts,
    staleTime: 10 * 1000,
  });
};
