import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/utils/api-requests';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    staleTime: 10 * 1000,
  });
};
