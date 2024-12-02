import { Skeleton } from '@/components/ui/skeleton';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HotProductsSectionSkeletonProps {
  className?: string;
}

export default function HotProductsSectionSkeleton({ className }: HotProductsSectionSkeletonProps) {
  return (
    <section className={cn('py-16 sm:py-20 w-full scroll-mt-20', className)} aria-labelledby="hot-products-heading">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex items-center gap-2 mb-8 sm:mb-10" role="presentation">
          <h2 id="hot-products-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            Hot Products
            <Flame className="inline-block ml-2 size-5 sm:size-6 lg:size-7 animate-pulse" aria-hidden="true" />
          </h2>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="status"
          aria-label="Loading hot products"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3" aria-hidden="true">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
