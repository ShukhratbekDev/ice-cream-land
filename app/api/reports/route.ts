import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema/orders';
import { orderItems } from '@/db/schema/orderItems';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Query to get sales data by region
    const salesByRegion = await db
      .select({
        regionId: orders.regionId,
        totalSales: sql<number>`SUM(${orderItems.price} * ${orderItems.quantity})`,
      })
      .from(orders)
      .innerJoin(orderItems, sql`${orderItems.orderId} = ${orders.orderId}`)
      .groupBy(orders.regionId);

    // Query to get sales data by month
    const salesByMonth = await db
      .select({
        month: sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        totalSales: sql<number>`SUM(${orderItems.price} * ${orderItems.quantity})`,
      })
      .from(orders)
      .innerJoin(orderItems, sql`${orderItems.orderId} = ${orders.orderId}`)
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`);

    // Return the data with NextResponse
    return NextResponse.json(
      {
        salesByRegion,
        salesByMonth,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to generate report' }, { status: 500 });
  }
}
