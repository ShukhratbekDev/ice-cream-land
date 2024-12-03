'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const defaultTab = 'All';

export const ProductsListSkeleton = () => (
  <div className="flex-col flex">
    <div className="flex-1 space-y-4 pt-6">
      {/* Tabs Skeleton */}
      <div className="space-y-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="border-b flex gap-2 pb-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-24 flex-shrink-0" />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Products Grid Skeleton */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProductsList = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div aria-live="polite" aria-busy="true">
        <ProductsListSkeleton />
      </div>
    );
  }

  const categories = [defaultTab, ...new Set(data?.map((product) => product.category.name))].sort();

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-6">
        <Tabs defaultValue={defaultTab} className="space-y-8" aria-label="Product categories">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex h-12 p-1" aria-label="Select product category">
              {categories.map((category) => (
                <TabsTrigger key={`tab-trigger-${category}`} value={category} className="flex-shrink-0">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {categories.map((category) => (
            <TabsContent
              key={`tab-content-${category}`}
              value={category}
              className="space-y-4"
              role="tabpanel"
              aria-label={`${category} products`}
            >
              <div
                className="grid gap-6 px-4 sm:px-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                role="list"
                aria-label={`${category} products grid`}
              >
                {(category === 'All' ? data : data?.filter((product) => product.category.name === category))?.map(
                  (product) => <ProductCard product={product} key={category + product.productId} />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsList;
