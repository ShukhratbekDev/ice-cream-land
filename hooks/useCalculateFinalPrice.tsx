import { useQuery } from '@tanstack/react-query';
import { fetchFinalPrice } from '@/utils/api-requests';

export function useCalculateFinalPrice(regionId: string, price: number) {
  return useQuery({
    queryKey: ['calculateFinalPrice', regionId, price],
    queryFn: () => fetchFinalPrice({ regionId, price }),
    staleTime: 10 * 1000,
  });
}
