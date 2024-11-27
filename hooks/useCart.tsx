import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/utils/api-requests';

export const useCart = (isSignedIn?: boolean) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
    staleTime: 10 * 1000,
    enabled: isSignedIn,
  });
};
