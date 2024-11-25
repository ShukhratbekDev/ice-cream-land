import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@/utils/api-requests';

export const useRegions = () => {
  return useQuery({
    queryKey: ['regions'],
    queryFn: () => getRegions(),
    staleTime: 10 * 1000,
  });
};
