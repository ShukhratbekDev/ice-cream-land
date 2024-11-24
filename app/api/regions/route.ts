import { NextResponse } from 'next/server';
import { db } from '@/db';
import { desc } from 'drizzle-orm';
import { regions } from '@/db/schema';

export async function GET() {
  const regionsData = await db.query.regions.findMany({ orderBy: [desc(regions.isDefault)] });
  return NextResponse.json(regionsData);
}
