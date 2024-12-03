import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '@/utils/api-requests';

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
  });
}
