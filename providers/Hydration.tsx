import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getRegions } from '@/utils/api-requests';
import React from 'react';

export default async function Hydration({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // this sets the cache time to 5 minutes
      },
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['regions'],
      queryFn: () => getRegions(),
    }),
  ]);
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
