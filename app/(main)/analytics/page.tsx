'use client';

import { Suspense } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SalesByRegionChart from '@/components/analytics/SalesByRegionChart';
import SalesByMonthChart from '@/components/analytics/SalesByMonthChart';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnalyticsPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in?redirect_url=/analytics');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return <Skeleton className="w-full h-screen" />;
  }

  if (!userId) {
    return null;
  }

  return (
    <section className="justify-items-center py-3" aria-label="Analytics Dashboard">
      <div className="container">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8" role="region" aria-label="Sales Analytics Charts">
            {/* Monthly Sales Chart - Wider */}
            <div className="col-span-full lg:col-span-4">
              <Suspense
                fallback={<Skeleton className="w-full" role="progressbar" aria-label="Loading monthly sales chart" />}
              >
                <SalesByMonthChart />
              </Suspense>
            </div>
            {/* Regional Sales Chart */}
            <div className="col-span-full lg:col-span-4">
              <Suspense
                fallback={<Skeleton className="w-full" role="progressbar" aria-label="Loading regional sales chart" />}
              >
                <SalesByRegionChart />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
