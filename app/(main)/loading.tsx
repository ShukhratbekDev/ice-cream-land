import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoading() {
  return (
    <main>
      {/* Hero Section Loading State */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text Content Loading */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <Skeleton className="h-12 w-3/4 mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/6" />
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            {/* Image Loading */}
            <div className="flex-1">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Hot Products Section Loading */}
      <section className="py-16 sm:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
