import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema/orders';
import { desc, sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Query to get sales data by region
    const salesByRegion = await db
      .select({
        regionId: orders.regionId,
        totalSales: sql<string>`SUM(${orders.totalAmount})::text`,
      })
      .from(orders)
      .groupBy(orders.regionId);

    // Query to get sales data by month
    const salesByMonth = await db
      .select({
        month: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        totalSales: sql<string>`SUM(${orders.totalAmount})::text`,
      })
      .from(orders)
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)
      .orderBy(desc(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`))
      .limit(12);

    // Return the data with NextResponse
    return NextResponse.json(
      {
        salesByRegion,
        salesByMonth,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating analytics:', error);
    return NextResponse.json({ message: 'Failed to generate analytics' }, { status: 500 });
  }
}
