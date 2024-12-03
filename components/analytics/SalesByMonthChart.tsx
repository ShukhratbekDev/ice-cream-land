'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';
import { Monitor } from 'lucide-react';

interface SalesByMonthItem {
  month: string;
  totalSales: string;
}

const chartConfig = {
  totalSales: {
    label: 'Monthly Sales',
    icon: Monitor,
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function SalesByMonthChart() {
  const { data, isLoading } = useAnalytics();
  const salesByMonth: SalesByMonthItem[] = data?.salesByMonth ?? [];

  const chartData = salesByMonth
    .map((item: SalesByMonthItem) => ({
      name: format(parseISO(item.month + '-01'), 'MMM yyyy'),
      totalSales: parseFloat(item.totalSales),
    }))
    .sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });

  if (isLoading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              role="img"
              aria-label="Monthly Sales Chart"
              tabIndex={0}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                height={40}
                interval="preserveStartEnd"
                tick={{ fontSize: 11, fill: 'currentColor' }}
                aria-label="Months"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                aria-label="Sales Amount"
                tick={{ fill: 'currentColor' }}
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
              <Bar
                dataKey="totalSales"
                fill="var(--color-totalSales)"
                radius={[4, 4, 0, 0]}
                name="Monthly Sales"
                role="graphics-symbol"
                aria-label="Sales bar"
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
