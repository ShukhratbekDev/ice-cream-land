import ProductsList from '@/components/ProductsList';
import { getProducts } from '@/utils/api-requests';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';

export default async function Products() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['hydrate-products'],
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container">
        <h1>Products</h1>
        <ProductsList />
      </main>
    </HydrationBoundary>
  );
}
