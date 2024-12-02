'use client';

import { Suspense } from 'react';
import { useProducts } from '@/hooks/useProducts';
import HeroSection from './_components/HeroSection';
import HotProductsSection from './_components/HotProductsSection';
import HotProductsSectionSkeleton from './_components/HotProductsSectionSkeleton';

export default function HomePage() {
  const { data: products, isLoading } = useProducts();
  const hotProducts = products?.filter((product) => product.isHot === true);

  return (
    <main>
      <Suspense>
        <HeroSection />
      </Suspense>

      {isLoading ? (
        <HotProductsSectionSkeleton />
      ) : (
        hotProducts &&
        hotProducts.length > 0 && (
          <Suspense>
            <HotProductsSection products={hotProducts} />
          </Suspense>
        )
      )}
    </main>
  );
}
