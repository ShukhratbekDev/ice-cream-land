import { NextResponse } from 'next/server';
import * as regions from '@/config/regions.json';

export async function GET() {
  return NextResponse.json(regions);
}
