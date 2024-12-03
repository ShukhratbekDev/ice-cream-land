import { Suspense } from 'react';
import ProductsList, { ProductsListSkeleton } from '@/components/ProductsList';

export default function Products() {
  return (
    <section className="justify-items-center py-3">
      <div className="container">
        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductsList />
        </Suspense>
      </div>
    </section>
  );
}
