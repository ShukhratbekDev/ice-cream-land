'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';

export interface SalesByRegionItem {
  regionId: string;
  totalSales: string;
}

const chartConfig = {
  totalSales: {
    label: 'Regional Sales',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function SalesByRegionChart() {
  const { data, isLoading } = useAnalytics();
  const salesByRegion = data?.salesByRegion ?? [];

  const chartData = salesByRegion
    .map((item: SalesByRegionItem) => ({
      name: item.regionId,
      totalSales: parseFloat(item.totalSales),
    }))
    .sort((a: { totalSales: number }, b: { totalSales: number }) => b.totalSales - a.totalSales); // Sort by totalSales descending

  if (isLoading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                height={40}
                interval="preserveStartEnd"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="font-medium">{payload[0]?.payload?.name}:</span>
                        <span className="font-medium">${payload[0]?.value?.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="totalSales" fill="var(--color-totalSales)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
