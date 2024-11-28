import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/utils/api-requests';

export const useCart = (isSignedIn: boolean = true) => {
  return useQuery({
    queryKey: ['cart', isSignedIn],
    queryFn: () => getCart(),
    staleTime: 10 * 1000,
    enabled: isSignedIn,
  });
};
