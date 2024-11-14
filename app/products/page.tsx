import ProductsList from '@/components/productsList';
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
      <section className="justify-items-center py-3">
        <div className="container">
          <ProductsList />
        </div>
      </section>
    </HydrationBoundary>
  );
}
