'use client';

import React from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from 'react-error-boundary';
import { Product } from '@/db/schema/products';
import { Card } from '@/components/ui/card';

export const ProductSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Product Details Skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Ingredients */}
          <div className="space-y-2 mt-4">
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div role="alert" className="p-4 text-red-500">
    <h2 className="text-lg font-semibold">Something went wrong:</h2>
    <pre className="mt-2">{error.message}</pre>
  </div>
);

const ProductView = ({ product }: { product: Product }) => {
  if (!product) return <div>Product not found</div>;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl!}
              alt={product.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              loading="eager"
            />
          </div>
          <div className="flex flex-col justify-center">
            <ProductCard product={product} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProductView;
